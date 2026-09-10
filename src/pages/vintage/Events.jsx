import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import EventsCalendar from '../../components/EventsCalendar.jsx';
import SEO from '../../components/SEO.jsx';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { usePageSection, usePageListSection } from '../../context/ContentProvider.jsx';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import { formatEventDateRangeLabel, toEventDate } from '../../lib/timeFormat.js';

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

export default function Events() {
  const setActivePage = useAppNavigate();
  const { section: header } = usePageSection('events', 'header', {});
  const { section: intro } = usePageSection('events', 'intro', {});
  // Single source of truth: the same `home.events` list the admin edits in the
  // Upcoming Events panel and the homepage strip renders.
  const { items: events } = usePageListSection('home', 'events');

  /** Only events with a resolvable date can be placed on the calendar. */
  const datedEvents = useMemo(() => events.filter((event) => toEventDate(event)), [events]);

  return (
    <div>
      <SEO
        title="Events"
        description="Music, food, dance, storytelling and community celebrations throughout the year at Hawaii's Plantation Village."
      />
      <PageHeaderParallax
        image={SITE_PHOTOS.headers.events}
        stamp={header?.stamp ?? 'Events at the Village'}
        title={header?.title ?? 'Come explore our culture with us.'}
        subtitle={header?.subtitle}
      />

      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            {(intro?.paragraphs ?? []).map((paragraph, index) => (
              <p key={index} className="editorial-lede">{paragraph}</p>
            ))}
          </Reveal>

          {events.length > 0 ? (
            <div style={{ marginTop: '2.5rem', borderBottom: '1px solid var(--hairline)' }}>
              {events.map((event, index) => (
                <div key={event.slug ?? index} className="event-row">
                  <span className="event-date">
                    {formatEventDateRangeLabel(event)}{event.time ? ` · ${event.time}` : ''}
                  </span>
                  <div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-note">{event.desc}</p>
                    <button
                      className="footer-link-btn"
                      style={styles.eventLink}
                      onClick={() => setActivePage('tickets')}
                    >
                      {event.ctaLabel ?? 'Learn More'} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="editorial-lede" style={{ marginTop: '2rem' }}>
              No events are scheduled right now. Check back soon — or plan a visit any Tuesday
              through Saturday.
            </p>
          )}

          <div style={styles.actions}>
            <button className="btn-primary" onClick={() => setActivePage(intro?.cta?.page ?? 'visit')}>
              {intro?.cta?.label ?? 'Plan Your Visit'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {datedEvents.length > 0 && (
        <section className="editorial-section on-sand">
          <div className="editorial-shell">
            <Reveal>
              <p className="editorial-eyebrow">Calendar</p>
              <h2 className="editorial-title">Find a date that works for you.</h2>
            </Reveal>
            <div style={{ marginTop: '2rem' }}>
              <EventsCalendar events={datedEvents} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const styles = {
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '2rem',
  },
  eventLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--terracotta-clay-deep)',
    padding: 0,
    marginTop: '0.6rem',
  },
};
