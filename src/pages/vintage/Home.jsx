import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroStage from '../../components/HeroStage';
import BellToBell from '../../components/BellToBell';
import { ArrowRight } from 'lucide-react';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { useSiteSettings, usePageSection, usePageListSection } from '../../context/ContentProvider.jsx';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import SEO from '../../components/SEO.jsx';
import { formatEventDateRangeLabel } from '../../lib/timeFormat.js';
import { cultureSlug } from '../../lib/cultures.js';

const DEFAULT_CULTURES = [
  { name: 'Hawaiian', note: 'The land, her people and the world before sugar' },
  { name: 'Chinese', note: 'Migration, family and community' },
  { name: 'Japanese', note: 'Home, work, faith and tradition' },
  { name: 'Filipino', note: 'Sakada journeys, family and resilience' },
  { name: 'Korean', note: 'Migration, community and cultural tradition' },
  { name: 'Okinawan', note: 'Identity, memory and community' },
  { name: 'Portuguese', note: 'Family, food, faith and celebration' },
  { name: 'Puerto Rican', note: 'Home, tradition and island connections' },
];

const DEFAULT_DOORS = [
  { title: 'Tickets & Hours', note: 'Everything you need to plan your day.', page: 'tickets' },
  { title: 'Group Visits', note: 'Tours for community groups, organizations and travel partners.', page: 'visit' },
  { title: 'School Visits', note: 'Bring Hawaiʻi\'s history beyond the classroom.', page: 'learn' },
  { title: 'Accessibility', note: 'Information to help everyone feel welcome at the Village.', page: 'visit' },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

const still = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

function Reveal({ children, className, style }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={shouldReduceMotion ? still : reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const setActivePage = useAppNavigate();
  const visitRef = useRef(null);
  const { settings } = useSiteSettings();
  const { section: quickVisit } = usePageSection('home', 'quickVisit', {});
  const { section: whyVisit } = usePageSection('home', 'whyVisit', {});
  const { section: featuredBango } = usePageSection('home', 'featuredBango', {});
  const { section: bellToBell } = usePageSection('home', 'bellToBell', {});
  const { section: cultures } = usePageSection('home', 'cultures', {});
  const { section: educators } = usePageSection('home', 'educators', {});
  const { section: getInvolved } = usePageSection('home', 'getInvolved', {});
  const { section: volunteer } = usePageSection('home', 'volunteer', {});
  const { section: eventsHeader } = usePageSection('home', 'eventsHeader', {});
  const { section: planVisit } = usePageSection('home', 'planVisit', {});
  const { section: testimonialsHeader } = usePageSection('home', 'testimonialsHeader', {});
  const { items: events } = usePageListSection('home', 'events');
  const { items: testimonials } = usePageListSection('home', 'testimonials');
  const { items: partners } = usePageListSection('home', 'partners');
  const contact = settings?.contact ?? {};
  const donationPresets = settings?.donationPresets ?? [];
  const cultureTiles = cultures?.items?.length ? cultures.items : DEFAULT_CULTURES;
  const doors = planVisit?.items?.length ? planVisit.items : DEFAULT_DOORS;

  const goTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanVisit = () => {
    visitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <SEO
        title="A Living Museum in Waipahu"
        description="Come understand how Hawaiʻi became Hawaiʻi. Step inside the homes, gardens and cultural traditions of the people who lived and worked in Hawaiʻi's plantation communities."
      />
      <HeroStage hero={settings?.hero} onPrimaryClick={handlePlanVisit} />

      {/* Eight cultures, one village */}
      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{cultures?.eyebrow ?? 'Homes, gardens & cultural traditions'}</p>
            <h2 className="editorial-title">
              {cultures?.title ?? 'Many journeys. Different cultures. One shared history.'}
            </h2>
            {(cultures?.paragraphs ?? [cultures?.description]).filter(Boolean).map((paragraph, index) => (
              <p key={index} className="editorial-lede">{paragraph}</p>
            ))}
            {cultures?.closing && <p style={styles.closingLine}>{cultures.closing}</p>}
          </Reveal>

          <div className="mosaic-grid">
            {cultureTiles.map((culture) => (
              <button
                key={culture.name}
                type="button"
                className="mosaic-tile"
                onClick={() => setActivePage('explore-culture', { cultureId: cultureSlug(culture) })}
              >
                <span className="mosaic-name">{culture.name}</span>
                <span className="mosaic-note">{culture.note}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why visit */}
      <section className="editorial-section on-sand">
        <div className="editorial-shell">
          <div style={styles.split}>
            <Reveal>
              <p className="editorial-eyebrow">{whyVisit?.stamp ?? 'The village'}</p>
              <h2 className="editorial-title">{whyVisit?.title ?? 'History has a home here.'}</h2>
              {(whyVisit?.paragraphs ?? []).map((paragraph, index) => (
                <p key={index} style={styles.body}>{paragraph}</p>
              ))}
              <div style={styles.actions}>
                <button className="btn-primary" onClick={() => goTo(whyVisit?.primaryCta?.page ?? 'about')}>
                  {whyVisit?.primaryCta?.label ?? 'Discover Our Story'}
                </button>
                <button className="btn-secondary" onClick={() => goTo(whyVisit?.secondaryCta?.page ?? 'visit')}>
                  {whyVisit?.secondaryCta?.label ?? 'Plan Your Visit'}
                </button>
              </div>
            </Reveal>
            <Reveal>
              <img
                src={SITE_PHOTOS.homeWhyVisit}
                alt="Restored plantation camp houses along the village path"
                style={styles.plate}
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured narrative — Okada Education Center */}
      <section className="editorial-section on-ink">
        <div className="editorial-shell">
          <div style={styles.split}>
            <Reveal>
              <img
                src={SITE_PHOTOS.homeFeatured}
                alt="Village buildings and gardens at Hawaii's Plantation Village"
                style={styles.plate}
                loading="lazy"
              />
            </Reveal>
            <Reveal>
              <p className="editorial-eyebrow">{featuredBango?.stamp ?? 'Okada Education Center'}</p>
              <h2 className="editorial-title">
                {featuredBango?.title ?? 'Where memory becomes history.'}
              </h2>
              {(featuredBango?.paragraphs ?? []).map((paragraph, index) => (
                <p
                  key={index}
                  style={{ ...styles.body, color: 'rgba(250, 246, 236, 0.74)' }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              {featuredBango?.quote && (
                <blockquote style={styles.quote}>
                  {typeof featuredBango.quote === 'string' ? featuredBango.quote : featuredBango.quote.text}
                  <cite style={styles.quoteCite}>
                    {typeof featuredBango.quote === 'string' ? featuredBango.quoteCite : featuredBango.quote.cite}
                  </cite>
                </blockquote>
              )}
              <div style={styles.actions}>
                <button className="btn-accent" onClick={() => goTo(featuredBango?.cta?.page ?? 'archives')}>
                  {featuredBango?.cta?.label ?? 'Explore the Collections'} <ArrowRight size={16} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bell to bell */}
      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{bellToBell?.stamp ?? 'Interactive history'}</p>
            <h2 className="editorial-title">{bellToBell?.title ?? 'A day in plantation life'}</h2>
            <p className="editorial-lede">
              {bellToBell?.description ??
                'The whistle sounds before sunrise. What might an ordinary day have looked like for a plantation worker and family? Follow the rhythms of work, meals and community life through an interactive journey inspired by historical accounts and objects in our collection.'}
            </p>
          </Reveal>
          <div style={{ marginTop: '2.5rem' }}>
            <BellToBell onVisitClick={() => goTo('tickets')} />
          </div>
        </div>
      </section>

      {/* Happening at the village */}
      {events.length > 0 && (
      <section className="editorial-section on-sand">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{eventsHeader?.stamp ?? 'Events at the Village'}</p>
            <h2 className="editorial-title">{eventsHeader?.title ?? 'Come explore our culture with us.'}</h2>
            {eventsHeader?.description && (
              <p className="editorial-lede">{eventsHeader.description}</p>
            )}
          </Reveal>
          <div style={{ marginTop: '2.5rem', borderBottom: '1px solid var(--hairline)' }}>
            {events.map((event, index) => (
              <div key={event.slug ?? index} className="event-row">
                <span className="event-date">{formatEventDateRangeLabel(event)}{event.time ? ` · ${event.time}` : ''}</span>
                <div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-note">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.actions}>
            <button className="btn-primary" onClick={() => goTo(eventsHeader?.cta?.page ?? 'events')}>
              {eventsHeader?.cta?.label ?? 'See All Events'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
      )}

      {/* Educators */}
      <section className="editorial-section">
        <div className="editorial-shell">
          <div style={styles.split}>
            <Reveal>
              <img src={SITE_PHOTOS.homeEducators} alt="Furnished camp house interior for school tours" style={styles.plate} loading="lazy" />
            </Reveal>
            <Reveal>
              <p className="editorial-eyebrow">{educators?.stamp ?? 'For educators & students'}</p>
              <h2 className="editorial-title">
                {educators?.title ?? 'History feels different when you can experience it'}
              </h2>
              {(educators?.paragraphs ?? []).map((paragraph, index) => (
                <p key={index} style={styles.body}>{paragraph}</p>
              ))}
              <div style={styles.actions}>
                <button className="btn-primary" onClick={() => goTo(educators?.cta?.page ?? 'learn')}>
                  {educators?.cta?.label ?? 'Plan a School Visit'} <ArrowRight size={16} />
                </button>
                <button className="btn-secondary" onClick={() => goTo(educators?.secondaryCta?.page ?? 'learn')}>
                  {educators?.secondaryCta?.label ?? 'Educator Resources'}
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Get involved — clay gives */}
      <section className="editorial-section on-sand">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{getInvolved?.stamp ?? 'Help us keep our stories alive'}</p>
            <h2 className="editorial-title">
              {getInvolved?.title ?? 'What we preserve today becomes tomorrow’s legacy.'}
            </h2>
            {(getInvolved?.paragraphs ?? [getInvolved?.intro ?? getInvolved?.description])
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index} className="editorial-lede">{paragraph}</p>
              ))}
          </Reveal>

          <div style={styles.supportGrid}>
            <Reveal style={styles.supportColumn}>
              <h3 style={styles.supportTitle}>{getInvolved?.donation?.title ?? 'Make a gift'}</h3>
              <p style={styles.supportNote}>{getInvolved?.donation?.description}</p>
              <ul style={styles.supportList}>
                {donationPresets.map((preset) => (
                  <li key={preset.amount}>
                    <strong>${preset.amount}</strong> {preset.label.replace(/^\$\d+\s*/, '')}
                  </li>
                ))}
              </ul>
              {getInvolved?.donation?.closing && (
                <p style={styles.supportNote}>{getInvolved.donation.closing}</p>
              )}
              <button
                className="btn-clay"
                onClick={() => goTo(getInvolved?.donation?.cta?.page ?? 'support')}
                style={styles.supportBtn}
              >
                {getInvolved?.donation?.cta?.label ?? 'Donate Today'}
              </button>
            </Reveal>

            <Reveal style={styles.supportColumn}>
              <h3 style={styles.supportTitle}>{getInvolved?.membership?.title ?? 'Belong to the Village.'}</h3>
              <p style={styles.supportNote}>{getInvolved?.membership?.description}</p>
              <ul style={styles.supportList}>
                {(getInvolved?.membership?.benefits ?? getInvolved?.membership?.items ?? []).map((benefit, index) => (
                  <li key={index}><strong>{benefit.label}</strong> {benefit.text}</li>
                ))}
              </ul>
              <button
                className="btn-secondary"
                onClick={() => goTo(getInvolved?.membership?.cta?.page ?? 'support')}
                style={styles.supportBtn}
              >
                {getInvolved?.membership?.cta?.label ?? 'Become a Member'}
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{volunteer?.stamp ?? 'Volunteer'}</p>
            <h2 className="editorial-title">{volunteer?.title ?? 'History needs people – YOU.'}</h2>
            {(volunteer?.paragraphs ?? []).map((paragraph, index) => (
              <p key={index} style={styles.body}>{paragraph}</p>
            ))}
            <div style={styles.actions}>
              <button className="btn-primary" onClick={() => goTo(volunteer?.cta?.page ?? 'volunteer')}>
                {volunteer?.cta?.label ?? 'Volunteer With Us'} <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      {(testimonials.length > 0 || partners.length > 0) && (
      <section className="editorial-section on-ink">
        <div className="editorial-shell">
          {testimonials.length > 0 && (
            <>
              <Reveal>
                <p className="editorial-eyebrow">{testimonialsHeader?.stamp ?? 'From our visitors'}</p>
                <h2 className="editorial-title">{testimonialsHeader?.title ?? 'What people say after they walk it'}</h2>
              </Reveal>

              <div style={styles.quoteGrid}>
                {testimonials.map((testimonial, index) => (
                  <Reveal key={testimonial.slug ?? index}>
                    <blockquote style={styles.testimonial}>
                      {testimonial.quote}
                      <footer style={styles.testimonialMeta}>
                        <span style={styles.testimonialName}>{testimonial.authorName}</span>
                        <span>{testimonial.authorMeta}</span>
                      </footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {partners.length > 0 && (
          <div style={styles.partners}>
            {partners.map((partner, index) => (
              <span key={partner.slug ?? index} style={styles.partner}>
                {typeof partner === 'string' ? partner : (partner.name ?? partner.title)}
              </span>
            ))}
          </div>
          )}
        </div>
      </section>
      )}

      {/* Plan your visit */}
      <section className="editorial-section" ref={visitRef}>
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{planVisit?.eyebrow ?? 'Plan your visit'}</p>
            <h2 className="editorial-title">{planVisit?.title ?? 'Come walk through history with us.'}</h2>
            {(planVisit?.paragraphs ?? [planVisit?.description]).filter(Boolean).map((paragraph, index) => (
              <p key={index} className="editorial-lede">{paragraph}</p>
            ))}
            <ul style={styles.essentials}>
              {(planVisit?.essentials ?? [
                quickVisit?.hours?.primary ?? settings?.hours?.schedule,
                [contact?.address?.line1, contact?.address?.line2].filter(Boolean).join(' · '),
                settings?.hours?.parking,
              ])
                .filter(Boolean)
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ul>
          </Reveal>

          <div className="door-grid">
            {doors.map((door) => (
              <button key={door.title} type="button" className="door" onClick={() => goTo(door.page)}>
                <span className="door-title">{door.title} <ArrowRight size={15} /></span>
                <span className="door-note">{door.note}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

const styles = {
  split: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(2rem, 5vw, 4.5rem)',
    alignItems: 'center',
  },
  body: {
    fontSize: '1.02rem',
    lineHeight: 1.7,
    color: 'var(--muted-sage)',
    maxWidth: '58ch',
    marginBottom: '1.1rem',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1.75rem',
  },
  closingLine: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
    lineHeight: 1.5,
    color: 'var(--plantation-ink)',
    maxWidth: '48ch',
    margin: '1.25rem 0 0',
  },
  essentials: {
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem 1.5rem',
    padding: 0,
    margin: '1.25rem 0 0',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    letterSpacing: '0.04em',
    color: 'var(--muted-sage)',
  },
  plate: {
    width: '100%',
    height: 'clamp(280px, 42vw, 460px)',
    objectFit: 'cover',
    borderRadius: 'var(--border-radius-md)',
    display: 'block',
  },
  quote: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    lineHeight: 1.5,
    color: 'var(--sugarcane-cream)',
    borderLeft: '1px solid var(--heritage-gold)',
    paddingLeft: '1.25rem',
    margin: '1.75rem 0 0',
  },
  quoteCite: {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    fontStyle: 'normal',
    color: 'var(--heritage-gold)',
    marginTop: '0.75rem',
  },
  supportGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(2rem, 5vw, 4rem)',
    marginTop: '3rem',
  },
  supportColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderTop: '1px solid var(--hairline-strong)',
    paddingTop: '1.5rem',
  },
  supportTitle: {
    fontSize: '1.5rem',
    fontWeight: 500,
    margin: '0 0 0.75rem',
  },
  supportNote: {
    color: 'var(--muted-sage)',
    lineHeight: 1.65,
    margin: '0 0 1.25rem',
    maxWidth: '46ch',
  },
  supportList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    fontSize: '0.95rem',
    lineHeight: 1.55,
  },
  supportBtn: {
    marginTop: 'auto',
  },
  quoteGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(2rem, 4vw, 3rem)',
    marginTop: '3rem',
  },
  testimonial: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    lineHeight: 1.55,
    color: 'var(--sugarcane-cream)',
  },
  testimonialMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginTop: '1.25rem',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'rgba(250, 246, 236, 0.6)',
  },
  testimonialName: {
    color: 'var(--heritage-gold)',
    fontWeight: 600,
  },
  partners: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem 2.5rem',
    marginTop: 'clamp(3rem, 6vw, 4.5rem)',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--hairline-invert)',
    fontSize: '0.82rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(250, 246, 236, 0.55)',
  },
  partner: {
    whiteSpace: 'normal',
  },
};
