import React, { useEffect, useMemo, useState } from 'react';
import { Heart, Award, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import { SITE_PHOTOS } from '../../lib/sitePhotos.js';
import { createMembership, fetchMembershipTiers, formatCents } from '../../lib/api.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';
import QRPass from '../../components/QRPass.jsx';
import { useSiteSettings, usePageSection } from '../../context/ContentProvider.jsx';
import SEO from '../../components/SEO.jsx';

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
      <SEO title="Support the Village" description="Help us preserve Oahu's plantation cottages and share immigration stories for future generations." />
      <PageHeaderParallax
        image={SITE_PHOTOS.headers.support}
        stamp={header?.stamp ?? 'Support the village'}
        title={header?.title ?? 'Keep these houses standing'}
        subtitle={header?.subtitle ?? 'Your gift maintains the cottages, the gardens, and the stories told inside them.'}
      />

      <div style={styles.container}>
        {/* Toggle Support Type */}
        <div style={styles.supportToggle}>
          <button
            onClick={() => { setSupportType('donate'); setComplete(false); }}
            style={{ ...styles.toggleBtn, ...(supportType === 'donate' ? styles.toggleBtnActive : {}) }}
          >
            Give a gift
          </button>
          <button
            onClick={() => { setSupportType('membership'); setComplete(false); setMembershipStep('tiers'); setMemConfirmation(null); }}
            style={{ ...styles.toggleBtn, ...(supportType === 'membership' ? styles.toggleBtnActive : {}) }}
          >
            Become a member
          </button>
        </div>

        {/* Type 1: Direct Donation */}
        {supportType === 'donate' && (
          <div className="content-sidebar-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {!complete ? (
              <form className="paper-card animate-fade-in" style={styles.supportCard} onSubmit={handleSupportSubmit}>
                <h3 style={styles.cardHeaderTitle}>{donateSection?.title ?? 'Make a tax-deductible gift'}</h3>
                
                {/* Frequency */}
                <div style={styles.freqSelector}>
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    style={{ ...styles.freqBtn, ...(frequency === 'one-time' ? styles.freqBtnActive : {}) }}
                  >
                    One time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    style={{ ...styles.freqBtn, ...(frequency === 'monthly' ? styles.freqBtnActive : {}) }}
                  >
                    Monthly
                  </button>
                </div>

                {/* Amount buttons */}
                <div className="amount-grid-responsive" style={styles.amountGrid}>
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
                  <Award size={18} color="var(--terracotta-clay)" />
                  <div>
                    <h4 style={styles.impactTitle}>{donateSection?.impactTitle ?? 'How your gift helps'}</h4>
                    <p style={styles.impactText}>
                      A gift of <strong>${getActiveAmount() || '0'}</strong> {donateSection?.impactSuffix ?? 'directly supports the preservation of timber frames and restoration of historical furnishings inside our represented ethnic camp cottages.'}
                    </p>
                  </div>
                </div>

                {/* Payment Fields */}
                <div className="ledger-header" style={{ marginTop: '2rem', marginBottom: '1rem' }}>PAYMENT</div>
                <div className="form-row-responsive" style={styles.formRow}>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Full name</label>
                    <input type="text" required style={styles.formInput} />
                  </div>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Email address</label>
                    <input type="email" required style={styles.formInput} />
                  </div>
                </div>

                <div style={styles.ccFields}>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Card number</label>
                    <input type="text" placeholder="Card details" required style={styles.formInput} />
                  </div>
                </div>

                <button type="submit" className="btn-clay" style={styles.submitBtn}>
                  <Heart size={16} /> Give ${getActiveAmount() || '0'}
                </button>
              </form>
            ) : (
              // Success
              <div className="paper-card animate-fade-in" style={styles.successCard}>
                <div style={styles.successIcon}>
                  <Heart size={40} color="white" />
                </div>
                <h2 style={styles.successTitle}>Thank you</h2>
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
                <button className="btn-clay" onClick={() => setComplete(false)}>
                  Give again
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
                <div className="tiers-grid-responsive">
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
                      <button type="button" className="btn-secondary" onClick={() => selectTier(m)} style={styles.selectTierBtn}>
                        Choose {m.level} <ArrowRight size={16} />
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
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 4vw, 2.5rem)'
  },
  supportToggle: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)'
  },
  toggleBtn: {
    background: 'none',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.7rem 1.4rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: '0.95rem',
    color: 'var(--muted-sage)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  toggleBtnActive: {
    backgroundColor: 'var(--plantation-ink)',
    color: 'var(--sugarcane-cream)',
    borderColor: 'var(--plantation-ink)',
    fontWeight: 600
  },
  supportCard: {
    padding: 'clamp(1.5rem, 3vw, 2.25rem)'
  },
  cardHeaderTitle: {
    fontSize: '1.5rem',
    fontWeight: 500,
    marginBottom: '1.5rem'
  },
  freqSelector: {
    display: 'flex',
    gap: '8px',
    marginBottom: '1.5rem'
  },
  freqBtn: {
    background: 'none',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    padding: '8px 14px',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    color: 'var(--plantation-ink)',
    cursor: 'pointer'
  },
  freqBtnActive: {
    backgroundColor: 'var(--terracotta-clay)',
    color: 'var(--sugarcane-cream)',
    borderColor: 'var(--terracotta-clay)'
  },
  amountGrid: {
    marginBottom: '1.5rem'
  },
  amtBtn: {
    padding: '0.8rem',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '1.05rem',
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    color: 'var(--plantation-ink)'
  },
  amtBtnActive: {
    backgroundColor: 'var(--plantation-ink)',
    color: 'var(--sugarcane-cream)',
    borderColor: 'var(--plantation-ink)'
  },
  customAmtInputBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--sugarcane-cream)',
    marginBottom: '1.5rem'
  },
  dollarSign: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: '1.15rem',
    marginRight: '8px',
    color: 'var(--muted-sage)'
  },
  customInput: {
    border: 'none',
    outline: 'none',
    fontSize: '1.05rem',
    fontWeight: 600,
    width: '100%',
    background: 'transparent',
    fontFamily: 'var(--font-sans)'
  },
  impactCard: {
    display: 'flex',
    gap: '12px',
    backgroundColor: 'var(--sand)',
    padding: '1.1rem 1.25rem',
    borderLeft: '2px solid var(--terracotta-clay)',
    borderRadius: 'var(--border-radius-md)',
    alignItems: 'flex-start',
    marginBottom: '2rem'
  },
  impactTitle: {
    fontSize: '0.98rem',
    color: 'var(--terracotta-clay-deep)',
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    marginBottom: '4px'
  },
  impactText: {
    fontSize: '0.9rem',
    color: 'var(--muted-sage)',
    lineHeight: '1.6',
    marginBottom: 0
  },
  formRow: {
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
    fontWeight: 600,
    color: 'var(--plantation-ink)'
  },
  formInput: {
    padding: '0.75rem',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: 'var(--sugarcane-cream)'
  },
  ccFields: {
    border: '1px solid var(--hairline)',
    padding: '1.25rem',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'var(--sand)',
    marginBottom: '2rem'
  },
  submitBtn: {
    width: '100%'
  },
  // Success state
  successCard: {
    padding: 'clamp(2.5rem, 5vw, 3rem) 2rem',
    textAlign: 'center'
  },
  successIcon: {
    width: '66px',
    height: '66px',
    borderRadius: '50%',
    backgroundColor: 'var(--terracotta-clay)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto'
  },
  successTitle: {
    fontSize: '1.9rem',
    fontWeight: 500,
    marginBottom: '0.75rem'
  },
  successText: {
    fontSize: '1rem',
    color: 'var(--muted-sage)',
    marginBottom: '2rem',
    lineHeight: '1.7'
  },
  helpfulCard: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    backgroundColor: 'var(--sand)',
    borderLeft: '2px solid var(--plantation-ink)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1rem',
    textAlign: 'left',
    maxWidth: '450px',
    margin: '0 auto 2rem auto'
  },
  noteTitle: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: 'var(--plantation-ink)',
    marginBottom: '4px'
  },
  noteDesc: {
    fontSize: '0.88rem',
    color: 'var(--muted-sage)',
    lineHeight: '1.6'
  },
  // Sidebar
  impactSidebar: {
    width: '100%'
  },
  sideImpactCard: {
    padding: '1.75rem'
  },
  sideImpactTitle: {
    fontSize: '1.25rem',
    fontWeight: 500,
    marginBottom: '1rem',
    borderBottom: '1px solid var(--hairline)',
    paddingBottom: '0.65rem'
  },
  impactList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  impactListItem: {
    fontSize: '0.92rem',
    lineHeight: '1.6',
    color: 'var(--muted-sage)'
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
    fontSize: '1.9rem',
    fontWeight: 500,
    marginBottom: '0.75rem'
  },
  tierCard: {
    padding: '2rem 1.5rem',
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
    fontWeight: 500,
    marginBottom: '0.5rem'
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px'
  },
  tierPrice: {
    fontSize: '2rem',
    fontWeight: 500,
    fontFamily: 'var(--font-display)',
    color: 'var(--terracotta-clay)'
  },
  tierPeriod: {
    fontSize: '0.85rem',
    color: 'var(--muted-sage)'
  },
  benefitsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '2rem'
  },
  benefitItem: {
    fontSize: '0.9rem',
    lineHeight: '1.55',
    color: 'var(--muted-sage)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  },
  selectTierBtn: {
    width: '100%',
    marginTop: 'auto'
  }
};
