import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X, TreePine, Ticket, Heart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NatureNavbar({ activePage, setActivePage, setDesignMode }) {
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
    <nav style={styles.navContainer}>
      <div style={styles.navWrapper}>
        {/* Brand Group */}
        <div style={styles.logoGroup} onClick={() => handleNavClick('home')}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Hawaiian Plantation Village Logo" style={styles.logoImg} />
            <div style={styles.logoGlow} />
          </div>
          <div style={styles.logoText}>
            <span style={styles.brandTitle}>Hawaiian Plantation Village</span>
            <span style={styles.brandSubtitle}>Waipahu Botanical Sanctuary</span>
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
                    layoutId="activeIndicator"
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
          <button onClick={() => handleNavClick('tickets')} className="nature-btn-accent" style={styles.ticketBtn}>
            <Ticket size={16} /> Get Tickets
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-mobile-toggle" style={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                  style={{ ...styles.mobileNavButton, color: 'var(--nature-earth)' }}
                >
                  Change Design Theme
                </button>
              </li>
              <li style={styles.mobileLinkItem}>
                <button
                  onClick={() => handleNavClick('support')}
                  style={{ ...styles.mobileNavButton, color: 'var(--nature-moss)' }}
                >
                  Donate Now
                </button>
              </li>
              <li style={styles.mobileLinkItem}>
                <button
                  onClick={() => handleNavClick('tickets')}
                  className="nature-btn-accent"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Ticket size={16} /> Get Tickets
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
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(245, 243, 235, 0.85)', // var(--nature-sand) with transparency
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(71, 118, 82, 0.12)',
    boxShadow: '0 4px 20px rgba(11, 36, 22, 0.03)',
    width: '100%',
    fontFamily: 'var(--font-nature-body)'
  },
  navWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.85rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  logoContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImg: {
    height: '42px',
    width: '42px',
    objectFit: 'contain',
    zIndex: 2
  },
  logoGlow: {
    position: 'absolute',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    filter: 'blur(8px)',
    zIndex: 1
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontWeight: '600',
    fontSize: '1.2rem',
    color: 'var(--nature-forest)',
    lineHeight: '1.1',
    letterSpacing: '-0.01em'
  },
  brandSubtitle: {
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: 'var(--nature-moss)',
    letterSpacing: '0.02em'
  },
  navLinksList: {
    display: 'flex',
    listStyle: 'none',
    gap: '24px',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    '@media (max-width: 900px)': {
      display: 'none'
    }
  },
  navLinkItem: {
    display: 'inline-block'
  },
  navButton: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#4b5563', // Gray 600
    cursor: 'pointer',
    position: 'relative',
    padding: '6px 0',
    transition: 'color 0.2s ease',
    textTransform: 'none'
  },
  navButtonActive: {
    color: 'var(--nature-forest)',
    fontWeight: '600'
  },
  activeLine: {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '2px',
    borderRadius: '2px',
    backgroundColor: 'var(--nature-moss)'
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  switchBtn: {
    background: 'none',
    border: '1px solid rgba(71, 118, 82, 0.25)',
    borderRadius: '30px',
    padding: '0.4rem 0.8rem',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--nature-moss)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease'
  },
  donateLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--nature-earth)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease'
  },
  ticketBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.5rem 1.1rem',
    fontSize: '0.85rem'
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--nature-forest)',
    cursor: 'pointer',
    padding: '4px'
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'var(--nature-sand)',
    borderBottom: '1px solid rgba(71, 118, 82, 0.12)',
    boxShadow: '0 12px 24px rgba(11, 36, 22, 0.06)',
    padding: '1.5rem',
    zIndex: 99,
    overflow: 'hidden'
  },
  mobileLinksList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    margin: 0,
    padding: 0
  },
  mobileLinkItem: {
    width: '100%'
  },
  mobileNavButton: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#4b5563',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    padding: '8px 0'
  },
  mobileNavButtonActive: {
    color: 'var(--nature-forest)',
    fontWeight: '700',
    borderLeft: '3px solid var(--nature-moss)',
    paddingLeft: '12px'
  }
};
