import React, { useRef } from 'react';
import HeroVideoPixi from '../../components/HeroVideoPixi';
import BellToBell from '../../components/BellToBell';
import sugarcaneField from '../../assets/sugarcane_field.png';
import campHouse from '../../assets/historic_camp_house.png';
import bangoImage from '../../assets/bango_lunch_tin.png';
import { Calendar, Clock, MapPin, Info, ArrowRight, UserPlus, Mail, Heart } from 'lucide-react';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { useSiteSettings, usePageSection, useContentCollection } from '../../context/ContentProvider.jsx';

export default function Home() {
  const setActivePage = useAppNavigate();
  const visitRef = useRef(null);
  const { settings } = useSiteSettings();
  const { section: quickVisit } = usePageSection('home', 'quickVisit', {});
  const { section: whyVisit } = usePageSection('home', 'whyVisit', {});
  const { section: featuredBango } = usePageSection('home', 'featuredBango', {});
  const { section: bellToBell } = usePageSection('home', 'bellToBell', {});
  const { section: educators } = usePageSection('home', 'educators', {});
  const { section: getInvolved } = usePageSection('home', 'getInvolved', {});
  const { section: eventsHeader } = usePageSection('home', 'eventsHeader', {});
  const { section: testimonialsHeader } = usePageSection('home', 'testimonialsHeader', {});
  const { items: events } = useContentCollection('program');
  const { items: testimonials } = useContentCollection('testimonial');
  const { items: partners } = useContentCollection('partner');
  const footer = settings?.footer ?? {};
  const contact = settings?.contact ?? {};
  const donationPresets = settings?.donationPresets ?? [];

  const handleExplore = () => {
    visitRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookTickets = () => {
    setActivePage('tickets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. Hero Video Pixi */}
      <HeroVideoPixi hero={settings?.hero} onExploreClick={handleExplore} />

      {/* 2. Quick Visit-Planning Module */}
      <div ref={visitRef} style={styles.quickVisitSection}>
        <div style={styles.container}>
          <div style={styles.quickGrid}>
            <div style={styles.quickItem}>
              <Clock size={20} color="var(--tin-rust)" />
              <div>
                <h4 style={styles.quickTitle}>{quickVisit?.hours?.title ?? 'HOURS OF OPERATION'}</h4>
                <p style={styles.quickText}>{quickVisit?.hours?.primary ?? settings?.hours?.schedule}</p>
                <p style={styles.quickSubtext}>{quickVisit?.hours?.secondary ?? settings?.hours?.toursNote}</p>
              </div>
            </div>

            <div style={styles.quickItem}>
              <MapPin size={20} color="var(--tin-rust)" />
              <div>
                <h4 style={styles.quickTitle}>{quickVisit?.location?.title ?? 'LOCATION'}</h4>
                <p style={styles.quickText}>{quickVisit?.location?.primary ?? contact?.address?.line1}</p>
                <p style={styles.quickSubtext}>{quickVisit?.location?.secondary ?? contact?.address?.line2}</p>
              </div>
            </div>

            <div style={styles.quickItem}>
              <Info size={20} color="var(--tin-rust)" />
              <div>
                <h4 style={styles.quickTitle}>{quickVisit?.admission?.title ?? 'ADMISSION'}</h4>
                <p style={styles.quickText}>{quickVisit?.admission?.primary}</p>
                <p style={styles.quickSubtext}>{quickVisit?.admission?.secondary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "Why Visit" - Experiential Storytelling */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.twoColumnGrid}>
            <div style={styles.textCol}>
              <span className={`ink-stamp ${whyVisit?.stampClass ?? 'green'}`} style={{ marginBottom: '1rem' }}>{whyVisit?.stamp ?? 'Living Museum'}</span>
              <h2 style={styles.sectionTitle}>{whyVisit?.title ?? 'Where Hawaiʻi\'s Roots Run Deep'}</h2>
              {(whyVisit?.paragraphs ?? []).map((p, i) => (
                <p key={i} style={styles.bodyText}>{p}</p>
              ))}
              <div style={styles.btnRow}>
                <button className="btn-primary" onClick={() => setActivePage(whyVisit?.primaryCta?.page ?? 'about')}>
                  {whyVisit?.primaryCta?.label ?? 'Discover Our History'}
                </button>
                <button className="btn-secondary" onClick={() => setActivePage(whyVisit?.secondaryCta?.page ?? 'visit')}>
                  {whyVisit?.secondaryCta?.label ?? 'Plan Your Visit'}
                </button>
              </div>
            </div>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={campHouse} alt="Historic Camp Houses at the Village" style={styles.featuredImg} />
                <div style={styles.imgTextureOverlay} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Story - The Bango System */}
      <section style={{ ...styles.section, backgroundColor: 'var(--paper-dark)', borderTop: '1px solid var(--kraft-tan-dark)', borderBottom: '1px solid var(--kraft-tan-dark)' }}>
        <div style={styles.container}>
          <div style={{ ...styles.twoColumnGrid, gridTemplateColumns: '1fr 1.2fr' }}>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={bangoImage} alt="Historic Bango Identification Tags" style={styles.featuredImg} />
                <div style={styles.imgTextureOverlay} />
              </div>
            </div>
            <div style={styles.textCol}>
              <span className={`ink-stamp ${featuredBango?.stampClass ?? 'rust'}`} style={{ marginBottom: '1rem' }}>{featuredBango?.stamp ?? 'Featured Narrative'}</span>
              <h2 style={styles.sectionTitle}>{featuredBango?.title ?? 'The Bango System: Numbers Replacing Names'}</h2>
              {(featuredBango?.paragraphs ?? []).map((p, i) => (
                <p key={i} style={styles.bodyText} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              {featuredBango?.quote && (
                <blockquote style={styles.bangoQuote}>
                  {typeof featuredBango.quote === 'string' ? featuredBango.quote : featuredBango.quote.text}
                  <cite style={styles.bangoQuoteCite}>
                    {typeof featuredBango.quote === 'string' ? featuredBango.quoteCite : featuredBango.quote.cite}
                  </cite>
                </blockquote>
              )}
              <div style={styles.btnRow}>
                <button className="btn-primary" onClick={() => { setActivePage(featuredBango?.cta?.page ?? 'stories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {featuredBango?.cta?.label ?? 'Explore Camp Stories'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Bell to Bell" Choice-based Game */}
      <section style={{ ...styles.section, backgroundColor: 'var(--paper-dark)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className={`ink-stamp ${bellToBell?.stampClass ?? 'rust'}`} style={{ marginBottom: '1rem' }}>{bellToBell?.stamp ?? 'Interactive Log'}</span>
            <h2 style={styles.sectionTitle}>{bellToBell?.title ?? 'Step Into Their Shoes'}</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              {bellToBell?.description ?? 'Simulate one day on the plantation. Hear the morning whistle, complete tasks in the cane rows, and gather in the community camp at sunset.'}
            </p>
          </div>
          <BellToBell onVisitClick={handleBookTickets} />
        </div>
      </section>

      {/* 5. School and Educator Callout */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={{ ...styles.twoColumnGrid, gridTemplateColumns: '1fr 1.2fr' }}>
            <div style={styles.imgCol}>
              <div style={styles.imgWrapper}>
                <img src={sugarcaneField} alt="Sugarcane fields in Waipahu" style={styles.featuredImg} />
                <div style={styles.imgTextureOverlay} />
              </div>
            </div>
            <div style={styles.textCol}>
              <span className={`ink-stamp ${educators?.stampClass ?? 'teal'}`} style={{ marginBottom: '1rem' }}>{educators?.stamp ?? 'For Educators'}</span>
              <h2 style={styles.sectionTitle}>{educators?.title ?? 'Curriculum & Field Trips'}</h2>
              {(educators?.paragraphs ?? []).map((p, i) => (
                <p key={i} style={styles.bodyText}>{p}</p>
              ))}
              <div style={styles.btnRow}>
                <button className="btn-primary" onClick={() => setActivePage(educators?.cta?.page ?? 'learn')}>
                  {educators?.cta?.label ?? 'Schedule a Field Trip'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Membership & Donation Split Section */}
      <section style={{ ...styles.section, borderTop: '1px solid var(--kraft-tan-dark)', borderBottom: '1px solid var(--kraft-tan-dark)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className={`ink-stamp ${getInvolved?.stampClass ?? 'green'}`} style={{ marginBottom: '1rem' }}>{getInvolved?.stamp ?? 'Get Involved'}</span>
            <h2 style={styles.sectionTitle}>{getInvolved?.title ?? 'Support the Preservation of Waipahu\'s History'}</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              {getInvolved?.intro ?? getInvolved?.description}
            </p>
          </div>
          
          <div style={styles.splitGrid}>
            {/* Donation Card */}
            <div className="paper-card" style={styles.splitCard}>
              <div>
                <h3 style={styles.splitCardTitle}>{getInvolved?.donation?.title ?? 'Direct Donation Impact'}</h3>
                <p style={styles.splitCardDesc}>{getInvolved?.donation?.description}</p>
                <ul style={styles.splitList}>
                  {donationPresets.map((d) => (
                    <li key={d.amount}><strong>${d.amount}</strong> {d.label.replace(/^\$\d+\s*/, '')}</li>
                  ))}
                </ul>
              </div>
              <button className="btn-primary" onClick={() => { setActivePage('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={styles.splitBtn}>
                Make a Direct Gift <Heart size={14} style={{ marginLeft: '4px' }} />
              </button>
            </div>

            {/* Membership Card */}
            <div className="paper-card" style={styles.splitCard}>
              <div>
                <h3 style={styles.splitCardTitle}>{getInvolved?.membership?.title ?? 'Steward Membership'}</h3>
                <p style={styles.splitCardDesc}>{getInvolved?.membership?.description}</p>
                <ul style={styles.splitList}>
                  {(getInvolved?.membership?.benefits ?? getInvolved?.membership?.items ?? []).map((b, i) => (
                    <li key={i}><strong>{b.label}</strong> {b.text}</li>
                  ))}
                </ul>
              </div>
              <button className="btn-accent" onClick={() => { setActivePage('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={styles.splitBtn}>
                Join as a Member <UserPlus size={14} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events */}
      <section style={{ ...styles.section, backgroundColor: 'var(--paper-dark)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className={`ink-stamp ${eventsHeader?.stampClass ?? 'gold'}`} style={{ marginBottom: '1rem' }}>{eventsHeader?.stamp ?? 'Calendar'}</span>
            <h2 style={styles.sectionTitle}>{eventsHeader?.title ?? 'Upcoming Community Programs'}</h2>
          </div>
          
          <div style={styles.eventsGrid}>
            {events.map((ev, idx) => (
              <div key={idx} className="paper-card" style={styles.eventCard}>
                <div style={styles.eventDateBlock}>
                  <Calendar size={18} color="var(--tin-rust)" />
                  <span style={styles.eventDateText}>{ev.date}</span>
                </div>
                <div style={styles.eventBody}>
                  <h3 style={styles.eventTitle}>{ev.title}</h3>
                  <span style={styles.eventTime}>{ev.time}</span>
                  <p style={styles.eventDesc}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials & Social Proof Section */}
      <section style={{ ...styles.section, backgroundColor: 'var(--paper-dark)', borderTop: '1px solid var(--kraft-tan-dark)', borderBottom: '4px solid var(--koa-wood)' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className={`ink-stamp ${testimonialsHeader?.stampClass ?? 'rust'}`} style={{ marginBottom: '1rem' }}>{testimonialsHeader?.stamp ?? 'Testimonials'}</span>
            <h2 style={styles.sectionTitle}>{testimonialsHeader?.title ?? 'What Visitors & Educators Say'}</h2>
            <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
              {testimonialsHeader?.description ?? 'Hear from our community of school teachers, local residents, and travelers who have experienced the living history.'}
            </p>
          </div>

          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, idx) => (
              <div key={idx} className="paper-card" style={styles.testimonialCard}>
                <p style={styles.testimonialText}>"{t.quote}"</p>
                <div style={styles.testimonialDivider} />
                <div style={styles.testimonialAuthor}>
                  <span style={styles.testimonialAuthorName}>{t.authorName}</span>
                  <span style={styles.testimonialAuthorMeta}>{t.authorMeta}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.partnersRow}>
            <span style={styles.partnersLabel}>COMMUNITY PARTNERS & STANDARDS:</span>
            <div style={styles.partnersList}>
              {partners.map((p, i) => (
                <React.Fragment key={p.slug ?? p.name ?? i}>
                  {i > 0 && <span style={styles.partnerDivider}>•</span>}
                  <span style={styles.partnerItem}>{typeof p === 'string' ? p : (p.name ?? p.title)}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer CTA Zone */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <h3 style={styles.footerBrand}>{footer.brand ?? settings?.brand?.title}</h3>
              <p style={styles.footerText}>{footer.text}</p>
              <p style={styles.footerContact}>
                Phone: {contact.phone} <br />
                Email: {contact.email}
              </p>
            </div>
            
            <div style={styles.footerCTAColumn}>
              <h4 style={styles.footerHeader}>CTA INDEX</h4>
              <ul style={styles.footerLinksList}>
                {(footer.ctaLinks ?? []).map((link) => (
                  <li key={link.label}>
                    <button className="footer-link-btn" onClick={() => { setActivePage(link.page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={styles.newsletterBox}>
              <h4 style={styles.footerHeader}>{footer.newsletter?.heading}</h4>
              <p style={styles.footerText}>{footer.newsletter?.description}</p>
              <div style={styles.emailForm}>
                <input type="email" placeholder={footer.newsletter?.placeholder} style={styles.emailInput} />
                <button className="btn-primary" style={styles.emailBtn}>
                  <Mail size={16} /> {footer.newsletter?.buttonLabel ?? 'Join'}
                </button>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p>{footer.copyright}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  quickVisitSection: {
    backgroundColor: 'var(--koa-wood)',
    borderBottom: '4px solid var(--sugar-gold)',
    color: 'var(--kraft-tan)',
    padding: '1.5rem 0'
  },
  quickGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1.5rem'
    }
  },
  quickItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flex: '1',
    minWidth: '240px'
  },
  quickTitle: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    color: 'var(--sugar-gold)',
    marginBottom: '4px'
  },
  quickText: {
    fontSize: '0.95rem',
    color: 'var(--paper-light)',
    marginBottom: '2px',
    fontWeight: '600'
  },
  quickSubtext: {
    fontSize: '0.8rem',
    color: 'var(--kraft-tan-dark)'
  },
  section: {
    padding: '5rem 0',
    overflow: 'hidden'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 850px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1.5rem',
    lineHeight: '1.15'
  },
  bodyText: {
    fontSize: '1.05rem',
    color: 'var(--text-dark)',
    marginBottom: '1.25rem'
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '1.5rem'
  },
  imgCol: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  imgWrapper: {
    position: 'relative',
    borderRadius: '4px',
    border: '3px solid var(--koa-wood)',
    padding: '6px',
    backgroundColor: 'var(--paper-light)',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '480px'
  },
  featuredImg: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    display: 'block'
  },
  imgTextureOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
    pointerEvents: 'none'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  eventCard: {
    padding: '1.75rem',
    borderRadius: '4px',
    display: 'flex',
    gap: '1.5rem',
    '@media (max-width: 500px)': {
      flexDirection: 'column',
      gap: '1rem'
    }
  },
  eventDateBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed var(--kraft-tan-dark)',
    backgroundColor: 'var(--paper-dark)',
    width: '90px',
    height: '90px',
    flexShrink: 0
  },
  eventDateText: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    marginTop: '6px'
  },
  eventBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  eventTitle: {
    fontSize: '1.3rem',
    color: 'var(--koa-wood)',
    marginBottom: '4px'
  },
  eventTime: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '10px'
  },
  eventDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    lineHeight: '1.5'
  },
  footer: {
    backgroundColor: 'var(--koa-wood-dark)',
    color: 'var(--kraft-tan)',
    padding: '4rem 0 2rem 0',
    borderTop: '5px solid var(--cane-green)'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1.2fr',
    gap: '3rem',
    marginBottom: '3rem',
    '@media (max-width: 850px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  footerBrand: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    color: 'var(--paper-light)',
    marginBottom: '1rem'
  },
  footerText: {
    fontSize: '0.9rem',
    color: 'var(--kraft-tan-dark)',
    marginBottom: '1.5rem',
    maxWidth: '500px'
  },
  footerContact: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    lineHeight: '1.6',
    color: 'var(--kraft-tan)'
  },
  footerCTAColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  footerLinksList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  footerLinkBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--kraft-tan-dark)',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'left',
    padding: 0,
    textTransform: 'uppercase',
    transition: 'color 0.2s ease'
  },
  newsletterBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  footerHeader: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    color: 'var(--sugar-gold)',
    marginBottom: '1rem'
  },
  emailForm: {
    display: 'flex',
    width: '100%',
    maxWidth: '420px',
    gap: '8px'
  },
  emailInput: {
    flex: '1',
    padding: '0.75rem 1rem',
    border: '1px solid var(--koa-wood)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'var(--paper-light)',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-sans)'
  },
  emailBtn: {
    padding: '0.75rem 1.25rem'
  },
  footerBottom: {
    borderTop: '1px solid rgba(204, 180, 149, 0.1)',
    paddingTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: 'var(--kraft-tan-dark)'
  },
  bangoQuote: {
    fontFamily: 'var(--font-body)',
    fontStyle: 'italic',
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    borderLeft: '3px solid var(--sugar-gold)',
    paddingLeft: '1rem',
    margin: '1.5rem 0',
    lineHeight: '1.6'
  },
  bangoQuoteCite: {
    display: 'block',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-typewriter)',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    marginTop: '0.5rem',
    fontStyle: 'normal'
  },
  splitGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1.5rem'
    }
  },
  splitCard: {
    padding: '2.5rem 2rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  splitCardTitle: {
    fontSize: '1.5rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1rem',
    fontFamily: 'var(--font-display)',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '0.5rem'
  },
  splitCardDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.5rem'
  },
  splitList: {
    listStyleType: 'circle',
    paddingLeft: '1.5rem',
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '2rem'
  },
  splitBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 'auto'
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  testimonialCard: {
    padding: '2rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'var(--paper-light)',
    height: '100%'
  },
  testimonialText: {
    fontFamily: 'var(--font-body)',
    fontStyle: 'italic',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'var(--text-dark)',
    marginBottom: '1.5rem'
  },
  testimonialDivider: {
    borderTop: '1px dashed var(--kraft-tan-dark)',
    margin: '0.75rem 0',
    width: '100%'
  },
  testimonialAuthor: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  testimonialAuthorName: {
    fontFamily: 'var(--font-typewriter)',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: 'var(--koa-wood)'
  },
  testimonialAuthorMeta: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  partnersRow: {
    marginTop: '4rem',
    borderTop: '1px double var(--kraft-tan-dark)',
    paddingTop: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  partnersLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em'
  },
  partnersList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '600'
  },
  partnerItem: {
    whiteSpace: 'nowrap'
  },
  partnerDivider: {
    color: 'var(--sugar-gold)'
  }
};

