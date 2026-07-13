import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, X, BookOpen, Clock, FileText, ChevronRight } from 'lucide-react';
import campPhoto from '../../assets/historic_camp_house.png';

const CAMPS_DATA = [
  {
    id: 'chinese',
    culture: 'Chinese',
    title: 'The Chinese Society Cookhouse',
    arrival: '1852',
    shortDesc: 'One of the earliest immigrant groups who completed contract terms and founded successful merchants and agricultural hubs.',
    fullHistory: 'Chinese contract laborers arrived in 1852. They introduced rice cultivation techniques to the swampy lowlands of Waipahu. The cookhouse was the heart of the Chinese camp section, serving as a social gathering spot and a place to honor ancestors during festivals.',
    oralHistory: {
      narrator: 'Siu Lung Chang (Grandson of Cookhouse Manager)',
      length: '2m 45s',
      audioSimText: 'Recording: Chang family oral archive, interviewed 1994.',
      transcript: '“My grandfather came in 1888. He told me the kitchen fires in the Chinese camp section never went out. They baked buns, boiled tea, and exchanged news. The bango system was tight, but workers pooled their credit slips to buy bulk ingredients directly from Honolulu merchants. That cookhouse kept our community alive.”'
    }
  },
  {
    id: 'japanese',
    culture: 'Japanese',
    title: 'The Japanese Furo & Cottage',
    arrival: '1885',
    shortDesc: 'Brought traditional bathing customs and established large camp structures, bringing rich family traditions and shrines.',
    fullHistory: 'Japanese workers arrived under the Government-Contract system in 1885. They constructed traditional furo (hot water baths) which became cultural nodes where workers of different nations interacted. Many cottages represent the post-contract family settlements.',
    oralHistory: {
      narrator: 'Kiyoshi Tanaka (Retired Sugar Mill Stoker)',
      length: '3m 12s',
      audioSimText: 'Recording: Tanaka oral history, interviewed 1989.',
      transcript: '“At the end of a 10-hour shift in the boiling sugar house, covered in black dust, the furo bath was heaven. We sat in the hot water and talked. Language didn\'t matter much. We shared cigarettes and laughed. It was where we stopped being contract numbers and became friends.”'
    }
  },
  {
    id: 'filipino',
    culture: 'Filipino',
    title: 'The Filipino Single-Men Barracks',
    arrival: '1906',
    shortDesc: 'Arrived under the HSPA recruiting system, forming the backbone of late-era plantation field operations.',
    fullHistory: 'Filipino Sakadas arrived starting in 1906. Initially living in single-men barracks, they brought a rich history of labor organizing, music, and cuisine. They were the largest labor force during the final decades of the sugar era.',
    oralHistory: {
      narrator: 'Espiridion "Pedro" Ramos (Sakada Field Guide)',
      length: '4m 05s',
      audioSimText: 'Recording: Sakada oral archive, interviewed 1991.',
      transcript: '“We lived six men to a room in the Waipahu barracks. We brought our guitars, and on Saturday nights, we sang kundiman (love songs) on the porch. The Luna was strict, but when the music started, the fields felt far away. We became brothers in those rooms.”'
    }
  },
  {
    id: 'portuguese',
    culture: 'Portuguese',
    title: 'The Portuguese Forno & Home',
    arrival: '1878',
    shortDesc: 'Introduced stone bread ovens (fornos) and the ukulele to the islands, moving into supervisory positions.',
    fullHistory: 'Portuguese immigrants from Madeira and the Azores arrived in 1878. Often arriving as families, they built outdoor stone ovens (forno) to bake large batches of sweet bread, which they shared with neighbors, fostering the plantation-wide community spirit.',
    oralHistory: {
      narrator: 'Maria Da Silva (Cottage Resident descendant)',
      length: '2m 15s',
      audioSimText: 'Recording: Da Silva family history, recorded 1993.',
      transcript: '“Every Saturday, my grandmother heated the forno brick oven with eucalyptus wood. The smell of baking sweet bread traveled through all the camps. Japanese, Filipino, and Chinese kids would wait near our yard. She never let a single child walk away without a warm crust.”'
    }
  },
  {
    id: 'korean',
    culture: 'Korean',
    title: 'The Korean Protestant Community Cottage',
    arrival: '1903',
    shortDesc: 'Formed tightly-knit communities centered around church gatherings, language schools, and independence movements.',
    fullHistory: 'Korean immigrants arrived in 1903, seeking relief from political turmoil. They established active language schools and churches. Korean camp cottages often had small gardens for making fermented vegetables, introducing kimchi to the local diet.',
    oralHistory: {
      narrator: 'Young-Hee Park (Language School Educator)',
      length: '3m 50s',
      audioSimText: 'Recording: Park family archive, recorded 1995.',
      transcript: '“We gathered at the camp chapel on Sundays. It wasn\'t just for church services; it was where we taught our children the Korean alphabet and gathered funds to support the independence movement in Seoul. The cottage garden always had chili pepper stalks growing in the red dirt.”'
    }
  },
  {
    id: 'puerto_rican',
    culture: 'Puerto Rican',
    title: 'The Puerto Rican Casita',
    arrival: '1900',
    shortDesc: 'Arrived after hurricanes devastated their home island, introducing rich música jibara and pasteles to Hawaiʻi.',
    fullHistory: 'Following the devastation of Hurricane San Ciriaco in 1899, over 5,000 Puerto Ricans migrated to Hawaiʻi in 1900. They introduced dynamic rhythms, string ensembles, and food traditions like pasteles (similar to tamales, wrapped in banana leaves).',
    oralHistory: {
      narrator: 'Roberto Morales (Cane Hauler & Musician)',
      length: '3m 30s',
      audioSimText: 'Recording: Morales music archives, recorded 1990.',
      transcript: '“We brought the cuatro guitar and the güiro scraper. When we played music at the camp borders, the other workers would stand and listen. We blended our rhythms with Portuguese tunes and Hawaiian chants. That’s how Cachi Cachi music was born in Waipahu.”'
    }
  }
];

export default function Stories() {
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(30); // Simulated 30% progress
  const [filter, setFilter] = useState('all');

  const filteredCamps = filter === 'all' 
    ? CAMPS_DATA 
    : CAMPS_DATA.filter(c => c.culture.toLowerCase() === filter.toLowerCase());

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOpenCamp = (camp) => {
    setSelectedCamp(camp);
    setIsPlaying(false);
    setAudioProgress(15); // Reset progress on open
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className="ink-stamp green" style={{ marginBottom: '0.5rem' }}>ORAL HISTORIES</span>
          <h1 style={styles.pageTitle}>Plantation Stories</h1>
          <p style={styles.pageSubtitle}>Explore the lives, struggles, and music of the eight immigrant communities that built Waipahu.</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* Filters */}
        <div style={styles.filterBar}>
          <span style={styles.filterLabel}>FILTER BY CAMP SECTION:</span>
          <div style={styles.filterBtns}>
            {['all', 'chinese', 'japanese', 'filipino', 'portuguese', 'korean', 'puerto rican'].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  ...styles.filterBtn,
                  ...(filter === item ? styles.filterBtnActive : {})
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Camps Grid */}
        <div style={styles.campsGrid}>
          {filteredCamps.map((camp) => (
            <div key={camp.id} className="paper-card" style={styles.campCard}>
              <div style={styles.cardHeader}>
                <span className="ink-stamp green" style={styles.arrivalBadge}>ARRIVED {camp.arrival}</span>
                <span style={styles.cultureName}>{camp.culture}</span>
              </div>
              <h3 style={styles.cardTitle}>{camp.title}</h3>
              <p style={styles.cardDesc}>{camp.shortDesc}</p>
              
              <button className="btn-secondary" onClick={() => handleOpenCamp(camp)} style={styles.exploreBtn}>
                Explore camp & oral histories <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-out Drawer / Modal Overlay */}
      <AnimatePresence>
        {selectedCamp && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCamp(null)}
              style={styles.backdrop}
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={styles.drawer}
              className="kraft-paper"
            >
              <div style={styles.drawerHeader}>
                <span style={styles.drawerCulture}>{selectedCamp.culture} Community Archive</span>
                <button style={styles.closeBtn} onClick={() => setSelectedCamp(null)}>
                  <X size={24} />
                </button>
              </div>

              <div style={styles.drawerBody}>
                {/* Photo Header */}
                <div style={styles.photoContainer}>
                  <img src={campPhoto} alt={selectedCamp.title} style={styles.drawerPhoto} />
                  <div style={styles.photoCaption}>Historic {selectedCamp.culture} Camp Cottage Representation</div>
                </div>

                <h2 style={styles.drawerTitle}>{selectedCamp.title}</h2>
                <div className="ledger-header" style={{ marginBottom: '0.75rem' }}>HISTORICAL RECORDS</div>
                <p style={styles.drawerHistoryText}>{selectedCamp.fullHistory}</p>

                {/* Simulated Audio Player & Transcript */}
                <div className="paper-card" style={styles.audioCard}>
                  <div style={styles.audioHeader}>
                    <BookOpen size={18} color="var(--tin-rust)" />
                    <span style={styles.audioLabel}>ORAL HISTORY SOUND ARCHIVE</span>
                  </div>

                  {/* Simulated Player Controls */}
                  <div style={styles.playerContainer}>
                    <button onClick={togglePlay} style={styles.playBtn}>
                      {isPlaying ? <Pause size={18} fill="var(--paper-light)" /> : <Play size={18} fill="var(--paper-light)" />}
                    </button>
                    <div style={styles.playerTrack}>
                      <div style={styles.narratorInfo}>
                        <span style={styles.narratorName}>{selectedCamp.oralHistory.narrator}</span>
                        <span style={styles.trackLength}>{selectedCamp.oralHistory.length}</span>
                      </div>
                      
                      {/* Interactive Progress Bar */}
                      <div style={styles.progressBarBg}>
                        <div style={{ ...styles.progressBarFill, width: `${audioProgress}%` }} />
                      </div>
                      
                      <div style={styles.audioSubText}>
                        <Volume2 size={12} style={{ marginRight: '4px' }} />
                        <span>{selectedCamp.oralHistory.audioSimText} {isPlaying ? '(Simulating audio playback...)' : '(Paused)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Transcript */}
                  <div style={styles.transcriptBox}>
                    <div style={styles.transcriptLabel}>
                      <FileText size={14} /> TRANSCRIPT PRINT
                    </div>
                    <blockquote style={styles.transcriptQuote}>
                      {selectedCamp.oralHistory.transcript}
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '1rem'
  },
  filterLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)'
  },
  filterBtns: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    background: 'none',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    textTransform: 'uppercase'
  },
  filterBtnActive: {
    backgroundColor: 'var(--cane-green)',
    color: 'white',
    borderColor: 'var(--cane-green)'
  },
  campsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem'
  },
  campCard: {
    padding: '2rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  arrivalBadge: {
    fontSize: '0.65rem',
    backgroundColor: 'rgba(27, 56, 35, 0.05)',
    padding: '2px 6px'
  },
  cultureName: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)'
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.75rem'
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.5rem'
  },
  exploreBtn: {
    width: '100%',
    justifyContent: 'center'
  },
  // Drawer Styles
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(46, 26, 10, 0.5)',
    backdropFilter: 'blur(3px)',
    zIndex: 1000
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '550px',
    backgroundColor: 'var(--paper-light)',
    boxShadow: '-10px 0px 30px rgba(46, 26, 10, 0.25)',
    zIndex: 1001,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid var(--kraft-tan-dark)'
  },
  drawerCulture: {
    fontFamily: 'var(--font-typewriter)',
    fontWeight: 'bold',
    color: 'var(--cane-green)',
    fontSize: '0.9rem',
    textTransform: 'uppercase'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--koa-wood)',
    cursor: 'pointer',
    padding: '4px'
  },
  drawerBody: {
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  photoContainer: {
    border: '2px solid var(--koa-wood)',
    borderRadius: '4px',
    padding: '4px',
    backgroundColor: 'white'
  },
  drawerPhoto: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    display: 'block'
  },
  photoCaption: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginTop: '6px'
  },
  drawerTitle: {
    fontSize: '2rem',
    color: 'var(--koa-wood-dark)'
  },
  drawerHistoryText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'var(--text-dark)'
  },
  audioCard: {
    padding: '1.5rem',
    borderRadius: '4px',
    backgroundColor: '#fffdfa'
  },
  audioHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '1rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '6px'
  },
  audioLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)'
  },
  playerContainer: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    backgroundColor: 'var(--paper-dark)',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem'
  },
  playBtn: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: 'var(--cane-green)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-sm)'
  },
  playerTrack: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  narratorInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem'
  },
  narratorName: {
    fontWeight: 'bold',
    color: 'var(--koa-wood)'
  },
  trackLength: {
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-muted)'
  },
  progressBarBg: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e2d8cd',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'var(--sugar-gold)'
  },
  audioSubText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-typewriter)'
  },
  transcriptBox: {
    backgroundColor: 'white',
    border: '1px dashed var(--kraft-tan-dark)',
    padding: '1rem'
  },
  transcriptLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px'
  },
  transcriptQuote: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontStyle: 'italic',
    lineHeight: '1.5',
    color: 'var(--text-dark)'
  }
};
