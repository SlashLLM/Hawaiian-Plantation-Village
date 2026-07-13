import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, X, BookOpen, Clock, FileText, ChevronRight, Leaf } from 'lucide-react';
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
    title: 'The Portuguese Forno & Cottage',
    arrival: '1878',
    shortDesc: 'Introduced the stone ovens and standard bread baking, alongside string instruments that inspired the ukulele.',
    fullHistory: 'Portuguese contract workers arrived in 1878, mostly from the Madeira and Azores islands. They came with their families and brought agricultural expertise, stone ovens, and the braguinha (ancestor of the ukulele). Their gardens were rich in vegetables, garlic, and sweet potatoes.',
    oralHistory: {
      narrator: 'Maria Rodrigues Silva (Granddaughter of Forno Builder)',
      length: '2m 15s',
      audioSimText: 'Recording: Silva heritage project, interviewed 1993.',
      transcript: '“Every Saturday, the women of our sector heated the brick oven. They baked sweet bread—pão doce. The smell of fresh bread would float all the way to the cane loading station. It brought everyone together. Even the Luna stopped to buy a loaf.”'
    }
  },
  {
    id: 'korean',
    culture: 'Korean',
    title: 'The Korean Schoolhouse & Cottage',
    arrival: '1903',
    shortDesc: 'Established educational roots, churches, and active community organizations for political support and culture.',
    fullHistory: 'Korean immigrants arrived in 1903. They worked in groups in the fields but prioritized establishing language schools and churches to preserve their cultural identity and support Korean independence campaigns from abroad.',
    oralHistory: {
      narrator: 'Dr. John Woo-Hyun Park (Historian & Descendant)',
      length: '3m 50s',
      audioSimText: 'Recording: Korean centennial archive, interviewed 2003.',
      transcript: '“The schoolhouse was more than a classroom; it was where our language, history, and political hopes were kept alive. Even though parents worked 12 hours, they made sure children spent weekends learning to read Korean. It was a shelter for the soul.”'
    }
  },
  {
    id: 'puerto_rican',
    culture: 'Puerto Rican',
    title: 'The Puerto Rican Thatch Cottage',
    arrival: '1900',
    shortDesc: 'Arrived after hurricanes hit the Caribbean, introducing unique agricultural rhythms and festive music.',
    fullHistory: 'Puerto Rican workers arrived in 1900 following devastating Caribbean hurricanes. They brought extensive cane-farming expertise and introduced dynamic musical rhythms like Kachi-Kachi (a blend of Puerto Rican fold and local tunes).',
    oralHistory: {
      narrator: 'Carlos Santiago (Pioneer Cuatro Player)',
      length: '2m 58s',
      audioSimText: 'Recording: Santiago music preservation tapes, recorded 1987.',
      transcript: '“We brought the cuatro guitar. In Hawaii, we played at weddings and baptisms. They called it kachi-kachi music because of the fast scrubbing rhythm. Portuguese and Japanese neighbors would dance with us. It was a beautiful mix of roots.”'
    }
  }
];

export default function Stories() {
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlaybackProgress, setAudioPlaybackProgress] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const startPlayback = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setAudioPlaybackProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 100);
    setTimerInterval(interval);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const handleOpenCamp = (camp) => {
    setSelectedCamp(camp);
    setAudioPlaybackProgress(0);
    setIsPlaying(false);
  };

  const handleCloseCamp = () => {
    stopPlayback();
    setSelectedCamp(null);
  };

  return (
    <div style={styles.pageContainer} className="theme-nature">
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span style={styles.headerBadge}>CULTURAL TAPESTRY</span>
          <h1 style={styles.pageTitle}>Camp Sector Chronicles</h1>
          <p style={styles.pageSubtitle}>
            Step into the authentic residential hubs and gardens of the immigrant worker groups who laid Oʻahu’s modern foundations.
          </p>
        </div>
      </div>

      <div style={styles.container}>
        {/* Featured Image Section */}
        <div style={styles.featuredWrapper} className="nature-glass-card">
          <img src={campPhoto} alt="Camp cottages backdrop" style={styles.featuredImage} />
          <div style={styles.featuredOverlay}>
            <div style={{ maxWidth: '600px' }}>
              <span style={styles.featuredBadge}>HISTORIC RE-CREATION</span>
              <h2 style={styles.featuredTitle}>Authentic Cottages & Heritage Flora</h2>
              <p style={styles.featuredDesc}>
                Walk the village perimeter to explore 25 fully-restored structures, including cookhouses, social furo baths, schoolhouses, and active community farms representing Waipahu's immigrant workers.
              </p>
            </div>
          </div>
        </div>

        {/* Camps Grid */}
        <div style={styles.campsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.campsSectionTitle}>Immigrant Communities</h2>
            <p style={styles.campsSectionSub}>Select a camp sector to listen to oral records and explore their history.</p>
          </div>

          <div style={styles.grid}>
            {CAMPS_DATA.map((camp) => (
              <motion.div
                key={camp.id}
                whileHover={{ y: -6 }}
                onClick={() => handleOpenCamp(camp)}
                style={styles.card}
                className="nature-glass-card"
              >
                <div style={styles.cardHeader}>
                  <span style={styles.cardCulture}>{camp.culture}</span>
                  <span style={styles.cardArrival}>Arr. {camp.arrival}</span>
                </div>
                <h3 style={styles.cardTitle}>{camp.title}</h3>
                <p style={styles.cardDesc}>{camp.shortDesc}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.cardLink}>Read Chronicles & Oral Logs</span>
                  <ChevronRight size={16} color="var(--nature-moss)" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedCamp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={handleCloseCamp}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={styles.modalContent}
              className="nature-glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button style={styles.closeBtn} onClick={handleCloseCamp}>
                <X size={20} />
              </button>

              {/* Title Section */}
              <div style={styles.modalHeader}>
                <div style={styles.modalBadgeRow}>
                  <span style={styles.modalBadge}>CAMP ARCHIVE</span>
                  <span style={styles.modalArrivalBadge}>{selectedCamp.culture} Community • Arrived {selectedCamp.arrival}</span>
                </div>
                <h2 style={styles.modalTitle}>{selectedCamp.title}</h2>
              </div>

              {/* Main Info */}
              <div style={styles.modalGrid}>
                {/* Left Side: History */}
                <div style={styles.modalLeft}>
                  <div style={styles.historyBlock}>
                    <h3 style={styles.subHeading}><BookOpen size={16} /> Historical Narrative</h3>
                    <p style={styles.modalBodyText}>{selectedCamp.fullHistory}</p>
                  </div>
                </div>

                {/* Right Side: Oral History Player */}
                <div style={styles.modalRight}>
                  <div style={styles.playerContainer}>
                    <span style={styles.playerBadge}>ORAL RECORD SIMULATION</span>
                    <h4 style={styles.narratorName}>{selectedCamp.oralHistory.narrator}</h4>
                    <p style={styles.playbackInfo}><Clock size={12} style={{ marginRight: '4px' }} /> Duration: {selectedCamp.oralHistory.length}</p>

                    {/* Progress Bar */}
                    <div style={styles.audioControls}>
                      <button style={styles.playBtn} onClick={togglePlayback}>
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                      </button>
                      <div style={styles.progressTrack}>
                        <div style={{ ...styles.progressBar, width: `${audioPlaybackProgress}%` }} />
                      </div>
                      <Volume2 size={16} color="var(--nature-moss)" />
                    </div>

                    <p style={styles.audioSimNote}>{selectedCamp.oralHistory.audioSimText}</p>

                    {/* Transcript */}
                    <div style={styles.transcriptBox}>
                      <span style={styles.transcriptLabel}><FileText size={12} /> Transcript excerpt</span>
                      <p style={styles.transcriptText}>{selectedCamp.oralHistory.transcript}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  featuredWrapper: {
    position: 'relative',
    height: '350px',
    borderRadius: '24px',
    overflow: 'hidden',
    marginBottom: '4rem',
    boxShadow: 'none'
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  featuredOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, rgba(11, 36, 22, 0.9) 0%, rgba(11, 36, 22, 0.4) 60%, transparent 100%)',
    display: 'flex',
    alignItems: 'center',
    padding: '3rem',
    color: 'var(--nature-mist)'
  },
  featuredBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--nature-emerald)',
    letterSpacing: '0.1em',
    marginBottom: '0.5rem',
    display: 'block'
  },
  featuredTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.85rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  featuredDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#cbd5e1'
  },
  campsSection: {
    marginBottom: '2rem'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  campsSectionTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '2rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  campsSectionSub: {
    fontSize: '0.95rem',
    color: '#4b5563'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem'
  },
  card: {
    padding: '2.25rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    boxShadow: 'none'
  },
  cardHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.25rem'
  },
  cardCulture: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  cardArrival: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  cardTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.35rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  cardDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.55',
    color: '#4b5563',
    flex: 1,
    marginBottom: '1.5rem'
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(71, 118, 82, 0.08)'
  },
  cardLink: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--nature-forest)'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(11, 36, 22, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    zIndex: 200
  },
  modalContent: {
    width: '100%',
    maxWidth: '860px',
    backgroundColor: 'var(--nature-sand)',
    borderRadius: '24px',
    padding: '3rem',
    boxShadow: '0 30px 60px rgba(11, 36, 22, 0.15)',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(71, 118, 82, 0.08)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--nature-forest)',
    transition: 'all 0.2s ease'
  },
  modalHeader: {
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(71, 118, 82, 0.12)',
    paddingBottom: '1.5rem'
  },
  modalBadgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '0.75rem'
  },
  modalBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    backgroundColor: 'var(--nature-moss)',
    color: 'var(--nature-mist)',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.05em'
  },
  modalArrivalBadge: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: 'var(--nature-earth)'
  },
  modalTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '2rem',
    fontWeight: '600',
    color: 'var(--nature-forest)'
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: '2.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  modalLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  historyBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  subHeading: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.15rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  modalBodyText: {
    fontSize: '0.95rem',
    lineHeight: '1.75',
    color: '#374151'
  },
  modalRight: {
    width: '100%'
  },
  playerContainer: {
    backgroundColor: 'rgba(71, 118, 82, 0.04)',
    border: '1px solid rgba(71, 118, 82, 0.1)',
    borderRadius: '16px',
    padding: '1.75rem'
  },
  playerBadge: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: 'var(--nature-moss)',
    letterSpacing: '0.08em',
    display: 'block',
    marginBottom: '0.75rem'
  },
  narratorName: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--nature-forest)',
    marginBottom: '4px'
  },
  playbackInfo: {
    fontSize: '0.8rem',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  audioControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    marginBottom: '1rem'
  },
  playBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--nature-forest)',
    color: 'var(--nature-mist)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    padding: 0
  },
  progressTrack: {
    flex: 1,
    height: '6px',
    backgroundColor: 'rgba(71, 118, 82, 0.1)',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'hidden'
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: 'var(--nature-emerald)',
    borderRadius: '3px'
  },
  audioSimNote: {
    fontSize: '0.7rem',
    fontStyle: 'italic',
    color: '#9ca3af',
    marginBottom: '1.5rem'
  },
  transcriptBox: {
    borderTop: '1px solid rgba(71, 118, 82, 0.08)',
    paddingTop: '1.25rem'
  },
  transcriptLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--nature-moss)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '6px'
  },
  transcriptText: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: '#4b5563',
    fontStyle: 'italic'
  }
};
