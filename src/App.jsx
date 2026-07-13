import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NatureNavbar from './components/NatureNavbar';

// Vintage pages
import VintageHome from './pages/vintage/Home';
import VintageVisit from './pages/vintage/Visit';
import VintageStories from './pages/vintage/Stories';
import VintageLearn from './pages/vintage/Learn';
import VintageSupport from './pages/vintage/Support';
import VintageAbout from './pages/vintage/About';
import VintageTickets from './pages/vintage/Tickets';
import VintagePlay from './pages/vintage/Play';

// Nature pages
import NatureHome from './pages/nature/Home';
import NatureVisit from './pages/nature/Visit';
import NatureStories from './pages/nature/Stories';
import NatureLearn from './pages/nature/Learn';
import NatureSupport from './pages/nature/Support';
import NatureAbout from './pages/nature/About';
import NatureTickets from './pages/nature/Tickets';
import NaturePlay from './pages/nature/Play';

// Design selector hub
import DesignHub from './pages/DesignHub';

// Exhibition components & pages
import ExhibitionNavbar from './components/ExhibitionNavbar';
import ExhibitionBackgroundPixi from './components/ExhibitionBackgroundPixi';
import ExhibitionHome from './pages/exhibition/Home';
import ExhibitionVisit from './pages/exhibition/Visit';
import ExhibitionStories from './pages/exhibition/Stories';
import ExhibitionPlay from './pages/exhibition/Play';
import ExhibitionLearn from './pages/exhibition/Learn';
import ExhibitionSupport from './pages/exhibition/Support';
import ExhibitionAbout from './pages/exhibition/About';
import ExhibitionTickets from './pages/exhibition/Tickets';

// Alethia edition
import AlethiaNavbar from './components/AlethiaNavbar';
import AlethiaBackgroundPixi from './components/AlethiaBackgroundPixi';
import AlethiaHome from './pages/alethia/Home';
import AlethiaVisit from './pages/alethia/Visit';
import AlethiaStories from './pages/alethia/Stories';
import AlethiaPlay from './pages/alethia/Play';
import AlethiaLearn from './pages/alethia/Learn';
import AlethiaSupport from './pages/alethia/Support';
import AlethiaAbout from './pages/alethia/About';
import AlethiaTickets from './pages/alethia/Tickets';

import { AnimatePresence, motion } from 'framer-motion';
import { Palette } from 'lucide-react';

export default function App() {
  const [designMode, setDesignMode] = useState('hub'); // 'hub' | 'vintage' | 'nature'
  const [activePage, setActivePage] = useState('home');

  // Render vintage pages
  const renderVintagePage = () => {
    switch (activePage) {
      case 'home':
        return <VintageHome setActivePage={setActivePage} />;
      case 'visit':
        return <VintageVisit setActivePage={setActivePage} />;
      case 'stories':
        return <VintageStories />;
      case 'play':
        return <VintagePlay />;
      case 'learn':
        return <VintageLearn />;
      case 'support':
        return <VintageSupport />;
      case 'about':
        return <VintageAbout />;
      case 'tickets':
        return <VintageTickets setActivePage={setActivePage} />;
      default:
        return <VintageHome setActivePage={setActivePage} />;
    }
  };

  // Render nature pages
  const renderNaturePage = () => {
    switch (activePage) {
      case 'home':
        return <NatureHome setActivePage={setActivePage} />;
      case 'visit':
        return <NatureVisit setActivePage={setActivePage} />;
      case 'stories':
        return <NatureStories />;
      case 'play':
        return <NaturePlay />;
      case 'learn':
        return <NatureLearn />;
      case 'support':
        return <NatureSupport />;
      case 'about':
        return <NatureAbout />;
      case 'tickets':
        return <NatureTickets setActivePage={setActivePage} />;
      default:
        return <NatureHome setActivePage={setActivePage} />;
    }
  };

  // Render exhibition pages
  const renderExhibitionPage = () => {
    switch (activePage) {
      case 'home':
        return <ExhibitionHome setActivePage={setActivePage} />;
      case 'visit':
        return <ExhibitionVisit setActivePage={setActivePage} />;
      case 'stories':
        return <ExhibitionStories />;
      case 'play':
        return <ExhibitionPlay />;
      case 'learn':
        return <ExhibitionLearn />;
      case 'support':
        return <ExhibitionSupport />;
      case 'about':
        return <ExhibitionAbout />;
      case 'tickets':
        return <ExhibitionTickets />;
      default:
        return <ExhibitionHome setActivePage={setActivePage} />;
    }
  };

  // Render alethia pages
  const renderAlethiaPage = () => {
    switch (activePage) {
      case 'home':
        return <AlethiaHome setActivePage={setActivePage} />;
      case 'visit':
        return <AlethiaVisit setActivePage={setActivePage} />;
      case 'stories':
        return <AlethiaStories />;
      case 'play':
        return <AlethiaPlay />;
      case 'learn':
        return <AlethiaLearn />;
      case 'support':
        return <AlethiaSupport />;
      case 'about':
        return <AlethiaAbout />;
      case 'tickets':
        return <AlethiaTickets />;
      default:
        return <AlethiaHome setActivePage={setActivePage} />;
    }
  };

  // Dynamically set background color of the app shell
  const getShellBg = () => {
    if (designMode === 'nature') return 'var(--nature-sand)';
    if (designMode === 'vintage') return 'var(--paper-light)';
    if (designMode === 'exhibition') return 'var(--exhibit-bg)';
    if (designMode === 'alethia') return 'var(--alethia-bg)';
    return '#111827'; // Design selector hub dark bg
  };

  return (
    <div style={{ ...styles.appShell, backgroundColor: getShellBg() }}>
      
      {/* 1. If in Selector Hub */}
      {designMode === 'hub' && (
        <DesignHub setDesignMode={(mode) => {
          setDesignMode(mode);
          setActivePage('home'); // Reset to home page on change
        }} />
      )}

      {/* 2. If in Vintage Ledger Edition */}
      {designMode === 'vintage' && (
        <>
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          <main style={styles.mainCanvas}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${designMode}-${activePage}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={styles.pageWrapper}
              >
                {renderVintagePage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}

      {/* 3. If in Nature Sanctuary Edition */}
      {designMode === 'nature' && (
        <>
          <NatureNavbar 
            activePage={activePage} 
            setActivePage={setActivePage} 
            setDesignMode={setDesignMode} 
          />
          <main style={styles.mainCanvas}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${designMode}-${activePage}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={styles.pageWrapper}
              >
                {renderNaturePage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}

      {/* 4. If in 3D Archival Exhibition Edition */}
      {designMode === 'exhibition' && (
        <>
          <ExhibitionBackgroundPixi />
          <ExhibitionNavbar 
            activePage={activePage} 
            setActivePage={setActivePage} 
            setDesignMode={setDesignMode} 
          />
          <main style={styles.mainCanvas}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${designMode}-${activePage}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={styles.pageWrapper}
              >
                {renderExhibitionPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}

      {/* 5. If in Alethia Ecosystem Intelligence Edition */}
      {designMode === 'alethia' && (
        <>
          <AlethiaBackgroundPixi />
          <AlethiaNavbar
            activePage={activePage}
            setActivePage={setActivePage}
            setDesignMode={setDesignMode}
          />
          <main style={styles.mainCanvas}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${designMode}-${activePage}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={styles.pageWrapper}
              >
                {renderAlethiaPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}

      {/* Floating Design Toggler */}
      {designMode !== 'hub' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDesignMode('hub')}
          style={{
            ...styles.floatingBadge,
            backgroundColor: designMode === 'nature' ? 'var(--nature-forest)' : designMode === 'vintage' ? 'var(--cane-green)' : designMode === 'alethia' ? 'var(--alethia-bg-dark)' : 'rgba(18, 22, 28, 0.95)',
            color: designMode === 'exhibition' ? 'var(--exhibit-text-light)' : designMode === 'alethia' ? 'var(--alethia-text-dark)' : 'var(--nature-mist)',
            borderColor: designMode === 'nature' ? 'rgba(255,255,255,0.15)' : designMode === 'vintage' ? 'var(--koa-wood)' : designMode === 'alethia' ? 'var(--alethia-accent)' : 'var(--exhibit-gold)'
          }}
          title="Return to Design Selection"
        >
          <Palette size={16} />
          <span>Switch Design Edition</span>
        </motion.button>
      )}
    </div>
  );
}

const styles = {
  appShell: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transition: 'background-color 0.4s ease'
  },
  mainCanvas: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
  },
  pageWrapper: {
    width: '100%',
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  floatingBadge: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1000,
    border: '1px solid',
    borderRadius: '50px',
    padding: '10px 18px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    fontSize: '0.85rem',
    transition: 'all 0.2s ease',
    fontFamily: 'system-ui, sans-serif'
  }
};
