import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ContentProvider, useContent } from '../context/ContentProvider.jsx';
import { DEFAULT_SITE_SETTINGS } from '../lib/content/fallbacks.js';

function ContentProbe() {
  const { settings, getCollection } = useContent();
  return (
    <div>
      <span data-testid="brand">{settings.brand.title}</span>
      <span data-testid="news-count">{getCollection('news').length}</span>
    </div>
  );
}

describe('ContentProvider fallbacks', () => {
  it('renders fallback brand and news without Supabase', async () => {
    render(
      <ContentProvider>
        <ContentProbe />
      </ContentProvider>,
    );
    expect(await screen.findByTestId('brand')).toHaveTextContent(DEFAULT_SITE_SETTINGS.brand.title);
    const count = await screen.findByTestId('news-count');
    expect(Number(count.textContent)).toBeGreaterThan(0);
  });
});
