import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventPosterModal from '../components/EventPosterModal.jsx';
import {
  DEFAULT_POSTER_PAYLOAD,
  isPosterCurrent,
  normalizePoster,
  todayISO,
} from '../lib/eventPoster.js';
import { fetchSitePopup } from '../lib/content/cmsApi.js';

const ACTIVE_POSTER = normalizePoster(DEFAULT_POSTER_PAYLOAD);

const navigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

// No published row by default — the modal falls back to the built-in poster.
vi.mock('../lib/content/cmsApi.js', () => ({
  fetchSitePopup: vi.fn(() => Promise.resolve(undefined)),
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

/**
 * The modal loads its config, then opens on a timer; this fast-forwards past
 * both, flushing the promises in between.
 */
async function openPoster() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(2000);
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
    fetchSitePopup.mockReset();
    fetchSitePopup.mockResolvedValue(undefined);
    window.scrollTo = vi.fn();
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
    expect(screen.getByRole('img', { name: /Harvest Moon/i })).toHaveAttribute(
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

    await user.click(screen.getByRole('button', { name: ACTIVE_POSTER.link.label }));
    expect(navigate).toHaveBeenCalledWith('/events');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stays hidden once the event has passed', async () => {
    vi.setSystemTime(new Date('2026-10-01T09:00:00'));
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

describe('event poster popup — CMS configured', () => {
  const CMS_PAYLOAD = {
    enabled: true,
    id: 'popup-123',
    image: 'https://cdn.example.test/obon.jpg',
    alt: 'Obon Festival poster',
    caption: 'August 15',
    showUntil: '2026-12-31',
    link: { enabled: true, label: 'Obon details', kind: 'page', pageSlug: 'obon-festival' },
  };

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date('2026-09-11T09:00:00'));
    window.localStorage.clear();
    navigate.mockClear();
    fetchSitePopup.mockReset();
    window.scrollTo = vi.fn();
    imageLoads.ok = true;
    stubImageLoading();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('shows the CMS poster and opens the chosen event page', async () => {
    fetchSitePopup.mockResolvedValue(CMS_PAYLOAD);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<EventPosterModal />);
    await openPoster();

    expect(screen.getByRole('img', { name: 'Obon Festival poster' })).toHaveAttribute(
      'src',
      CMS_PAYLOAD.image,
    );
    await user.click(screen.getByRole('button', { name: 'Obon details' }));
    expect(navigate).toHaveBeenCalledWith('/events/obon-festival');
  });

  it('can send visitors to another site page', async () => {
    fetchSitePopup.mockResolvedValue({
      ...CMS_PAYLOAD,
      link: { label: 'Plan a visit', kind: 'site', sitePage: 'visit' },
    });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<EventPosterModal />);
    await openPoster();

    await user.click(screen.getByRole('button', { name: 'Plan a visit' }));
    expect(navigate).toHaveBeenCalledWith('/visit');
  });

  it('shows no call to action when the link target is missing', async () => {
    fetchSitePopup.mockResolvedValue({ ...CMS_PAYLOAD, link: { kind: 'page', pageSlug: '' } });
    render(<EventPosterModal />);
    await openPoster();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /details|learn more/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(2);
  });

  it('stays hidden when an admin switched it off', async () => {
    fetchSitePopup.mockResolvedValue({ ...CMS_PAYLOAD, enabled: false });
    render(<EventPosterModal />);
    await openPoster();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stays hidden when the popup config cannot be loaded', async () => {
    fetchSitePopup.mockRejectedValue(new Error('network down'));
    render(<EventPosterModal />);
    await openPoster();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
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
