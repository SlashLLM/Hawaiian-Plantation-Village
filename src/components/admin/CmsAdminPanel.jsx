import React, { useState } from 'react';
import CampStoriesPanel from './CampStoriesPanel.jsx';
import CommunityProgramsPanel from './CommunityProgramsPanel.jsx';
import NewsPanel from './NewsPanel.jsx';
import CareersPanel from './CareersPanel.jsx';
import CurriculumPanel from './CurriculumPanel.jsx';

const TABS = [
  { id: 'stories', label: 'Stories' },
  { id: 'events', label: 'Upcoming Events' },
  { id: 'news', label: 'News & Announcements' },
  { id: 'careers', label: 'Careers' },
  { id: 'curriculum', label: 'Curriculum' },
];

export default function CmsAdminPanel() {
  const [tab, setTab] = useState('stories');

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Content CMS</h2>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin-nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'stories' && <CampStoriesPanel />}
      {tab === 'events' && <CommunityProgramsPanel />}
      {tab === 'news' && <NewsPanel />}
      {tab === 'careers' && <CareersPanel />}
      {tab === 'curriculum' && <CurriculumPanel />}
    </div>
  );
}
