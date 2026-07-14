import type { CollectionConfig } from 'payload'

export const CurriculumModules: CollectionConfig = {
  slug: 'curriculum-modules',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['gradeLevel', 'title', 'updatedAt'],
  },
  fields: [
    {
      name: 'gradeLevel',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Elementary (Grades 3-5)', value: 'elementary' },
        { label: 'Middle School (Grades 6-8)', value: 'middle' },
        { label: 'High School (Grades 9-12)', value: 'high' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'grades',
      type: 'text',
      required: true,
      label: 'Grade Label',
    },
    {
      name: 'checkpoints',
      type: 'array',
      required: true,
      fields: [
        { name: 'checkpointId', type: 'text', required: true, label: 'Checkpoint ID' },
        { name: 'label', type: 'text', required: true },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL (fallback)',
        },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'challengeType',
          type: 'select',
          required: true,
          options: [
            { label: 'Quiz', value: 'quiz' },
            { label: 'Game', value: 'game' },
          ],
        },
        {
          name: 'quizQuestion',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.challengeType === 'quiz',
          },
        },
        {
          name: 'quizChoices',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.challengeType === 'quiz',
          },
          fields: [{ name: 'choice', type: 'text', required: true }],
        },
        {
          name: 'correctIndex',
          type: 'number',
          admin: {
            condition: (_, siblingData) => siblingData?.challengeType === 'quiz',
          },
        },
        {
          name: 'feedbackCorrect',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData?.challengeType === 'quiz',
          },
        },
        {
          name: 'feedbackIncorrect',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData?.challengeType === 'quiz',
          },
        },
        {
          name: 'gameId',
          type: 'select',
          admin: {
            condition: (_, siblingData) => siblingData?.challengeType === 'game',
          },
          options: [
            { label: 'Bango Match', value: 'bango-match' },
            { label: 'Sugar Maker', value: 'sugar-maker' },
          ],
        },
      ],
    },
  ],
}
