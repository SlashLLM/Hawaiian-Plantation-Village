import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ContentProvider, useContent } from '../context/ContentProvider.jsx';
import { DEFAULT_SITE_SETTINGS, newsArticles, CAMPS_DATA, careersList } from '../lib/content/fallbacks.js';

function ContentProbe() {
  const { settings, getCollection } = useContent();
  return (
    <div>
      <span data-testid="brand">{settings.brand.title}</span>
      <span data-testid="news-count">{getCollection('news').length}</span>
      <span data-testid="career-count">{getCollection('career').length}</span>
      <span data-testid="camp-count">{getCollection('camp_story').length}</span>
    </div>
  );
}

describe('ContentProvider fallbacks', () => {
  it('renders fallback brand and item collections without Supabase', async () => {
    render(
      <ContentProvider>
        <ContentProbe />
      </ContentProvider>,
    );
    expect(await screen.findByTestId('brand')).toHaveTextContent(DEFAULT_SITE_SETTINGS.brand.title);
    expect(Number((await screen.findByTestId('news-count')).textContent)).toBe(newsArticles.length);
    expect(Number((await screen.findByTestId('career-count')).textContent)).toBe(careersList.length);
    expect(Number((await screen.findByTestId('camp-count')).textContent)).toBe(CAMPS_DATA.length);
  });
});
