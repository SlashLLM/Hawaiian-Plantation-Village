import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tickets from '../pages/vintage/Tickets.jsx';

const { fetchEventsWithTickets, supabaseState } = vi.hoisted(() => ({
  fetchEventsWithTickets: vi.fn(() => Promise.resolve([])),
  supabaseState: { isSupabaseConfigured: false },
}));

vi.mock('../hooks/useAppNavigate.js', () => ({
  useAppNavigate: () => vi.fn(),
}));

vi.mock('../lib/api.js', () => ({
  createBooking: vi.fn(),
  fetchEventsWithTickets,
  formatCents: (cents) => `$${(cents / 100).toFixed(2)}`,
}));

vi.mock('../lib/supabase.js', () => ({
  get isSupabaseConfigured() {
    return supabaseState.isSupabaseConfigured;
  },
}));

vi.mock('../components/QRPass.jsx', () => ({
  default: () => null,
}));

vi.mock('../context/ContentProvider.jsx', () => ({
  usePageSection: () => ({ section: {} }),
  useSiteSettings: () => ({ settings: { donationPresets: [] } }),
}));

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('Tickets event cards', () => {
  beforeEach(() => {
    supabaseState.isSupabaseConfigured = false;
    fetchEventsWithTickets.mockResolvedValue([]);
  });

  it('shows description and schedule on event options', () => {
    render(<Tickets />);
    expect(screen.getByText('Walk the village trails with a resident guide.')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM – 12:00 PM')).toBeInTheDocument();
    expect(screen.getByText(/Aug 15, 2026 · 5:00 PM – 9:00 PM/)).toBeInTheDocument();
  });

  it('shows fallback ticket types with standard slugs on step 2', async () => {
    const user = userEvent.setup();
    render(<Tickets />);
    await user.click(screen.getByRole('button', { name: /Next Step/i }));
    expect(screen.getByText('General Admission (Adults 13+)')).toBeInTheDocument();
    expect(screen.getByText('Youth (Ages 5 – 12)')).toBeInTheDocument();
    expect(screen.getByText('Child (Under 5)')).toBeInTheDocument();
  });

  it('shows fallback tour time slots for the selected event', () => {
    render(<Tickets />);
    const timeSelect = screen.getByLabelText('Guided tour time');
    expect(timeSelect).toHaveValue('10:00 AM');
    expect(screen.getByRole('option', { name: '10:00 AM Guided Tour' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '12:00 PM Guided Tour' })).toBeInTheDocument();
  });
});

describe('Tickets catalog data from API', () => {
  beforeEach(() => {
    supabaseState.isSupabaseConfigured = true;
    fetchEventsWithTickets.mockResolvedValue([
      {
        slug: 'guided-tour',
        title: 'Daily Guided Tour',
        description: 'Walk the village trails with a resident guide.',
        is_special: false,
        start_time: '10:00 AM',
        end_time: '12:00 PM',
        ticket_types: [
          { id: 'tt-1', slug: 'general', label: 'General Entry', price_cents: 2000 },
          { id: 'tt-2', slug: 'kids-admission', label: 'Kids Admission', price_cents: 500 },
        ],
        tour_time_slots: [
          { id: 's1', label: '9:00 AM', sort_order: 1 },
          { id: 's2', label: '2:30 PM', sort_order: 2 },
        ],
      },
      {
        slug: 'evening-lantern',
        title: 'Evening Lantern Walk',
        description: 'A sunset walk through the village.',
        is_special: true,
        event_date: '2026-09-01',
        start_time: '6:00 PM',
        end_time: '8:00 PM',
        ticket_types: [
          { id: 'tt-3', slug: 'general', label: 'Lantern Pass', price_cents: 2500 },
        ],
        tour_time_slots: [
          { id: 's3', label: '6:00 PM', sort_order: 1 },
        ],
      },
    ]);
  });

  async function waitForCatalog() {
    await waitFor(() => expect(fetchEventsWithTickets).toHaveBeenCalled());
    await act(async () => {
      await fetchEventsWithTickets.mock.results[0].value;
    });
  }

  it('renders admin-configured ticket types with non-standard slugs', async () => {
    const user = userEvent.setup();
    render(<Tickets />);
    await waitForCatalog();
    await user.click(screen.getByRole('button', { name: /Next Step/i }));
    expect(screen.getByText('General Entry')).toBeInTheDocument();
    expect(screen.getByText('Kids Admission')).toBeInTheDocument();
    expect(screen.queryByText('General Admission (Adults 13+)')).not.toBeInTheDocument();
  });

  it('renders admin-configured tour times for the selected event', async () => {
    render(<Tickets />);
    await waitForCatalog();
    expect(screen.getByRole('option', { name: '9:00 AM Guided Tour' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '2:30 PM Guided Tour' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: '10:00 AM Guided Tour' })).not.toBeInTheDocument();
  });

  it('switches tour times and locks date when selecting a special event', async () => {
    const user = userEvent.setup();
    render(<Tickets />);
    await waitForCatalog();
    await user.click(screen.getByText('Evening Lantern Walk'));
    expect(screen.getByLabelText('Visit date')).toHaveValue('2026-09-01');
    expect(screen.getByLabelText('Visit date')).toHaveAttribute('readonly');
    expect(screen.getByRole('option', { name: '6:00 PM Guided Tour' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: '9:00 AM Guided Tour' })).not.toBeInTheDocument();
  });
});
