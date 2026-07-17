-- Page-wise CMS: move repeatable lists into page_sections; scope camp stories by page_key.

-- 1. Add page_key to content_entries (camp stories only going forward)
alter table public.content_entries
  add column if not exists page_key text;

create index if not exists content_entries_page_key_idx
  on public.content_entries (page_key)
  where page_key is not null;

update public.content_entries
set page_key = 'stories'
where content_type = 'camp_story'
  and (page_key is null or page_key = '');

-- 2. Aggregate collections into page_sections (upsert by page_key + section_key)

-- home.events from program
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
select
  'home',
  'events',
  'published',
  9,
  jsonb_build_object(
    'items',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'date', coalesce(e.event_date_label, e.metadata->>'date', ''),
            'title', e.title,
            'time', coalesce(e.metadata->>'time', ''),
            'desc', coalesce(e.summary, ''),
            'image', coalesce(e.image_url, '')
          )
          order by e.sort_order, e.published_at desc nulls last
        )
        from public.content_entries e
        where e.content_type = 'program'
          and e.status = 'published'
      ),
      '[]'::jsonb
    )
  ),
  now()
on conflict (page_key, section_key) do update
set
  payload = excluded.payload,
  status = 'published',
  published_at = coalesce(public.page_sections.published_at, now()),
  updated_at = now();

-- home.testimonials from testimonial
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
select
  'home',
  'testimonials',
  'published',
  10,
  jsonb_build_object(
    'items',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'quote', coalesce(e.body, e.summary, ''),
            'authorName', coalesce(e.metadata->>'authorName', e.title),
            'authorMeta', coalesce(e.metadata->>'authorMeta', '')
          )
          order by e.sort_order, e.published_at desc nulls last
        )
        from public.content_entries e
        where e.content_type = 'testimonial'
          and e.status = 'published'
      ),
      '[]'::jsonb
    )
  ),
  now()
on conflict (page_key, section_key) do update
set
  payload = excluded.payload,
  status = 'published',
  published_at = coalesce(public.page_sections.published_at, now()),
  updated_at = now();

-- home.partners from partner
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
select
  'home',
  'partners',
  'published',
  11,
  jsonb_build_object(
    'items',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'name', e.title
          )
          order by e.sort_order, e.published_at desc nulls last
        )
        from public.content_entries e
        where e.content_type = 'partner'
          and e.status = 'published'
      ),
      '[]'::jsonb
    )
  ),
  now()
on conflict (page_key, section_key) do update
set
  payload = excluded.payload,
  status = 'published',
  published_at = coalesce(public.page_sections.published_at, now()),
  updated_at = now();

-- about.news from news
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
select
  'about',
  'news',
  'published',
  8,
  jsonb_build_object(
    'items',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'title', e.title,
            'date', coalesce(e.event_date_label, ''),
            'category', coalesce(e.category, 'Community'),
            'summary', coalesce(e.summary, ''),
            'content', coalesce(e.body, e.summary, ''),
            'image', e.image_url
          )
          order by e.sort_order, e.published_at desc nulls last
        )
        from public.content_entries e
        where e.content_type = 'news'
          and e.status = 'published'
      ),
      '[]'::jsonb
    )
  ),
  now()
on conflict (page_key, section_key) do update
set
  payload = excluded.payload,
  status = 'published',
  published_at = coalesce(public.page_sections.published_at, now()),
  updated_at = now();

-- about.careers from career
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
select
  'about',
  'careers',
  'published',
  9,
  jsonb_build_object(
    'items',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'title', e.title,
            'type', coalesce(e.metadata->>'type', ''),
            'department', coalesce(e.metadata->>'department', ''),
            'compensation', coalesce(e.metadata->>'compensation', ''),
            'hours', coalesce(e.metadata->>'hours', ''),
            'summary', coalesce(e.summary, ''),
            'responsibilities', coalesce(e.metadata->'responsibilities', '[]'::jsonb),
            'requirements', coalesce(e.metadata->'requirements', '[]'::jsonb)
          )
          order by e.sort_order, e.published_at desc nulls last
        )
        from public.content_entries e
        where e.content_type = 'career'
          and e.status = 'published'
      ),
      '[]'::jsonb
    )
  ),
  now()
on conflict (page_key, section_key) do update
set
  payload = excluded.payload,
  status = 'published',
  published_at = coalesce(public.page_sections.published_at, now()),
  updated_at = now();

-- about.timeline from timeline
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
select
  'about',
  'timeline',
  'published',
  10,
  jsonb_build_object(
    'items',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'year', coalesce(e.metadata->>'year', e.event_date_label, ''),
            'event', coalesce(e.body, e.summary, e.title)
          )
          order by e.sort_order, e.published_at desc nulls last
        )
        from public.content_entries e
        where e.content_type = 'timeline'
          and e.status = 'published'
      ),
      '[]'::jsonb
    )
  ),
  now()
on conflict (page_key, section_key) do update
set
  payload = excluded.payload,
  status = 'published',
  published_at = coalesce(public.page_sections.published_at, now()),
  updated_at = now();

-- about.leadership from leadership
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
select
  'about',
  'leadership',
  'published',
  11,
  jsonb_build_object(
    'items',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'name', e.title,
            'role', coalesce(e.metadata->>'role', ''),
            'desc', coalesce(e.summary, '')
          )
          order by e.sort_order, e.published_at desc nulls last
        )
        from public.content_entries e
        where e.content_type = 'leadership'
          and e.status = 'published'
      ),
      '[]'::jsonb
    )
  ),
  now()
on conflict (page_key, section_key) do update
set
  payload = excluded.payload,
  status = 'published',
  published_at = coalesce(public.page_sections.published_at, now()),
  updated_at = now();

-- learn.youth: merge programs into existing section payload
update public.page_sections
set
  payload = payload || jsonb_build_object(
    'programs',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'type', coalesce(e.metadata->>'type', e.category, ''),
            'title', e.title,
            'desc', coalesce(e.summary, ''),
            'schedule', coalesce(e.metadata->>'schedule', '')
          )
          order by e.sort_order
        )
        from public.content_entries e
        where e.content_type = 'workshop'
          and e.status = 'published'
          and e.slug in ('docent-internship', 'youth-volunteer-guild')
      ),
      '[]'::jsonb
    )
  ),
  updated_at = now()
where page_key = 'learn'
  and section_key = 'youth';

-- learn.family: merge workshops into existing section payload
update public.page_sections
set
  payload = payload || jsonb_build_object(
    'workshops',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slug', e.slug,
            'type', coalesce(e.metadata->>'type', e.category, ''),
            'title', e.title,
            'desc', coalesce(e.summary, ''),
            'schedule', coalesce(e.metadata->>'schedule', '')
          )
          order by e.sort_order
        )
        from public.content_entries e
        where e.content_type = 'workshop'
          and e.status = 'published'
          and e.slug in ('talk-story-saturdays', 'ohana-heritage-gardening', 'village-scavenger-hunt')
      ),
      '[]'::jsonb
    )
  ),
  updated_at = now()
where page_key = 'learn'
  and section_key = 'family';

-- Merge faq collection into visit.faq.items when visit.faq exists and faq rows exist
update public.page_sections ps
set
  payload = jsonb_set(
    coalesce(ps.payload, '{}'::jsonb),
    '{items}',
    (
      select coalesce(jsonb_agg(item order by ord), '[]'::jsonb)
      from (
        select
          jsonb_build_object('q', x.q, 'a', x.a) as item,
          min(x.ord) as ord
        from (
          select
            coalesce(elem->>'q', '') as q,
            coalesce(elem->>'a', '') as a,
            (ordinality) as ord
          from jsonb_array_elements(coalesce(ps.payload->'items', '[]'::jsonb)) with ordinality as t(elem, ordinality)
          union all
          select
            e.title as q,
            coalesce(e.body, e.summary, '') as a,
            1000 + e.sort_order as ord
          from public.content_entries e
          where e.content_type = 'faq'
            and e.status = 'published'
            and not exists (
              select 1
              from jsonb_array_elements(coalesce(ps.payload->'items', '[]'::jsonb)) existing
              where existing->>'q' = e.title
            )
        ) x
        group by x.q, x.a
      ) deduped
    )
  ),
  updated_at = now()
where ps.page_key = 'visit'
  and ps.section_key = 'faq'
  and exists (
    select 1 from public.content_entries e
    where e.content_type = 'faq' and e.status = 'published'
  );
