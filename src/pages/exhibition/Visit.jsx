import React from 'react';
import { Clock, MapPin, Info, Phone, Mail, Navigation, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Visit({ setActivePage }) {
  const cards = [
    {
      icon: <Clock size={24} color="var(--exhibit-gold)" />,
      title: 'OPERATING HOURS',
      lines: [
        { text: 'Tuesday – Saturday: 9:00 AM – 2:00 PM', bold: true },
        { text: 'Guided Tours: 10:00 AM & 12:00 PM', bold: false },
        { text: 'Closed Sundays, Mondays & Major Holidays', bold: false }
      ],
      extra: 'Tours are included in the price of admission and last approximately 90 minutes.'
    },
    {
      icon: <Info size={24} color="var(--exhibit-gold)" />,
      title: 'ADMISSION RATES',
      lines: [
        { text: 'Adults: $17.00', bold: true },
        { text: 'Kamaʻāina / Military (with ID): $12.00', bold: false },
        { text: 'Children (Ages 5 – 12): $8.00', bold: false },
        { text: 'Under 5 Years Old: Free', bold: false }
      ],
      extra: 'Group discounts are available for bookings of 10 or more people. Advance reservation required.'
    },
    {
      icon: <MapPin size={24} color="var(--exhibit-gold)" />,
      title: 'VILLAGE LOCATION',
      lines: [
        { text: '94-695 Waipahu Street', bold: true },
        { text: 'Waipahu, Oʻahu, HI 96797', bold: true },
        { text: 'Free onsite parking available', bold: false }
      ],
      extra: 'Located just 30 minutes from Honolulu, off the H-1 Freeway (Exit 8B toward Waipahu).'
    }
  ];

  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.sectionBadge}>DIRECTIONS & HOURS</span>
          <h1 style={styles.title}>Plan Your Expedition</h1>
          <p style={styles.subtitle}>
            Prepare for your journey back in time. Discover our operating schedule, ticket rates, and location details below.
          </p>
        </header>

        {/* Info Cards Grid */}
        <div style={styles.grid}>
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="exhibit-glass-card"
              style={styles.card}
            >
              <div style={styles.cardHeader}>
                <div style={styles.iconContainer}>{card.icon}</div>
                <h3 style={styles.cardTitle}>{card.title}</h3>
              </div>
              <div style={styles.cardDivider} />
              <div style={styles.cardContent}>
                {card.lines.map((line, lIdx) => (
                  <p 
                    key={lIdx} 
                    style={{ 
                      ...styles.cardLine, 
                      fontWeight: line.bold ? '700' : '400',
                      color: line.bold ? 'var(--exhibit-text-light)' : 'var(--exhibit-text-muted)'
                    }}
                  >
                    {line.text}
                  </p>
                ))}
                {card.extra && (
                  <div style={styles.cardExtra}>
                    <p style={styles.extraText}>{card.extra}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Map / Getting Here Column Module */}
        <div style={styles.mapSection} className="exhibit-glass-card">
          <div style={styles.mapGrid}>
            <div style={styles.mapTextCol}>
              <span style={styles.sectionBadge}>NAVIGATION GUIDE</span>
              <h2 style={styles.mapTitle}>Finding the Village</h2>
              <p style={styles.mapDesc}>
                Our historic 50-acre outdoor museum is nestled in the heart of Waipahu, Oʻahu. We are situated next to Waipahu District Park. Look for the tall sugar mill smokestack silhouette as a historical landmark!
              </p>
              
              <div style={styles.contactDetails}>
                <div style={styles.contactItem}>
                  <Phone size={18} color="var(--exhibit-gold)" />
                  <span>(808) 677-0110</span>
                </div>
                <div style={styles.contactItem}>
                  <Mail size={18} color="var(--exhibit-gold)" />
                  <span>info@hawaiiplantationvillage.org</span>
                </div>
              </div>

              <div style={styles.btnRow}>
                <a 
                  href="https://maps.google.com/?q=94-695+Waipahu+Street,+Waipahu,+HI+96797" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="exhibit-btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Navigation size={16} /> Open in Google Maps
                </a>
                <button className="exhibit-btn-secondary" onClick={() => setActivePage('tickets')}>
                  Book Entry Ticket <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Custom 3D interactive compass map card */}
            <div style={styles.mapVisualCol}>
              <motion.div 
                whileHover={{ rotateY: 8, rotateX: -4 }}
                transition={{ duration: 0.3 }}
                style={styles.compassCard}
                className="exhibit-glass-card"
              >
                <div style={styles.compassHeader}>
                  <span style={styles.compassBrand}>HPCo. ARCHIVE MAP</span>
                  <div style={styles.tagHole} />
                </div>
                
                {/* Simulated 2.5D schematic of the highway route */}
                <div style={styles.highwayVisual}>
                  <div style={styles.compassGridLines} />
                  <div style={styles.roadLine}>
                    <span style={styles.roadLabel}>H-1 FREEWAY</span>
                  </div>
                  <div style={styles.exitLine}>
                    <span style={styles.exitLabel}>EXIT 8B (WAIPAHU)</span>
                  </div>
                  <div style={styles.targetMark}>
                    <div style={styles.targetPulse} />
                    <div style={styles.targetCore} />
                    <span style={styles.targetLabel}>YOU ARE GOING HERE</span>
                  </div>
                </div>

                <div style={styles.compassFooter}>
                  <span>SCALE: 1" = 500 FT</span>
                  <span>OʻAHU, HAWAIʻI</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    boxSizing: 'border-box'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 4rem auto'
  },
  sectionBadge: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    color: 'var(--exhibit-gold)',
    display: 'block',
    marginBottom: '0.75rem'
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.05rem',
    lineHeight: '1.6',
    color: 'var(--exhibit-text-muted)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  },
  card: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxSizing: 'border-box'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '1.25rem'
  },
  iconContainer: {
    width: '46px',
    height: '46px',
    borderRadius: '10px',
    backgroundColor: 'rgba(212, 152, 30, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(212, 152, 30, 0.15)'
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    color: '#ffffff',
    fontFamily: 'var(--font-exhibit-display)'
  },
  cardDivider: {
    height: '1px',
    backgroundColor: 'rgba(212, 152, 30, 0.15)',
    marginBottom: '1.25rem'
  },
  cardContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardLine: {
    fontSize: '0.92rem',
    lineHeight: '1.5',
    marginBottom: '0.75rem'
  },
  cardExtra: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderLeft: '2px solid var(--exhibit-gold)',
    padding: '10px 12px',
    borderRadius: '4px',
    marginTop: '1rem'
  },
  extraText: {
    fontSize: '0.8rem',
    color: 'var(--exhibit-text-muted)',
    lineHeight: '1.4',
    margin: 0
  },
  mapSection: {
    padding: '3rem',
    boxSizing: 'border-box'
  },
  mapGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    alignItems: 'center'
  },
  mapTextCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  mapTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem'
  },
  mapDesc: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1.5rem'
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.92rem',
    color: 'var(--exhibit-text-light)'
  },
  btnRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  mapVisualCol: {
    display: 'flex',
    justifyContent: 'center',
    perspective: '1000px'
  },
  compassCard: {
    width: '100%',
    maxWidth: '340px',
    height: '320px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transformStyle: 'preserve-3d',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  compassHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  compassBrand: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    color: 'var(--exhibit-gold)'
  },
  tagHole: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#0c0f12',
    border: '2px solid rgba(212,152,30,0.3)'
  },
  highwayVisual: {
    position: 'relative',
    height: '180px',
    border: '1px solid rgba(212,152,30,0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  compassGridLines: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(212,152,30,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,152,30,0.05) 1px, transparent 1px)',
    backgroundSize: '15px 15px'
  },
  roadLine: {
    position: 'absolute',
    top: '50px',
    left: 0,
    right: 0,
    height: '12px',
    backgroundColor: '#334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'rotate(-5deg)'
  },
  roadLabel: {
    fontSize: '0.55rem',
    fontWeight: '700',
    color: '#cbd5e1',
    letterSpacing: '0.08em'
  },
  exitLine: {
    position: 'absolute',
    top: '55px',
    left: '80px',
    width: '10px',
    height: '80px',
    backgroundColor: '#475569',
    transform: 'rotate(10deg)'
  },
  exitLabel: {
    position: 'absolute',
    top: '30px',
    left: '15px',
    fontSize: '0.5rem',
    color: 'var(--exhibit-gold)',
    whiteSpace: 'nowrap',
    transform: 'rotate(-10deg)',
    fontFamily: 'var(--font-exhibit-mono)',
    fontWeight: '700'
  },
  targetMark: {
    position: 'absolute',
    top: '110px',
    left: '95px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  targetPulse: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'var(--exhibit-gold)',
    opacity: 0.4,
    animation: 'nature-fade-in 2s infinite ease-in-out',
    animationName: 'exhibit-pulse'
  },
  targetCore: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--exhibit-gold)',
    zIndex: 2
  },
  targetLabel: {
    fontSize: '0.5rem',
    color: '#ffffff',
    fontWeight: '700',
    marginTop: '6px',
    whiteSpace: 'nowrap',
    letterSpacing: '0.05em',
    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
  },
  compassFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.62rem',
    color: 'var(--exhibit-text-muted)',
    fontFamily: 'var(--font-exhibit-mono)'
  }
};
