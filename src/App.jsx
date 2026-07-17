import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminRoute from './components/admin/AdminRoute.jsx';

import VintageHome from './pages/vintage/Home.jsx';
import VintageVisit from './pages/vintage/Visit.jsx';
import VintageStories from './pages/vintage/Stories.jsx';
import VintageLearn from './pages/vintage/Learn.jsx';
import CurriculumModule from './pages/vintage/CurriculumModule.jsx';
import VintageSupport from './pages/vintage/Support.jsx';
import VintageAbout from './pages/vintage/About.jsx';
import VintageTickets from './pages/vintage/Tickets.jsx';
import VintagePlay from './pages/vintage/Play.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<VintageHome />} />
          <Route path="visit" element={<VintageVisit />} />
          <Route path="stories" element={<VintageStories />} />
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
    </BrowserRouter>
  );
}
