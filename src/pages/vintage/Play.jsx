import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';
import SugarMakerPixi from '../../components/SugarMakerPixi';
import { usePageSection } from '../../context/ContentProvider.jsx';
import { GAME_STEPS as DEFAULT_GAME_STEPS } from '../../lib/content/fallbacks.js';

export default function Play() {
  const { section: header } = usePageSection('play', 'header', {});
  const { section: gameStepsSection } = usePageSection('play', 'gameSteps', { steps: DEFAULT_GAME_STEPS });
  const GAME_STEPS = gameStepsSection?.steps ?? DEFAULT_GAME_STEPS;
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
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className={`ink-stamp ${header?.stampClass ?? 'green'}`} style={{ marginBottom: '0.5rem' }}>{header?.stamp ?? 'KIDS PLAYGROUND'}</span>
          <h1 style={styles.pageTitle}>{header?.title ?? 'Sugar Mill Tycoon'}</h1>
          <p style={styles.pageSubtitle}>{header?.subtitle ?? 'Experience the historical process of manufacturing sugar from raw crop in our PixiJS 2D Mill simulator!'}</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.gameWrapper}>
          {/* Game Steps Map */}
          {activeStep < 4 && (
            <div style={styles.stepsGrid}>
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
                  <span style={styles.stepTitleLabel}>{s.title.split(':')[0]}</span>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Game Arena */}
          <div className="paper-card" style={styles.arenaCard}>
            <div style={styles.arenaHeader}>
              <h3 style={styles.arenaTitle}>{activeStep < 4 ? GAME_STEPS[activeStep].title : 'Mill Champion!'}</h3>
              <div style={styles.scoreContainer}>
                <span>SCORE:</span>
                <strong style={{ color: 'var(--sugar-gold)', marginLeft: '4px' }}>{gameScore}</strong>
              </div>
            </div>

            <p style={styles.instructionText}>
              {activeStep < 4 ? GAME_STEPS[activeStep].instruction : 'Congratulations, you have processed the crop!'}
            </p>

            {/* PixiJS Canvas Wrapper */}
            {activeStep < 4 && (
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
            )}

            {/* React overlays / controls per stage */}
            {activeStep === 0 && (
              <div style={styles.controlSection}>
                <div style={styles.progressText}>
                  <span>STALKS CUT:</span>
                  <strong>{cutCount} / 5</strong>
                </div>
                {cutCount >= 5 && (
                  <button className="btn-primary animate-fade-in" onClick={handleNextStage} style={styles.actionBtn}>
                    Send Stalks to Mill <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {activeStep === 1 && (
              <div style={styles.controlSection}>
                <div style={styles.progressContainer}>
                  <div style={styles.progressLabel}>EXTRACTION TANK LEVEL:</div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${juiceLevel}%`, backgroundColor: 'var(--ocean-teal)' }} />
                    <span style={styles.progressValueText}>{Math.floor(juiceLevel)}%</span>
                  </div>
                </div>
                {juiceLevel >= 100 && (
                  <button className="btn-primary animate-fade-in" onClick={handleNextStage} style={styles.actionBtn}>
                    Pump to Boiling Vat <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {activeStep === 2 && (
              <div style={styles.controlSection}>
                <div style={styles.boilerControls}>
                  <div style={styles.heatLabel}>SET HEAT LEVEL:</div>
                  <div style={styles.heatBtns}>
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

                <div style={{ ...styles.progressContainer, marginTop: '1.5rem' }}>
                  <div style={styles.progressLabel}>SYRUP LIQUID CLARITY:</div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${boilClarity}%`, backgroundColor: 'var(--cane-green)' }} />
                    <span style={styles.progressValueText}>{boilClarity}%</span>
                  </div>
                </div>

                {heatLevel === 0 && (
                  <div style={styles.alertCard}>
                    ⚠️ Turn on the burner heat to begin boiling!
                  </div>
                )}

                {boilClarity >= 100 && (
                  <button className="btn-primary animate-fade-in" onClick={handleNextStage} style={styles.actionBtn}>
                    Pump to Centrifuge <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {activeStep === 3 && (
              <div style={styles.controlSection}>
                <div style={styles.progressContainer}>
                  <div style={styles.progressLabel}>SUGAR DRYNESS:</div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${molassesSeparated}%`, backgroundColor: 'var(--sugar-gold)' }} />
                    <span style={styles.progressValueText}>{molassesSeparated}%</span>
                  </div>
                </div>
                {molassesSeparated >= 100 && (
                  <button className="btn-primary animate-fade-in" onClick={handleNextStage} style={styles.actionBtn}>
                    Collect Sugar Crystals! <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* Victory Screen */}
            {activeStep === 4 && (
              <div style={styles.victorySection} className="animate-fade-in">
                <div style={styles.victoryIcon}>
                  <Award size={64} color="var(--sugar-gold)" />
                </div>
                
                <h2 style={styles.victoryTitle}>Mill Master Tycoon!</h2>
                <div className="ink-stamp green" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>PASSED EVALUATION</div>
                
                <p style={styles.victoryText}>
                  You successfully navigated the 19th-century sugar processing loop, turning raw stalks into crystals using our WebGL steam rollers and centrifuges!
                </p>

                <div style={styles.victoryFactBox}>
                  <h4 style={styles.factBoxHeader}>History Summary:</h4>
                  <ul style={styles.factBoxList}>
                    <li><strong>Cane Knives:</strong> Cutters sliced stalks near the root to maximize sweetness.</li>
                    <li><strong>Steam Mill:</strong> Crushing rollers squeezed the juice under intense mechanical pressure.</li>
                    <li><strong>Evaporators:</strong> Heat boiled out water; floaters had to be skimmed to avoid dark sugar grades.</li>
                    <li><strong>Centrifugals:</strong> Centrifugal spin separated molasses from yellow raw crystals.</li>
                  </ul>
                </div>

                <div style={styles.victoryBtns}>
                  <button className="btn-primary" onClick={handleRestartGame}>
                    <RefreshCw size={16} /> Process Another Crop
                  </button>
                </div>
              </div>
            )}

            {/* Stage History Box */}
            {activeStep < 4 && (
              <div style={styles.historyBox}>
                <div style={styles.historyHeader}>
                  <HelpCircle size={16} color="var(--tin-rust)" />
                  <span style={styles.historyTitleText}>PLANTATION HISTORY MANUAL</span>
                </div>
                <p style={styles.historyTextBody}>
                  {GAME_STEPS[activeStep].history}
                </p>
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
  gameWrapper: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '2rem'
  },
  stepNode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    border: '1px solid var(--kraft-tan-dark)',
    padding: '10px 4px',
    borderRadius: '4px',
    backgroundColor: 'var(--paper-light)',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textAlign: 'center'
  },
  stepNodeActive: {
    borderColor: 'var(--sugar-gold)',
    color: 'var(--koa-wood-dark)',
    backgroundColor: '#fffdf5',
    boxShadow: '0 0 0 1px var(--sugar-gold)'
  },
  stepNodePassed: {
    borderColor: 'var(--cane-green)',
    color: 'var(--cane-green)',
    backgroundColor: '#f7faf8'
  },
  stepNum: {
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  stepTitleLabel: {
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  arenaCard: {
    padding: '2.5rem 2rem',
    borderRadius: '8px',
    border: '2px solid var(--koa-wood)'
  },
  arenaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '0.75rem'
  },
  arenaTitle: {
    fontSize: '1.5rem',
    color: 'var(--koa-wood-dark)'
  },
  scoreContainer: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  instructionText: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginBottom: '2rem',
    fontStyle: 'italic'
  },
  controlSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginTop: '1.5rem',
    width: '100%'
  },
  progressText: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '1.1rem',
    display: 'flex',
    gap: '8px'
  },
  actionBtn: {
    width: '100%',
    maxWidth: '280px',
    justifyContent: 'center',
    marginTop: '0.5rem'
  },
  progressContainer: {
    width: '100%',
    maxWidth: '500px'
  },
  progressLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
    marginBottom: '6px'
  },
  progressBar: {
    width: '100%',
    height: '24px',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.2s'
  },
  progressValueText: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    color: 'var(--text-dark)',
    fontFamily: 'var(--font-typewriter)',
    mixBlendMode: 'difference'
  },
  boilerControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  },
  heatLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)'
  },
  heatBtns: {
    display: 'flex',
    gap: '6px'
  },
  heatBtn: {
    border: '1px solid var(--kraft-tan-dark)',
    backgroundColor: 'white',
    padding: '4px 10px',
    cursor: 'pointer',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem'
  },
  heatBtnActive: {
    backgroundColor: 'var(--tin-rust)',
    color: 'white',
    borderColor: 'var(--tin-rust)'
  },
  alertCard: {
    fontSize: '0.85rem',
    color: 'var(--tin-rust)',
    padding: '6px 12px',
    backgroundColor: 'rgba(178,78,44,0.05)',
    borderLeft: '4px solid var(--tin-rust)',
    marginTop: '0.5rem',
    textAlign: 'center'
  },
  victorySection: {
    textAlign: 'center',
    padding: '1.5rem 0'
  },
  victoryIcon: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: 'var(--paper-dark)',
    border: '3px solid var(--sugar-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto'
  },
  victoryTitle: {
    fontSize: '2rem',
    color: 'var(--cane-green)',
    marginBottom: '0.5rem'
  },
  victoryText: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    marginBottom: '2rem',
    maxWidth: '550px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  victoryFactBox: {
    backgroundColor: 'var(--paper-dark)',
    border: '1px solid var(--kraft-tan-dark)',
    padding: '1.5rem',
    borderRadius: '4px',
    textAlign: 'left',
    maxWidth: '500px',
    margin: '0 auto 2.5rem auto'
  },
  factBoxHeader: {
    fontSize: '1.15rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.75rem'
  },
  factBoxList: {
    listStyleType: 'square',
    paddingLeft: '1.5rem',
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  victoryBtns: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px'
  },
  historyBox: {
    borderTop: '1px solid var(--kraft-tan-dark)',
    paddingTop: '1.5rem',
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  historyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  historyTitleText: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    letterSpacing: '0.05em'
  },
  historyTextBody: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: 0
  }
};
