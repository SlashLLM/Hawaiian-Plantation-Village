import React, { useCallback, useState } from 'react';
import CampStoriesPanel from './CampStoriesPanel.jsx';
import PhotographsPanel from './PhotographsPanel.jsx';
import CommunityProgramsPanel from './CommunityProgramsPanel.jsx';
import CustomPagesPanel from './CustomPagesPanel.jsx';
import NewsPanel from './NewsPanel.jsx';
import CareersPanel from './CareersPanel.jsx';
import CurriculumPanel from './CurriculumPanel.jsx';
import SitePopupPanel from './SitePopupPanel.jsx';

const TABS = [
  { id: 'stories', label: 'Stories' },
  { id: 'photographs', label: 'Archives' },
  { id: 'events', label: 'Upcoming Events' },
  { id: 'pages', label: 'Event Pages' },
  { id: 'popup', label: 'Site Popup' },
  { id: 'news', label: 'News & Announcements' },
  { id: 'careers', label: 'Careers' },
  { id: 'curriculum', label: 'Curriculum' },
];

export default function CmsAdminPanel() {
  const [tab, setTab] = useState('stories');
  // Set when an event asks for a page to be built, so the Pages tab opens the
  // builder pre-filled with that event's title.
  const [pageSeed, setPageSeed] = useState(null);

  const handleBuildPage = useCallback((seed) => {
    setPageSeed(seed ?? {});
    setTab('pages');
  }, []);

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
      {tab === 'photographs' && <PhotographsPanel />}
      {tab === 'events' && <CommunityProgramsPanel onBuildPage={handleBuildPage} />}
      {tab === 'pages' && (
        <CustomPagesPanel seed={pageSeed} onSeedConsumed={() => setPageSeed(null)} />
      )}
      {tab === 'popup' && <SitePopupPanel />}
      {tab === 'news' && <NewsPanel />}
      {tab === 'careers' && <CareersPanel />}
      {tab === 'curriculum' && <CurriculumPanel />}
    </div>
  );
}
