import React from 'react';
import { Info } from 'lucide-react';
import { paymentsEnabled } from '../lib/features.js';
import { useSiteSettings } from '../context/ContentProvider.jsx';

// Slim strip above the navbar while online payments are switched off. It carries the
// "coming soon" message for the whole site, so the nav row itself stays uncluttered —
// three inline badges there overflow the 1180px nav and wrap the brand and button.
export default function LaunchNotice() {
  const { settings } = useSiteSettings();
  const contact = settings?.contact ?? {};

  if (paymentsEnabled) return null;

  return (
    <div style={styles.bar} role="status">
      <div style={styles.inner}>
        <Info size={15} style={styles.icon} aria-hidden="true" />
        <span>
          Online tickets, donations, and membership are <strong style={styles.strong}>coming soon</strong>.
          {' '}Admission is available at the visitor center
          {contact.phone && (
            <>
              {' — call '}
              <a href={contact.phoneHref ?? `tel:${String(contact.phone).replace(/\D/g, '')}`} style={styles.link}>
                {contact.phone}
              </a>
            </>
          )}
          .
        </span>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    backgroundColor: 'var(--plantation-ink)',
    color: 'var(--sugarcane-cream)',
    width: '100%',
  },
  inner: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0.5rem clamp(0.85rem, 4vw, 2.5rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.82rem',
    lineHeight: 1.5,
    textAlign: 'center',
  },
  icon: {
    flexShrink: 0,
    opacity: 0.8,
  },
  strong: {
    fontWeight: 600,
  },
  link: {
    color: 'var(--heritage-gold)',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    whiteSpace: 'nowrap',
  },
};
