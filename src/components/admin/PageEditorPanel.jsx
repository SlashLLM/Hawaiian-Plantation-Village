import React, { useState } from 'react';
import { getCmsPageChoices, getPageExtraPanels, PAGE_LABELS } from '../../lib/content/pageRegistry.js';
import SectionsPanel from './SectionsPanel.jsx';
import CampStoriesPanel from './CampStoriesPanel.jsx';
import CatalogPanel from './CatalogPanel.jsx';
import CurriculumPanel from './CurriculumPanel.jsx';

const SUB_TABS = {
  sections: 'Sections',
  campStories: 'Camp stories',
  catalog: 'Catalog',
  curriculum: 'Curriculum',
};

export default function PageEditorPanel() {
  const pages = getCmsPageChoices();
  const [pageKey, setPageKey] = useState('visit');
  const extras = getPageExtraPanels(pageKey);
  const availableSubs = ['sections', ...extras];
  const [subTab, setSubTab] = useState('sections');

  const activeSub = availableSubs.includes(subTab) ? subTab : 'sections';

  function handlePageChange(nextKey) {
    setPageKey(nextKey);
    setSubTab('sections');
  }

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Edit content page by page. Sections hold copy and lists; Stories can add camp stories;
        Visit includes catalog pricing; Learn includes curriculum modules.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {pages.map((p) => (
          <button
            key={p.key}
            type="button"
            className={`admin-nav-btn ${pageKey === p.key ? 'active' : ''}`}
            onClick={() => handlePageChange(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <h3 style={{ marginBottom: '0.75rem' }}>{PAGE_LABELS[pageKey] ?? pageKey}</h3>

      {availableSubs.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {availableSubs.map((id) => (
            <button
              key={id}
              type="button"
              className={`admin-nav-btn ${activeSub === id ? 'active' : ''}`}
              onClick={() => setSubTab(id)}
            >
              {SUB_TABS[id] ?? id}
            </button>
          ))}
        </div>
      )}

      {activeSub === 'sections' && <SectionsPanel pageKey={pageKey} />}
      {activeSub === 'campStories' && <CampStoriesPanel />}
      {activeSub === 'catalog' && <CatalogPanel />}
      {activeSub === 'curriculum' && <CurriculumPanel />}
    </div>
  );
}
