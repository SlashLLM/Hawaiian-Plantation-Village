import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function HeroParallax({ onExploreClick }) {
  const targetRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll bindings for elements
  const { scrollY } = useScroll();

  // Define speed transforms (only active if motion is not reduced)
  // Layer 1: Sky & Sun (Slowest)
  const ySky = useTransform(scrollY, [0, 600], [0, 80]);
  // Layer 2: Mountains (Slow)
  const yMountains = useTransform(scrollY, [0, 600], [0, 160]);
  // Layer 3: Cane Fields (Medium)
  const yCaneMid = useTransform(scrollY, [0, 600], [0, 240]);
  // Layer 4: Mill & Camp (Medium-Fast)
  const yMill = useTransform(scrollY, [0, 600], [0, 320]);
  // Layer 5: Foreground Grass (Fastest)
  const yForeground = useTransform(scrollY, [0, 600], [0, 400]);

  // Fade out hero text
  const textY = useTransform(scrollY, [0, 400], [0, 150]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div ref={targetRef} style={styles.parallaxContainer}>
      {/* Layer 1: Sky & Sun */}
      <motion.div
        style={{
          ...styles.layer,
          ...styles.skyLayer,
          y: shouldReduceMotion ? 0 : ySky
        }}
      >
        {/* Glowing Sun */}
        <div style={styles.sunGlow} />
      </motion.div>

      {/* Layer 2: Waianae Mountains Silhouette */}
      <motion.div
        style={{
          ...styles.layer,
          y: shouldReduceMotion ? 0 : yMountains
        }}
      >
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={styles.svgLayer}>
          {/* Distant mountain silhouette */}
          <path
            d="M0,220 L60,180 L180,240 L300,160 L420,210 L540,140 L660,200 L780,130 L900,190 L1020,150 L1140,220 L1260,170 L1380,230 L1440,180 L1440,320 L0,320 Z"
            fill="var(--koa-wood-dark)"
            opacity="0.45"
          />
        </svg>
      </motion.div>

      {/* Layer 3: Sugarcane Fields (Midground) */}
      <motion.div
        style={{
          ...styles.layer,
          y: shouldReduceMotion ? 0 : yCaneMid
        }}
      >
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={styles.svgLayer}>
          {/* Layered sugarcane ridge */}
          <path
            d="M0,240 Q150,210 320,250 T640,230 T960,260 T1280,240 T1440,250 L1440,320 L0,320 Z"
            fill="var(--cane-green-light)"
            opacity="0.75"
          />
          {/* Swaying cane outlines (simulation) */}
          <motion.path
            d="M100,240 Q110,180 120,240 M200,250 Q205,190 215,250 M500,235 Q515,175 510,235 M800,260 Q810,195 820,260 M1200,245 Q1210,180 1225,245"
            stroke="var(--cane-green)"
            strokeWidth="3"
            fill="none"
            animate={shouldReduceMotion ? {} : { rotate: [-1, 2, -1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ originY: 1 }}
          />
        </svg>
      </motion.div>

      {/* Layer 4: Camp Rooftops & Mill Smokestack */}
      <motion.div
        style={{
          ...styles.layer,
          y: shouldReduceMotion ? 0 : yMill
        }}
      >
        <div style={styles.millContainer}>
          {/* Sugar Mill Smokestack */}
          <svg viewBox="0 0 400 320" style={styles.millSvg}>
            {/* Camp Houses */}
            <polygon points="50,280 90,240 130,280" fill="var(--koa-wood)" />
            <rect x="60" y="280" width="60" height="40" fill="var(--paper-dark)" stroke="var(--koa-wood)" strokeWidth="1" />
            <polygon points="120,290 140,270 160,290" fill="var(--koa-wood-dark)" />
            <rect x="125" y="290" width="30" height="30" fill="var(--kraft-tan)" stroke="var(--koa-wood)" strokeWidth="1" />
            
            {/* Smokestack */}
            <rect x="220" y="80" width="30" height="240" fill="var(--tin-rust)" />
            <rect x="215" y="70" width="40" height="10" fill="var(--koa-wood)" />
            {/* Corrugated bands on stack */}
            <line x1="220" y1="120" x2="250" y2="120" stroke="var(--koa-wood)" strokeWidth="2" />
            <line x1="220" y1="180" x2="250" y2="180" stroke="var(--koa-wood)" strokeWidth="2" />
            <line x1="220" y1="240" x2="250" y2="240" stroke="var(--koa-wood)" strokeWidth="2" />
          </svg>

          {/* Animated rising SVG smoke */}
          {!shouldReduceMotion && (
            <div style={styles.smokeContainer}>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  style={styles.smokeParticle}
                  initial={{ y: 80, x: 235, scale: 0.2, opacity: 0.8 }}
                  animate={{
                    y: [-40, -180],
                    x: [235, 220 + Math.random() * 40, 180 + Math.random() * 80],
                    scale: [0.3, 1.8],
                    opacity: [0.8, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    delay: i * 0.7,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Layer 5: Foreground sugarcane stalks / grass (Fastest) */}
      <motion.div
        style={{
          ...styles.layer,
          y: shouldReduceMotion ? 0 : yForeground,
          zIndex: 10
        }}
      >
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={styles.svgLayer}>
          <path
            d="M0,280 Q200,260 400,290 T800,270 T1200,290 T1440,280 L1440,320 L0,320 Z"
            fill="var(--cane-green)"
          />
          {/* Detailed foreground stalks */}
          <path
            d="M30,300 Q20,220 -10,180 M40,300 Q50,210 20,160 M250,310 Q260,200 290,140 M600,300 Q590,210 570,170 M950,305 Q970,220 1000,150 M1350,300 Q1340,190 1310,130"
            stroke="var(--koa-wood)"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M30,300 Q20,220 -10,180 M40,300 Q50,210 20,160 M250,310 Q260,200 290,140 M600,300 Q590,210 570,170 M950,305 Q970,220 1000,150 M1350,300 Q1340,190 1310,130"
            stroke="var(--cane-green-light)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Centered Hero Text overlay */}
      <motion.div
        style={{
          ...styles.heroTextContainer,
          y: shouldReduceMotion ? 0 : textY,
          opacity: textOpacity
        }}
      >
        <div style={styles.badgeContainer}>
          <span className="ink-stamp green" style={styles.stampBadge}>Est. 1992</span>
        </div>
        <h1 style={styles.heroTitle}>Experience a Living History</h1>
        <p style={styles.heroSub}>
          Walk in the footsteps of the immigrant communities that built modern Hawaiʻi.
        </p>
        <div style={styles.heroBtnGroup}>
          <button className="btn-primary" onClick={onExploreClick}>
            Begin Pre-Visit Journey
          </button>
        </div>
      </motion.div>

      {/* Decorative Kraft Overlay */}
      <div style={styles.kraftOverlay} />
    </div>
  );
}

const styles = {
  parallaxContainer: {
    height: '92vh',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ffb973' // Sky background fallback
  },
  layer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end'
  },
  skyLayer: {
    background: 'linear-gradient(180deg, #b24e2c 0%, #ff8c52 40%, #ffb973 80%, #ebd7bc 100%)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sunGlow: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #ffe3ad 20%, #d4981e 60%, transparent 100%)',
    boxShadow: '0 0 60px #ffb973',
    transform: 'translateY(-20px)'
  },
  svgLayer: {
    width: '100%',
    height: '50%', // Aligns vector paths to lower portion
    minHeight: '280px',
    marginBottom: '-2px'
  },
  millContainer: {
    position: 'relative',
    width: '100%',
    height: '60%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: '15%'
  },
  millSvg: {
    height: '100%',
    maxHeight: '360px',
    width: 'auto'
  },
  smokeContainer: {
    position: 'absolute',
    top: 0,
    left: '15%',
    width: '300px',
    height: '100%',
    pointerEvents: 'none'
  },
  smokeParticle: {
    position: 'absolute',
    width: '28px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(235, 215, 188, 0.4)',
    filter: 'blur(6px)'
  },
  heroTextContainer: {
    position: 'relative',
    zIndex: 20,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '75%',
    color: 'var(--koa-wood-dark)'
  },
  badgeContainer: {
    marginBottom: '1rem'
  },
  stampBadge: {
    backgroundColor: 'rgba(27, 56, 35, 0.08)',
    fontSize: '0.8rem',
    letterSpacing: '0.1em'
  },
  heroTitle: {
    fontSize: '3.5rem',
    color: 'var(--koa-wood-dark)',
    fontFamily: 'var(--font-display)',
    marginBottom: '1rem',
    textShadow: '1px 1px 0px var(--kraft-tan)',
    '@media (max-width: 768px)': {
      fontSize: '2.2rem'
    }
  },
  heroSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.25rem',
    color: 'var(--koa-wood)',
    marginBottom: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heroBtnGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  kraftOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
    pointerEvents: 'none',
    zIndex: 90
  }
};
