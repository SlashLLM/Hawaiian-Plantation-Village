import React, { useMemo, useState } from 'react';
import { 
  Compass, 
  GraduationCap, 
  ChevronRight, 
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { usePageSection, useCurriculumModules } from '../../context/ContentProvider.jsx';
import { submitInquiry } from '../../lib/api.js';
import SEO from '../../components/SEO.jsx';

export default function Learn() {
  const setActivePage = useAppNavigate();
  const { section: schoolSection } = usePageSection('learn', 'school', {});
  const { modules } = useCurriculumModules();

  // School Booking Form State
  const [complete, setComplete] = useState(false);
  const [schoolSubmitting, setSchoolSubmitting] = useState(false);
  const [schoolSubmitError, setSchoolSubmitError] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [gradeLevel, setGradeLevel] = useState('4th Grade');
  const [preferredDate, setPreferredDate] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const moduleList = useMemo(
    () => (Array.isArray(modules) ? modules : Object.values(modules ?? {})),
    [modules],
  );
  const resources = useMemo(
    () => moduleList.map((m) => ({
      id: m.id,
      title: m.title,
      type: m.grades ?? 'Curriculum Package',
      desc: m.checkpoints?.[0]?.text ?? '',
    })),
    [moduleList],
  );
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSchoolSubmitting(true);
    setSchoolSubmitError('');
    try {
      await submitInquiry({
        type: 'field_trip',
        schoolName,
        gradeLevel,
        studentCount,
        preferredDate,
        contactName,
        contactEmail,
        contactPhone,
      });
      confetti({
        particleCount: 80,
        spread: 50,
        origin: { y: 0.8 },
      });
      setComplete(true);
    } catch (err) {
      setSchoolSubmitError(err.message ?? 'Failed to submit inquiry. Please try again.');
    } finally {
      setSchoolSubmitting(false);
    }
  };

  const headerDetails = {
    stampText: schoolSection?.stamp ?? 'Educator Experience',
    title: schoolSection?.title ?? 'Education & Field Trips',
    subtitle: schoolSection?.subtitle ?? 'Bring history to life. Explore educational packages and request school visits below.',
  };

  return (
    <div style={styles.pageContainer}>
      <SEO title="Education" description="History feels different when you experience it. Field trips and curriculum resources at Hawaii's Plantation Village." />
      <PageHeaderParallax
        image={SITE_PHOTOS.headers.learn}
        stamp={headerDetails.stampText}
        title={headerDetails.title}
        subtitle={headerDetails.subtitle}
      />

      {/* Tabs */}
      <div style={styles.tabContainer}>
        <div style={styles.container}>
          <div style={styles.tabWrapper}>
            <button type="button" style={{ ...styles.tabButton, ...styles.activeTabButton }}>
              School & Group Visits
            </button>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* TAB: SCHOOL & GROUP VISITS */}
        <div className="content-sidebar-grid">
          {/* Left Col: Resources download */}
          <div style={styles.leftCol}>
            <h2 style={styles.sectionHeaderTitle}>Curriculum Resources</h2>
            <p style={styles.bodyText}>
              {schoolSection?.resourcesIntro ?? 'Start our HIDOE standard-aligned interactive lessons. Each package includes videos, guided reading, quizzes, and hands-on activities:'}
            </p>

            <div style={styles.resourcesList}>
              {resources.map((res) => (
                <div key={res.id} className="paper-card" style={styles.resCard}>
                  <div style={styles.resHeader}>
                    <GraduationCap size={20} color="var(--cane-green)" />
                    <span style={styles.resType}>{res.type}</span>
                  </div>
                  <h3 style={styles.resTitle}>{res.title}</h3>
                  <p style={styles.resDesc}>{res.desc}</p>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={styles.downloadBtn}
                    onClick={() => setActivePage('learn-module', { moduleId: res.id })}
                  >
                    <Compass size={16} /> Start Interactive Lesson
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Request Form */}
          <div style={styles.rightCol}>
            {!complete ? (
              <form className="paper-card sticky-sidebar-form" style={styles.requestCard} onSubmit={handleBookingSubmit}>
                <h3 style={styles.requestCardTitle}>Request a Field Trip</h3>
                <p style={styles.requestCardText}>
                  We host educational groups Tuesday through Friday. Please fill out details to submit a tour slot reservation inquiry.
                </p>

                <div style={styles.formCol}>
                  <label style={styles.formLabel}>School Name</label>
                  <input
                    type="text"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.formCol}>
                  <label style={styles.formLabel}>Grade Level</label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    style={styles.formInput}
                  >
                    <option value="Elementary (K-2)">Elementary (K-2)</option>
                    <option value="3rd Grade">3rd Grade</option>
                    <option value="4th Grade">4th Grade</option>
                    <option value="5th Grade">5th Grade</option>
                    <option value="Middle School (6-8)">Middle School (6-8)</option>
                    <option value="High School (9-12)">High School (9-12)</option>
                  </select>
                </div>

                <div style={styles.formCol}>
                  <label style={styles.formLabel}>Estimated Student Count</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 35"
                    value={studentCount}
                    onChange={(e) => setStudentCount(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.formCol}>
                  <label style={styles.formLabel}>Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.formCol}>
                  <label style={styles.formLabel}>Teacher / Contact Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.formCol}>
                  <label style={styles.formLabel}>Contact Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.formCol}>
                  <label style={styles.formLabel}>Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.helpfulAlert}>
                  <Compass size={18} color="var(--tin-rust)" />
                  <p style={styles.alertText}>
                    {schoolSection?.fieldTripNote ?? 'Field trips require a minimum of 10 students and at least one adult chaperone per 10 children.'}
                  </p>
                </div>

                {schoolSubmitError && (
                  <p role="alert" style={{ color: 'var(--tin-rust)', marginBottom: '0.75rem', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <AlertCircle size={16} /> {schoolSubmitError}
                  </p>
                )}

                <button type="submit" className="btn-primary" style={styles.submitBtn} disabled={schoolSubmitting}>
                  {schoolSubmitting ? 'Submitting…' : 'Submit Booking Inquiry'} <ChevronRight size={16} />
                </button>
              </form>
            ) : (
              // Inquiry Success State
              <div className="paper-card animate-fade-in" style={styles.successCard}>
                <div style={styles.successIcon}>
                  <Check size={36} color="white" />
                </div>
                <h3 style={styles.successTitle}>Inquiry Submitted!</h3>
                <p style={styles.successText}>
                  Thank you. Our educational coordinator will review your request and contact your school within 2 business days.
                </p>
                
                <div style={styles.receiptSummary}>
                  <div className="ledger-header" style={{ marginBottom: '0.75rem' }}>INQUIRY SUMMARY</div>
                  <div style={styles.receiptRow}><span>School:</span><strong>{schoolName}</strong></div>
                  <div style={styles.receiptRow}><span>Grade / Count:</span><strong>{gradeLevel} ({studentCount} students)</strong></div>
                  <div style={styles.receiptRow}><span>Requested Date:</span><strong>{preferredDate}</strong></div>
                  <div style={styles.receiptRow}><span>Contact:</span><strong>{contactName}</strong></div>
                </div>

                <button className="btn-primary" onClick={() => { setComplete(false); setSchoolSubmitError(''); }}>
                  Submit New Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    paddingBottom: '5rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  tabContainer: {
    borderBottom: '1px solid var(--kraft-tan-dark)',
    backgroundColor: 'var(--paper-dark)',
    marginTop: '-3rem',
    marginBottom: '3rem',
    paddingTop: '0.75rem',
  },
  tabWrapper: {
    display: 'flex',
    gap: '8px',
    marginBottom: '-1px',
    flexWrap: 'wrap',
  },
  tabButton: {
    background: 'none',
    border: '1px solid var(--kraft-tan-dark)',
    borderBottom: 'none',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    padding: '0.75rem 1.5rem',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    backgroundColor: 'rgba(235, 215, 188, 0.3)',
    transition: 'all 0.2s ease',
  },
  activeTabButton: {
    backgroundColor: 'var(--paper-light)',
    color: 'var(--cane-green)',
    borderTop: '3px solid var(--cane-green)',
    borderLeft: '1px solid var(--kraft-tan-dark)',
    borderRight: '1px solid var(--kraft-tan-dark)',
    position: 'relative',
    zIndex: 2,
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  sectionHeaderTitle: {
    fontSize: '1.75rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '4px'
  },
  bodyText: {
    fontSize: '1rem',
    color: 'var(--text-dark)',
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  resourcesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  resCard: {
    padding: '1.75rem',
    borderRadius: '4px'
  },
  resHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '0.75rem'
  },
  resType: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--cane-green)'
  },
  resTitle: {
    fontSize: '1.25rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.5rem'
  },
  resDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.25rem'
  },
  downloadBtn: {
    fontSize: '0.8rem',
    padding: '0.5rem 1rem'
  },
  highlightBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    backgroundColor: 'var(--paper-dark)',
    border: '1px solid var(--kraft-tan-dark)',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    marginTop: '0.25rem',
    display: 'inline-block'
  },
  rightCol: {
    width: '100%'
  },
  requestCard: {
    padding: '2rem',
    borderRadius: '4px'
  },
  requestCardTitle: {
    fontSize: '1.4rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.5rem'
  },
  requestCardText: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.5rem'
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '1.25rem'
  },
  formRowGrid: {
    marginBottom: 0
  },
  formLabel: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: 'var(--koa-wood)'
  },
  formInput: {
    padding: '0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: 'white'
  },
  helpfulAlert: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(178,78,44,0.06)',
    borderLeft: '4px solid var(--tin-rust)',
    padding: '0.75rem 1rem',
    marginBottom: '1.5rem',
    borderRadius: '4px'
  },
  alertText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    margin: 0
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center'
  },
  successCard: {
    padding: '2.5rem 1.75rem',
    textAlign: 'center',
    borderRadius: '4px'
  },
  successIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'var(--cane-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem auto'
  },
  successTitle: {
    fontSize: '1.6rem',
    color: 'var(--cane-green)',
    marginBottom: '0.5rem'
  },
  successText: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    lineHeight: '1.5'
  },
  receiptSummary: {
    border: '1px solid var(--kraft-tan-dark)',
    padding: '1.25rem',
    textAlign: 'left',
    backgroundColor: 'var(--paper-dark)',
    marginBottom: '1.5rem'
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    borderBottom: '1px dotted var(--kraft-tan-dark)',
    paddingBottom: '6px',
    marginBottom: '6px'
  }
};
