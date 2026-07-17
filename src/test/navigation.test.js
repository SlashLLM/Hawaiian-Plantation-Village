import { describe, it, expect } from 'vitest';
import { pageIdFromPath, pathFromPageId } from '../lib/navigation.js';

describe('navigation', () => {
  it('maps paths to page ids', () => {
    expect(pageIdFromPath('/')).toBe('home');
    expect(pageIdFromPath('/tickets')).toBe('tickets');
    expect(pageIdFromPath('/learn/bango')).toBe('learn');
    expect(pageIdFromPath('/admin')).toBe('admin');
  });

  it('maps page ids to paths', () => {
    expect(pathFromPageId('tickets')).toBe('/tickets');
    expect(pathFromPageId('learn-module', { moduleId: 'bango' })).toBe('/learn/bango');
  });
});
