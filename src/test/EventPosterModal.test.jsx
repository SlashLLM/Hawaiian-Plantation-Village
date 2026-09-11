import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventPosterModal from '../components/EventPosterModal.jsx';
import { ACTIVE_POSTER, isPosterCurrent, todayISO } from '../lib/eventPoster.js';

const navigate = vi.fn();
vi.mock('../hooks/useAppNavigate.js', () => ({
  useAppNavigate: () => navigate,
}));

// Render motion elements as plain DOM and drop the exit animation, so these
// tests assert when the modal closes rather than when framer-motion finishes
// animating it out.
vi.mock('framer-motion', () => {
  const MOTION_PROPS = new Set(['initial', 'animate', 'exit', 'transition', 'variants', 'layout']);
  const motion = new Proxy(
    {},
    {
      get: (_target, tag) => {
        const Component = React.forwardRef(({ children, ...props }, ref) => {
          const domProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !MOTION_PROPS.has(key)),
          );
          return React.createElement(tag, { ...domProps, ref }, children);
        });
        Component.displayName = `motion.${String(tag)}`;
        return Component;
      },
    },
  );
  return {
    motion,
    AnimatePresence: ({ children }) => children,
    useReducedMotion: () => false,
  };
});

/** The modal opens on a timer; this fast-forwards past it. */
async function openPoster() {
  await act(async () => {
    vi.advanceTimersByTime(2000);
  });
}

/**
 * jsdom never fetches images, so stub the preloader the component uses.
 * `imageLoads` decides whether the artwork resolves or 404s.
 */
const imageLoads = { ok: true };
function stubImageLoading() {
  vi.stubGlobal(
    'Image',
    class {
      set src(value) {
        this._src = value;
        setTimeout(() => (imageLoads.ok ? this.onload?.() : this.onerror?.()), 0);
      }
    },
  );
}

describe('event poster popup', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    // The poster retires itself after the event, so pin "now" to before it.
    vi.setSystemTime(new Date('2026-09-11T09:00:00'));
    window.localStorage.clear();
    navigate.mockClear();
    imageLoads.ok = true;
    stubImageLoading();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('shows the poster to a first-time visitor', async () => {
    render(<EventPosterModal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await openPoster();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Harvest Moon Festival/i })).toHaveAttribute(
      'src',
      ACTIVE_POSTER.src,
    );
  });

  it('does not show again on a later visit', async () => {
    const first = render(<EventPosterModal />);
    await openPoster();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    first.unmount();

    render(<EventPosterModal />);
    await openPoster();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on the close button and restores page scrolling', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<EventPosterModal />);
    await openPoster();
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('sends the visitor to the event page from the call to action', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<EventPosterModal />);
    await openPoster();

    await user.click(screen.getByRole('button', { name: ACTIVE_POSTER.ctaLabel }));
    expect(navigate).toHaveBeenCalledWith(ACTIVE_POSTER.ctaPage);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stays hidden once the event has passed', async () => {
    vi.setSystemTime(new Date('2026-09-27T09:00:00'));
    render(<EventPosterModal />);
    await openPoster();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stays silent when the artwork is missing, and does not burn the one showing', async () => {
    imageLoads.ok = false;
    const attempt = render(<EventPosterModal />);
    await openPoster();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    attempt.unmount();

    // Artwork uploaded later — the visitor must still get their look at it.
    imageLoads.ok = true;
    render(<EventPosterModal />);
    await openPoster();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('isPosterCurrent', () => {
  it('covers the day of the event and stops the day after', () => {
    expect(isPosterCurrent(ACTIVE_POSTER, '2026-09-11')).toBe(true);
    expect(isPosterCurrent(ACTIVE_POSTER, '2026-09-26')).toBe(true);
    expect(isPosterCurrent(ACTIVE_POSTER, '2026-09-27')).toBe(false);
  });

  it('treats a missing poster as nothing to show', () => {
    expect(isPosterCurrent(null, '2026-09-11')).toBe(false);
  });
});

describe('todayISO', () => {
  it('formats the local date, not UTC', () => {
    // Late local evening — a UTC-based format would roll this to the next day.
    expect(todayISO(new Date(2026, 8, 26, 23, 30))).toBe('2026-09-26');
  });
});
