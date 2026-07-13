import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Database,
  Globe2,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const PILLARS = [
  {
    num: '01',
    title: 'Guided Village Walks',
    desc: 'Walk authentic camp houses with docents who connect place, architecture, and lived experience.',
    icon: MapPin,
  },
  {
    num: '02',
    title: 'Multicultural Cultures',
    desc: 'Japanese, Portuguese, Chinese, Filipino, Korean, Okinawan, and Puerto Rican communities preserved in one living campus.',
    icon: Users,
  },
  {
    num: '03',
    title: 'Land Stewardship',
    desc: 'Heritage gardens, native plantings, and Waipahu canopy stories that frame history as ecological memory.',
    icon: Leaf,
  },
  {
    num: '04',
    title: 'Hands-on Learning',
    desc: 'School programs, demonstrations, and interactive exhibits that turn archives into memorable encounters.',
    icon: Sparkles,
  },
  {
    num: '05',
    title: 'Community Trust',
    desc: 'Oral histories, family records, and nonprofit stewardship keep the village accountable to the people it represents.',
    icon: ShieldCheck,
  },
];

const STORIES = [
  {
    tag: 'Success Story',
    title: 'Japanese Camp House: Tatami, Shoji, and Bon Traditions',
    person: 'Community Docents',
    image: '/alethia/people-stories.jpg',
  },
  {
    tag: 'Success Story',
    title: 'Portuguese Forno: Bread, Music, and Shared Courtyards',
    person: 'Heritage Kitchen Team',
    image: '/alethia/nature-place.jpg',
  },
];

const INSIGHTS = [
  {
    date: 'Aug 2025',
    title: 'Why Place-Based History Matters for Waipahu',
    excerpt: 'How walking the village turns abstract timelines into stories you can see, touch, and remember.',
  },
  {
    date: 'Sep 2025',
    title: 'Plantation Heritage Day: A Field Guide for Families',
    excerpt: 'What to expect from live demonstrations, food stalls, and cultural performances on the grounds.',
  },
];

function MetricChip() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? 92 : 0);

  useEffect(() => {
    if (reduce) return;
    const target = 92;
    const duration = 1400;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  return (
    <div className="alethia-metric-chip" aria-label="Illustrative Living Heritage Index score">
      <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--alethia-text-muted-dark)' }}>
        Living Heritage Index
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <strong style={{ fontSize: '2rem', color: 'var(--alethia-accent)' }}>{value}</strong>
        <span style={{ fontSize: '0.85rem', color: 'var(--alethia-text-muted-dark)' }}>/ 100 illustrative</span>
      </div>
      <p style={{ margin: '8px 0 0', fontSize: '0.78rem', color: 'var(--alethia-text-muted-dark)', lineHeight: 1.5 }}>
        Camp cultures tracked · Gardens mapped · Stories verified by community stewards
      </p>
    </div>
  );
}

function RevealSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 28 }}
      transition={{ duration: reduce ? 0 : 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Home({ setActivePage }) {
  const reduce = useReducedMotion();
  const pillarsRef = useRef(null);

  const goTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.page} className="theme-alethia">
      {/* Hero */}
      <section style={styles.hero}>
        <img src="/alethia/hero-canopy.jpg" alt="Lush forest canopy in Waipahu heritage landscape" style={styles.heroImage} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroInner}>
          <motion.p
            style={styles.heroBrand}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hawaiian Plantation Village
          </motion.p>
          <motion.h1
            style={styles.heroTitle}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Where Living History and Community Stewardship Meet
          </motion.h1>
          <motion.p
            style={styles.heroSub}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            End-to-end cultural intelligence powered by place, archives, and the stories Waipahu families still tell.
          </motion.p>
          <motion.div
            style={styles.heroCtas}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
          >
            <button className="alethia-btn-accent" onClick={() => goTo('tickets')}>
              Let&apos;s Visit <ArrowRight size={16} />
            </button>
            <button className="alethia-btn-secondary" style={styles.heroSecondaryBtn} onClick={() => goTo('about')}>
              Our Mission
            </button>
          </motion.div>
          <motion.div
            style={styles.metricWrap}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <MetricChip />
          </motion.div>
        </div>
        <button style={styles.scrollHint} onClick={() => pillarsRef.current?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to discover">
          <span>Scroll to discover</span>
          <ChevronDown size={18} />
        </button>
      </section>

      {/* Pillars */}
      <section ref={pillarsRef} style={styles.section}>
        <div style={styles.container}>
          <RevealSection>
            <span className="alethia-eyebrow">Five pillars</span>
            <h2 style={styles.sectionTitle}>Gold-standard heritage experiences, built for every visitor</h2>
          </RevealSection>
          <div style={styles.pillarGrid}>
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <RevealSection key={pillar.num} delay={i * 0.06}>
                  <article style={styles.pillarCard} className="alethia-glass">
                    <span className="alethia-pillar-num">{pillar.num}.</span>
                    <Icon size={22} color="var(--alethia-primary)" aria-hidden="true" />
                    <h3 style={styles.pillarTitle}>{pillar.title}</h3>
                    <p style={styles.pillarDesc}>{pillar.desc}</p>
                  </article>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section style={styles.visionSection} className="alethia-section-dark">
        <div style={styles.visionGrid}>
          <RevealSection>
            <span className="alethia-eyebrow">Our vision</span>
            <h2 style={styles.visionTitle}>From scattered stories to living, measurable heritage</h2>
            <p style={styles.visionText}>
              A breakthrough in place-based history—built for schools, families, and anyone who wants Waipahu&apos;s plantation era to feel real, not abstract.
            </p>
          </RevealSection>
          <RevealSection delay={0.1}>
            <model-viewer
              src="/alethia/models/globe.glb"
              alt="Rotating 3D globe representing connected heritage stories"
              auto-rotate={reduce ? undefined : ''}
              camera-controls
              touch-action="pan-y"
              style={styles.modelViewer}
              exposure="1.1"
              shadow-intensity="0.6"
            />
          </RevealSection>
        </div>
      </section>

      {/* Solutions pair */}
      <section style={styles.section}>
        <div style={styles.container}>
          <RevealSection>
            <span className="alethia-eyebrow">Our solutions</span>
            <h2 style={styles.sectionTitle}>Validating what the land and people already remember</h2>
          </RevealSection>
          <div style={styles.solutionsGrid}>
            {[
              {
                label: 'Nature & Place',
                title: 'Walk the gardens, millsite, and camp landscapes that shaped Waipahu',
                image: '/alethia/nature-place.jpg',
                page: 'visit',
              },
              {
                label: 'People & Stories',
                title: 'Hear immigrant journeys through camp houses, artifacts, and oral histories',
                image: '/alethia/people-stories.jpg',
                page: 'stories',
              },
            ].map((item, i) => (
              <RevealSection key={item.label} delay={i * 0.08}>
                <motion.button
                  style={styles.solutionCard}
                  onClick={() => goTo(item.page)}
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                >
                  <img src={item.image} alt="" style={styles.solutionImage} />
                  <div style={styles.solutionOverlay} />
                  <div style={styles.solutionContent}>
                    <span style={styles.solutionLabel}>[{item.label}]</span>
                    <h3 style={styles.solutionTitle}>{item.title}</h3>
                    <span style={styles.solutionLink}>
                      Explore <ArrowRight size={16} />
                    </span>
                  </div>
                </motion.button>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech trust strip */}
      <section style={styles.techSection}>
        <div style={styles.container}>
          <div style={styles.techGrid}>
            <RevealSection>
              <span className="alethia-eyebrow">Our approach</span>
              <h2 style={styles.sectionTitle}>Scientific rigor. Community precision. Unmatched trust.</h2>
              <p style={styles.techLead}>
                We keep history honest through archives, oral testimony, and place-based learning—not guesswork.
              </p>
            </RevealSection>
            <RevealSection delay={0.08}>
              <div style={styles.techCards}>
                {[
                  { icon: Database, title: 'Archival Records', desc: 'Ledgers, photos, and artifacts cross-referenced with community knowledge.' },
                  { icon: Globe2, title: 'Place-Based Learning', desc: 'Every camp house situates global migration in a Waipahu address you can visit.' },
                  { icon: ShieldCheck, title: 'Stewardship Standards', desc: 'Nonprofit governance and docent training keep interpretation accountable.' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="alethia-glass" style={styles.techCard}>
                      <Icon size={20} color="var(--alethia-accent)" />
                      <h3 style={styles.techCardTitle}>{item.title}</h3>
                      <p style={styles.techCardDesc}>{item.desc}</p>
                    </article>
                  );
                })}
              </div>
              <div style={styles.dataStream} aria-hidden="true">
                {['CAMP CULTURES', 'GARDEN FLORA', 'ORAL HISTORY', 'VISITOR FLOW'].map((label) => (
                  <span key={label} style={styles.streamChip}>{label}</span>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section style={styles.section}>
        <div style={styles.container}>
          <RevealSection>
            <span className="alethia-eyebrow">Case studies</span>
            <h2 style={styles.sectionTitle}>Explore how visitors connect with camp cultures</h2>
          </RevealSection>
          <div style={styles.storiesGrid}>
            {STORIES.map((story, i) => (
              <RevealSection key={story.title} delay={i * 0.08}>
                <article style={styles.storyCard} className="alethia-glass">
                  <img src={story.image} alt="" style={styles.storyImage} />
                  <div style={styles.storyBody}>
                    <span style={styles.storyTag}>{story.tag}</span>
                    <h3 style={styles.storyTitle}>{story.title}</h3>
                    <p style={styles.storyPerson}>{story.person}</p>
                    <button className="alethia-btn-secondary" style={{ marginTop: 'auto' }} onClick={() => goTo('stories')}>
                      Read story <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section style={styles.insightsSection}>
        <div style={styles.container}>
          <RevealSection>
            <div style={styles.insightsHeader}>
              <div>
                <span className="alethia-eyebrow">Latest insights</span>
                <h2 style={styles.sectionTitle}>Stories that move the community forward</h2>
              </div>
              <button className="alethia-btn-secondary" onClick={() => goTo('learn')}>
                See all <ArrowRight size={14} />
              </button>
            </div>
          </RevealSection>
          <div style={styles.insightsGrid}>
            {INSIGHTS.map((item, i) => (
              <RevealSection key={item.title} delay={i * 0.06}>
                <article className="alethia-glass" style={styles.insightCard}>
                  <span style={styles.insightDate}>{item.date}</span>
                  <h3 style={styles.insightTitle}>{item.title}</h3>
                  <p style={styles.insightExcerpt}>{item.excerpt}</p>
                  <button style={styles.textLink} onClick={() => goTo('learn')}>Full story →</button>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={styles.ctaSection} className="alethia-section-dark">
        <RevealSection>
          <h2 style={styles.ctaTitle}>Turn a visit into a lasting connection</h2>
          <p style={styles.ctaSub}>Make real progress with history you can walk, hear, and share with the next generation.</p>
          <div style={styles.ctaButtons}>
            <button className="alethia-btn-accent" onClick={() => goTo('tickets')}>
              Let&apos;s Visit
            </button>
            <button className="alethia-btn-secondary" style={styles.ctaSecondary} onClick={() => goTo('support')}>
              Support the Village
            </button>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1 },
  hero: {
    position: 'relative',
    minHeight: 'min(100dvh, 920px)',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  heroImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(11,31,28,0.35) 0%, rgba(11,31,28,0.82) 70%, rgba(11,31,28,0.95) 100%)',
  },
  heroInner: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '6rem 1.5rem 5rem',
    width: '100%',
  },
  heroBrand: {
    fontFamily: 'var(--font-alethia-display)',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    fontWeight: 700,
    color: 'var(--alethia-accent)',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  heroTitle: {
    fontFamily: 'var(--font-alethia-display)',
    fontSize: 'clamp(2.2rem, 6vw, 4rem)',
    fontWeight: 700,
    color: '#ffffff',
    maxWidth: '820px',
    lineHeight: 1.05,
    marginBottom: '1.25rem',
  },
  heroSub: {
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    color: 'var(--alethia-text-muted-dark)',
    maxWidth: '560px',
    lineHeight: 1.65,
    marginBottom: '1.75rem',
  },
  heroCtas: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' },
  heroSecondaryBtn: { color: '#ecfdf5', borderColor: 'rgba(236,253,245,0.35)' },
  metricWrap: { maxWidth: '320px' },
  scrollHint: {
    position: 'absolute',
    bottom: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    background: 'none',
    border: 'none',
    color: 'var(--alethia-text-muted-dark)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'var(--font-alethia-body)',
  },
  section: { padding: '5rem 1.5rem' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 700,
    marginTop: '0.75rem',
    marginBottom: '2rem',
    lineHeight: 1.15,
  },
  pillarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem',
  },
  pillarCard: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    minHeight: '220px',
  },
  pillarTitle: { fontSize: '1.1rem', fontWeight: 600 },
  pillarDesc: { fontSize: '0.9rem', color: 'var(--alethia-text-muted)', lineHeight: 1.6, margin: 0 },
  visionSection: { padding: '5rem 1.5rem' },
  visionGrid: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
    alignItems: 'center',
  },
  visionTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
    fontWeight: 700,
    lineHeight: 1.12,
    margin: '0.75rem 0 1rem',
  },
  visionText: { color: 'var(--alethia-text-muted-dark)', lineHeight: 1.65, fontSize: '1.05rem' },
  modelViewer: {
    width: '100%',
    height: '360px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--alethia-border-dark)',
  },
  solutionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.25rem',
  },
  solutionCard: {
    position: 'relative',
    border: 'none',
    borderRadius: '20px',
    overflow: 'hidden',
    minHeight: '360px',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
    width: '100%',
  },
  solutionImage: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  solutionOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 20%, rgba(11,31,28,0.92) 100%)',
  },
  solutionContent: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    minHeight: '360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '1.75rem',
    color: '#ecfdf5',
  },
  solutionLabel: {
    fontSize: '0.72rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--alethia-accent)',
    marginBottom: '0.5rem',
  },
  solutionTitle: { fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '1rem' },
  solutionLink: { display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: '0.9rem' },
  techSection: {
    padding: '5rem 1.5rem',
    background: 'linear-gradient(180deg, rgba(15,118,110,0.05) 0%, transparent 100%)',
  },
  techGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' },
  techLead: { color: 'var(--alethia-text-muted)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '560px' },
  techCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' },
  techCard: { padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  techCardTitle: { fontSize: '1rem', fontWeight: 600 },
  techCardDesc: { fontSize: '0.88rem', color: 'var(--alethia-text-muted)', lineHeight: 1.55, margin: 0 },
  dataStream: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  streamChip: {
    fontFamily: 'var(--font-alethia-display)',
    fontSize: '0.68rem',
    letterSpacing: '0.12em',
    padding: '0.4rem 0.75rem',
    borderRadius: 999,
    background: 'var(--alethia-bg-dark)',
    color: 'var(--alethia-accent)',
  },
  storiesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' },
  storyCard: { overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  storyImage: { width: '100%', height: '180px', objectFit: 'cover' },
  storyBody: { padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' },
  storyTag: { fontSize: '0.72rem', fontWeight: 700, color: 'var(--alethia-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' },
  storyTitle: { fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.35 },
  storyPerson: { fontSize: '0.85rem', color: 'var(--alethia-text-muted)', marginBottom: '0.75rem' },
  insightsSection: { padding: '5rem 1.5rem', background: 'rgba(15,118,110,0.04)' },
  insightsHeader: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.5rem' },
  insightsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' },
  insightCard: { padding: '1.5rem' },
  insightDate: { fontSize: '0.78rem', color: 'var(--alethia-primary)', fontWeight: 600 },
  insightTitle: { fontSize: '1.05rem', fontWeight: 600, margin: '0.5rem 0' },
  insightExcerpt: { fontSize: '0.9rem', color: 'var(--alethia-text-muted)', lineHeight: 1.6, margin: '0 0 1rem' },
  textLink: { background: 'none', border: 'none', color: 'var(--alethia-primary)', fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: 'var(--font-alethia-body)' },
  ctaSection: { padding: '5rem 1.5rem', textAlign: 'center' },
  ctaTitle: { fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, marginBottom: '1rem' },
  ctaSub: { color: 'var(--alethia-text-muted-dark)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.65 },
  ctaButtons: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' },
  ctaSecondary: { color: '#ecfdf5', borderColor: 'rgba(236,253,245,0.35)' },
};
