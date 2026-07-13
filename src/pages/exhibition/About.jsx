import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TreePine, Eye, MoveHorizontal } from 'lucide-react';
import campHouse from '../../assets/historic_camp_house.png';

export default function About() {
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percentage
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  // Then vs Now Slider logic
  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    window.addEventListener('mouseup', handleMouseUpGlobal);
  };

  const handleMouseMoveGlobal = (e) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUpGlobal = () => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMoveGlobal);
    window.removeEventListener('mouseup', handleMouseUpGlobal);
  };

  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.sectionBadge}>OUR HERITAGE FOUNDATION</span>
          <h1 style={styles.title}>The Preservation Ledger</h1>
          <p style={styles.subtitle}>
            Established in 1992, the Hawaiian Plantation Village preserves Oʻahu’s sugar mill history, immigrant struggles, and cultural fusion.
          </p>
        </header>

        {/* Then vs Now Interactive Slider */}
        <div style={styles.sliderSection}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={styles.sectionBadge}>INTERACTIVE COMPARISON</span>
            <h2 style={styles.sliderTitle}>Then & Now: Camp Restoration</h2>
            <p style={styles.sliderSub}>
              Drag the center slider bar left or right to reveal the transition from historic plantation camp files (sepias) to our modern botanical museum restoration.
            </p>
          </div>

          {/* Slider Kiosk Frame */}
          <div 
            style={styles.sliderFrame} 
            ref={sliderRef}
            onTouchMove={handleTouchMove}
            className="exhibit-glass-card"
          >
            {/* 1. Behind Layer: Modern restored photo */}
            <div style={styles.layerModern}>
              <img src={campHouse} alt="Modern restored cottage" style={styles.sliderImage} />
              <div style={styles.labelModern}>MODERN RESTORATION</div>
            </div>

            {/* 2. Front Layer: Historic sepia photo (clipped) */}
            <div style={{ ...styles.layerHistoric, width: `${sliderPos}%` }}>
              <div style={styles.imageClipWrapper}>
                <img src={campHouse} alt="Historic sepia record" style={styles.sliderImageHistoric} />
                <div style={styles.labelHistoric}>ARCHIVAL REGISTER (1899)</div>
              </div>
            </div>

            {/* 3. Slider Control Line & Handle */}
            <div 
              style={{ ...styles.sliderLine, left: `${sliderPos}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <div style={styles.sliderHandle}>
                <MoveHorizontal size={14} color="#000000" />
              </div>
            </div>
          </div>
        </div>

        {/* Narrative columns */}
        <div style={styles.historyGrid}>
          <div style={styles.historyCol} className="exhibit-glass-card">
            <h3 style={styles.colTitle}>The Waipahu Sugar Mill</h3>
            <div style={styles.divider} />
            <p style={styles.historyText}>
              In 1897, the Oahu Sugar Company opened its massive mill in Waipahu. The fertile lands and cold springs made it one of Hawaii's highest-yielding sugar operations. Over the next half-century, thousands of immigrant workers moved into the valley.
            </p>
            <p style={styles.historyText}>
              Cane fields once blanketed the areas from Pearl Harbor all the way up the slopes of the Waianae mountains. The mill, which closed its operations in 1995, stands as a quiet icon of this historical era.
            </p>
          </div>

          <div style={styles.historyCol} className="exhibit-glass-card">
            <h3 style={styles.colTitle}>Preserving the Living Story</h3>
            <div style={styles.divider} />
            <p style={styles.historyText}>
              Our outdoor museum reconstructs the original plantation camps of Oʻahu. Instead of isolated display boxes, we preserve complete, walk-in camp houses filled with real, donated utensils, sewing machines, and family photos.
            </p>
            <p style={styles.historyText}>
              We are dedicated to highlighting the multicultural integration of the camps, where different groups developed a shared Pidgin vocabulary, combined cooking recipes, and created the local traditions of Hawaiʻi.
            </p>
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
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    maxWidth: '750px',
    margin: '0 auto 4.5rem auto'
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
  sliderSection: {
    marginBottom: '5rem'
  },
  sliderTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '0.5rem'
  },
  sliderSub: {
    fontSize: '0.92rem',
    color: 'var(--exhibit-text-muted)',
    maxWidth: '650px',
    margin: '0 auto'
  },
  sliderFrame: {
    position: 'relative',
    height: '420px',
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    overflow: 'hidden',
    cursor: 'ew-resize',
    userSelect: 'none'
  },
  layerModern: {
    position: 'absolute',
    inset: 0,
    zIndex: 1
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none'
  },
  labelModern: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    backgroundColor: 'rgba(12, 15, 18, 0.85)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontFamily: 'var(--font-exhibit-mono)',
    fontWeight: '700',
    padding: '4px 8px',
    letterSpacing: '0.05em',
    zIndex: 4
  },
  layerHistoric: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: 2
  },
  imageClipWrapper: {
    position: 'relative',
    height: '420px',
    width: '850px' // must match the container max-width to keep image aspect ratio locked!
  },
  sliderImageHistoric: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'sepia(0.85) contrast(1.15) brightness(0.9)',
    pointerEvents: 'none'
  },
  labelHistoric: {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    backgroundColor: 'rgba(92, 61, 33, 0.85)',
    border: '1px solid var(--exhibit-gold)',
    borderRadius: '4px',
    color: 'var(--exhibit-gold)',
    fontSize: '0.65rem',
    fontFamily: 'var(--font-exhibit-mono)',
    fontWeight: '700',
    padding: '4px 8px',
    letterSpacing: '0.05em',
    zIndex: 4,
    whiteSpace: 'nowrap'
  },
  sliderLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '3px',
    backgroundColor: 'var(--exhibit-gold)',
    boxShadow: '0 0 10px var(--exhibit-gold)',
    zIndex: 3,
    transform: 'translateX(-50%)'
  },
  sliderHandle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--exhibit-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    cursor: 'ew-resize'
  },
  historyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem'
  },
  historyCol: {
    padding: '2.5rem',
    boxSizing: 'border-box'
  },
  colTitle: {
    fontSize: '1.45rem',
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'var(--font-exhibit-display)'
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, rgba(212,152,30,0.3) 0%, transparent 100%)',
    margin: '1.25rem 0'
  },
  historyText: {
    fontSize: '0.92rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1rem'
  }
};
