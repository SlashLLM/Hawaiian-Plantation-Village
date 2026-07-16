import { describe, it, expect } from 'vitest';
import { formatCents, createBooking } from '../lib/api.js';

describe('formatCents', () => {
  it('formats integer cents as USD', () => {
    expect(formatCents(1700)).toBe('$17.00');
    expect(formatCents(0)).toBe('$0.00');
    expect(formatCents(15000)).toBe('$150.00');
  });
});

describe('createBooking', () => {
  it('throws when booking request cannot complete', async () => {
    await expect(createBooking({})).rejects.toThrow();
  });
});
