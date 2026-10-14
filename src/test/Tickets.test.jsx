import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tickets from '../pages/vintage/Tickets.jsx';

const { createBooking, paymentsState } = vi.hoisted(() => ({
  createBooking: vi.fn(),
  paymentsState: { enabled: true },
}));

vi.mock('../hooks/useAppNavigate.js', () => ({
  useAppNavigate: () => vi.fn(),
}));

vi.mock('../lib/api.js', () => ({
  createBooking,
  formatCents: (cents) => `$${(cents / 100).toFixed(2)}`,
}));

vi.mock('../components/QRPass.jsx', () => ({
  default: () => null,
}));

vi.mock('../context/ContentProvider.jsx', () => ({
  usePageSection: () => ({ section: {} }),
  useSiteSettings: () => ({ settings: { donationPresets: [] } }),
}));

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

// The booking wizard only renders while payments are switched on, so the suites
// below opt in. See src/lib/paymentsConfig.js.
vi.mock('../lib/paymentsConfig.js', () => ({
  get PAYMENTS_ENABLED() {
    return paymentsState.enabled;
  },
  COMING_SOON_COPY: {
    tickets: {
      eyebrow: 'Coming soon',
      title: 'Online ticket booking is on its way',
      body: 'We haven’t set up online payments yet.',
    },
  },
}));

beforeEach(() => {
  paymentsState.enabled = true;
});

describe('Tickets event cards', () => {
  it('shows description and schedule on event options', () => {
    render(<Tickets />);
    expect(screen.getByText('Walk the village trails with a resident guide.')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM – 12:00 PM')).toBeInTheDocument();
    expect(screen.getByText(/Aug 15, 2026 · 5:00 PM – 9:00 PM/)).toBeInTheDocument();
  });

  it('shows static ticket types on step 2', async () => {
    const user = userEvent.setup();
    render(<Tickets />);
    await user.click(screen.getByRole('button', { name: /Next Step/i }));
    expect(screen.getByText('General Admission')).toBeInTheDocument();
    expect(screen.getByText('Youth (11 – 17)')).toBeInTheDocument();
    expect(screen.getByText('Children (5 – 10)')).toBeInTheDocument();
    expect(screen.getByText('Children (4 & under)')).toBeInTheDocument();
  });

  it('shows static tour time slots for the selected event', () => {
    render(<Tickets />);
    const timeSelect = screen.getByLabelText('Guided tour time');
    expect(timeSelect).toHaveValue('10:00 AM');
    expect(screen.getByRole('option', { name: '10:00 AM Guided Tour' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: '12:00 PM Guided Tour' })).not.toBeInTheDocument();
  });
});

describe('Tickets static catalog', () => {
  it('switches tour times and locks date when selecting a special event', async () => {
    const user = userEvent.setup();
    render(<Tickets />);
    await user.click(screen.getByText('Obon Festival & Bon Dance (August 15)'));
    expect(screen.getByLabelText('Visit date')).toHaveValue('2026-08-15');
    expect(screen.getByLabelText('Visit date')).toHaveAttribute('readonly');
    expect(screen.getByRole('option', { name: '5:00 PM Guided Tour' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: '10:00 AM Guided Tour' })).not.toBeInTheDocument();
  });

  it('sends ticket type slugs to create-booking', async () => {
    const user = userEvent.setup();
    createBooking.mockResolvedValue({ booking: null });
    const { container } = render(<Tickets />);
    await user.click(screen.getByRole('button', { name: /Next Step/i }));
    const adultRow = screen.getByText('General Admission').closest('div').parentElement;
    await user.click(within(adultRow).getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: /Next Step/i }));
    await user.click(screen.getByRole('button', { name: /Proceed to Checkout/i }));
    const [first, last, email] = container.querySelectorAll('form input');
    await user.type(first, 'Ana');
    await user.type(last, 'Lee');
    await user.type(email, 'ana@example.com');
    await user.click(screen.getByRole('button', { name: /Complete Registration/i }));
    await waitFor(() => expect(createBooking).toHaveBeenCalled());
    expect(createBooking.mock.calls[0][0]).toMatchObject({
      eventSlug: 'guided-tour',
      items: [{ ticketTypeSlug: 'adult', quantity: 1 }],
    });
  });
});

describe('Tickets while payments are not connected', () => {
  beforeEach(() => {
    paymentsState.enabled = false;
  });

  it('shows the coming soon notice instead of the booking wizard', () => {
    render(<Tickets />);
    expect(screen.getByText('Online ticket booking is on its way')).toBeInTheDocument();
    expect(screen.queryByText('1. Select Tour Experience')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next Step/i })).not.toBeInTheDocument();
  });

  it('offers the phone number as a tel: link so visitors can call', () => {
    render(<Tickets />);
    expect(screen.getByRole('link', { name: /\(808\) 677-0110/ })).toHaveAttribute('href', 'tel:8086770110');
  });
});
