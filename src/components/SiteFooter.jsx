import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle, Check, Mail } from 'lucide-react';
import { useAppNavigate } from '../hooks/useAppNavigate.js';
import { useSiteSettings } from '../context/ContentProvider.jsx';
import { submitInquiry } from '../lib/api.js';

// Pages whose inquiries belong to a dedicated inbox show that address in the
// footer instead of the general settings.contact email. Most specific path first.
const PAGE_CONTACT_EMAILS = [
  { prefix: '/archives/newsletters', email: import.meta.env.VITE_CONTACT_EMAIL_NEWSLETTER },
  { prefix: '/learn', email: import.meta.env.VITE_CONTACT_EMAIL_EDUCATION },
  { prefix: '/volunteer', email: import.meta.env.VITE_CONTACT_EMAIL_VOLUNTEER },
  { prefix: '/support', email: import.meta.env.VITE_CONTACT_EMAIL_SUPPORT },
  { prefix: '/give-aloha', email: import.meta.env.VITE_CONTACT_EMAIL_SUPPORT },
];

function pageContactEmail(pathname) {
  return PAGE_CONTACT_EMAILS.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.email;
}

/**
 * The site-wide footer. It used to live inline in the Home page, which meant the
 * landing page was the only route that had one. It now renders from PublicLayout
 * so every public page ends the same way, driven by the same settings.footer CMS
 * content.
 */
export default function SiteFooter() {
  const setActivePage = useAppNavigate();
  const { settings } = useSiteSettings();
  const footer = settings?.footer ?? {};
  const contact = settings?.contact ?? {};
  const { pathname } = useLocation();
  const contactEmail = pageContactEmail(pathname) || contact.email;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // 'idle' | 'submitting' | 'done'
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterStatus('submitting');
    setNewsletterError('');
    try {
      await submitInquiry({ type: 'newsletter', email: newsletterEmail });
      setNewsletterStatus('done');
    } catch (err) {
      setNewsletterError(err.message ?? 'Failed to sign up. Please try again.');
      setNewsletterStatus('idle');
    }
  };

  const goTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div className="editorial-shell">
        {footer.invitation && (
          <div style={styles.footerInvitation}>
            <p style={styles.footerInvitationText}>{footer.invitation}</p>
            <div style={styles.actions}>
              {(footer.invitationLinks ?? []).map((link) => (
                <button
                  key={link.label}
                  className={link.page === 'tickets' ? 'btn-accent' : 'btn-secondary'}
                  onClick={() => goTo(link.page)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={styles.footerGrid}>
          <div>
            <h3 style={styles.footerBrand}>{footer.brand ?? settings?.brand?.title}</h3>
            <p style={styles.footerText}>{footer.text}</p>
            <p style={styles.footerContact}>
              {contact.phone}
              <br />
              {contactEmail}
            </p>
          </div>

          <div>
            <h4 style={styles.footerHeader}>Go to</h4>
            <ul style={styles.footerLinks}>
              {(footer.ctaLinks ?? []).map((link) => (
                <li key={link.label}>
                  <button className="footer-link-btn" onClick={() => goTo(link.page)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={styles.footerHeader}>{footer.newsletter?.heading}</h4>
            <p style={styles.footerText}>{footer.newsletter?.description}</p>
            {newsletterStatus === 'done' ? (
              <p role="status" style={styles.newsletterMessage}>
                <Check size={16} /> Mahalo! You&apos;re on the list.
              </p>
            ) : (
              <form
                style={styles.newsletterForm}
                onSubmit={handleNewsletterSubmit}
              >
                <label htmlFor="newsletter-email" style={styles.srOnly}>Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={footer.newsletter?.placeholder}
                  style={styles.newsletterInput}
                />
                <button className="btn-accent" type="submit" disabled={newsletterStatus === 'submitting'}>
                  <Mail size={16} /> {newsletterStatus === 'submitting' ? 'Joining…' : (footer.newsletter?.buttonLabel ?? 'Join')}
                </button>
              </form>
            )}
            {newsletterError && (
              <p role="alert" style={styles.newsletterMessage}>
                <AlertCircle size={16} /> {newsletterError}
              </p>
            )}
          </div>
        </div>

        <p style={styles.footerBottom}>{footer.copyright}</p>
      </div>
    </footer>
  );
}

const styles = {
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1.75rem',
  },
  footer: {
    backgroundColor: 'var(--plantation-ink)',
    color: 'rgba(250, 246, 236, 0.72)',
    paddingBlock: 'clamp(3rem, 6vw, 5rem) 2rem',
  },
  footerInvitation: {
    borderBottom: '1px solid rgba(250, 246, 236, 0.16)',
    paddingBottom: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
  },
  footerInvitationText: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
    lineHeight: 1.3,
    color: 'var(--sugarcane-cream)',
    maxWidth: '22ch',
    margin: 0,
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
    gap: 'clamp(2rem, 5vw, 3.5rem)',
    marginBottom: '3rem',
  },
  footerBrand: {
    fontSize: '1.6rem',
    fontWeight: 500,
    color: 'var(--sugarcane-cream)',
    margin: '0 0 1rem',
  },
  footerText: {
    fontSize: '0.95rem',
    lineHeight: 1.65,
    marginBottom: '1.25rem',
    maxWidth: '44ch',
  },
  footerContact: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'var(--sugarcane-cream)',
    margin: 0,
  },
  footerHeader: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--heritage-gold)',
    margin: '0 0 1rem',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  newsletterForm: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    maxWidth: '420px',
  },
  newsletterMessage: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    marginTop: '0.5rem',
    color: 'var(--sugarcane-cream)',
    fontSize: '0.95rem',
  },
  newsletterInput: {
    flex: '1 1 200px',
    padding: '0.75rem 1rem',
    border: '1px solid var(--hairline-invert)',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'rgba(250, 246, 236, 0.06)',
    color: 'var(--sugarcane-cream)',
    fontSize: '0.95rem',
    outline: 'none',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap',
  },
  footerBottom: {
    borderTop: '1px solid var(--hairline-invert)',
    paddingTop: '1.5rem',
    fontSize: '0.85rem',
    color: 'rgba(250, 246, 236, 0.5)',
    margin: 0,
  },
};
