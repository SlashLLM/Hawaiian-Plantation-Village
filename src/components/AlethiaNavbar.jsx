import React, { useState } from 'react';
import { Menu, X, Ticket, Heart, RefreshCw, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlethiaNavbar({ activePage, setActivePage, setDesignMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'visit', label: 'Visit' },
    { id: 'stories', label: 'Stories' },
    { id: 'play', label: 'Play & Learn' },
    { id: 'learn', label: 'Learn' },
    { id: 'support', label: 'Support' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={styles.navContainer} className="theme-alethia">
      <div style={styles.navWrapper}>
        <div style={styles.logoGroup} onClick={() => handleNavClick('home')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}>
          <div style={styles.logoMark}>
            <Leaf size={22} color="var(--alethia-accent)" aria-hidden="true" />
          </div>
          <div style={styles.logoText}>
            <span style={styles.brandTitle}>Hawaiian Plantation Village</span>
            <span style={styles.brandSubtitle}>Ecosystem Intelligence Edition</span>
          </div>
        </div>

        <ul className="nav-desktop-links" style={styles.navLinksList}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                style={{
                  ...styles.navButton,
                  ...(activePage === link.id ? styles.navButtonActive : {}),
                }}
              >
                {link.label}
                {activePage === link.id && (
                  <motion.span
                    layoutId="alethiaActiveIndicator"
                    style={styles.activeLine}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-desktop-ctas" style={styles.ctaGroup}>
          <button onClick={() => setDesignMode('hub')} style={styles.switchBtn} title="Switch Design Mode">
            <RefreshCw size={14} /> Design Hub
          </button>
          <button onClick={() => handleNavClick('support')} style={styles.donateLink}>
            <Heart size={16} fill="currentColor" /> Donate
          </button>
          <button onClick={() => handleNavClick('tickets')} className="alethia-btn-primary" style={styles.ticketBtn}>
            <Ticket size={16} /> Let&apos;s Visit
          </button>
        </div>

        <button
          className="nav-mobile-toggle"
          style={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} color="var(--alethia-primary)" /> : <Menu size={24} color="var(--alethia-primary)" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={styles.mobileMenu}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  ...styles.mobileLink,
                  ...(activePage === link.id ? styles.mobileLinkActive : {}),
                }}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => handleNavClick('tickets')} className="alethia-btn-accent" style={styles.mobileCta}>
              Let&apos;s Visit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const styles = {
  navContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(244, 247, 245, 0.88)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid var(--alethia-border)',
  },
  navWrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0.85rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'var(--alethia-bg-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  brandTitle: {
    fontFamily: 'var(--font-alethia-display)',
    fontWeight: 700,
    fontSize: '0.95rem',
    color: 'var(--alethia-text)',
    lineHeight: 1.2,
  },
  brandSubtitle: {
    fontFamily: 'var(--font-alethia-body)',
    fontSize: '0.68rem',
    color: 'var(--alethia-text-muted)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  navLinksList: {
    display: 'flex',
    listStyle: 'none',
    gap: '0.25rem',
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
  },
  navButton: {
    position: 'relative',
    background: 'none',
    border: 'none',
    padding: '0.5rem 0.75rem',
    fontFamily: 'var(--font-alethia-body)',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--alethia-text-muted)',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  navButtonActive: {
    color: 'var(--alethia-primary)',
    fontWeight: 600,
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    left: '0.75rem',
    right: '0.75rem',
    height: 2,
    background: 'var(--alethia-accent)',
    borderRadius: 2,
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexShrink: 0,
  },
  switchBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '0.45rem 0.75rem',
    borderRadius: 999,
    border: '1px solid var(--alethia-border)',
    background: 'transparent',
    color: 'var(--alethia-text-muted)',
    fontSize: '0.75rem',
    cursor: 'pointer',
    fontFamily: 'var(--font-alethia-body)',
  },
  donateLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '0.45rem 0.85rem',
    borderRadius: 999,
    border: 'none',
    background: 'transparent',
    color: 'var(--alethia-primary)',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-alethia-body)',
  },
  ticketBtn: {
    padding: '0.55rem 1.1rem',
    fontSize: '0.82rem',
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '0 1.5rem 1rem',
    overflow: 'hidden',
  },
  mobileLink: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '0.75rem 0',
    fontFamily: 'var(--font-alethia-body)',
    fontSize: '0.95rem',
    color: 'var(--alethia-text-muted)',
    cursor: 'pointer',
    borderBottom: '1px solid var(--alethia-border)',
  },
  mobileLinkActive: {
    color: 'var(--alethia-primary)',
    fontWeight: 600,
  },
  mobileCta: {
    marginTop: '0.75rem',
    width: '100%',
    justifyContent: 'center',
  },
};
