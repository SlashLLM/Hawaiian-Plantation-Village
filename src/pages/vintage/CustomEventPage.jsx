import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../../components/SEO.jsx';
import BlockRenderer from '../../components/pageBlocks/BlockRenderer.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import {
  getCachedCustomPage,
  prefetchCustomPage,
} from '../../lib/content/eventPagePrefetch.js';

/**
 * A page composed in the CMS page builder, published at /events/:slug.
 * Staff see drafts (RLS allows it); everyone else gets the not-found state.
 */
function EventPageBody({ slug, preview }) {
  // A hover or touch on the "Learn more" link usually warmed this already, in
  // which case we render the page on the first frame with no loading state.
  const cached = getCachedCustomPage(slug, { preview });
  const [page, setPage] = useState(cached ?? null);
  const [loading, setLoading] = useState(cached === undefined);

  useEffect(() => {
    if (cached !== undefined) return undefined;
    let cancelled = false;
    prefetchCustomPage(slug, { preview }).then((data) => {
      if (cancelled) return;
      setPage(data);
      setLoading(false);
    });
    return () => { cancelled = true; };
    // `cached` is read once on mount; the parent remounts on slug/preview change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, preview]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (loading) {
    return (
      <section className="editorial-section">
        <div className="editorial-shell">
          <p className="editorial-lede">Loading…</p>
        </div>
      </section>
    );
  }

  if (!page) {
    return (
      <section className="editorial-section">
        <SEO title="Page not found" />
        <div className="editorial-shell">
          <p className="editorial-eyebrow">Not found</p>
          <h1 className="editorial-title">We could not find that page.</h1>
          <p className="editorial-lede">
            It may have been unpublished or moved. Browse what is coming up instead.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <Link className="btn-primary" to="/events">See all events</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <SEO
        title={page.title}
        description={page.seo?.description}
        {...(page.seo?.image ? { image: page.seo.image } : {})}
      />
      {preview && page.status !== 'published' && (
        <div
          className="editorial-shell"
          style={{ paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <StatusBadge value={page.status} />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Staff preview — this page is not visible to the public yet.
          </span>
        </div>
      )}
      <BlockRenderer blocks={Array.isArray(page.blocks) ? page.blocks : []} />
    </div>
  );
}

export default function CustomEventPage() {
  const { slug } = useParams();
  const { isStaff } = useAuth();
  // Remount on slug/preview change so the cache peek above re-runs and a
  // page-to-page move never flashes a stale body.
  return <EventPageBody key={`${slug}:${isStaff}`} slug={slug} preview={isStaff} />;
}
