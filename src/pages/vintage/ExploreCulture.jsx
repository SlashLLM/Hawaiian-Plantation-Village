import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import SEO from '../../components/SEO.jsx';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { useContentCollection, usePageSection } from '../../context/ContentProvider.jsx';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import { cultureSlug, findCampBySlug } from '../../lib/cultures.js';
import { buildingsForCulture } from '../../data/brochureContent.js';

function Reveal({ children, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return children;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function ExploreCulture() {
  const { cultureId } = useParams();
  const setActivePage = useAppNavigate();
  const { items: camps, loading } = useContentCollection('camp_story');
  const { section: cultures } = usePageSection('home', 'cultures', {});

  const camp = findCampBySlug(camps, cultureId);

  // Wait for the collection before deciding a slug is unknown, otherwise a slow
  // fetch would bounce the visitor back to /explore on every direct link.
  if (!camp) {
    if (loading || camps.length === 0) return null;
    return <Navigate to="/explore" replace />;
  }

  const tile = (cultures?.items ?? []).find(
    (item) => cultureSlug(item.name) === cultureSlug(camp),
  );
  const others = camps.filter((item) => cultureSlug(item) !== cultureSlug(camp));
  const buildings = buildingsForCulture(cultureSlug(camp));

  return (
    <div>
      <SEO
        title={`${camp.culture} at the Village`}
        description={camp.shortDesc}
      />
      <PageHeaderParallax
        image={camp.imageUrl || SITE_PHOTOS.headers.explore}
        stamp={camp.arrival ? `${camp.culture} · Arrived ${camp.arrival}` : camp.culture}
        title={camp.title}
        subtitle={tile?.note ?? camp.shortDesc}
      />

      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <button className="btn-secondary" onClick={() => setActivePage('explore')}>
              <ArrowLeft size={15} /> All homes
            </button>
          </Reveal>

          <Reveal>
            <p className="editorial-eyebrow" style={{ marginTop: '2rem' }}>
              Inside the home
            </p>
            <h2 className="editorial-title">{camp.culture} life at the Village</h2>
            <p style={styles.body}>{camp.fullHistory ?? camp.shortDesc}</p>
            {buildings.length > 0 && (
              <p style={styles.body}>
                <strong style={styles.atVillageLabel}>At the Village: </strong>
                {buildings
                  .map((building) => (building.year ? `${building.name} (${building.year})` : building.name))
                  .join(' · ')}
              </p>
            )}
          </Reveal>

          {camp.oralHistory?.transcript && (
            <Reveal>
              <blockquote style={styles.quote}>
                {camp.oralHistory.transcript}
                {camp.oralHistory.narrator && (
                  <cite style={styles.quoteCite}>{camp.oralHistory.narrator}</cite>
                )}
              </blockquote>
              <div style={styles.actions}>
                <button className="btn-primary" onClick={() => setActivePage('stories')}>
                  Hear the full oral history <ArrowRight size={16} />
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="editorial-section on-sand">
          <div className="editorial-shell">
            <Reveal>
              <p className="editorial-eyebrow">Keep exploring</p>
              <h2 className="editorial-title">Every home has a unique story to tell.</h2>
            </Reveal>
            <div className="door-grid" style={{ marginTop: '2.5rem' }}>
              {others.map((other) => (
                <button
                  key={other.id}
                  type="button"
                  className="door"
                  onClick={() => setActivePage('explore-culture', { cultureId: cultureSlug(other) })}
                >
                  <span className="door-title">
                    {other.culture} <ArrowRight size={15} />
                  </span>
                  <span className="door-note">{other.shortDesc}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const styles = {
  body: {
    fontSize: '1.02rem',
    lineHeight: 1.7,
    color: 'var(--muted-sage)',
    maxWidth: '62ch',
    marginBottom: '1.1rem',
  },
  atVillageLabel: {
    color: 'var(--plantation-ink)',
    fontWeight: 600,
  },
  quote: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    lineHeight: 1.6,
    color: 'var(--plantation-ink)',
    borderLeft: '1px solid var(--heritage-gold)',
    paddingLeft: '1.25rem',
    maxWidth: '58ch',
    margin: '2rem 0 0',
  },
  quoteCite: {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
    fontStyle: 'normal',
    marginTop: '0.9rem',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1.75rem',
  },
};
