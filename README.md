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

### Static vs. dynamic content

Most of the site is **static**: it ships in the bundle and is edited in code.

| Static (edit in code, redeploy) | File |
|---|---|
| Site settings: brand, nav, footer, contact, hours, donation presets | `src/lib/content/staticContent.js` (`DEFAULT_SITE_SETTINGS`) |
| All page copy | `src/lib/content/staticContent.js` (`DEFAULT_PAGE_SECTIONS`) |
| Ticket events, membership tiers, group prices | `src/data/ticketing.js` |

Only what the **Content CMS tabs** manage is read from Supabase at runtime:

| CMS tab | Table |
|---|---|
| Stories | `content_entries` (`camp_story`) |
| Archives | `content_entries` (`photograph`) |
| Upcoming Events | `page_sections` row `home` / `events` |
| Event Pages | `custom_pages` |
| News & Announcements | `content_entries` (`news`) |
| Careers | `content_entries` (`career`) |
| Curriculum | `curriculum_modules` / `curriculum_checkpoints` |

If Supabase is unreachable, those fall back to the lists in `staticContent.js`.
Staff signed into `/admin` can preview draft CMS content via RLS (`is_staff()` policies).

The `site_settings` table, the other `page_sections` rows and `group_ticket_types` are
no longer read by the site. `node scripts/export-static-content.mjs` reports how the
linked database differs from the static files.

**Prices:** the `create-booking` / `create-membership` edge functions still price from
`ticket_types` and `membership_tiers` (matched by slug). A price or ticket change must be
made in `src/data/ticketing.js` **and** in a migration.

Page titles and meta descriptions are set per page via the `<SEO>` component.

### Data model

| Table | Purpose |
|-------|---------|
| `site_settings` | Legacy; not read by the site (settings are static) |
| `page_sections` | Only `home` / `events` is read (Upcoming Events tab); other rows are legacy |
| `content_entries` | Admin-managed items: `camp_story`, `photograph`, `news`, `career` |
| `custom_pages` | CMS-built event pages |
| `events` / `ticket_types` | Server-side pricing for `create-booking` (display data is static) |
| `group_ticket_types` / `tour_time_slots` | Legacy; not read by the site |
| `membership_tiers` | Server-side pricing for `create-membership` (display data is static) |
| `curriculum_modules` / `curriculum_checkpoints` | Learn modules, videos, quizzes |
| `media_assets` + `cms-media` Storage bucket | Uploaded images/audio/video with alt text |

### Admin authoring (`/admin` → Content)

- **Stories** — add / edit / delete camp stories (oral history audio)
- **Archives** — add / edit / delete photographs
- **Upcoming Events** — Home / Visit / Events page event list
- **Event Pages** — build custom pages for events
- **News & Announcements** — add / edit / delete About-page news
- **Careers** — add / edit / delete job postings
- **Curriculum** — modules and checkpoints (archive/deactivate to remove from public)
- **Media uploads** — `MediaUploadField` / `AudioUploadField` / `VideoUploadField` upload to `cms-media`

Contact, career, field trip, student program, workshop, volunteer, group visit, and footer newsletter forms submit via the `submit-inquiry` edge function and email staff at `INQUIRY_TO_EMAIL` (with an auto-reply to the submitter).

Publishing sets `status = 'published'` and `published_at`. Delete permanently removes content entry rows. Public pages refresh on next fetch (no rebuild required).

### Public content layer

- `src/context/ContentProvider.jsx` — static content + fetch/cache of CMS-managed data
- `src/lib/content/cmsApi.js` — Supabase readers and Storage upload
- `src/lib/content/mappers.js` — row → UI shape
- `src/lib/content/staticContent.js` — static site copy and CMS offline fallbacks
- `src/data/ticketing.js` — static ticketing and membership data

Hooks: `useSiteSettings`, `usePageSection`, `usePageListSection`, `useContentCollection` (stories, news, careers), `useCurriculumModules`, `useContent`.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run test` — Vitest
- `npm run lint` — oxlint

## Recovery

- If Supabase is unreachable, static copy still renders and CMS lists fall back to `src/lib/content/staticContent.js`.
- Re-run `supabase/seed_cms.sql` to restore default published content after schema changes.
- Abandoned Storage uploads can be removed from the `cms-media` bucket and `media_assets` table manually.

See `.env.example` and `supabase/` for deployment details.
