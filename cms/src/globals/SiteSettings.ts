import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'hours',
      type: 'group',
      fields: [
        { name: 'weekday', type: 'text', defaultValue: 'Tuesday – Saturday: 9:00 AM – 2:00 PM' },
        { name: 'tours', type: 'text', defaultValue: 'Guided tours at 10:00 AM & 12:00 PM' },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'address', type: 'text', defaultValue: '94-695 Waipahu Street' },
        { name: 'city', type: 'text', defaultValue: "Waipahu, Oʻahu (Free parking onsite)" },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
