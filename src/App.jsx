import React, { useState } from 'react';
import Navbar from './components/Navbar';

// Vintage pages
import VintageHome from './pages/vintage/Home';
import VintageVisit from './pages/vintage/Visit';
import VintageStories from './pages/vintage/Stories';
import VintageLearn from './pages/vintage/Learn';
import CurriculumModule from './pages/vintage/CurriculumModule';
import VintageSupport from './pages/vintage/Support';
import VintageAbout from './pages/vintage/About';
import VintageTickets from './pages/vintage/Tickets';
import VintagePlay from './pages/vintage/Play';

import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [aboutTab, setAboutTab] = useState('history');
  const [learnModuleId, setLearnModuleId] = useState(null);

  const handlePageChange = (pageId) => {
    if (pageId === 'about') {
      setAboutTab('history');
    }
    if (pageId !== 'learn-module') {
      setLearnModuleId(null);
    }
    setActivePage(pageId);
  };

  const handleOpenLearnModule = (moduleId) => {
    setLearnModuleId(moduleId);
    setActivePage('learn-module');
  };

  const handleBackToLearn = () => {
    setLearnModuleId(null);
    setActivePage('learn');
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
        return <VintageLearn onOpenModule={handleOpenLearnModule} />;
      case 'learn-module':
        return (
          <CurriculumModule
            moduleId={learnModuleId}
            onBackToLearn={handleBackToLearn}
          />
        );
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
            key={activePage === 'learn-module' ? `learn-module-${learnModuleId}` : activePage}
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
