import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function PageHeaderParallax({
  layers,
  stamp,
  stampClass = 'ink-stamp green',
  title,
  subtitle,
}) {
  const targetRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const yBack = useTransform(scrollY, [0, 600], [0, 80]);
  const yMid = useTransform(scrollY, [0, 600], [0, 200]);
  const yFront = useTransform(scrollY, [0, 600], [0, 350]);

  const layerMotion = (y) => (shouldReduceMotion ? 0 : y);

  return (
    <div ref={targetRef} style={styles.headerBlock}>
      <div style={styles.layersContainer} aria-hidden="true">
        <motion.div
          style={{
            ...styles.layer,
            y: layerMotion(yBack),
          }}
        >
          <img src={layers.back} alt="" style={styles.layerImage} />
        </motion.div>

        <motion.div
          style={{
            ...styles.layer,
            y: layerMotion(yMid),
          }}
        >
          <img src={layers.mid} alt="" style={styles.layerImage} />
        </motion.div>

        <motion.div
          style={{
            ...styles.layer,
            y: layerMotion(yFront),
          }}
        >
          <img src={layers.front} alt="" style={styles.layerImage} />
        </motion.div>

        <div style={styles.gradientOverlay} />
      </div>

      <div style={styles.container}>
        <span className={stampClass} style={{ marginBottom: '0.5rem' }}>
          {stamp}
        </span>
        <h1 style={styles.pageTitle}>{title}</h1>
        <p style={styles.pageSubtitle}>{subtitle}</p>
      </div>
    </div>
  );
}

const styles = {
  headerBlock: {
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    padding: '3.5rem 0',
    marginBottom: '3rem',
    backgroundColor: 'var(--paper-dark)',
  },
  layersContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
    inset: '-15% 0',
    willChange: 'transform',
  },
  layerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'right center',
    display: 'block',
  },
  gradientOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(90deg, rgba(240,234,225,0.95) 0%, rgba(240,234,225,0.75) 40%, rgba(240,234,225,0.25) 65%, transparent 85%)',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  pageTitle: {
    fontSize: '2.8rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '0.5rem',
  },
  pageSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.15rem',
    color: 'var(--text-muted)',
    maxWidth: '700px',
    marginBottom: 0,
  },
};
