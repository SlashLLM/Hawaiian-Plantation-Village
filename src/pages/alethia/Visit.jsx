import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, ParkingCircle, ShieldAlert, ChevronDown, Ticket } from 'lucide-react';
import AlethiaPageHeader from './AlethiaPageHeader';

export default function Visit({ setActivePage }) {
  const [activeTab, setActiveTab] = useState('hours');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'How long does a typical visit take?', a: 'Plan 1.5 to 2 hours. Guided tours run about 90 minutes with time to explore gardens afterward.' },
    { q: 'Are the historic buildings accessible?', a: 'Some cottages have original steps or narrow doorways. Many structures have ramps and central pathways are wheelchair-friendly.' },
    { q: 'Is photography permitted?', a: 'Personal photography is encouraged. Commercial or wedding shoots require a permit from the office.' },
    { q: 'Is the village open in the rain?', a: 'Yes—rain or shine. Bring an umbrella; tours move between outdoor buildings.' },
  ];

  return (
    <div style={styles.page} className="theme-alethia">
      <AlethiaPageHeader
        eyebrow="Plan your journey"
        title="Visitor Experience"
        subtitle="Prepare for a meaningful walk through history, architecture, and lush tropical flora."
      />
      <div style={styles.container}>
        <div style={styles.tabs} className="alethia-glass">
          {['hours', 'parking', 'safety'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ ...styles.tabBtn, ...(activeTab === tab ? styles.tabActive : {}) }}
            >
              {tab === 'hours' ? 'Hours & Tours' : tab === 'parking' ? 'Directions' : 'Guidelines'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="alethia-glass"
            style={styles.panel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {activeTab === 'hours' && (
              <>
                <h3 style={styles.panelTitle}>Opening Hours</h3>
                <InfoRow icon={Clock} title="Tuesday – Saturday" text="9:00 AM – 2:00 PM" />
                <InfoRow icon={Ticket} title="Guided Tours" text="Depart on the hour. Last tour at 1:00 PM." />
                <button className="alethia-btn-primary" style={{ marginTop: '1rem' }} onClick={() => setActivePage('tickets')}>
                  Book Tickets
                </button>
              </>
            )}
            {activeTab === 'parking' && (
              <>
                <h3 style={styles.panelTitle}>Getting Here</h3>
                <InfoRow icon={MapPin} title="Address" text="94-695 Waipahu Street, Waipahu, HI 96797" />
                <InfoRow icon={ParkingCircle} title="Parking" text="Free onsite parking. Bus routes 42 and 43 serve Waipahu." />
              </>
            )}
            {activeTab === 'safety' && (
              <>
                <h3 style={styles.panelTitle}>Visitor Guidelines</h3>
                <InfoRow icon={ShieldAlert} title="Respect the grounds" text="Stay with your guide, do not climb structures, and supervise children." />
                <InfoRow icon={ShieldAlert} title="Weather ready" text="Wear comfortable shoes and bring water. Paths are mostly outdoors." />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <section style={styles.faqSection}>
          <h2 style={styles.faqTitle}>Frequently asked</h2>
          {faqs.map((faq, i) => (
            <div key={faq.q} className="alethia-glass" style={styles.faqItem}>
              <button style={styles.faqBtn} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                {faq.q}
                <ChevronDown size={18} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {openFaq === i && <p style={styles.faqAnswer}>{faq.a}</p>}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, title, text }) {
  return (
    <div style={styles.infoRow}>
      <Icon size={20} color="var(--alethia-primary)" />
      <div>
        <strong style={styles.infoTitle}>{title}</strong>
        <p style={styles.infoText}>{text}</p>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1, paddingBottom: '4rem' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' },
  tabs: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '0.5rem', marginBottom: '1rem' },
  tabBtn: { flex: 1, minWidth: '120px', padding: '0.65rem 1rem', border: 'none', borderRadius: 12, background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-alethia-body)', fontWeight: 500, color: 'var(--alethia-text-muted)' },
  tabActive: { background: 'var(--alethia-primary)', color: '#fff', fontWeight: 600 },
  panel: { padding: '1.75rem', marginBottom: '2.5rem' },
  panelTitle: { fontSize: '1.25rem', marginBottom: '1.25rem' },
  infoRow: { display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' },
  infoTitle: { display: 'block', fontFamily: 'var(--font-alethia-display)', marginBottom: 4 },
  infoText: { margin: 0, color: 'var(--alethia-text-muted)', lineHeight: 1.6 },
  faqSection: { marginTop: '1rem' },
  faqTitle: { fontSize: '1.5rem', marginBottom: '1rem' },
  faqItem: { marginBottom: '0.75rem', overflow: 'hidden' },
  faqBtn: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-alethia-body)', fontWeight: 600, textAlign: 'left', color: 'var(--alethia-text)' },
  faqAnswer: { padding: '0 1.25rem 1.25rem', margin: 0, color: 'var(--alethia-text-muted)', lineHeight: 1.65 },
};
