import React from 'react';
import { Compass, BookOpen, Users, Calendar, ArrowRight } from 'lucide-react';
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
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className="ink-stamp green" style={{ marginBottom: '0.5rem' }}>Preservation</span>
          <h1 style={styles.pageTitle}>About the Village</h1>
          <p style={styles.pageSubtitle}>A cultural sanctuary in Waipahu preserving stories and memories of Oʻahu’s plantation communities.</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* Mission statement */}
        <section style={styles.aboutSection}>
          <div style={styles.twoColumnGrid}>
            <div style={styles.textCol}>
              <span className="ledger-header" style={{ marginBottom: '0.5rem' }}>MISSION & VISION</span>
              <h2 style={styles.sectionTitle}>Preserving the Roots of Modern Hawaiʻi</h2>
              <p style={styles.bodyText}>
                Hawaiian Plantation Village is an outdoor museum cataloging the historical memories of the waves of immigration that arrived between 1852 and 1946. Our mission is to share the history, culture, and values of the communities that shaped modern Hawaii.
              </p>
              <p style={styles.bodyText}>
                We maintain 25 authentic or reconstructed camp homes representing the domestic lives of the Chinese, Japanese, Filipino, Portuguese, Korean, Puerto Rican, Okinawan, and Spanish workers. It is a testament to the resilience, solidarity, and cross-cultural unity that gave birth to Hawaii\'s unique local identity.
              </p>
            </div>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={bangoImage} alt="Vintage Bango tags and lunch tin" style={styles.featuredImg} />
                <div style={styles.imgTextureOverlay} />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={styles.timelineSection}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="ink-stamp rust" style={{ marginBottom: '1rem' }}>CHRONICLES</span>
            <h2 style={styles.sectionTitle}>Plantation Era Timeline</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              Key historical milestones of immigration waves, industrial growth, and cultural synthesis in Hawaii.
            </p>
          </div>

          <div style={styles.timelineList}>
            {timeline.map((item, idx) => (
              <div key={idx} style={styles.timelineItem}>
                <div style={styles.timelineYear}>{item.year}</div>
                <div style={styles.timelineBody}>
                  <p style={styles.timelineText}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section style={styles.aboutSection}>
          <h2 style={{ ...styles.sectionTitle, textAlign: 'center', marginBottom: '2.5rem' }}>Leadership & Board</h2>
          <div style={styles.boardGrid}>
            <div className="paper-card" style={styles.boardCard}>
              <h4 style={styles.boardName}>Jeanne Ishikawa</h4>
              <span style={styles.boardRole}>Executive Director</span>
              <p style={styles.boardDesc}>Oversees daily operations, site preservation projects, and curates cultural programs.</p>
            </div>
            <div className="paper-card" style={styles.boardCard}>
              <h4 style={styles.boardName}>Dr. Glenn Kawatachi</h4>
              <span style={styles.boardRole}>Board President</span>
              <p style={styles.boardDesc}>Leads institutional fundraising, historical verification committees, and university partnerships.</p>
            </div>
            <div className="paper-card" style={styles.boardCard}>
              <h4 style={styles.boardName}>Alvin Ramos</h4>
              <span style={styles.boardRole}>Head Site Preservationist</span>
              <p style={styles.boardDesc}>Maintains structural integrity of the 25 camp homes using original wood-grain carpentry tools.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    paddingBottom: '5rem'
  },
  headerBlock: {
    backgroundColor: 'var(--paper-dark)',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    padding: '3.5rem 0',
    marginBottom: '3rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  pageTitle: {
    fontSize: '2.8rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '0.5rem'
  },
  pageSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.15rem',
    color: 'var(--text-muted)',
    maxWidth: '700px'
  },
  aboutSection: {
    padding: '3.5rem 0'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1.25rem'
  },
  bodyText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: 'var(--text-dark)',
    marginBottom: '1.25rem'
  },
  imgCol: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  imgWrapper: {
    position: 'relative',
    borderRadius: '4px',
    border: '3px solid var(--koa-wood)',
    padding: '6px',
    backgroundColor: 'var(--paper-light)',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '450px'
  },
  featuredImg: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    display: 'block'
  },
  imgTextureOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
    pointerEvents: 'none'
  },
  // Timeline styles
  timelineSection: {
    padding: '4rem 0',
    backgroundColor: 'var(--paper-dark)',
    margin: '3rem -1.5rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem'
  },
  timelineList: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
    paddingLeft: '2rem',
    borderLeft: '2px dashed var(--kraft-tan-dark)'
  },
  timelineItem: {
    position: 'relative',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  timelineYear: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  timelineBody: {
    backgroundColor: 'var(--paper-light)',
    padding: '1rem 1.25rem',
    borderRadius: '4px',
    border: '1px solid var(--kraft-tan-dark)',
    boxShadow: 'var(--shadow-sm)'
  },
  timelineText: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: 'var(--text-dark)',
    margin: 0
  },
  // Board styles
  boardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem'
  },
  boardCard: {
    padding: '1.75rem',
    borderRadius: '4px'
  },
  boardName: {
    fontSize: '1.25rem',
    color: 'var(--koa-wood)',
    marginBottom: '2px'
  },
  boardRole: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    textTransform: 'uppercase',
    display: 'inline-block',
    marginBottom: '12px'
  },
  boardDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  }
};
