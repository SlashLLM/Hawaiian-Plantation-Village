import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Calendar, HelpCircle, CheckCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const ARTIFACTS = [
  {
    id: 'bango',
    name: 'Bango Tag',
    desc: 'A small metal disk stamped with a number, issued to track work records and company store ledger credit.'
  },
  {
    id: 'knife',
    name: 'Cane Knife',
    desc: 'A heavy, curved steel blade used for cutting tough sugarcane stalks close to the ground all day.'
  },
  {
    id: 'tin',
    name: 'Kaukau Tin',
    desc: 'A multi-tiered metal lunch box used by field workers to carry meals and share food in the banyan shade.'
  },
  {
    id: 'forno',
    name: 'Forno Oven',
    desc: 'A dome-shaped brick and mortar oven introduced by Portuguese settlers to bake bread for the camps.'
  }
];

export default function Learn() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [matches, setMatches] = useState({}); // e.g. { bango: 'bango' } or similar
  const [errorText, setErrorText] = useState('');
  const [score, setScore] = useState(0);

  // Handle artifact description match
  const handleMatch = (descId) => {
    if (!selectedArtifact) {
      setErrorText('Please select an Artifact Tag from the left first!');
      return;
    }

    if (selectedArtifact.id === descId) {
      // Correct match
      setMatches((prev) => ({ ...prev, [descId]: true }));
      setSelectedArtifact(null);
      setErrorText('');
      setScore((s) => s + 25);

      // Check if all matched
      if (Object.keys(matches).length + 1 === ARTIFACTS.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      // Wrong match
      setErrorText(`Incorrect match! The ${selectedArtifact.name} does not match that description.`);
      setSelectedArtifact(null);
    }
  };

  const handleResetGame = () => {
    setSelectedArtifact(null);
    setMatches({});
    setErrorText('');
    setScore(0);
  };

  const isGameOver = Object.keys(matches).length === ARTIFACTS.length;

  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.sectionBadge}>EDUCATION RESOURCE</span>
          <h1 style={styles.title}>Exhibition Learning Portal</h1>
          <p style={styles.subtitle}>
            Explore our structured educational curricula, school tour programs, and test your knowledge of historical plantation artifacts.
          </p>
        </header>

        {/* Info Grid */}
        <div style={styles.infoGrid}>
          <div className="exhibit-glass-card" style={styles.infoCard}>
            <Calendar size={24} color="var(--exhibit-gold)" style={{ marginBottom: '1rem' }} />
            <h3 style={styles.infoTitle}>School Field Trips</h3>
            <p style={styles.infoText}>
              We offer interactive guided tours aligned with Hawaii Department of Education Social Studies standards. Students explore authentic houses and gardens, engaging with history directly.
            </p>
            <ul style={styles.infoList}>
              <li>Tours scheduled Tuesday – Friday mornings</li>
              <li>Aligned with Grade 4 & 7 Social Studies</li>
              <li>Free curriculum guides for teachers</li>
            </ul>
          </div>

          <div className="exhibit-glass-card" style={styles.infoCard}>
            <BookOpen size={24} color="var(--exhibit-gold)" style={{ marginBottom: '1rem' }} />
            <h3 style={styles.infoTitle}>Curricular Units</h3>
            <p style={styles.infoText}>
              Download our comprehensive lesson plans detailing plantation waves, the development of Hawaiian Pidgin, camp division and hierarchy, and the industrial mechanics of sugar extraction.
            </p>
            <button className="exhibit-btn-primary" style={{ marginTop: 'auto' }}>
              Download Teacher Pack
            </button>
          </div>
        </div>

        {/* Matching Game Section */}
        <div style={{ ...styles.gameSection, marginTop: '4rem' }} className="exhibit-glass-card">
          <div style={styles.gameHeader}>
            <div>
              <span style={styles.sectionBadge}>INTERACTIVE CHALLENGE</span>
              <h2 style={styles.gameTitle}>Plantation Artifact Matcher</h2>
              <p style={styles.gameSubtitle}>
                Select an artifact button on the left, then click on its matching historical description box on the right.
              </p>
            </div>
            <div style={styles.scoreContainer}>
              <span style={styles.scoreLabel}>LEARNING SCORE:</span>
              <strong style={styles.scoreValue}>{score} / 100 PTS</strong>
            </div>
          </div>

          {errorText && <div style={styles.errorAlert}>{errorText}</div>}

          {isGameOver ? (
            <div style={styles.victoryCard}>
              <Award size={48} color="var(--exhibit-gold)" style={{ marginBottom: '1rem' }} />
              <h3 style={styles.victoryTitle}>Quiz Finished! Perfect Match</h3>
              <p style={styles.victoryDesc}>
                Excellent work! You have successfully identified all four historic artifacts. You are ready to explore the physical exhibits.
              </p>
              <button className="exhibit-btn-primary" onClick={handleResetGame}>
                <RefreshCw size={16} /> Play Again
              </button>
            </div>
          ) : (
            <div style={styles.gameGrid}>
              
              {/* Artifact selection tags */}
              <div style={styles.tagsCol}>
                <h4 style={styles.colTitle}>1. Select Artifact</h4>
                <div style={styles.tagsList}>
                  {ARTIFACTS.map((art) => {
                    const isMatched = matches[art.id];
                    const isSelected = selectedArtifact?.id === art.id;

                    return (
                      <button
                        key={art.id}
                        onClick={() => {
                          if (isMatched) return;
                          setSelectedArtifact(art);
                          setErrorText('');
                        }}
                        disabled={isMatched}
                        style={{
                          ...styles.tagBtn,
                          ...(isSelected ? styles.tagBtnSelected : {}),
                          ...(isMatched ? styles.tagBtnMatched : {})
                        }}
                      >
                        {isMatched ? <CheckCircle size={14} color="#10b981" /> : <HelpCircle size={14} />}
                        <span>{art.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Descriptions list */}
              <div style={styles.descCol}>
                <h4 style={styles.colTitle}>2. Match Description</h4>
                <div style={styles.descList}>
                  {ARTIFACTS.map((art) => {
                    const isMatched = matches[art.id];

                    return (
                      <div
                        key={art.id}
                        onClick={() => {
                          if (isMatched) return;
                          handleMatch(art.id);
                        }}
                        style={{
                          ...styles.descBox,
                          ...(isMatched ? styles.descBoxMatched : {})
                        }}
                      >
                        <p style={styles.descText}>{art.desc}</p>
                        {isMatched && (
                          <div style={styles.matchedLabel}>
                            <CheckCircle size={12} color="#10b981" /> MATCHED TO: {art.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

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
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem'
  },
  infoCard: {
    padding: '2.5rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  infoTitle: {
    fontSize: '1.35rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem',
    fontFamily: 'var(--font-exhibit-display)'
  },
  infoText: {
    fontSize: '0.92rem',
    lineHeight: '1.6',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1.5rem'
  },
  infoList: {
    paddingLeft: '1.25rem',
    fontSize: '0.9rem',
    color: 'var(--exhibit-text-light)',
    lineHeight: '1.7'
  },
  gameSection: {
    padding: '2.5rem',
    boxSizing: 'border-box'
  },
  gameHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  gameTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--exhibit-text-light)',
    marginBottom: '0.5rem'
  },
  gameSubtitle: {
    fontSize: '0.9rem',
    color: 'var(--exhibit-text-muted)',
    margin: 0
  },
  scoreContainer: {
    backgroundColor: 'rgba(212,152,30,0.08)',
    border: '1px solid rgba(212,152,30,0.2)',
    padding: '8px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-exhibit-mono)'
  },
  scoreLabel: {
    fontSize: '0.75rem',
    color: 'var(--exhibit-text-muted)'
  },
  scoreValue: {
    fontSize: '0.95rem',
    color: 'var(--exhibit-gold)'
  },
  errorAlert: {
    backgroundColor: 'rgba(178,78,44,0.06)',
    border: '1px dashed rgba(178,78,44,0.25)',
    color: 'var(--exhibit-accent)',
    fontSize: '0.85rem',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '1.5rem'
  },
  gameGrid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2.5rem'
  },
  tagsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  colTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--exhibit-text-light)',
    fontFamily: 'var(--font-exhibit-display)',
    letterSpacing: '0.05em'
  },
  tagsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  tagBtn: {
    backgroundColor: 'rgba(27, 56, 35, 0.03)',
    border: '1px solid rgba(27, 56, 35, 0.12)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: 'var(--exhibit-text-light)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.92rem',
    fontWeight: '600',
    textAlign: 'left',
    transition: 'all 0.2s ease'
  },
  tagBtnSelected: {
    borderColor: 'var(--exhibit-gold)',
    backgroundColor: 'rgba(27, 56, 35, 0.06)',
    color: 'var(--exhibit-gold)',
    boxShadow: '0 4px 12px rgba(27, 56, 35, 0.05)'
  },
  tagBtnMatched: {
    borderColor: 'rgba(16,185,129,0.2)',
    backgroundColor: 'rgba(16,185,129,0.03)',
    color: 'rgba(27, 56, 35, 0.4)',
    cursor: 'not-allowed'
  },
  descCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  descList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  descBox: {
    backgroundColor: 'var(--exhibit-bg-card)',
    border: '1px solid rgba(27, 56, 35, 0.12)',
    borderRadius: '8px',
    padding: '14px 18px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative'
  },
  descBoxMatched: {
    borderColor: 'rgba(16,185,129,0.2)',
    backgroundColor: 'rgba(16,185,129,0.02)',
    cursor: 'not-allowed'
  },
  descText: {
    fontSize: '0.88rem',
    lineHeight: '1.5',
    color: 'var(--exhibit-text-muted)',
    margin: 0
  },
  matchedLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.72rem',
    fontWeight: '700',
    color: '#10b981',
    fontFamily: 'var(--font-exhibit-mono)',
    marginTop: '8px'
  },
  victoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2.5rem'
  },
  victoryTitle: {
    fontSize: '1.5rem',
    color: 'var(--exhibit-text-light)',
    marginBottom: '0.5rem'
  },
  victoryDesc: {
    fontSize: '0.9rem',
    color: 'var(--exhibit-text-muted)',
    lineHeight: '1.6',
    maxWidth: '450px',
    marginBottom: '1.5rem'
  },
  // Responsive layout overrides
  '@media (max-width: 768px)': {
    gameGrid: {
      gridTemplateColumns: '1fr'
    }
  }
};
