import React, { useState } from 'react';
import { Ticket, Heart, Award, ChevronRight, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Support() {
  const [donateAmount, setDonateAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time'); // 'one-time' | 'monthly'
  const [supportType, setSupportType] = useState('donate'); // 'donate' | 'membership'
  const [complete, setComplete] = useState(false);

  const memberships = [
    {
      level: 'Individual',
      price: '$45',
      period: 'per year',
      color: 'var(--nature-moss)',
      benefits: [
        'Free admission for one named adult member',
        '10% discount on all gift shop items',
        'Invitations to annual meetings and archives showcase',
        'Subscription to the print Ledger journal'
      ]
    },
    {
      level: 'Household',
      price: '$75',
      period: 'per year',
      color: 'var(--nature-earth)',
      benefits: [
        'Free admission for two named adults and up to four children',
        '2 complimentary guest passes per year',
        '10% discount on all gift shop items',
        'Exclusive advance tour bookings for festivals'
      ]
    },
    {
      level: 'Steward',
      price: '$150',
      period: 'per year',
      color: 'var(--nature-forest)',
      benefits: [
        'All Household membership benefits',
        'Invitation to private reception with the Museum Director',
        '1 hour private research archive consultation',
        '4 complimentary guest passes per year'
      ]
    }
  ];

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 }
    });
    setComplete(true);
  };

  const getActiveAmount = () => {
    return customAmount ? customAmount : donateAmount;
  };

  return (
    <div style={styles.pageContainer} className="theme-nature">
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span style={styles.headerBadge}>STEWARDSHIP</span>
          <h1 style={styles.pageTitle}>Support the Sanctuary</h1>
          <p style={styles.pageSubtitle}>Help us protect the memory, botanical gardens, and historical records of Waipahu's immigrant workers.</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* Support Type Selector */}
        <div style={styles.selectorTabs} className="nature-glass-card">
          <button 
            style={{ ...styles.selectorTab, ...(supportType === 'donate' ? styles.selectorTabActive : {}) }}
            onClick={() => { setSupportType('donate'); setComplete(false); }}
          >
            <Heart size={16} /> Direct Donation
          </button>
          <button 
            style={{ ...styles.selectorTab, ...(supportType === 'membership' ? styles.selectorTabActive : {}) }}
            onClick={() => { setSupportType('membership'); setComplete(false); }}
          >
            <Award size={16} /> Annual Membership
          </button>
        </div>

        <div style={styles.grid}>
          {/* Left Column: Form or Tiers */}
          <div style={styles.leftCol}>
            {supportType === 'donate' ? (
              <div style={styles.formCard} className="nature-glass-card">
                {!complete ? (
                  <form onSubmit={handleSupportSubmit} style={styles.form}>
                    <h3 style={styles.formTitle}>Make a Contribution</h3>
                    <p style={styles.formText}>Your tax-deductible gift directly funds historic cottage maintenance and the propagation of heritage plants.</p>
                    
                    {/* Frequency selector */}
                    <div style={styles.freqRow}>
                      <button 
                        type="button" 
                        style={{ ...styles.freqBtn, ...(frequency === 'one-time' ? styles.freqBtnActive : {}) }}
                        onClick={() => setFrequency('one-time')}
                      >
                        One-Time
                      </button>
                      <button 
                        type="button" 
                        style={{ ...styles.freqBtn, ...(frequency === 'monthly' ? styles.freqBtnActive : {}) }}
                        onClick={() => setFrequency('monthly')}
                      >
                        Monthly
                      </button>
                    </div>

                    {/* Presets Grid */}
                    <div style={styles.presetGrid}>
                      {['15', '25', '50', '100'].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => { setDonateAmount(amt); setCustomAmount(''); }}
                          style={{
                            ...styles.presetBtn,
                            ...(donateAmount === amt && !customAmount ? styles.presetBtnActive : {})
                          }}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    {/* Custom Input */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Or enter custom amount ($)</label>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setDonateAmount(''); }}
                        placeholder="Other amount"
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.divider} />

                    <div style={styles.donorDetails}>
                      <h4 style={styles.detailsHeading}>Contributor Information</h4>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input type="text" required placeholder="John Doe" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input type="email" required placeholder="john@example.com" style={styles.input} />
                      </div>
                    </div>

                    <button type="submit" className="nature-btn-accent" style={styles.submitBtn}>
                      <Heart size={16} fill="currentColor" /> Donate ${getActiveAmount() || '0'} {frequency === 'monthly' && '/ month'}
                    </button>
                  </form>
                ) : (
                  <div style={styles.successBlock}>
                    <div style={styles.successIconCircle}>
                      <Check size={32} color="var(--nature-mist)" />
                    </div>
                    <h3 style={styles.successTitle}>Thank You for Your Gift!</h3>
                    <p style={styles.successText}>
                      We have processed your contribution of <strong>${getActiveAmount()}</strong>.
                    </p>
                    <p style={styles.successSubtext}>
                      An official tax receipt has been sent to your email. Your support helps keep Waipahu's canopy alive.
                    </p>
                    <button onClick={() => setComplete(false)} className="nature-btn-primary" style={{ marginTop: '1.5rem' }}>
                      Make Another Donation
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.membershipGrid}>
                {memberships.map((member, index) => (
                  <div key={index} style={styles.memberCard} className="nature-glass-card">
                    <div style={{ ...styles.memberHeader, borderBottom: `2px solid ${member.color}` }}>
                      <span style={{ ...styles.memberLevel, color: member.color }}>{member.level}</span>
                      <div style={styles.memberPriceBox}>
                        <span style={styles.memberPrice}>{member.price}</span>
                        <span style={styles.memberPeriod}>{member.period}</span>
                      </div>
                    </div>
                    <ul style={styles.benefitList}>
                      {member.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} style={styles.benefitItem}>
                          <span style={{ color: 'var(--nature-emerald)', fontWeight: '700' }}>✓</span> {benefit}
                        </li>
                      ))}
                    </ul>
                    <button 
                      className="nature-btn-primary" 
                      style={{ ...styles.memberBtn, backgroundColor: member.color }}
                      onClick={() => setComplete(true)}
                    >
                      Join at {member.level} Tier
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sidebar trust */}
          <div style={styles.rightCol}>
            <div style={styles.infoCard} className="nature-glass-card">
              <span style={styles.infoBadge}>YOUR IMPACT</span>
              <h3 style={styles.infoTitle}>Tax-Deductible Stewardship</h3>
              <p style={styles.infoText}>
                The Waipahu Cultural Association is a registered 501(c)(3) non-profit organization. Every dollar contributed goes directly to support education, preservation, and cultural restoration programs.
              </p>
              <div style={styles.divider} />
              
              <div style={styles.impactPoints}>
                <div style={styles.impactPoint}>
                  <ShieldCheck size={18} color="var(--nature-emerald)" />
                  <div>
                    <strong>100% Directed</strong>
                    <p style={styles.impactSub}>Donations fund structural cottage repair and botanical guide sheets.</p>
                  </div>
                </div>
                <div style={styles.impactPoint}>
                  <ShieldCheck size={18} color="var(--nature-emerald)" />
                  <div>
                    <strong>Secure Checkout</strong>
                    <p style={styles.impactSub}>Encrypted SSL connection ensures your payment details are fully guarded.</p>
                  </div>
                </div>
              </div>
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
  selectorTabs: {
    display: 'flex',
    padding: '6px',
    gap: '4px',
    maxWidth: '500px',
    margin: '0 auto 3rem auto',
    borderRadius: '16px',
    boxShadow: 'none'
  },
  selectorTab: {
    flex: 1,
    padding: '0.85rem 1rem',
    border: 'none',
    background: 'none',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#6b7280',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  selectorTabActive: {
    backgroundColor: 'var(--nature-forest)',
    color: 'var(--nature-mist)',
    boxShadow: '0 4px 10px rgba(11, 36, 22, 0.15)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.8fr 1fr',
    gap: '2.5rem',
    alignItems: 'start',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr'
    }
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  formCard: {
    padding: '2.5rem',
    boxShadow: 'none'
  },
  formTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  formText: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#4b5563',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  freqRow: {
    display: 'flex',
    gap: '10px'
  },
  freqBtn: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid rgba(71, 118, 82, 0.2)',
    background: '#ffffff',
    borderRadius: '12px',
    fontFamily: 'var(--font-nature-body)',
    fontWeight: '600',
    fontSize: '0.85rem',
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  freqBtnActive: {
    backgroundColor: 'rgba(71, 118, 82, 0.1)',
    borderColor: 'var(--nature-moss)',
    color: 'var(--nature-forest)'
  },
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px'
  },
  presetBtn: {
    padding: '0.85rem 0',
    border: '1px solid rgba(71, 118, 82, 0.2)',
    background: '#ffffff',
    borderRadius: '12px',
    fontFamily: 'var(--font-nature-body)',
    fontWeight: '700',
    fontSize: '1rem',
    color: 'var(--nature-forest)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  presetBtnActive: {
    backgroundColor: 'var(--nature-forest)',
    borderColor: 'var(--nature-forest)',
    color: 'var(--nature-mist)',
    boxShadow: '0 4px 10px rgba(11, 36, 22, 0.15)'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
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
  divider: {
    height: '1px',
    backgroundColor: 'rgba(71, 118, 82, 0.1)',
    margin: '1rem 0'
  },
  donorDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  detailsHeading: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '1rem',
    marginTop: '0.5rem'
  },
  membershipGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%'
  },
  memberCard: {
    padding: '2rem',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  memberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: '1.25rem',
    marginBottom: '1.5rem'
  },
  memberLevel: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.5rem',
    fontWeight: '700'
  },
  memberPriceBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  memberPrice: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--nature-forest)',
    lineHeight: 1
  },
  memberPeriod: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  benefitList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 2rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  benefitItem: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#4b5563'
  },
  memberBtn: {
    width: '100%',
    justifyContent: 'center'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoCard: {
    padding: '2rem',
    boxShadow: 'none'
  },
  infoBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
    display: 'block'
  },
  infoTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  infoText: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: '#4b5563'
  },
  impactPoints: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  impactPoint: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  impactSub: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '2px',
    lineHeight: '1.4'
  },
  successBlock: {
    textAlign: 'center',
    padding: '2rem 0',
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
    fontSize: '1.6rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  successText: {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  successSubtext: {
    fontSize: '0.8rem',
    color: '#6b7280',
    maxWidth: '320px',
    lineHeight: '1.5'
  }
};
