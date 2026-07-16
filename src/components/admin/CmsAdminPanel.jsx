import React, { useState } from 'react';
import SettingsPanel from './SettingsPanel.jsx';
import SectionsPanel from './SectionsPanel.jsx';
import CollectionsPanel from './CollectionsPanel.jsx';
import CatalogPanel from './CatalogPanel.jsx';
import CurriculumPanel from './CurriculumPanel.jsx';

const TABS = [
  { id: 'collections', label: 'Collections' },
  { id: 'sections', label: 'Page sections' },
  { id: 'settings', label: 'Site settings' },
  { id: 'catalog', label: 'Catalog' },
  { id: 'curriculum', label: 'Curriculum' },
];

export default function CmsAdminPanel() {
  const [tab, setTab] = useState('collections');

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Content CMS</h2>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {TABS.map((t) => (
          <button key={t.id} type="button" className={`admin-nav-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'collections' && <CollectionsPanel />}
      {tab === 'sections' && <SectionsPanel />}
      {tab === 'settings' && <SettingsPanel />}
      {tab === 'catalog' && <CatalogPanel />}
      {tab === 'curriculum' && <CurriculumPanel />}
    </div>
  );
}
