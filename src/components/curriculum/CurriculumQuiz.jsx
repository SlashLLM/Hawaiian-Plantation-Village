import React, { useState } from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';

export default function CurriculumQuiz({ challenge, onPass }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [result, setResult] = useState(null); // 'correct' | 'incorrect' | null

  const handleSelect = (index) => {
    if (result === 'correct') return;

    setSelectedIndex(index);
    if (index === challenge.correctIndex) {
      setResult('correct');
    } else {
      setResult('incorrect');
    }
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setResult(null);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Quick Check</h3>
      <p style={styles.question}>{challenge.question}</p>

      <div style={styles.choices}>
        {challenge.choices.map((choice, idx) => (
          <button
            key={idx}
            type="button"
            className="btn-secondary"
            onClick={() => handleSelect(idx)}
            disabled={result === 'correct'}
            style={{
              ...styles.choiceBtn,
              ...(selectedIndex === idx && result === 'incorrect' ? styles.choiceWrong : {}),
              ...(selectedIndex === idx && result === 'correct' ? styles.choiceCorrect : {})
            }}
          >
            {choice}
          </button>
        ))}
      </div>

      {result === 'incorrect' && (
        <div style={styles.feedbackBox} className="animate-fade-in">
          <p style={styles.feedbackText}>{challenge.feedback.incorrect}</p>
          <button type="button" className="btn-secondary" onClick={handleRetry} style={styles.retryBtn}>
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      )}

      {result === 'correct' && (
        <div style={styles.feedbackBox} className="animate-fade-in">
          <div className="ink-stamp green" style={styles.correctBadge}>CORRECT</div>
          <p style={styles.feedbackText}>{challenge.feedback.correct}</p>
          <button type="button" className="btn-primary" onClick={onPass} style={styles.nextBtn}>
            Next Checkpoint <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '0.5rem 0'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.35rem',
    color: 'var(--text-primary)',
    marginBottom: '0.75rem'
  },
  question: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.05rem',
    color: 'var(--text-primary)',
    lineHeight: 1.6,
    marginBottom: '1.25rem'
  },
  choices: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  choiceBtn: {
    textAlign: 'left',
    padding: '0.85rem 1.1rem',
    fontSize: '0.95rem'
  },
  choiceWrong: {
    borderColor: 'var(--rust-red)',
    color: 'var(--rust-red)'
  },
  choiceCorrect: {
    borderColor: 'var(--cane-green)',
    color: 'var(--cane-green)'
  },
  feedbackBox: {
    marginTop: '1.5rem',
    padding: '1.25rem',
    border: '1px dashed var(--kraft-tan-dark)',
    backgroundColor: 'rgba(235, 215, 188, 0.3)'
  },
  correctBadge: {
    display: 'inline-block',
    marginBottom: '0.75rem',
    fontSize: '0.75rem'
  },
  feedbackText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    lineHeight: 1.6,
    marginBottom: '1rem'
  },
  retryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  nextBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  }
};
