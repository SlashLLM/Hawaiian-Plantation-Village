import React from 'react';
import { Clock, Phone, Mail } from 'lucide-react';
import { useSiteSettings } from '../context/ContentProvider.jsx';

/**
 * The notice shown in place of a checkout flow while online payments are not
 * connected (see `src/lib/paymentsConfig.js`). Contact details come from the
 * same CMS settings the footer uses, so updating the phone number in the admin
 * panel updates it here too.
 *
 * `children` renders as a row of secondary actions under the contact block —
 * somewhere for the visitor to go that still works.
 */
export default function ComingSoon({ eyebrow, title, body, note, children }) {
  const { settings } = useSiteSettings();
  const contact = settings?.contact ?? {};
  const hours = settings?.hours ?? {};

  const phone = contact.phone ?? '(808) 677-0110';
  const phoneHref = contact.phoneHref ?? 'tel:8086770110';
  const email = contact.email ?? 'lchen.hpv@gmail.com';
  const emailHref = contact.emailHref ?? `mailto:${email}`;
  const schedule = hours.schedule ?? 'Tuesday – Saturday: 9:00 AM – 2:00 PM';

  return (
    <div className="paper-card animate-fade-in" style={styles.card}>
      <div style={styles.iconBadge} aria-hidden="true">
        <Clock size={24} />
      </div>

      {eyebrow && (
        <div style={styles.eyebrowRow}>
          <span className="ink-stamp gold">{eyebrow}</span>
        </div>
      )}
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.body}>{body}</p>

      <div style={styles.contactBlock}>
        <a href={phoneHref} style={styles.phoneLink}>
          <Phone size={20} style={styles.phoneIcon} />
          {phone}
        </a>
        <a href={emailHref} style={styles.emailLink}>
          <Mail size={15} style={styles.emailIcon} />
          {email}
        </a>
        <p style={styles.hours}>{schedule}</p>
      </div>

      {note && <p style={styles.note}>{note}</p>}

      {children && <div style={styles.actions}>{children}</div>}
    </div>
  );
}

const styles = {
  card: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: 'clamp(2rem, 5vw, 3.25rem)',
    textAlign: 'center',
  },
  iconBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--sand)',
    border: '1px solid var(--hairline)',
    color: 'var(--heritage-gold-ink)',
    marginBottom: '1.25rem',
  },
  eyebrowRow: {
    marginBottom: '0.75rem',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
    lineHeight: 1.2,
    color: 'var(--plantation-ink)',
    margin: '0 0 1rem',
  },
  body: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    lineHeight: 1.7,
    color: 'var(--text-muted)',
    maxWidth: '46ch',
    margin: '0 auto',
  },
  contactBlock: {
    marginTop: '2rem',
    padding: '1.5rem 0.85rem',
    backgroundColor: 'var(--sand)',
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
  },
  phoneLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.35rem, 4vw, 1.75rem)',
    fontWeight: 600,
    color: 'var(--plantation-ink)',
    textDecoration: 'none',
    wordBreak: 'break-word',
  },
  phoneIcon: {
    color: 'var(--heritage-gold-ink)',
    flexShrink: 0,
  },
  emailLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '0.75rem',
    fontFamily: 'var(--font-body)',
    // Sized so the address fits on one line at 375px rather than breaking mid-word.
    fontSize: 'clamp(0.82rem, 3.4vw, 0.95rem)',
    color: 'var(--plantation-ink)',
    maxWidth: '100%',
    wordBreak: 'break-word',
  },
  emailIcon: {
    color: 'var(--muted-sage)',
    flexShrink: 0,
  },
  hours: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    margin: '1rem 0 0',
  },
  note: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: 'var(--text-muted)',
    maxWidth: '48ch',
    margin: '1.5rem auto 0',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.75rem',
    marginTop: '1.75rem',
  },
};
