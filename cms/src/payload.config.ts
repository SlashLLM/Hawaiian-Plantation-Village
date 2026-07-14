import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { News } from './collections/News'
import { ImmigrationStories } from './collections/ImmigrationStories'
import { CurriculumModules } from './collections/CurriculumModules'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const hasS3Config =
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_ENDPOINT

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— HPV CMS',
    },
  },
  collections: [Users, Media, Events, News, ImmigrationStories, CurriculumModules],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.DATABASE_URI?.includes('supabase.co')
        ? { rejectUnauthorized: false }
        : undefined,
    },
  }),
  cors: corsOrigins,
  csrf: corsOrigins,
  sharp,
  plugins: hasS3Config
    ? [
        s3Storage({
          collections: {
            media: {
              prefix: 'media',
            },
          },
          bucket: process.env.S3_BUCKET!,
          config: {
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            region: process.env.S3_REGION || 'us-east-1',
            endpoint: process.env.S3_ENDPOINT!,
          },
        }),
      ]
    : [],
})
