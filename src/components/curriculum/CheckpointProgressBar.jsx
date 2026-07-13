import React from 'react';
import { Check } from 'lucide-react';

export default function CheckpointProgressBar({ checkpoints, activeIndex, passedIndices, variant = 'sidebar' }) {
  const isSidebar = variant === 'sidebar';

  return (
    <div style={isSidebar ? styles.sidebar : styles.bar}>
      {checkpoints.map((checkpoint, idx) => {
        const isCompleted = passedIndices.includes(idx);
        const isActive = idx === activeIndex;
        const isLocked = idx > activeIndex && !isCompleted;

        return (
          <React.Fragment key={checkpoint.id}>
            <div
              style={{
                ...(isSidebar ? styles.sidebarNode : styles.node),
                ...(isActive ? styles.nodeActive : {}),
                ...(isCompleted ? styles.nodeCompleted : {}),
                ...(isLocked ? styles.nodeLocked : {})
              }}
            >
              <div
                style={{
                  ...styles.nodeCircle,
                  ...(isActive ? styles.nodeCircleActive : {}),
                  ...(isCompleted ? styles.nodeCircleCompleted : {})
                }}
              >
                {isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span style={isSidebar ? styles.sidebarLabel : styles.nodeLabel}>
                {checkpoint.label}
              </span>
            </div>
            {idx < checkpoints.length - 1 && (
              <div
                style={{
                  ...(isSidebar ? styles.sidebarConnector : styles.connector),
                  ...(isCompleted ? (isSidebar ? styles.sidebarConnectorCompleted : styles.connectorCompleted) : {})
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const styles = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    padding: '0.5rem 0'
  },
  bar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 0,
    padding: '1rem 0.5rem',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch'
  },
  sidebarNode: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.72rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    padding: '4px 0'
  },
  node: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minWidth: '72px',
    flexShrink: 0,
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
  },
  nodeActive: {
    color: 'var(--cane-green)'
  },
  nodeCompleted: {
    color: 'var(--cane-green)'
  },
  nodeLocked: {
    opacity: 0.45
  },
  nodeCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px dashed var(--kraft-tan-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--paper-light)',
    fontSize: '0.85rem',
    flexShrink: 0
  },
  nodeCircleActive: {
    borderColor: 'var(--cane-green)',
    borderStyle: 'solid',
    color: 'var(--cane-green)'
  },
  nodeCircleCompleted: {
    borderColor: 'var(--cane-green)',
    borderStyle: 'solid',
    backgroundColor: 'var(--cane-green)',
    color: 'var(--paper-light)'
  },
  sidebarLabel: {
    lineHeight: 1.3,
    letterSpacing: '0.02em'
  },
  nodeLabel: {
    textAlign: 'center',
    lineHeight: 1.2,
    maxWidth: '80px'
  },
  sidebarConnector: {
    width: '2px',
    height: '20px',
    marginLeft: '15px',
    borderLeft: '2px dashed var(--kraft-tan-dark)'
  },
  sidebarConnectorCompleted: {
    borderLeft: '2px solid var(--cane-green)'
  },
  connector: {
    flex: '1 1 24px',
    minWidth: '16px',
    maxWidth: '48px',
    height: '2px',
    marginTop: '16px',
    borderTop: '1px dashed var(--kraft-tan-dark)',
    background: 'none'
  },
  connectorCompleted: {
    borderTop: '2px solid var(--cane-green)'
  }
};
