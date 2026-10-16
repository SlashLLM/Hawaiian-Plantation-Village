import React from 'react';
import { Heart, ExternalLink, ShieldCheck } from 'lucide-react';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import SEO from '../../components/SEO.jsx';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';

const DONATION_URL = 'https://www.zeffy.com/en-US/donation-form/preserve-hawaiis-plantation-heritage';

const IMPACT_ITEMS = [
  'Cares for historic homes and gardens',
  'Preserves photographs and artifacts',
  'Welcomes students and sustains cultural programs',
];

export default function Donate() {
  return (
    <div>
      <SEO
        title="Donate"
        description="Make a tax-deductible gift to help preserve Hawaii's Plantation Village — its historic homes, gardens, photographs and the stories they hold."
      />
      <PageHeaderParallax
        image={SITE_PHOTOS.headers.support}
        stamp="Help us keep our stories alive"
        stampClass="green"
        title="Preserve Hawaiʻi’s plantation heritage."
        subtitle="Every gift helps preserve a piece of Hawaiʻi’s shared history."
      />

      <section className="editorial-section">
        <div className="editorial-shell">
          <div className="paper-card" style={styles.card}>
            <div style={styles.icon} aria-hidden="true">
              <Heart size={28} />
            </div>
            <h2 style={styles.title}>Make a gift</h2>
            <p style={styles.body}>
              Hawaii’s Plantation Village exists because generations of people knew these stories
              mattered. Your gift carries that work forward.
            </p>

            <ul style={styles.list}>
              {IMPACT_ITEMS.map((item) => (
                <li key={item} style={styles.listItem}>{item}</li>
              ))}
            </ul>

            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clay"
              style={styles.donateBtn}
            >
              Donate Now <ExternalLink size={16} />
            </a>

            <p style={styles.secureNote}>
              <ShieldCheck size={15} /> Secure donation processed by Zeffy
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: 'clamp(2rem, 5vw, 3rem)',
    borderRadius: '4px',
    textAlign: 'center',
  },
  icon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'var(--terracotta-clay-deep)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem auto',
  },
  title: {
    fontSize: 'clamp(1.6rem, 3vw, 2rem)',
    color: 'var(--koa-wood)',
    marginBottom: '0.75rem',
  },
  body: {
    fontSize: '1.02rem',
    lineHeight: 1.7,
    color: 'var(--muted-sage)',
    margin: '0 auto 1.5rem',
    maxWidth: '52ch',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '0 auto 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    color: 'var(--plantation-ink)',
    fontSize: '0.98rem',
  },
  listItem: {
    margin: 0,
  },
  donateBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    minWidth: '220px',
  },
  secureNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '1rem',
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
  },
};
