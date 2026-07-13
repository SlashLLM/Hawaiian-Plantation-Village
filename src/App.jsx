import React, { useState } from 'react';
import Navbar from './components/Navbar';

// Vintage pages
import VintageHome from './pages/vintage/Home';
import VintageVisit from './pages/vintage/Visit';
import VintageStories from './pages/vintage/Stories';
import VintageLearn from './pages/vintage/Learn';
import VintageSupport from './pages/vintage/Support';
import VintageAbout from './pages/vintage/About';
import VintageTickets from './pages/vintage/Tickets';
import VintagePlay from './pages/vintage/Play';

import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [aboutTab, setAboutTab] = useState('history');

  const handlePageChange = (pageId) => {
    if (pageId === 'about') {
      setAboutTab('history');
    }
    setActivePage(pageId);
  };

  // Render vintage pages
  const renderVintagePage = () => {
    switch (activePage) {
      case 'home':
        return <VintageHome setActivePage={handlePageChange} setAboutTab={setAboutTab} />;
      case 'visit':
        return <VintageVisit setActivePage={handlePageChange} />;
      case 'stories':
        return <VintageStories />;
      case 'play':
        return <VintagePlay />;
      case 'learn':
        return <VintageLearn />;
      case 'support':
        return <VintageSupport />;
      case 'about':
        return <VintageAbout activeTab={aboutTab} setActiveTab={setAboutTab} />;
      case 'tickets':
        return <VintageTickets setActivePage={handlePageChange} />;
      default:
        return <VintageHome setActivePage={handlePageChange} setAboutTab={setAboutTab} />;
    }
  };

  return (
    <div style={{ ...styles.appShell, backgroundColor: 'var(--paper-light)' }}>
      <Navbar activePage={activePage} setActivePage={handlePageChange} />
      <main style={styles.mainCanvas}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
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
  }
};
