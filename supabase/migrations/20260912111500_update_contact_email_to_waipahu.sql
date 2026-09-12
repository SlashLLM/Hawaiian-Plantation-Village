-- Migration: 20260912111500_update_contact_email_to_waipahu.sql
-- Updates contact email to Waipahu.hpv@gmail.com in site_settings

update public.site_settings
set payload = jsonb_set(
  jsonb_set(payload, '{contact,email}', '"Waipahu.hpv@gmail.com"'),
  '{contact,emailHref}', '"mailto:Waipahu.hpv@gmail.com"'
),
updated_at = now()
where id = 'default';
