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
    <div style={styles.pageContainer} className="theme-nature">
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span style={styles.headerBadge}>EDUCATIONAL OPPORTUNITIES</span>
          <h1 style={styles.pageTitle}>Learning & Field Trips</h1>
          <p style={styles.pageSubtitle}>Bring history to life. Download curriculum kits or submit a school field trip booking request.</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Left: Curriculum resources */}
          <div style={styles.leftCol}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Curriculum Resource Packages</h2>
              <p style={styles.sectionSub}>Comprehensive, standards-aligned PDF bundles to prepare students or guide classroom studies.</p>
            </div>
            
            <div style={styles.resourcesList}>
              {resources.map((res, index) => (
                <div key={index} style={styles.resourceCard} className="nature-glass-card">
                  <div style={styles.resIconBox}>
                    <GraduationCap size={24} color="var(--nature-forest)" />
                  </div>
                  <div style={styles.resContent}>
                    <span style={styles.resType}>{res.type}</span>
                    <h3 style={styles.resTitle}>{res.title}</h3>
                    <p style={styles.resDesc}>{res.desc}</p>
                    <button style={styles.downloadBtn}>
                      <FileText size={16} /> Download Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Field Trip request form */}
          <div style={styles.rightCol}>
            <div style={styles.formCard} className="nature-glass-card">
              {!complete ? (
                <>
                  <span style={styles.formBadge}>RESERVATIONS</span>
                  <h3 style={styles.formTitle}>Book a Field Trip</h3>
                  <p style={styles.formText}>Submit this request form. Our education coordinator will check dates and contact you to confirm.</p>
                  
                  <form onSubmit={handleBookingSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>School or Institution Name</label>
                      <input 
                        type="text" 
                        required 
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g. Waipahu Elementary" 
                        style={styles.input} 
                      />
                    </div>
                    
                    <div style={styles.row}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Estimated Students</label>
                        <input 
                          type="number" 
                          required 
                          value={studentCount}
                          onChange={(e) => setStudentCount(e.target.value)}
                          placeholder="e.g. 45" 
                          style={styles.input} 
                        />
                      </div>
                      
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Grade Level</label>
                        <select 
                          value={gradeLevel}
                          onChange={(e) => setGradeLevel(e.target.value)}
                          style={styles.select}
                        >
                          <option>Elementary</option>
                          <option>Middle School</option>
                          <option>High School</option>
                          <option>University / Adult</option>
                        </select>
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Preferred Visit Date</label>
                      <input 
                        type="date" 
                        required 
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        style={styles.input} 
                      />
                    </div>

                    <button type="submit" className="nature-btn-accent" style={styles.submitBtn}>
                      Submit Booking Request <ChevronRight size={16} />
                    </button>
                  </form>
                </>
              ) : (
                <div style={styles.successBlock}>
                  <div style={styles.successIconCircle}>
                    <Check size={32} color="var(--nature-mist)" />
                  </div>
                  <h3 style={styles.successTitle}>Request Submitted!</h3>
                  <p style={styles.successText}>
                    Thank you. We have received your booking details for <strong>{schoolName}</strong> on <strong>{preferredDate}</strong>.
                  </p>
                  <p style={styles.successSubtext}>
                    Our scheduling desk will review calendar availability and respond within 2-3 business days.
                  </p>
                  <button onClick={() => setComplete(false)} className="nature-btn-primary" style={{ marginTop: '1.5rem' }}>
                    Book Another Trip
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: 'var(--nature-sand)',
    minHeight: '100vh',
    paddingBottom: '5rem',
    fontFamily: 'var(--font-nature-body)'
  },
  headerBlock: {
    background: 'linear-gradient(180deg, var(--nature-forest) 0%, #164228 100%)',
    color: 'var(--nature-mist)',
    padding: '5rem 0 4rem 0',
    textAlign: 'center',
    marginBottom: '3rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  headerBadge: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-emerald)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem'
  },
  pageTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '2.75rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
  },
  pageSubtitle: {
    fontSize: '1.05rem',
    color: '#cbd5e1',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: '3rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  sectionHeader: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.85rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  sectionSub: {
    fontSize: '0.95rem',
    color: '#4b5563'
  },
  resourcesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  resourceCard: {
    display: 'flex',
    gap: '20px',
    padding: '2rem',
    alignItems: 'flex-start',
    boxShadow: 'none',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '16px'
    }
  },
  resIconBox: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    backgroundColor: 'rgba(71, 118, 82, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  resContent: {
    flex: 1
  },
  resType: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px'
  },
  resTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  resDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '1.25rem'
  },
  downloadBtn: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--nature-forest)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'color 0.2s ease',
    padding: 0
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  formCard: {
    padding: '2.5rem',
    boxShadow: 'none'
  },
  formBadge: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-moss)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
    display: 'block'
  },
  formTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  formText: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: '#4b5563',
    marginBottom: '1.75rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'var(--nature-forest)'
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(71, 118, 82, 0.2)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.2s ease',
    fontFamily: 'var(--font-nature-body)'
  },
  select: {
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(71, 118, 82, 0.2)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    height: '42px',
    fontFamily: 'var(--font-nature-body)'
  },
  row: {
    display: 'flex',
    gap: '12px',
    width: '100%'
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '0.75rem'
  },
  successBlock: {
    textAlign: 'center',
    padding: '1.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  successIconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'var(--nature-emerald)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
  },
  successTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  successText: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  successSubtext: {
    fontSize: '0.8rem',
    color: '#6b7280',
    maxWidth: '280px',
    lineHeight: '1.5'
  }
};
