import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X, Sparkles, Ticket, Heart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExhibitionNavbar({ activePage, setActivePage, setDesignMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'visit', label: 'Visit' },
    { id: 'stories', label: 'Stories' },
    { id: 'play', label: 'Play & Learn' },
    { id: 'learn', label: 'Learn' },
    { id: 'support', label: 'Support' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={styles.navContainer} className="theme-exhibition">
      <div style={styles.navWrapper}>
        {/* Brand Group */}
        <div style={styles.logoGroup} onClick={() => handleNavClick('home')}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Hawaiian Plantation Village Logo" style={styles.logoImg} />
            <div style={styles.logoGlow} />
          </div>
          <div style={styles.logoText}>
            <span style={styles.brandTitle}>Hawaiian Plantation Village</span>
            <span style={styles.brandSubtitle}>Interactive 3D Exhibition</span>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="nav-desktop-links" style={styles.navLinksList}>
          {navLinks.map((link) => (
            <li key={link.id} style={styles.navLinkItem}>
              <button
                onClick={() => handleNavClick(link.id)}
                style={{
                  ...styles.navButton,
                  ...(activePage === link.id ? styles.navButtonActive : {})
                }}
              >
                {link.label}
                {activePage === link.id && (
                  <motion.span
                    layoutId="activeIndicatorExhibition"
                    style={styles.activeLine}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Action Group */}
        <div className="nav-desktop-ctas" style={styles.ctaGroup}>
          <button onClick={() => setDesignMode('hub')} style={styles.switchBtn} title="Switch Design Mode">
            <RefreshCw size={14} /> Design Hub
          </button>
          <button onClick={() => handleNavClick('support')} style={styles.donateLink}>
            <Heart size={16} fill="currentColor" /> Donate
          </button>
          <button onClick={() => handleNavClick('tickets')} className="exhibit-btn-primary" style={styles.ticketBtn}>
            <Ticket size={16} /> Buy Tickets
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-mobile-toggle" style={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} color="var(--exhibit-gold)" /> : <Menu size={24} color="var(--exhibit-gold)" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={styles.mobileMenu}
          >
            <ul style={styles.mobileLinksList}>
              {navLinks.map((link) => (
                <li key={link.id} style={styles.mobileLinkItem}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    style={{
                      ...styles.mobileNavButton,
                      ...(activePage === link.id ? styles.mobileNavButtonActive : {})
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li style={styles.mobileLinkItem}>
                <button
                  onClick={() => setDesignMode('hub')}
                  style={{ ...styles.mobileNavButton, color: 'var(--exhibit-gold)' }}
                >
                  Return to Design Hub
                </button>
              </li>
              <li style={styles.mobileLinkItem}>
                <button
                  onClick={() => handleNavClick('support')}
                  style={{ ...styles.mobileNavButton, color: 'var(--exhibit-accent)' }}
                >
                  Donate
                </button>
              </li>
              <li style={styles.mobileLinkItem}>
                <button
                  onClick={() => handleNavClick('tickets')}
                  className="exhibit-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Ticket size={16} /> Buy Tickets
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const styles = {
  navContainer: {
    width: '100%',
    backgroundColor: 'rgba(235, 243, 239, 0.95)',
    borderBottom: '1px solid rgba(27, 56, 35, 0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  },
  navWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  logoContainer: {
    position: 'relative',
    width: '42px',
    height: '42px'
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    zIndex: 2,
    position: 'relative'
  },
  logoGlow: {
    position: 'absolute',
    inset: '-2px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--exhibit-gold) 0%, transparent 70%)',
    opacity: 0.4,
    zIndex: 1
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandTitle: {
    fontFamily: 'var(--font-exhibit-display)',
    fontWeight: '700',
    fontSize: '1.05rem',
    color: 'var(--exhibit-text-light)',
    letterSpacing: '-0.01em',
    lineHeight: '1.2'
  },
  brandSubtitle: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.72rem',
    color: 'var(--exhibit-gold)',
    letterSpacing: '0.05em'
  },
  navLinksList: {
    display: 'flex',
    listStyle: 'none',
    gap: '1.75rem',
    margin: 0,
    padding: 0
  },
  navLinkItem: {
    display: 'flex',
    alignItems: 'center'
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: 'var(--exhibit-text-muted)',
    fontSize: '0.88rem',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '8px 0px',
    position: 'relative',
    transition: 'color 0.2s ease',
    fontFamily: 'var(--font-exhibit-sans)'
  },
  navButtonActive: {
    color: 'var(--exhibit-text-light)',
    fontWeight: '600'
  },
  activeLine: {
    position: 'absolute',
    bottom: '-12px',
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: 'var(--exhibit-gold)'
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem'
  },
  switchBtn: {
    background: 'none',
    color: 'var(--exhibit-text-muted)',
    fontSize: '0.8rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'color 0.2s ease',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  donateLink: {
    background: 'none',
    border: 'none',
    color: 'var(--exhibit-text-light)',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'opacity 0.2s ease'
  },
  ticketBtn: {
    padding: '0.6rem 1.25rem',
    fontSize: '0.85rem'
  },
  mobileToggle: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  },
  mobileMenu: {
    width: '100%',
    backgroundColor: '#ebf3ef',
    borderBottom: '1px solid rgba(27, 56, 35, 0.15)',
    padding: '1.5rem 2rem',
    boxSizing: 'border-box'
  },
  mobileLinksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  mobileLinkItem: {
    width: '100%'
  },
  mobileNavButton: {
    background: 'none',
    border: 'none',
    color: 'var(--exhibit-text-muted)',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    padding: '8px 0'
  },
  mobileNavButtonActive: {
    color: 'var(--exhibit-gold)',
    fontWeight: '600'
  }
};
