import { describe, it, expect } from 'vitest';
import {
  mapNewsArticle,
  mapProgramEvent,
  mapCampStory,
  mapFaq,
  mapGroupTicketType,
  normalizeSectionPayload,
  sectionsToMap,
  getSection,
} from '../lib/content/mappers.js';
import { getSectionChoices, PAGE_KEYS } from '../lib/content/sectionKeys.js';
import { mergeWithFallback, isValidSlug, normalizeSlug } from '../lib/content/validators.js';
import { formatAudioLength, collectCampCultureOptions } from '../lib/content/collectionFormUtils.js';
import { newsArticles, DEFAULT_PAGE_SECTIONS } from '../lib/content/fallbacks.js';

describe('content mappers', () => {
  it('maps news article rows', () => {
    const mapped = mapNewsArticle({
      slug: 'test-news',
      title: 'Test',
      summary: 'Summary',
      body: 'Body',
      category: 'Community',
      event_date_label: 'July 1, 2026',
      image_url: 'https://example.com/img.jpg',
    });
    expect(mapped.slug).toBe('test-news');
    expect(mapped.title).toBe('Test');
    expect(mapped.date).toBe('July 1, 2026');
    expect(mapped.image).toBe('https://example.com/img.jpg');
  });

  it('formats ISO news dates for display', () => {
    const mapped = mapNewsArticle({
      slug: 'iso-news',
      title: 'Test',
      event_date_label: '2026-07-10',
    });
    expect(mapped.date).toBe('July 10, 2026');
  });

  it('maps program events with metadata time', () => {
    const mapped = mapProgramEvent({
      title: 'Festival',
      summary: 'Desc',
      event_date_label: 'AUG 15',
      metadata: { time: '5pm' },
    });
    expect(mapped.time).toBe('5pm');
    expect(mapped.date).toBe('AUG 15');
  });

  it('maps camp stories with oral history metadata', () => {
    const mapped = mapCampStory({
      slug: 'chinese',
      title: 'Cookhouse',
      summary: 'Short',
      body: 'Long',
      category: 'Chinese',
      metadata: {
        arrival: '1852',
        oralHistory: {
          narrator: 'Test',
          audio_url: 'https://example.com/story.mp3',
          transcript: 'Hello',
        },
      },
    });
    expect(mapped.id).toBe('chinese');
    expect(mapped.oralHistory.narrator).toBe('Test');
    expect(mapped.oralHistory.audio_url).toBe('https://example.com/story.mp3');
    expect(mapped.oralHistory.transcript).toBe('Hello');
  });

  it('maps faqs', () => {
    expect(mapFaq({ title: 'Q?', body: 'A.' })).toEqual({ q: 'Q?', a: 'A.' });
  });

  it('formats audio length labels', () => {
    expect(formatAudioLength(165)).toBe('2m 45s');
    expect(formatAudioLength(5)).toBe('0m 05s');
    expect(formatAudioLength(NaN)).toBe('');
  });

  it('collects camp culture options from defaults and entries', () => {
    const options = collectCampCultureOptions([
      { content_type: 'camp_story', metadata: { culture: 'Vietnamese' }, category: 'Vietnamese' },
      { content_type: 'news', category: 'Community' },
    ], 'Chinese');
    expect(options).toContain('Chinese');
    expect(options).toContain('Vietnamese');
    expect(options).not.toContain('Community');
  });
});

describe('section helpers', () => {
  it('builds section map from rows', () => {
    const map = sectionsToMap([
      { page_key: 'home', section_key: 'whyVisit', payload: { title: 'CMS Title' } },
    ]);
    expect(map.home.whyVisit.title).toBe('CMS Title');
  });

  it('falls back when section missing', () => {
    const map = sectionsToMap([]);
    const fallback = DEFAULT_PAGE_SECTIONS.home.quickVisit;
    expect(getSection(map, 'home', 'quickVisit', fallback)).toEqual(fallback);
  });

  it('normalizes featuredBango quote shape', () => {
    const normalized = normalizeSectionPayload('home', 'featuredBango', {
      quote: 'A quote',
      quoteCite: '— Author',
    });
    expect(normalized.quote).toEqual({ text: 'A quote', cite: '— Author' });
  });

  it('normalizes getInvolved intro and membership benefits', () => {
    const normalized = normalizeSectionPayload('home', 'getInvolved', {
      description: 'Support us',
      membership: { items: [{ label: 'Free', text: 'admission' }] },
    });
    expect(normalized.intro).toBe('Support us');
    expect(normalized.membership.benefits).toHaveLength(1);
  });

  it('maps group ticket types with priceCents', () => {
    const mapped = mapGroupTicketType({ slug: 'group-adult', label: 'Group Adults', price_cents: 1400 });
    expect(mapped.priceCents).toBe(1400);
    expect(mapped.priceDisplay).toBe('$14.00');
  });
});

describe('section registry', () => {
  it('includes all public pages', () => {
    expect(PAGE_KEYS).toContain('home');
    expect(PAGE_KEYS).toContain('tickets');
  });

  it('provides starter payloads for home sections', () => {
    const choices = getSectionChoices('home');
    expect(choices.some((s) => s.key === 'featuredBango')).toBe(true);
    expect(choices.find((s) => s.key === 'getInvolved')?.starterPayload?.title).toBeTruthy();
  });
});

describe('validators', () => {
  it('validates slugs', () => {
    expect(isValidSlug('obon-festival-2026')).toBe(true);
    expect(isValidSlug('Bad Slug')).toBe(false);
  });

  it('normalizes slugs from user input', () => {
    expect(normalizeSlug('special 2')).toBe('special-2');
    expect(normalizeSlug('Kids Admission')).toBe('kids-admission');
    expect(normalizeSlug('  youth_5-12  ')).toBe('youth-5-12');
  });

  it('prefers remote data over fallback when present', () => {
    expect(mergeWithFallback(['published'], ['fallback'])).toEqual(['published']);
    expect(mergeWithFallback([], newsArticles)).toEqual(newsArticles);
    expect(mergeWithFallback(null, { a: 1 })).toEqual({ a: 1 });
  });
});
