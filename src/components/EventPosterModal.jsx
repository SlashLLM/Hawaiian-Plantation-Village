import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fetchSitePopup } from '../lib/content/cmsApi.js';
import {
  DEFAULT_POSTER_PAYLOAD,
  hasSeenPoster,
  isPosterCurrent,
  markPosterSeen,
  normalizePoster,
} from '../lib/eventPoster.js';

/** Let the page's entrance animation finish before the poster interrupts. */
const OPEN_DELAY_MS = 900;

/**
 * Where the popup config comes from. No published row yet → the built-in
 * default. A failed request → nothing, so an outage never resurrects a poster
 * an admin has switched off.
 */
async function loadPoster() {
  try {
    const payload = await fetchSitePopup();
    return normalizePoster(payload === undefined ? DEFAULT_POSTER_PAYLOAD : payload);
  } catch {
    return null;
  }
}

/**
 * Shows the current event poster once to each first-time visitor. Mounted from
 * PublicLayout, so it never appears on admin routes. Configured from
 * Admin → Content → Site Popup.
 *
 * The poster is loaded by URL rather than imported, so a missing or broken
 * image degrades to "no popup" instead of breaking the page.
 */
export default function EventPosterModal() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [poster, setPoster] = useState(null);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let cancelled = false;
    let loaded = false;
    let delayed = false;
    let current = null;
    const image = new Image();

    // Opens only once the artwork is decoded AND the delay has passed, so the
    // poster never flashes up empty. Marked as seen at that point and not
    // before: a visitor who was never actually shown it must still get it later.
    const openIfReady = () => {
      if (cancelled || !current || !loaded || !delayed) return;
      markPosterSeen(current);
      setPoster(current);
      setOpen(true);
    };

    image.onload = () => {
      loaded = true;
      openIfReady();
    };
    // Artwork missing or broken — stay silent rather than show a broken frame.
    image.onerror = () => {
      cancelled = true;
    };

    loadPoster().then((next) => {
      if (cancelled || !next || !isPosterCurrent(next) || hasSeenPoster(next)) return;
      current = next;
      image.src = next.src;
    });

    const timer = setTimeout(() => {
      delayed = true;
      openIfReady();
    }, OPEN_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    lastFocusedRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [open, close]);

  if (!poster) return null;

  const { link } = poster;
  const handleCta = () => {
    if (!link) return;
    close();
    if (link.external) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(link.href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Upcoming event"
          onClick={close}
        >
          <motion.div
            style={styles.panel}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              style={styles.close}
              onClick={close}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Already decoded by the preload above, so this renders from cache. */}
            <img
              src={poster.src}
              alt={poster.alt}
              style={link ? styles.poster : { ...styles.poster, cursor: 'default' }}
              onClick={handleCta}
            />

            <div style={styles.footer}>
              {poster.caption && (
                <p style={styles.caption}>{poster.caption}</p>
              )}
              <div style={styles.actions}>
                {link && (
                  <button type="button" className="btn-accent" onClick={handleCta}>
                    {link.label}
                  </button>
                )}
                <button type="button" className="btn-secondary" onClick={close}>
                  {link ? 'Maybe later' : 'Close'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(16, 26, 20, 0.72)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(0.75rem, 3vw, 2rem)',
    overflowY: 'auto',
  },
  panel: {
    position: 'relative',
    width: '100%',
    maxWidth: 'min(460px, 100%)',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--sugarcane-cream)',
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
    width: '34px',
    height: '34px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '1px solid var(--hairline-strong)',
    backgroundColor: 'var(--sugarcane-cream)',
    color: 'var(--plantation-ink)',
    cursor: 'pointer',
  },
  poster: {
    display: 'block',
    // Capped against the viewport so a tall poster on a short laptop window
    // scales down whole instead of overflowing and getting scrolled. Sizing by
    // height with `width: auto` keeps any aspect ratio uncropped; a poster
    // narrower than the panel just sits on a cream mat.
    width: 'auto',
    maxWidth: '100%',
    maxHeight: 'min(68vh, 820px)',
    margin: '0 auto',
    objectFit: 'contain',
    cursor: 'pointer',
  },
  footer: {
    padding: 'clamp(0.9rem, 3vw, 1.25rem)',
    borderTop: '1px solid var(--hairline)',
    textAlign: 'center',
    backgroundColor: 'var(--sugarcane-cream)',
  },
  caption: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    lineHeight: 1.5,
    color: 'var(--text-muted)',
    margin: '0 0 0.85rem',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.6rem',
  },
};
