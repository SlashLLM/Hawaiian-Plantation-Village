import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

async function loadFeatures(value) {
  vi.resetModules();
  vi.stubEnv('VITE_PAYMENTS_ENABLED', value);
  return import('../lib/features.js');
}

describe('features flag', () => {
  beforeEach(() => vi.resetModules());
  afterEach(() => vi.unstubAllEnvs());

  it('is off unless the env var is exactly "true"', async () => {
    for (const value of ['false', '', 'yes', '1', 'TRUE ']) {
      const { paymentsEnabled } = await loadFeatures(value);
      expect(paymentsEnabled, `value: ${JSON.stringify(value)}`).toBe(false);
    }
  });

  it('is on for "true" regardless of casing', async () => {
    const { paymentsEnabled } = await loadFeatures('True');
    expect(paymentsEnabled).toBe(true);
  });

  describe('when payments are disabled', () => {
    it('marks the ticketing and giving pages as coming soon', async () => {
      const { isComingSoon } = await loadFeatures('false');
      expect(isComingSoon('tickets')).toBe(true);
      expect(isComingSoon('support')).toBe(true);
      expect(isComingSoon('visit')).toBe(false);
      expect(isComingSoon(undefined)).toBe(false);
    });

    it('reads nav items keyed by id and CMS links keyed by page', async () => {
      const { linkIsComingSoon } = await loadFeatures('false');
      expect(linkIsComingSoon({ id: 'support', label: 'Support' })).toBe(true);
      expect(linkIsComingSoon({ label: 'Get tickets', page: 'tickets' })).toBe(true);
      expect(linkIsComingSoon({ label: 'Make a gift', page: 'support' })).toBe(true);
      expect(linkIsComingSoon({ id: 'home', label: 'Home' })).toBe(false);
      expect(linkIsComingSoon({ title: 'Schools', page: 'learn' })).toBe(false);
      expect(linkIsComingSoon(undefined)).toBe(false);
    });
  });

  describe('when payments are enabled', () => {
    it('marks nothing as coming soon', async () => {
      const { isComingSoon, linkIsComingSoon } = await loadFeatures('true');
      expect(isComingSoon('tickets')).toBe(false);
      expect(isComingSoon('support')).toBe(false);
      expect(linkIsComingSoon({ id: 'support' })).toBe(false);
      expect(linkIsComingSoon({ page: 'tickets' })).toBe(false);
    });
  });
});
