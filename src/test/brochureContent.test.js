import { describe, expect, it } from 'vitest';
import {
  BROCHURE_TIMELINE,
  VILLAGE_BUILDINGS,
  buildingsForCulture,
  mergeTimeline,
} from '../data/brochureContent.js';
import { CAMPS_DATA } from '../lib/content/staticContent.js';

describe('brochure content', () => {
  it('merges brochure milestones into the timeline in year order', () => {
    const cms = [
      { year: '1992', event: 'Village opens' },
      { year: '1852', event: 'Chinese workers arrive' },
    ];
    const merged = mergeTimeline(cms);
    const years = merged.map((item) => parseInt(item.year, 10));
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(merged).toHaveLength(cms.length + BROCHURE_TIMELINE.length);
    expect(merged[0].year).toBe('1835');
  });

  it('does not duplicate a milestone already in the CMS timeline', () => {
    const merged = mergeTimeline([BROCHURE_TIMELINE[0]]);
    expect(merged.filter((item) => item.year === BROCHURE_TIMELINE[0].year)).toHaveLength(1);
  });

  it('keeps CMS items ahead of brochure items in the same year', () => {
    const cms = { year: '1885', event: 'Kanyaku Imin workers arrive' };
    const sameYear = mergeTimeline([cms]).filter((item) => item.year === '1885');
    expect(sameYear[0]).toBe(cms);
  });

  it('links buildings only to cultures that have a camp page', () => {
    const campIds = new Set(CAMPS_DATA.map((camp) => camp.id));
    for (const building of VILLAGE_BUILDINGS) {
      if (building.cultureId) expect(campIds.has(building.cultureId)).toBe(true);
    }
    expect(buildingsForCulture('korean').map((b) => b.name)).toEqual(['Korean House']);
  });
});
