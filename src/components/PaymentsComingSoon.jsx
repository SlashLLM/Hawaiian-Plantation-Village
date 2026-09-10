import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import PageHeaderParallax from './PageHeaderParallax';
import SEO from './SEO.jsx';
import { SITE_PHOTOS } from '../lib/sitePhotos.js';
import { useSiteSettings } from '../context/ContentProvider.jsx';

// Stands in for /tickets and /support while online payments are switched off.
// Keeps the URLs alive for bookmarks, printed material, and inbound links.
const VARIANTS = {
  tickets: {
    image: SITE_PHOTOS.headers.visit,
    stamp: 'Visitor information',
    title: 'Tickets at the visitor center',
    subtitle: 'Online booking is not open yet. You are welcome to visit us during open hours.',
    seoTitle: 'Tickets',
    seoDescription:
      "Online ticketing for Hawaii's Plantation Village is coming soon. Admission is handled at the visitor center during open hours.",
    body: [
      'We are still setting up online ticketing. Until it is ready, admission is handled in person at the visitor center when you arrive — no advance booking is needed.',
      'Planning a school visit, a tour group, or a private event? Get in touch and our coordinator will walk you through scheduling.',
    ],
  },
  support: {
    image: SITE_PHOTOS.headers.support,
    stamp: 'Support the village',
    title: 'Ways to support us',
    subtitle: 'Online giving and membership sign-up are not open yet — but we would love to hear from you.',
    seoTitle: 'Support the Village',
    seoDescription:
      "Online donations and memberships for Hawaii's Plantation Village are coming soon. Contact us to support the museum today.",
    body: [
      'Online donations and membership sign-up are not available yet. If you would like to support the preservation of the camp cottages, the gardens, and the stories told inside them, please reach out to us directly.',
      'We can also talk through volunteering, sponsorship, and in-kind gifts. Every bit of it keeps these houses standing.',
    ],
  },
};

export default function PaymentsComingSoon({ variant = 'support' }) {
  const { settings } = useSiteSettings();
  const contact = settings?.contact ?? {};
  const config = VARIANTS[variant] ?? VARIANTS.support;

  return (
    <div style={styles.pageContainer}>
      <SEO title={config.seoTitle} description={config.seoDescription} />
      <PageHeaderParallax
        image={config.image}
        stamp={config.stamp}
        title={config.title}
        subtitle={config.subtitle}
      />

      <div className="editorial-shell" style={styles.container}>
        <div className="paper-card" style={styles.card}>
          {config.body.map((paragraph, index) => (
            <p key={index} style={styles.body}>{paragraph}</p>
          ))}

          <div style={styles.contactList}>
            {contact.phone && (
              <a href={contact.phoneHref ?? `tel:${String(contact.phone).replace(/\D/g, '')}`} style={styles.contactRow}>
                <Phone size={18} color="var(--cane-green)" />
                <span>{contact.phone}</span>
              </a>
            )}
            {contact.email && (
              <a href={contact.emailHref ?? `mailto:${contact.email}`} style={styles.contactRow}>
                <Mail size={18} color="var(--cane-green)" />
                <span>{contact.email}</span>
              </a>
            )}
            {contact.address?.line1 && (
              <div style={styles.contactRow}>
                <MapPin size={18} color="var(--cane-green)" />
                <span>{contact.address.line1}, {contact.address.line2}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: 'var(--sugarcane-cream)',
    minHeight: '100vh',
  },
  container: {
    padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(0.85rem, 4vw, 2.5rem)',
  },
  card: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
  },
  body: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    lineHeight: 1.75,
    color: 'var(--plantation-ink)',
    marginBottom: '1.25rem',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginTop: '2rem',
    paddingTop: '1.75rem',
    borderTop: '1px solid var(--hairline)',
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.98rem',
    color: 'var(--plantation-ink)',
    textDecoration: 'none',
  },
};
