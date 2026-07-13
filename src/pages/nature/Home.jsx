import React, { useRef } from 'react';
import BellToBell from '../../components/BellToBell';
import sugarcaneField from '../../assets/sugarcane_field.png';
import campHouse from '../../assets/historic_camp_house.png';
import { Calendar, Clock, MapPin, Info, ArrowRight, TreePine, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div style={styles.pageContainer} className="theme-nature">
      {/* 1. Modern Botanical Hero */}
      <div style={styles.heroSection}>
        {/* Subtle leafy background elements */}
        <div style={styles.heroBgPattern} />
        
        <div style={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.heroBadge}
          >
            <TreePine size={14} color="var(--nature-emerald)" />
            <span>ESTABLISHED 1992 | WAIPAHU, OʻAHU</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={styles.heroTitle}
          >
            Where History & Nature Coexist
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={styles.heroSub}
          >
            Explore Waipahu's rich cultural heritage set within a peaceful sanctuary of heritage gardens, native flora, and historic buildings.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={styles.heroBtnGroup}
          >
            <button className="nature-btn-primary" onClick={handleExplore}>
              Plan Your Journey
            </button>
            <button className="nature-btn-secondary" style={{ color: 'var(--nature-mist)', borderColor: 'var(--nature-mist)' }} onClick={() => setActivePage('about')}>
              Discover Our Roots
            </button>
          </motion.div>
        </div>

        {/* Diagonal cut overlay */}
        <div style={styles.heroWaveBottom} />
      </div>

      {/* 2. Quick Visit-Planning Module */}
      <div ref={visitRef} style={styles.quickVisitSection}>
        <div style={styles.container}>
          <div style={styles.quickGrid}>
            <div style={styles.quickItem} className="nature-glass-card">
              <div style={styles.quickIconContainer}>
                <Clock size={20} color="var(--nature-forest)" />
              </div>
              <div>
                <h4 style={styles.quickTitle}>HOURS OF OPERATION</h4>
                <p style={styles.quickText}>Tuesday – Saturday: 9:00 AM – 2:00 PM</p>
                <p style={styles.quickSubtext}>Guided tours at 10:00 AM & 12:00 PM</p>
              </div>
            </div>

            <div style={styles.quickItem} className="nature-glass-card">
              <div style={styles.quickIconContainer}>
                <MapPin size={20} color="var(--nature-forest)" />
              </div>
              <div>
                <h4 style={styles.quickTitle}>LOCATION</h4>
                <p style={styles.quickText}>94-695 Waipahu Street</p>
                <p style={styles.quickSubtext}>Waipahu, Oʻahu (Free parking onsite)</p>
              </div>
            </div>

            <div style={styles.quickItem} className="nature-glass-card">
              <div style={styles.quickIconContainer}>
                <Info size={20} color="var(--nature-forest)" />
              </div>
              <div>
                <h4 style={styles.quickTitle}>ADMISSION</h4>
                <p style={styles.quickText}>Adults: $17 | Kamaʻāina/Military: $12</p>
                <p style={styles.quickSubtext}>Children (5-12): $8 | Under 5: Free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Living Museum Experiential Storytelling */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.twoColumnGrid}>
            <div style={styles.textCol}>
              <span style={styles.sectionBadge}>LIVING SANCTUARY</span>
              <h2 style={styles.sectionTitle}>An Oasis of Living History</h2>
              <p style={styles.bodyText}>
                Hawaiian Plantation Village is an outdoor museum located in Waipahu. It preserves the profound legacy of immigrant communities who arrived in Hawaiʻi from China, Portugal, Japan, Puerto Rico, Korea, the Philippines, Okinawa, and other nations during the sugar plantation era (1852–1946).
              </p>
              <p style={styles.bodyText}>
                Explore 25 authentic, fully restored camp houses, complete with period furniture, personal artifacts, and lush heritage gardens. Walk the same paths as the workers, feel the heat of the stone ovens, and hear the stories of the community that shaped Hawaii's unique multicultural society.
              </p>
              <div style={styles.btnRow}>
                <button className="nature-btn-primary" onClick={() => setActivePage('about')}>
                  Explore History
                </button>
                <button className="nature-btn-secondary" onClick={() => setActivePage('visit')}>
                  Plan Visit
                </button>
              </div>
            </div>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={campHouse} alt="Historic Camp Houses at the Village" style={styles.featuredImg} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Choice-based Game in Nature theme */}
      <section style={{ ...styles.section, backgroundColor: 'rgba(71, 118, 82, 0.05)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={styles.sectionBadge}>INTERACTIVE DIALOGUE</span>
            <h2 style={styles.sectionTitle}>Step Into Their Shoes</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              Simulate one day on the plantation. Hear the morning whistle, complete tasks in the cane rows, and gather in the community camp at sunset.
            </p>
          </div>
          {/* We style the game box slightly cleaner */}
          <div style={styles.gameCard} className="nature-glass-card">
            <BellToBell onVisitClick={handleBookTickets} />
          </div>
        </div>
      </section>

      {/* 5. School and Educator Callout */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={{ ...styles.twoColumnGrid, gridTemplateColumns: '1fr 1.2fr' }}>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={sugarcaneField} alt="Sugarcane fields in Waipahu" style={styles.featuredImg} />
              </div>
            </div>
            <div style={styles.textCol}>
              <span style={styles.sectionBadge}>EDUCATIONAL OUTREACH</span>
              <h2 style={styles.sectionTitle}>Curriculum & Field Trips</h2>
              <p style={styles.bodyText}>
                Bring history to life for your students. We offer structured field trips and curriculum-linked educational packages that cover the waves of plantation immigration, camp structures, cultural preservation, and the economic history of Oʻahu.
              </p>
              <p style={styles.bodyText}>
                Our resources align directly with Hawaii Department of Education social studies and history standards, making field trips educational, engaging, and memorable.
              </p>
              <div style={styles.btnRow}>
                <button className="nature-btn-primary" onClick={() => setActivePage('learn')}>
                  Schedule a Field Trip <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events */}
      <section style={{ ...styles.section, backgroundColor: 'rgba(71, 118, 82, 0.05)', paddingBottom: '5rem' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={styles.sectionBadge}>COMMUNITY CHRONICLES</span>
            <h2 style={styles.sectionTitle}>Upcoming Cultural Gatherings</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              Celebrate the living traditions and diversity of Waipahu with music, food, and historical demonstrations.
            </p>
          </div>
          <div style={styles.eventsGrid}>
            {events.map((ev, index) => (
              <div key={index} style={styles.eventCard} className="nature-glass-card">
                <div style={styles.eventDateBox}>
                  <Calendar size={18} color="var(--nature-mist)" />
                  <span style={styles.eventDateText}>{ev.date}</span>
                </div>
                <div style={styles.eventContent}>
                  <h3 style={styles.eventTitle}>{ev.title}</h3>
                  <p style={styles.eventTime}>{ev.time}</p>
                  <p style={styles.eventDesc}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Nature Inspired Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <h3 style={styles.footerBrand}>Hawaiian Plantation Village</h3>
              <p style={styles.footerText}>
                Preserving history, celebrating multicultural heritage, and fostering ecological stewardship in Waipahu.
              </p>
              <div style={styles.footerContact}>
                <p>📍 94-695 Waipahu Street, Waipahu, HI 96797</p>
                <p>📞 (808) 677-0110</p>
                <p>✉️ info@hawaiianplantationvillage.org</p>
              </div>
            </div>
            <div style={styles.newsletterBox}>
              <h4 style={styles.footerHeader}>JOIN OUR CANOPY</h4>
              <p style={styles.footerText}>Receive updates about cultural festivals, historic restoration logs, and botanical guide releases.</p>
              <form onSubmit={(e) => e.preventDefault()} style={styles.emailForm}>
                <input type="email" placeholder="Your Email Address" style={styles.emailInput} />
                <button type="submit" className="nature-btn-accent" style={styles.emailBtn}>Join</button>
              </form>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>© {new Date().getFullYear()} Hawaiian Plantation Village. Reimagined Sanctuary Edition.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: 'var(--nature-sand)',
    color: 'var(--nature-forest)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--font-nature-body)'
  },
  heroSection: {
    background: 'linear-gradient(135deg, var(--nature-forest) 0%, #06120b 100%)',
    minHeight: '75vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 2rem 8rem 2rem',
    color: 'var(--nature-mist)',
    overflow: 'hidden',
    textAlign: 'center'
  },
  heroBgPattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.04,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,0 Q100,50 50,100 T50,200\' stroke=\'%23ffffff\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E")',
    backgroundSize: '150px 150px',
    pointerEvents: 'none'
  },
  heroContent: {
    maxWidth: '800px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heroBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    borderRadius: '30px',
    padding: '6px 16px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--nature-emerald)',
    marginBottom: '1.5rem',
    letterSpacing: '0.05em'
  },
  heroTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '3.5rem',
    fontWeight: '700',
    lineHeight: '1.15',
    color: 'var(--nature-mist)',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em'
  },
  heroSub: {
    fontFamily: 'var(--font-nature-body)',
    fontSize: '1.15rem',
    lineHeight: '1.6',
    color: '#cbd5e1',
    maxWidth: '650px',
    marginBottom: '2rem'
  },
  heroBtnGroup: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  heroWaveBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: 'var(--nature-sand)',
    clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 0 0)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    width: '100%'
  },
  quickVisitSection: {
    marginTop: '-40px',
    position: 'relative',
    zIndex: 10,
    marginBottom: '3rem'
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  quickItem: {
    display: 'flex',
    gap: '16px',
    padding: '1.75rem',
    alignItems: 'flex-start'
  },
  quickIconContainer: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: 'rgba(71, 118, 82, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  quickTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  quickText: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '2px'
  },
  quickSubtext: {
    fontSize: '0.8rem',
    color: '#6b7280'
  },
  section: {
    padding: '5rem 0',
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
    fontSize: '2.25rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    lineHeight: '1.2',
    marginBottom: '1.5rem',
    letterSpacing: '-0.01em'
  },
  bodyText: {
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#374151',
    marginBottom: '1.25rem'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '1rem',
    flexWrap: 'wrap'
  },
  imgCol: {
    width: '100%'
  },
  imgWrapper: {
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 12px 30px rgba(11, 36, 22, 0.06)'
  },
  featuredImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'cover'
  },
  gameCard: {
    padding: '2rem',
    borderRadius: '24px'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '2rem'
  },
  eventCard: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'flex-start'
  },
  eventDateBox: {
    backgroundColor: 'var(--nature-forest)',
    color: 'var(--nature-mist)',
    borderRadius: '30px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  eventDateText: {
    letterSpacing: '0.05em'
  },
  eventContent: {
    width: '100%'
  },
  eventTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.35rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  eventTime: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--nature-earth)',
    marginBottom: '1rem'
  },
  eventDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#4b5563'
  },
  footer: {
    backgroundColor: 'var(--nature-forest)',
    color: 'var(--nature-mist)',
    padding: '4rem 0 2rem 0',
    marginTop: 'auto'
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
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.75rem',
    fontWeight: '600',
    color: 'var(--nature-mist)',
    marginBottom: '1rem'
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#9ca3af',
    marginBottom: '1.5rem',
    maxWidth: '500px',
    lineHeight: '1.6'
  },
  footerContact: {
    fontSize: '0.85rem',
    lineHeight: '1.7',
    color: '#cbd5e1'
  },
  newsletterBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  footerHeader: {
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--nature-emerald)',
    marginBottom: '1rem'
  },
  emailForm: {
    display: 'flex',
    width: '100%',
    maxWidth: '420px',
    gap: '8px',
    marginTop: '0.5rem'
  },
  emailInput: {
    flex: '1',
    padding: '0.75rem 1rem',
    border: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '30px',
    color: 'var(--nature-mist)',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-nature-body)'
  },
  emailBtn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '30px'
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#6b7280'
  }
};
