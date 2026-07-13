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
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.8 }
    });
    setStep(5);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className="ink-stamp gold" style={{ marginBottom: '0.5rem' }}>REVENUE PLATFORM</span>
          <h1 style={styles.pageTitle}>Book Tickets</h1>
          <p style={styles.pageSubtitle}>Support our cultural preservation mission by visiting the village.</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.wizardLayout}>
          {/* Step Indicator */}
          {step < 5 && (
            <div style={styles.stepsBar}>
              <div style={{ ...styles.stepNode, ...(step >= 1 ? styles.stepNodeActive : {}) }}>
                <span>1</span>
                <label style={styles.stepLabel}>Experience</label>
              </div>
              <div style={styles.stepLine} />
              <div style={{ ...styles.stepNode, ...(step >= 2 ? styles.stepNodeActive : {}) }}>
                <span>2</span>
                <label style={styles.stepLabel}>Quantity</label>
              </div>
              <div style={styles.stepLine} />
              <div style={{ ...styles.stepNode, ...(step >= 3 ? styles.stepNodeActive : {}) }}>
                <span>3</span>
                <label style={styles.stepLabel}>Support</label>
              </div>
              <div style={styles.stepLine} />
              <div style={{ ...styles.stepNode, ...(step >= 4 ? styles.stepNodeActive : {}) }}>
                <span>4</span>
                <label style={styles.stepLabel}>Checkout</label>
              </div>
            </div>
          )}

          {/* Form Side */}
          <div style={styles.wizardGrid}>
            <div style={styles.mainPanel}>
              {step === 1 && (
                <div className="paper-card animate-fade-in" style={styles.stepCard}>
                  <h3 style={styles.stepCardTitle}>1. Select Tour Experience</h3>
                  <div style={styles.choiceGroup}>
                    <div
                      onClick={() => setTicketType('guided')}
                      style={{ ...styles.choiceOption, ...(ticketType === 'guided' ? styles.choiceOptionSelected : {}) }}
                    >
                      <input type="radio" checked={ticketType === 'guided'} readOnly style={styles.radioInput} />
                      <div>
                        <h4 style={styles.optionTitle}>Daily Guided Tour</h4>
                        <p style={styles.optionText}>
                          Walk the village trails with a resident guide. Explore restored camp structures and hear stories of wave immigration. Includes entry to museum galleries.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setTicketType('special')}
                      style={{ ...styles.choiceOption, ...(ticketType === 'special' ? styles.choiceOptionSelected : {}) }}
                    >
                      <input type="radio" checked={ticketType === 'special'} readOnly style={styles.radioInput} />
                      <div>
                        <h4 style={styles.optionTitle}>Obon Festival & Bon Dance (August 15)</h4>
                        <p style={styles.optionText}>
                          Includes special event entry, traditional performances, temple dancing access, and food court entry vouchers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={styles.dateTimeBlock}>
                    <h3 style={styles.subTitle}>Select Date & Guided Tour Time</h3>
                    <div style={styles.dateGrid}>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={styles.datePicker}
                      />
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        style={styles.timeSelector}
                      >
                        <option value="10:00 AM">10:00 AM Guided Tour</option>
                        <option value="12:00 PM">12:00 PM Guided Tour</option>
                      </select>
                    </div>
                  </div>

                  <button className="btn-primary" onClick={handleNextStep} style={styles.nextBtn}>
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="paper-card animate-fade-in" style={styles.stepCard}>
                  <h3 style={styles.stepCardTitle}>2. Select Ticket Quantities</h3>
                  
                  <div style={styles.qtyList}>
                    <div style={styles.qtyItem}>
                      <div>
                        <h4 style={styles.qtyTitle}>General Admission (Adults 13+)</h4>
                        <span style={styles.qtyPrice}>$17.00 each</span>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyAdult(Math.max(0, qtyAdult - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyAdult}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyAdult(qtyAdult + 1)}>+</button>
                      </div>
                    </div>

                    <div style={styles.qtyItem}>
                      <div>
                        <h4 style={styles.qtyTitle}>Kamaʻāina / Military / Seniors</h4>
                        <span style={styles.qtyPrice}>$12.00 each (ID required at check-in)</span>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyLocal(Math.max(0, qtyLocal - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyLocal}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyLocal(qtyLocal + 1)}>+</button>
                      </div>
                    </div>

                    <div style={styles.qtyItem}>
                      <div>
                        <h4 style={styles.qtyTitle}>Youth (Ages 5 – 12)</h4>
                        <span style={styles.qtyPrice}>$8.00 each</span>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyYouth(Math.max(0, qtyYouth - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyYouth}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyYouth(qtyYouth + 1)}>+</button>
                      </div>
                    </div>

                    <div style={styles.qtyItem}>
                      <div>
                        <h4 style={styles.qtyTitle}>Child (Under 5)</h4>
                        <span style={styles.qtyPrice}>Free</span>
                      </div>
                      <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setQtyChild(Math.max(0, qtyChild - 1))}>-</button>
                        <span style={styles.counterVal}>{qtyChild}</span>
                        <button style={styles.counterBtn} onClick={() => setQtyChild(qtyChild + 1)}>+</button>
                      </div>
                    </div>
                  </div>

                  <div style={styles.btnRow}>
                    <button className="btn-secondary" onClick={handlePrevStep}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button className="btn-primary" onClick={handleNextStep}>
                      Next Step <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="paper-card animate-fade-in" style={styles.stepCard}>
                  <h3 style={styles.stepCardTitle}>3. Join & Support Hawaiian Plantation Village</h3>
                  <p style={styles.bodyText}>
                    As a small non-profit organization, we rely heavily on community stewardship. Consider converting your visit into deeper belonging:
                  </p>

                  <div style={styles.supportBox}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={joinMembership}
                        onChange={(e) => setJoinMembership(e.target.checked)}
                        style={styles.checkboxInput}
                      />
                      <div>
                        <strong style={{ color: 'var(--koa-wood)' }}>Become a Member (+$45.00)</strong>
                        <p style={styles.optionText}>
                          Join at the Individual Level today. Enjoy free admission for 1 year, 10% off at the gift shop, and exclusive invitations to lectures and archives events.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div style={styles.supportBox}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={addDonation}
                        onChange={(e) => setAddDonation(e.target.checked)}
                        style={styles.checkboxInput}
                      />
                      <div>
                        <strong style={{ color: 'var(--tin-rust)' }}>Add a Mission Donation</strong>
                        <p style={styles.optionText}>
                          Help preserve our collection of 19th-century immigrant tools, diaries, and structure timbers.
                        </p>
                        {addDonation && (
                          <div style={styles.donationSelector}>
                            {[5, 10, 25, 50].map((amt) => (
                              <button
                                key={amt}
                                onClick={() => setDonationAmount(amt)}
                                style={{
                                  ...styles.donationBtn,
                                  ...(donationAmount === amt ? styles.donationBtnActive : {})
                                }}
                              >
                                ${amt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  <div style={styles.btnRow}>
                    <button className="btn-secondary" onClick={handlePrevStep}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button className="btn-primary" onClick={handleNextStep}>
                      Proceed to Checkout <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <form className="paper-card animate-fade-in" style={styles.stepCard} onSubmit={handleCheckout}>
                  <h3 style={styles.stepCardTitle}>4. Payment Information</h3>
                  
                  <div style={styles.formRow}>
                    <div style={styles.formCol}>
                      <label style={styles.formLabel}>First Name</label>
                      <input type="text" required style={styles.formInput} />
                    </div>
                    <div style={styles.formCol}>
                      <label style={styles.formLabel}>Last Name</label>
                      <input type="text" required style={styles.formInput} />
                    </div>
                  </div>

                  <div style={styles.formCol}>
                    <label style={styles.formLabel}>Email Address</label>
                    <input type="email" required style={styles.formInput} />
                  </div>

                  <div style={styles.creditCardBox}>
                    <div style={styles.ccHeader}>
                      <CreditCard size={18} />
                      <span>Credit Card / Debit Card Details</span>
                    </div>
                    <div style={styles.formCol}>
                      <label style={styles.formLabel}>Card Number</label>
                      <input type="text" placeholder="1234 5678 9101 1121" required style={styles.formInput} />
                    </div>
                    <div style={styles.formRow}>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Expiration Date</label>
                        <input type="text" placeholder="MM/YY" required style={styles.formInput} />
                      </div>
                      <div style={styles.formCol}>
                        <label style={styles.formLabel}>Security Code (CVC)</label>
                        <input type="text" placeholder="123" required style={styles.formInput} />
                      </div>
                    </div>
                  </div>

                  <div style={styles.btnRow}>
                    <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button type="submit" className="btn-primary">
                      Complete Transaction (${calculateTotal().toFixed(2)})
                    </button>
                  </div>
                </form>
              )}

              {step === 5 && (
                <div className="paper-card animate-fade-in" style={styles.completeCard}>
                  <div style={styles.successIcon}>
                    <Check size={48} color="white" />
                  </div>
                  <h2 style={styles.successTitle}>Booking Confirmed!</h2>
                  <p style={styles.successText}>
                    Thank you for your booking and support of Hawaiian Plantation Village. A receipt and digital ticket barcode have been sent to your email.
                  </p>

                  <div style={styles.ticketReceipt}>
                    <div className="ledger-header" style={{ marginBottom: '1rem' }}>RECEIPT / EXCURSION PASS</div>
                    <div style={styles.receiptRow}>
                      <span>Excursion Type:</span>
                      <strong>{ticketType === 'guided' ? 'Daily Guided Tour' : 'Obon Festival Entry'}</strong>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>Date / Time:</span>
                      <strong>{selectedDate} @ {selectedTime}</strong>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>Total Paid:</span>
                      <strong>${calculateTotal().toFixed(2)}</strong>
                    </div>
                    <div style={styles.receiptRow}>
                      <span>Stewardship ID:</span>
                      <strong>HPV-{Math.floor(100000 + Math.random() * 900000)}</strong>
                    </div>
                  </div>

                  <div style={styles.helpfulNotes}>
                    <ShieldAlert size={18} color="var(--tin-rust)" />
                    <div>
                      <p style={styles.noteTitle}>Arrival Instructions</p>
                      <p style={styles.noteDesc}>
                        Please arrive 15 minutes before your scheduled guided tour time and check-in at the visitor center courtyard. Print or present this pass on your mobile device.
                      </p>
                    </div>
                  </div>

                  <button className="btn-primary" onClick={() => setActivePage('home')}>
                    Return to Homepage
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            {step < 5 && (
              <div style={styles.summarySidebar}>
                <div className="paper-card" style={styles.summaryCard}>
                  <h3 style={styles.summaryTitle}>Booking Summary</h3>
                  <div style={styles.summaryItems}>
                    {ticketType === 'guided' ? (
                      <div style={styles.summaryRow}>
                        <span>Guided Tour Excursion</span>
                        <strong>{selectedDate}</strong>
                      </div>
                    ) : (
                      <div style={styles.summaryRow}>
                        <span>Obon Festival Event Entry</span>
                        <strong>{selectedDate}</strong>
                      </div>
                    )}
                    
                    {calculateSubtotal() > 0 && (
                      <div style={styles.summarySubItems}>
                        {qtyAdult > 0 && <div style={styles.subItem}><span>Adult Ticket x{qtyAdult}</span><span>${(qtyAdult * PRICES.adult).toFixed(2)}</span></div>}
                        {qtyLocal > 0 && <div style={styles.subItem}><span>Kamaʻāina x{qtyLocal}</span><span>${(qtyLocal * PRICES.local).toFixed(2)}</span></div>}
                        {qtyYouth > 0 && <div style={styles.subItem}><span>Youth x{qtyYouth}</span><span>${(qtyYouth * PRICES.youth).toFixed(2)}</span></div>}
                        {qtyChild > 0 && <div style={styles.subItem}><span>Child x{qtyChild}</span><span>$0.00</span></div>}
                      </div>
                    )}

                    {joinMembership && (
                      <div style={styles.summaryRow}>
                        <span>Steward Membership (1yr)</span>
                        <strong>$45.00</strong>
                      </div>
                    )}

                    {addDonation && (
                      <div style={styles.summaryRow}>
                        <span>Mission Preservation Gift</span>
                        <strong>${Number(donationAmount).toFixed(2)}</strong>
                      </div>
                    )}
                  </div>

                  <div style={styles.ledgerDivider} className="ledger-divider" />
                  
                  <div style={styles.summaryTotalRow}>
                    <span>Total Amount</span>
                    <strong style={styles.totalPrice}>${calculateTotal().toFixed(2)}</strong>
                  </div>
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
  wizardLayout: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  stepsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
    padding: '0 2rem',
    '@media (max-width: 600px)': {
      padding: 0
    }
  },
  stepNode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)'
  },
  stepNodeActive: {
    color: 'var(--cane-green)'
  },
  stepLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase'
  },
  stepLine: {
    height: '2px',
    backgroundColor: 'var(--kraft-tan-dark)',
    flex: '1',
    margin: '0 1rem',
    transform: 'translateY(-12px)'
  },
  wizardGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '2.5rem',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr'
    }
  },
  mainPanel: {
    display: 'flex',
    flexDirection: 'column'
  },
  stepCard: {
    padding: '2rem',
    borderRadius: '4px'
  },
  stepCardTitle: {
    fontSize: '1.5rem',
    color: 'var(--koa-wood)',
    marginBottom: '1.5rem'
  },
  choiceGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  choiceOption: {
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    padding: '1.25rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    transition: 'all 0.2s ease',
    backgroundColor: 'var(--paper-light)'
  },
  choiceOptionSelected: {
    borderColor: 'var(--cane-green)',
    boxShadow: '0 0 0 1px var(--cane-green)',
    backgroundColor: '#f7faf8'
  },
  radioInput: {
    marginTop: '4px',
    accentColor: 'var(--cane-green)'
  },
  optionTitle: {
    fontSize: '1.15rem',
    color: 'var(--koa-wood)',
    marginBottom: '4px'
  },
  optionText: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  },
  dateTimeBlock: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  subTitle: {
    fontSize: '1.2rem',
    color: 'var(--koa-wood)',
    marginBottom: '1rem'
  },
  dateGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr'
    }
  },
  datePicker: {
    padding: '0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    outline: 'none',
    fontFamily: 'var(--font-typewriter)'
  },
  timeSelector: {
    padding: '0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    outline: 'none',
    fontFamily: 'var(--font-typewriter)'
  },
  nextBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  qtyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  qtyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px dotted var(--kraft-tan-dark)',
    paddingBottom: '1rem'
  },
  qtyTitle: {
    fontSize: '1.1rem',
    color: 'var(--koa-wood)',
    marginBottom: '2px'
  },
  qtyPrice: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)'
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  counterBtn: {
    width: '36px',
    height: '36px',
    background: 'var(--paper-dark)',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1.2rem'
  },
  counterVal: {
    width: '40px',
    textAlign: 'center',
    fontFamily: 'var(--font-typewriter)',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '1.5rem'
  },
  supportBox: {
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    padding: '1.25rem',
    backgroundColor: '#fffcf7',
    marginBottom: '1.5rem'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    cursor: 'pointer'
  },
  checkboxInput: {
    marginTop: '4px',
    accentColor: 'var(--cane-green)'
  },
  donationSelector: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px'
  },
  donationBtn: {
    flex: 1,
    padding: '6px 12px',
    border: '1px solid var(--kraft-tan-dark)',
    background: 'white',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-typewriter)'
  },
  donationBtnActive: {
    backgroundColor: 'var(--tin-rust)',
    color: 'white',
    borderColor: 'var(--tin-rust)'
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
    marginBottom: '1rem'
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
  creditCardBox: {
    border: '1px solid var(--kraft-tan-dark)',
    padding: '1.5rem',
    borderRadius: '4px',
    backgroundColor: 'var(--paper-dark)',
    marginBottom: '1.5rem'
  },
  ccHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'var(--koa-wood)',
    marginBottom: '1.25rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '6px'
  },
  completeCard: {
    padding: '3rem 2rem',
    textAlign: 'center',
    borderRadius: '4px'
  },
  successIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--cane-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto',
    boxShadow: '0 4px 10px rgba(27,56,35,0.2)'
  },
  successTitle: {
    fontSize: '2rem',
    color: 'var(--cane-green)',
    marginBottom: '0.75rem'
  },
  successText: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginBottom: '2rem',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  ticketReceipt: {
    border: '2px solid var(--koa-wood)',
    padding: '1.5rem',
    maxWidth: '450px',
    margin: '0 auto 2rem auto',
    textAlign: 'left',
    backgroundColor: '#fffdfb',
    boxShadow: 'var(--shadow-sm)'
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    borderBottom: '1px dotted var(--kraft-tan-dark)',
    paddingBottom: '8px',
    marginBottom: '8px'
  },
  helpfulNotes: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    backgroundColor: 'rgba(178,78,44,0.06)',
    borderLeft: '4px solid var(--tin-rust)',
    padding: '1rem',
    maxWidth: '450px',
    margin: '0 auto 2rem auto',
    textAlign: 'left'
  },
  noteTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    marginBottom: '2px'
  },
  noteDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4'
  },
  summarySidebar: {
    width: '100%'
  },
  summaryCard: {
    padding: '1.75rem',
    borderRadius: '4px',
    position: 'sticky',
    top: '120px'
  },
  summaryTitle: {
    fontSize: '1.3rem',
    color: 'var(--koa-wood)',
    marginBottom: '1.25rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '4px'
  },
  summaryItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)'
  },
  summarySubItems: {
    paddingLeft: '12px',
    borderLeft: '2px solid var(--kraft-tan-dark)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '-8px',
    marginBottom: '4px'
  },
  subItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: 'var(--text-muted)'
  },
  summaryTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem'
  },
  totalPrice: {
    fontSize: '1.5rem',
    color: 'var(--tin-rust)'
  }
};
