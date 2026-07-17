import React, { useEffect, useMemo, useState } from 'react';
import { Heart, Award, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import { parallaxLayers } from '../../assets/parallax';
import { createMembership, fetchMembershipTiers, formatCents } from '../../lib/api.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';
import QRPass from '../../components/QRPass.jsx';
import { useSiteSettings, usePageSection } from '../../context/ContentProvider.jsx';

export default function Support() {
  const { settings } = useSiteSettings();
  const { section: header } = usePageSection('support', 'header', {
    stamp: 'SUPPORT MISSION',
    stampClass: 'rust',
    title: 'Support the Village',
    subtitle: 'Help us preserve Oʻahu\'s plantation cottages and share immigration stories for future generations.',
  });
  const { section: donateSection } = usePageSection('support', 'donate', {
    title: 'Make a Tax-Deductible Contribution',
    impactTitle: 'How Your Gift Helps',
    impactTemplate: 'A gift of <strong>${amount}</strong> directly supports the preservation of timber frames and restoration of historical furnishings inside our represented ethnic camp cottages.',
  });
  const { section: membershipIntro } = usePageSection('support', 'membershipIntro', {
    title: 'Preserve Heritage, Enjoy Benefits',
    description: 'Select a steward membership tier. Your pass will be registered, emailed with a QR code, and visible in the admin dashboard.',
  });
  const { section: impactSidebar } = usePageSection('support', 'impactSidebar', {
    title: 'Annual Support Impact',
  });
  const donationPresets = settings?.donationPresets ?? [];
  const presetAmounts = useMemo(
    () => (donationPresets.length ? donationPresets.map((p) => String(p.amount)) : ['15', '25', '50', '100', '250']),
    [donationPresets],
  );
  const [donateAmount, setDonateAmount] = useState(presetAmounts[1] ?? '50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time'); // 'one-time' | 'monthly'
  const [supportType, setSupportType] = useState('donate'); // 'donate' | 'membership'
  const [complete, setComplete] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [membershipStep, setMembershipStep] = useState('tiers'); // tiers | checkout | done
  const [memFirstName, setMemFirstName] = useState('');
  const [memLastName, setMemLastName] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [householdNote, setHouseholdNote] = useState('');
  const [memSubmitting, setMemSubmitting] = useState(false);
  const [memError, setMemError] = useState('');
  const [memConfirmation, setMemConfirmation] = useState(null);
  const [tiersFromDb, setTiersFromDb] = useState([]);

  const FALLBACK_TIERS = [
    {
      slug: 'individual',
      level: 'Individual',
      price: '$45',
      period: 'per year',
      color: 'var(--cane-green)',
      benefits: [
        'Free admission for one named adult member',
        '10% discount on all gift shop items',
        'Invitations to annual meetings and archives showcase',
        'Subscription to the print Ledger journal'
      ]
    },
    {
      slug: 'household',
      level: 'Household',
      price: '$75',
      period: 'per year',
      color: 'var(--ocean-teal)',
      benefits: [
        'Free admission for two named adults and up to four children',
        '2 complimentary guest passes per year',
        '10% discount on all gift shop items',
        'Exclusive advance tour bookings for festivals'
      ]
    },
    {
      slug: 'steward',
      level: 'Steward',
      price: '$150',
      period: 'per year',
      color: 'var(--tin-rust)',
      benefits: [
        'All Household membership benefits',
        'Invitation to private reception with the Museum Director',
        '1 hour private research archive consultation',
        '4 complimentary guest passes per year'
      ]
    }
  ];

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchMembershipTiers()
      .then((data) => { if (data?.length) setTiersFromDb(data); })
      .catch(() => {});
  }, []);

  const memberships = (tiersFromDb.length ? tiersFromDb : FALLBACK_TIERS).map((t) => ({
    slug: t.slug,
    level: t.level,
    price: t.price_cents != null ? formatCents(t.price_cents) : t.price,
    priceCents: t.price_cents ?? parseInt(String(t.price).replace(/\D/g, ''), 10),
    period: t.period_label ?? t.period ?? 'per year',
    color: t.accent_color ?? t.color ?? 'var(--cane-green)',
    benefits: Array.isArray(t.benefits) ? t.benefits : t.benefits,
  }));

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.8 } });
    setComplete(true);
  };

  async function handleMembershipSubmit(e) {
    e.preventDefault();
    if (!selectedTier) return;
    setMemError('');
    setMemSubmitting(true);
    try {
      const result = await createMembership({
        tierSlug: selectedTier.slug,
        firstName: memFirstName,
        lastName: memLastName,
        email: memEmail,
        householdNote: selectedTier.slug === 'household' || selectedTier.slug === 'steward' ? householdNote : undefined,
      });
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.8 } });
      setMemConfirmation(result);
      setMembershipStep('done');
    } catch (err) {
      setMemError(err.message ?? 'Registration failed');
    } finally {
      setMemSubmitting(false);
    }
  }

  function selectTier(tier) {
    setSelectedTier(tier);
    setMembershipStep('checkout');
    setMemError('');
  }

  const getActiveAmount = () => {
    return donateAmount === 'custom' ? customAmount : donateAmount;
  };

  return (
    <div style={styles.pageContainer}>
      <PageHeaderParallax
        layers={parallaxLayers.support}
        stamp={header?.stamp ?? 'SUPPORT MISSION'}
        stampClass={`ink-stamp ${header?.stampClass ?? 'rust'}`}
        title={header?.title ?? 'Support the Village'}
        subtitle={header?.subtitle ?? 'Help us preserve Oʻahu\'s plantation cottages and share immigration stories for future generations.'}
      />

      <div style={styles.container}>
        {/* Toggle Support Type */}
        <div style={styles.supportToggle}>
          <button
            onClick={() => { setSupportType('donate'); setComplete(false); }}
            style={{ ...styles.toggleBtn, ...(supportType === 'donate' ? styles.toggleBtnActive : {}) }}
          >
            Direct Donation
          </button>
          <button
            onClick={() => { setSupportType('membership'); setComplete(false); setMembershipStep('tiers'); setMemConfirmation(null); }}
            style={{ ...styles.toggleBtn, ...(supportType === 'membership' ? styles.toggleBtnActive : {}) }}
          >
            Steward Membership
          </button>
        </div>

        {/* Type 1: Direct Donation */}
        {supportType === 'donate' && (
          <div style={styles.donateLayout}>
            {!complete ? (
              <form className="paper-card animate-fade-in" style={styles.supportCard} onSubmit={handleSupportSubmit}>
                <h3 style={styles.cardHeaderTitle}>{donateSection?.title ?? 'Make a Tax-Deductible Contribution'}</h3>
                
                {/* Frequency */}
                <div style={styles.freqSelector}>
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    style={{ ...styles.freqBtn, ...(frequency === 'one-time' ? styles.freqBtnActive : {}) }}
                  >
                    Give One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    style={{ ...styles.freqBtn, ...(frequency === 'monthly' ? styles.freqBtnActive : {}) }}
                  >
                    Give Monthly
                  </button>
                </div>

                {/* Amount buttons */}
                <div style={styles.amountGrid}>
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setDonateAmount(amt); setCustomAmount(''); }}
                      style={{
                        ...styles.amtBtn,
                        ...(donateAmount === amt ? styles.amtBtnActive : {})
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setDonateAmount('custom')}
                    style={{
                      ...styles.amtBtn,
                      ...(donateAmount === 'custom' ? styles.amtBtnActive : {})
                    }}
                  >
                    Custom
                  </button>
                </div>

                {donateAmount === 'custom' && (
                  <div style={styles.customAmtInputBox} className="animate-fade-in">
                    <span style={styles.dollarSign}>$</span>
                    <input
                      type="number"
                      placeholder="Enter Custom Amount"
                      required
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      style={styles.customInput}
                    />
                  </div>
                )}

                {/* Impact Statement */}
                <div style={styles.impactCard}>
                  <Award size={18} color="var(--tin-rust)" />
                  <div>
                    <h4 style={styles.impactTitle}>{donateSection?.impactTitle ?? 'How Your Gift Helps'}</h4>
                    <p style={styles.impactText}>
                      A gift of <strong>${getActiveAmount() || '0'}</strong> {donateSection?.impactSuffix ?? 'directly supports the preservation of timber frames and restoration of historical furnishings inside our represented ethnic camp cottages.'}
                    </p>
                  </div>
                </div>

                {/* Payment Fields */}
                <div className="ledger-header" style={{ marginTop: '2rem', marginBottom: '1rem' }}>PAYMENT INFO</div>
                <div style={styles.formRow}>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Full Name</label>
                    <input type="text" required style={styles.formInput} />
                  </div>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Email Address</label>
                    <input type="email" required style={styles.formInput} />
                  </div>
                </div>

                <div style={styles.ccFields}>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Card Number</label>
                    <input type="text" placeholder="Card details..." required style={styles.formInput} />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={styles.submitBtn}>
                  <Heart size={16} /> Complete Donation (${getActiveAmount() || '0'})
                </button>
              </form>
            ) : (
              // Success
              <div className="paper-card animate-fade-in" style={styles.successCard}>
                <div style={styles.successIcon}>
                  <Heart size={40} color="white" />
                </div>
                <h2 style={styles.successTitle}>Thank You for Your Stewardship!</h2>
                <p style={styles.successText}>
                  Your tax-deductible donation of <strong>${getActiveAmount()}</strong> has been processed successfully. A formal donor acknowledgement receipt has been sent to your email.
                </p>
                <div style={styles.helpfulCard}>
                  <ShieldCheck size={18} color="var(--cane-green)" />
                  <div>
                    <p style={styles.noteTitle}>Stewardship Circle</p>
                    <p style={styles.noteDesc}>
                      Donors giving more than $100 annually are automatically enrolled in our Friends of the Village donor roster and receive print copies of our quarterly historical circular.
                    </p>
                  </div>
                </div>
                <button className="btn-primary" onClick={() => setComplete(false)}>
                  Make Another Gift
                </button>
              </div>
            )}

            {/* Sidebar impact info */}
            <div style={styles.impactSidebar}>
              <div className="paper-card" style={styles.sideImpactCard}>
                <h3 style={styles.sideImpactTitle}>{impactSidebar?.title ?? 'Annual Support Impact'}</h3>
                <ul style={styles.impactList}>
                  {(donationPresets.length ? donationPresets : [
                    { amount: 25, label: '$25 buys craft supplies and traditional fiber/straw elements for local Obon dance classes.' },
                    { amount: 50, label: '$50 maintains the heritage vegetable gardens surrounding one ethnic camp house for three months.' },
                    { amount: 100, label: '$100 funds free admission and guided worksheets for a class of 10 local public school students.' },
                  ]).map((preset) => (
                    <li key={preset.amount} style={styles.impactListItem}>{preset.label}</li>
                  ))}
                  {impactSidebar?.extraItem && (
                    <li style={styles.impactListItem}>{impactSidebar.extraItem}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Type 2: Membership */}
        {supportType === 'membership' && (
          <div style={styles.membershipSection}>
            {membershipStep === 'done' && memConfirmation?.membership ? (
              <div className="paper-card animate-fade-in" style={styles.successCard}>
                <div style={styles.successIcon}><Award size={40} color="white" /></div>
                <h2 style={styles.successTitle}>Membership Registered!</h2>
                <p style={styles.successText}>
                  Reference <strong>{memConfirmation.membership.referenceId}</strong> — {memConfirmation.membership.tier} level.
                  {memConfirmation.emailSent
                    ? ' Your membership pass and QR code have been emailed.'
                    : ' Registration saved; email delivery failed — contact staff to resend.'}
                </p>
                <QRPass token={memConfirmation.membership.qrToken} label="Membership pass" />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Valid {memConfirmation.membership.startsOn} through {memConfirmation.membership.endsOn}. Payment status: pending.
                </p>
                <button type="button" className="btn-primary" onClick={() => { setMembershipStep('tiers'); setMemConfirmation(null); setSelectedTier(null); }}>
                  Register another membership
                </button>
              </div>
            ) : membershipStep === 'checkout' && selectedTier ? (
              <form className="paper-card animate-fade-in" style={{ ...styles.supportCard, maxWidth: 560, margin: '0 auto' }} onSubmit={handleMembershipSubmit}>
                <button type="button" className="btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => setMembershipStep('tiers')}>← Back to tiers</button>
                <h3 style={styles.cardHeaderTitle}>{selectedTier.level} Membership</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{selectedTier.price} {selectedTier.period} — payment pending until online checkout is enabled.</p>
                {memError && <p role="alert" style={{ color: 'var(--tin-rust)', marginBottom: '1rem', display: 'flex', gap: 8 }}><AlertCircle size={16} />{memError}</p>}
                <div className="form-row-responsive" style={styles.formRow}>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>First name</label>
                    <input className="admin-form-input" required value={memFirstName} onChange={(e) => setMemFirstName(e.target.value)} />
                  </div>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Last name</label>
                    <input className="admin-form-input" required value={memLastName} onChange={(e) => setMemLastName(e.target.value)} />
                  </div>
                </div>
                <div style={styles.formCol}>
                  <label style={styles.formLabel}>Email</label>
                  <input className="admin-form-input" type="email" required value={memEmail} onChange={(e) => setMemEmail(e.target.value)} />
                </div>
                {(selectedTier.slug === 'household' || selectedTier.slug === 'steward') && (
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Household members (optional note)</label>
                    <textarea className="admin-form-textarea" value={householdNote} onChange={(e) => setHouseholdNote(e.target.value)} placeholder="Names of adults and children covered" />
                  </div>
                )}
                <button type="submit" className="btn-primary" style={styles.submitBtn} disabled={memSubmitting}>
                  {memSubmitting ? 'Registering…' : `Complete Registration (${selectedTier.price})`}
                </button>
              </form>
            ) : (
              <>
                <div style={styles.membershipIntro}>
                  <h3 style={styles.subHeadingTitle}>{membershipIntro?.title ?? 'Preserve Heritage, Enjoy Benefits'}</h3>
                  <p style={styles.bodyText}>
                    {membershipIntro?.description ?? 'Select a steward membership tier. Your pass will be registered, emailed with a QR code, and visible in the admin dashboard.'}
                  </p>
                </div>
                <div className="tiers-grid-responsive" style={styles.tiersGrid}>
                  {memberships.map((m) => (
                    <div key={m.slug ?? m.level} className="paper-card" style={styles.tierCard}>
                      <div style={{ ...styles.tierHeader, borderTop: `4px solid ${m.color}` }}>
                        <h4 style={styles.tierLevel}>{m.level}</h4>
                        <div style={styles.priceBlock}>
                          <span style={styles.tierPrice}>{m.price}</span>
                          <span style={styles.tierPeriod}>{m.period}</span>
                        </div>
                      </div>
                      <div className="ledger-divider" />
                      <ul style={styles.benefitsList}>
                        {m.benefits.map((b, bIdx) => (
                          <li key={bIdx} style={styles.benefitItem}><span>✓</span> {b}</li>
                        ))}
                      </ul>
                      <button type="button" className="btn-primary" onClick={() => selectTier(m)} style={styles.selectTierBtn}>
                        Select {m.level} Level <ArrowRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
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
  supportToggle: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '3rem'
  },
  toggleBtn: {
    background: 'none',
    border: '2px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    padding: '0.75rem 1.5rem',
    fontFamily: 'var(--font-typewriter)',
    fontWeight: 'bold',
    fontSize: '1rem',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  toggleBtnActive: {
    backgroundColor: 'var(--cane-green)',
    color: 'white',
    borderColor: 'var(--cane-green)',
    boxShadow: 'var(--shadow-md)'
  },
  donateLayout: {
    display: 'grid',
    gridTemplateColumns: '1.6fr 1fr',
    gap: '3rem',
    maxWidth: '1000px',
    margin: '0 auto',
    alignItems: 'flex-start',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  supportCard: {
    padding: '2rem',
    borderRadius: '4px'
  },
  cardHeaderTitle: {
    fontSize: '1.4rem',
    color: 'var(--koa-wood)',
    marginBottom: '1.5rem'
  },
  freqSelector: {
    display: 'flex',
    gap: '8px',
    marginBottom: '1.5rem'
  },
  freqBtn: {
    background: 'none',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-dark)',
    cursor: 'pointer'
  },
  freqBtnActive: {
    backgroundColor: 'var(--tin-rust)',
    color: 'white',
    borderColor: 'var(--tin-rust)'
  },
  amountGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '1.5rem'
  },
  amtBtn: {
    padding: '0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-dark)'
  },
  amtBtnActive: {
    backgroundColor: 'var(--cane-green)',
    color: 'white',
    borderColor: 'var(--cane-green)'
  },
  customAmtInputBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    marginBottom: '1.5rem'
  },
  dollarSign: {
    fontFamily: 'var(--font-typewriter)',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginRight: '8px',
    color: 'var(--text-muted)'
  },
  customInput: {
    border: 'none',
    outline: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    width: '100%',
    fontFamily: 'var(--font-typewriter)'
  },
  impactCard: {
    display: 'flex',
    gap: '12px',
    backgroundColor: 'var(--paper-dark)',
    padding: '1rem 1.25rem',
    borderLeft: '4px solid var(--tin-rust)',
    borderRadius: '4px',
    alignItems: 'flex-start',
    marginBottom: '2rem'
  },
  impactTitle: {
    fontSize: '0.95rem',
    color: 'var(--tin-rust)',
    fontWeight: 'bold',
    marginBottom: '2px'
  },
  impactText: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    marginBottom: 0
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '1rem'
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '1rem',
    width: '100%'
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
    fontSize: '0.95rem'
  },
  ccFields: {
    border: '1px solid var(--kraft-tan-dark)',
    padding: '1.25rem',
    borderRadius: '4px',
    backgroundColor: 'var(--paper-dark)',
    marginBottom: '2rem'
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center'
  },
  // Success state
  successCard: {
    padding: '3rem 2rem',
    textAlign: 'center',
    borderRadius: '4px'
  },
  successIcon: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'var(--cane-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto'
  },
  successTitle: {
    fontSize: '1.8rem',
    color: 'var(--cane-green)',
    marginBottom: '0.75rem'
  },
  successText: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginBottom: '2rem',
    lineHeight: '1.6'
  },
  helpfulCard: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(27,56,35,0.06)',
    borderLeft: '4px solid var(--cane-green)',
    padding: '1rem',
    textAlign: 'left',
    maxWidth: '450px',
    margin: '0 auto 2rem auto'
  },
  noteTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'var(--cane-green)',
    marginBottom: '2px'
  },
  noteDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4'
  },
  // Sidebar
  impactSidebar: {
    width: '100%'
  },
  sideImpactCard: {
    padding: '1.75rem',
    borderRadius: '4px'
  },
  sideImpactTitle: {
    fontSize: '1.25rem',
    color: 'var(--koa-wood)',
    marginBottom: '1rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '4px'
  },
  impactList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  impactListItem: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: 'var(--text-muted)'
  },
  // Membership Style
  membershipSection: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  membershipIntro: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  subHeadingTitle: {
    fontSize: '1.8rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '0.5rem'
  },
  tiersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    alignItems: 'stretch',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr'
    }
  },
  tierCard: {
    padding: '2rem 1.5rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  tierHeader: {
    paddingTop: '1rem'
  },
  tierLevel: {
    fontSize: '1.5rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '0.5rem'
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px'
  },
  tierPrice: {
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--tin-rust)'
  },
  tierPeriod: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)'
  },
  benefitsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '2rem'
  },
  benefitItem: {
    fontSize: '0.85rem',
    lineHeight: '1.4',
    color: 'var(--text-dark)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  },
  selectTierBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 'auto'
  }
};
