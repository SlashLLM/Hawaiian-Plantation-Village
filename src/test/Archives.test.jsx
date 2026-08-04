import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Archives from '../pages/vintage/Archives.jsx';
import PhotographDetail from '../pages/vintage/PhotographDetail.jsx';
import { DEFAULT_PAGE_SECTIONS, PHOTOGRAPHS } from '../lib/content/fallbacks.js';

vi.mock('../context/ContentProvider.jsx', () => ({
  useContentCollection: () => ({ items: PHOTOGRAPHS, loading: false }),
  usePageSection: (pageKey, sectionKey) => ({
    section: DEFAULT_PAGE_SECTIONS[pageKey]?.[sectionKey] ?? {},
    loading: false,
  }),
  usePageListSection: (pageKey, sectionKey, listPath = 'items') => ({
    items: DEFAULT_PAGE_SECTIONS[pageKey]?.[sectionKey]?.[listPath] ?? [],
    section: DEFAULT_PAGE_SECTIONS[pageKey]?.[sectionKey] ?? {},
    loading: false,
  }),
}));

function renderArchives(initialPath = '/archives') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/archives" element={<Archives />} />
        <Route path="/archives/:arkId" element={<PhotographDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Archives hub', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('lists every digitized photograph and filters by collection', async () => {
    const user = userEvent.setup();
    const { container } = renderArchives();

    const gridCards = () => container.querySelectorAll('.archive-grid .archive-card');
    expect(gridCards()).toHaveLength(PHOTOGRAPHS.length);

    const murakoshiCount = PHOTOGRAPHS.filter((p) => p.collection === 'murakoshi').length;
    await user.click(
      screen.getByRole('button', { name: `Murakoshi Collection (${murakoshiCount})` }),
    );

    expect(gridCards()).toHaveLength(murakoshiCount);
    expect(screen.getByText(/No photographs from this collection/)).toBeInTheDocument();
  });

  it('opens a photograph detail with metadata and related photos', async () => {
    const user = userEvent.setup();
    const photo = PHOTOGRAPHS[0];
    renderArchives(`/archives/${photo.arkId}`);

    expect(screen.getByRole('heading', { level: 1, name: photo.title })).toBeInTheDocument();
    expect(screen.getByText(photo.subject)).toBeInTheDocument();
    expect(screen.getByText(photo.arkId)).toBeInTheDocument();

    const related = PHOTOGRAPHS.find((p) => p.arkId === photo.relatedArkIds[0]);
    await user.click(screen.getByRole('button', { name: new RegExp(related.title) }));
    expect(screen.getByRole('heading', { level: 1, name: related.title })).toBeInTheDocument();
  });

  it('keeps analyze answers in localStorage per photograph', async () => {
    const user = userEvent.setup();
    const photo = PHOTOGRAPHS[0];
    renderArchives(`/archives/${photo.arkId}`);

    const field = screen.getByLabelText('Quickly scan the image. What do you notice first?');
    await user.type(field, 'A tin roof.');

    await vi.waitFor(() => {
      const draft = JSON.parse(window.localStorage.getItem(`hpv:analyze:${photo.arkId}`) ?? '{}');
      expect(draft['meet-0']).toBe('A tin roof.');
    });
  });
});
