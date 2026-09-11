/**
 * Shared inline styles for page blocks, mirroring the hand-written vintage
 * pages so a built page is indistinguishable from a coded one.
 */
export const blockStyles = {
  split: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(2rem, 5vw, 4.5rem)',
    alignItems: 'center',
  },
  plate: {
    width: '100%',
    height: 'clamp(280px, 42vw, 460px)',
    objectFit: 'cover',
    borderRadius: 'var(--border-radius-md)',
    display: 'block',
  },
  /**
   * Standalone images keep their own shape — a portrait poster or flyer must
   * not be cropped to the landscape band `plate` uses. Capped so a very tall
   * image does not swallow the whole screen.
   */
  naturalImage: {
    display: 'block',
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '85vh',
    margin: '0 auto',
    borderRadius: 'var(--border-radius-md)',
  },
  body: {
    fontSize: '1.02rem',
    lineHeight: 1.7,
    marginBottom: '1rem',
  },
  caption: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginTop: '0.6rem',
  },
  quote: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
    lineHeight: 1.4,
    margin: 0,
  },
  attribution: {
    marginTop: '1rem',
    fontSize: '0.85rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
  },
  detailsCard: {
    padding: '1.5rem',
    marginTop: '1.5rem',
  },
  detailRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem 1.25rem',
    padding: '0.65rem 0',
    borderBottom: '1px solid var(--hairline)',
  },
  detailLabel: {
    minWidth: '9rem',
    fontSize: '0.8rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
  },
  detailValue: {
    flex: '1 1 12rem',
    fontSize: '1rem',
  },
  videoFrame: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    marginTop: '1.5rem',
    borderRadius: 'var(--border-radius-md)',
    overflow: 'hidden',
    background: 'var(--sand)',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1.5rem',
  },
};
