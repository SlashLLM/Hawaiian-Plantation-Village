import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { normalizeLink, resolveLink } from '../lib/content/links.js';
import { prefetchEventPage } from '../lib/content/eventPagePrefetch.js';
import { useAuth } from '../hooks/useAuth.js';

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  color: 'var(--terracotta-clay-deep)',
  padding: 0,
  marginTop: '0.6rem',
};

/**
 * Renders an event's "Learn more" button, or nothing when the link is turned
 * off or its target is missing. Real anchors, so middle-click and
 * open-in-new-tab work.
 *
 * Links to CMS-built pages warm the route and the page data on hover, focus or
 * touch, so the click usually lands on an already-loaded page.
 */
export default function LearnMoreLink({
  link,
  fallbackLabel = 'Learn More',
  className = 'footer-link-btn',
  style,
  iconSize = 14,
}) {
  const { isStaff } = useAuth();
  const resolved = resolveLink(link, fallbackLabel);
  const normalized = normalizeLink(link);
  const prefetchSlug = normalized.kind === 'page' ? normalized.pageSlug : '';

  const warm = useCallback(() => {
    if (prefetchSlug) prefetchEventPage(prefetchSlug, { preview: isStaff });
  }, [prefetchSlug, isStaff]);

  if (!resolved) return null;

  const content = (
    <>
      {resolved.label} <ArrowRight size={iconSize} />
    </>
  );
  const mergedStyle = { ...baseStyle, ...style };

  if (resolved.external) {
    return (
      <a
        className={className}
        style={mergedStyle}
        href={resolved.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={className}
      style={mergedStyle}
      to={resolved.href}
      onPointerEnter={warm}
      onTouchStart={warm}
      onFocus={warm}
    >
      {content}
    </Link>
  );
}
