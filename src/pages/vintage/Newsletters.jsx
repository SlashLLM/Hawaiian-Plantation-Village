import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import { NEWSLETTERS, NEWSLETTER_CATEGORIES } from '../../data/newsletters.js';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import SEO from '../../components/SEO.jsx';

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

const newestFirst = (a, b) => b.sortKey.localeCompare(a.sortKey);

export default function Newsletters() {
  const [activeCategory, setActiveCategory] = useState('all');

  const grouped = useMemo(
    () =>
      NEWSLETTER_CATEGORIES.map((category) => {
        const issues = NEWSLETTERS.filter((issue) => issue.category === category.id).sort(newestFirst);
        const first = issues[issues.length - 1]?.year;
        const last = issues[0]?.year;
        return { ...category, issues, range: first === last ? `${first}` : `${first}–${last}` };
      }).filter((category) => category.issues.length > 0),
    [],
  );

  const visible = activeCategory === 'all'
    ? grouped
    : grouped.filter((category) => category.id === activeCategory);

  return (
    <div>
      <SEO
        title="Newsletters"
        description="Browse past Hawaii's Plantation Village newsletters — monthly and seasonal issues plus holiday and festival editions."
      />
      <PageHeaderParallax
        image={SITE_PHOTOS.headers.about}
        stamp="Collections · Newsletters"
        title="News from the village, issue by issue."
        subtitle="Decades of village news, festivals, volunteers and programs — open any issue to read the full PDF."
      />

      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{NEWSLETTERS.length} issues</p>
            <h2 className="editorial-title">The newsletter archive</h2>
            <p className="editorial-lede">
              Each issue opens in a new tab so you can read, zoom or download it.
            </p>
          </Reveal>

          <div className="archive-filters">
            {[{ id: 'all', name: 'All newsletters', issues: NEWSLETTERS }, ...grouped].map((option) => (
              <button
                key={option.id}
                type="button"
                className="archive-filter"
                aria-pressed={activeCategory === option.id}
                onClick={() => setActiveCategory(option.id)}
              >
                {option.name} ({option.issues.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {visible.map((category, index) => (
        <section
          key={category.id}
          className={`editorial-section${index % 2 === 0 ? ' on-sand' : ''}`}
          aria-labelledby={`newsletters-${category.id}`}
        >
          <div className="editorial-shell">
            <Reveal>
              <p className="editorial-eyebrow">
                {category.range} · {category.issues.length} {category.issues.length === 1 ? 'issue' : 'issues'}
              </p>
              <h2 id={`newsletters-${category.id}`} className="editorial-title">{category.name}</h2>
              <p className="editorial-lede">{category.blurb}</p>
            </Reveal>

            <ul className="newsletter-grid">
              {category.issues.map((issue) => (
                <li key={issue.href}>
                  <a
                    className="newsletter-card"
                    href={issue.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${issue.title}${issue.note ? ` — ${issue.note}` : ''} (PDF, opens in a new tab)`}
                  >
                    <span className="newsletter-icon" aria-hidden="true">
                      <FileText size={22} />
                    </span>
                    <span className="newsletter-body">
                      <span className="archive-card-meta">PDF</span>
                      <span className="archive-card-title">{issue.title}</span>
                      {issue.note && <span className="door-note">{issue.note}</span>}
                    </span>
                    <ArrowUpRight size={18} className="newsletter-arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
