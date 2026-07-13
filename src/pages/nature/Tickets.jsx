import React, { useState } from 'react';
import { Calendar, Ticket, ChevronRight, Check, CreditCard, ArrowLeft, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Tickets({ setActivePage }) {
  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState('guided'); // 'guided' | 'special'
  const [selectedDate, setSelectedDate] = useState('2026-08-15');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  
  // Ticket quantities
  const [qtyAdult, setQtyAdult] = useState(0);
  const [qtyLocal, setQtyLocal] = useState(0);
  const [qtyYouth, setQtyYouth] = useState(0);
  const [qtyChild, setQtyChild] = useState(0);

  // Upsells
  const [addDonation, setAddDonation] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);
  const [joinMembership, setJoinMembership] = useState(false);

  // Ticket prices
  const PRICES = {
    adult: 17,
    local: 12,
    youth: 8,
    child: 0
  };

  const calculateSubtotal = () => {
    return (qtyAdult * PRICES.adult) + 
           (qtyLocal * PRICES.local) + 
           (qtyYouth * PRICES.youth) + 
           (qtyChild * PRICES.child);
  };

  const calculateTotal = () => {
    let total = calculateSubtotal();
    if (addDonation) total += Number(donationAmount);
    if (joinMembership) total += 45; // Individual Membership price
    return total;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (calculateSubtotal() === 0) {
        alert('Please select at least one ticket to proceed.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      confetti({
        particleCount: 140,
        spread: 70,
        origin: { y: 0.6 }
      });
      setStep(5);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setQtyAdult(0);
    setQtyLocal(0);
    setQtyYouth(0);
    setQtyChild(0);
    setAddDonation(false);
    setJoinMembership(false);
  };

  return (
    <div style={styles.pageContainer} className="theme-nature">
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span style={styles.headerBadge}>RESERVATIONS</span>
          <h1 style={styles.pageTitle}>Admissions & Tour Booking</h1>
          <p style={styles.pageSubtitle}>Select your dates, purchase tickets, and request tour slots in our modern sanctuary.</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* Step Indicator */}
        <div style={styles.stepperContainer}>
          {[1, 2, 3, 4, 5].map((s) => (
            <React.Fragment key={s}>
              <div style={{
                ...styles.stepCircle,
                backgroundColor: step >= s ? 'var(--nature-forest)' : '#e5e7eb',
                color: step >= s ? 'var(--nature-mist)' : '#9ca3af'
              }}>
                {step > s ? <Check size={14} /> : s}
              </div>
              {s < 5 && (
                <div style={{
                  ...styles.stepLine,
                  backgroundColor: step > s ? 'var(--nature-forest)' : '#e5e7eb'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={styles.grid}>
          {/* Left Column: Interactive Form steps */}
          <div style={styles.leftCol}>
            <div style={styles.formCard} className="nature-glass-card">
              
              {/* Step 1: Select Tour Type & Date */}
              {step === 1 && (
                <div>
                  <h3 style={styles.stepTitle}>Select Date & Tour Type</h3>
                  <p style={styles.stepDesc}>Tours walk through the village cottages and botanical corridors accompanied by a guide.</p>
                  
                  <div style={styles.tourTypeGrid}>
                    <div 
                      onClick={() => setTicketType('guided')}
                      style={{
                        ...styles.typeCard,
                        borderColor: ticketType === 'guided' ? 'var(--nature-forest)' : 'rgba(71, 118, 82, 0.15)'
                      }}
                      className="nature-glass-card"
                    >
                      <Ticket size={24} color="var(--nature-forest)" />
                      <strong>Guided Tour Experience</strong>
                      <p style={styles.typeText}>Our daily 90-minute tour led by resident docents. Explores historic camp sectors.</p>
                    </div>

                    <div 
                      onClick={() => setTicketType('special')}
                      style={{
                        ...styles.typeCard,
                        borderColor: ticketType === 'special' ? 'var(--nature-forest)' : 'rgba(71, 118, 82, 0.15)'
                      }}
                      className="nature-glass-card"
                    >
                      <Calendar size={24} color="var(--nature-forest)" />
                      <strong>Private Group / School Tour</strong>
                      <p style={styles.typeText}>Custom group options. Ideal for academic projects and groups larger than 10.</p>
                    </div>
                  </div>

                  <div style={styles.divider} />

                  <div style={styles.inputRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Choose Date</label>
                      <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        style={styles.input} 
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Select Departure Time</label>
                      <select 
                        value={selectedTime} 
                        onChange={(e) => setSelectedTime(e.target.value)} 
                        style={styles.select}
                      >
                        <option>10:00 AM guided tour</option>
                        <option>12:00 PM guided tour</option>
                        <option>01:30 PM special tour</option>
                      </select>
                    </div>
                  </div>

                  <button className="nature-btn-accent" style={styles.nextBtn} onClick={handleNextStep}>
                    Select Tickets <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 2: Choose Quantities */}
              {step === 2 && (
                <div>
                  <h3 style={styles.stepTitle}>Choose Quantities</h3>
                  <p style={styles.stepDesc}>Children under 5 must be registered for capacity limits, but admission is free.</p>
                  
                  <div style={styles.quantitiesList}>
                    {/* Adult */}
                    <div style={styles.qtyRow}>
                      <div>
                        <strong>Adult Admission</strong>
                        <p style={styles.qtySub}>Ages 13–61 • General public</p>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyAdult(Math.max(0, qtyAdult - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyAdult}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyAdult(qtyAdult + 1)}>+</button>
                      </div>
                    </div>

                    {/* Local/Military */}
                    <div style={styles.qtyRow}>
                      <div>
                        <strong>Kamaʻāina & Military</strong>
                        <p style={styles.qtySub}>Hawaii ID or active military card required at check-in</p>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyLocal(Math.max(0, qtyLocal - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyLocal}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyLocal(qtyLocal + 1)}>+</button>
                      </div>
                    </div>

                    {/* Youth */}
                    <div style={styles.qtyRow}>
                      <div>
                        <strong>Children (Ages 5–12)</strong>
                        <p style={styles.qtySub}>School-aged children admission</p>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyYouth(Math.max(0, qtyYouth - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyYouth}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyYouth(qtyYouth + 1)}>+</button>
                      </div>
                    </div>

                    {/* Child */}
                    <div style={styles.qtyRow}>
                      <div>
                        <strong>Children Under 5</strong>
                        <p style={styles.qtySub}>Free admission, but registration is required</p>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyChild(Math.max(0, qtyChild - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyChild}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyChild(qtyChild + 1)}>+</button>
                      </div>
                    </div>
                  </div>

                  <div style={styles.btnRow}>
                    <button className="nature-btn-secondary" onClick={handlePrevStep}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button className="nature-btn-accent" onClick={handleNextStep}>
                      Proceed to Add-ons <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Add-ons & Donations */}
              {step === 3 && (
                <div>
                  <h3 style={styles.stepTitle}>Support While Visiting</h3>
                  <p style={styles.stepDesc}>Optional enhancements to support Waipahu's cottage preservation and plant nursery propagation.</p>
                  
                  <div style={styles.addonCard} className="nature-glass-card">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <input 
                        type="checkbox" 
                        checked={addDonation} 
                        onChange={() => setAddDonation(!addDonation)} 
                        style={styles.checkbox}
                      />
                      <div>
                        <strong>Include a Voluntary Donation</strong>
                        <p style={styles.addonText}>Your gift supports general operating funds for historic cottage restoration logs.</p>
                        {addDonation && (
                          <div style={styles.donationPresets}>
                            {[5, 10, 20].map((val) => (
                              <button 
                                key={val}
                                onClick={() => setDonationAmount(val)}
                                style={{
                                  ...styles.presetAmtBtn,
                                  ...(donationAmount === val ? styles.presetAmtActive : {})
                                }}
                              >
                                ${val}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={styles.addonCard} className="nature-glass-card">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <input 
                        type="checkbox" 
                        checked={joinMembership} 
                        onChange={() => setJoinMembership(!joinMembership)} 
                        style={styles.checkbox}
                      />
                      <div>
                        <strong>Join as an Individual Member (+$45)</strong>
                        <p style={styles.addonText}>Enjoy free general admission for 1 year, 10% gift shop discount, and exclusive invitations to archive showcases.</p>
                      </div>
                    </div>
                  </div>

                  <div style={styles.btnRow}>
                    <button className="nature-btn-secondary" onClick={handlePrevStep}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button className="nature-btn-accent" onClick={handleNextStep}>
                      Billing Info <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Checkout details */}
              {step === 4 && (
                <div>
                  <h3 style={styles.stepTitle}>Billing Information</h3>
                  <p style={styles.stepDesc}>Enter card details to complete your admissions transaction securely.</p>
                  
                  <div style={styles.billingForm}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Cardholder Name</label>
                      <input type="text" required placeholder="John Doe" style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Credit Card Number</label>
                      <div style={styles.cardInputWrapper}>
                        <CreditCard size={18} color="#9ca3af" />
                        <input type="text" required placeholder="4111 2222 3333 4444" style={styles.inputCard} />
                      </div>
                    </div>
                    <div style={styles.row}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Expiration</label>
                        <input type="text" required placeholder="MM/YY" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Security CVV</label>
                        <input type="text" required placeholder="123" style={styles.input} />
                      </div>
                    </div>
                  </div>

                  <div style={styles.securityBanner}>
                    <ShieldAlert size={16} color="var(--nature-moss)" />
                    <span>Your transaction is secured by AES-256 financial encryption.</span>
                  </div>

                  <div style={styles.btnRow}>
                    <button className="nature-btn-secondary" onClick={handlePrevStep}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button className="nature-btn-accent" onClick={handleNextStep}>
                      Purchase Tickets (${calculateTotal()})
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Success Receipt */}
              {step === 5 && (
                <div style={styles.successBlock}>
                  <div style={styles.successIconCircle}>
                    <Check size={32} color="var(--nature-mist)" />
                  </div>
                  <h3 style={styles.successTitle}>Admissions Booked!</h3>
                  <p style={styles.successText}>
                    Thank you. Your ticket purchase is complete and confirmation has been logged.
                  </p>
                  
                  <div style={styles.receiptBox} className="nature-glass-card">
                    <h4>RECEIPT SUMMARY</h4>
                    <div style={styles.receiptLine}>
                      <span>Date & Time</span>
                      <strong>{selectedDate} @ {selectedTime}</strong>
                    </div>
                    <div style={styles.receiptLine}>
                      <span>Checkout Total</span>
                      <strong>${calculateTotal()}</strong>
                    </div>
                    <div style={styles.receiptLine}>
                      <span>Transaction Code</span>
                      <code style={styles.code}>HPV-EXHB-9812A</code>
                    </div>
                  </div>

                  <p style={styles.successSubtext}>
                    Please show this screen or the email receipt at the gate to retrieve your bango badges.
                  </p>

                  <div style={styles.btnRow}>
                    <button onClick={handleReset} className="nature-btn-primary">
                      Book Another Visit
                    </button>
                    <button onClick={() => setActivePage('home')} className="nature-btn-secondary">
                      Go to Home
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Dynamic Price Summary */}
          <div style={styles.rightCol}>
            <div style={styles.summaryCard} className="nature-glass-card">
              <span style={styles.summaryBadge}>SUMMARY</span>
              <h3 style={styles.summaryTitle}>Selected Tour</h3>
              
              <div style={styles.summaryDetails}>
                <p>📍 <strong>Waipahu Sanctuary Guided Tour</strong></p>
                <p>📅 {selectedDate}</p>
                <p>🕒 {selectedTime}</p>
              </div>

              {calculateSubtotal() > 0 && (
                <div style={styles.divider} />
              )}

              <div style={styles.summaryPrices}>
                {qtyAdult > 0 && (
                  <div style={styles.priceRow}>
                    <span>Adult Admission (x{qtyAdult})</span>
                    <span>${qtyAdult * PRICES.adult}</span>
                  </div>
                )}
                {qtyLocal > 0 && (
                  <div style={styles.priceRow}>
                    <span>Kamaʻāina / Mil (x{qtyLocal})</span>
                    <span>${qtyLocal * PRICES.local}</span>
                  </div>
                )}
                {qtyYouth > 0 && (
                  <div style={styles.priceRow}>
                    <span>Children (x{qtyYouth})</span>
                    <span>${qtyYouth * PRICES.youth}</span>
                  </div>
                )}
                {qtyChild > 0 && (
                  <div style={styles.priceRow}>
                    <span>Under 5 Free (x{qtyChild})</span>
                    <span>$0</span>
                  </div>
                )}

                {addDonation && (
                  <div style={styles.priceRow}>
                    <span>Sanctuary Contribution</span>
                    <span>${donationAmount}</span>
                  </div>
                )}

                {joinMembership && (
                  <div style={styles.priceRow}>
                    <span>Individual Membership</span>
                    <span>$45</span>
                  </div>
                )}
              </div>

              <div style={styles.divider} />

              <div style={styles.totalRow}>
                <span>Order Total</span>
                <strong>${calculateTotal()}</strong>
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
    marginBottom: '2rem'
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
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '500px',
    margin: '1.5rem auto 3rem auto',
    boxSizing: 'border-box'
  },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.8rem',
    transition: 'all 0.3s ease',
    zIndex: 2
  },
  stepLine: {
    flex: 1,
    height: '2px',
    margin: '0 -2px',
    zIndex: 1,
    transition: 'all 0.3s'
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
  stepTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.5rem'
  },
  stepDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#6b7280',
    marginBottom: '2rem'
  },
  tourTypeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr'
    }
  },
  typeCard: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    cursor: 'pointer',
    border: '2px solid transparent',
    boxShadow: 'none'
  },
  typeText: {
    fontSize: '0.8rem',
    lineHeight: '1.5',
    color: '#4b5563'
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(71, 118, 82, 0.1)',
    margin: '2rem 0'
  },
  inputRow: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '1.25rem'
    }
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
  nextBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  quantitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2.5rem'
  },
  qtyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(71, 118, 82, 0.08)',
    paddingBottom: '1.25rem'
  },
  qtySub: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginTop: '2px'
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: 'rgba(71, 118, 82, 0.05)',
    borderRadius: '30px',
    padding: '4px'
  },
  counterBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(71, 118, 82, 0.15)',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--nature-forest)'
  },
  counterVal: {
    fontSize: '1rem',
    fontWeight: '700',
    minWidth: '20px',
    textAlign: 'center',
    color: 'var(--nature-forest)'
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'space-between'
  },
  addonCard: {
    padding: '1.5rem',
    boxShadow: 'none',
    marginBottom: '1.5rem'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    accentColor: 'var(--nature-forest)',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '2px'
  },
  addonText: {
    fontSize: '0.85rem',
    color: '#6b7280',
    marginTop: '4px',
    lineHeight: '1.4'
  },
  donationPresets: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px'
  },
  presetAmtBtn: {
    padding: '6px 16px',
    borderRadius: '30px',
    border: '1px solid rgba(71, 118, 82, 0.2)',
    backgroundColor: '#ffffff',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--nature-forest)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  presetAmtActive: {
    backgroundColor: 'var(--nature-forest)',
    borderColor: 'var(--nature-forest)',
    color: 'var(--nature-mist)'
  },
  billingForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginBottom: '1.5rem'
  },
  cardInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputCard: {
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(71, 118, 82, 0.2)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    width: '100%',
    fontFamily: 'var(--font-nature-body)'
  },
  securityBanner: {
    backgroundColor: 'rgba(71, 118, 82, 0.05)',
    borderRadius: '12px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    color: 'var(--nature-forest)',
    marginBottom: '2rem'
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
    marginBottom: '1.5rem'
  },
  receiptBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '1.75rem',
    marginBottom: '1.5rem',
    boxShadow: 'none',
    textAlign: 'left'
  },
  receiptLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    borderBottom: '1px solid rgba(71, 118, 82, 0.06)',
    padding: '8px 0',
    color: '#4b5563'
  },
  code: {
    fontFamily: 'monospace',
    color: 'var(--nature-earth)'
  },
  successSubtext: {
    fontSize: '0.8rem',
    color: '#6b7280',
    maxWidth: '320px',
    lineHeight: '1.5',
    marginBottom: '2rem'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  summaryCard: {
    padding: '2rem',
    boxShadow: 'none'
  },
  summaryBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
    display: 'block'
  },
  summaryTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  summaryDetails: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '1.5rem'
  },
  summaryPrices: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: '#4b5563'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    fontSize: '1.05rem',
    color: 'var(--nature-forest)'
  }
};
