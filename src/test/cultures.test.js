import { describe, it, expect } from 'vitest';
import {
  cultureSlug,
  findCampBySlug,
  parseArrivalYear,
  sortCampsChronologically,
  CHRONOLOGICAL_CULTURES,
} from '../lib/cultures.js';

describe('cultures helper', () => {
  it('parses arrival year correctly', () => {
    expect(parseArrivalYear('Before plantation era')).toBe(-1);
    expect(parseArrivalYear('1852')).toBe(1852);
    expect(parseArrivalYear('1878')).toBe(1878);
    expect(parseArrivalYear('1900')).toBe(1900);
    expect(parseArrivalYear('')).toBe(9999);
    expect(parseArrivalYear(null)).toBe(9999);
  });

  it('sorts camps in chronological order of arrival', () => {
    const unsorted = [
      { id: 'portuguese', culture: 'Portuguese', arrival: '1878' },
      { id: 'okinawan', culture: 'Okinawan', arrival: '1900' },
      { id: 'chinese', culture: 'Chinese', arrival: '1852' },
      { id: 'japanese', culture: 'Japanese', arrival: '1885' },
      { id: 'filipino', culture: 'Filipino', arrival: '1906' },
      { id: 'korean', culture: 'Korean', arrival: '1903' },
      { id: 'puerto_rican', culture: 'Puerto Rican', arrival: '1900' },
      { id: 'hawaiian', culture: 'Hawaiian', arrival: 'Before plantation era' },
    ];

    const sorted = sortCampsChronologically(unsorted);
    const resultSlugs = sorted.map((c) => cultureSlug(c));

    expect(resultSlugs).toEqual([
      'hawaiian',
      'chinese',
      'portuguese',
      'japanese',
      'okinawan',
      'puerto_rican',
      'korean',
      'filipino',
    ]);
  });

  it('sorts culture tile objects without arrival year using default chronological order', () => {
    const tiles = [
      { name: 'Filipino' },
      { name: 'Portuguese' },
      { name: 'Hawaiian' },
      { name: 'Korean' },
      { name: 'Chinese' },
      { name: 'Japanese' },
      { name: 'Puerto Rican' },
      { name: 'Okinawan' },
    ];

    const sorted = sortCampsChronologically(tiles);
    expect(sorted.map((t) => cultureSlug(t.name))).toEqual(CHRONOLOGICAL_CULTURES);
  });
});
