import React, { useEffect, useState } from 'react';
import { Printer, RotateCcw, Save } from 'lucide-react';

const storageKey = (arkId) => `hpv:analyze:${arkId}`;

/**
 * Adapted from the National Archives photograph analysis method: meet the
 * photograph, observe its parts, make sense of it, then use it as evidence.
 * Drafts are the visitor's own — they stay in this browser and are never sent
 * anywhere, so no account or CMS write is involved.
 */
export default function AnalyzePhotographForm({ arkId, title, prompts }) {
  const [answers, setAnswers] = useState({});
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(arkId));
      setAnswers(raw ? JSON.parse(raw) : {});
    } catch {
      setAnswers({});
    }
    setSavedAt(null);
  }, [arkId]);

  useEffect(() => {
    if (!Object.keys(answers).length) return undefined;
    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey(arkId), JSON.stringify(answers));
        setSavedAt(new Date());
      } catch {
        /* private browsing: drafts simply are not kept */
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [answers, arkId]);

  function clearDraft() {
    try {
      window.localStorage.removeItem(storageKey(arkId));
    } catch {
      /* nothing to clear */
    }
    setAnswers({});
    setSavedAt(null);
  }

  return (
    <div>
      {prompts.map((prompt) => (
        <div key={prompt.id} className="analyze-step">
          <h3>{prompt.heading}</h3>
          {prompt.questions.map((question, index) => {
            const fieldId = `${prompt.id}-${index}`;
            return (
              <div key={question} className="analyze-question">
                <label htmlFor={fieldId}>{question}</label>
                <textarea
                  id={fieldId}
                  value={answers[fieldId] ?? ''}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [fieldId]: e.target.value }))}
                />
              </div>
            );
          })}
        </div>
      ))}

      <div
        className="no-print"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginTop: '2rem' }}
      >
        <button type="button" className="btn-accent" onClick={() => window.print()}>
          <Printer size={16} /> Print or save as PDF
        </button>
        <button type="button" className="btn-secondary" onClick={clearDraft}>
          <RotateCcw size={16} /> Clear answers
        </button>
        <span className="door-note" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Save size={14} />
          {savedAt
            ? `Draft saved in this browser at ${savedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
            : `Answers for “${title}” save automatically in this browser`}
        </span>
      </div>
    </div>
  );
}
