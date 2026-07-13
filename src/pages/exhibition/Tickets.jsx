import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Calendar, Clock, User, ShieldCheck, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Tickets() {
  const [quantities, setQuantities] = useState({ adult: 0, senior: 0, child: 0 });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [booked, setBooked] = useState(false);

  const rates = { adult: 17, senior: 12, child: 8 };

  const handleQtyChange = (type, increment) => {
    setQuantities((prev) => {
      const current = prev[type];
      const next = Math.max(0, current + increment);
      return { ...prev, [type]: next };
    });
  };

  const totalQty = quantities.adult + quantities.senior + quantities.child;
  const totalPrice = quantities.adult * rates.adult + quantities.senior * rates.senior + quantities.child * rates.child;

  const handleReviewOrder = () => {
    if (totalQty === 0) {
      alert('Please select at least 1 ticket before reviewing your order.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time slot for your guided tour.');
      return;
    }
    setIsFlipped(true);
  };

  const handleConfirmCheckout = () => {
    setBooked(true);
    confetti({
      particleCount: 120,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.sectionBadge}>RESERVATIONS OFFICE</span>
          <h1 style={styles.title}>Secure Entry Pass</h1>
          <p style={styles.subtitle}>
            Select your date, designate tour times, and print your digital entry voucher below.
          </p>
        </header>

        {booked ? (
          <div style={styles.victoryCard} className="exhibit-glass-card">
            <Award size={64} color="var(--exhibit-gold)" style={{ marginBottom: '1rem' }} />
            <h2 style={styles.victoryTitle}>Voucher Booked Successfully</h2>
            <p style={styles.victoryDesc}>
              Your digital entry pass has been compiled and logged in the plantation archives. A PDF confirmation has been dispatched to your contact address.
            </p>
            <div style={styles.receiptBox}>
              <p><strong>VOUCHER ID:</strong> #HPV-{(Math.random() * 100000).toFixed(0)}</p>
              <p><strong>TOUR DATE:</strong> {selectedDate} ({selectedTime})</p>
              <p><strong>TICKET COUNT:</strong> {totalQty} PASSES</p>
              <p><strong>TOTAL CHARGED:</strong> ${totalPrice.toFixed(2)} USD</p>
            </div>
            <button className="exhibit-btn-primary" onClick={() => window.location.reload()}>
              Book Another Entry
            </button>
          </div>
        ) : (
          <div style={styles.orderGrid}>
            
            {/* Input selectors column */}
            <div style={styles.selectorsCol} className="exhibit-glass-card">
              
              {/* 1. Date selection */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Calendar size={16} color="var(--exhibit-gold)" /> Select Tour Date:
                </label>
                <input 
                  type="date" 
                  style={styles.dateInput} 
                  min="2026-07-10"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* 2. Time selection */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Clock size={16} color="var(--exhibit-gold)" /> Select Time Slot:
                </label>
                <div style={styles.timeSlotsRow}>
                  {['10:00 AM', '12:00 PM'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      style={{
                        ...styles.timeSlotBtn,
                        ...(selectedTime === time ? styles.timeSlotBtnActive : {})
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Ticket quantities */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Ticket size={16} color="var(--exhibit-gold)" /> Select Ticket Quantities:
                </label>
                
                {/* Adult */}
                <div style={styles.qtyRow}>
                  <div>
                    <h5 style={styles.qtyName}>Adult Admission</h5>
                    <span style={styles.qtyRate}>$17.00 per pass</span>
                  </div>
                  <div style={styles.qtyAdjuster}>
                    <button style={styles.qtyBtn} onClick={() => handleQtyChange('adult', -1)}>-</button>
                    <span style={styles.qtyVal}>{quantities.adult}</span>
                    <button style={styles.qtyBtn} onClick={() => handleQtyChange('adult', 1)}>+</button>
                  </div>
                </div>

                {/* Kamaaina/Senior */}
                <div style={styles.qtyRow}>
                  <div>
                    <h5 style={styles.qtyName}>Kamaʻāina / Military</h5>
                    <span style={styles.qtyRate}>$12.00 per pass</span>
                  </div>
                  <div style={styles.qtyAdjuster}>
                    <button style={styles.qtyBtn} onClick={() => handleQtyChange('senior', -1)}>-</button>
                    <span style={styles.qtyVal}>{quantities.senior}</span>
                    <button style={styles.qtyBtn} onClick={() => handleQtyChange('senior', 1)}>+</button>
                  </div>
                </div>

                {/* Child */}
                <div style={styles.qtyRow}>
                  <div>
                    <h5 style={styles.qtyName}>Child (Ages 5-12)</h5>
                    <span style={styles.qtyRate}>$8.00 per pass</span>
                  </div>
                  <div style={styles.qtyAdjuster}>
                    <button style={styles.qtyBtn} onClick={() => handleQtyChange('child', -1)}>-</button>
                    <span style={styles.qtyVal}>{quantities.child}</span>
                    <button style={styles.qtyBtn} onClick={() => handleQtyChange('child', 1)}>+</button>
                  </div>
                </div>
              </div>

              <button 
                className="exhibit-btn-primary" 
                style={styles.reviewBtn}
                onClick={handleReviewOrder}
              >
                Compile Ticket Ledger <ChevronRight size={16} />
              </button>
            </div>

            {/* Ticket receipt preview: 3D Flip Card */}
            <div style={styles.receiptCol}>
              <div style={styles.perspectiveBox}>
                <div 
                  style={{
                    ...styles.flipCard,
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front Face: Empty/Uncompiled state */}
                  <div className="card-3d-face exhibit-glass-card" style={styles.receiptFront}>
                    <div style={styles.tagHole} />
                    <Ticket size={48} color="rgba(212,152,30,0.15)" style={{ margin: '2rem 0' }} />
                    <h4 style={styles.uncompiledTitle}>Voucher Pending Compilation</h4>
                    <p style={styles.uncompiledDesc}>
                      Designate date, tour slot, and quantity details on the left, then click "Compile Ticket Ledger" to print your receipt.
                    </p>
                  </div>

                  {/* Back Face: Compiled Invoice Receipt */}
                  <div className="card-3d-face exhibit-glass-card" style={styles.receiptBack}>
                    <div style={styles.ticketTagHole} />
                    <div style={styles.receiptTop}>
                      <span style={styles.ticketBrand}>HAWAIIAN PLANTATION VILLAGE</span>
                      <span style={styles.ticketBrandSub}>ESTABLISHED 1992</span>
                    </div>

                    <div style={styles.ticketBody}>
                      <h3 style={styles.ticketTitle}>DIGITAL ENTRY PASS</h3>
                      <div style={styles.ticketDivider} />
                      <p style={styles.ticketField}><strong>DATE:</strong> {selectedDate}</p>
                      <p style={styles.ticketField}><strong>TIME SLOT:</strong> {selectedTime}</p>
                      <p style={styles.ticketField}><strong>ADULT PASSES:</strong> {quantities.adult} (x$17)</p>
                      <p style={styles.ticketField}><strong>MILITARY/SENIOR:</strong> {quantities.senior} (x$12)</p>
                      <p style={styles.ticketField}><strong>CHILD PASSES:</strong> {quantities.child} (x$8)</p>
                      <div style={styles.ticketDivider} />
                      <div style={styles.priceRow}>
                        <span>TOTAL LEDGER CHARGE:</span>
                        <strong>${totalPrice.toFixed(2)} USD</strong>
                      </div>
                    </div>

                    <button 
                      className="exhibit-btn-accent" 
                      style={styles.checkoutBtn}
                      onClick={handleConfirmCheckout}
                    >
                      <ShieldCheck size={16} /> Confirm Reservation
                    </button>
                    
                    <button 
                      style={styles.cancelBtn}
                      onClick={() => setIsFlipped(false)}
                    >
                      Modify Details
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    boxSizing: 'border-box'
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    maxWidth: '750px',
    margin: '0 auto 4rem auto'
  },
  sectionBadge: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    color: 'var(--exhibit-gold)',
    display: 'block',
    marginBottom: '0.75rem'
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.05rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)'
  },
  victoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '3rem',
    maxWidth: '600px',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  victoryTitle: {
    fontSize: '1.85rem',
    color: 'var(--exhibit-text-light)',
    marginBottom: '0.75rem'
  },
  victoryDesc: {
    fontSize: '0.9rem',
    color: 'var(--exhibit-text-muted)',
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  receiptBox: {
    width: '100%',
    backgroundColor: 'var(--exhibit-bg)',
    border: '1px solid rgba(27, 56, 35, 0.15)',
    borderRadius: '10px',
    padding: '1.5rem',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-exhibit-mono)',
    textAlign: 'left',
    fontSize: '0.88rem',
    color: 'var(--exhibit-text-light)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '2rem'
  },
  orderGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '3rem',
    alignItems: 'start'
  },
  selectorsCol: {
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    boxSizing: 'border-box'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--exhibit-text-light)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  dateInput: {
    backgroundColor: 'var(--exhibit-bg-card)',
    border: '1px solid rgba(27, 56, 35, 0.18)',
    borderRadius: '6px',
    padding: '10px 14px',
    color: 'var(--exhibit-text-light)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-exhibit-mono)',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none'
  },
  timeSlotsRow: {
    display: 'flex',
    gap: '12px'
  },
  timeSlotBtn: {
    backgroundColor: 'rgba(27, 56, 35, 0.03)',
    border: '1px solid rgba(27, 56, 35, 0.12)',
    borderRadius: '6px',
    padding: '10px 20px',
    color: 'var(--exhibit-text-muted)',
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'var(--font-exhibit-mono)',
    flex: 1,
    transition: 'all 0.2s ease'
  },
  timeSlotBtnActive: {
    backgroundColor: 'rgba(212,152,30,0.08)',
    borderColor: 'var(--exhibit-gold)',
    color: 'var(--exhibit-gold)'
  },
  qtyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid rgba(27, 56, 35, 0.1)'
  },
  qtyName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--exhibit-text-light)'
  },
  qtyRate: {
    fontSize: '0.75rem',
    color: 'var(--exhibit-text-muted)'
  },
  qtyAdjuster: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    backgroundColor: 'var(--exhibit-bg)',
    border: '1px solid rgba(27, 56, 35, 0.15)',
    borderRadius: '6px',
    padding: '4px'
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    border: 'none',
    backgroundColor: 'rgba(27, 56, 35, 0.05)',
    color: 'var(--exhibit-text-light)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.9rem'
  },
  qtyVal: {
    fontSize: '0.9rem',
    fontFamily: 'var(--font-exhibit-mono)',
    fontWeight: '700',
    color: 'var(--exhibit-gold)',
    minWidth: '16px',
    textAlign: 'center'
  },
  reviewBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '0.85rem',
    marginTop: '1rem'
  },
  receiptCol: {
    display: 'flex',
    justifyContent: 'center',
    perspective: '1200px'
  },
  perspectiveBox: {
    width: '320px',
    height: '420px',
    transformStyle: 'preserve-3d'
  },
  flipCard: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  receiptFront: {
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '20px',
    boxSizing: 'border-box'
  },
  tagHole: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'var(--exhibit-bg)',
    border: '2px solid rgba(27, 56, 35, 0.15)',
    marginBottom: '1rem'
  },
  uncompiledTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--exhibit-text-light)',
    marginBottom: '0.75rem',
    fontFamily: 'var(--font-exhibit-display)'
  },
  uncompiledDesc: {
    fontSize: '0.8rem',
    color: 'var(--exhibit-text-muted)',
    lineHeight: '1.5'
  },
  receiptBack: {
    padding: '2rem 1.75rem',
    backgroundColor: 'var(--exhibit-bg-card)',
    borderRadius: '20px',
    border: '2px solid var(--exhibit-gold)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(27, 56, 35, 0.03) 0%, transparent 60%)'
  },
  ticketTagHole: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'var(--exhibit-bg)',
    border: '2px solid var(--exhibit-gold)',
    margin: '0 auto',
    boxShadow: 'inset 0 1px 2px rgba(27, 56, 35, 0.15)'
  },
  receiptTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '2px'
  },
  ticketBrand: {
    fontFamily: 'var(--font-exhibit-display)',
    fontWeight: '700',
    fontSize: '0.82rem',
    color: 'var(--exhibit-text-light)',
    letterSpacing: '0.05em'
  },
  ticketBrandSub: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.6rem',
    color: 'var(--exhibit-gold)',
    letterSpacing: '0.15em'
  },
  ticketBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  ticketTitle: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--exhibit-gold)',
    textAlign: 'center',
    letterSpacing: '0.08em',
    marginBottom: '4px'
  },
  ticketDivider: {
    height: '1px',
    borderTop: '1px dashed rgba(27, 56, 35, 0.3)',
    margin: '6px 0'
  },
  ticketField: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.78rem',
    color: 'var(--exhibit-text-light)',
    margin: '2px 0'
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    color: 'var(--exhibit-gold)',
    marginTop: '6px'
  },
  checkoutBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '0.75rem'
  },
  cancelBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--exhibit-text-muted)',
    fontSize: '0.75rem',
    textDecoration: 'underline',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '4px 0'
  },
  // Responsive overrides
  '@media (max-width: 768px)': {
    orderGrid: {
      gridTemplateColumns: '1fr'
    }
  }
};
