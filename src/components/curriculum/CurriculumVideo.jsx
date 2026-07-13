import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function CurriculumVideo({ src }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div style={styles.fallback} className="paper-card">
        <div style={styles.fallbackIcon}>
          <Play size={32} color="var(--text-muted)" />
        </div>
        <p style={styles.fallbackText}>
          Video coming soon — read the lesson below to continue learning.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <video
        style={styles.video}
        src={src}
        controls
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '2px dashed var(--kraft-tan-dark)',
    backgroundColor: '#1a1410'
  },
  video: {
    width: '100%',
    display: 'block',
    maxHeight: '360px',
    objectFit: 'contain'
  },
  fallback: {
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
    border: '2px dashed var(--kraft-tan-dark)'
  },
  fallbackIcon: {
    marginBottom: '1rem',
    opacity: 0.6
  },
  fallbackText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    margin: 0
  }
};
