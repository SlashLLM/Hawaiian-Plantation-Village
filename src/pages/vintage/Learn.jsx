import React, { useMemo, useState } from 'react';
import { 
  Compass, 
  GraduationCap, 
  ChevronRight, 
  Check,
  Users,
  Award,
  Sprout,
  Download,
  Map,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import { parallaxLayers } from '../../assets/parallax';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { useContentCollection, usePageSection, useCurriculumModules } from '../../context/ContentProvider.jsx';

const FAMILY_WORKSHOP_SLUGS = ['talk-story-saturdays', 'ohana-heritage-gardening', 'village-scavenger-hunt'];
const YOUTH_WORKSHOP_SLUGS = ['docent-internship', 'youth-volunteer-guild'];

export default function Learn() {
  const setActivePage = useAppNavigate();
  const { section: schoolSection } = usePageSection('learn', 'school', {});
  const { section: youthSection } = usePageSection('learn', 'youth', {});
  const { section: familySection } = usePageSection('learn', 'family', {});
  const { modules } = useCurriculumModules();
  const { items: workshops } = useContentCollection('workshop');
  const [activeTab, setActiveTab] = useState('school'); // 'school' | 'youth' | 'family'

  // School Booking Form State
  const [complete, setComplete] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [gradeLevel, setGradeLevel] = useState('4th Grade');
  const [preferredDate, setPreferredDate] = useState('');

  // Youth Program Form State
  const [youthComplete, setYouthComplete] = useState(false);
  const [youthName, setYouthName] = useState('');
  const [youthEmail, setYouthEmail] = useState('');
  const [youthSchool, setYouthSchool] = useState('');
  const [youthGrade, setYouthGrade] = useState('10th Grade');
  const [youthInterest, setYouthInterest] = useState('Internship');
  const [youthMessage, setYouthMessage] = useState('');

  // Family RSVP Form State
  const [familyComplete, setFamilyComplete] = useState(false);
  const [familyContactName, setFamilyContactName] = useState('');
  const [familyEmail, setFamilyEmail] = useState('');
  const [familyWorkshop, setFamilyWorkshop] = useState('Talk Story Saturdays');
  const [familyCount, setFamilyCount] = useState('2');

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
  const familyWorkshops = useMemo(
    () => workshops.filter((w) => FAMILY_WORKSHOP_SLUGS.includes(w.slug)),
    [workshops],
  );
  const youthWorkshops = useMemo(
    () => workshops.filter((w) => YOUTH_WORKSHOP_SLUGS.includes(w.slug)),
    [workshops],
  );

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 }
    });
    setComplete(true);
  };

  const handleYouthSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 }
    });
    setYouthComplete(true);
  };

  const handleFamilySubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 }
    });
    setFamilyComplete(true);
  };

  const tabSections = { school: schoolSection, youth: youthSection, family: familySection };
  const headerDetails = {
    stampText: tabSections[activeTab]?.stamp ?? 'Educator Experience',
    stampColorClass: `ink-stamp ${tabSections[activeTab]?.stampClass ?? 'green'}`,
    title: tabSections[activeTab]?.title ?? 'Education & Field Trips',
    subtitle: tabSections[activeTab]?.subtitle ?? 'Bring history to life. Explore educational packages and request school visits below.',
  };

  return (
    <div style={styles.pageContainer}>
      <PageHeaderParallax
        layers={parallaxLayers.learn}
        stamp={headerDetails.stampText}
        stampClass={headerDetails.stampColorClass}
        title={headerDetails.title}
        subtitle={headerDetails.subtitle}
      />

      {/* Tabs */}
      <div style={styles.tabContainer}>
        <div style={styles.container}>
          <div style={styles.tabWrapper}>
            <button
              onClick={() => setActiveTab('school')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'school' ? styles.activeTabButton : {})
              }}
            >
              School & Group Visits
            </button>
            <button
              onClick={() => setActiveTab('youth')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'youth' ? styles.activeTabButton : {})
              }}
            >
              Youth Internships & Volunteering
            </button>
            <button
              onClick={() => setActiveTab('family')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'family' ? styles.activeTabButton : {})
              }}
            >
              Family Learning
            </button>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* TAB: SCHOOL & GROUP VISITS */}
        {activeTab === 'school' && (
          <div style={styles.contentGrid}>
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
                <form className="paper-card" style={styles.requestCard} onSubmit={handleBookingSubmit}>
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

                  <div style={styles.helpfulAlert}>
                    <Compass size={18} color="var(--tin-rust)" />
                    <p style={styles.alertText}>
                      {schoolSection?.fieldTripNote ?? 'Field trips require a minimum of 10 students and at least one adult chaperone per 10 children.'}
                    </p>
                  </div>

                  <button type="submit" className="btn-primary" style={styles.submitBtn}>
                    Submit Booking Inquiry <ChevronRight size={16} />
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
                  </div>

                  <button className="btn-primary" onClick={() => setComplete(false)}>
                    Submit New Request
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: YOUTH INTERNSHIPS & VOLUNTEERING */}
        {activeTab === 'youth' && (
          <div style={styles.contentGrid}>
            {/* Left Col: Details */}
            <div style={styles.leftCol}>
              <h2 style={styles.sectionHeaderTitle}>Student Pathways</h2>
              <p style={styles.bodyText}>
                We offer unique opportunities for high school and college students to connect with plantation-era heritage, develop leadership skills, and earn educational credit or stipends.
              </p>

              <div style={styles.resourcesList}>
                {youthWorkshops.map((program) => (
                  <div key={program.slug} className="paper-card" style={styles.resCard}>
                    <div style={styles.resHeader}>
                      {program.slug === 'docent-internship' ? (
                        <Award size={20} color="var(--tin-rust)" />
                      ) : (
                        <HeartHandshake size={20} color="var(--tin-rust)" />
                      )}
                      <span style={{ ...styles.resType, color: 'var(--tin-rust)' }}>{program.type}</span>
                    </div>
                    <h3 style={styles.resTitle}>{program.title}</h3>
                    <p style={styles.resDesc}>{program.desc}</p>
                    {program.schedule && (
                      <div style={styles.highlightBadge}>
                        <strong>Schedule:</strong> {program.schedule}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Inquiry Form */}
            <div style={styles.rightCol}>
              {!youthComplete ? (
                <form className="paper-card" style={styles.requestCard} onSubmit={handleYouthSubmit}>
                  <h3 style={{ ...styles.requestCardTitle, color: 'var(--tin-rust)' }}>Join Student Programs</h3>
                  <p style={styles.requestCardText}>
                    Are you a student interested in making a difference? Apply or request more information about our internship and volunteer pathways.
                  </p>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Your Name</label>
                    <input
                      type="text"
                      required
                      value={youthName}
                      onChange={(e) => setYouthName(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={youthEmail}
                      onChange={(e) => setYouthEmail(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>School or Organization</label>
                    <input
                      type="text"
                      required
                      value={youthSchool}
                      onChange={(e) => setYouthSchool(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formRowGrid}>
                    <div style={styles.formCol}>
                      <label style={styles.formLabel}>Current Grade</label>
                      <select
                        value={youthGrade}
                        onChange={(e) => setYouthGrade(e.target.value)}
                        style={styles.formInput}
                      >
                        <option value="9th Grade">9th Grade</option>
                        <option value="10th Grade">10th Grade</option>
                        <option value="11th Grade">11th Grade</option>
                        <option value="12th Grade">12th Grade</option>
                        <option value="College">College / Other</option>
                      </select>
                    </div>

                    <div style={styles.formCol}>
                      <label style={styles.formLabel}>Interested In</label>
                      <select
                        value={youthInterest}
                        onChange={(e) => setYouthInterest(e.target.value)}
                        style={styles.formInput}
                      >
                        <option value="Internship">Docent Internship</option>
                        <option value="Volunteering">Volunteer Guild</option>
                        <option value="Both">Both Programs</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Why are you interested in plantation history?</label>
                    <textarea
                      required
                      rows={3}
                      value={youthMessage}
                      onChange={(e) => setYouthMessage(e.target.value)}
                      style={{ ...styles.formInput, resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ ...styles.submitBtn, backgroundColor: 'var(--tin-rust)' }}>
                    Submit Inquiry <ChevronRight size={16} />
                  </button>
                </form>
              ) : (
                // Youth Success State
                <div className="paper-card animate-fade-in" style={styles.successCard}>
                  <div style={{ ...styles.successIcon, backgroundColor: 'var(--tin-rust)' }}>
                    <Check size={36} color="white" />
                  </div>
                  <h3 style={{ ...styles.successTitle, color: 'var(--tin-rust)' }}>Inquiry Received!</h3>
                  <p style={styles.successText}>
                    Mahalo! Our student program coordinator will review your statement and contact you within 3 business days.
                  </p>
                  
                  <div style={styles.receiptSummary}>
                    <div className="ledger-header" style={{ marginBottom: '0.75rem' }}>APPLICATION RECEIPT</div>
                    <div style={styles.receiptRow}><span>Name:</span><strong>{youthName}</strong></div>
                    <div style={styles.receiptRow}><span>School / Grade:</span><strong>{youthSchool} ({youthGrade})</strong></div>
                    <div style={styles.receiptRow}><span>Interest Area:</span><strong>{youthInterest}</strong></div>
                  </div>

                  <button className="btn-primary" style={{ backgroundColor: 'var(--tin-rust)' }} onClick={() => setYouthComplete(false)}>
                    Submit New Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: FAMILY LEARNING */}
        {activeTab === 'family' && (
          <div style={styles.contentGrid}>
            {/* Left Col: Activities */}
            <div style={styles.leftCol}>
              <h2 style={styles.sectionHeaderTitle}>Family Learning & Activities</h2>
              <p style={styles.bodyText}>
                Learning at the Hawaiian Plantation Village is an intergenerational journey. Bring your children, parents, and kupuna (elders) to learn, craft, and garden together.
              </p>

              <div style={styles.resourcesList}>
                {familyWorkshops.map((workshop) => (
                  <div
                    key={workshop.slug}
                    className="paper-card"
                    style={workshop.slug === 'village-scavenger-hunt'
                      ? { ...styles.resCard, border: '2.5px dashed var(--ocean-teal)', backgroundColor: 'rgba(34, 100, 109, 0.02)' }
                      : styles.resCard}
                  >
                    <div style={styles.resHeader}>
                      {workshop.slug === 'talk-story-saturdays' && <Users size={20} color="var(--ocean-teal)" />}
                      {workshop.slug === 'ohana-heritage-gardening' && <Sprout size={20} color="var(--ocean-teal)" />}
                      {workshop.slug === 'village-scavenger-hunt' && <Map size={20} color="var(--ocean-teal)" />}
                      <span style={{ ...styles.resType, color: 'var(--ocean-teal)' }}>{workshop.type}</span>
                    </div>
                    <h3 style={styles.resTitle}>{workshop.title}</h3>
                    <p style={styles.resDesc}>{workshop.desc}</p>
                    {workshop.slug === 'village-scavenger-hunt' ? (
                      <button className="btn-secondary" style={{ ...styles.downloadBtn, borderColor: 'var(--ocean-teal)', color: 'var(--ocean-teal)' }}>
                        <Download size={16} /> Download Scavenger Hunt (PDF)
                      </button>
                    ) : workshop.schedule ? (
                      <div style={styles.highlightBadge}>
                        <strong>Schedule:</strong> {workshop.schedule}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: RSVP Form */}
            <div style={styles.rightCol}>
              {!familyComplete ? (
                <form className="paper-card" style={styles.requestCard} onSubmit={handleFamilySubmit}>
                  <h3 style={{ ...styles.requestCardTitle, color: 'var(--ocean-teal)' }}>Reserve Workshop Spots</h3>
                  <p style={styles.requestCardText}>
                    Space in our Talk Story sessions and gardening workshops is limited to ensure a high-quality hands-on experience. Reserve your family's free spot today.
                  </p>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Family Contact Name</label>
                    <input
                      type="text"
                      required
                      value={familyContactName}
                      onChange={(e) => setFamilyContactName(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={familyEmail}
                      onChange={(e) => setFamilyEmail(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Select Workshop</label>
                    <select
                      value={familyWorkshop}
                      onChange={(e) => setFamilyWorkshop(e.target.value)}
                      style={styles.formInput}
                    >
                      {familyWorkshops.filter((w) => w.slug !== 'village-scavenger-hunt').map((w) => (
                        <option key={w.slug} value={w.title}>{w.title}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Number of Attendees (All Ages)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="10"
                      value={familyCount}
                      onChange={(e) => setFamilyCount(e.target.value)}
                      style={styles.formInput}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ ...styles.submitBtn, backgroundColor: 'var(--ocean-teal)' }}>
                    Reserve Free Spot <ChevronRight size={16} />
                  </button>
                </form>
              ) : (
                // Family Success State
                <div className="paper-card animate-fade-in" style={styles.successCard}>
                  <div style={{ ...styles.successIcon, backgroundColor: 'var(--ocean-teal)' }}>
                    <Check size={36} color="white" />
                  </div>
                  <h3 style={{ ...styles.successTitle, color: 'var(--ocean-teal)' }}>RSVP Confirmed!</h3>
                  <p style={styles.successText}>
                    We look forward to seeing your family! A confirmation email has been sent with workshop details and parking instructions.
                  </p>
                  
                  <div style={styles.receiptSummary}>
                    <div className="ledger-header" style={{ marginBottom: '0.75rem' }}>RESERVATION CONFIRMATION</div>
                    <div style={styles.receiptRow}><span>Contact:</span><strong>{familyContactName}</strong></div>
                    <div style={styles.receiptRow}><span>Workshop:</span><strong>{familyWorkshop}</strong></div>
                    <div style={styles.receiptRow}><span>Attendees:</span><strong>{familyCount} spots</strong></div>
                  </div>

                  <button className="btn-primary" style={{ backgroundColor: 'var(--ocean-teal)' }} onClick={() => setFamilyComplete(false)}>
                    Reserve Another Spot
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '3rem',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
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
    borderRadius: '4px',
    position: 'sticky',
    top: '120px'
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
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    width: '100%',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr'
    }
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
