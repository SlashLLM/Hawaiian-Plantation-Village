-- Migration: 20260914090000_membership_tiers_from_flyer.sql
-- Replaces the placeholder tiers (Individual $45 / Household $75 / Steward $150)
-- with the tiers on the printed membership form: Individual $35, Senior $30
-- (age 62+), Family $60 (two adults & children under 18).
-- Old tiers are deactivated rather than deleted — memberships reference them.

update public.membership_tiers
set is_active = false, updated_at = now()
where slug in ('household', 'steward');

insert into public.membership_tiers (slug, level, price_cents, period_label, benefits, accent_color, sort_order)
values
  ('individual', 'Individual', 3500, 'per year', '["Membership for one adult","Free admission and guided tours for one year","Members-only invitations to special events, exhibits & cultural heritage celebrations","10% off at the gift shop"]'::jsonb, '#1b3823', 1),
  ('senior', 'Senior', 3000, 'per year', '["For members age 62 & above","Free admission and guided tours for one year","Members-only invitations to special events, exhibits & cultural heritage celebrations","10% off at the gift shop"]'::jsonb, '#22646d', 2),
  ('family', 'Family', 6000, 'per year', '["Two adults & children under 18","Free admission and guided tours for one year","Members-only invitations to special events, exhibits & cultural heritage celebrations","10% off at the gift shop"]'::jsonb, '#b24e2c', 3)
on conflict (slug) do update set
  level = excluded.level,
  price_cents = excluded.price_cents,
  period_label = excluded.period_label,
  benefits = excluded.benefits,
  accent_color = excluded.accent_color,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = now();
