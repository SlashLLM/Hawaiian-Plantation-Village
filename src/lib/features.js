// Launch-time switch for the money-facing surfaces of the public site.
// Payments are OFF unless the env var explicitly says otherwise, so a missing
// or misspelled value fails safe rather than exposing a checkout that cannot charge.
export const paymentsEnabled =
  String(import.meta.env.VITE_PAYMENTS_ENABLED).toLowerCase() === 'true';

// Page ids whose flows depend on a payment provider being connected.
export const GATED_PAGE_IDS = ['tickets', 'support'];

// While payments are off these pages still exist and stay linked — they render a
// placeholder instead of the real booking / donate flow, and every CTA pointing at
// them is badged "Coming soon".
export function isComingSoon(pageId) {
  return !paymentsEnabled && GATED_PAGE_IDS.includes(pageId);
}

// True for a nav / footer / door entry keyed by either `page` or `id`.
export function linkIsComingSoon(link) {
  return isComingSoon(link?.page ?? link?.id);
}
