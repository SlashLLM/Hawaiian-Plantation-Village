import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, BookOpen, Quote, HelpCircle } from 'lucide-react';

const WAVES = [
  {
    year: '1852',
    nation: 'CHINA',
    ship: 'Thetis',
    peoples: 'Chinese Laborers',
    narrative: 'The pioneer wave of contract sugar workers arrived on the ship Thetis. Skilled in agriculture, they helped establish the early infrastructure of Hawaii’s sugar industry.',
    legacy: 'Introduced traditional dryland farming, society housing, and business stores in Waipahu.',
    color: '#d4981e'
  },
  {
    year: '1878',
    nation: 'PORTUGAL',
    ship: 'Priscilla',
    peoples: 'Portuguese Families',
    narrative: 'Arriving from the Madeira and Azores islands, Portuguese workers came as families. They built brick outdoor ovens (forno) to bake sweet sourdough breads.',
    legacy: 'Introduced the braguinha (which evolved into the ukulele) and the traditional forno oven.',
    color: '#b24e2c'
  },
  {
    year: '1885',
    nation: 'JAPAN',
    ship: 'City of Tokio',
    peoples: 'Japanese Immigrants',
    narrative: 'Following King Kalākaua’s treaty with the Meiji Emperor, thousands of Japanese laborers arrived, bringing strong communal associations and traditional shrines.',
    legacy: 'Established the bon dance (Obon) festivals, sushi, and shared local vocabulary.',
    color: '#22646d'
  },
  {
    year: '1900',
    nation: 'OKINAWA',
    ship: 'City of Peking',
    peoples: 'Okinawan Immigrants',
    narrative: 'Led by pioneer Kyuzo Toyama, Okinawans arrived as a distinct cultural group, bringing rich music (sanshin) and cooperative agricultural associations.',
    legacy: 'Brought Okinawan sanshin music, traditional pork dishes, and shishi lion dances.',
    color: '#d4981e'
  },
  {
    year: '1900',
    nation: 'PUERTO RICO',
    ship: 'Rio de Janeiro',
    peoples: 'Puerto Rican Laborers',
    narrative: 'Displaced by the San Ciriaco hurricane, Puerto Ricans brought rich Caribbean musical traditions and coffee-growing skills to Waipahu fields.',
    legacy: 'Introduced Kachi-Kachi music (a fusion of string lutes and percussion) and pasteles.',
    color: '#b24e2c'
  },
  {
    year: '1903',
    nation: 'KOREA',
    ship: 'Gaelic',
    peoples: 'Korean Immigrants',
    narrative: 'Arriving on the ship Gaelic, Korean immigrants were highly literate and organized, quickly establishing community schools and patriotic leagues.',
    legacy: 'Brought traditional pickled vegetables (kimchi) and strong educational societies.',
    color: '#22646d'
  },
  {
    year: '1906',
    nation: 'PHILIPPINES',
    ship: 'Doric',
    peoples: 'Filipino Laborers',
    narrative: 'Recruited by the Hawaii Sugar Planters’ Association, Filipino workers—predominantly Sakadas from Ilocos and Visayas—became the backbone of field work.',
    legacy: 'Introduced adobo, traditional string ensembles (Rondalla), and labor organization models.',
    color: '#d4981e'
  }
];

export default function Stories() {
  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.sectionBadge}>IMMIGRATION CHRONOLOGY</span>
          <h1 style={styles.title}>Waves of Waipahu</h1>
          <p style={styles.subtitle}>
            Scroll through history to witness the arrival of the contract laborers who shaped the cultural fabric of modern Hawaiʻi.
          </p>
        </header>

        {/* 3D Scrollable Timeline */}
        <div style={styles.timelineContainer}>
          {/* Vertical line indicator */}
          <div style={styles.timelineLine} />

          {WAVES.map((wave, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  ...styles.timelineItem,
                  flexDirection: isEven ? 'row' : 'row-reverse'
                }}
              >
                {/* 1. Date Node */}
                <div style={styles.dateColumn}>
                  <div 
                    style={{ 
                      ...styles.dateCircle, 
                      borderColor: wave.color,
                      boxShadow: `0 0 15px ${wave.color}40`
                    }}
                  >
                    <span style={{ ...styles.dateYear, color: wave.color }}>{wave.year}</span>
                  </div>
                </div>

                {/* 2. Timeline Spacer for visual centering */}
                <div style={styles.spacerColumn} />

                {/* 3. Immersive Era Card */}
                <div style={styles.cardColumn}>
                  <div 
                    className="exhibit-glass-card" 
                    style={{ 
                      ...styles.eraCard, 
                      borderLeft: `4px solid ${wave.color}` 
                    }}
                  >
                    <div style={styles.cardHeader}>
                      <div>
                        <span style={styles.nationLabel}>{wave.nation} ARRIVAL</span>
                        <h3 style={styles.peoplesTitle}>{wave.peoples}</h3>
                      </div>
                      <div style={styles.badge}>
                        <span style={styles.shipText}>SS {wave.ship}</span>
                      </div>
                    </div>
                    
                    <div style={styles.divider} />
                    
                    <p style={styles.narrativeText}>{wave.narrative}</p>
                    
                    <div style={styles.legacyBox}>
                      <BookOpen size={16} color={wave.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h4 style={styles.legacyTitle}>Cultural Legacy</h4>
                        <p style={styles.legacyText}>{wave.legacy}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Chronological Summary Notice */}
        <div style={styles.timelineFooter} className="exhibit-glass-card">
          <Quote size={32} color="var(--exhibit-gold)" style={{ marginBottom: '1rem' }} />
          <p style={styles.footerQuote}>
            "Out of the hardship of the fields came the sharing of food, music, and language. The blending of these waves created the unique local culture of Hawaiʻi today."
          </p>
          <span style={styles.footerAuthor}>WAIPAHU HISTORICAL ARCHIVE</span>
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
    maxWidth: '750px',
    margin: '0 auto 5rem auto'
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
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)'
  },
  timelineContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    marginBottom: '5rem',
    perspective: '1000px'
  },
  timelineLine: {
    position: 'absolute',
    top: '40px',
    bottom: '40px',
    left: '50%',
    width: '2px',
    backgroundColor: 'rgba(27, 56, 35, 0.15)',
    transform: 'translateX(-50%)',
    zIndex: 1,
    display: 'block'
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
    position: 'relative',
    transformStyle: 'preserve-3d'
  },
  dateColumn: {
    width: '45%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '2rem',
    boxSizing: 'border-box'
  },
  dateCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: 'var(--exhibit-bg-card)',
    border: '3px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    transition: 'transform 0.3s ease'
  },
  dateYear: {
    fontSize: '1.5rem',
    fontWeight: '800',
    fontFamily: 'var(--font-exhibit-mono)'
  },
  spacerColumn: {
    width: '10%'
  },
  cardColumn: {
    width: '45%',
    paddingLeft: '2rem',
    boxSizing: 'border-box'
  },
  eraCard: {
    padding: '2rem',
    boxSizing: 'border-box'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  },
  nationLabel: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    color: 'var(--exhibit-text-muted)',
    display: 'block',
    marginBottom: '4px'
  },
  peoplesTitle: {
    fontSize: '1.45rem',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1.2'
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    padding: '3px 8px',
    flexShrink: 0
  },
  shipText: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.65rem',
    color: 'var(--exhibit-gold)'
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    margin: '1.25rem 0'
  },
  narrativeText: {
    fontSize: '0.92rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1.25rem'
  },
  legacyBox: {
    display: 'flex',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    padding: '1rem',
    borderRadius: '10px'
  },
  legacyTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '2px'
  },
  legacyText: {
    fontSize: '0.82rem',
    lineHeight: '1.45',
    color: 'var(--exhibit-text-muted)',
    margin: 0
  },
  timelineFooter: {
    maxWidth: '750px',
    margin: '0 auto',
    padding: '3rem',
    textAlign: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  footerQuote: {
    fontSize: '1.15rem',
    lineHeight: '1.7',
    fontStyle: 'italic',
    color: 'var(--exhibit-text-light)',
    marginBottom: '1.25rem'
  },
  footerAuthor: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    color: 'var(--exhibit-gold)'
  },
  // Responsive layout overrides
  '@media (max-width: 900px)': {
    timelineLine: {
      left: '20px'
    },
    timelineItem: {
      flexDirection: 'column !important',
      alignItems: 'flex-start'
    },
    dateColumn: {
      width: '100%',
      justifyContent: 'flex-start',
      paddingLeft: '50px',
      marginBottom: '1rem'
    },
    spacerColumn: {
      display: 'none'
    },
    cardColumn: {
      width: '100%',
      paddingLeft: '50px'
    }
  }
};
