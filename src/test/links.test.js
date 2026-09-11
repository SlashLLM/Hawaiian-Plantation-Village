import { describe, it, expect } from 'vitest';
import {
  BLANK_LINK,
  customPagePath,
  describeLinkTarget,
  isSafeExternalUrl,
  normalizeLink,
  resolveLink,
} from '../lib/content/links.js';

describe('isSafeExternalUrl', () => {
  it('accepts http and https', () => {
    expect(isSafeExternalUrl('https://example.com/article')).toBe(true);
    expect(isSafeExternalUrl('http://example.com')).toBe(true);
  });

  it('rejects other schemes and junk', () => {
    expect(isSafeExternalUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeExternalUrl('data:text/html,<script>')).toBe(false);
    expect(isSafeExternalUrl('example.com')).toBe(false);
    expect(isSafeExternalUrl('')).toBe(false);
    expect(isSafeExternalUrl(null)).toBe(false);
  });
});

describe('normalizeLink', () => {
  it('fills in defaults for events saved before Learn more existed', () => {
    expect(normalizeLink(undefined)).toEqual(BLANK_LINK);
    expect(normalizeLink({ enabled: true })).toEqual({ ...BLANK_LINK, enabled: true });
  });
});

describe('resolveLink', () => {
  it('returns null when disabled', () => {
    expect(resolveLink({ ...BLANK_LINK, kind: 'page', pageSlug: 'obon' })).toBeNull();
  });

  it('resolves a CMS page', () => {
    expect(resolveLink({ ...BLANK_LINK, enabled: true, kind: 'page', pageSlug: 'obon-festival' }))
      .toEqual({ label: 'Learn More', href: '/events/obon-festival', external: false });
  });

  it('resolves another page on this site', () => {
    expect(resolveLink({ ...BLANK_LINK, enabled: true, kind: 'site', sitePage: 'tickets' }))
      .toEqual({ label: 'Learn More', href: '/tickets', external: false });
  });

  it('rejects a site page that is not a real page key', () => {
    expect(resolveLink({ ...BLANK_LINK, enabled: true, kind: 'site', sitePage: 'nope' })).toBeNull();
  });

  it('resolves an external article and marks it external', () => {
    expect(resolveLink({
      ...BLANK_LINK, enabled: true, kind: 'external', url: 'https://example.com/a', label: 'Read the story',
    })).toEqual({ label: 'Read the story', href: 'https://example.com/a', external: true });
  });

  it('returns null for an unsafe external url rather than rendering it', () => {
    expect(resolveLink({ ...BLANK_LINK, enabled: true, kind: 'external', url: 'javascript:alert(1)' }))
      .toBeNull();
  });

  it('returns null when the target is missing', () => {
    expect(resolveLink({ ...BLANK_LINK, enabled: true, kind: 'page', pageSlug: '' })).toBeNull();
  });

  it('falls back to the given label when none is stored', () => {
    expect(resolveLink(
      { ...BLANK_LINK, enabled: true, kind: 'page', pageSlug: 'obon', label: '' },
      'Details',
    )?.label).toBe('Details');
  });
});

describe('describeLinkTarget', () => {
  it('is empty when the button is off', () => {
    expect(describeLinkTarget(BLANK_LINK)).toBe('');
  });

  it('describes each kind for the admin table', () => {
    expect(describeLinkTarget({ ...BLANK_LINK, enabled: true, kind: 'page', pageSlug: 'obon' }))
      .toBe('/events/obon');
    expect(describeLinkTarget({ ...BLANK_LINK, enabled: true, kind: 'site', sitePage: 'tickets' }))
      .toBe('Tickets');
    expect(describeLinkTarget({ ...BLANK_LINK, enabled: true, kind: 'external', url: 'https://x.test' }))
      .toBe('https://x.test');
  });
});

describe('customPagePath', () => {
  it('nests built pages under the events section', () => {
    expect(customPagePath('obon-festival')).toBe('/events/obon-festival');
  });
});
