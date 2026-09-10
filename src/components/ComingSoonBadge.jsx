import React from 'react';

// Marks a CTA whose flow is not open yet. `compact` is for tight rows like the
// desktop navbar, where the full label would push the nav into overflow.
export default function ComingSoonBadge({ compact = false, style }) {
  return (
    <span style={{ ...styles.badge, ...(compact ? styles.compact : null), ...style }}>
      {compact ? 'Soon' : 'Coming soon'}
    </span>
  );
}

const styles = {
  badge: {
    display: 'inline-block',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    // Longhand, not the `border` shorthand: callers override `borderColor` alone,
    // and mixing shorthand with longhand in a React style object drops the other sides.
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--hairline)',
    borderRadius: '999px',
    padding: '2px 8px',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  compact: {
    fontSize: '0.58rem',
    padding: '1px 5px',
    letterSpacing: '0.06em',
  },
};
