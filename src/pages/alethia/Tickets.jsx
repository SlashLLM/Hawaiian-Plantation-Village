import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, Ticket, Users } from 'lucide-react';
import AlethiaPageHeader from './AlethiaPageHeader';

const PLANS = [
  { id: 'adult', name: 'Adult Admission', price: 18, desc: 'Self-guided access plus optional docent tour.' },
  { id: 'child', name: 'Child (4–12)', price: 10, desc: 'Activity sheet included for young explorers.' },
  { id: 'family', name: 'Family Pack', price: 45, desc: 'Two adults + two children. Best value for groups.' },
  { id: 'school', name: 'School Group', price: 8, desc: 'Per student, minimum 15. Docent-led curriculum tour.' },
];

export default function Tickets() {
  const [selected, setSelected] = useState('adult');
  const [booked, setBooked] = useState(false);

  const plan = PLANS.find((p) => p.id === selected);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div style={styles.page} className="theme-alethia">
      <AlethiaPageHeader
        eyebrow="Tickets"
        title="Plan Your Visit"
        subtitle="Choose admission that fits your group. Tours depart on the hour, Tuesday through Saturday."
      />
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.planList}>
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  ...styles.planBtn,
                  ...(selected === p.id ? styles.planActive : {}),
                }}
              >
                <div>
                  <strong>{p.name}</strong>
                  <p style={styles.planDesc}>{p.desc}</p>
                </div>
                <span style={styles.planPrice}>${p.price}</span>
              </button>
            ))}
          </div>

          <motion.div className="alethia-glass" style={styles.summary} layout>
            <Ticket size={28} color="var(--alethia-primary)" />
            <h3 style={styles.summaryTitle}>{plan.name}</h3>
            <p style={styles.summaryPrice}>${plan.price} <span style={styles.per}>/ person</span></p>
            <ul style={styles.features}>
              <li style={styles.featureItem}><Calendar size={16} /> Tue–Sat, 9 AM – 2 PM</li>
              <li style={styles.featureItem}><Users size={16} /> Docent tours on the hour</li>
            </ul>
            <button className="alethia-btn-primary" style={styles.bookBtn} onClick={handleBook}>
              {booked ? <><Check size={16} /> Request Sent!</> : 'Request Booking'}
            </button>
            <p style={styles.note}>Demo booking flow — contact the village office to confirm.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1, paddingBottom: '4rem' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
  planList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  planBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
    border: '1px solid var(--alethia-border)',
    borderRadius: 16,
    background: 'var(--alethia-surface)',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'var(--font-alethia-body)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  planActive: { borderColor: 'var(--alethia-primary)', boxShadow: '0 0 0 2px rgba(15,118,110,0.15)' },
  planDesc: { margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--alethia-text-muted)' },
  planPrice: { fontFamily: 'var(--font-alethia-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--alethia-primary)' },
  summary: { padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' },
  summaryTitle: { fontSize: '1.25rem' },
  summaryPrice: { fontFamily: 'var(--font-alethia-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--alethia-primary)', margin: 0 },
  per: { fontSize: '0.9rem', fontWeight: 400, color: 'var(--alethia-text-muted)' },
  features: { listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--alethia-text-muted)' },
  featureItem: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  bookBtn: { width: '100%', justifyContent: 'center' },
  note: { fontSize: '0.78rem', color: 'var(--alethia-text-muted)', margin: 0 },
};
