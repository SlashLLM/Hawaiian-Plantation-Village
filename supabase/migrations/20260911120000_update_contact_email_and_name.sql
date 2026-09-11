-- Migration: 20260911120000_update_contact_email_and_name.sql
-- Updates contact email to lchen.hpv@gmail.com in site_settings
-- Standardizes all occurrences of "Hawaiʻi's Plantation Village" to "Hawaii's Plantation Village" in CMS sections

-- 1. Update site_settings default payload
update public.site_settings
set payload = jsonb_set(
  jsonb_set(payload, '{contact,email}', '"lchen.hpv@gmail.com"'),
  '{contact,emailHref}', '"mailto:lchen.hpv@gmail.com"'
),
updated_at = now()
where id = 'default';

-- 2. Standardize page_sections text in JSONB payloads where okina was present
update public.page_sections
set payload = replace(payload::text, 'Hawai\u02BBi''s Plantation Village', 'Hawaii''s Plantation Village')::jsonb,
    updated_at = now()
where payload::text like '%Plantation Village%';
