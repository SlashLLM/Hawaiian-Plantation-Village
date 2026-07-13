import React from 'react';
import { motion } from 'framer-motion';
import AlethiaPageHeader from './AlethiaPageHeader';

const TIMELINE = [
  { year: '1852', event: 'First Chinese contract laborers arrive, inaugurating the plantation era on Oʻahu.' },
  { year: '1878', event: 'Portuguese workers arrive with stone ovens and braguinha instruments.' },
  { year: '1885', event: 'Japanese government-contract workers establish major camp communities.' },
  { year: '1897', event: 'Oahu Sugar Company incorporates in Waipahu; the mill smokestack dominates the skyline.' },
  { year: '1906', event: 'First Filipino Sakadas arrive, eventually forming the largest labor segment.' },
  { year: '1992', event: 'Hawaiian Plantation Village opens as a living cultural museum in Waipahu.' },
];

export default function About() {
  return (
    <div style={styles.page} className="theme-alethia">
      <AlethiaPageHeader
        eyebrow="About"
        title="Preserving the Roots of Modern Hawaiʻi"
        subtitle="An outdoor living history museum where immigrant camp cultures, gardens, and community memory converge."
      />
      <div style={styles.container}>
        <div style={styles.aboutGrid}>
          <div className="alethia-glass" style={styles.missionCard}>
            <span className="alethia-eyebrow">Our mission</span>
            <h2 style={styles.missionTitle}>Share the waves of immigration that built multicultural Hawaiʻi</h2>
            <p style={styles.body}>
              Hawaiian Plantation Village preserves authentic camp houses, artifacts, and oral histories so visitors can understand how plantation labor shaped modern Waipahu—and the state beyond.
            </p>
            <p style={styles.body}>
              We are a nonprofit stewarded by community partners, docents, and families whose ancestors lived these stories.
            </p>
          </div>
          <img src="/alethia/nature-place.jpg" alt="Heritage gardens and camp landscape at the village" style={styles.aboutImage} />
        </div>

        <h2 style={styles.timelineTitle}>Key milestones</h2>
        <div style={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              style={styles.timelineItem}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <span style={styles.year}>{item.year}</span>
              <p style={styles.event}>{item.event}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1, paddingBottom: '4rem' },
  container: { maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' },
  aboutGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem', alignItems: 'center' },
  missionCard: { padding: '2rem' },
  missionTitle: { fontSize: '1.5rem', margin: '0.75rem 0 1rem', lineHeight: 1.25 },
  body: { color: 'var(--alethia-text-muted)', lineHeight: 1.65, marginBottom: '1rem' },
  aboutImage: { width: '100%', height: '320px', objectFit: 'cover', borderRadius: 20 },
  timelineTitle: { fontSize: '1.5rem', marginBottom: '1.25rem' },
  timeline: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  timelineItem: { display: 'flex', gap: '1.25rem', padding: '1rem 1.25rem', borderLeft: '3px solid var(--alethia-accent)', background: 'rgba(15,118,110,0.05)', borderRadius: '0 12px 12px 0' },
  year: { fontFamily: 'var(--font-alethia-display)', fontWeight: 700, color: 'var(--alethia-primary)', minWidth: '56px' },
  event: { margin: 0, color: 'var(--alethia-text-muted)', lineHeight: 1.55 },
};
