import React, { useState } from 'react';
import { Clock, MapPin, Ticket, ParkingCircle, Footprints, ShieldAlert, ArrowRight, Users, Check, Building, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHeaderParallax from '../../components/PageHeaderParallax';
import { parallaxLayers } from '../../assets/parallax';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { usePageSection, useContent } from '../../context/ContentProvider.jsx';
import { VISIT_FAQS } from '../../lib/content/fallbacks.js';

const slotLabel = (slot) => (typeof slot === 'string' ? slot : slot?.label ?? '');

export default function Visit() {
  const setActivePage = useAppNavigate();
  const { section: header } = usePageSection('visit', 'header', {});
  const { section: hoursSection } = usePageSection('visit', 'hours', {});
  const { section: parkingSection } = usePageSection('visit', 'parking', {});
  const { section: safetySection } = usePageSection('visit', 'safety', {});
  const { section: groupSection } = usePageSection('visit', 'group', {});
  const { section: admissionSection } = usePageSection('visit', 'admission', {});
  const { section: faqSection } = usePageSection('visit', 'faq', {});
  const { groupTickets, tourSlots } = useContent();
  const faqs = faqSection?.items?.length ? faqSection.items : VISIT_FAQS;
  const [activeTab, setActiveTab] = useState('hours');

  // Group booking form state
  const [groupComplete, setGroupComplete] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [contactName, setContactName] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [groupType, setGroupType] = useState('Private Group / Friends');
  const [groupDate, setGroupDate] = useState('');
  const [groupEmail, setGroupEmail] = useState('');
  const [groupPhone, setGroupPhone] = useState('');

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 }
    });
    setGroupComplete(true);
  };

  const tourSlotEntries = hoursSection?.tourSlots?.length
    ? hoursSection.tourSlots
    : (tourSlots ?? []).map((slot, idx) => ({
        label: idx === 0 ? 'Morning Tour' : 'Midday Tour',
        time: `${slotLabel(slot)} daily`,
      }));

  return (
    <div style={styles.pageContainer}>
      <PageHeaderParallax
        layers={parallaxLayers.visit}
        stamp={header?.stamp ?? 'Visitor guide'}
        title={header?.title ?? 'Plan your visit'}
        subtitle={header?.subtitle ?? 'Hours, directions, admission, and everything else you need before you walk the village.'}
      />

      <div style={styles.container}>
        <div style={styles.contentGrid}>
          {/* Main info tabs */}
          <div style={styles.leftCol}>
            {/* Tabs Navigation */}
            <div style={styles.tabsHeader}>
              <button
                onClick={() => setActiveTab('hours')}
                style={{ ...styles.tabButton, ...(activeTab === 'hours' ? styles.tabButtonActive : {}) }}
              >
                Hours and tours
              </button>
              <button
                onClick={() => setActiveTab('parking')}
                style={{ ...styles.tabButton, ...(activeTab === 'parking' ? styles.tabButtonActive : {}) }}
              >
                Directions and parking
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                style={{ ...styles.tabButton, ...(activeTab === 'safety' ? styles.tabButtonActive : {}) }}
              >
                Accessibility
              </button>
              <button
                onClick={() => setActiveTab('group')}
                style={{ ...styles.tabButton, ...(activeTab === 'group' ? styles.tabButtonActive : {}) }}
              >
                Group visits
              </button>
            </div>


            {/* Tab: Hours & Tours */}
            {activeTab === 'hours' && (
              <div className="paper-card animate-fade-in" style={styles.tabContentCard}>
                <h3 style={styles.tabTitle}>{hoursSection?.title ?? 'Opening hours'}</h3>
                <div style={styles.infoRow}>
                  <Clock size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>{hoursSection?.schedule ?? 'Tuesday – Saturday: 9:00 AM – 2:00 PM'}</p>
                    <p style={styles.infoDesc}>{hoursSection?.closedNote ?? 'Closed on Sundays, Mondays, and major state holidays.'}</p>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                <h3 style={styles.tabTitle}>Guided tour schedule</h3>
                <p style={styles.bodyText}>
                  {hoursSection?.toursIntro ?? 'To experience the stories fully, we highly recommend taking one of our daily guided tours led by resident docents:'}
                </p>
                <ul style={styles.tourList}>
                  {tourSlotEntries.map((slot) => (
                    <li key={`${slot.label}-${slot.time}`}><strong>{slot.label}:</strong> {slot.time}</li>
                  ))}
                </ul>
                <p style={styles.infoDesc}>
                  {hoursSection?.walkInNote ?? '*Walk-ins are accommodated based on availability. To guarantee your spot, please book tickets online in advance.'}
                </p>
              </div>
            )}

            {/* Tab: Directions & Parking */}
            {activeTab === 'parking' && (
              <div className="paper-card animate-fade-in" style={styles.tabContentCard}>
                <h3 style={styles.tabTitle}>Directions to the village</h3>
                <div style={styles.infoRow}>
                  <MapPin size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>{parkingSection?.address ?? '94-695 Waipahu Street, Waipahu, HI 96797'}</p>
                    <p style={styles.infoDesc}>
                      {parkingSection?.directions ?? 'Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to Exit 8B (Farrington Hwy), then turn right onto Waipahu Depo Road and right onto Waipahu Street.'}
                    </p>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                <h3 style={styles.tabTitle}>Parking</h3>
                <div style={styles.infoRow}>
                  <ParkingCircle size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>{parkingSection?.parkingTitle ?? 'Free Visitor Parking Onsite'}</p>
                    <p style={styles.infoDesc}>
                      {parkingSection?.parkingDesc ?? 'We offer free designated parking for passenger cars, school buses, and tour vans inside our secure lot.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Accessibility & Safety */}
            {activeTab === 'safety' && (
              <div className="paper-card animate-fade-in" style={styles.tabContentCard}>
                <h3 style={styles.tabTitle}>Accessibility support</h3>
                <div style={styles.infoRow}>
                  <Footprints size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>{safetySection?.terrainTitle ?? 'Terrain & Navigation'}</p>
                    <p style={styles.infoDesc}>
                      {safetySection?.terrainDesc ?? 'The Village path is a dirt/gravel trail approximately 0.5 miles long. Comfortable walking shoes are highly recommended. Restrooms are fully ADA-compliant and located in the main visitor courtyard.'}
                    </p>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                <h3 style={styles.tabTitle}>Visitor guidelines</h3>
                <div style={styles.infoRow}>
                  <ShieldAlert size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>{safetySection?.guidelinesTitle ?? 'Preserving Cultural Heritage'}</p>
                    <p style={styles.infoDesc}>
                      {safetySection?.guidelinesDesc ?? 'Please do not climb on historical structures or touch displays marked with preservation tags. Hawaii\'s Plantation Village is a smoke-free facility.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Group Visits */}
            {activeTab === 'group' && (
              <div className="paper-card animate-fade-in" style={styles.tabContentCard}>
                <h3 style={styles.tabTitle}>{groupSection?.title ?? 'Group visits and private tours'}</h3>
                <p style={styles.bodyText}>
                  {groupSection?.intro ?? 'We welcome groups of all sizes, including tour operators, family reunions, historical organizations, and corporate outings. Group admission discounts are available for pre-registered groups of 10 or more.'}
                </p>

                <div style={styles.infoRow}>
                  <Users size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>Group admission rates</p>
                    <div style={{ ...styles.priceList, marginTop: '8px', width: '100%', maxWidth: '380px' }}>
                      {(groupTickets ?? []).map((ticket) => (
                        <div key={ticket.slug} style={styles.priceItem}><span>{ticket.label}</span><strong>{ticket.priceDisplay ?? `$${(ticket.priceCents / 100).toFixed(2)}`}</strong></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                <h3 style={styles.tabTitle}>Commercial tour operators</h3>
                <div style={styles.infoRow}>
                  <Building size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>{groupSection?.commercialTitle ?? 'Operator scheduling and access'}</p>
                    <p style={styles.infoDesc}>
                      {groupSection?.commercialDesc ?? 'We work closely with local and international tour operators. Commercial bus parking is available onsite. Bookings must be requested at least 14 days in advance to guarantee an exclusive docent guide.'}
                    </p>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                {/* Inquiry Form */}
                {!groupComplete ? (
                  <form style={styles.groupInquiryForm} onSubmit={handleGroupSubmit}>
                    <h3 style={styles.tabSubTitle}>Group reservation inquiry</h3>
                    <p style={{ ...styles.infoDesc, marginBottom: '1.25rem' }}>
                      Submit your details, and our group booking coordinator will follow up with scheduling options and payment instructions within 1 business day.
                    </p>


                    <div style={styles.formRow}>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Organization or group name</label>
                        <input
                          type="text"
                          required
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                          style={styles.formInput}
                          placeholder="e.g. Aloha Travel Club"
                        />
                      </div>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Contact person</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          style={styles.formInput}
                          placeholder="First and Last Name"
                        />
                      </div>
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Estimated group size</label>
                        <input
                          type="number"
                          required
                          min="10"
                          value={groupSize}
                          onChange={(e) => setGroupSize(e.target.value)}
                          style={styles.formInput}
                          placeholder="Minimum 10"
                        />
                      </div>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Group type</label>
                        <select
                          value={groupType}
                          onChange={(e) => setGroupType(e.target.value)}
                          style={styles.formInput}
                        >
                          {(groupSection?.groupTypes ?? [
                            'Private Group / Friends',
                            'Tour Operator / Business',
                            'Corporate / Company',
                            'Historical / Cultural Club',
                            'Senior Citizen Center',
                          ]).map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Preferred date</label>
                        <input
                          type="date"
                          required
                          value={groupDate}
                          onChange={(e) => setGroupDate(e.target.value)}
                          style={styles.formInput}
                        />
                      </div>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Contact email</label>
                        <input
                          type="email"
                          required
                          value={groupEmail}
                          onChange={(e) => setGroupEmail(e.target.value)}
                          style={styles.formInput}
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div style={{ ...styles.formCol, marginBottom: '1.5rem' }}>
                      <label style={styles.formLabel}>Contact phone number</label>

                      <input
                        type="tel"
                        required
                        value={groupPhone}
                        onChange={(e) => setGroupPhone(e.target.value)}
                        style={styles.formInput}
                        placeholder="(808) 555-0100"
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                      Send inquiry <ArrowRight size={16} />
                    </button>
                  </form>
                ) : (
                  <div style={styles.groupSuccessBlock} className="animate-fade-in">
                    <div style={styles.successIcon}>
                      <Check size={28} color="white" />
                    </div>
                    <h4 style={styles.successTitle}>Inquiry sent</h4>
                    <p style={{ ...styles.infoDesc, textAlign: 'center', marginBottom: '1.5rem' }}>
                      Thank you for contacting us. We have received your request for <strong>{groupName}</strong> ({groupSize} visitors) for <strong>{groupDate}</strong>.
                    </p>
                    <div style={styles.receiptSummary}>
                      <div className="ledger-header" style={{ marginBottom: '0.75rem' }}>INQUIRY RECEIPT</div>
                      <div style={styles.receiptRow}><span>Type:</span><strong>{groupType}</strong></div>
                      <div style={styles.receiptRow}><span>Contact:</span><strong>{contactName}</strong></div>
                      <div style={styles.receiptRow}><span>Email/Phone:</span><strong>{groupEmail} / {groupPhone}</strong></div>
                    </div>
                    <button className="btn-secondary" onClick={() => setGroupComplete(false)} style={{ width: '100%' }}>
                      Send another inquiry
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* FAQs */}
            <div style={styles.faqSection}>
              <h3 style={styles.faqHeaderTitle}>{faqSection?.title ?? 'Common questions'}</h3>
              <div style={styles.faqList}>
                {faqs.map((faq, idx) => (
                  <div key={faq.q ?? idx} style={styles.faqItem}>
                    <h4 style={styles.faqQuestion}>{faq.q}</h4>
                    <p style={styles.faqAnswer}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar: Ticket CTA block */}
          <div style={styles.rightCol}>
            <div className="paper-card" style={styles.ctaCard}>
              <div style={styles.priceHeader}>
                <Ticket size={22} color="var(--heritage-gold)" />
                <h3 style={styles.ctaCardTitle}>{admissionSection?.title ?? 'Admission'}</h3>
              </div>
              <p style={styles.ctaCardText}>
                {admissionSection?.description ?? 'Secure your tickets online to guarantee your guided tour slot and skip the check-in queue at the visitor center desk.'}
              </p>
              
              <div style={styles.priceList}>
                {(admissionSection?.rates?.length
                  ? admissionSection.rates
                  : [
                      { label: 'Adults (13+)', price: '$17.00' },
                      { label: 'Kamaʻāina / Military (with ID)', price: '$12.00' },
                      { label: 'Seniors (62+)', price: '$12.00' },
                      { label: 'Youth (5 - 12)', price: '$8.00' },
                      { label: 'Child (Under 5)', price: 'Free' },
                    ]
                ).map((rate) => (
                  <div key={rate.label} style={styles.priceItem}>
                    <span>{rate.label}</span>
                    <strong>{rate.price}</strong>
                  </div>
                ))}
              </div>

              <button
                className="btn-accent"
                onClick={() => setActivePage(admissionSection?.buttonPage ?? 'tickets')}
                style={styles.bookBtn}
              >
                {admissionSection?.buttonLabel ?? 'Get tickets'} <ArrowRight size={16} />
              </button>
            </div>

            {/* School tours CTA */}
            <div className="paper-card" style={{ ...styles.ctaCard, marginTop: '1.5rem' }}>
              <h4 style={styles.schoolTitle}>{admissionSection?.schoolCta?.title ?? 'Bringing a school group?'}</h4>
              <p style={styles.schoolText}>
                {admissionSection?.schoolCta?.description ?? 'We host educational class visits Tuesday through Friday. Learn about specialized curriculum programs and discounted school group pricing.'}
              </p>
              <button className="btn-secondary" onClick={() => setActivePage(admissionSection?.schoolCta?.page ?? 'learn')} style={styles.schoolBtn}>
                {admissionSection?.schoolCta?.buttonLabel ?? 'School Field Trips'}
              </button>
            </div>

            {/* General Group visits CTA */}
            <div className="paper-card" style={{ ...styles.ctaCard, marginTop: '1.5rem' }}>
              <h4 style={styles.schoolTitle}>{admissionSection?.groupCta?.title ?? 'Private and commercial groups'}</h4>
              <p style={styles.schoolText}>
                {admissionSection?.groupCta?.description ?? 'Are you organizing a tour operator, family reunion, or corporate event for 10+ people? Get special rates and a dedicated guide.'}
              </p>
              <button className="btn-secondary" onClick={() => setActiveTab('group')} style={styles.schoolBtn}>
                {admissionSection?.groupCta?.buttonLabel ?? 'Group Admission Rates'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    paddingBottom: 'clamp(3.5rem, 8vw, 6rem)'
  },
  container: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 4vw, 2.5rem)'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.7fr) minmax(280px, 1fr)',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'start',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },
  tabsHeader: {
    display: 'flex',
    borderBottom: '1px solid var(--hairline)',
    gap: '4px',
    marginBottom: '2rem',
    overflowX: 'auto'
  },
  tabButton: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--muted-sage)',
    cursor: 'pointer',
    padding: '0.75rem 1rem',
    borderBottom: '2px solid transparent',
    whiteSpace: 'nowrap'
  },
  tabButtonActive: {
    color: 'var(--plantation-ink)',
    fontWeight: '600',
    borderBottom: '2px solid var(--heritage-gold)'
  },
  tabContentCard: {
    padding: 'clamp(1.5rem, 3vw, 2.25rem)'
  },
  tabTitle: {
    fontSize: '1.45rem',
    fontWeight: 500,
    marginBottom: '1rem'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginTop: '0.5rem'
  },
  infoValue: {
    fontSize: '1.02rem',
    fontWeight: 600,
    color: 'var(--plantation-ink)',
    marginBottom: '4px'
  },
  infoDesc: {
    fontSize: '0.95rem',
    color: 'var(--muted-sage)',
    lineHeight: '1.65'
  },
  tourList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
    fontSize: '0.98rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  bodyText: {
    fontSize: '0.98rem',
    color: 'var(--muted-sage)',
    lineHeight: 1.7,
    marginBottom: '1rem'
  },
  faqSection: {
    marginTop: 'clamp(3rem, 6vw, 4.5rem)'
  },
  faqHeaderTitle: {
    fontSize: '1.9rem',
    fontWeight: 500,
    marginBottom: '1.75rem'
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column'
  },
  faqItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '1.5rem 0',
    borderTop: '1px solid var(--hairline)'
  },
  faqQuestion: {
    fontSize: '1.1rem',
    fontWeight: 500,
    fontFamily: 'var(--font-display)'
  },
  faqAnswer: {
    fontSize: '0.95rem',
    color: 'var(--muted-sage)',
    lineHeight: '1.65',
    maxWidth: '62ch'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: '5.5rem'
  },
  ctaCard: {
    padding: 'clamp(1.5rem, 3vw, 2rem)'
  },
  priceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1rem'
  },
  ctaCardTitle: {
    fontSize: '1.35rem',
    fontWeight: 500
  },
  ctaCardText: {
    fontSize: '0.95rem',
    color: 'var(--muted-sage)',
    marginBottom: '1.5rem',
    lineHeight: '1.65'
  },
  priceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '2rem'
  },
  priceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    fontSize: '0.95rem',
    borderBottom: '1px solid var(--hairline)',
    paddingBottom: '8px',
    color: 'var(--plantation-ink)'
  },
  bookBtn: {
    width: '100%'
  },
  schoolTitle: {
    fontSize: '1.2rem',
    fontWeight: 500,
    marginBottom: '0.5rem'
  },
  schoolText: {
    fontSize: '0.92rem',
    color: 'var(--muted-sage)',
    lineHeight: '1.6',
    marginBottom: '1.25rem'
  },
  schoolBtn: {
    width: '100%'
  },
  groupInquiryForm: {
    marginTop: '2rem',
    padding: 'clamp(1.5rem, 3vw, 2rem)',
    border: '1px solid var(--hairline)',
    backgroundColor: 'var(--sand)',
    borderRadius: 'var(--border-radius-md)',
    textAlign: 'left'
  },
  tabSubTitle: {
    fontSize: '1.25rem',
    fontWeight: 500,
    marginBottom: '0.5rem'
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
    width: '100%',
    marginBottom: '1rem'
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
  groupSuccessBlock: {
    marginTop: '2rem',
    padding: 'clamp(2rem, 4vw, 2.5rem) 1.5rem',
    textAlign: 'center',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--hairline)',
    backgroundColor: 'var(--sand)'
  },
  successIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    backgroundColor: 'var(--plantation-ink)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem auto'
  },
  successTitle: {
    fontSize: '1.5rem',
    fontWeight: 500,
    marginBottom: '0.5rem'
  },
  receiptSummary: {
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1.25rem',
    textAlign: 'left',
    backgroundColor: 'var(--sugarcane-cream)',
    marginBottom: '1.5rem'
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    fontSize: '0.88rem',
    borderBottom: '1px solid var(--hairline)',
    paddingBottom: '6px',
    marginBottom: '6px'
  }
};
