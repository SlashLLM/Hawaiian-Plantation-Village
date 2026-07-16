-- Full frontend CMS: settings, sections, extended collections, curriculum, group pricing, media

-- Extend content_type enum
do $$ begin alter type public.content_type add value if not exists 'program'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'career'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'camp_story'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'faq'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'testimonial'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'partner'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'timeline'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'leadership'; exception when duplicate_object then null; end $$;
do $$ begin alter type public.content_type add value if not exists 'workshop'; exception when duplicate_object then null; end $$;

alter table public.content_entries
  add column if not exists sort_order integer not null default 0,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create table if not exists public.site_settings (
  id text primary key default 'default',
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  payload jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);

create table if not exists public.group_ticket_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  price_cents integer not null check (price_cents >= 0),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.tour_time_slots (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events (id) on delete cascade,
  label text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  mime_type text,
  file_size integer,
  uploaded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- Early prototypes used integer IDs for curriculum modules. `create table if not
-- exists` cannot correct an incompatible primary-key type, so replace only that
-- legacy shape before creating the UUID-backed CMS curriculum tables below.
do $$
declare
  module_id_type text;
begin
  select data_type
    into module_id_type
    from information_schema.columns
   where table_schema = 'public'
     and table_name = 'curriculum_modules'
     and column_name = 'id';

  if module_id_type is not null and module_id_type <> 'uuid' then
    drop table if exists public.curriculum_checkpoints cascade;
    drop table public.curriculum_modules cascade;
  end if;
end
$$;

create table if not exists public.curriculum_modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  grades text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.curriculum_checkpoints (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.curriculum_modules (id) on delete cascade,
  slug text not null,
  label text not null,
  video_url text,
  body_text text,
  challenge jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  unique (module_id, slug)
);

-- Indexes
create index if not exists page_sections_page_status_idx on public.page_sections (page_key, status);
create index if not exists content_entries_type_sort_idx on public.content_entries (content_type, sort_order);
create index if not exists curriculum_checkpoints_module_idx on public.curriculum_checkpoints (module_id, sort_order);

-- Updated_at triggers
drop trigger if exists page_sections_updated_at on public.page_sections;
create trigger page_sections_updated_at before update on public.page_sections
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

drop trigger if exists curriculum_modules_updated_at on public.curriculum_modules;
create trigger curriculum_modules_updated_at before update on public.curriculum_modules
  for each row execute function public.set_updated_at();

-- RLS
alter table public.site_settings enable row level security;
alter table public.page_sections enable row level security;
alter table public.group_ticket_types enable row level security;
alter table public.tour_time_slots enable row level security;
alter table public.media_assets enable row level security;
alter table public.curriculum_modules enable row level security;
alter table public.curriculum_checkpoints enable row level security;

drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings for select using (true);

drop policy if exists "Admin manage site settings" on public.site_settings;
create policy "Admin manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read published sections" on public.page_sections;
create policy "Public read published sections" on public.page_sections for select using (status = 'published');

drop policy if exists "Staff read all sections" on public.page_sections;
create policy "Staff read all sections" on public.page_sections for select using (public.is_staff());

drop policy if exists "Admin manage sections" on public.page_sections;
create policy "Admin manage sections" on public.page_sections for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read active group tickets" on public.group_ticket_types;
create policy "Public read active group tickets" on public.group_ticket_types for select using (is_active = true);

drop policy if exists "Admin manage group tickets" on public.group_ticket_types;
create policy "Admin manage group tickets" on public.group_ticket_types for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read active tour slots" on public.tour_time_slots;
create policy "Public read active tour slots" on public.tour_time_slots for select using (is_active = true);

drop policy if exists "Admin manage tour slots" on public.tour_time_slots;
create policy "Admin manage tour slots" on public.tour_time_slots for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read media assets" on public.media_assets;
create policy "Public read media assets" on public.media_assets for select using (true);

drop policy if exists "Admin manage media assets" on public.media_assets;
create policy "Admin manage media assets" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read active curriculum modules" on public.curriculum_modules;
create policy "Public read active curriculum modules" on public.curriculum_modules for select using (is_active = true);

drop policy if exists "Staff read all curriculum modules" on public.curriculum_modules;
create policy "Staff read all curriculum modules" on public.curriculum_modules for select using (public.is_staff());

drop policy if exists "Admin manage curriculum modules" on public.curriculum_modules;
create policy "Admin manage curriculum modules" on public.curriculum_modules for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read curriculum checkpoints" on public.curriculum_checkpoints;
create policy "Public read curriculum checkpoints" on public.curriculum_checkpoints for select
  using (exists (select 1 from public.curriculum_modules m where m.id = module_id and m.is_active = true));

drop policy if exists "Staff read all checkpoints" on public.curriculum_checkpoints;
create policy "Staff read all checkpoints" on public.curriculum_checkpoints for select using (public.is_staff());

drop policy if exists "Admin manage checkpoints" on public.curriculum_checkpoints;
create policy "Admin manage checkpoints" on public.curriculum_checkpoints for all using (public.is_admin()) with check (public.is_admin());

-- Storage bucket for CMS media
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "Public read cms media" on storage.objects;
create policy "Public read cms media" on storage.objects for select using (bucket_id = 'cms-media');

drop policy if exists "Admin upload cms media" on storage.objects;
create policy "Admin upload cms media" on storage.objects for insert
  with check (bucket_id = 'cms-media' and public.is_admin());

drop policy if exists "Admin update cms media" on storage.objects;
create policy "Admin update cms media" on storage.objects for update
  using (bucket_id = 'cms-media' and public.is_admin());

drop policy if exists "Admin delete cms media" on storage.objects;
create policy "Admin delete cms media" on storage.objects for delete
  using (bucket_id = 'cms-media' and public.is_admin());
