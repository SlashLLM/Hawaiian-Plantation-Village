/**
 * Online payments are not connected yet. While this is false, /tickets and
 * /support show a Coming Soon notice pointing visitors at the phone number
 * instead of a checkout flow that cannot take money.
 *
 * Flip to true once Stripe/Zeffy is connected — the booking wizard and the
 * donation/membership flows are left intact and come back as they were.
 */
export const PAYMENTS_ENABLED = false;

export const COMING_SOON_COPY = {
  tickets: {
    eyebrow: 'Coming soon',
    title: 'Online ticket booking is on its way',
    body:
      'We haven’t set up online payments yet. To reserve a guided tour, ask about group visits, or plan a school trip, please give us a call — we’d love to hear from you.',
  },
  support: {
    eyebrow: 'Coming soon',
    title: 'Online giving is on its way',
    body:
      'We haven’t set up online payments yet. To make a gift, start or renew a membership, or ask about other ways to support the Village, please give us a call.',
  },
};
