import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AlertCircle, ArrowRight, Check, ChevronRight } from 'lucide-react';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import SEO from '../../components/SEO.jsx';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { usePageSection, usePageListSection } from '../../context/ContentProvider.jsx';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import { submitInquiry } from '../../lib/api.js';

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

export default function Volunteer() {
  const setActivePage = useAppNavigate();
  const { section: header } = usePageSection('volunteer', 'header', {});
  const { section: intro } = usePageSection('volunteer', 'intro', {});
  const { section: waysSection, items: ways } = usePageListSection('volunteer', 'ways');
  const { section: ctaSection } = usePageSection('volunteer', 'cta', {});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      await submitInquiry({
        type: 'volunteer',
        name,
        email,
        phone,
        interest: interest || (ways[0]?.title ?? ''),
        message,
      });
      confetti({ particleCount: 80, spread: 50, origin: { y: 0.8 } });
      setComplete(true);
    } catch (err) {
      setSubmitError(err.message ?? 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO
        title="Volunteer"
        description="The Village exists because people showed up. Find your place at Hawaii's Plantation Village — tours, gardens, archives, festivals and more."
      />
      <PageHeaderParallax
        image={SITE_PHOTOS.headers.volunteer}
        stamp={header?.stamp ?? 'Volunteer'}
        title={header?.title ?? 'History needs people – YOU.'}
        subtitle={header?.subtitle}
      />

      <section className="editorial-section">
        <div className="editorial-shell">
          <div style={styles.split}>
            <Reveal>
              {(intro?.paragraphs ?? []).map((paragraph, index) => (
                <p key={index} style={styles.body}>{paragraph}</p>
              ))}
              {intro?.closing && <p style={styles.closingLine}>{intro.closing}</p>}
            </Reveal>

            <div style={styles.rightCol}>
              {!complete ? (
                <form className="paper-card sticky-sidebar-form" style={styles.requestCard} onSubmit={handleSubmit}>
                  <h3 style={styles.requestCardTitle}>{ctaSection?.title ?? 'Volunteer With Us'}</h3>
                  <p style={styles.requestCardText}>{ctaSection?.description}</p>

                  <div style={styles.formCol}>
                    <label htmlFor="volunteer-name" style={styles.formLabel}>Your Name</label>
                    <input
                      id="volunteer-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formCol}>
                    <label htmlFor="volunteer-email" style={styles.formLabel}>Email Address</label>
                    <input
                      id="volunteer-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formCol}>
                    <label htmlFor="volunteer-phone" style={styles.formLabel}>Phone (optional)</label>
                    <input
                      id="volunteer-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formCol}>
                    <label htmlFor="volunteer-interest" style={styles.formLabel}>Where would you like to help?</label>
                    <select
                      id="volunteer-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      style={styles.formInput}
                    >
                      {ways.map((way) => (
                        <option key={way.title} value={way.title}>{way.title}</option>
                      ))}
                      <option value="Wherever I am needed">Wherever I am needed</option>
                    </select>
                  </div>

                  <div style={styles.formCol}>
                    <label htmlFor="volunteer-message" style={styles.formLabel}>
                      Tell us a little about yourself
                    </label>
                    <textarea
                      id="volunteer-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ ...styles.formInput, resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  {submitError && (
                    <p role="alert" style={styles.formError}>
                      <AlertCircle size={16} /> {submitError}
                    </p>
                  )}

                  <button type="submit" className="btn-primary" style={styles.submitBtn} disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Volunteer With Us'} <ChevronRight size={16} />
                  </button>
                </form>
              ) : (
                <div className="paper-card animate-fade-in" style={styles.successCard}>
                  <div style={styles.successIcon}>
                    <Check size={36} color="white" />
                  </div>
                  <h3 style={styles.successTitle}>Thank you for showing up.</h3>
                  <p style={styles.successText}>
                    We have your note and will be in touch about upcoming volunteer days and
                    orientations. The Village is glad you are here.
                  </p>
                  <button className="btn-secondary" onClick={() => setActivePage('visit')}>
                    Plan Your Visit <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {ways.length > 0 && (
        <section className="editorial-section on-sand">
          <div className="editorial-shell">
            <Reveal>
              <p className="editorial-eyebrow">Ways to help</p>
              <h2 className="editorial-title">{waysSection?.title ?? 'Where you can help'}</h2>
            </Reveal>
            <div className="door-grid" style={{ marginTop: '2.5rem' }}>
              {ways.map((way) => (
                <div key={way.title} className="door" style={styles.wayCard}>
                  <span className="door-title">{way.title}</span>
                  <span className="door-note">{way.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const styles = {
  split: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'start',
  },
  body: {
    fontSize: '1.02rem',
    lineHeight: 1.7,
    color: 'var(--muted-sage)',
    maxWidth: '58ch',
    marginBottom: '1.1rem',
  },
  closingLine: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
    lineHeight: 1.5,
    color: 'var(--plantation-ink)',
    maxWidth: '40ch',
    margin: '1.5rem 0 0',
  },
  rightCol: {
    width: '100%',
  },
  requestCard: {
    padding: '2rem',
    borderRadius: '4px',
  },
  requestCardTitle: {
    fontSize: '1.4rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.5rem',
  },
  requestCardText: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '1.25rem',
  },
  formLabel: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: 'var(--koa-wood)',
  },
  formInput: {
    padding: '0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: 'white',
  },
  formError: {
    color: 'var(--tin-rust)',
    marginBottom: '0.75rem',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
  },
  successCard: {
    padding: '2.5rem 1.75rem',
    textAlign: 'center',
    borderRadius: '4px',
  },
  successIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'var(--cane-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem auto',
  },
  successTitle: {
    fontSize: '1.6rem',
    color: 'var(--cane-green)',
    marginBottom: '0.5rem',
  },
  successText: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
  },
  wayCard: {
    cursor: 'default',
  },
};
