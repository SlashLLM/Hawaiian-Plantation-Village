import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminRoute from './components/admin/AdminRoute.jsx';

// Home is eagerly loaded since it's the landing page / LCP route
import VintageHome from './pages/vintage/Home.jsx';

// All other pages are lazy-loaded — they split into separate chunks
const VintageVisit = React.lazy(() => import('./pages/vintage/Visit.jsx'));
const VintageStories = React.lazy(() => import('./pages/vintage/Stories.jsx'));
const VintageArchives = React.lazy(() => import('./pages/vintage/Archives.jsx'));
const VintagePhotographDetail = React.lazy(() => import('./pages/vintage/PhotographDetail.jsx'));
const VintageLearn = React.lazy(() => import('./pages/vintage/Learn.jsx'));
const CurriculumModule = React.lazy(() => import('./pages/vintage/CurriculumModule.jsx'));
const VintageSupport = React.lazy(() => import('./pages/vintage/Support.jsx'));
const VintageAbout = React.lazy(() => import('./pages/vintage/About.jsx'));
const VintageTickets = React.lazy(() => import('./pages/vintage/Tickets.jsx'));
const VintagePlay = React.lazy(() => import('./pages/vintage/Play.jsx'));

const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard.jsx'));

function LazyFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ width: 28, height: 28, border: '3px solid var(--hairline)', borderTopColor: 'var(--heritage-gold)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LazyFallback />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<VintageHome />} />
            <Route path="visit" element={<VintageVisit />} />
            <Route path="stories" element={<VintageStories />} />
            <Route path="archives" element={<VintageArchives />} />
            <Route path="archives/:arkId" element={<VintagePhotographDetail />} />
            <Route path="play" element={<VintagePlay />} />
            <Route path="learn" element={<VintageLearn />} />
            <Route path="learn/:moduleId" element={<CurriculumModule />} />
            <Route path="support" element={<VintageSupport />} />
            <Route path="about" element={<VintageAbout />} />
            <Route path="tickets" element={<VintageTickets />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

