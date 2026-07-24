-- Drop orphaned Payload CMS tables left in public schema.
-- HPV uses a custom CMS (content_entries, media_assets, profiles, etc.) with RLS;
-- these Payload tables had RLS disabled and are not referenced by the app.
-- Safe to re-run: DROP TABLE IF EXISTS.

DROP TABLE IF EXISTS public.curriculum_modules_checkpoints_quiz_choices CASCADE;
DROP TABLE IF EXISTS public.curriculum_modules_checkpoints CASCADE;
DROP TABLE IF EXISTS public.immigration_stories CASCADE;
DROP TABLE IF EXISTS public.site_settings_social_links CASCADE;
DROP TABLE IF EXISTS public._news_v CASCADE;
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public._events_v CASCADE;
DROP TABLE IF EXISTS public.media CASCADE;
DROP TABLE IF EXISTS public.users_sessions CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.payload_locked_documents_rels CASCADE;
DROP TABLE IF EXISTS public.payload_locked_documents CASCADE;
DROP TABLE IF EXISTS public.payload_preferences_rels CASCADE;
DROP TABLE IF EXISTS public.payload_preferences CASCADE;
DROP TABLE IF EXISTS public.payload_migrations CASCADE;
DROP TABLE IF EXISTS public.payload_kv CASCADE;
