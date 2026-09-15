import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_PAGE_SECTIONS,
  newsArticles,
  CAMPS_DATA,
  careersList,
} from '../lib/content/staticContent.js';

function ContentProbe({ useContent }) {
  const { settings, getCollection, getSection } = useContent();
  return (
    <div>
      <span data-testid="brand">{settings.brand.title}</span>
      <span data-testid="visit-title">{getSection('visit', 'hours').title}</span>
      <span data-testid="first-event">{getSection('home', 'events').items?.[0]?.title}</span>
      <span data-testid="news-count">{getCollection('news').length}</span>
      <span data-testid="career-count">{getCollection('career').length}</span>
      <span data-testid="camp-count">{getCollection('camp_story').length}</span>
    </div>
  );
}

describe('ContentProvider fallbacks', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('renders fallback brand and item collections without Supabase', async () => {
    const { ContentProvider, useContent } = await import('../context/ContentProvider.jsx');
    render(
      <ContentProvider>
        <ContentProbe useContent={useContent} />
      </ContentProvider>,
    );
    expect(await screen.findByTestId('brand')).toHaveTextContent(DEFAULT_SITE_SETTINGS.brand.title);
    expect(Number((await screen.findByTestId('news-count')).textContent)).toBe(newsArticles.length);
    expect(Number((await screen.findByTestId('career-count')).textContent)).toBe(careersList.length);
    expect(Number((await screen.findByTestId('camp-count')).textContent)).toBe(CAMPS_DATA.length);
  });
});

describe('ContentProvider with Supabase', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('reads only CMS-managed tables and keeps page copy static', async () => {
    const queried = [];
    const eventsRow = {
      page_key: 'home',
      section_key: 'events',
      payload: { items: [{ slug: 'cms-event', title: 'From the CMS' }] },
    };
    const staleVisitRow = { page_key: 'visit', section_key: 'hours', payload: { title: 'Stale DB title' } };

    vi.doMock('../lib/supabase.js', () => ({
      isSupabaseConfigured: true,
      supabase: {
        from: (table) => {
          queried.push(table);
          const filters = {};
          const chain = {
            select: () => chain,
            order: () => chain,
            or: () => chain,
            eq: (col, val) => { filters[col] = val; return chain; },
            maybeSingle: () => Promise.resolve({
              data: table === 'page_sections' && filters.section_key === 'events' ? eventsRow : null,
              error: null,
            }),
            // A full page_sections read would return stale copy; it must not happen.
            then: (resolve) => Promise.resolve({
              data: table === 'page_sections' ? [staleVisitRow, eventsRow] : [],
              error: null,
            }).then(resolve),
          };
          return chain;
        },
      },
    }));
    vi.doMock('../hooks/useAuth.js', () => ({ useAuth: () => ({ isStaff: false }) }));

    const { ContentProvider, useContent } = await import('../context/ContentProvider.jsx');
    render(
      <ContentProvider>
        <ContentProbe useContent={useContent} />
      </ContentProvider>,
    );

    // Static copy is there on first render, before any fetch resolves.
    expect(screen.getByTestId('brand')).toHaveTextContent(DEFAULT_SITE_SETTINGS.brand.title);
    expect(screen.getByTestId('visit-title')).toHaveTextContent(DEFAULT_PAGE_SECTIONS.visit.hours.title);

    expect(await screen.findByText('From the CMS')).toHaveAttribute('data-testid', 'first-event');
    expect(screen.getByTestId('visit-title')).toHaveTextContent(DEFAULT_PAGE_SECTIONS.visit.hours.title);
    await waitFor(() => expect(queried).toContain('content_entries'));
    expect(new Set(queried)).toEqual(new Set(['page_sections', 'curriculum_modules', 'content_entries']));
    expect(queried).not.toContain('site_settings');
  });
});
