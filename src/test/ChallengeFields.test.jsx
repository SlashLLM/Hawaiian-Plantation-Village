import { describe, it, expect } from 'vitest';
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChallengeFields, {
  challengeForSave,
  normalizeChallenge,
} from '../components/admin/ChallengeFields.jsx';
import {
  DEFAULT_BANGO_PAIRS,
  DEFAULT_BANGO_TITLE,
  DEFAULT_BELL_SHIFTS,
} from '../lib/content/gameChallengeDefaults.js';

const LOCKED = ['bell-to-bell', 'bango-match', 'camp-map', 'pidgin-bridge'];

function ChallengeHarness({ initial }) {
  const [challenge, setChallenge] = useState(initial);
  return (
    <ChallengeFields
      challenge={challenge}
      lockedGameIds={LOCKED}
      onChange={setChallenge}
    />
  );
}

describe('ChallengeFields helpers', () => {
  it('normalizes empty challenge into a quiz template', () => {
    const quiz = normalizeChallenge(null, ['bango-match']);
    expect(quiz.type).toBe('quiz');
    expect(quiz.choices.length).toBe(2);
    expect(quiz.feedback).toEqual({ correct: '', incorrect: '' });
  });

  it('keeps camp-map game id without extra content', () => {
    const game = normalizeChallenge({ type: 'game', gameId: 'camp-map' }, ['bell-to-bell', 'camp-map']);
    expect(game).toEqual({ type: 'game', gameId: 'camp-map' });
  });

  it('fills default bango pairs when normalizing a bare game challenge', () => {
    const game = normalizeChallenge({ type: 'game', gameId: 'bango-match' }, LOCKED);
    expect(game.gameId).toBe('bango-match');
    expect(game.title).toBe(DEFAULT_BANGO_TITLE);
    expect(game.pairs).toHaveLength(DEFAULT_BANGO_PAIRS.length);
    expect(game.pairs[0].name).toBe('Tanaka');
  });

  it('preserves bango pairs on save and drops blank ones', () => {
    const saved = challengeForSave({
      type: 'game',
      gameId: 'bango-match',
      title: '  Match tags  ',
      pairs: [
        { id: 'a', number: '1', name: 'A', origin: 'Japan' },
        { id: 'blank', number: '', name: '', origin: '' },
        { id: 'b', number: '2', name: 'B', origin: 'China' },
      ],
    });
    expect(saved).toEqual({
      type: 'game',
      gameId: 'bango-match',
      title: 'Match tags',
      pairs: [
        { id: 'a', number: '1', name: 'A', origin: 'Japan' },
        { id: 'b', number: '2', name: 'B', origin: 'China' },
      ],
    });
  });

  it('preserves bell-to-bell shifts and answers on save', () => {
    const saved = challengeForSave({
      type: 'game',
      gameId: 'bell-to-bell',
      shifts: [
        {
          id: 1,
          title: ' Wake ',
          time: '5 AM',
          bellContext: ' Ring ',
          question: ' What? ',
          choices: [
            { text: ' Rice ', fact: ' Staple ', stamp: 'JP', stampName: 'NIPPON' },
            { text: '', fact: '', stamp: '', stampName: '' },
            { text: ' Taro ', fact: ' Root ', stamp: 'HI', stampName: 'ALOHA' },
          ],
        },
        {
          id: 2,
          title: '',
          time: '',
          bellContext: '',
          question: '',
          choices: [
            { text: '', fact: '', stamp: '', stampName: '' },
            { text: '', fact: '', stamp: '', stampName: '' },
          ],
        },
      ],
    });
    expect(saved.gameId).toBe('bell-to-bell');
    expect(saved.shifts).toHaveLength(1);
    expect(saved.shifts[0].title).toBe('Wake');
    expect(saved.shifts[0].choices).toEqual([
      { text: 'Rice', fact: 'Staple', stamp: 'JP', stampName: 'NIPPON' },
      { text: 'Taro', fact: 'Root', stamp: 'HI', stampName: 'ALOHA' },
    ]);
  });

  it('fills default bell shifts when normalizing an empty bell challenge', () => {
    const game = normalizeChallenge({ type: 'game', gameId: 'bell-to-bell' }, LOCKED);
    expect(game.shifts).toHaveLength(DEFAULT_BELL_SHIFTS.length);
    expect(game.shifts[0].question).toContain('kaukau');
  });

  it('trims quiz fields and drops blank choices on save', () => {
    const saved = challengeForSave({
      type: 'quiz',
      question: '  What year?  ',
      choices: [' 1852 ', '', ' 1878 '],
      correctIndex: 2,
      feedback: { correct: ' Yes ', incorrect: ' No ' },
    });
    expect(saved).toEqual({
      type: 'quiz',
      question: 'What year?',
      choices: ['1852', '1878'],
      correctIndex: 1,
      feedback: { correct: 'Yes', incorrect: 'No' },
    });
  });
});

describe('ChallengeFields UI', () => {
  it('shows pair fields for bango-match and shift fields for bell-to-bell', async () => {
    const user = userEvent.setup();
    render(<ChallengeHarness initial={{ type: 'game', gameId: 'bango-match' }} />);

    expect(screen.getByLabelText(/bango match title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pair 1 name/i)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/game id/i), 'bell-to-bell');

    expect(screen.getByLabelText(/shift 1 question/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/shift 1 answer 1 text/i)).toBeInTheDocument();
  });

  it('shows coming-soon note for camp-map', async () => {
    const user = userEvent.setup();
    render(<ChallengeHarness initial={{ type: 'game', gameId: 'bango-match' }} />);

    await user.selectOptions(screen.getByLabelText(/game id/i), 'camp-map');

    expect(screen.getByText(/content editor for this game is coming soon/i)).toBeInTheDocument();
  });
});
