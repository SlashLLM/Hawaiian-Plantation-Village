import React from 'react';
import { motion } from 'framer-motion';
import AlethiaPageHeader from './AlethiaPageHeader';

const CULTURES = [
  { name: 'Japanese Camp House', year: '1899', desc: 'Tatami mats, shoji screens, and Bon dance traditions brought from home.' },
  { name: 'Portuguese Cottage', year: '1882', desc: 'Stone forno ovens, sweet breads, and braguinha music that shaped local folk culture.' },
  { name: 'Chinese Society House', year: '1875', desc: 'Communal kitchens and calligraphic scrolls from the earliest contract labor wave.' },
  { name: 'Okinawan Home', year: '1904', desc: 'Distinct Ryukyu heritage with sanshin music and pottery craft on the lanai.' },
  { name: 'Puerto Rican Cottage', year: '1901', desc: 'Vibrant fabrics, pasteles recipes, and string ensembles in camp gatherings.' },
  { name: 'Filipino Camp House', year: '1906', desc: 'Sakada labor stories, community halls, and the largest late-era plantation segment.' },
];

export default function Stories() {
  return (
    <div style={styles.page} className="theme-alethia">
      <AlethiaPageHeader
        eyebrow="Camp cultures"
        title="Stories Woven Through Waipahu"
        subtitle="Each restored cottage holds a migration story—global journeys anchored in one plantation community."
      />
      <div style={styles.container}>
        <div style={styles.grid}>
          {CULTURES.map((culture, i) => (
            <motion.article
              key={culture.name}
              className="alethia-glass"
              style={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05 }}
            >
              <span style={styles.year}>{culture.year}</span>
              <h3 style={styles.cardTitle}>{culture.name}</h3>
              <p style={styles.cardDesc}>{culture.desc}</p>
            </motion.article>
          ))}
        </div>
        <div style={styles.quoteBlock} className="alethia-section-dark">
          <blockquote style={styles.quote}>
            &ldquo;History here is not a display case—it is a conversation between generations who still recognize these rooms.&rdquo;
          </blockquote>
          <cite style={styles.cite}>— Village docent collective</cite>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1, paddingBottom: '4rem' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' },
  card: { padding: '1.5rem' },
  year: { fontFamily: 'var(--font-alethia-display)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--alethia-accent)' },
  cardTitle: { fontSize: '1.15rem', margin: '0.5rem 0', fontWeight: 600 },
  cardDesc: { margin: 0, color: 'var(--alethia-text-muted)', lineHeight: 1.65, fontSize: '0.92rem' },
  quoteBlock: { borderRadius: 20, padding: '2.5rem', textAlign: 'center' },
  quote: { fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 },
  cite: { display: 'block', marginTop: '1rem', color: 'var(--alethia-text-muted-dark)', fontStyle: 'normal', fontSize: '0.9rem' },
};
