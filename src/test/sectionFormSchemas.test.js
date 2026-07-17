import { describe, it, expect } from 'vitest';
import { getAllSectionKeys } from '../lib/content/sectionKeys.js';
import { getSectionFormSchema, hasSectionFormSchema } from '../lib/content/sectionFormSchemas.js';
import { updatePayload, getAtPath } from '../lib/content/sectionFormUtils.js';

describe('sectionFormSchemas', () => {
  it('covers every registered section key', () => {
    const keys = getAllSectionKeys();
    expect(keys.length).toBeGreaterThan(30);
    for (const { pageKey, sectionKey } of keys) {
      expect(
        hasSectionFormSchema(pageKey, sectionKey),
        `missing schema for ${pageKey}.${sectionKey}`,
      ).toBe(true);
    }
  });

  it('includes support, tickets, and play.gameSteps', () => {
    expect(hasSectionFormSchema('support', 'header')).toBe(true);
    expect(hasSectionFormSchema('support', 'donate')).toBe(true);
    expect(hasSectionFormSchema('tickets', 'header')).toBe(true);
    expect(hasSectionFormSchema('play', 'gameSteps')).toBe(true);
  });

  it('includes rates fields for visit.admission', () => {
    const schema = getSectionFormSchema('visit', 'admission');
    const admissionFields = schema.groups.find((g) => g.title === 'Admission')?.fields ?? [];
    const paths = admissionFields.map((f) => f.path);
    expect(paths).toContain('rates');
    expect(paths).toContain('buttonLabel');
    expect(paths).toContain('buttonPage');
    const rates = admissionFields.find((f) => f.path === 'rates');
    expect(rates.type).toBe('objectList');
    expect(rates.fields.map((f) => f.key)).toEqual(['label', 'price']);
  });

  it('includes FAQ items for visit.faq', () => {
    const schema = getSectionFormSchema('visit', 'faq');
    const faqFields = schema.groups.find((g) => g.title === 'FAQs')?.fields ?? [];
    const paths = faqFields.map((f) => f.path);
    expect(paths).toContain('title');
    expect(paths).toContain('items');
    const items = faqFields.find((f) => f.path === 'items');
    expect(items.type).toBe('objectList');
    expect(items.fields.map((f) => f.key)).toEqual(['q', 'a']);
  });

  it('returns null for unknown or custom sections', () => {
    expect(getSectionFormSchema('home', 'unknown')).toBeNull();
    expect(getSectionFormSchema('home', '__custom__')).toBeNull();
    expect(getSectionFormSchema('', '')).toBeNull();
  });
});

describe('updatePayload', () => {
  it('sets nested paths immutably', () => {
    const original = { hours: { title: 'Old', primary: 'A' } };
    const next = updatePayload(original, 'hours.title', 'New');
    expect(next.hours.title).toBe('New');
    expect(next.hours.primary).toBe('A');
    expect(original.hours.title).toBe('Old');
  });

  it('creates missing intermediate objects', () => {
    const next = updatePayload({}, 'donation.cta.label', 'Donate');
    expect(next).toEqual({ donation: { cta: { label: 'Donate' } } });
  });

  it('updates array item fields via numeric path segments', () => {
    const next = updatePayload(
      { items: [{ label: 'A' }, { label: 'B' }] },
      'items.1.label',
      'Updated',
    );
    expect(next.items[1].label).toBe('Updated');
    expect(next.items[0].label).toBe('A');
  });
});

describe('getAtPath', () => {
  it('reads nested values and falls back', () => {
    expect(getAtPath({ a: { b: 'x' } }, 'a.b')).toBe('x');
    expect(getAtPath({}, 'a.b', 'fallback')).toBe('fallback');
  });
});
