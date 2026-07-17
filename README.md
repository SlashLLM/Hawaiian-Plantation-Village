# Hawaiian Plantation Village — CMS, Ticketing & Membership

React + Vite public site with a Supabase-backed CMS focused on **item lists** (stories, news, careers, curriculum), plus site settings, ticketing, memberships, and Storage uploads.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Apply migrations in order under `supabase/migrations/`
4. Seed operational data: `supabase/seed.sql`
5. Seed CMS content: `supabase/seed_cms.sql`
6. Deploy edge functions and set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `SUPABASE_SERVICE_ROLE_KEY`
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

### Admin authoring (`/admin` → Content)

- **Stories** — add / edit / delete camp stories (oral history audio)
- **News & Announcements** — add / edit / delete About-page news
- **Careers** — add / edit / delete job postings
- **Curriculum** — modules and checkpoints (archive/deactivate to remove from public)
- **Media uploads** — `MediaUploadField` / `AudioUploadField` / `VideoUploadField` upload to `cms-media`

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
- Abandoned Storage uploads can be removed from the `cms-media` bucket and `media_assets` table manually.

See `.env.example` and `supabase/` for deployment details.
