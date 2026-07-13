import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Info, ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';
import BellToBell from '../../components/BellToBell';
import campHouse from '../../assets/historic_camp_house.png';

// Camp house carousel items
const HOUSES = [
  {
    id: 1,
    name: 'Japanese Camp House',
    year: '1899',
    culture: 'Japanese Immigrants',
    desc: 'Features traditional tatami mats, shoji screens, and a small community shrine. Japanese workers brought these customs to Waipahu, recreating a piece of home.',
    fact: 'Bon dances and tea ceremonies were organized in the camp courtyard to keep spirits high.'
  },
  {
    id: 2,
    name: 'Portuguese Cottage',
    year: '1882',
    culture: 'Portuguese Immigrants',
    desc: 'Equipped with a outdoor stone oven (forno) for baking bread and yeast starters. They introduced guitars (which evolved into the ukulele) and sweet doughs.',
    fact: 'The traditional stone oven was fired weekly, where neighbors gathered to bake together.'
  },
  {
    id: 3,
    name: 'Chinese Society House',
    year: '1875',
    culture: 'Chinese Immigrants',
    desc: 'Featuring a communal kitchen, wooden bunks, and traditional calligraphic scrolls. Chinese immigrants were the earliest contract laborers, arriving in 1852.',
    fact: 'Societies helped workers send money home and provided mutual aid during illnesses.'
  },
  {
    id: 4,
    name: 'Okinawan Home',
    year: '1904',
    culture: 'Okinawan Immigrants',
    desc: 'Adorned with traditional pottery, agricultural tools, and a hand-crafted sanshin (snake-skin lute). It represents the distinct Ryukyu heritage separate from main islands.',
    fact: 'Okinawan folksongs sung on the lanai were pivotal in building cross-camp solidarity.'
  },
  {
    id: 5,
    name: 'Puerto Rican Cottage',
    year: '1901',
    culture: 'Puerto Rican Immigrants',
    desc: 'Features dynamic wood carving tools, colorful fabrics, and historic recipes for pasteles. They brought vibrant music and coffee cultivation skills to Oʻahu.',
    fact: 'Puerto Rican ensembles played dynamic string instruments, forming the base of plantation-era folk bands.'
  }
];

export default function Home({ setActivePage }) {
  const [tagFlipped, setTagFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const cardRef = useRef(null);

  // Handle Bango tag mouse tilting
  const handleMouseMove = (e) => {
    if (!cardRef.current || tagFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt limit to 15 degrees
    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleRotateCarousel = (direction) => {
    if (direction === 'next') {
      setCarouselIndex((prev) => (prev + 1) % HOUSES.length);
    } else {
      setCarouselIndex((prev) => (prev - 1 + HOUSES.length) % HOUSES.length);
    }
  };

  const currentHouse = HOUSES[carouselIndex];

  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      {/* 1. Immersive Hero Block */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={styles.pillBadge}
            >
              <Sparkles size={14} color="var(--exhibit-gold)" />
              <span>TIME-TRAVELER MUSEUM INITIATIVE</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={styles.heroTitle}
            >
              Unearthing Waipahu's Sugar Era
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={styles.heroSub}
            >
              Step into an interactive 3D portal of the Hawaiian Plantation Village. 
              Move your mouse to shape the environment, explore camp records, and hear the voices of the builders of modern Hawaiʻi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={styles.heroBtnGroup}
            >
              <button 
                className="exhibit-btn-primary" 
                onClick={() => {
                  const el = document.getElementById('bango-sec');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Inspect Archival Records
              </button>
              <button 
                className="exhibit-btn-secondary" 
                onClick={() => setActivePage('visit')}
              >
                Plan Physical Journey
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Bango Tag section */}
      <section id="bango-sec" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.twoColumnGrid}>
            
            {/* Tag visual block */}
            <div style={styles.tagShowcaseColumn}>
              <div 
                style={{
                  ...styles.perspectiveBox,
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setTagFlipped(!tagFlipped);
                  setTilt({ x: 0, y: 0 });
                }}
                className="perspective-viewport"
              >
                <div style={{
                  ...styles.tagCard,
                  transform: tagFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}>
                  {/* Front Face: The Metal Bango Tag */}
                  <div className="card-3d-face bango-tag" style={styles.cardFront}>
                    <div className="bango-hole" />
                    <div style={styles.bangoStamp}>B. TAG</div>
                    <div style={styles.bangoNum}>4821</div>
                    <div style={styles.bangoBrand}>HPCo. WAIPAHU</div>
                    <div style={styles.clickHint}>
                      <Eye size={12} /> CLICK TO FLIP
                    </div>
                  </div>

                  {/* Back Face: Worker's Archival File */}
                  <div className="card-3d-face exhibit-glass-card" style={styles.cardBack}>
                    <div style={styles.backContent}>
                      <h4 style={styles.archiveHeader}>ARCHIVAL RECORD: #4821</h4>
                      <div style={styles.divider} />
                      <p style={styles.recordItem}><strong>Contractor:</strong> Takashi Hasegawa</p>
                      <p style={styles.recordItem}><strong>Arrived:</strong> 1899 (Hiroshima, Japan)</p>
                      <p style={styles.recordItem}><strong>Monthly Wage:</strong> $12.50 USD</p>
                      <p style={styles.recordItem}><strong>Assigned Camp:</strong> Japanese Block 3</p>
                      <p style={styles.recordItem}><strong>Status:</strong> Cane Cutter & Field Luna</p>
                      <p style={styles.recordQuote}>
                        "He carried this metal tag daily. It served as identification, ledger accounts at the store, and his plantation registration."
                      </p>
                      <div style={styles.clickHintBack}>
                        CLICK TO FLIP TAG
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory text block */}
            <div style={styles.textColumn}>
              <span style={styles.sectionBadge}>HISTORIC EXPLORER</span>
              <h2 style={styles.sectionTitle}>The Bango Tag Identity</h2>
              <p style={styles.bodyText}>
                During the sugarcane contract era, plantation managers issued small metal tags called <strong>Bango</strong> to every laborer. Because workers came from dozens of nations (Japan, China, Portugal, Korea, and more) and spoke different languages, they were cataloged by numbers stamped on these tags.
              </p>
              <p style={styles.bodyText}>
                Your Bango was your key to plantation life. It checked you into the field, allowed you to buy provisions at the plantation store on credit, and was recorded in the company ledger.
              </p>
              <p style={{ ...styles.bodyText, color: 'var(--exhibit-gold)' }}>
                <em>*Click on the tag to flip it and examine the record. Move your mouse over it to experience the 3D depth tilt.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3D Rotating Camp House Carousel */}
      <section style={{ ...styles.section, background: 'linear-gradient(180deg, #0c0f12 0%, #06070a 100%)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={styles.sectionBadge}>3D LANDSCAPE ROTATOR</span>
            <h2 style={styles.sectionTitle}>Camps of Waipahu</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              Spin through 3D reconstructions of the historic camp houses, capturing how different immigrant communities lived side-by-side.
            </p>
          </div>

          <div style={styles.carouselSectionGrid}>
            {/* 3D Carousel view */}
            <div style={styles.carouselContainerColumn}>
              <div className="carousel-3d-viewport">
                <div className="carousel-3d-container">
                  {HOUSES.map((house, idx) => {
                    // Calculate angle for positioning in space
                    const count = HOUSES.length;
                    const angleStep = 360 / count;
                    const diff = idx - carouselIndex;
                    const activeAngle = diff * angleStep;
                    
                    // Style attributes for circular positioning
                    const transformStyle = {
                      transform: `rotateY(${activeAngle}deg) translateZ(240px)`,
                      opacity: idx === carouselIndex ? 1 : 0.25,
                      pointerEvents: idx === carouselIndex ? 'auto' : 'none',
                      zIndex: idx === carouselIndex ? 10 : 1,
                      border: idx === carouselIndex ? '1.5px solid var(--exhibit-gold)' : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: idx === carouselIndex ? '0 10px 40px rgba(212,152,30,0.15)' : '0 5px 15px rgba(0,0,0,0.4)',
                    };

                    return (
                      <div
                        key={house.id}
                        className="carousel-3d-card exhibit-glass-card"
                        style={{ ...styles.carouselCard, ...transformStyle }}
                      >
                        <div style={styles.carouselImageContainer}>
                          <img src={campHouse} alt={house.name} style={styles.carouselCardImg} />
                          <div style={styles.carouselTag}>{house.year}</div>
                        </div>
                        <div style={styles.carouselCardMeta}>
                          <h4 style={styles.carouselCardTitle}>{house.name}</h4>
                          <span style={styles.carouselCardCulture}>{house.culture}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation controls */}
              <div style={styles.controlsRow}>
                <button className="exhibit-btn-secondary" onClick={() => handleRotateCarousel('prev')}>
                  <ArrowLeft size={16} /> Prev House
                </button>
                <button className="exhibit-btn-secondary" onClick={() => handleRotateCarousel('next')}>
                  Next House <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Information panel */}
            <div style={styles.houseDetailsColumn}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHouse.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={styles.detailsCard}
                  className="exhibit-glass-card"
                >
                  <div style={styles.detailsHeader}>
                    <span style={styles.detailsYear}>{currentHouse.year} CONSTRUCTION</span>
                    <h3 style={styles.detailsTitle}>{currentHouse.name}</h3>
                  </div>
                  <div style={styles.detailsDivider} />
                  <p style={styles.detailsText}>{currentHouse.desc}</p>
                  <div style={styles.factBox}>
                    <Info size={16} color="var(--exhibit-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={styles.factText}><strong>Community Fact:</strong> {currentHouse.fact}</p>
                  </div>
                  <button className="exhibit-btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setActivePage('about')}>
                    Read Heritage Files
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bell to Bell Simulator inside dark wrapper */}
      <section style={{ ...styles.section, backgroundColor: 'rgba(6, 7, 10, 0.95)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={styles.sectionBadge}>IMMERSE IN ROTATION</span>
            <h2 style={styles.sectionTitle}>Shift Diary: Bell to Bell</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              Simulate one full day as a sugar laborer. Experience the field tasks, store exchanges, and community porches.
            </p>
          </div>
          
          {/* Custom style overrides container for the game */}
          <div className="dark-theme-override" style={styles.gameWrapper}>
            <BellToBell onVisitClick={() => setActivePage('tickets')} />
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box'
  },
  heroSection: {
    minHeight: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '6rem 2rem 4rem 2rem',
    textAlign: 'center',
    boxSizing: 'border-box',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, transparent 30%, #0c0f12 90%)',
    zIndex: 1
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 2,
    boxSizing: 'border-box'
  },
  heroContent: {
    maxWidth: '750px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(212, 152, 30, 0.08)',
    border: '1px solid rgba(212, 152, 30, 0.25)',
    borderRadius: '50px',
    padding: '6px 14px',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: 'var(--exhibit-gold)',
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-exhibit-mono)'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    marginBottom: '1.25rem',
    lineHeight: '1.15',
    color: '#ffffff'
  },
  heroSub: {
    fontSize: '1.05rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '2rem',
    fontFamily: 'var(--font-exhibit-sans)'
  },
  heroBtnGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  section: {
    padding: '5rem 2rem',
    boxSizing: 'border-box'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'center'
  },
  tagShowcaseColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '350px'
  },
  perspectiveBox: {
    width: '260px',
    height: '340px',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.1s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagCard: {
    position: 'relative',
    width: '240px',
    height: '320px',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  cardFront: {
    width: '100%',
    height: '100%',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '24px',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  bangoStamp: {
    fontSize: '0.8rem',
    letterSpacing: '0.25em',
    fontWeight: '700',
    color: 'rgba(212, 152, 30, 0.6)',
    borderBottom: '2px solid rgba(212, 152, 30, 0.3)',
    width: '80%',
    paddingBottom: '0.25rem',
    marginTop: '0.5rem'
  },
  bangoNum: {
    fontSize: '3.75rem',
    fontWeight: '800',
    color: '#ebd7bc',
    letterSpacing: '-0.02em',
    lineHeight: '1',
    textShadow: '1px 1px 1px rgba(0,0,0,0.4)'
  },
  bangoBrand: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'rgba(212, 152, 30, 0.7)',
    letterSpacing: '0.1em'
  },
  clickHint: {
    fontSize: '0.62rem',
    color: 'rgba(255, 255, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  cardBack: {
    width: '100%',
    height: '100%',
    borderRadius: '24px'
  },
  backContent: {
    padding: '1.75rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box'
  },
  archiveHeader: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    color: 'var(--exhibit-gold)',
    letterSpacing: '0.08em'
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(212, 152, 30, 0.2)',
    margin: '8px 0'
  },
  recordItem: {
    fontSize: '0.85rem',
    margin: '4px 0',
    color: 'var(--exhibit-text-light)',
    fontFamily: 'var(--font-exhibit-sans)'
  },
  recordQuote: {
    fontSize: '0.78rem',
    fontStyle: 'italic',
    color: 'var(--exhibit-text-muted)',
    lineHeight: '1.45',
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: '8px 12px',
    borderRadius: '6px',
    borderLeft: '2px solid var(--exhibit-gold)',
    marginTop: '6px'
  },
  clickHintBack: {
    fontSize: '0.65rem',
    color: 'var(--exhibit-gold)',
    letterSpacing: '0.05em',
    textAlign: 'center',
    fontFamily: 'var(--font-exhibit-mono)',
    fontWeight: '700'
  },
  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  sectionBadge: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    color: 'var(--exhibit-gold)',
    display: 'block',
    marginBottom: '0.75rem'
  },
  sectionTitle: {
    fontSize: '2.25rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    marginBottom: '1.5rem',
    color: '#ffffff'
  },
  bodyText: {
    fontSize: '0.98rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1rem'
  },
  carouselSectionGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '3rem',
    alignItems: 'center',
    marginTop: '2rem'
  },
  carouselContainerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  carouselCard: {
    background: 'var(--exhibit-bg-card)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box'
  },
  carouselImageContainer: {
    position: 'relative',
    height: '180px',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  carouselCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  carouselTag: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    backgroundColor: 'rgba(12, 15, 18, 0.85)',
    border: '1px solid var(--exhibit-gold)',
    color: 'var(--exhibit-gold)',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontFamily: 'var(--font-exhibit-mono)',
    fontWeight: '700'
  },
  carouselCardMeta: {
    marginTop: '1rem'
  },
  carouselCardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--exhibit-text-light)',
    marginBottom: '0.25rem'
  },
  carouselCardCulture: {
    fontSize: '0.75rem',
    color: 'var(--exhibit-gold)',
    fontFamily: 'var(--font-exhibit-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  controlsRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  houseDetailsColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  detailsCard: {
    padding: '2.5rem',
    boxSizing: 'border-box'
  },
  detailsHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  detailsYear: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    color: 'var(--exhibit-gold)'
  },
  detailsTitle: {
    fontSize: '1.85rem',
    fontWeight: '700',
    color: '#ffffff'
  },
  detailsDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, rgba(212,152,30,0.3) 0%, transparent 100%)',
    margin: '1.25rem 0'
  },
  detailsText: {
    fontSize: '0.95rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1.5rem'
  },
  factBox: {
    display: 'flex',
    gap: '12px',
    backgroundColor: 'rgba(212,152,30,0.05)',
    border: '1px dashed rgba(212,152,30,0.2)',
    padding: '1rem',
    borderRadius: '10px'
  },
  factText: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: 'var(--exhibit-text-light)',
    margin: 0
  },
  gameWrapper: {
    backgroundColor: 'rgba(18, 22, 28, 0.4)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '24px',
    padding: '1.5rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
  }
};
