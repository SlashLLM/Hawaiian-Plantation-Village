import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Check, ArrowLeft, ShieldAlert, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppNavigate } from '../../hooks/useAppNavigate.js';
import { createBooking, fetchEventsWithTickets, formatCents } from '../../lib/api.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';
import QRPass from '../../components/QRPass.jsx';
import { usePageSection, useSiteSettings } from '../../context/ContentProvider.jsx';
import { formatEventSchedule } from '../../lib/timeFormat.js';

const slotLabel = (slot) => (typeof slot === 'string' ? slot : slot?.label ?? '');

const todayISO = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const FALLBACK_EVENTS = [
  {
    slug: 'guided-tour',
    title: 'Daily Guided Tour',
    description: 'Walk the village trails with a resident guide.',
    is_special: false,
    start_time: '10:00 AM',
    end_time: '12:00 PM',
    ticket_types: [
      { id: 'adult', slug: 'adult', label: 'General Admission (Adults 13+)', price_cents: 1700 },
      { id: 'local', slug: 'local', label: 'Kamaʻāina / Military / Seniors', price_cents: 1200, requires_id: true },
      { id: 'youth', slug: 'youth', label: 'Youth (Ages 5 – 12)', price_cents: 800 },
      { id: 'child', slug: 'child', label: 'Child (Under 5)', price_cents: 0 },
    ],
    tour_time_slots: [
      { id: 'slot-am', label: '10:00 AM', sort_order: 1 },
      { id: 'slot-noon', label: '12:00 PM', sort_order: 2 },
    ],
  },
  {
    slug: 'obon-festival',
    title: 'Obon Festival & Bon Dance (August 15)',
    description: 'Special event entry with performances and food vouchers.',
    is_special: true,
    event_date: '2026-08-15',
    start_time: '5:00 PM',
    end_time: '9:00 PM',
    ticket_types: [
      { id: 'adult', slug: 'adult', label: 'General Admission (Adults 13+)', price_cents: 1700 },
      { id: 'local', slug: 'local', label: 'Kamaʻāina / Military / Seniors', price_cents: 1200, requires_id: true },
      { id: 'youth', slug: 'youth', label: 'Youth (Ages 5 – 12)', price_cents: 800 },
      { id: 'child', slug: 'child', label: 'Child (Under 5)', price_cents: 0 },
    ],
    tour_time_slots: [
      { id: 'slot-obon', label: '5:00 PM', sort_order: 1 },
    ],
  },
];

const emptyQuantities = (types) =>
  Object.fromEntries((types ?? []).map((t) => [t.slug, 0]));

export default function Tickets() {
  const setActivePage = useAppNavigate();
  const { section: header } = usePageSection('tickets', 'header', {
    stamp: 'REVENUE PLATFORM',
    title: 'Book Tickets',
    subtitle: 'Register your visit — payment is recorded as pending until Stripe or Zeffy is connected.',
  });
  const { settings } = useSiteSettings();
  const donationPresets = settings?.donationPresets ?? [];
  const donationAmounts = useMemo(
    () => (donationPresets.length ? donationPresets.map((p) => p.amount) : [5, 10, 25, 50]),
    [donationPresets],
  );
  const [step, setStep] = useState(1);
  const [events, setEvents] = useState(FALLBACK_EVENTS);
  const [eventSlug, setEventSlug] = useState('guided-tour');
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [selectedTime, setSelectedTime] = useState(() => slotLabel(FALLBACK_EVENTS[0].tour_time_slots[0]));
  const [quantities, setQuantities] = useState(() => emptyQuantities(FALLBACK_EVENTS[0].ticket_types));
  const [addDonation, setAddDonation] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);
  const [joinMembership, setJoinMembership] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchEventsWithTickets()
      .then((data) => { if (data?.length) setEvents(data); })
      .catch(() => {});
  }, []);

  const selectedEvent = useMemo(
    () => events.find((e) => e.slug === eventSlug) ?? events[0],
    [events, eventSlug]
  );

  const ticketTypes = selectedEvent?.ticket_types ?? [];
  const ticketTypeKey = ticketTypes.map((t) => t.slug).join('|');
  const tourTimeOptions = useMemo(
    () => (selectedEvent?.tour_time_slots ?? []).map((slot) => slotLabel(slot)).filter(Boolean),
    [selectedEvent],
  );
  const dateLocked = Boolean(selectedEvent?.event_date);

  useEffect(() => {
    setQuantities(emptyQuantities(selectedEvent?.ticket_types));
  }, [selectedEvent?.slug, ticketTypeKey]);

  useEffect(() => {
    if (selectedEvent?.event_date) {
      setSelectedDate(selectedEvent.event_date);
    }
  }, [selectedEvent?.slug, selectedEvent?.event_date]);

  useEffect(() => {
    if (!tourTimeOptions.length) {
      setSelectedTime('');
      return;
    }
    if (!tourTimeOptions.includes(selectedTime)) {
      setSelectedTime(tourTimeOptions[0]);
    }
  }, [tourTimeOptions, selectedTime]);

  const subtotalCents = useMemo(
    () => ticketTypes.reduce((sum, tt) => sum + tt.price_cents * (quantities[tt.slug] || 0), 0),
    [quantities, ticketTypes],
  );

  const hasSelectedTickets = ticketTypes.some((tt) => (quantities[tt.slug] || 0) > 0);

  const donationCents = addDonation ? Math.round(Number(donationAmount) * 100) : 0;
  const membershipCents = joinMembership ? 4500 : 0;
  const totalCents = subtotalCents + donationCents + membershipCents;

  const setQty = (key, val) => setQuantities((q) => ({ ...q, [key]: Math.max(0, val) }));

  const handleSelectEvent = (ev) => {
    setEventSlug(ev.slug);
    setSelectedDate(ev.event_date || todayISO());
    setQuantities(emptyQuantities(ev.ticket_types));
    const times = (ev.tour_time_slots ?? []).map((slot) => slotLabel(slot)).filter(Boolean);
    setSelectedTime(times[0] ?? '');
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedDate) {
        alert('Please select a visit date.');
        return;
      }
      if (!tourTimeOptions.length || !selectedTime) {
        alert('Please select a guided tour time.');
        return;
      }
    }
    if (step === 2 && !hasSelectedTickets) {
      alert('Please select at least one ticket to proceed.');
      return;
    }
    setStep((s) => s + 1);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const items = ticketTypes
        .filter((tt) => (quantities[tt.slug] || 0) > 0)
        .map((tt) => ({
          ticketTypeId: tt.id,
          quantity: quantities[tt.slug],
        }));

      const payload = {
        eventSlug,
        visitDate: selectedDate,
        visitTime: selectedTime,
        firstName,
        lastName,
        email,
        items,
        donationCents,
        includeMembership: joinMembership,
        membershipTierSlug: 'individual',
      };

      const result = await createBooking(payload);
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.8 } });
      setConfirmation(result);
      setStep(5);
    } catch (err) {
      setError(err.message ?? 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const booking = confirmation?.booking;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className={`ink-stamp ${header?.stampClass ?? 'gold'}`} style={{ marginBottom: '0.5rem' }}>{header?.stamp ?? 'REVENUE PLATFORM'}</span>
          <h1 style={styles.pageTitle}>{header?.title ?? 'Book Tickets'}</h1>
          <p style={styles.pageSubtitle}>{header?.subtitle ?? 'Register your visit — payment is recorded as pending until Stripe or Zeffy is connected.'}</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.wizardLayout}>
          {step < 5 && (
            <div style={styles.stepsBar}>
              {['Experience', 'Quantity', 'Support', 'Checkout'].map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div style={styles.stepLine} />}
                  <div style={{ ...styles.stepNode, ...(step >= i + 1 ? styles.stepNodeActive : {}) }}>
                    <span>{i + 1}</span>
                    <label style={styles.stepLabel}>{label}</label>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="wizard-grid-responsive" style={styles.wizardGrid}>
            <div style={styles.mainPanel}>
              {step === 1 && (
                <div className="paper-card animate-fade-in" style={styles.stepCard}>
                  <h3 style={styles.stepCardTitle}>1. Select Tour Experience</h3>
                  <div style={styles.choiceGroup}>
                    {events.map((ev) => (
                      <div
                        key={ev.slug}
                        onClick={() => handleSelectEvent(ev)}
                        style={{ ...styles.choiceOption, ...(eventSlug === ev.slug ? styles.choiceOptionSelected : {}) }}
                      >
                        <input type="radio" checked={eventSlug === ev.slug} readOnly style={styles.radioInput} />
                        <div>
                          <h4 style={styles.optionTitle}>{ev.title}</h4>
                          {formatEventSchedule(ev) && (
                            <p style={styles.optionSchedule}>{formatEventSchedule(ev)}</p>
                          )}
                          <p style={styles.optionText}>{ev.description || 'No description provided.'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={styles.dateTimeBlock}>
                    <h3 style={styles.subTitle}>Select Date & Guided Tour Time</h3>
                    <div className="form-row-responsive" style={styles.dateGrid}>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={dateLocked ? undefined : todayISO()}
                        readOnly={dateLocked}
                        style={{ ...styles.datePicker, ...(dateLocked ? styles.datePickerLocked : {}) }}
                        aria-label="Visit date"
                      />
                      {tourTimeOptions.length ? (
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          style={styles.timeSelector}
                          aria-label="Guided tour time"
                        >
                          {tourTimeOptions.map((time) => (
                            <option key={time} value={time}>{time} Guided Tour</option>
                          ))}
                        </select>
                      ) : (
                        <p style={{ ...styles.optionText, gridColumn: '1 / -1' }}>
                          No tour times available for this event. Add tour slots in the admin catalog.
                        </p>
                      )}
                    </div>
                    {dateLocked && (
                      <p style={{ ...styles.optionText, marginTop: '0.75rem' }}>
                        This experience is scheduled for {selectedDate}.
                      </p>
                    )}
                  </div>
                  <button
                    className="btn-primary"
                    onClick={handleNextStep}
                    style={styles.nextBtn}
                    disabled={!tourTimeOptions.length || !selectedDate}
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="paper-card animate-fade-in" style={styles.stepCard}>
                  <h3 style={styles.stepCardTitle}>2. Select Ticket Quantities</h3>
                  <div style={styles.qtyList}>
                    {ticketTypes.length === 0 ? (
                      <p style={styles.optionText}>No ticket types available for this event.</p>
                    ) : (
                      ticketTypes.map((tt) => (
                        <div key={tt.slug} style={styles.qtyItem}>
                          <div>
                            <h4 style={styles.qtyTitle}>{tt.label}</h4>
                            <span style={styles.qtyPrice}>{formatCents(tt.price_cents)} each{tt.requires_id ? ' (ID required)' : ''}</span>
                          </div>
                          <div style={styles.counter}>
                            <button type="button" style={styles.counterBtn} onClick={() => setQty(tt.slug, (quantities[tt.slug] || 0) - 1)}>-</button>
                            <span style={styles.counterVal}>{quantities[tt.slug] || 0}</span>
                            <button type="button" style={styles.counterBtn} onClick={() => setQty(tt.slug, (quantities[tt.slug] || 0) + 1)}>+</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div style={styles.btnRow}>
                    <button type="button" className="btn-secondary" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
                    <button type="button" className="btn-primary" onClick={handleNextStep} disabled={ticketTypes.length === 0}>Next Step <ChevronRight size={16} /></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="paper-card animate-fade-in" style={styles.stepCard}>
                  <h3 style={styles.stepCardTitle}>3. Join & Support Hawaiian Plantation Village</h3>
                  <div style={styles.supportBox}>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" checked={joinMembership} onChange={(e) => setJoinMembership(e.target.checked)} style={styles.checkboxInput} />
                      <div>
                        <strong style={{ color: 'var(--koa-wood)' }}>Become a Member (+$45.00)</strong>
                        <p style={styles.optionText}>Individual level — free admission for 1 year and gift shop discount.</p>
                      </div>
                    </label>
                  </div>
                  <div style={styles.supportBox}>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" checked={addDonation} onChange={(e) => setAddDonation(e.target.checked)} style={styles.checkboxInput} />
                      <div>
                        <strong style={{ color: 'var(--tin-rust)' }}>Add a Mission Donation</strong>
                        {addDonation && (
                          <div style={styles.donationSelector}>
                            {donationAmounts.map((amt) => (
                              <button key={amt} type="button" onClick={() => setDonationAmount(amt)} style={{ ...styles.donationBtn, ...(donationAmount === amt ? styles.donationBtnActive : {}) }}>${amt}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                  <div style={styles.btnRow}>
                    <button type="button" className="btn-secondary" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</button>
                    <button type="button" className="btn-primary" onClick={handleNextStep}>Proceed to Checkout <ChevronRight size={16} /></button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <form className="paper-card animate-fade-in" style={styles.stepCard} onSubmit={handleCheckout}>
                  <h3 style={styles.stepCardTitle}>4. Contact & Review</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    No card details are collected yet. Your e-ticket and QR pass will be emailed after registration.
                  </p>
                  {error && (
                    <p role="alert" style={{ color: 'var(--tin-rust)', marginBottom: '1rem', display: 'flex', gap: 8, alignItems: 'center' }}>
                      <AlertCircle size={16} /> {error}
                    </p>
                  )}
                  <div className="form-row-responsive" style={styles.formRow}>
                    <div style={styles.formCol}>
                      <label style={styles.formLabel}>First Name</label>
                      <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.formInput} />
                    </div>
                    <div style={styles.formCol}>
                      <label style={styles.formLabel}>Last Name</label>
                      <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.formInput} />
                    </div>
                  </div>
                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.formInput} />
                  </div>
                  <div style={styles.pendingBox}>
                    <strong>Amount due: {formatCents(totalCents)}</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem' }}>Payment status will be <em>pending</em> until online payment is enabled.</p>
                  </div>
                  <div style={styles.btnRow}>
                    <button type="button" className="btn-secondary" onClick={() => setStep(3)}><ArrowLeft size={16} /> Back</button>
                    <button type="submit" className="btn-primary" disabled={submitting}>
                      {submitting ? 'Registering…' : `Complete Registration (${formatCents(totalCents)})`}
                    </button>
                  </div>
                </form>
              )}

              {step === 5 && booking && (
                <div className="paper-card animate-fade-in" style={styles.completeCard}>
                  <div style={styles.successIcon}><Check size={48} color="white" /></div>
                  <h2 style={styles.successTitle}>Booking Registered!</h2>
                  <p style={styles.successText}>
                    Reference <strong>{booking.reference_id}</strong>.
                    {confirmation.emailSent
                      ? ' Your e-ticket and QR pass have been sent to your email.'
                      : ' Registration saved, but email delivery failed — staff can resend from the admin dashboard.'}
                  </p>
                  <QRPass token={booking.qrToken} label="Excursion pass" />
                  <div style={styles.ticketReceipt}>
                    <div className="ledger-header" style={{ marginBottom: '1rem' }}>REGISTRATION / EXCURSION PASS</div>
                    <div style={styles.receiptRow}><span>Excursion:</span><strong>{confirmation.booking.eventTitle ?? selectedEvent?.title}</strong></div>
                    <div style={styles.receiptRow}><span>Date / Time:</span><strong>{booking.visit_date} @ {booking.visit_time}</strong></div>
                    <div style={styles.receiptRow}><span>Amount due:</span><strong>{formatCents(booking.total_cents)}</strong></div>
                    <div style={styles.receiptRow}><span>Payment:</span><strong>{booking.payment_status}</strong></div>
                  </div>
                  {confirmation.membership && (
                    <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                      Membership registered: {confirmation.membership.referenceId} ({confirmation.membership.tier})
                    </p>
                  )}
                  <div style={styles.helpfulNotes}>
                    <ShieldAlert size={18} color="var(--tin-rust)" />
                    <div>
                      <p style={styles.noteTitle}>Arrival Instructions</p>
                      <p style={styles.noteDesc}>Arrive 15 minutes early. Present this QR code or the email pass at the visitor center.</p>
                    </div>
                  </div>
                  <button type="button" className="btn-primary" onClick={() => setActivePage('home')}>Return to Homepage</button>
                </div>
              )}
            </div>

            {step < 5 && (
              <div style={styles.summarySidebar}>
                <div className="paper-card" style={styles.summaryCard}>
                  <h3 style={styles.summaryTitle}>Booking Summary</h3>
                  <div style={styles.summaryItems}>
                    <div style={styles.summaryRow}><span>{selectedEvent?.title}</span><strong>{selectedDate}</strong></div>
                    {ticketTypes.map((tt) => (quantities[tt.slug] || 0) > 0 && (
                      <div key={tt.slug} style={styles.subItem}>
                        <span>{tt.label} x{quantities[tt.slug]}</span>
                        <span>{formatCents(tt.price_cents * quantities[tt.slug])}</span>
                      </div>
                    ))}
                    {joinMembership && <div style={styles.summaryRow}><span>Individual Membership (1yr)</span><strong>$45.00</strong></div>}
                    {addDonation && <div style={styles.summaryRow}><span>Mission Donation</span><strong>{formatCents(donationCents)}</strong></div>}
                  </div>
                  <div className="ledger-divider" style={{ margin: '1rem 0' }} />
                  <div style={styles.summaryTotalRow}><span>Total Amount</span><strong style={styles.totalPrice}>{formatCents(totalCents)}</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: { paddingBottom: '5rem' },
  headerBlock: { backgroundColor: 'var(--paper-dark)', borderBottom: '1px solid var(--kraft-tan-dark)', padding: '3.5rem 0', marginBottom: '3rem' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' },
  pageTitle: { fontSize: '2.8rem', color: 'var(--koa-wood-dark)', marginBottom: '0.5rem' },
  pageSubtitle: { fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '700px' },
  wizardLayout: { maxWidth: '1000px', margin: '0 auto' },
  stepsBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', padding: '0 2rem' },
  stepNode: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-typewriter)', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' },
  stepNodeActive: { color: 'var(--cane-green)' },
  stepLabel: { fontSize: '0.75rem', textTransform: 'uppercase' },
  stepLine: { height: '2px', backgroundColor: 'var(--kraft-tan-dark)', flex: '1', margin: '0 1rem', transform: 'translateY(-12px)' },
  wizardGrid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' },
  mainPanel: { display: 'flex', flexDirection: 'column' },
  stepCard: { padding: '2rem', borderRadius: '4px' },
  stepCardTitle: { fontSize: '1.5rem', color: 'var(--koa-wood)', marginBottom: '1.5rem' },
  choiceGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  choiceOption: { border: '1px solid var(--kraft-tan-dark)', borderRadius: '4px', padding: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: 'var(--paper-light)' },
  choiceOptionSelected: { borderColor: 'var(--cane-green)', boxShadow: '0 0 0 1px var(--cane-green)', backgroundColor: '#f7faf8' },
  radioInput: { marginTop: '4px', accentColor: 'var(--cane-green)' },
  optionTitle: { fontSize: '1.15rem', color: 'var(--koa-wood)', marginBottom: '4px' },
  optionSchedule: { fontSize: '0.8rem', color: 'var(--tin-rust)', marginBottom: '4px', fontWeight: 600 },
  optionText: { fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' },
  dateTimeBlock: { marginTop: '2rem', marginBottom: '2rem' },
  subTitle: { fontSize: '1.2rem', color: 'var(--koa-wood)', marginBottom: '1rem' },
  dateGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  datePicker: { padding: '0.75rem', border: '1px solid var(--kraft-tan-dark)', borderRadius: '4px', fontFamily: 'var(--font-typewriter)' },
  datePickerLocked: { backgroundColor: 'var(--paper-dark)', cursor: 'default' },
  timeSelector: { padding: '0.75rem', border: '1px solid var(--kraft-tan-dark)', borderRadius: '4px', fontFamily: 'var(--font-typewriter)' },
  nextBtn: { width: '100%', justifyContent: 'center', marginTop: '1rem' },
  qtyList: { display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' },
  qtyItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dotted var(--kraft-tan-dark)', paddingBottom: '1rem' },
  qtyTitle: { fontSize: '1.1rem', color: 'var(--koa-wood)', marginBottom: '2px' },
  qtyPrice: { fontSize: '0.85rem', color: 'var(--text-muted)' },
  counter: { display: 'flex', alignItems: 'center', border: '1px solid var(--kraft-tan-dark)', borderRadius: '4px', overflow: 'hidden' },
  counterBtn: { width: '36px', height: '36px', background: 'var(--paper-dark)', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' },
  counterVal: { width: '40px', textAlign: 'center', fontFamily: 'var(--font-typewriter)', fontWeight: 'bold' },
  btnRow: { display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '1.5rem' },
  supportBox: { border: '1px solid var(--kraft-tan-dark)', borderRadius: '4px', padding: '1.25rem', backgroundColor: '#fffcf7', marginBottom: '1.5rem' },
  checkboxLabel: { display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' },
  checkboxInput: { marginTop: '4px', accentColor: 'var(--cane-green)' },
  donationSelector: { display: 'flex', gap: '8px', marginTop: '12px' },
  donationBtn: { flex: 1, padding: '6px 12px', border: '1px solid var(--kraft-tan-dark)', background: 'white', cursor: 'pointer', fontFamily: 'var(--font-typewriter)' },
  donationBtnActive: { backgroundColor: 'var(--tin-rust)', color: 'white', borderColor: 'var(--tin-rust)' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' },
  formCol: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' },
  formLabel: { fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--koa-wood)' },
  formInput: { padding: '0.75rem', border: '1px solid var(--kraft-tan-dark)', borderRadius: '4px', fontSize: '0.95rem' },
  pendingBox: { border: '1px solid var(--kraft-tan-dark)', padding: '1rem', borderRadius: '4px', backgroundColor: 'var(--paper-dark)', marginBottom: '1rem' },
  completeCard: { padding: '3rem 2rem', textAlign: 'center', borderRadius: '4px' },
  successIcon: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--cane-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' },
  successTitle: { fontSize: '2rem', color: 'var(--cane-green)', marginBottom: '0.75rem' },
  successText: { fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' },
  ticketReceipt: { border: '2px solid var(--koa-wood)', padding: '1.5rem', maxWidth: '450px', margin: '0 auto 2rem auto', textAlign: 'left', backgroundColor: '#fffdfb' },
  receiptRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px dotted var(--kraft-tan-dark)', paddingBottom: '8px', marginBottom: '8px' },
  helpfulNotes: { display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: 'rgba(178,78,44,0.06)', borderLeft: '4px solid var(--tin-rust)', padding: '1rem', maxWidth: '450px', margin: '0 auto 2rem auto', textAlign: 'left' },
  noteTitle: { fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--tin-rust)', marginBottom: '2px' },
  noteDesc: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' },
  summarySidebar: { width: '100%' },
  summaryCard: { padding: '1.75rem', borderRadius: '4px', position: 'sticky', top: '120px' },
  summaryTitle: { fontSize: '1.3rem', color: 'var(--koa-wood)', marginBottom: '1.25rem', borderBottom: '1px solid var(--kraft-tan-dark)', paddingBottom: '4px' },
  summaryItems: { display: 'flex', flexDirection: 'column', gap: '14px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 'bold' },
  subItem: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '12px' },
  summaryTotalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' },
  totalPrice: { fontSize: '1.5rem', color: 'var(--tin-rust)' },
};
