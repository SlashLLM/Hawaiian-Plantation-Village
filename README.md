# Hawaii's Plantation Village — CMS, Ticketing & Membership

React + Vite public site with a Supabase-backed CMS focused on **item lists** (stories, news, careers, curriculum), plus site settings, ticketing, memberships, and Storage uploads.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Apply migrations in order under `supabase/migrations/`
4. Seed operational data: `supabase/seed.sql`
5. Seed CMS content: `supabase/seed_cms.sql`
6. Deploy edge functions (`create-booking`, `create-membership`, `submit-inquiry`, etc.) and set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INQUIRY_TO_EMAIL`, `SUPABASE_SERVICE_ROLE_KEY`
7. Create auth user and `update public.profiles set role = 'admin' where email = '...'`
8. `npm run dev` — public site at `/`, admin at `/admin`

### Remote Supabase

```bash
npx supabase link --project-ref <your-ref>
npx supabase db push
psql <connection-string> -f supabase/seed.sql
psql <connection-string> -f supabase/seed_cms.sql
npx supabase functions deploy
```

## Frontend CMS

### Content precedence

Public pages load content in this order:

1. **Published Supabase rows** (site settings, page sections, content entries, catalog, curriculum)
2. **Local fallbacks** in `src/lib/content/fallbacks.js` (offline-safe defaults)
3. **Intentional empty state** when both are absent

Staff signed into `/admin` can preview draft content via RLS (`is_staff()` policies).

### Editing site copy

`src/lib/content/fallbacks.js` is the authoring source of truth for editorial
copy. Edit it, then regenerate the SQL:

```bash
node scripts/sync-home-about-seed.mjs     # rewrites supabase/seed_cms.sql (fresh databases)
node scripts/generate-copy-migration.mjs  # emits a migration that updates a LIVE database
```

Both read the same rows. The distinction matters: `seed_cms.sql` inserts
page sections with `on conflict do nothing`, so it only ever populates an empty
database — it cannot change a row that already exists. To push changed copy to
a database that is already seeded, apply the generated migration, which upserts
with `do update`.

The migration deliberately **excludes admin-owned record lists** (events, news,
careers, timeline, leadership, testimonials, partners — see
`ADMIN_DATA_SECTIONS` in `scripts/lib/cmsSeedRows.mjs`). Those rows hold real
entries created by staff in `/admin`; overwriting them with code defaults would
be data loss rather than a copy change. Everything else it does overwrite, so
confirm no pending CMS edits before applying.

Page titles and meta descriptions are **not** part of this pipeline — each page
sets its own via the `<SEO>` component.

### Data model

| Table | Purpose |
|-------|---------|
| `site_settings` | Brand, nav, footer, contact, hours, hero, SEO, donation presets |
| `page_sections` | Fixed page copy (seeded / fallback; not edited in admin) |
| `content_entries` | Admin-managed items: `camp_story`, `news`, `career` |
| `events` / `ticket_types` | Ticket catalog (authoritative pricing) |
| `group_ticket_types` / `tour_time_slots` | Group pricing and tour schedules |
| `membership_tiers` | Steward membership catalog |
| `curriculum_modules` / `curriculum_checkpoints` | Learn modules, videos, quizzes |
| `media_assets` + `cms-media` Storage bucket | Uploaded images/audio/video with alt text |

### Admin authoring (`/admin` → Content / Page Editor)

- **Stories** — add / edit / delete camp stories (oral history audio)
- **News & Announcements** — add / edit / delete About-page news
- **Careers** — add / edit / delete job postings
- **Curriculum** — modules and checkpoints (archive/deactivate to remove from public)
- **Community Programs** — Home page Upcoming Community Programs events (`Page Editor` → Home)
- **Media uploads** — `MediaUploadField` / `AudioUploadField` / `VideoUploadField` upload to `cms-media`

Contact, career, field trip, student program, and workshop forms submit via the `submit-inquiry` edge function and email staff at `INQUIRY_TO_EMAIL` (with an auto-reply to the submitter).

Publishing sets `status = 'published'` and `published_at`. Delete permanently removes content entry rows. Public pages refresh on next fetch (no rebuild required).

### Public content layer

- `src/context/ContentProvider.jsx` — global fetch + cache
- `src/lib/content/cmsApi.js` — Supabase readers and Storage upload
- `src/lib/content/mappers.js` — row → UI shape
- `src/lib/content/fallbacks.js` — offline defaults

Hooks: `useSiteSettings`, `usePageSection`, `usePageListSection`, `useContentCollection` (stories, news, careers), `useCurriculumModules`, `useContent`.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run test` — Vitest
- `npm run lint` — oxlint

## Recovery

- If Supabase is unreachable, the site renders fallback content from `src/lib/content/fallbacks.js`.
- Re-run `supabase/seed_cms.sql` to restore default published content after schema changes.
- **`site_settings` returning `42703: column site_settings.payload does not exist`**
  means a leftover Payload CMS table of the same name is squatting the name, so
  `create table if not exists` in `20260714100000_cms_full.sql` silently did
  nothing. Every settings read then 400s and the site falls back to code for
  nav, hero, footer and SEO. The generated copy migration detects and repairs
  this before upserting.
- Abandoned Storage uploads can be removed from the `cms-media` bucket and `media_assets` table manually.

See `.env.example` and `supabase/` for deployment details.
