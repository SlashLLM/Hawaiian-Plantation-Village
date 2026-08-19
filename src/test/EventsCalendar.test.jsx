import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventsCalendar from '../components/EventsCalendar.jsx';

const EVENTS = [
  {
    slug: 'obon',
    startDate: '2026-08-15',
    endDate: '',
    date: 'Aug 15',
    title: 'Obon in the village',
    time: '5:00 PM',
    desc: 'Lanterns light the dancing area.',
  },
  {
    slug: 'harvest',
    startDate: '2026-08-20',
    endDate: '2026-08-22',
    date: 'Aug 20',
    title: 'Harvest Festival',
    time: '',
    desc: 'Cooking demonstrations at the homes.',
  },
];

describe('EventsCalendar', () => {
  it('marks each day that has an event, including every day of a range', () => {
    render(<EventsCalendar events={EVENTS} />);
    expect(screen.getByRole('button', { name: /August 15, 2026 — 1 event/ })).toBeTruthy();
    ['20', '21', '22'].forEach((day) => {
      expect(screen.getByRole('button', { name: new RegExp(`August ${day}, 2026 — 1 event`) })).toBeTruthy();
    });
    // A day with no event is not a button.
    expect(screen.queryByRole('button', { name: /August 16, 2026/ })).toBeNull();
  });

  it('opens the first upcoming month and expands a day when clicked', async () => {
    const user = userEvent.setup();
    render(<EventsCalendar events={EVENTS} />);
    expect(screen.getByText('August 2026')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /August 20, 2026/ }));
    expect(screen.getByText('Harvest Festival')).toBeTruthy();
    expect(screen.getByText('Cooking demonstrations at the homes.')).toBeTruthy();
    expect(screen.getByText('August 20, 2026')).toBeTruthy();
  });

  it('navigates between months across a year boundary', async () => {
    const user = userEvent.setup();
    render(<EventsCalendar events={[{ slug: 'x', startDate: '2026-12-05', title: 'Winter', desc: 'd' }]} />);
    expect(screen.getByText('December 2026')).toBeTruthy();
    await user.click(screen.getByLabelText('Next month'));
    expect(screen.getByText('January 2027')).toBeTruthy();
    await user.click(screen.getByLabelText('Previous month'));
    expect(screen.getByText('December 2026')).toBeTruthy();
  });

  it('ignores events with no resolvable date', () => {
    render(<EventsCalendar events={[{ slug: 's', date: 'Seasonal', title: 'Seasonal Festa', desc: 'd' }]} />);
    expect(screen.queryByText('Seasonal Festa')).toBeNull();
    expect(screen.getByText(/Select a marked day/)).toBeTruthy();
  });
});
