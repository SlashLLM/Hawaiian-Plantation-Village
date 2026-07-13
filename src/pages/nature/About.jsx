import React from 'react';
import { Compass, BookOpen, Users, Calendar, ArrowRight, TreePine } from 'lucide-react';
import bangoImage from '../../assets/bango_lunch_tin.png';

export default function About() {
  const timeline = [
    {
      year: '1852',
      event: 'First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era.'
    },
    {
      year: '1878',
      event: 'Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele).'
    },
    {
      year: '1885',
      event: 'The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths.'
    },
    {
      year: '1897',
      event: 'Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline.'
    },
    {
      year: '1903',
      event: 'First Korean immigrants land in Honolulu, setting up language schools, churches, and active community organizations.'
    },
    {
      year: '1906',
      event: 'The First Filipino Sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.'
    },
    {
      year: '1946',
      event: 'The Oahu Sugar Company operations peak, transitioning into late-era modern farming until the mill’s eventual closure in 1995.'
    },
    {
      year: '1992',
      event: 'Hawaiian Plantation Village opens in Waipahu as a living cultural museum to preserve history and honor worker roots.'
    }
  ];

  return (
    <div style={styles.pageContainer} className="theme-nature">
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span style={styles.headerBadge}>PRESERVATION & MISSION</span>
          <h1 style={styles.pageTitle}>About the Village</h1>
          <p style={styles.pageSubtitle}>A cultural sanctuary in Waipahu preserving the memories, stories, and heritage of Oʻahu’s plantation communities.</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* About Grid */}
        <div style={styles.aboutGrid}>
          <div style={styles.leftCol}>
            <span style={styles.sectionBadge}>OUR MISSION</span>
            <h2 style={styles.sectionTitle}>Preserving the Roots of Modern Hawaii</h2>
            <p style={styles.bodyText}>
              Hawaiian Plantation Village is an outdoor living history museum and botanical sanctuary. Our mission is to share the history of the waves of immigration that defined Hawaii's multicultural society during the sugar plantation era.
            </p>
            <p style={styles.bodyText}>
              We aim to foster mutual understanding, pride, and respect among the descendants of the early plantation workers, and to educate visitors on the rich heritage that blossomed in the cane fields.
            </p>
            
            <div style={styles.pillarsGrid}>
              <div style={styles.pillarCard} className="nature-glass-card">
                <Compass size={22} color="var(--nature-earth)" />
                <h4>Preservation</h4>
                <p>Maintaining 25 authentic dwellings and thousands of household artifacts.</p>
              </div>
              <div style={styles.pillarCard} className="nature-glass-card">
                <BookOpen size={22} color="var(--nature-earth)" />
                <h4>Education</h4>
                <p>Developing curriculum resources and hosting thousands of HIDOE students annually.</p>
              </div>
            </div>
          </div>

          <div style={styles.rightCol}>
            <div style={styles.bangoCard} className="nature-glass-card">
              <img src={bangoImage} alt="Plantation Metal Bango Tag" style={styles.bangoImg} />
              <div style={styles.bangoContent}>
                <span style={styles.bangoBadge}>MUSEUM HIGHLIGHT</span>
                <h4 style={styles.bangoTitle}>The Bango System</h4>
                <p style={styles.bangoText}>
                  Workers were issued numbered metal tags called <strong>bango</strong>. Used for identification, payroll tracking, and plantation store credit, this numbering system highlighted the highly regimented nature of early sugar mill operations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div style={styles.timelineSection}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={styles.sectionBadge}>HISTORICAL PATHWAY</span>
            <h2 style={styles.sectionTitle}>Milestones of the Sugar Era</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              A timeline tracing the major immigrant group arrivals and cultural integrations that shaped Oʻahu.
            </p>
          </div>

          <div style={styles.timelineContainer}>
            {/* Center line */}
            <div style={styles.timelineLine} />

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} style={{
                  ...styles.timelineItem,
                  flexDirection: isEven ? 'row' : 'row-reverse'
                }}>
                  {/* Left/Right content side */}
                  <div style={styles.timelineCardSide}>
                    <div style={styles.timelineCard} className="nature-glass-card">
                      <span style={styles.timelineYear}>{item.year}</span>
                      <p style={styles.timelineEvent}>{item.event}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div style={styles.timelineDotBox}>
                    <div style={styles.timelineDot}>
                      <TreePine size={12} color="var(--nature-mist)" />
                    </div>
                  </div>

                  {/* Spacer side */}
                  <div style={styles.timelineCardSide} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: 'var(--nature-sand)',
    minHeight: '100vh',
    paddingBottom: '5rem',
    fontFamily: 'var(--font-nature-body)'
  },
  headerBlock: {
    background: 'linear-gradient(180deg, var(--nature-forest) 0%, #164228 100%)',
    color: 'var(--nature-mist)',
    padding: '5rem 0 4rem 0',
    textAlign: 'center',
    marginBottom: '3rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  headerBadge: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-emerald)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem'
  },
  pageTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '2.75rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
  },
  pageSubtitle: {
    fontSize: '1.05rem',
    color: '#cbd5e1',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '3.5rem',
    alignItems: 'start',
    marginBottom: '6rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  sectionBadge: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-moss)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem'
  },
  sectionTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '2rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '1.5rem',
    letterSpacing: '-0.01em'
  },
  bodyText: {
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#4b5563',
    marginBottom: '1.25rem'
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginTop: '1.5rem',
    width: '100%',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr'
    }
  },
  pillarCard: {
    padding: '1.5rem',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px'
  },
  pillarCardTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--nature-forest)'
  },
  rightCol: {
    width: '100%'
  },
  bangoCard: {
    padding: '2rem',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  bangoImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    objectFit: 'contain'
  },
  bangoContent: {
    width: '100%'
  },
  bangoBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
    display: 'block'
  },
  bangoTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  bangoText: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: '#4b5563'
  },
  timelineSection: {
    borderTop: '1px solid rgba(71, 118, 82, 0.12)',
    paddingTop: '5rem',
    position: 'relative'
  },
  timelineContainer: {
    position: 'relative',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 0'
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: 'rgba(71, 118, 82, 0.15)',
    transform: 'translateX(-50%)',
    zIndex: 1,
    '@media (max-width: 768px)': {
      left: '20px'
    }
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 2,
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'row !important',
      paddingLeft: '45px',
      marginBottom: '2rem'
    }
  },
  timelineCardSide: {
    width: '50%',
    padding: '0 2.5rem',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      width: '100%',
      padding: 0
    }
  },
  timelineCard: {
    padding: '1.75rem',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  timelineYear: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    marginBottom: '0.5rem'
  },
  timelineEvent: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#4b5563'
  },
  timelineDotBox: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    '@media (max-width: 768px)': {
      left: '20px'
    }
  },
  timelineDot: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--nature-forest)',
    border: '4px solid var(--nature-sand)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(11, 36, 22, 0.15)'
  }
};
