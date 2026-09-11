import { describe, it, expect } from 'vitest';
import {
  BLOCK_TYPE_KEYS,
  backgroundClass,
  blockTypeLabel,
  createBlock,
  toVideoEmbedUrl,
} from '../lib/content/pageBlocks.js';

describe('createBlock', () => {
  it('builds every declared block type with an id and a background', () => {
    for (const type of BLOCK_TYPE_KEYS) {
      const block = createBlock(type);
      expect(block.type).toBe(type);
      expect(block.id).toBeTruthy();
      expect(block.background).toBeTruthy();
    }
  });

  it('gives each block a distinct id', () => {
    expect(createBlock('quote').id).not.toBe(createBlock('quote').id);
  });

  it('returns null for an unknown type', () => {
    expect(createBlock('nope')).toBeNull();
  });

  it('does not share nested state between blocks', () => {
    const a = createBlock('richText');
    const b = createBlock('richText');
    a.paragraphs.push('changed');
    expect(b.paragraphs).toEqual(['']);
  });
});

describe('backgroundClass', () => {
  it('maps onto the site section modifiers', () => {
    expect(backgroundClass('default')).toBe('editorial-section');
    expect(backgroundClass('sand')).toBe('editorial-section on-sand');
    expect(backgroundClass('ink')).toBe('editorial-section on-ink');
    expect(backgroundClass(undefined)).toBe('editorial-section');
  });
});

describe('blockTypeLabel', () => {
  it('falls back to the raw type for blocks it does not know', () => {
    expect(blockTypeLabel('richText')).toBe('Text section');
    expect(blockTypeLabel('mystery')).toBe('mystery');
  });
});

describe('toVideoEmbedUrl', () => {
  it('converts YouTube watch and short links', () => {
    expect(toVideoEmbedUrl('https://www.youtube.com/watch?v=abc123'))
      .toBe('https://www.youtube.com/embed/abc123');
    expect(toVideoEmbedUrl('https://youtu.be/abc123'))
      .toBe('https://www.youtube.com/embed/abc123');
  });

  it('passes through an embed link', () => {
    expect(toVideoEmbedUrl('https://www.youtube.com/embed/abc123'))
      .toBe('https://www.youtube.com/embed/abc123');
  });

  it('converts a Vimeo link', () => {
    expect(toVideoEmbedUrl('https://vimeo.com/12345678'))
      .toBe('https://player.vimeo.com/video/12345678');
  });

  it('refuses anything outside the allowlist', () => {
    expect(toVideoEmbedUrl('https://example.com/video.mp4')).toBeNull();
    expect(toVideoEmbedUrl('javascript:alert(1)')).toBeNull();
    expect(toVideoEmbedUrl('data:text/html,<script>')).toBeNull();
    expect(toVideoEmbedUrl('not a url')).toBeNull();
    expect(toVideoEmbedUrl('')).toBeNull();
    expect(toVideoEmbedUrl(undefined)).toBeNull();
  });
});
