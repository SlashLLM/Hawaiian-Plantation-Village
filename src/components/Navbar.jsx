import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { Menu, X, Ticket, Heart } from 'lucide-react';
import { pathFromPageId } from '../lib/navigation.js';
import { useSiteSettings } from '../context/ContentProvider.jsx';

export default function Navbar({ activePage }) {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = settings?.nav ?? [
    { id: 'home', label: 'Home' },
    { id: 'visit', label: 'Visit' },
    { id: 'stories', label: 'Stories' },
    { id: 'archives', label: 'Archives' },
    { id: 'play', label: 'Play & Learn' },
    { id: 'learn', label: 'Learn' },
    { id: 'support', label: 'Support' },
    { id: 'about', label: 'About' }
  ];

  const brand = settings?.brand ?? {};

  const handleNavClick = (pageId) => {
    navigate(pathFromPageId(pageId));
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (linkId) => {
    if (linkId === 'learn' && location.pathname.startsWith('/learn')) return true;
    if (linkId === 'archives' && location.pathname.startsWith('/archives')) return true;
    return activePage === linkId;
  };

  return (
    <nav style={styles.navContainer}>
      <div style={styles.navWrapper}>
        <div className="nav-logo-group" style={styles.logoGroup} onClick={() => handleNavClick('home')}>
          <img src={logo} alt="Hawaii's Plantation Village Logo" style={styles.logoImg} />
          <div style={styles.logoText}>
            <span className="nav-brand-title" style={styles.brandTitle}>{brand.title ?? 'Hawaii\'s Plantation Village'}</span>
            <span className="nav-brand-subtitle" style={styles.brandSubtitle}>{brand.subtitle ?? 'Waipahu, Oʻahu, Hawaiʻi'}</span>
          </div>
        </div>

        <ul className="nav-desktop-links" style={styles.navLinksList}>
          {navLinks.map((link) => (
            <li key={link.id} style={styles.navLinkItem}>
              <button
                onClick={() => handleNavClick(link.id)}
                style={{
                  ...styles.navButton,
                  ...(isActive(link.id) ? styles.navButtonActive : {})
                }}
              >
                {link.label}
                {isActive(link.id) && <span style={styles.activeDot} />}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-desktop-ctas" style={styles.ctaGroup}>
          <button onClick={() => handleNavClick('support')} style={styles.donateLink}>
            <Heart size={15} /> Give
          </button>
          <button onClick={() => handleNavClick('tickets')} className="btn-accent" style={styles.ticketBtn}>
            <Ticket size={15} /> Get tickets
          </button>
        </div>

        <button className="nav-mobile-toggle" style={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div style={styles.mobileMenu}>
          <ul style={styles.mobileLinksList}>
            {navLinks.map((link) => (
              <li key={link.id} style={styles.mobileLinkItem}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    ...styles.mobileNavButton,
                    ...(isActive(link.id) ? styles.mobileNavButtonActive : {})
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li style={styles.mobileLinkItem}>
              <button onClick={() => handleNavClick('support')} style={{ ...styles.mobileNavButton, color: 'var(--terracotta-clay-deep)' }}>
                Give
              </button>
            </li>
            <li style={styles.mobileLinkItem}>
              <button onClick={() => handleNavClick('tickets')} className="btn-accent" style={{ width: '100%', marginTop: '10px' }}>
                <Ticket size={16} /> Get tickets
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
    backgroundColor: 'rgba(250, 246, 236, 0.94)',
    backdropFilter: 'saturate(140%) blur(8px)',
    borderBottom: '1px solid var(--hairline)',
    width: '100%'
  },
  navWrapper: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0.85rem clamp(0.85rem, 4vw, 2.5rem)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 2vw, 1.5rem)'
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    minWidth: 0,
    flex: '1 1 auto'
  },
  logoImg: {
    height: '42px',
    width: '42px',
    objectFit: 'contain',
    flexShrink: 0
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },
  brandTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: '500',
    fontSize: '1.2rem',
    color: 'var(--plantation-ink)',
    lineHeight: '1.15',
    letterSpacing: '-0.01em',
    whiteSpace: 'normal'
  },
  brandSubtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    color: 'var(--muted-sage)',
    textTransform: 'uppercase'
  },
  navLinksList: {
    display: 'flex',
    listStyle: 'none',
    gap: 'clamp(12px, 1.7vw, 24px)',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  navLinkItem: {
    display: 'inline-block'
  },
  navButton: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.92rem',
    fontWeight: '500',
    color: 'var(--plantation-ink)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',
    padding: '4px 0'
  },
  navButtonActive: {
    fontWeight: '600'
  },
  activeDot: {
    position: 'absolute',
    bottom: '-6px',
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: 'var(--heritage-gold)'
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px'
  },
  donateLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--terracotta-clay-deep)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  ticketBtn: {
    padding: '0.55rem 1.1rem',
    fontSize: '0.9rem'
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--plantation-ink)',
    cursor: 'pointer',
    padding: '4px',
    flexShrink: 0
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'var(--sugarcane-cream)',
    borderBottom: '1px solid var(--hairline)',
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
    fontFamily: 'var(--font-sans)',
    fontSize: '1.05rem',
    fontWeight: '500',
    color: 'var(--plantation-ink)',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    padding: '8px 0'
  },
  mobileNavButtonActive: {
    fontWeight: '600',
    borderLeft: '2px solid var(--heritage-gold)',
    paddingLeft: '12px'
  }
};
