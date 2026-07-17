import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, X, BookOpen, FileText, ChevronRight } from 'lucide-react';
import campPhoto from '../../assets/historic_camp_house.png';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import { parallaxLayers } from '../../assets/parallax';
import { useContentCollection, usePageSection } from '../../context/ContentProvider.jsx';
import { formatAudioLength } from '../../lib/content/collectionFormUtils.js';

const parseLengthToSeconds = (lengthStr) => {
  if (!lengthStr) return 120;
  const match = lengthStr.match(/(\d+)m\s*(\d+)s/);
  if (match) {
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    return minutes * 60 + seconds;
  }
  return 120;
};

const formatTime = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const Visualizer = ({ isPlaying }) => {
  const barsCount = 6;
  const delays = ['0s', '0.15s', '0.3s', '0.05s', '0.2s', '0.1s'];
  const heights = [8, 16, 12, 20, 10, 14];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '3px',
      height: '24px',
      width: '35px',
      marginRight: '12px'
    }}>
      {Array.from({ length: barsCount }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            backgroundColor: 'var(--sugar-gold)',
            borderRadius: '1.5px',
            transition: 'height 0.2s ease',
            height: isPlaying ? undefined : `${heights[i]}px`,
            animation: isPlaying ? `bouncing-bar 0.8s ease-in-out infinite alternate` : 'none',
            animationDelay: delays[i],
          }}
        />
      ))}
    </div>
  );
};

export default function Stories() {
  const { items: camps } = useContentCollection('camp_story');
  const { section: header } = usePageSection('stories', 'header', {});
  const audioRef = useRef(null);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(120);
  const [filter, setFilter] = useState('all');

  const oralHistory = selectedCamp?.oralHistory ?? null;
  const audioUrl = oralHistory?.audio_url || '';
  const hasRealAudio = Boolean(audioUrl);

  const filteredCamps = filter === 'all'
    ? camps
    : camps.filter(c => c.culture.toLowerCase() === filter.toLowerCase());

  const seekTo = useCallback((seconds) => {
    const next = Math.max(0, Math.min(totalDuration, seconds));
    setCurrentTime(next);
    if (hasRealAudio && audioRef.current) {
      audioRef.current.currentTime = next;
    }
  }, [hasRealAudio, totalDuration]);

  const togglePlay = useCallback(() => {
    if (hasRealAudio && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
      return;
    }
    setIsPlaying((prev) => !prev);
  }, [hasRealAudio]);

  const handleCloseCamp = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedCamp(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleOpenCamp = (camp) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedCamp(camp);
    setIsPlaying(false);
    setCurrentTime(0);
    setTotalDuration(parseLengthToSeconds(camp.oralHistory?.length || ''));
  };

  // Simulated timer when no real audio file is set
  useEffect(() => {
    if (hasRealAudio || !isPlaying) return undefined;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasRealAudio, isPlaying, totalDuration]);

  // Wire HTML5 audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!hasRealAudio || !audio) return undefined;

    const onLoaded = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setTotalDuration(Math.floor(audio.duration));
      }
    };
    const onTimeUpdate = () => setCurrentTime(Math.floor(audio.currentTime));
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [hasRealAudio, audioUrl]);

  const handleProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = Math.max(0, Math.min(1, clickX / width));
    seekTo(Math.floor(clickPercent * totalDuration));
  };

  const handleProgressBarKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      seekTo(currentTime + 5);
    } else if (e.key === 'ArrowLeft') {
      seekTo(currentTime - 5);
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      togglePlay();
    }
  };

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
  const durationLabel = oralHistory?.length
    || (hasRealAudio && totalDuration > 0 ? formatAudioLength(totalDuration) : formatTime(totalDuration));

  return (
    <div style={styles.pageContainer}>
      <style>{`
        @keyframes bouncing-bar {
          0% { height: 4px; }
          100% { height: 22px; }
        }
      `}</style>
      <PageHeaderParallax
        layers={parallaxLayers.stories}
        stamp={header?.stamp ?? 'ORAL HISTORIES'}
        stampClass={`ink-stamp ${header?.stampClass ?? 'green'}`}
        title={header?.title ?? 'Plantation Stories'}
        subtitle={header?.subtitle ?? 'Explore the lives, struggles, and music of the eight immigrant communities that built Waipahu.'}
      />

      <div style={styles.container}>
        {/* Filters */}
        <div style={styles.filterBar}>
          <span style={styles.filterLabel}>FILTER BY CAMP SECTION:</span>
          <div style={styles.filterBtns}>
            {['all', ...camps.map((c) => c.culture.toLowerCase())].map((item) => (
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
              onClick={handleCloseCamp}
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
                <button style={styles.closeBtn} onClick={handleCloseCamp}>
                  <X size={24} />
                </button>
              </div>

              <div style={styles.drawerBody}>
                {/* Photo Header */}
                <div style={styles.photoContainer}>
                  <img src={selectedCamp.image_url || campPhoto} alt={selectedCamp.title} style={styles.drawerPhoto} />
                  <div style={styles.photoCaption}>Historic {selectedCamp.culture} Camp Cottage Representation</div>
                </div>

                <h2 style={styles.drawerTitle}>{selectedCamp.title}</h2>
                <div className="ledger-header" style={{ marginBottom: '0.75rem' }}>HISTORICAL RECORDS</div>
                <p style={styles.drawerHistoryText}>{selectedCamp.fullHistory}</p>

                {oralHistory && (
                  <div className="paper-card" style={styles.audioCard}>
                    <div style={styles.audioHeader}>
                      <BookOpen size={18} color="var(--tin-rust)" />
                      <span style={styles.audioLabel}>ORAL HISTORY SOUND ARCHIVE</span>
                    </div>

                    {hasRealAudio && (
                      <audio ref={audioRef} src={audioUrl} preload="metadata" style={{ display: 'none' }}>
                        <track kind="captions" />
                      </audio>
                    )}

                    <div style={styles.playerContainer}>
                      <button
                        onClick={togglePlay}
                        style={styles.playBtn}
                        aria-label={isPlaying ? 'Pause oral history recording' : 'Play oral history recording'}
                      >
                        {isPlaying ? <Pause size={18} fill="var(--paper-light)" /> : <Play size={18} fill="var(--paper-light)" />}
                      </button>
                      <div style={styles.playerTrack}>
                        <div style={styles.narratorInfo}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Visualizer isPlaying={isPlaying} />
                            <span style={styles.narratorName}>{oralHistory.narrator}</span>
                          </div>
                          <span style={styles.trackLength}>
                            {formatTime(currentTime)} / {durationLabel}
                          </span>
                        </div>

                        <div
                          onClick={handleProgressBarClick}
                          onKeyDown={handleProgressBarKeyDown}
                          style={{ ...styles.progressBarBg, cursor: 'pointer', position: 'relative' }}
                          role="slider"
                          aria-valuemin={0}
                          aria-valuemax={totalDuration}
                          aria-valuenow={currentTime}
                          aria-label="Audio playback progress. Use left and right arrows to seek, space to play or pause."
                          tabIndex={0}
                        >
                          <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
                        </div>

                        <div style={styles.audioSubText}>
                          <Volume2 size={12} style={{ marginRight: '4px' }} />
                          <span>
                            {oralHistory.audioSimText || (hasRealAudio ? 'Archive recording' : 'No recording source listed')}
                            {' '}
                            {isPlaying ? '(Playing archive audio...)' : '(Paused)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {oralHistory.transcript && (
                      <div style={styles.transcriptBox}>
                        <div style={styles.transcriptLabel}>
                          <FileText size={14} /> TRANSCRIPT PRINT
                        </div>
                        <blockquote style={styles.transcriptQuote}>
                          {oralHistory.transcript}
                        </blockquote>
                      </div>
                    )}
                  </div>
                )}
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
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
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
