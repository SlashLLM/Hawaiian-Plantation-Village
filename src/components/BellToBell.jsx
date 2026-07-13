import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Ticket, Award, RefreshCw, ChevronRight } from 'lucide-react';

const SHIFTS = [
  {
    id: 1,
    title: 'The Wake Bell',
    time: '5:00 AM',
    bellContext: 'A heavy metal bell rings across the camp, echoing off the iron rooftops. You have 30 minutes to dress, eat, and assemble.',
    question: 'How do you prepare your kaukau (lunch) tin for the long day ahead in the fields?',
    choices: [
      {
        text: 'Rice & Salted Fish',
        fact: 'Rice was the staple food for Asian workers, while salted fish or vegetables kept well in the hot sun. Sharing food at lunch was the birth of Hawaii\'s local plate lunch culture.',
        stamp: 'Japanese',
        stampName: 'HAWAII - NIPPON'
      },
      {
        text: 'Cold Taro & Salt',
        fact: 'Native Hawaiian and Portuguese workers often brought taro, sweet potato, or bread. Taro provided sustained energy for intense physical labor in the sugarcane rows.',
        stamp: 'Hawaiian',
        stampName: 'HAWAII - ALOHA'
      }
    ]
  },
  {
    id: 2,
    title: 'Field Assignment',
    time: '6:00 AM',
    bellContext: 'You report to the overseer (Luna). The morning air is damp, and the cane fields stretch endlessly up toward the mountains.',
    question: 'What task is assigned to you by the Luna today?',
    choices: [
      {
        text: 'Hole-Hole (Stripping Dead Leaves)',
        fact: 'Hole-hole was mostly done by women. Stripping dry cane leaves by hand was grueling work; workers wore thick denim or canvas leggings and sleeves to protect against sharp cane leaves.',
        stamp: 'Filipino',
        stampName: 'HAWAII - FILIPINO'
      },
      {
        text: 'Cane Cutting (Cane knife labor)',
        fact: 'Cutting cane required swinging a heavy steel knife all day. Stalks had to be cut clean at the ground level to maximize sugar extraction, which was hot, backbreaking work.',
        stamp: 'Puerto Rican',
        stampName: 'HAWAII - BORICUA'
      }
    ]
  },
  {
    id: 3,
    title: 'Midday Lunch Break',
    time: '11:30 AM',
    bellContext: 'The noon whistle blows. You gather under the shade of a large banyan tree with workers from other camp sectors.',
    question: 'How do you spend your 30-minute break with your fellow camp residents?',
    choices: [
      {
        text: 'Swap a piece of sweet bread',
        fact: 'Sharing food was how different cultures communicated before they shared a common language. The Portuguese introduced traditional stone ovens (forno) to bake sweet breads and malasadas.',
        stamp: 'Portuguese',
        stampName: 'HAWAII - AÇORES'
      },
      {
        text: 'Share pickled vegetables',
        fact: 'Korean and Japanese workers shared kimchi and tsukemono, introducing bold flavors to the camp. This food sharing laid the foundation for modern Hawaiian Pidgin vocabulary.',
        stamp: 'Korean',
        stampName: 'HAWAII - CHOSEN'
      }
    ]
  },
  {
    id: 4,
    title: 'The Company Store',
    time: '4:30 PM',
    bellContext: 'The work whistle signals the end of the shift. On the way back to the barracks, you stop by the plantation store.',
    question: 'How do you check out your purchase at the plantation store counter?',
    choices: [
      {
        text: 'Provide your metal Bango tag',
        fact: 'Each worker was issued a metal bango tag with a number. The store clerk recorded transactions under your number, directly deducting payments from your monthly wages.',
        stamp: 'Chinese',
        stampName: 'HAWAII - DONGAN'
      },
      {
        text: 'Pay in cash (US Dollars)',
        fact: 'Cash was rare; most transactions went through the company ledger. Cash allowed workers to save for independent shops or to send money home to families in their home countries.',
        stamp: 'Okinawan',
        stampName: 'HAWAII - RYUKYU'
      }
    ]
  },
  {
    id: 5,
    title: 'Evening After the Whistle',
    time: '6:30 PM',
    bellContext: 'Dusk falls over the Waipahu valley. The cooking fires burn outside the camp cottages, and music begins to drift from the porches.',
    question: 'How do you wind down before the wake bell rings again tomorrow?',
    choices: [
      {
        text: 'Play music on the porch',
        fact: 'Porches (lanai) were vital social spaces. Workers sang folk songs, played the Okinawan sanshin, Spanish guitar, or ukulele, finding comfort and solidarity in shared melodies.',
        stamp: 'Okinawan_Porch',
        stampName: 'CAMP MUSIC - 1900'
      },
      {
        text: 'Go to the community bathhouse',
        fact: 'The hot baths (furo) were popular for washing off the red dirt and soot. It was a rare place of relaxation where workers of all ranks and backgrounds stood equal.',
        stamp: 'Camp_Furo',
        stampName: 'FURO BATH - WAIPAHU'
      }
    ]
  }
];

export default function BellToBell({ onVisitClick }) {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 4 are shifts, 5 is final
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [passportStamps, setPassportStamps] = useState([]);
  const [showFact, setShowFact] = useState(false);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setShowFact(true);
    // Add stamp if not already earned
    if (!passportStamps.some(s => s.name === choice.stamp)) {
      setPassportStamps([...passportStamps, { name: choice.stamp, label: choice.stampName }]);
    }
  };

  const handleNext = () => {
    setShowFact(false);
    setSelectedChoice(null);
    if (currentStep < SHIFTS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Trigger confetti on completion
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#1b3823', '#d4981e', '#b24e2c', '#ebd7bc', '#22646d']
      });
      setCurrentStep(5);
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
              <span>TOTAL STAMPS: {passportStamps.length} / 5</span>
            </div>
          </div>

          {/* Right Page: Interactive Shifts */}
          <div style={styles.interactiveSide}>
            {currentStep < 5 ? (
              <div style={styles.shiftContent}>
                <div style={styles.shiftHeader}>
                  <span style={styles.shiftTime}>{SHIFTS[currentStep].time}</span>
                  <h3 style={styles.shiftTitle}>
                    Shift {SHIFTS[currentStep].id}: {SHIFTS[currentStep].title}
                  </h3>
                </div>

                <p style={styles.contextText}>
                  {SHIFTS[currentStep].bellContext}
                </p>

                <div style={styles.questionBox}>
                  <p style={styles.questionText}>
                    {SHIFTS[currentStep].question}
                  </p>
                </div>

                {!showFact ? (
                  <div style={styles.choicesContainer}>
                    {SHIFTS[currentStep].choices.map((choice, idx) => (
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
                      Proceed to next shift <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Completion Screen
              <div style={styles.completeContent}>
                <div style={styles.completeBadge}>
                  <Award size={48} color="var(--sugar-gold)" />
                </div>
                <h3 style={styles.completeTitle}>Day Log Completed!</h3>
                <p style={styles.completeText}>
                  You have experienced one day in the life of a plantation worker. By collecting these stamps, you have explored the rich cultural heritage and resilience of Hawaii\'s immigrant communities.
                </p>
                
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
