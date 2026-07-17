-- HPV CMS, ticketing, membership, and QR verification schema
-- Idempotent: safe to re-run when objects already exist on remote

create extension if not exists "pgcrypto";

-- Enums (skip if already created)
do $$ begin create type public.user_role as enum ('admin', 'staff'); exception when duplicate_object then null; end $$;
do $$ begin create type public.booking_status as enum ('registered', 'checked_in', 'cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded'); exception when duplicate_object then null; end $$;
do $$ begin create type public.credential_type as enum ('booking', 'membership'); exception when duplicate_object then null; end $$;
do $$ begin create type public.membership_status as enum ('active', 'expired', 'revoked'); exception when duplicate_object then null; end $$;
do $$ begin create type public.content_type as enum ('event', 'news'); exception when duplicate_object then null; end $$;
do $$ begin create type public.content_status as enum ('draft', 'published', 'archived'); exception when duplicate_object then null; end $$;
do $$ begin
  create type public.scan_result as enum (
    'valid_checked_in', 'already_checked_in', 'active_member',
    'expired', 'revoked', 'unknown'
  );
exception when duplicate_object then null; end $$;
do $$ begin create type public.email_status as enum ('pending', 'sent', 'failed'); exception when duplicate_object then null; end $$;

-- Replace legacy events table if it uses a non-UUID primary key (blocks ticket_types FK)
do $$
declare
  events_id_type text;
begin
  select c.data_type into events_id_type
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'events'
    and c.column_name = 'id';

  if events_id_type is not null and events_id_type <> 'uuid' then
    raise notice 'Replacing legacy public.events (id type: %)', events_id_type;
    drop table if exists public.ticket_types cascade;
    drop table if exists public.booking_items cascade;
    drop table if exists public.bookings cascade;
    drop table if exists public.events cascade;
  end if;
end $$;

-- Tables
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null default 'staff',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  event_date date,
  start_time text,
  end_time text,
  is_special boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  slug text not null,
  label text not null,
  price_cents integer not null check (price_cents >= 0),
  requires_id boolean not null default false,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (event_id, slug)
);

create table if not exists public.membership_tiers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  level text not null,
  price_cents integer not null check (price_cents >= 0),
  period_label text not null default 'per year',
  benefits jsonb not null default '[]'::jsonb,
  accent_color text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  content_type public.content_type not null,
  status public.content_status not null default 'draft',
  title text not null,
  summary text,
  body text,
  category text,
  event_date_label text,
  image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  event_id uuid not null references public.events (id),
  visit_date date not null,
  visit_time text not null,
  purchaser_first_name text not null,
  purchaser_last_name text not null,
  purchaser_email text not null,
  status public.booking_status not null default 'registered',
  payment_status public.payment_status not null default 'pending',
  subtotal_cents integer not null default 0,
  donation_cents integer not null default 0,
  membership_cents integer not null default 0,
  total_cents integer not null default 0,
  includes_membership boolean not null default false,
  membership_tier_id uuid references public.membership_tiers (id),
  idempotency_key text unique,
  payment_provider text,
  payment_customer_id text,
  payment_checkout_id text,
  payment_metadata jsonb not null default '{}'::jsonb,
  checked_in_at timestamptz,
  checked_in_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.booking_items (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  ticket_type_id uuid not null references public.ticket_types (id),
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null,
  line_total_cents integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  tier_id uuid not null references public.membership_tiers (id),
  member_first_name text not null,
  member_last_name text not null,
  member_email text not null,
  household_note text,
  status public.membership_status not null default 'active',
  payment_status public.payment_status not null default 'pending',
  price_cents integer not null,
  starts_on date not null,
  ends_on date not null,
  idempotency_key text unique,
  payment_provider text,
  payment_customer_id text,
  payment_checkout_id text,
  payment_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.credential_tokens (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  credential_type public.credential_type not null,
  booking_id uuid references public.bookings (id) on delete cascade,
  membership_id uuid references public.memberships (id) on delete cascade,
  is_revoked boolean not null default false,
  created_at timestamptz not null default now(),
  constraint credential_owner_check check (
    (credential_type = 'booking' and booking_id is not null and membership_id is null)
    or (credential_type = 'membership' and membership_id is not null and booking_id is null)
  )
);

create table if not exists public.scan_logs (
  id uuid primary key default gen_random_uuid(),
  credential_token_id uuid references public.credential_tokens (id) on delete set null,
  scanned_by uuid references public.profiles (id),
  scan_result public.scan_result not null,
  reference_id text,
  credential_type public.credential_type,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.email_deliveries (
  id uuid primary key default gen_random_uuid(),
  recipient_email text not null,
  subject text not null,
  template_key text not null,
  booking_id uuid references public.bookings (id) on delete set null,
  membership_id uuid references public.memberships (id) on delete set null,
  status public.email_status not null default 'pending',
  resend_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists bookings_email_idx on public.bookings (purchaser_email);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_visit_date_idx on public.bookings (visit_date);
create index if not exists memberships_email_idx on public.memberships (member_email);
create index if not exists memberships_status_idx on public.memberships (status);
create index if not exists content_entries_type_status_idx on public.content_entries (content_type, status);
create index if not exists scan_logs_created_idx on public.scan_logs (created_at desc);
create index if not exists email_deliveries_booking_idx on public.email_deliveries (booking_id);
create index if not exists email_deliveries_membership_idx on public.email_deliveries (membership_id);

-- Updated_at trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists events_updated_at on public.events;
create trigger events_updated_at before update on public.events
  for each row execute function public.set_updated_at();

drop trigger if exists membership_tiers_updated_at on public.membership_tiers;
create trigger membership_tiers_updated_at before update on public.membership_tiers
  for each row execute function public.set_updated_at();

drop trigger if exists content_entries_updated_at on public.content_entries;
create trigger content_entries_updated_at before update on public.content_entries
  for each row execute function public.set_updated_at();

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

drop trigger if exists memberships_updated_at on public.memberships;
create trigger memberships_updated_at before update on public.memberships
  for each row execute function public.set_updated_at();

drop trigger if exists email_deliveries_updated_at on public.email_deliveries;
create trigger email_deliveries_updated_at before update on public.email_deliveries
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'staff')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Staff role helpers
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.ticket_types enable row level security;
alter table public.membership_tiers enable row level security;
alter table public.content_entries enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_items enable row level security;
alter table public.memberships enable row level security;
alter table public.credential_tokens enable row level security;
alter table public.scan_logs enable row level security;
alter table public.email_deliveries enable row level security;

-- Policies (drop + recreate for idempotency)
drop policy if exists "Public read active events" on public.events;
create policy "Public read active events" on public.events for select using (is_active = true);

drop policy if exists "Public read active ticket types" on public.ticket_types;
create policy "Public read active ticket types" on public.ticket_types for select
  using (is_active = true and exists (select 1 from public.events e where e.id = event_id and e.is_active = true));

drop policy if exists "Public read active membership tiers" on public.membership_tiers;
create policy "Public read active membership tiers" on public.membership_tiers for select using (is_active = true);

drop policy if exists "Public read published content" on public.content_entries;
create policy "Public read published content" on public.content_entries for select using (status = 'published');

drop policy if exists "Staff read profiles" on public.profiles;
create policy "Staff read profiles" on public.profiles for select using (public.is_staff());

drop policy if exists "Staff read own profile" on public.profiles;
create policy "Staff read own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Staff read bookings" on public.bookings;
create policy "Staff read bookings" on public.bookings for select using (public.is_staff());

drop policy if exists "Staff read booking items" on public.booking_items;
create policy "Staff read booking items" on public.booking_items for select using (public.is_staff());

drop policy if exists "Staff read memberships" on public.memberships;
create policy "Staff read memberships" on public.memberships for select using (public.is_staff());

drop policy if exists "Staff read credentials" on public.credential_tokens;
create policy "Staff read credentials" on public.credential_tokens for select using (public.is_staff());

drop policy if exists "Staff read scan logs" on public.scan_logs;
create policy "Staff read scan logs" on public.scan_logs for select using (public.is_staff());

drop policy if exists "Staff read email deliveries" on public.email_deliveries;
create policy "Staff read email deliveries" on public.email_deliveries for select using (public.is_staff());

drop policy if exists "Staff read all content" on public.content_entries;
create policy "Staff read all content" on public.content_entries for select using (public.is_staff());

drop policy if exists "Staff read all events" on public.events;
create policy "Staff read all events" on public.events for select using (public.is_staff());

drop policy if exists "Staff read all ticket types" on public.ticket_types;
create policy "Staff read all ticket types" on public.ticket_types for select using (public.is_staff());

drop policy if exists "Staff read all membership tiers" on public.membership_tiers;
create policy "Staff read all membership tiers" on public.membership_tiers for select using (public.is_staff());

drop policy if exists "Admin manage events" on public.events;
create policy "Admin manage events" on public.events for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admin manage ticket types" on public.ticket_types;
create policy "Admin manage ticket types" on public.ticket_types for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admin manage membership tiers" on public.membership_tiers;
create policy "Admin manage membership tiers" on public.membership_tiers for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admin manage content" on public.content_entries;
create policy "Admin manage content" on public.content_entries for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Staff update bookings" on public.bookings;
create policy "Staff update bookings" on public.bookings for update using (public.is_staff()) with check (public.is_staff());

drop policy if exists "Staff update memberships" on public.memberships;
create policy "Staff update memberships" on public.memberships for update using (public.is_staff()) with check (public.is_staff());
