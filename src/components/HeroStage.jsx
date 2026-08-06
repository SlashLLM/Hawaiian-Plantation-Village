import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const DEFAULT_STATS = [
  { value: '1992', label: 'Opened' },
  { value: '8', label: 'Cultures' },
  { value: '30', label: 'Structures' },
  { value: '25k+', label: 'Students a year' },
];

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.12 * i, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

const still = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

export default function HeroStage({ hero = {}, onPrimaryClick }) {
  const videoRef = useRef(null);
  const storyVideoRef = useRef(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? still : rise;

  const videoSrc = hero.videoSrc ?? '/gwr_video_mvp.mp4';
  const posterSrc = hero.posterSrc ?? '/digitized-photos/IMG_6805.jpeg';
  const eyebrow = hero.eyebrow ?? hero.badge ?? 'Hawaiʻi\'s living museum · Waipahu, Oʻahu';
  const headline = hero.headline ?? hero.title ?? 'History didn\'t happen here. It still does.';
  const support =
    hero.support ??
    hero.subtitle ??
    'Walk the camp houses where eight immigrant communities built a life together — and still gather today.';
  const primaryLabel = hero.primaryCta?.label ?? hero.ctaLabel ?? 'Plan your visit';
  const secondaryLabel = hero.secondaryCta?.label ?? 'Watch the story';
  const stats = hero.stats?.length ? hero.stats : DEFAULT_STATS;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldReduceMotion) {
      video.pause();
      return;
    }
    const play = video.play();
    if (play?.catch) play.catch(() => {});
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!storyOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setStoryOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    storyVideoRef.current?.play?.().catch(() => {});
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [storyOpen]);

  return (
    <section className="hero-stage">
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay={!shouldReduceMotion}
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <div className="editorial-shell">
          <motion.p
            className="editorial-eyebrow"
            style={{ color: 'var(--heritage-gold)', margin: 0 }}
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {eyebrow}
          </motion.p>

          <motion.h1 className="hero-headline" variants={variants} initial="hidden" animate="visible" custom={1}>
            {headline}
          </motion.h1>

          <motion.p className="hero-support" variants={variants} initial="hidden" animate="visible" custom={2}>
            {support}
          </motion.p>

          <motion.div className="hero-actions" variants={variants} initial="hidden" animate="visible" custom={3}>
            <button type="button" className="btn-accent" onClick={onPrimaryClick}>
              {primaryLabel}
            </button>
            <button type="button" className="btn-ghost-invert" onClick={() => setStoryOpen(true)}>
              <Play size={16} /> {secondaryLabel}
            </button>
          </motion.div>

          <motion.dl className="hero-stats" variants={variants} initial="hidden" animate="visible" custom={4}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="hero-stat-value">{stat.value}</dt>
                <dd className="hero-stat-label">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <AnimatePresence>
        {storyOpen && (
          <motion.div
            style={styles.storyBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Village documentary"
            onClick={() => setStoryOpen(false)}
          >
            <button
              type="button"
              style={styles.storyClose}
              onClick={() => setStoryOpen(false)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <video
              ref={storyVideoRef}
              src={videoSrc}
              controls
              playsInline
              style={styles.storyVideo}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const styles = {
  storyBackdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    background: 'rgba(16, 26, 20, 0.94)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(1rem, 5vw, 3rem)',
  },
  storyVideo: {
    width: '100%',
    maxWidth: '1100px',
    maxHeight: '80vh',
    borderRadius: 'var(--border-radius-md)',
    background: '#000',
  },
  storyClose: {
    position: 'absolute',
    top: '1.25rem',
    right: '1.25rem',
    background: 'transparent',
    border: '1px solid var(--hairline-invert)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--sugarcane-cream)',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'inline-flex',
  },
};
