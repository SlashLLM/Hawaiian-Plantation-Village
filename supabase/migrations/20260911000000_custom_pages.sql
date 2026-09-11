-- Custom pages: visually composed, block-based pages published at /events/:slug.
--
-- Kept out of page_sections on purpose: ContentProvider eagerly loads every
-- page_sections row on first paint, and custom pages must be fetched on demand
-- by slug instead of riding along in the global payload.

create table if not exists public.custom_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status public.content_status not null default 'draft',
  seo jsonb not null default '{}'::jsonb,
  blocks jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists custom_pages_status_idx on public.custom_pages (status);

drop trigger if exists custom_pages_updated_at on public.custom_pages;
create trigger custom_pages_updated_at before update on public.custom_pages
  for each row execute function public.set_updated_at();

-- RLS mirrors page_sections: public sees published, staff preview drafts,
-- admins write.
alter table public.custom_pages enable row level security;

drop policy if exists "Public read published custom pages" on public.custom_pages;
create policy "Public read published custom pages" on public.custom_pages for select
  using (status = 'published');

drop policy if exists "Staff read all custom pages" on public.custom_pages;
create policy "Staff read all custom pages" on public.custom_pages for select
  using (public.is_staff());

drop policy if exists "Admin manage custom pages" on public.custom_pages;
create policy "Admin manage custom pages" on public.custom_pages for all
  using (public.is_admin()) with check (public.is_admin());
