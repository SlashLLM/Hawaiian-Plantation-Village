import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../cms/.env') })

const uri = process.env.DATABASE_URI
if (!uri) {
  console.error('DATABASE_URI is not set in cms/.env')
  process.exit(1)
}

const client = new pg.Client({
  connectionString: uri,
  connectionTimeoutMillis: 10000,
  ssl: uri.includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
})

try {
  await client.connect()
  const result = await client.query('select 1 as ok')
  console.log('Database connection OK:', result.rows[0])
  await client.end()
} catch (error) {
  console.error('Database connection failed:', error.message)
  process.exit(1)
}
