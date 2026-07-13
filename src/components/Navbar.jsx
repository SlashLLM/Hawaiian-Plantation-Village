import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X, Calendar, Ticket, Heart } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
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
        {/* Brand Logo & Title */}
        <div style={styles.logoGroup} onClick={() => handleNavClick('home')}>
          <img src={logo} alt="Hawaiian Plantation Village Logo" style={styles.logoImg} />
          <div style={styles.logoText}>
            <span style={styles.brandTitle}>Hawaiian Plantation Village</span>
            <span style={styles.brandSubtitle}>Waipahu, Oʻahu, Hawaiʻi</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
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
                {activePage === link.id && <span style={styles.activeDot} />}
              </button>
            </li>
          ))}
        </ul>

        {/* Action CTAs */}
        <div className="nav-desktop-ctas" style={styles.ctaGroup}>
          <button onClick={() => handleNavClick('support')} style={styles.donateLink}>
            <Heart size={16} /> Donate
          </button>
          <button onClick={() => handleNavClick('tickets')} className="btn-accent" style={styles.ticketBtn}>
            <Ticket size={16} /> Buy Tickets
          </button>
        </div>

        {/* Mobile Toggle Menu */}
        <button className="nav-mobile-toggle" style={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div style={styles.mobileMenu}>
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
                onClick={() => handleNavClick('support')}
                style={{ ...styles.mobileNavButton, color: 'var(--tin-rust)' }}
              >
                Donate Now
              </button>
            </li>
            <li style={styles.mobileLinkItem}>
              <button
                onClick={() => handleNavClick('tickets')}
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              >
                <Ticket size={16} /> Buy Tickets
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

const styles = {
  navContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'var(--paper-light)',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    boxShadow: 'var(--shadow-sm)',
    width: '100%'
  },
  navWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.75rem 1.5rem',
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
  logoImg: {
    height: '45px',
    width: '45px',
    objectFit: 'contain'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    fontSize: '1.25rem',
    color: 'var(--koa-wood)',
    lineHeight: '1.1'
  },
  brandSubtitle: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.7rem',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
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
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    position: 'relative',
    padding: '4px 0',
    textTransform: 'uppercase'
  },
  navButtonActive: {
    color: 'var(--cane-green)'
  },
  activeDot: {
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: 'var(--cane-green)'
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  donateLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--tin-rust)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textTransform: 'uppercase'
  },
  ticketBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem'
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--koa-wood)',
    cursor: 'pointer',
    padding: '4px'
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'var(--paper-light)',
    borderBottom: '2px solid var(--kraft-tan-dark)',
    boxShadow: 'var(--shadow-md)',
    padding: '1.5rem',
    zIndex: 99
  },
  mobileLinksList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  mobileLinkItem: {
    width: '100%'
  },
  mobileNavButton: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    textTransform: 'uppercase',
    padding: '8px 0'
  },
  mobileNavButtonActive: {
    color: 'var(--cane-green)',
    borderLeft: '4px solid var(--cane-green)',
    paddingLeft: '12px'
  }
};
