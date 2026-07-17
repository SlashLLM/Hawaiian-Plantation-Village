import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Ticket, Award, RefreshCw, ChevronRight } from 'lucide-react';
import { DEFAULT_BELL_SHIFTS } from '../lib/content/gameChallengeDefaults.js';

export default function BellToBell({
  onVisitClick,
  shifts: shiftsProp,
  onComplete,
}) {
  const shifts = Array.isArray(shiftsProp) && shiftsProp.length
    ? shiftsProp
    : DEFAULT_BELL_SHIFTS;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [passportStamps, setPassportStamps] = useState([]);
  const [showFact, setShowFact] = useState(false);
  const completedStep = shifts.length;
  const isComplete = currentStep >= completedStep;

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setShowFact(true);
    if (!passportStamps.some((s) => s.name === choice.stamp)) {
      setPassportStamps([...passportStamps, { name: choice.stamp, label: choice.stampName }]);
    }
  };

  const handleNext = () => {
    setShowFact(false);
    setSelectedChoice(null);
    if (currentStep < shifts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#1b3823', '#d4981e', '#b24e2c', '#ebd7bc', '#22646d'],
      });
      setCurrentStep(completedStep);
      onComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedChoice(null);
    setPassportStamps([]);
    setShowFact(false);
  };

  return (
    <div style={styles.container}>
      <div className="paper-card" style={styles.ledgerBook}>
        <div style={styles.ledgerHeader} className="ledger-header">
          <span>WORKER LOG: DAILY SCHEDULE</span>
          <span>PASSPORT NO: HPV-1900-24</span>
        </div>

        <div style={styles.bookGrid}>
          {/* Left Page: Virtual Passport Stamps */}
          <div style={styles.passportSide}>
            <h3 style={styles.sideTitle}>IMMIGRATION PASSPORT</h3>
            <p style={styles.sideSubtitle}>Stamps awarded for completing plantation tasks</p>
            
            <div style={styles.stampGrid}>
              {[...Array(6)].map((_, index) => {
                const stamp = passportStamps[index];
                return (
                  <div key={index} style={styles.stampBox}>
                    {stamp ? (
                      <div className="ink-stamp green animate-stamp" style={styles.stampInk}>
                        <div style={styles.stampLabel}>{stamp.label}</div>
                        <div style={styles.stampVerify}>APPROVED</div>
                      </div>
                    ) : (
                      <span style={styles.stampPlaceholder}>EMPTY</span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div style={styles.passportFooter}>
              <span>TOTAL STAMPS: {passportStamps.length} / {shifts.length}</span>
            </div>
          </div>

          {/* Right Page: Interactive Shifts */}
          <div style={styles.interactiveSide}>
            {!isComplete ? (
              <div style={styles.shiftContent}>
                <div style={styles.shiftHeader}>
                  <span style={styles.shiftTime}>{shifts[currentStep].time}</span>
                  <h3 style={styles.shiftTitle}>
                    Shift {shifts[currentStep].id}: {shifts[currentStep].title}
                  </h3>
                </div>

                <p style={styles.contextText}>
                  {shifts[currentStep].bellContext}
                </p>

                <div style={styles.questionBox}>
                  <p style={styles.questionText}>
                    {shifts[currentStep].question}
                  </p>
                </div>

                {!showFact ? (
                  <div style={styles.choicesContainer}>
                    {shifts[currentStep].choices.map((choice, idx) => (
                      <button
                        key={idx}
                        className="btn-secondary"
                        onClick={() => handleChoice(choice)}
                        style={styles.choiceBtn}
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={styles.factContainer} className="animate-fade-in">
                    <div style={styles.factBadge} className="ink-stamp rust">HISTORICAL FACT</div>
                    <p style={styles.factText}>{selectedChoice.fact}</p>
                    <button className="btn-primary" onClick={handleNext} style={styles.nextBtn}>
                      {currentStep < shifts.length - 1
                        ? <>Proceed to next shift <ChevronRight size={16} /></>
                        : <>Finish day log <ChevronRight size={16} /></>}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.completeContent}>
                <div style={styles.completeBadge}>
                  <Award size={48} color="var(--sugar-gold)" />
                </div>
                <h3 style={styles.completeTitle}>Day Log Completed!</h3>
                <p style={styles.completeText}>
                  You have experienced one day in the life of a plantation worker. By collecting these stamps, you have explored the rich cultural heritage and resilience of Hawaii&apos;s immigrant communities.
                </p>

                {onComplete ? (
                  <p style={styles.actionSubtitle}>Continue below to the next checkpoint.</p>
                ) : (
                  <div style={styles.actionBlock}>
                    <h4 style={styles.actionTitle}>Plan Your Visit Today</h4>
                    <p style={styles.actionSubtitle}>See the actual historic camp houses, stores, and tools in Waipahu.</p>
                    <div style={styles.actionBtns}>
                      <button className="btn-accent" onClick={onVisitClick} style={styles.actionBtn}>
                        <Ticket size={16} /> Book Tickets
                      </button>
                      <button className="btn-secondary" onClick={handleReset} style={styles.actionBtn}>
                        <RefreshCw size={16} /> Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem 1.5rem',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  ledgerBook: {
    padding: '2rem',
    borderRadius: '8px',
    border: '2px solid var(--koa-wood)',
    boxShadow: 'var(--shadow-lg)'
  },
  ledgerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '0.5rem',
    marginBottom: '1.5rem'
  },
  bookGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '2.5rem',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr',
      gap: '2rem'
    }
  },
  passportSide: {
    borderRight: '1px dashed var(--kraft-tan-dark)',
    paddingRight: '1.5rem',
    '@media (max-width: 800px)': {
      borderRight: 'none',
      borderBottom: '1px dashed var(--kraft-tan-dark)',
      paddingRight: 0,
      paddingBottom: '1.5rem'
    }
  },
  sideTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.25rem'
  },
  sideSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem'
  },
  stampGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  stampBox: {
    height: '80px',
    border: '1px dashed var(--kraft-tan-dark)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.01)',
    position: 'relative',
    overflow: 'hidden'
  },
  stampPlaceholder: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.7rem',
    color: 'var(--kraft-tan-dark)',
    letterSpacing: '0.05em'
  },
  stampInk: {
    transform: 'rotate(-5deg) scale(0.9)',
    fontSize: '0.65rem',
    textAlign: 'center',
    padding: '4px 6px',
    borderColor: 'var(--cane-green)',
    color: 'var(--cane-green)',
    width: '90%',
    lineHeight: '1.2'
  },
  stampLabel: {
    fontWeight: 'bold',
    borderBottom: '1px solid currentColor',
    paddingBottom: '2px',
    marginBottom: '2px'
  },
  stampVerify: {
    fontSize: '0.55rem',
    letterSpacing: '0.1em'
  },
  passportFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-muted)'
  },
  interactiveSide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '320px'
  },
  shiftHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '1rem'
  },
  shiftTime: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    textTransform: 'uppercase'
  },
  shiftTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    color: 'var(--koa-wood-dark)'
  },
  contextText: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    marginBottom: '1.25rem',
    fontStyle: 'italic'
  },
  questionBox: {
    background: 'var(--paper-dark)',
    padding: '1rem',
    borderLeft: '4px solid var(--koa-wood)',
    marginBottom: '1.5rem'
  },
  questionText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-dark)',
    marginBottom: 0
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  choiceBtn: {
    width: '100%',
    textAlign: 'left',
    padding: '1rem',
    justifyContent: 'flex-start'
  },
  factContainer: {
    padding: '1.25rem',
    border: '1px solid var(--kraft-tan-dark)',
    backgroundColor: '#fffcf7',
    borderRadius: '4px',
    position: 'relative'
  },
  factBadge: {
    position: 'absolute',
    top: '-12px',
    left: '12px',
    fontSize: '0.65rem',
    backgroundColor: '#fffcf7',
    padding: '2px 8px',
    zIndex: 5
  },
  factText: {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: 'var(--text-dark)',
    marginTop: '0.5rem',
    marginBottom: '1.5rem'
  },
  nextBtn: {
    width: '100%',
    justifyContent: 'center'
  },
  completeContent: {
    textAlign: 'center',
    padding: '1rem'
  },
  completeBadge: {
    marginBottom: '1rem'
  },
  completeTitle: {
    fontSize: '1.8rem',
    color: 'var(--cane-green)',
    marginBottom: '1rem'
  },
  completeText: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginBottom: '2rem'
  },
  actionBlock: {
    padding: '1.5rem',
    backgroundColor: 'var(--paper-dark)',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '6px'
  },
  actionTitle: {
    fontSize: '1.2rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.25rem'
  },
  actionSubtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '1.25rem'
  },
  actionBtns: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  actionBtn: {
    flex: '1',
    minWidth: '140px',
    justifyContent: 'center'
  }
};
