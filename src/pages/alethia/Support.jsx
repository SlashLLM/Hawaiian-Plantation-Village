import React from 'react';
import { motion } from 'framer-motion';
import { Heart, HandHeart, Building2, Mail } from 'lucide-react';
import AlethiaPageHeader from './AlethiaPageHeader';

const TIERS = [
  { amount: '$25', title: 'Garden Friend', desc: 'Supports native plant care and pathway maintenance.' },
  { amount: '$100', title: 'Camp Steward', desc: 'Helps preserve one camp house artifact or display for a year.' },
  { amount: '$500', title: 'Heritage Partner', desc: 'Funds docent training and school outreach programs.' },
];

export default function Support() {
  return (
    <div style={styles.page} className="theme-alethia">
      <AlethiaPageHeader
        eyebrow="Support"
        title="Keep History Alive"
        subtitle="Hawaiian Plantation Village is a nonprofit. Your gift sustains preservation, education, and community programs."
      />
      <div style={styles.container}>
        <motion.div
          className="alethia-glass"
          style={styles.heroCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Heart size={32} color="var(--alethia-accent)" fill="var(--alethia-accent)" />
          <h2 style={styles.heroTitle}>Every donation protects a story</h2>
          <p style={styles.heroText}>
            From restoring camp house interiors to hosting free community events, your support keeps Waipahu&apos;s multicultural heritage accessible.
          </p>
          <button className="alethia-btn-accent">Donate Now</button>
        </motion.div>

        <div style={styles.tierGrid}>
          {TIERS.map((tier, i) => (
            <motion.article
              key={tier.title}
              className="alethia-glass"
              style={styles.tierCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <span style={styles.tierAmount}>{tier.amount}</span>
              <h3 style={styles.tierTitle}>{tier.title}</h3>
              <p style={styles.tierDesc}>{tier.desc}</p>
            </motion.article>
          ))}
        </div>

        <div style={styles.contactGrid}>
          <div className="alethia-glass" style={styles.contactCard}>
            <Building2 size={22} color="var(--alethia-primary)" />
            <h3 style={styles.contactTitle}>Corporate & Group Giving</h3>
            <p style={styles.contactText}>Sponsor field trips, restoration projects, or signature events.</p>
          </div>
          <div className="alethia-glass" style={styles.contactCard}>
            <HandHeart size={22} color="var(--alethia-primary)" />
            <h3 style={styles.contactTitle}>Volunteer</h3>
            <p style={styles.contactText}>Join garden days, event support, and archival assistance.</p>
          </div>
          <div className="alethia-glass" style={styles.contactCard}>
            <Mail size={22} color="var(--alethia-primary)" />
            <h3 style={styles.contactTitle}>Contact</h3>
            <p style={styles.contactText}>info@hawaiianplantationvillage.org · (808) 677-0110</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1, paddingBottom: '4rem' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' },
  heroCard: { padding: '2.5rem', textAlign: 'center', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  heroTitle: { fontSize: '1.75rem' },
  heroText: { maxWidth: '520px', color: 'var(--alethia-text-muted)', lineHeight: 1.65, margin: 0 },
  tierGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' },
  tierCard: { padding: '1.5rem' },
  tierAmount: { fontFamily: 'var(--font-alethia-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--alethia-primary)' },
  tierTitle: { fontSize: '1.05rem', margin: '0.5rem 0' },
  tierDesc: { margin: 0, fontSize: '0.88rem', color: 'var(--alethia-text-muted)', lineHeight: 1.55 },
  contactGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' },
  contactCard: { padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  contactTitle: { fontSize: '1rem', fontWeight: 600 },
  contactText: { margin: 0, fontSize: '0.88rem', color: 'var(--alethia-text-muted)', lineHeight: 1.55 },
};
