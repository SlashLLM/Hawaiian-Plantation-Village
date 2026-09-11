import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlockRenderer from '../components/pageBlocks/BlockRenderer.jsx';

function renderBlocks(blocks) {
  return render(
    <MemoryRouter>
      <BlockRenderer blocks={blocks} />
    </MemoryRouter>,
  );
}

describe('BlockRenderer — single image', () => {
  const poster = {
    id: 'i1',
    type: 'image',
    background: 'default',
    image: '/poster.png',
    imageAlt: 'Harvest Moon Festival poster',
    caption: '2026 festival poster',
  };

  it('shows the whole image rather than cropping it to a band', () => {
    renderBlocks([poster]);
    const img = screen.getByAltText('Harvest Moon Festival poster');
    // A portrait poster must keep its own shape — `cover` with a fixed height
    // would slice the middle out of it.
    expect(img.style.objectFit).not.toBe('cover');
    expect(img.style.height).toBe('auto');
    expect(img.style.maxWidth).toBe('100%');
  });

  it('renders the caption', () => {
    renderBlocks([poster]);
    expect(screen.getByText('2026 festival poster')).toBeInTheDocument();
  });

  it('renders nothing when no image is set', () => {
    const { container } = renderBlocks([{ id: 'i2', type: 'image', background: 'default', image: '' }]);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('BlockRenderer — block ordering and backgrounds', () => {
  it('renders blocks in the order given', () => {
    renderBlocks([
      { id: 'a', type: 'richText', background: 'default', title: 'First' },
      { id: 'b', type: 'richText', background: 'default', title: 'Second' },
    ]);
    const headings = screen.getAllByRole('heading').map((h) => h.textContent);
    expect(headings).toEqual(['First', 'Second']);
  });

  it('applies the chosen background to the section', () => {
    const { container } = renderBlocks([
      { id: 'a', type: 'quote', background: 'sand', quote: 'Hello' },
    ]);
    expect(container.querySelector('section').className).toBe('editorial-section on-sand');
  });
});

describe('BlockRenderer — video', () => {
  it('frames an allowed provider', () => {
    renderBlocks([
      { id: 'v', type: 'video', background: 'default', url: 'https://youtu.be/abc123', title: 'Festival recap' },
    ]);
    expect(screen.getByTitle('Festival recap')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/abc123',
    );
  });

  it('renders nothing for a url outside the allowlist', () => {
    const { container } = renderBlocks([
      { id: 'v', type: 'video', background: 'default', url: 'https://evil.test/x', title: 'Nope' },
    ]);
    expect(container).toBeEmptyDOMElement();
  });
});
