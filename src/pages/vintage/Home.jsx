import React, { useRef } from 'react';
import HeroVideoPixi from '../../components/HeroVideoPixi';
import BellToBell from '../../components/BellToBell';
import sugarcaneField from '../../assets/sugarcane_field.png';
import campHouse from '../../assets/historic_camp_house.png';
import { Calendar, Clock, MapPin, Info, ArrowRight, UserPlus, Mail } from 'lucide-react';

export default function Home({ setActivePage }) {
  const visitRef = useRef(null);

  const handleExplore = () => {
    visitRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookTickets = () => {
    setActivePage('tickets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const events = [
    {
      date: 'AUG 15',
      title: 'Obon Festival & Bon Dance',
      time: '5:00 PM - 9:00 PM',
      desc: 'Celebrate plantation ancestral roots with traditional music, dancing, and local food stalls in the central courtyard.'
    },
    {
      date: 'SEP 12',
      title: 'Plantation Heritage Day',
      time: '10:00 AM - 3:00 PM',
      desc: 'Live cultural demonstrations, including Portuguese stone-oven bread baking, Okinawan sanshin playing, and historic crafts.'
    }
  ];

  return (
    <div>
      {/* 1. Hero Video Pixi */}
      <HeroVideoPixi onExploreClick={handleExplore} />

      {/* 2. Quick Visit-Planning Module */}
      <div ref={visitRef} style={styles.quickVisitSection}>
        <div style={styles.container}>
          <div style={styles.quickGrid}>
            <div style={styles.quickItem}>
              <Clock size={20} color="var(--tin-rust)" />
              <div>
                <h4 style={styles.quickTitle}>HOURS OF OPERATION</h4>
                <p style={styles.quickText}>Tuesday – Saturday: 9:00 AM – 2:00 PM</p>
                <p style={styles.quickSubtext}>Guided tours at 10:00 AM & 12:00 PM</p>
              </div>
            </div>

            <div style={styles.quickItem}>
              <MapPin size={20} color="var(--tin-rust)" />
              <div>
                <h4 style={styles.quickTitle}>LOCATION</h4>
                <p style={styles.quickText}>94-695 Waipahu Street</p>
                <p style={styles.quickSubtext}>Waipahu, Oʻahu (Free parking onsite)</p>
              </div>
            </div>

            <div style={styles.quickItem}>
              <Info size={20} color="var(--tin-rust)" />
              <div>
                <h4 style={styles.quickTitle}>ADMISSION</h4>
                <p style={styles.quickText}>Adults: $17 | Kamaʻāina/Military: $12</p>
                <p style={styles.quickSubtext}>Children (5-12): $8 | Under 5: Free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "Why Visit" - Experiential Storytelling */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.twoColumnGrid}>
            <div style={styles.textCol}>
              <span className="ink-stamp green" style={{ marginBottom: '1rem' }}>Living Museum</span>
              <h2 style={styles.sectionTitle}>Where Hawaiʻi’s Roots Run Deep</h2>
              <p style={styles.bodyText}>
                Hawaiian Plantation Village is an outdoor, living history museum located in Waipahu. It tells the story of the immigrants who arrived in Hawaiʻi from China, Portugal, Japan, Puerto Rico, Korea, the Philippines, Okinawa, and other nations during the sugar plantation era (1852–1946).
              </p>
              <p style={styles.bodyText}>
                Explore 25 authentic, fully restored camp houses, complete with period furniture, personal artifacts, and lush heritage gardens. Walk the same paths as the workers, feel the heat of the stone ovens, and hear the stories of the community that shaped Hawaii\'s unique multicultural society.
              </p>
              <div style={styles.btnRow}>
                <button className="btn-primary" onClick={() => setActivePage('about')}>
                  Discover Our History
                </button>
                <button className="btn-secondary" onClick={() => setActivePage('visit')}>
                  Plan Your Visit
                </button>
              </div>
            </div>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={campHouse} alt="Historic Camp Houses at the Village" style={styles.featuredImg} />
                <div style={styles.imgTextureOverlay} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Bell to Bell" Choice-based Game */}
      <section style={{ ...styles.section, backgroundColor: 'var(--paper-dark)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="ink-stamp rust" style={{ marginBottom: '1rem' }}>Interactive Log</span>
            <h2 style={styles.sectionTitle}>Step Into Their Shoes</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              Simulate one day on the plantation. Hear the morning whistle, complete tasks in the cane rows, and gather in the community camp at sunset.
            </p>
          </div>
          <BellToBell onVisitClick={handleBookTickets} />
        </div>
      </section>

      {/* 5. School and Educator Callout */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={{ ...styles.twoColumnGrid, gridTemplateColumns: '1fr 1.2fr' }}>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={sugarcaneField} alt="Sugarcane fields in Waipahu" style={styles.featuredImg} />
                <div style={styles.imgTextureOverlay} />
              </div>
            </div>
            <div style={styles.textCol}>
              <span className="ink-stamp teal" style={{ marginBottom: '1rem' }}>For Educators</span>
              <h2 style={styles.sectionTitle}>Curriculum & Field Trips</h2>
              <p style={styles.bodyText}>
                Bring history to life for your students. We offer structured field trips and curriculum-linked educational packages that cover the waves of plantation immigration, camp structures, cultural preservation, and the economic history of Oʻahu.
              </p>
              <p style={styles.bodyText}>
                Our resources align directly with Hawaii Department of Education social studies and history standards, making field trips educational, engaging, and memorable.
              </p>
              <div style={styles.btnRow}>
                <button className="btn-primary" onClick={() => setActivePage('learn')}>
                  Schedule a Field Trip <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events */}
      <section style={{ ...styles.section, backgroundColor: 'var(--paper-dark)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="ink-stamp gold" style={{ marginBottom: '1rem' }}>Calendar</span>
            <h2 style={styles.sectionTitle}>Upcoming Community Programs</h2>
          </div>
          
          <div style={styles.eventsGrid}>
            {events.map((ev, idx) => (
              <div key={idx} className="paper-card" style={styles.eventCard}>
                <div style={styles.eventDateBlock}>
                  <Calendar size={18} color="var(--tin-rust)" />
                  <span style={styles.eventDateText}>{ev.date}</span>
                </div>
                <div style={styles.eventBody}>
                  <h3 style={styles.eventTitle}>{ev.title}</h3>
                  <span style={styles.eventTime}>{ev.time}</span>
                  <p style={styles.eventDesc}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer Newsletter & CTA */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <h3 style={styles.footerBrand}>Hawaiian Plantation Village</h3>
              <p style={styles.footerText}>
                A non-profit cultural heritage destination dedicated to preserving the history of Hawaii\'s plantation workers and immigrant roots.
              </p>
              <p style={styles.footerContact}>
                Phone: (808) 677-0110 <br />
                Email: info@hawaiianplantationvillage.org
              </p>
            </div>
            
            <div style={styles.newsletterBox}>
              <h4 style={styles.footerHeader}>JOIN THE LEDGER NEWSLETTER</h4>
              <p style={styles.footerText}>Receive updates on seasonal festivals, lectures, and volunteer days.</p>
              <div style={styles.emailForm}>
                <input type="email" placeholder="Your Email Address" style={styles.emailInput} />
                <button className="btn-primary" style={styles.emailBtn}>
                  <Mail size={16} /> Join
                </button>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p>© 2026 Hawaiian Plantation Village. All rights reserved. Built for cultural stewardship.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  quickVisitSection: {
    backgroundColor: 'var(--koa-wood)',
    borderBottom: '4px solid var(--sugar-gold)',
    color: 'var(--kraft-tan)',
    padding: '1.5rem 0'
  },
  quickGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1.5rem'
    }
  },
  quickItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flex: '1',
    minWidth: '240px'
  },
  quickTitle: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    color: 'var(--sugar-gold)',
    marginBottom: '4px'
  },
  quickText: {
    fontSize: '0.95rem',
    color: 'var(--paper-light)',
    marginBottom: '2px',
    fontWeight: '600'
  },
  quickSubtext: {
    fontSize: '0.8rem',
    color: 'var(--kraft-tan-dark)'
  },
  section: {
    padding: '5rem 0',
    overflow: 'hidden'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 850px)': {
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
    fontSize: '2.5rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1.5rem',
    lineHeight: '1.15'
  },
  bodyText: {
    fontSize: '1.05rem',
    color: 'var(--text-dark)',
    marginBottom: '1.25rem'
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '1.5rem'
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
    maxWidth: '480px'
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
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  eventCard: {
    padding: '1.75rem',
    borderRadius: '4px',
    display: 'flex',
    gap: '1.5rem',
    '@media (max-width: 500px)': {
      flexDirection: 'column',
      gap: '1rem'
    }
  },
  eventDateBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed var(--kraft-tan-dark)',
    backgroundColor: 'var(--paper-dark)',
    width: '90px',
    height: '90px',
    flexShrink: 0
  },
  eventDateText: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    marginTop: '6px'
  },
  eventBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  eventTitle: {
    fontSize: '1.3rem',
    color: 'var(--koa-wood)',
    marginBottom: '4px'
  },
  eventTime: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '10px'
  },
  eventDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    lineHeight: '1.5'
  },
  footer: {
    backgroundColor: 'var(--koa-wood-dark)',
    color: 'var(--kraft-tan)',
    padding: '4rem 0 2rem 0',
    borderTop: '5px solid var(--cane-green)'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '4rem',
    marginBottom: '3rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  footerBrand: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    color: 'var(--paper-light)',
    marginBottom: '1rem'
  },
  footerText: {
    fontSize: '0.9rem',
    color: 'var(--kraft-tan-dark)',
    marginBottom: '1.5rem',
    maxWidth: '500px'
  },
  footerContact: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    lineHeight: '1.6',
    color: 'var(--kraft-tan)'
  },
  newsletterBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  footerHeader: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    color: 'var(--sugar-gold)',
    marginBottom: '1rem'
  },
  emailForm: {
    display: 'flex',
    width: '100%',
    maxWidth: '420px',
    gap: '8px'
  },
  emailInput: {
    flex: '1',
    padding: '0.75rem 1rem',
    border: '1px solid var(--koa-wood)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'var(--paper-light)',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-sans)'
  },
  emailBtn: {
    padding: '0.75rem 1.25rem'
  },
  footerBottom: {
    borderTop: '1px solid rgba(204, 180, 149, 0.1)',
    paddingTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: 'var(--kraft-tan-dark)'
  }
};
