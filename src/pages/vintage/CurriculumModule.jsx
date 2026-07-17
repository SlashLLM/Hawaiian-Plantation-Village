import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowLeft, ChevronRight, Award } from 'lucide-react';
import { useCurriculumModules } from '../../context/ContentProvider.jsx';
import CheckpointProgressBar from '../../components/curriculum/CheckpointProgressBar';
import CurriculumVideo from '../../components/curriculum/CurriculumVideo';
import CurriculumQuiz from '../../components/curriculum/CurriculumQuiz';
import BangoMatchPixi from '../../components/curriculum/BangoMatchPixi';
import BellToBell from '../../components/BellToBell';
import {
  DEFAULT_BANGO_PAIRS,
  DEFAULT_BANGO_TITLE,
  DEFAULT_BELL_SHIFTS,
} from '../../lib/content/gameChallengeDefaults.js';

function GameChallenge({ challenge, onComplete }) {
  const gameId = challenge?.gameId;

  if (gameId === 'bango-match') {
    return (
      <BangoMatchPixi
        onComplete={onComplete}
        pairs={challenge.pairs?.length ? challenge.pairs : DEFAULT_BANGO_PAIRS}
        title={challenge.title || DEFAULT_BANGO_TITLE}
      />
    );
  }

  if (gameId === 'bell-to-bell') {
    return (
      <BellToBell
        onComplete={onComplete}
        shifts={challenge.shifts?.length ? challenge.shifts : DEFAULT_BELL_SHIFTS}
      />
    );
  }

  return (
    <div style={{ padding: '1rem', border: '1px dashed var(--kraft-tan-dark)' }}>
      <p style={{ fontFamily: 'var(--font-body)', margin: 0 }}>
        This game ({gameId || 'unknown'}) is not available in the lesson player yet.
      </p>
    </div>
  );
}

export default function CurriculumModule() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const onBackToLearn = () => navigate('/learn');
  const { modules } = useCurriculumModules();
  const moduleList = useMemo(
    () => (Array.isArray(modules) ? modules : Object.values(modules ?? {})),
    [modules],
  );
  const module = moduleList.find((m) => m.id === moduleId);

  const [activeCheckpoint, setActiveCheckpoint] = useState(0);
  const [phase, setPhase] = useState('watch'); // 'watch' | 'challenge' | 'done'
  const [passedCheckpoints, setPassedCheckpoints] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    setActiveCheckpoint(0);
    setPhase('watch');
    setPassedCheckpoints([]);
    setGameComplete(false);
  }, [moduleId]);

  if (!module) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.fallbackContainer}>
          <p style={styles.bodyText}>Lesson not found.</p>
          <button type="button" className="btn-secondary" onClick={onBackToLearn}>
            Back to Learn
          </button>
        </div>
      </div>
    );
  }

  const checkpoint = module.checkpoints[activeCheckpoint];
  const isLastCheckpoint = activeCheckpoint === module.checkpoints.length - 1;

  const handleContinue = () => {
    setGameComplete(false);
    setPhase('challenge');
  };

  const handlePassChallenge = () => {
    const updated = [...passedCheckpoints];
    if (!updated.includes(activeCheckpoint)) {
      updated.push(activeCheckpoint);
    }
    setPassedCheckpoints(updated);
    setGameComplete(false);

    if (isLastCheckpoint) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#1b3823', '#d4981e', '#b24e2c', '#ebd7bc', '#22646d'],
      });
      setPhase('done');
    } else {
      setActiveCheckpoint((prev) => prev + 1);
      setPhase('watch');
    }
  };

  const handleGameComplete = () => {
    setGameComplete(true);
  };

  const gameCompleteCopy = checkpoint.challenge?.gameId === 'bell-to-bell'
    ? 'You finished the day log and collected passport stamps.'
    : 'You matched every worker to their bango tag. Plantation stores used these numbers to track purchases!';

  return (
    <div style={styles.pageContainer}>
      <div className="curriculum-layout" style={styles.layout}>
        <aside className="paper-card curriculum-sidebar" style={styles.sidebar}>
          <button type="button" className="btn-secondary" onClick={onBackToLearn} style={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Learn
          </button>

          <span className="ink-stamp green" style={styles.gradeStamp}>{module.grades}</span>

          <h1 style={styles.sidebarTitle}>{module.title}</h1>

          <div style={styles.sidebarDivider} />

          <CheckpointProgressBar
            checkpoints={module.checkpoints}
            activeIndex={activeCheckpoint}
            passedIndices={passedCheckpoints}
            variant="sidebar"
          />
        </aside>

        <main style={styles.main}>
          {phase === 'done' ? (
            <div className="paper-card" style={styles.completeCard}>
              <div style={styles.completeIcon}>
                <Award size={48} color="var(--sugar-gold)" />
              </div>
              <h2 style={styles.completeTitle}>Lesson Complete!</h2>
              <p style={styles.bodyText}>
                You finished all {module.checkpoints.length} checkpoints in this interactive lesson.
                Great work exploring plantation history!
              </p>
              <button type="button" className="btn-primary" onClick={onBackToLearn} style={styles.continueBtn}>
                Back to Learn
              </button>
            </div>
          ) : (
            <div className="paper-card" style={styles.contentCard}>
              <h2 style={styles.checkpointTitle}>{checkpoint.label}</h2>

              {phase === 'watch' && (
                <>
                  <CurriculumVideo src={checkpoint.video} />
                  <p style={styles.lessonText}>{checkpoint.text}</p>
                  <button type="button" className="btn-primary" onClick={handleContinue} style={styles.continueBtn}>
                    Continue <ChevronRight size={16} />
                  </button>
                </>
              )}

              {phase === 'challenge' && checkpoint.challenge.type === 'quiz' && (
                <CurriculumQuiz
                  challenge={checkpoint.challenge}
                  onPass={handlePassChallenge}
                />
              )}

              {phase === 'challenge' && checkpoint.challenge.type === 'game' && (
                <>
                  <GameChallenge
                    challenge={checkpoint.challenge}
                    onComplete={handleGameComplete}
                  />
                  {gameComplete && (
                    <div style={styles.gameCompleteBox} className="animate-fade-in">
                      <div className="ink-stamp green" style={styles.correctBadge}>COMPLETE</div>
                      <p style={styles.bodyText}>{gameCompleteCopy}</p>
                      <button type="button" className="btn-primary" onClick={handlePassChallenge} style={styles.continueBtn}>
                        Next Checkpoint <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '1.5rem',
    paddingBottom: '4rem',
    minHeight: 'calc(100vh - 80px)'
  },
  fallbackContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  layout: {},
  sidebar: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    alignSelf: 'flex-start'
  },
  gradeStamp: {
    alignSelf: 'flex-start',
    fontSize: '0.75rem'
  },
  sidebarTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    color: 'var(--text-primary)',
    lineHeight: 1.35,
    margin: 0
  },
  sidebarDivider: {
    height: '1px',
    borderTop: '1px dashed var(--kraft-tan-dark)',
    margin: '0.25rem 0 0.5rem'
  },
  main: {
    minWidth: 0
  },
  contentCard: {
    padding: '2rem'
  },
  checkpointTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: 'var(--text-primary)',
    marginBottom: '1.25rem'
  },
  lessonText: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.05rem',
    color: 'var(--text-primary)',
    lineHeight: 1.7,
    margin: '1.25rem 0 1.5rem'
  },
  continueBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '0.5rem'
  },
  bodyText: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    lineHeight: 1.6
  },
  completeCard: {
    padding: '3rem 2rem',
    textAlign: 'center'
  },
  completeIcon: {
    marginBottom: '1rem'
  },
  completeTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    color: 'var(--text-primary)',
    marginBottom: '1rem'
  },
  gameCompleteBox: {
    marginTop: '1.5rem',
    padding: '1.25rem',
    border: '1px dashed var(--kraft-tan-dark)',
    backgroundColor: 'rgba(235, 215, 188, 0.3)'
  },
  correctBadge: {
    display: 'inline-block',
    marginBottom: '0.75rem',
    fontSize: '0.75rem'
  }
};
