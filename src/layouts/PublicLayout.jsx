import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import EventPosterModal from '../components/EventPosterModal.jsx';
import { pageIdFromPath } from '../lib/navigation.js';
import { ContentProvider } from '../context/ContentProvider.jsx';

/**
 * Page titles and meta come from each page's own <SEO> component. A layout-level
 * effect used to write document.title from settings.seo on every route change,
 * which raced with — and always beat — the per-page <SEO>, so every page shared
 * one title. The site-wide defaults for crawlers live in index.html instead.
 */
function PublicLayoutInner() {
  const location = useLocation();
  const pageKey = location.pathname.startsWith('/learn/')
    ? `learn-module-${location.pathname.split('/').pop()}`
    : location.pathname;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--paper-light)' }}>
      <Navbar activePage={pageIdFromPath(location.pathname)} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <EventPosterModal />
    </div>
  );
}

export default function PublicLayout() {
  return (
    <ContentProvider>
      <PublicLayoutInner />
    </ContentProvider>
  );
}
