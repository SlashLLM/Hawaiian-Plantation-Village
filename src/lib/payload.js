const BASE = import.meta.env.VITE_PAYLOAD_URL || ''

function buildQuery(params = {}) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      search.set(key, String(value))
    }
  }
  return search.toString()
}

export function isPayloadConfigured() {
  return Boolean(BASE)
}

export async function fetchCollection(slug, query = {}) {
  if (!BASE) {
    throw new Error('VITE_PAYLOAD_URL is not configured')
  }

  const qs = buildQuery({ depth: '1', ...query })
  const res = await fetch(`${BASE}/api/${slug}?${qs}`)

  if (!res.ok) {
    throw new Error(`Payload fetch failed for ${slug}: ${res.status}`)
  }

  return res.json()
}

export async function fetchGlobal(slug, query = {}) {
  if (!BASE) {
    throw new Error('VITE_PAYLOAD_URL is not configured')
  }

  const qs = buildQuery({ depth: '1', ...query })
  const res = await fetch(`${BASE}/api/globals/${slug}?${qs}`)

  if (!res.ok) {
    throw new Error(`Payload fetch failed for global ${slug}: ${res.status}`)
  }

  return res.json()
}

export function getMediaUrl(media, fallback = '') {
  if (!media) return fallback
  if (typeof media === 'string') return media
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${BASE}${media.url}`
  }
  return fallback
}

export function mapEvent(doc) {
  return {
    id: doc.id,
    date: doc.displayDate || formatEventDate(doc.eventDate),
    title: doc.title,
    time: doc.time,
    desc: doc.description,
  }
}

export function mapNewsArticle(doc, index) {
  return {
    id: doc.id ?? index + 1,
    title: doc.title,
    date: formatNewsDate(doc.publishedDate),
    category: doc.category,
    summary: doc.summary,
    content: doc.content,
    image: getMediaUrl(doc.featuredImage, doc.externalImageUrl || ''),
  }
}

export function mapStory(doc) {
  return {
    id: doc.slug,
    culture: doc.culture,
    title: doc.title,
    arrival: doc.arrivalYear,
    shortDesc: doc.shortDesc,
    fullHistory: doc.fullHistory,
    oralHistory: doc.oralHistory,
  }
}

function formatEventDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    .toUpperCase()
}

function formatNewsDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
