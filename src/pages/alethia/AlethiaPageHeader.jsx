import React from 'react';
import { motion } from 'framer-motion';

export default function AlethiaPageHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={styles.headerBlock}>
      <div style={styles.container}>
        <motion.span
          className="alethia-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          style={styles.pageTitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            style={styles.pageSubtitle}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

const styles = {
  headerBlock: {
    padding: '4rem 1.5rem 2.5rem',
    borderBottom: '1px solid var(--alethia-border)',
    background: 'linear-gradient(180deg, rgba(15,118,110,0.06) 0%, transparent 100%)',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  pageTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    marginTop: '0.75rem',
    marginBottom: '0.75rem',
    lineHeight: 1.1,
  },
  pageSubtitle: {
    fontSize: '1.05rem',
    color: 'var(--alethia-text-muted)',
    maxWidth: '640px',
    lineHeight: 1.65,
    margin: 0,
  },
};
