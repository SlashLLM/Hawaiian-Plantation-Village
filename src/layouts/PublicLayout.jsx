import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import { pageIdFromPath } from '../lib/navigation.js';
import { ContentProvider, useSiteSettings } from '../context/ContentProvider.jsx';

function SeoHead() {
  const { settings } = useSiteSettings();
  useEffect(() => {
    if (settings?.seo?.title) document.title = settings.seo.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && settings?.seo?.description) desc.setAttribute('content', settings.seo.description);
  }, [settings]);
  return null;
}

function PublicLayoutInner() {
  const location = useLocation();
  const pageKey = location.pathname.startsWith('/learn/')
    ? `learn-module-${location.pathname.split('/').pop()}`
    : location.pathname;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--paper-light)' }}>
      <SeoHead />
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
