-- Site popup: the poster first-time visitors see (Admin → Content → Site Popup).
-- Seeds the row with the Harvest Moon poster that was previously hard-coded in
-- src/lib/eventPoster.js. Same id, so visitors who already closed it are not
-- shown it again. Existing rows are left alone.
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values (
  'site',
  'popup',
  'published',
  0,
  jsonb_build_object(
    'enabled', true,
    'id', 'harvest-moon-festival-2026',
    'image', '/images/harvest-moon-festival-2026.jpg',
    'alt', 'Hawaii''s Plantation Village 4th Annual Harvest Moon Festival — Saturday, September 26, 2026, 9:00 a.m. to 2:00 p.m. Free admission and on-site parking.',
    'caption', 'Saturday, September 26, 2026 · 9:00 a.m. – 2:00 p.m. · Free admission & parking',
    'showUntil', '2026-09-26',
    'link', jsonb_build_object(
      'enabled', true,
      'label', 'See event details',
      'kind', 'site',
      'pageSlug', '',
      'sitePage', 'events',
      'url', ''
    )
  ),
  now()
)
on conflict (page_key, section_key) do nothing;
