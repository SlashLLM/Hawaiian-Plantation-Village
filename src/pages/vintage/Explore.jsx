import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import SEO from '../../components/SEO.jsx';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { useContentCollection, usePageSection } from '../../context/ContentProvider.jsx';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import { cultureSlug, sortCampsChronologically } from '../../lib/cultures.js';

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

export default function Explore() {
  const setActivePage = useAppNavigate();
  const { section: header } = usePageSection('explore', 'header', {});
  const { section: intro } = usePageSection('explore', 'intro', {});
  const { items: camps } = useContentCollection('camp_story');
  const { section: cultures } = usePageSection('home', 'cultures', {});

  const sortedCamps = useMemo(() => sortCampsChronologically(camps), [camps]);

  // The homepage tiles carry the short cultural taglines; the camp records carry
  // the longer history. Match them by slug so each card shows both.
  const noteFor = (camp) => {
    const slug = cultureSlug(camp);
    const tile = (cultures?.items ?? []).find((item) => cultureSlug(item.name) === slug);
    return tile?.note ?? camp.shortDesc;
  };

  return (
    <div>
      <SEO
        title="Explore the Homes"
        description="Step inside the historic homes, gardens and cultural traditions of the eight communities represented at Hawaii's Plantation Village."
      />
      <PageHeaderParallax
        image={SITE_PHOTOS.headers.explore}
        stamp={header?.stamp ?? 'Homes, gardens & cultural traditions'}
        title={header?.title ?? 'Many journeys. Different cultures. One shared history.'}
        subtitle={header?.subtitle}
      />

      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            {(intro?.paragraphs ?? []).map((paragraph, index) => (
              <p key={index} className="editorial-lede">{paragraph}</p>
            ))}
            {intro?.closing && <p style={styles.closingLine}>{intro.closing}</p>}
          </Reveal>

          <div className="door-grid" style={{ marginTop: '2.5rem' }}>
            {sortedCamps.map((camp) => (
              <button
                key={camp.id}
                type="button"
                className="door"
                onClick={() => setActivePage('explore-culture', { cultureId: cultureSlug(camp) })}
              >
                <span className="door-title">
                  {camp.culture} <ArrowRight size={15} />
                </span>
                <span className="door-note">{noteFor(camp)}</span>
                {camp.arrival && (
                  <span className="archive-card-meta" style={{ marginTop: '0.5rem' }}>
                    Arrived {camp.arrival}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section on-sand">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">Hear them in their own words</p>
            <h2 className="editorial-title">Every home has a voice behind it.</h2>
            <p className="editorial-lede">
              The homes show you how families lived. The oral histories let you hear it from the
              people who were there.
            </p>
            <div style={styles.actions}>
              <button className="btn-primary" onClick={() => setActivePage('stories')}>
                Listen to the stories <ArrowRight size={16} />
              </button>
              <button className="btn-secondary" onClick={() => setActivePage('visit')}>
                Plan Your Visit
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

const styles = {
  closingLine: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
    lineHeight: 1.5,
    color: 'var(--plantation-ink)',
    maxWidth: '48ch',
    margin: '1.25rem 0 0',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1.75rem',
  },
};
