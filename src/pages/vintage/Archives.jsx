import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import {
  useContentCollection,
  usePageSection,
  usePageListSection,
} from '../../context/ContentProvider.jsx';
import { PHOTOGRAPH_COLLECTIONS } from '../../lib/content/fallbacks.js';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import SEO from '../../components/SEO.jsx';

const collectionName = (id) =>
  PHOTOGRAPH_COLLECTIONS.find((collection) => collection.id === id)?.name ?? 'Archives';

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

export default function Archives() {
  const navigate = useNavigate();
  const { items: photographs } = useContentCollection('photograph');
  const { section: header } = usePageSection('archives', 'header', {});
  const { section: howToLook } = usePageSection('archives', 'howToLook', {});
  const { section: collectionsSection, items: collections } = usePageListSection(
    'archives',
    'collections',
  );
  const { section: samplesSection, items: samples } = usePageListSection('archives', 'samples');
  const { section: resourcesSection, items: resources } = usePageListSection(
    'archives',
    'resources',
  );
  const [activeCollection, setActiveCollection] = useState('all');

  const counts = useMemo(() => {
    const tally = { all: photographs.length };
    photographs.forEach((photo) => {
      tally[photo.collection] = (tally[photo.collection] ?? 0) + 1;
    });
    return tally;
  }, [photographs]);

  const visible = activeCollection === 'all'
    ? photographs
    : photographs.filter((photo) => photo.collection === activeCollection);

  const lead = photographs[0];

  return (
    <div>
      <SEO title="Photograph Archives" description="Look closely at the historical record of Hawaii's Plantation Village." />
      <PageHeaderParallax
        image={lead?.imageUrl || SITE_PHOTOS.headers.visit}
        stamp={header?.stamp ?? 'Photograph archives'}
        title={header?.title ?? 'Look closely at the record'}
        subtitle={header?.subtitle}
      />

      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{collectionsSection?.eyebrow ?? 'Three collections'}</p>
            <h2 className="editorial-title">{collectionsSection?.title}</h2>
            <p className="editorial-lede">{collectionsSection?.description}</p>
          </Reveal>

          <div className="door-grid">
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                className="door"
                onClick={() => setActiveCollection(collection.id)}
              >
                <span className="door-title">{collection.name}</span>
                <span className="door-note">{collection.blurb}</span>
                <span className="archive-card-meta" style={{ marginTop: '0.5rem' }}>
                  {counts[collection.id] ?? 0} digitized
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section on-sand" id="browse">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">Browse</p>
            <h2 className="editorial-title">Every digitized photograph</h2>
          </Reveal>

          <div className="archive-filters">
            {[{ id: 'all', name: 'All photographs' }, ...collections].map((option) => (
              <button
                key={option.id}
                type="button"
                className="archive-filter"
                aria-pressed={activeCollection === option.id}
                onClick={() => setActiveCollection(option.id)}
              >
                {option.name} ({counts[option.id] ?? 0})
              </button>
            ))}
          </div>

          <div className="archive-grid">
            {visible.map((photo) => (
              <button
                key={photo.arkId}
                type="button"
                className="archive-card"
                onClick={() => navigate(`/archives/${photo.arkId}`)}
              >
                <span className="archive-figure">
                  <img src={photo.thumbnailUrl || photo.imageUrl} alt={photo.title} loading="lazy" />
                </span>
                <span className="archive-card-meta">{collectionName(photo.collection)}</span>
                <span className="archive-card-title">{photo.title}</span>
                <span className="door-note">{photo.circaDate}</span>
              </button>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="editorial-lede">No photographs from this collection are digitized yet.</p>
          )}
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{howToLook?.eyebrow ?? 'How to look'}</p>
            <h2 className="editorial-title">{howToLook?.title}</h2>
            <p className="editorial-lede">{howToLook?.description}</p>
          </Reveal>

          <div className="door-grid">
            {(howToLook?.steps ?? []).map((step, index) => (
              <div key={step.title} className="door" style={{ cursor: 'default' }}>
                <span className="archive-card-meta">Step {index + 1}</span>
                <span className="door-title">{step.title}</span>
                <span className="door-note">{step.note}</span>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '2.5rem' }}>
            <button
              type="button"
              className="btn-accent"
              onClick={() => navigate(`/archives/${lead?.arkId ?? ''}#analyze`)}
              disabled={!lead}
            >
              Analyze a photograph
            </button>
          </p>
        </div>
      </section>

      <section className="editorial-section on-ink">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{samplesSection?.eyebrow ?? 'Worked examples'}</p>
            <h2 className="editorial-title">{samplesSection?.title}</h2>
            <p className="editorial-lede">{samplesSection?.description}</p>
          </Reveal>

          {samples.map((sample, index) => {
            const frames = (sample.arkIds ?? [])
              .map((id) => photographs.find((photo) => photo.arkId === id))
              .filter(Boolean);
            return (
              <Reveal key={sample.label} delay={index * 0.08}>
                <div style={{ marginTop: '3rem' }}>
                  <p className="archive-card-meta" style={{ color: 'var(--heritage-gold)' }}>
                    {sample.label}
                  </p>
                  <h3 style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', margin: '0.4rem 0 1.5rem' }}>
                    {sample.title}
                  </h3>
                  <div className="related-strip" style={{ marginTop: 0 }}>
                    {frames.map((frame) => (
                      <button
                        key={frame.arkId}
                        type="button"
                        className="archive-card"
                        onClick={() => navigate(`/archives/${frame.arkId}`)}
                      >
                        <span className="archive-figure">
                          <img src={frame.thumbnailUrl || frame.imageUrl} alt={frame.title} loading="lazy" />
                        </span>
                        <span className="archive-card-title" style={{ color: 'var(--sugarcane-cream)' }}>
                          {frame.title}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="editorial-lede" style={{ maxWidth: '66ch' }}>{sample.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="editorial-section on-sand">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{resourcesSection?.eyebrow ?? 'Keep researching'}</p>
            <h2 className="editorial-title">{resourcesSection?.title}</h2>
            <p className="editorial-lede">{resourcesSection?.description}</p>
          </Reveal>

          <ul className="resource-list">
            {resources.map((resource) => (
              <li key={resource.label}>
                {resource.href ? (
                  <a
                    className="resource-label"
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    {resource.label} <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="resource-label">{resource.label}</span>
                )}
                <p className="door-note" style={{ marginTop: '0.35rem' }}>{resource.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
