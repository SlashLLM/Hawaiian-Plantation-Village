import type { CollectionConfig } from 'payload'

export const ImmigrationStories: CollectionConfig = {
  slug: 'immigration-stories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['culture', 'title', 'arrivalYear', 'updatedAt'],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'culture',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'arrivalYear',
      type: 'text',
      required: true,
      label: 'Arrival Year',
    },
    {
      name: 'shortDesc',
      type: 'textarea',
      required: true,
      label: 'Short Description',
    },
    {
      name: 'fullHistory',
      type: 'textarea',
      required: true,
      label: 'Full History',
    },
    {
      name: 'oralHistory',
      type: 'group',
      fields: [
        { name: 'narrator', type: 'text', required: true },
        { name: 'length', type: 'text', required: true },
        { name: 'audioSimText', type: 'text', label: 'Audio Source Label' },
        { name: 'transcript', type: 'textarea', required: true },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
