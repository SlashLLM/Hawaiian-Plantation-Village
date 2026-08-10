import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroStage from '../../components/HeroStage';
import BellToBell from '../../components/BellToBell';
import { ArrowRight, Mail } from 'lucide-react';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { useSiteSettings, usePageSection, usePageListSection } from '../../context/ContentProvider.jsx';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import SEO from '../../components/SEO.jsx';

const DEFAULT_CULTURES = [
  { name: 'Hawaiian', note: 'The land and people before the cane' },
  { name: 'Chinese', note: 'Contract labor roots and community life' },
  { name: 'Japanese', note: 'Home life, celebrations, and tradition' },
  { name: 'Filipino', note: 'Families, work culture, and gatherings' },
  { name: 'Korean', note: 'A cultural celebration in the home' },
  { name: 'Okinawan', note: 'Community memory in the camp' },
  { name: 'Portuguese', note: 'Home, garden, and festa traditions' },
  { name: 'Puerto Rican', note: 'Preparing for Christmas Eve' },
];

const DEFAULT_DOORS = [
  { title: 'Tickets & hours', note: 'Self-guided and docent-led, Tuesday to Saturday.', page: 'tickets' },
  { title: 'Group tours', note: 'Motorcoach, custom rates, and private group scheduling.', page: 'visit' },
  { title: 'Schools', note: 'Student tours through furnished homes and gardens.', page: 'learn' },
  { title: 'Accessibility', note: 'Paved paths, ADA restrooms, and quieter sensory hours.', page: 'visit' },
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
  const { section: eventsHeader } = usePageSection('home', 'eventsHeader', {});
  const { section: planVisit } = usePageSection('home', 'planVisit', {});
  const { section: testimonialsHeader } = usePageSection('home', 'testimonialsHeader', {});
  const { items: events } = usePageListSection('home', 'events');
  const { items: testimonials } = usePageListSection('home', 'testimonials');
  const { items: partners } = usePageListSection('home', 'partners');
  const footer = settings?.footer ?? {};
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
      <SEO title="Home" description="Walk the camp houses where eight immigrant communities built a life together — and still gather today." />
      <HeroStage hero={settings?.hero} onPrimaryClick={handlePlanVisit} />

      {/* Eight cultures, one village */}
      <section className="editorial-section">
        <div className="editorial-shell">
          <Reveal>
            <p className="editorial-eyebrow">{cultures?.eyebrow ?? 'Ethnic homes and gardens'}</p>
            <h2 className="editorial-title">
              {cultures?.title ?? 'Each group furnished a home to tell its story'}
            </h2>
            <p className="editorial-lede">
              {cultures?.description ??
                'Ethnic historical groups planned the exhibits: furnishings, thematic celebrations, and gardens with plants specific to their culture. School and visitor tours walk these homes throughout the year.'}
            </p>
          </Reveal>

          <div className="mosaic-grid">
            {cultureTiles.map((culture) => (
              <button
                key={culture.name}
                type="button"
                className="mosaic-tile"
                onClick={() => goTo('stories')}
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
              <h2 className="editorial-title">{whyVisit?.title ?? 'A place to share the laborers\u2019 story'}</h2>
              {(whyVisit?.paragraphs ?? []).map((paragraph, index) => (
                <p key={index} style={styles.body}>{paragraph}</p>
              ))}
              <div style={styles.actions}>
                <button className="btn-primary" onClick={() => goTo(whyVisit?.primaryCta?.page ?? 'about')}>
                  {whyVisit?.primaryCta?.label ?? 'Read our story'}
                </button>
                <button className="btn-secondary" onClick={() => goTo(whyVisit?.secondaryCta?.page ?? 'visit')}>
                  {whyVisit?.secondaryCta?.label ?? 'Plan your visit'}
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
                {featuredBango?.title ?? 'Orientation, galleries, and the archives'}
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
                  {featuredBango?.cta?.label ?? 'Explore the photograph archives'} <ArrowRight size={16} />
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
            <p className="editorial-eyebrow">{bellToBell?.stamp ?? 'Interactive'}</p>
            <h2 className="editorial-title">{bellToBell?.title ?? 'Step into their shoes'}</h2>
            <p className="editorial-lede">
              {bellToBell?.description ??
                'Live one day on the plantation. The morning whistle, the cane rows, and the camp at sunset.'}
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
            <p className="editorial-eyebrow">{eventsHeader?.stamp ?? 'Free village events'}</p>
            <h2 className="editorial-title">{eventsHeader?.title ?? 'Festivals the community is invited to'}</h2>
          </Reveal>
          <div style={{ marginTop: '2.5rem', borderBottom: '1px solid var(--hairline)' }}>
            {events.map((event, index) => (
              <div key={event.slug ?? index} className="event-row">
                <span className="event-date">{event.date}{event.time ? ` · ${event.time}` : ''}</span>
                <div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-note">{event.desc}</p>
                </div>
              </div>
            ))}
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
              <p className="editorial-eyebrow">{educators?.stamp ?? 'For educators'}</p>
              <h2 className="editorial-title">{educators?.title ?? 'Curriculum and field trips'}</h2>
              {(educators?.paragraphs ?? []).map((paragraph, index) => (
                <p key={index} style={styles.body}>{paragraph}</p>
              ))}
              <div style={styles.actions}>
                <button className="btn-primary" onClick={() => goTo(educators?.cta?.page ?? 'learn')}>
                  {educators?.cta?.label ?? 'Bring a class'} <ArrowRight size={16} />
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
            <p className="editorial-eyebrow">{getInvolved?.stamp ?? 'Get involved'}</p>
            <h2 className="editorial-title">
              {getInvolved?.title ?? 'Keep these houses standing'}
            </h2>
            <p className="editorial-lede">{getInvolved?.intro ?? getInvolved?.description}</p>
          </Reveal>

          <div style={styles.supportGrid}>
            <Reveal style={styles.supportColumn}>
              <h3 style={styles.supportTitle}>{getInvolved?.donation?.title ?? 'Give directly'}</h3>
              <p style={styles.supportNote}>{getInvolved?.donation?.description}</p>
              <ul style={styles.supportList}>
                {donationPresets.map((preset) => (
                  <li key={preset.amount}>
                    <strong>${preset.amount}</strong> {preset.label.replace(/^\$\d+\s*/, '')}
                  </li>
                ))}
              </ul>
              <button className="btn-clay" onClick={() => goTo('support')} style={styles.supportBtn}>
                Make a gift
              </button>
            </Reveal>

            <Reveal style={styles.supportColumn}>
              <h3 style={styles.supportTitle}>{getInvolved?.membership?.title ?? 'Become a steward'}</h3>
              <p style={styles.supportNote}>{getInvolved?.membership?.description}</p>
              <ul style={styles.supportList}>
                {(getInvolved?.membership?.benefits ?? getInvolved?.membership?.items ?? []).map((benefit, index) => (
                  <li key={index}><strong>{benefit.label}</strong> {benefit.text}</li>
                ))}
              </ul>
              <button className="btn-secondary" onClick={() => goTo('support')} style={styles.supportBtn}>
                See membership
              </button>
            </Reveal>
          </div>
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
            <h2 className="editorial-title">{planVisit?.title ?? 'Walk in. Sit down. Stay a while.'}</h2>
            <p className="editorial-lede">
              {planVisit?.description ??
                `${quickVisit?.hours?.primary ?? settings?.hours?.schedule} · ${contact?.address?.line1 ?? ''}, ${contact?.address?.line2 ?? ''}`}
            </p>
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

      <footer style={styles.footer}>
        <div className="editorial-shell">
          <div style={styles.footerGrid}>
            <div>
              <h3 style={styles.footerBrand}>{footer.brand ?? settings?.brand?.title}</h3>
              <p style={styles.footerText}>{footer.text}</p>
              <p style={styles.footerContact}>
                {contact.phone}
                <br />
                {contact.email}
              </p>
            </div>

            <div>
              <h4 style={styles.footerHeader}>Go to</h4>
              <ul style={styles.footerLinks}>
                {(footer.ctaLinks ?? []).map((link) => (
                  <li key={link.label}>
                    <button className="footer-link-btn" onClick={() => goTo(link.page)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={styles.footerHeader}>{footer.newsletter?.heading}</h4>
              <p style={styles.footerText}>{footer.newsletter?.description}</p>
              <form
                style={styles.newsletterForm}
                onSubmit={(event) => event.preventDefault()}
              >
                <label htmlFor="newsletter-email" style={styles.srOnly}>Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder={footer.newsletter?.placeholder}
                  style={styles.newsletterInput}
                />
                <button className="btn-accent" type="submit">
                  <Mail size={16} /> {footer.newsletter?.buttonLabel ?? 'Join'}
                </button>
              </form>
            </div>
          </div>

          <p style={styles.footerBottom}>{footer.copyright}</p>
        </div>
      </footer>
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
  footer: {
    backgroundColor: 'var(--plantation-ink)',
    color: 'rgba(250, 246, 236, 0.72)',
    paddingBlock: 'clamp(3rem, 6vw, 5rem) 2rem',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
    gap: 'clamp(2rem, 5vw, 3.5rem)',
    marginBottom: '3rem',
  },
  footerBrand: {
    fontSize: '1.6rem',
    fontWeight: 500,
    color: 'var(--sugarcane-cream)',
    margin: '0 0 1rem',
  },
  footerText: {
    fontSize: '0.95rem',
    lineHeight: 1.65,
    marginBottom: '1.25rem',
    maxWidth: '44ch',
  },
  footerContact: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'var(--sugarcane-cream)',
    margin: 0,
  },
  footerHeader: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--heritage-gold)',
    margin: '0 0 1rem',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  newsletterForm: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    maxWidth: '420px',
  },
  newsletterInput: {
    flex: '1 1 200px',
    padding: '0.75rem 1rem',
    border: '1px solid var(--hairline-invert)',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'rgba(250, 246, 236, 0.06)',
    color: 'var(--sugarcane-cream)',
    fontSize: '0.95rem',
    outline: 'none',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap',
  },
  footerBottom: {
    borderTop: '1px solid var(--hairline-invert)',
    paddingTop: '1.5rem',
    fontSize: '0.85rem',
    color: 'rgba(250, 246, 236, 0.5)',
    margin: 0,
  },
};
