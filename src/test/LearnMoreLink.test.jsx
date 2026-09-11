import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LearnMoreLink from '../components/LearnMoreLink.jsx';
import { BLANK_LINK } from '../lib/content/links.js';

function renderLink(props) {
  return render(
    <MemoryRouter>
      <LearnMoreLink {...props} />
    </MemoryRouter>,
  );
}

describe('LearnMoreLink', () => {
  it('renders nothing when the button is turned off', () => {
    const { container } = renderLink({ link: { ...BLANK_LINK, kind: 'page', pageSlug: 'obon' } });
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for an event saved before Learn more existed', () => {
    const { container } = renderLink({ link: undefined });
    expect(container).toBeEmptyDOMElement();
  });

  it('links to a CMS-built page', () => {
    renderLink({
      link: { ...BLANK_LINK, enabled: true, kind: 'page', pageSlug: 'obon-festival', label: 'Learn More' },
    });
    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toHaveAttribute('href', '/events/obon-festival');
    expect(link).not.toHaveAttribute('target');
  });

  it('links to another page on this site', () => {
    renderLink({ link: { ...BLANK_LINK, enabled: true, kind: 'site', sitePage: 'tickets' } });
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute('href', '/tickets');
  });

  it('opens an external article in a new tab with a safe rel', () => {
    renderLink({
      link: {
        ...BLANK_LINK,
        enabled: true,
        kind: 'external',
        url: 'https://example.com/story',
        label: 'Read the story',
      },
    });
    const link = screen.getByRole('link', { name: /read the story/i });
    expect(link).toHaveAttribute('href', 'https://example.com/story');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders nothing rather than an unsafe href', () => {
    const { container } = renderLink({
      link: { ...BLANK_LINK, enabled: true, kind: 'external', url: 'javascript:alert(1)' },
    });
    expect(container).toBeEmptyDOMElement();
  });

  it('uses the legacy ctaLabel as a fallback label', () => {
    renderLink({
      link: { ...BLANK_LINK, enabled: true, kind: 'page', pageSlug: 'obon', label: '' },
      fallbackLabel: 'Event details',
    });
    expect(screen.getByRole('link', { name: /event details/i })).toBeInTheDocument();
  });
});
