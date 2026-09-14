import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { Menu, X, Ticket, Heart, ChevronDown } from 'lucide-react';
import { pathFromPageId } from '../lib/navigation.js';
import { useSiteSettings } from '../context/ContentProvider.jsx';

// Nav items that open a dropdown instead of navigating. Keyed by nav id so the
// submenu still attaches when the nav list comes from CMS settings.
const NAV_SUBMENUS = {
  archives: [
    { id: 'archives', label: 'Photographs' },
    { id: 'newsletters', label: 'Newsletters' },
  ],
};

const isNewslettersPath = (pathname) => pathname.startsWith('/archives/newsletters');

export default function Navbar({ activePage }) {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = settings?.nav ?? [
    { id: 'visit', label: 'Visit' },
    { id: 'explore', label: 'Explore' },
    { id: 'stories', label: 'Stories' },
    { id: 'archives', label: 'Collections' },
    { id: 'play', label: 'Play & Learn' },
    { id: 'learn', label: 'Education' },
    { id: 'events', label: 'Events' },
    { id: 'support', label: 'Support Us' },
    { id: 'about', label: 'About' }
  ];

  const brand = settings?.brand ?? {};

  const handleNavClick = (pageId) => {
    navigate(pathFromPageId(pageId));
    setIsOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSubActive = (itemId) => {
    if (itemId === 'newsletters') return isNewslettersPath(location.pathname);
    if (itemId === 'archives') {
      return location.pathname.startsWith('/archives') && !isNewslettersPath(location.pathname);
    }
    return activePage === itemId;
  };

  useEffect(() => {
    if (!openDropdown) return undefined;
    const handlePointer = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpenDropdown(null);
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [openDropdown]);

  const isActive = (linkId) => {
    if (linkId === 'learn' && location.pathname.startsWith('/learn')) return true;
    if (linkId === 'archives' && location.pathname.startsWith('/archives')) return true;
    if (linkId === 'explore' && location.pathname.startsWith('/explore')) return true;
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
          {navLinks.map((link) => {
            const submenu = NAV_SUBMENUS[link.id];
            if (!submenu) {
              return (
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
              );
            }
            const expanded = openDropdown === link.id;
            return (
              <li
                key={link.id}
                ref={expanded ? dropdownRef : undefined}
                className="nav-dropdown"
                style={styles.navLinkItem}
                onMouseEnter={() => setOpenDropdown(link.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={expanded}
                  aria-controls={`nav-submenu-${link.id}`}
                  onClick={() => setOpenDropdown(expanded ? null : link.id)}
                  style={{
                    ...styles.navButton,
                    ...styles.navDropdownButton,
                    ...(isActive(link.id) ? styles.navButtonActive : {})
                  }}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    style={{ transition: 'transform 0.2s ease', transform: expanded ? 'rotate(180deg)' : 'none' }}
                  />
                  {isActive(link.id) && <span style={styles.activeDot} />}
                </button>
                {expanded && (
                  <ul id={`nav-submenu-${link.id}`} className="nav-dropdown-menu">
                    {submenu.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="nav-dropdown-item"
                          aria-current={isSubActive(item.id) ? 'page' : undefined}
                          onClick={() => handleNavClick(item.id)}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="nav-desktop-ctas" style={styles.ctaGroup}>
          <button onClick={() => handleNavClick('support')} style={styles.donateLink}>
            <Heart size={15} /> Donate
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
            {navLinks.map((link) => {
              const submenu = NAV_SUBMENUS[link.id];
              if (!submenu) {
                return (
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
                );
              }
              return (
                <li key={link.id} style={styles.mobileLinkItem}>
                  <span style={styles.mobileGroupLabel}>{link.label}</span>
                  <ul style={styles.mobileSubList}>
                    {submenu.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleNavClick(item.id)}
                          aria-current={isSubActive(item.id) ? 'page' : undefined}
                          style={{
                            ...styles.mobileNavButton,
                            ...styles.mobileSubButton,
                            ...(isSubActive(item.id) ? styles.mobileNavButtonActive : {})
                          }}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
            <li style={styles.mobileLinkItem}>
              <button onClick={() => handleNavClick('support')} style={{ ...styles.mobileNavButton, color: 'var(--terracotta-clay-deep)' }}>
                Donate
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
    // Wider than the 1180px editorial shell: nine nav items plus the brand and
    // two CTAs need ~1230px, and capping at 1180 crushed the brand column.
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '0.85rem clamp(0.85rem, 4vw, 2rem)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'clamp(0.75rem, 1.5vw, 1.25rem)'
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
    // flex/min-width live in index.css (.nav-logo-group): rigid in desktop mode
    // so the brand never gets crushed by the nav row, shrinkable in mobile mode
    // so it cannot push the menu toggle off a narrow screen.
  },
  logoImg: {
    height: '42px',
    width: '42px',
    objectFit: 'contain',
    flexShrink: 0
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: '500',
    fontSize: '1.15rem',
    color: 'var(--plantation-ink)',
    lineHeight: '1.2',
    letterSpacing: '-0.01em'
    // white-space lives in index.css (.nav-brand-title) so narrow-screen
    // overrides can win over it.
  },
  brandSubtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.68rem',
    letterSpacing: '0.1em',
    color: 'var(--muted-sage)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },
  navLinksList: {
    display: 'flex',
    listStyle: 'none',
    gap: 'clamp(10px, 1.15vw, 20px)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
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
    fontSize: '0.88rem',
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
  navDropdownButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px'
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
    gap: '14px',
    flex: '0 0 auto'
  },
  donateLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--terracotta-clay-deep)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap'
  },
  ticketBtn: {
    padding: '0.55rem 1.05rem',
    fontSize: '0.88rem',
    whiteSpace: 'nowrap'
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
  mobileGroupLabel: {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    fontWeight: '600',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
    padding: '8px 0 2px'
  },
  mobileSubList: {
    listStyle: 'none',
    margin: 0,
    padding: '0 0 0 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  mobileSubButton: {
    fontSize: '1rem'
  },
  mobileNavButtonActive: {
    fontWeight: '600',
    borderLeft: '2px solid var(--heritage-gold)',
    paddingLeft: '12px'
  }
};
