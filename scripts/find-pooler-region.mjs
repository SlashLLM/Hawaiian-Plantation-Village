import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../cms/.env') })

const uri = process.env.DATABASE_URI || ''
const match = uri.match(/postgres\.([^:]+):([^@]+)@/)
const ref = match?.[1]
const password = match?.[2]

if (!ref || !password) {
  console.error('Could not parse project ref/password from DATABASE_URI in cms/.env')
  process.exit(1)
}

const regions = [
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-south-1',
  'us-east-1',
  'us-west-1',
  'eu-west-1',
  'eu-west-2',
  'eu-central-1',
]

for (const region of regions) {
  const host = `aws-0-${region}.pooler.supabase.com`
  const testUri = `postgresql://postgres.${ref}:${password}@${host}:5432/postgres`
  const client = new pg.Client({
    connectionString: testUri,
    connectionTimeoutMillis: 8000,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()
    await client.query('select 1 as ok')
    await client.end()
    console.log(`Working pooler region: ${region}`)
    console.log(`DATABASE_URI=postgresql://postgres.${ref}:<password>@${host}:5432/postgres`)
    process.exit(0)
  } catch (error) {
    const message = error.message.split('\n')[0]
    console.log(`FAIL ${region}: ${message}`)
    try {
      await client.end()
    } catch {}
  }
}

console.error('No working pooler region found. Copy Session mode URI from Supabase dashboard.')
process.exit(1)
