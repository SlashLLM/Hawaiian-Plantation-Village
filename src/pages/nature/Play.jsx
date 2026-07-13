import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';
import SugarMakerPixi from '../../components/SugarMakerPixi';

const GAME_STEPS = [
  {
    step: 1,
    title: 'Stage 1: Harvesting the Cane',
    instruction: 'Drag or swipe your mouse/pointer across the dotted lines near the base of the stalks to cut them down!',
    history: 'In the plantation days, workers used heavy steel cutlasses to cut sugarcane stalks at ground level. This was tough work done under the hot Hawaiian sun.'
  },
  {
    step: 2,
    title: 'Stage 2: Crushing & Extraction',
    instruction: 'Click and drag the large wooden crank handle in a circle to rotate the iron rollers and squeeze out the juice!',
    history: 'Mills used massive steam-driven iron rollers. They crushed sugarcane stalks under thousands of pounds of pressure to squeeze out every drop of juice.'
  },
  {
    step: 3,
    title: 'Stage 3: Boiling & Skimming',
    instruction: 'Select a Heat Burner level to boil the juice, then click on the green floating foam impurities to skim them off!',
    history: 'Cane juice was boiled in huge clarifiers. Impurities floated to the top as foam, which workers skimmed off by hand to ensure the sugar ended up pure and white.'
  },
  {
    step: 4,
    title: 'Stage 4: Spinning the Sugar',
    instruction: 'Click the blue "SPIN" button in the center of the drum rapidly to separate molasses from raw crystals!',
    history: 'Centrifuges spun the boiled sugar syrup at high speeds. Centrifugal force pushed the liquid molasses out through tiny holes, leaving dry raw sugar crystals behind.'
  }
];

export default function Play() {
  const [activeStep, setActiveStep] = useState(0); // 0 to 3, 4 is victory
  const [gameScore, setGameScore] = useState(0);

  // Process game state values (synchronized to Pixi interactions)
  const [cutCount, setCutCount] = useState(0);
  const [juiceLevel, setJuiceLevel] = useState(0);
  const [boilClarity, setBoilClarity] = useState(0);
  const [molassesSeparated, setMolassesSeparated] = useState(0);

  // Stage 3 local heat state
  const [heatLevel, setHeatLevel] = useState(0); // 0 = off, 1 = low, 2 = medium, 3 = high

  // Callback to receive progress updates from Pixi actions
  const handleProgressUpdate = (stage, increment) => {
    if (stage === 'harvest') {
      setCutCount((prev) => {
        const next = prev + increment;
        if (next >= 5) {
          return 5;
        }
        return next;
      });
    } else if (stage === 'crush') {
      setJuiceLevel((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          setGameScore((score) => score + 40); // bonus score
          return 100;
        }
        return next;
      });
    } else if (stage === 'boil') {
      setBoilClarity((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          setGameScore((score) => score + 40);
          return 100;
        }
        return next;
      });
    } else if (stage === 'spin') {
      setMolassesSeparated((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          setGameScore((score) => score + 80);
          // Trigger confetti
          confetti({
            particleCount: 160,
            spread: 80,
            origin: { y: 0.6 }
          });
          return 100;
        }
        return next;
      });
    }
  };

  const handleNextStage = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
      setActiveStep(4);
    }
  };

  const handleRestart = () => {
    setActiveStep(0);
    setGameScore(0);
    setCutCount(0);
    setJuiceLevel(0);
    setBoilClarity(0);
    setMolassesSeparated(0);
    setHeatLevel(0);
  };

  // Determine if active step task is fully complete
  const isStepComplete = () => {
    switch (activeStep) {
      case 0: return cutCount >= 5;
      case 1: return juiceLevel >= 100;
      case 2: return boilClarity >= 100;
      case 3: return molassesSeparated >= 100;
      default: return false;
    }
  };

  return (
    <div style={styles.pageContainer} className="theme-nature">
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span style={styles.headerBadge}>INTERACTIVE LOG</span>
          <h1 style={styles.pageTitle}>The Sugar Maker</h1>
          <p style={styles.pageSubtitle}>Simulate the agricultural and refinement phases of historical sugarcane processing.</p>
        </div>
      </div>

      <div style={styles.container}>
        {activeStep < 4 ? (
          <div style={styles.gameLayout}>
            {/* Game Canvas Column */}
            <div style={styles.canvasCol}>
              <div style={styles.scorebar} className="nature-glass-card">
                <div style={styles.stepTitleBox}>
                  <span style={styles.stepNumberBadge}>STAGE {activeStep + 1}</span>
                  <h3 style={styles.activeStepTitle}>{GAME_STEPS[activeStep].title}</h3>
                </div>
                <div style={styles.scoreBox}>
                  <span>Score:</span>
                  <strong>{gameScore} pts</strong>
                </div>
              </div>

              {/* Canvas Frame Wrapper */}
              <div style={styles.canvasWrapper} className="nature-glass-card">
                <SugarMakerPixi
                  activeStep={activeStep}
                  heatLevel={heatLevel}
                  onProgressUpdate={handleProgressUpdate}
                  juiceProgress={juiceLevel}
                  boilProgress={boilClarity}
                  spinProgress={molassesSeparated}
                  score={gameScore}
                  setScore={setGameScore}
                />
              </div>

              {/* Dynamic Action Panel */}
              <div style={styles.actionPanel} className="nature-glass-card">
                <div style={styles.instructionIcon}>
                  <HelpCircle size={20} color="var(--nature-moss)" />
                  <span style={styles.instructionText}>{GAME_STEPS[activeStep].instruction}</span>
                </div>

                {activeStep === 2 && (
                  <div style={styles.burnerRow}>
                    <span style={styles.burnerLabel}>Burner Flame:</span>
                    {[0, 1, 2, 3].map((lvl) => {
                      const labels = ['OFF', 'LOW', 'MED', 'HIGH'];
                      return (
                        <button
                          key={lvl}
                          onClick={() => setHeatLevel(lvl)}
                          style={{
                            ...styles.burnerBtn,
                            ...(heatLevel === lvl ? styles.burnerBtnActive : {})
                          }}
                        >
                          {labels[lvl]}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div style={styles.actionFooter}>
                  <div style={styles.progressMeter}>
                    <span style={styles.progressLabel}>
                      {activeStep === 0 && `Harvested: ${cutCount}/5 Stalks`}
                      {activeStep === 1 && `Juice Level: ${Math.floor(juiceLevel)}%`}
                      {activeStep === 2 && `Clarity: ${Math.floor(boilClarity)}%`}
                      {activeStep === 3 && `Molasses Separated: ${Math.floor(molassesSeparated)}%`}
                    </span>
                    <div style={styles.meterTrack}>
                      <div
                        style={{
                          ...styles.meterBar,
                          width: `${
                            activeStep === 0 ? (cutCount / 5) * 100 :
                            activeStep === 1 ? juiceLevel :
                            activeStep === 2 ? boilClarity : molassesSeparated
                          }%`
                        }}
                      />
                    </div>
                  </div>

                  <button
                    disabled={!isStepComplete()}
                    onClick={handleNextStage}
                    style={{
                      ...styles.nextBtn,
                      opacity: isStepComplete() ? 1 : 0.5,
                      cursor: isStepComplete() ? 'pointer' : 'not-allowed'
                    }}
                    className="nature-btn-accent"
                  >
                    {activeStep === 3 ? 'Complete Simulation' : 'Next Stage'} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Column: Historical Archives */}
            <div style={styles.sidebarCol}>
              <div style={styles.sidebarCard} className="nature-glass-card">
                <span style={styles.sidebarBadge}>HISTORICAL ARCHIVE</span>
                <h3 style={styles.sidebarTitle}>Refinement Records</h3>
                <p style={styles.sidebarText}>
                  {GAME_STEPS[activeStep].history}
                </p>
                <div style={styles.divider} />
                <h4 style={styles.statsHeader}>PROCESS INSIGHT</h4>
                <div style={styles.insightBox}>
                  {activeStep === 0 && "Cutting sugarcane close to the soil line was critical. Stalk bases hold the highest concentration of sucrose, so shallow cuts resulted in severe yield loss."}
                  {activeStep === 1 && "Early iron crushing mills were extremely hazardous. Workers had to feed heavy stalks manually into the rollers, running a constant risk of severe injury."}
                  {activeStep === 2 && "Clarifiers boiled the juice with lime. Liming neutralizes acidity and aids the coagulation of albumins, which then rise as foam impurities to be skimmed off."}
                  {activeStep === 3 && "Centrifuges were the major technological leap. They reduced refinement times from weeks of gravity draining down to a matter of minutes."}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Victory screen */
          <div style={styles.victoryBox} className="nature-glass-card">
            <div style={styles.victoryBadge}>
              <Award size={48} color="var(--nature-earth)" />
            </div>
            <h2 style={styles.victoryTitle}>Sugar Master Certified</h2>
            <p style={styles.victoryText}>
              Congratulations! You have completed the entire sugarcane refinement loop successfully.
            </p>
            <div style={styles.receiptBox}>
              <div style={styles.receiptLine}>
                <span>Refinement Score</span>
                <strong>{gameScore} pts</strong>
              </div>
              <div style={styles.receiptLine}>
                <span>Worker Bango Tag Assigned</span>
                <strong style={{ fontFamily: 'monospace' }}>BANGO-2891</strong>
              </div>
            </div>
            <p style={styles.victorySub}>
              By completing these agricultural steps, you have experienced a small simulation of the physical labor that drove Waipahu's community.
            </p>
            <div style={styles.victoryBtnRow}>
              <button onClick={handleRestart} className="nature-btn-primary">
                <RefreshCw size={16} /> Restart Simulator
              </button>
            </div>
          </div>
        )}
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
  gameLayout: {
    display: 'grid',
    gridTemplateColumns: '1.7fr 1fr',
    gap: '2.5rem',
    alignItems: 'start',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr'
    }
  },
  canvasCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  scorebar: {
    padding: '1.25rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'none'
  },
  stepTitleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  stepNumberBadge: {
    backgroundColor: 'var(--nature-moss)',
    color: 'var(--nature-mist)',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.05em'
  },
  activeStepTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.15rem',
    fontWeight: '600',
    color: 'var(--nature-forest)'
  },
  scoreBox: {
    fontSize: '0.9rem',
    color: '#4b5563',
    display: 'flex',
    gap: '6px',
    alignItems: 'baseline'
  },
  canvasWrapper: {
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    boxShadow: 'none',
    backgroundColor: '#ebd7bc' // vintage paper background fallback to align canvas
  },
  actionPanel: {
    padding: '2rem',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  instructionIcon: {
    display: 'flex',
    alignItems: 'start',
    gap: '12px'
  },
  instructionText: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#4b5563'
  },
  burnerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    padding: '1rem',
    backgroundColor: 'rgba(71, 118, 82, 0.05)',
    borderRadius: '16px'
  },
  burnerLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--nature-forest)'
  },
  burnerBtn: {
    padding: '6px 14px',
    borderRadius: '30px',
    border: '1px solid rgba(71, 118, 82, 0.2)',
    backgroundColor: '#ffffff',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-forest)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  burnerBtnActive: {
    backgroundColor: 'var(--nature-earth)',
    borderColor: 'var(--nature-earth)',
    color: 'var(--nature-mist)'
  },
  actionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    borderTop: '1px solid rgba(71, 118, 82, 0.08)',
    paddingTop: '1.5rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'stretch'
    }
  },
  progressMeter: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  progressLabel: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'var(--nature-forest)'
  },
  meterTrack: {
    height: '8px',
    backgroundColor: 'rgba(71, 118, 82, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  meterBar: {
    height: '100%',
    backgroundColor: 'var(--nature-emerald)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  nextBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  sidebarCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarCard: {
    padding: '2rem',
    boxShadow: 'none'
  },
  sidebarBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
    display: 'block'
  },
  sidebarTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  sidebarText: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '1.5rem'
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(71, 118, 82, 0.1)',
    margin: '1.5rem 0'
  },
  statsHeader: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  insightBox: {
    backgroundColor: 'rgba(71, 118, 82, 0.04)',
    borderRadius: '12px',
    padding: '1.25rem',
    fontSize: '0.8rem',
    lineHeight: '1.55',
    color: '#4b5563',
    borderLeft: '3px solid var(--nature-moss)'
  },
  victoryBox: {
    maxWidth: '560px',
    margin: '3rem auto 0 auto',
    padding: '3.5rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 20px 50px rgba(11, 36, 22, 0.1)'
  },
  victoryBadge: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    backgroundColor: 'rgba(71, 118, 82, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  victoryTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.85rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  victoryText: {
    fontSize: '0.95rem',
    color: '#374151',
    marginBottom: '1.75rem'
  },
  receiptBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(71, 118, 82, 0.12)',
    borderRadius: '16px',
    padding: '1.25rem 2rem',
    marginBottom: '2rem',
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
  victorySub: {
    fontSize: '0.8rem',
    color: '#6b7280',
    lineHeight: '1.5',
    maxWidth: '360px',
    marginBottom: '2.5rem'
  },
  victoryBtnRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
};
