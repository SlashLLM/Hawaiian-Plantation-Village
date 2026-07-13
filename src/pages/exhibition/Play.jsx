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
  const [heatLevel, setHeatLevel] = useState(0); // 0 = off, 1 = low, 2 = medium, 3 = high

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

  const handleRestartGame = () => {
    setActiveStep(0);
    setGameScore(0);
    setCutCount(0);
    setJuiceLevel(0);
    setBoilClarity(0);
    setMolassesSeparated(0);
    setHeatLevel(0);
  };

  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.sectionBadge}>INTERACTIVE KIOSK TERMINAL</span>
          <h1 style={styles.title}>Sugar Mill Tycoon</h1>
          <p style={styles.subtitle}>
            Experience the multi-ethnic workflow of extracting, clarifing, and refining Waipahu sugar in real-time.
          </p>
        </header>

        {/* Steps navigation layout */}
        {activeStep < 4 && (
          <div style={styles.stepsNav}>
            {GAME_STEPS.map((s, idx) => (
              <div
                key={s.step}
                style={{
                  ...styles.stepNode,
                  ...(activeStep === idx ? styles.stepNodeActive : {}),
                  ...(activeStep > idx ? styles.stepNodePassed : {})
                }}
              >
                <span style={styles.stepNum}>{s.step}</span>
                <span style={styles.stepTitle}>{s.title.split(':')[0]}</span>
              </div>
            ))}
          </div>
        )}

        {/* Kiosk wrapper */}
        <div style={styles.kioskLayout} className="exhibit-glass-card">
          
          {/* Main simulation panel */}
          <div style={styles.simPanel}>
            <div style={styles.simHeader}>
              <h3 style={styles.simTitle}>
                {activeStep < 4 ? GAME_STEPS[activeStep].title : 'System Output: Process Finished'}
              </h3>
              <div style={styles.scoreBox}>
                <span style={styles.scoreLabel}>SCORE:</span>
                <span style={styles.scoreVal}>{gameScore}</span>
              </div>
            </div>

            <p style={styles.instruction}>
              {activeStep < 4 ? GAME_STEPS[activeStep].instruction : 'Mill operations completed successfully. High-grade raw sugar crystals isolated.'}
            </p>

            {/* Game viewport */}
            <div style={styles.viewportWrapper}>
              {activeStep < 4 ? (
                <div style={styles.canvasContainer}>
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
              ) : (
                <div style={styles.victoryCard}>
                  <Award size={64} color="var(--exhibit-gold)" style={{ marginBottom: '1rem' }} />
                  <h2 style={styles.victoryTitle}>Crop Processed Successfully</h2>
                  <p style={styles.victoryDesc}>
                    You successfully harvested, crushed, clarified, and centrifuged the Waipahu sugar harvest! Your efforts have added high-value raw sugar to the shipping ledger.
                  </p>
                  <div style={styles.victoryScore}>
                    <span>FINAL LEDGER SCORE:</span>
                    <strong>{gameScore} PTS</strong>
                  </div>
                  <button className="exhibit-btn-primary" onClick={handleRestartGame}>
                    <RefreshCw size={16} /> Run Next Shift
                  </button>
                </div>
              )}
            </div>

            {/* Interactive stage controls */}
            {activeStep === 0 && (
              <div style={styles.controlSection}>
                <div style={styles.progressLabel}>CROP CUT PROGRESS:</div>
                <div style={styles.statusBar}>
                  <div style={{ ...styles.statusFill, width: `${(cutCount / 5) * 100}%` }} />
                  <span style={styles.statusText}>{cutCount} / 5 STALKS</span>
                </div>
                {cutCount >= 5 && (
                  <button className="exhibit-btn-primary animate-fade-in" onClick={handleNextStage}>
                    Send Stalks to Crusher <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {activeStep === 1 && (
              <div style={styles.controlSection}>
                <div style={styles.progressLabel}>CRUSHING TANK VOLUME:</div>
                <div style={styles.statusBar}>
                  <div style={{ ...styles.statusFill, width: `${juiceLevel}%` }} />
                  <span style={styles.statusText}>{Math.floor(juiceLevel)}% FULL</span>
                </div>
                {juiceLevel >= 100 && (
                  <button className="exhibit-btn-primary animate-fade-in" onClick={handleNextStage}>
                    Pump to Boiling clarifier <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {activeStep === 2 && (
              <div style={styles.controlSection}>
                <div style={styles.boilerControls}>
                  <span style={styles.heatSelectorLabel}> Clarifier Burner Heat:</span>
                  <div style={styles.heatBtnRow}>
                    {[0, 1, 2, 3].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setHeatLevel(lvl)}
                        style={{
                          ...styles.heatBtn,
                          ...(heatLevel === lvl ? styles.heatBtnActive : {})
                        }}
                      >
                        {lvl === 0 ? 'OFF' : lvl === 1 ? 'LOW' : lvl === 2 ? 'MED' : 'HIGH'}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ ...styles.progressLabel, marginTop: '1.5rem' }}>SYRUP CLARITY LEVEL:</div>
                <div style={styles.statusBar}>
                  <div style={{ ...styles.statusFill, width: `${boilClarity}%` }} />
                  <span style={styles.statusText}>{boilClarity}% CLARIFIED</span>
                </div>

                {heatLevel === 0 && (
                  <div style={styles.warningBox}>
                    ⚠️ Burner is cold. Set heat to LOW, MED, or HIGH to start clarifications.
                  </div>
                )}

                {boilClarity >= 100 && (
                  <button className="exhibit-btn-primary animate-fade-in" onClick={handleNextStage}>
                    Pump to Centrifuge <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {activeStep === 3 && (
              <div style={styles.controlSection}>
                <div style={styles.progressLabel}>MOLASSES EXTRACTED:</div>
                <div style={styles.statusBar}>
                  <div style={{ ...styles.statusFill, width: `${molassesSeparated}%` }} />
                  <span style={styles.statusText}>{molassesSeparated}% DRY CRYSTALS</span>
                </div>
                {molassesSeparated >= 100 && (
                  <button className="exhibit-btn-primary animate-fade-in" onClick={handleNextStage}>
                    Compile Operations Ledger <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Historical sidebar information */}
          {activeStep < 4 && (
            <div style={styles.historicalSidebar}>
              <div style={styles.sidebarHeader}>
                <HelpCircle size={20} color="var(--exhibit-gold)" />
                <h4 style={styles.sidebarTitle}>Mill History Files</h4>
              </div>
              <div style={styles.sidebarDivider} />
              <p style={styles.sidebarText}>{GAME_STEPS[activeStep].history}</p>
            </div>
          )}

        </div>
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
    maxWidth: '1100px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 3rem auto'
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
  stepsNav: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '2rem'
  },
  stepNode: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease'
  },
  stepNodeActive: {
    borderColor: 'var(--exhibit-gold)',
    backgroundColor: 'rgba(212,152,30,0.05)',
    boxShadow: '0 0 15px rgba(212,152,30,0.08)'
  },
  stepNodePassed: {
    borderColor: '#22646d',
    backgroundColor: 'rgba(34,100,109,0.05)'
  },
  stepNum: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--exhibit-text-light)'
  },
  stepTitle: {
    fontSize: '0.8rem',
    color: 'var(--exhibit-text-muted)',
    fontWeight: '500'
  },
  kioskLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '2.5rem',
    padding: '2.5rem',
    boxSizing: 'border-box',
    minHeight: '550px'
  },
  simPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  simHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  simTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--exhibit-text-light)'
  },
  scoreBox: {
    backgroundColor: 'rgba(212,152,30,0.08)',
    border: '1px solid rgba(212,152,30,0.2)',
    borderRadius: '6px',
    padding: '4px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  scoreLabel: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    color: 'var(--exhibit-text-muted)'
  },
  scoreVal: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--exhibit-gold)'
  },
  instruction: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1.5rem'
  },
  viewportWrapper: {
    backgroundColor: '#14181f',
    borderRadius: '12px',
    border: '1px solid rgba(27, 56, 35, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '420px',
    position: 'relative'
  },
  canvasContainer: {
    width: '700px',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  victoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '3rem',
    maxWidth: '500px'
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
    marginBottom: '1.5rem'
  },
  victoryScore: {
    backgroundColor: 'rgba(27, 56, 35, 0.05)',
    border: '1px solid rgba(27, 56, 35, 0.15)',
    borderRadius: '8px',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem',
    color: 'var(--exhibit-text-light)',
    marginBottom: '2rem',
    fontFamily: 'var(--font-exhibit-mono)'
  },
  controlSection: {
    marginTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  progressLabel: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.05em',
    color: 'var(--exhibit-text-muted)'
  },
  statusBar: {
    position: 'relative',
    height: '32px',
    backgroundColor: 'rgba(27, 56, 35, 0.08)',
    border: '1px solid rgba(27, 56, 35, 0.12)',
    borderRadius: '6px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px'
  },
  statusFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'var(--exhibit-bronze)',
    opacity: 0.85,
    transition: 'width 0.3s ease'
  },
  statusText: {
    position: 'relative',
    zIndex: 2,
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'var(--exhibit-text-light)',
    fontFamily: 'var(--font-exhibit-mono)'
  },
  boilerControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  heatSelectorLabel: {
    fontSize: '0.88rem',
    color: 'var(--exhibit-text-light)',
    fontWeight: '600'
  },
  heatBtnRow: {
    display: 'flex',
    gap: '6px'
  },
  heatBtn: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    padding: '6px 12px',
    color: 'var(--exhibit-text-muted)',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'var(--font-exhibit-mono)',
    transition: 'all 0.2s ease'
  },
  heatBtnActive: {
    backgroundColor: 'var(--exhibit-accent)',
    borderColor: 'var(--exhibit-accent)',
    color: '#ffffff',
    boxShadow: '0 0 10px rgba(178,78,44,0.4)'
  },
  warningBox: {
    backgroundColor: 'rgba(178, 78, 44, 0.08)',
    border: '1px dashed rgba(178, 78, 44, 0.25)',
    color: 'var(--exhibit-accent)',
    fontSize: '0.8rem',
    padding: '10px 14px',
    borderRadius: '6px',
    marginTop: '0.5rem'
  },
  historicalSidebar: {
    borderLeft: '1px solid rgba(27, 56, 35, 0.15)',
    paddingLeft: '2.5rem',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1rem'
  },
  sidebarTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--exhibit-text-light)',
    fontFamily: 'var(--font-exhibit-display)'
  },
  sidebarDivider: {
    height: '1px',
    backgroundColor: 'rgba(27, 56, 35, 0.15)',
    marginBottom: '1.25rem'
  },
  sidebarText: {
    fontSize: '0.85rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)'
  },
  // Responsive layout overrides
  '@media (max-width: 900px)': {
    kioskLayout: {
      gridTemplateColumns: '1fr',
      padding: '1.5rem'
    },
    historicalSidebar: {
      borderLeft: 'none',
      borderTop: '1px solid rgba(27, 56, 35, 0.15)',
      paddingLeft: 0,
      paddingTop: '1.5rem',
      marginTop: '1.5rem'
    },
    canvasContainer: {
      transform: 'scale(0.8)',
      transformOrigin: 'center'
    }
  }
};
