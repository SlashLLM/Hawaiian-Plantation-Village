import React from 'react';
import {
  blankChoice,
  blankPair,
  blankShift,
  bangoChallengeForSave,
  bellChallengeForSave,
  defaultGameChallenge,
  normalizeBangoPairs,
  normalizeBellShifts,
} from '../../lib/content/gameChallengeDefaults.js';

const DEFAULT_QUIZ = {
  type: 'quiz',
  question: '',
  choices: ['', ''],
  correctIndex: 0,
  feedback: { correct: '', incorrect: '' },
};

export function normalizeChallenge(challenge, lockedGameIds = []) {
  if (!challenge || typeof challenge !== 'object') return { ...DEFAULT_QUIZ };
  if (challenge.type === 'game') {
    const gameId = lockedGameIds.includes(challenge.gameId)
      ? challenge.gameId
      : (lockedGameIds[0] ?? 'bango-match');
    if (gameId === 'bango-match') {
      return {
        type: 'game',
        gameId: 'bango-match',
        title: challenge.title ?? defaultGameChallenge('bango-match').title,
        pairs: normalizeBangoPairs(challenge.pairs),
      };
    }
    if (gameId === 'bell-to-bell') {
      return {
        type: 'game',
        gameId: 'bell-to-bell',
        shifts: normalizeBellShifts(challenge.shifts),
      };
    }
    return { type: 'game', gameId };
  }
  const choices = Array.isArray(challenge.choices) && challenge.choices.length
    ? challenge.choices.map((c) => String(c ?? ''))
    : ['', ''];
  const correctIndex = Number.isFinite(challenge.correctIndex)
    ? Math.min(Math.max(0, challenge.correctIndex), choices.length - 1)
    : 0;
  return {
    type: 'quiz',
    question: challenge.question ?? '',
    choices,
    correctIndex,
    feedback: {
      correct: challenge.feedback?.correct ?? '',
      incorrect: challenge.feedback?.incorrect ?? '',
    },
  };
}

export function challengeForSave(challenge) {
  if (challenge?.type === 'game') {
    if (challenge.gameId === 'bango-match') return bangoChallengeForSave(challenge);
    if (challenge.gameId === 'bell-to-bell') return bellChallengeForSave(challenge);
    return { type: 'game', gameId: challenge.gameId };
  }
  const rawChoices = Array.isArray(challenge?.choices) ? challenge.choices : [];
  const originalCorrect = Number.isFinite(challenge?.correctIndex) ? challenge.correctIndex : 0;
  const kept = [];
  let correctIndex = 0;
  let foundCorrect = false;
  rawChoices.forEach((choice, index) => {
    const text = String(choice ?? '').trim();
    if (!text) return;
    if (index === originalCorrect) {
      correctIndex = kept.length;
      foundCorrect = true;
    }
    kept.push(text);
  });
  if (!foundCorrect) correctIndex = 0;
  if (correctIndex >= kept.length) correctIndex = Math.max(0, kept.length - 1);
  return {
    type: 'quiz',
    question: String(challenge?.question ?? '').trim(),
    choices: kept,
    correctIndex,
    feedback: {
      correct: String(challenge?.feedback?.correct ?? '').trim(),
      incorrect: String(challenge?.feedback?.incorrect ?? '').trim(),
    },
  };
}

function BangoPairEditor({ value, onChange }) {
  function updatePair(index, patch) {
    const pairs = value.pairs.map((p, i) => (i === index ? { ...p, ...patch } : p));
    onChange({ ...value, pairs });
  }

  return (
    <div className="admin-form-field full">
      <label className="admin-form-label">Title</label>
      <input
        className="admin-form-input"
        value={value.title}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
        aria-label="Bango match title"
        placeholder="Match each worker to their bango tag number"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.75rem 0 0.35rem' }}>
        <label className="admin-form-label" style={{ margin: 0 }}>Pairs</label>
        <button
          type="button"
          className="btn-secondary"
          style={{ fontSize: '0.75rem' }}
          onClick={() => onChange({ ...value, pairs: [...value.pairs, blankPair()] })}
        >
          Add pair
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>
        Each pair is a worker name card matched to a bango tag number.
      </p>
      {value.pairs.map((pair, index) => (
        <div
          key={pair.id || index}
          style={{
            border: '1px dashed var(--kraft-tan-dark, #c4b5a0)',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            display: 'grid',
            gap: '0.4rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '0.85rem' }}>Pair {index + 1}</strong>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem' }}
              disabled={value.pairs.length <= 2}
              onClick={() => onChange({ ...value, pairs: value.pairs.filter((_, i) => i !== index) })}
              aria-label={`Remove pair ${index + 1}`}
            >
              Remove
            </button>
          </div>
          <input
            className="admin-form-input"
            value={pair.number}
            onChange={(e) => updatePair(index, { number: e.target.value })}
            placeholder="Tag number (e.g. 142)"
            aria-label={`Pair ${index + 1} number`}
          />
          <input
            className="admin-form-input"
            value={pair.name}
            onChange={(e) => updatePair(index, { name: e.target.value })}
            placeholder="Worker name"
            aria-label={`Pair ${index + 1} name`}
          />
          <input
            className="admin-form-input"
            value={pair.origin}
            onChange={(e) => updatePair(index, { origin: e.target.value })}
            placeholder="Origin (e.g. Japan)"
            aria-label={`Pair ${index + 1} origin`}
          />
        </div>
      ))}
    </div>
  );
}

function BellShiftEditor({ value, onChange }) {
  function updateShift(index, patch) {
    const shifts = value.shifts.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange({ ...value, shifts });
  }

  function updateChoice(shiftIndex, choiceIndex, patch) {
    const shifts = value.shifts.map((s, i) => {
      if (i !== shiftIndex) return s;
      const choices = s.choices.map((c, ci) => (ci === choiceIndex ? { ...c, ...patch } : c));
      return { ...s, choices };
    });
    onChange({ ...value, shifts });
  }

  return (
    <div className="admin-form-field full">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <label className="admin-form-label" style={{ margin: 0 }}>Shifts</label>
        <button
          type="button"
          className="btn-secondary"
          style={{ fontSize: '0.75rem' }}
          onClick={() => onChange({ ...value, shifts: [...value.shifts, blankShift(value.shifts.length)] })}
        >
          Add shift
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>
        Each shift has a question and answer choices (with historical facts).
      </p>
      {value.shifts.map((shift, index) => (
        <div
          key={shift.id || index}
          style={{
            border: '1px dashed var(--kraft-tan-dark, #c4b5a0)',
            padding: '0.75rem',
            marginBottom: '0.75rem',
            display: 'grid',
            gap: '0.4rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '0.85rem' }}>Shift {index + 1}</strong>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem' }}
              disabled={value.shifts.length <= 1}
              onClick={() => onChange({ ...value, shifts: value.shifts.filter((_, i) => i !== index) })}
              aria-label={`Remove shift ${index + 1}`}
            >
              Remove
            </button>
          </div>
          <input
            className="admin-form-input"
            value={shift.title}
            onChange={(e) => updateShift(index, { title: e.target.value })}
            placeholder="Shift title"
            aria-label={`Shift ${index + 1} title`}
          />
          <input
            className="admin-form-input"
            value={shift.time}
            onChange={(e) => updateShift(index, { time: e.target.value })}
            placeholder="Time (e.g. 5:00 AM)"
            aria-label={`Shift ${index + 1} time`}
          />
          <textarea
            className="admin-form-textarea"
            rows={2}
            value={shift.bellContext}
            onChange={(e) => updateShift(index, { bellContext: e.target.value })}
            placeholder="Scene / bell context"
            aria-label={`Shift ${index + 1} context`}
          />
          <textarea
            className="admin-form-textarea"
            rows={2}
            value={shift.question}
            onChange={(e) => updateShift(index, { question: e.target.value })}
            placeholder="Question for this shift"
            aria-label={`Shift ${index + 1} question`}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
            <label className="admin-form-label" style={{ margin: 0 }}>Answers</label>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.7rem' }}
              onClick={() => updateShift(index, { choices: [...shift.choices, blankChoice()] })}
            >
              Add answer
            </button>
          </div>
          {shift.choices.map((choice, choiceIndex) => (
            <div
              key={choiceIndex}
              style={{
                background: 'rgba(0,0,0,0.03)',
                padding: '0.5rem',
                display: 'grid',
                gap: '0.35rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem' }}>Answer {choiceIndex + 1}</span>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.7rem' }}
                  disabled={shift.choices.length <= 2}
                  onClick={() => updateShift(index, {
                    choices: shift.choices.filter((_, ci) => ci !== choiceIndex),
                  })}
                  aria-label={`Remove shift ${index + 1} answer ${choiceIndex + 1}`}
                >
                  Remove
                </button>
              </div>
              <input
                className="admin-form-input"
                value={choice.text}
                onChange={(e) => updateChoice(index, choiceIndex, { text: e.target.value })}
                placeholder="Answer text"
                aria-label={`Shift ${index + 1} answer ${choiceIndex + 1} text`}
              />
              <textarea
                className="admin-form-textarea"
                rows={2}
                value={choice.fact}
                onChange={(e) => updateChoice(index, choiceIndex, { fact: e.target.value })}
                placeholder="Historical fact shown after choosing"
                aria-label={`Shift ${index + 1} answer ${choiceIndex + 1} fact`}
              />
              <input
                className="admin-form-input"
                value={choice.stamp}
                onChange={(e) => updateChoice(index, choiceIndex, { stamp: e.target.value })}
                placeholder="Stamp id (e.g. Japanese)"
                aria-label={`Shift ${index + 1} answer ${choiceIndex + 1} stamp`}
              />
              <input
                className="admin-form-input"
                value={choice.stampName}
                onChange={(e) => updateChoice(index, choiceIndex, { stampName: e.target.value })}
                placeholder="Stamp label (e.g. HAWAII - NIPPON)"
                aria-label={`Shift ${index + 1} answer ${choiceIndex + 1} stamp name`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Structured challenge editor for curriculum checkpoints.
 * Supports quiz (question + options) and locked game challenges with game-specific content.
 */
export default function ChallengeFields({ challenge, lockedGameIds = [], onChange }) {
  const value = normalizeChallenge(challenge, lockedGameIds);

  function setChallenge(next) {
    onChange(next);
  }

  function setType(type) {
    if (type === 'game') {
      const gameId = lockedGameIds[0] ?? 'bango-match';
      setChallenge(defaultGameChallenge(gameId));
      return;
    }
    setChallenge({ ...DEFAULT_QUIZ });
  }

  function setGameId(gameId) {
    setChallenge(defaultGameChallenge(gameId));
  }

  function updateChoice(index, text) {
    const choices = value.choices.map((c, i) => (i === index ? text : c));
    let correctIndex = value.correctIndex;
    if (correctIndex >= choices.length) correctIndex = Math.max(0, choices.length - 1);
    setChallenge({ ...value, choices, correctIndex });
  }

  function addChoice() {
    setChallenge({ ...value, choices: [...value.choices, ''] });
  }

  function removeChoice(index) {
    if (value.choices.length <= 2) return;
    const choices = value.choices.filter((_, i) => i !== index);
    let correctIndex = value.correctIndex;
    if (index === correctIndex) correctIndex = 0;
    else if (index < correctIndex) correctIndex -= 1;
    if (correctIndex >= choices.length) correctIndex = choices.length - 1;
    setChallenge({ ...value, choices, correctIndex });
  }

  return (
    <div className="admin-form-field full">
      <label className="admin-form-label">Challenge</label>
      <div className="admin-form-grid" style={{ marginTop: '0.35rem' }}>
        <div className="admin-form-field">
          <label className="admin-form-label">Type</label>
          <select
            className="admin-form-select"
            value={value.type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Challenge type"
          >
            <option value="quiz">Quiz</option>
            <option value="game">Game</option>
          </select>
        </div>

        {value.type === 'game' ? (
          <>
            <div className="admin-form-field">
              <label className="admin-form-label">Game</label>
              <select
                className="admin-form-select"
                value={value.gameId}
                onChange={(e) => setGameId(e.target.value)}
                aria-label="Game ID"
              >
                {lockedGameIds.map((id) => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>

            {value.gameId === 'bango-match' && (
              <BangoPairEditor value={value} onChange={setChallenge} />
            )}
            {value.gameId === 'bell-to-bell' && (
              <BellShiftEditor value={value} onChange={setChallenge} />
            )}
            {(value.gameId === 'camp-map' || value.gameId === 'pidgin-bridge') && (
              <div className="admin-form-field full">
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Content editor for this game is coming soon. The game ID will be saved on the checkpoint.
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="admin-form-field full">
              <label className="admin-form-label">Question</label>
              <textarea
                className="admin-form-textarea"
                rows={2}
                value={value.question}
                onChange={(e) => setChallenge({ ...value, question: e.target.value })}
                placeholder="What question should learners answer?"
                aria-label="Quiz question"
              />
            </div>

            <div className="admin-form-field full">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="admin-form-label" style={{ margin: 0 }}>Options</label>
                <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={addChoice}>
                  Add option
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>
                Select the radio button for the correct answer.
              </p>
              {value.choices.map((choice, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <input
                    type="radio"
                    name="correct-choice"
                    checked={value.correctIndex === index}
                    onChange={() => setChallenge({ ...value, correctIndex: index })}
                    aria-label={`Mark option ${index + 1} as correct`}
                  />
                  <input
                    className="admin-form-input"
                    value={choice}
                    onChange={(e) => updateChoice(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    aria-label={`Option ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => removeChoice(index)}
                    disabled={value.choices.length <= 2}
                    aria-label={`Remove option ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="admin-form-field full">
              <label className="admin-form-label">Correct feedback</label>
              <textarea
                className="admin-form-textarea"
                rows={2}
                value={value.feedback.correct}
                onChange={(e) => setChallenge({
                  ...value,
                  feedback: { ...value.feedback, correct: e.target.value },
                })}
                placeholder="Shown when the learner picks the right answer"
                aria-label="Correct feedback"
              />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label">Incorrect feedback</label>
              <textarea
                className="admin-form-textarea"
                rows={2}
                value={value.feedback.incorrect}
                onChange={(e) => setChallenge({
                  ...value,
                  feedback: { ...value.feedback, incorrect: e.target.value },
                })}
                placeholder="Shown when the learner picks a wrong answer"
                aria-label="Incorrect feedback"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
