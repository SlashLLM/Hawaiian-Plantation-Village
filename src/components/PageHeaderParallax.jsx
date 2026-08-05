import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function PageHeaderParallax({ image, stamp, title, subtitle }) {
  const targetRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <div ref={targetRef} style={styles.headerBlock}>
      <div style={styles.layersContainer} aria-hidden="true">
        <motion.div
          style={{
            ...styles.layer,
            y: shouldReduceMotion ? 0 : yImage,
          }}
        >
          <img src={image} alt="" style={styles.layerImage} />
        </motion.div>

        <div style={styles.gradientOverlay} />
      </div>

      <div className="editorial-shell" style={styles.container}>
        <p style={styles.eyebrow}>{stamp}</p>
        <h1 style={styles.pageTitle}>{title}</h1>
        {subtitle && <p style={styles.pageSubtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}

const styles = {
  headerBlock: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    minHeight: 'min(52vh, 460px)',
    padding: 'clamp(3rem, 8vh, 5rem) 0 clamp(2.5rem, 6vh, 3.5rem)',
    marginBottom: 'clamp(3rem, 7vw, 5rem)',
    backgroundColor: 'var(--plantation-ink)',
  },
  layersContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
    inset: '-12% 0',
    willChange: 'transform',
  },
  layerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
  },
  gradientOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to top, rgba(16,26,20,0.94) 0%, rgba(16,26,20,0.66) 45%, rgba(16,26,20,0.3) 100%)',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  eyebrow: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--heritage-gold)',
    margin: '0 0 0.9rem',
  },
  pageTitle: {
    fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
    fontWeight: 500,
    color: 'var(--sugarcane-cream)',
    margin: 0,
    maxWidth: '18ch',
  },
  pageSubtitle: {
    fontSize: 'clamp(1rem, 1.4vw, 1.12rem)',
    lineHeight: 1.65,
    color: 'rgba(250, 246, 236, 0.76)',
    maxWidth: '52ch',
    margin: '1.1rem 0 0',
  },
};
