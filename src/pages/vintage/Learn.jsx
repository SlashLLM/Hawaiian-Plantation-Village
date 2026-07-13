import React, { useState } from 'react';
import { BookOpen, FileText, Calendar, Compass, GraduationCap, ChevronRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Learn() {
  const [complete, setComplete] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [gradeLevel, setGradeLevel] = useState('4th Grade');
  const [preferredDate, setPreferredDate] = useState('');

  const resources = [
    {
      title: 'Elementary Curriculum Package: Waves of Immigration',
      type: 'PDF Worksheet Set (Grades 3-5)',
      desc: 'Aligned with HIDOE Social Studies Standard 3.1. Includes mapping activities, bango identification tags matching exercises, and vocabulary guides.'
    },
    {
      title: 'Middle School Research Guide: Life in the Camp Sectors',
      type: 'Primary Source Activity (Grades 6-8)',
      desc: 'Transcripts of oral histories and digital catalog links of period immigrant tools. Perfect pre-visit classroom preparation.'
    },
    {
      title: 'High School Analytical Package: Sugar Economics & Labor Struggles',
      type: 'Documentary Resource Packet (Grades 9-12)',
      desc: 'Covers the economic forces behind the Masters and Servants Act (1850), the structural evolution of camps, and the 1920 labor strike.'
    }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 }
    });
    setComplete(true);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className="ink-stamp green" style={{ marginBottom: '0.5rem' }}>EDUCATOR EXPERIENCE</span>
          <h1 style={styles.pageTitle}>Education & Field Trips</h1>
          <p style={styles.pageSubtitle}>Bring history to life. Explore educational packages and request school visits below.</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.contentGrid}>
          {/* Left Col: Resources download */}
          <div style={styles.leftCol}>
            <h2 style={styles.sectionHeaderTitle}>Curriculum Resources</h2>
            <p style={styles.bodyText}>
              Download our HIDOE standard-aligned classroom resource packages. These materials contain vocabulary sheets, primary document copies, and post-visit activities:
            </p>

            <div style={styles.resourcesList}>
              {resources.map((res, idx) => (
                <div key={idx} className="paper-card" style={styles.resCard}>
                  <div style={styles.resHeader}>
                    <GraduationCap size={20} color="var(--cane-green)" />
                    <span style={styles.resType}>{res.type}</span>
                  </div>
                  <h3 style={styles.resTitle}>{res.title}</h3>
                  <p style={styles.resDesc}>{res.desc}</p>
                  <button className="btn-secondary" style={styles.downloadBtn}>
                    <FileText size={16} /> Download Package
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
                    Field trips require a minimum of 10 students and at least one adult chaperone per 10 children.
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
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    paddingBottom: '5rem'
  },
  headerBlock: {
    backgroundColor: 'var(--paper-dark)',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    padding: '3.5rem 0',
    marginBottom: '3rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  pageTitle: {
    fontSize: '2.8rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '0.5rem'
  },
  pageSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.15rem',
    color: 'var(--text-muted)',
    maxWidth: '700px'
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
  // Success card
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
