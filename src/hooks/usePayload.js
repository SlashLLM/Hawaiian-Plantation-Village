import { useEffect, useState } from 'react'
import {
  fetchCollection,
  isPayloadConfigured,
  mapEvent,
  mapNewsArticle,
  mapStory,
} from '../lib/payload'
import { fallbackEvents } from '../data/fallback/events'
import { fallbackNews } from '../data/fallback/news'
import { fallbackStories } from '../data/fallback/stories'

function usePayloadData({ slug, query, fallback, mapItem }) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(isPayloadConfigured())
  const [error, setError] = useState(null)
  const queryKey = JSON.stringify(query)

  useEffect(() => {
    if (!isPayloadConfigured()) {
      setData(fallback)
      setLoading(false)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await fetchCollection(slug, query)
        if (cancelled) return

        const docs = result.docs ?? []
        const mapped = docs.map(mapItem)
        setData(mapped.length > 0 ? mapped : fallback)
      } catch (err) {
        if (cancelled) return
        setError(err)
        setData(fallback)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, queryKey])

  return { data, loading, error }
}

export function useEvents() {
  return usePayloadData({
    slug: 'events',
    query: {
      'where[_status][equals]': 'published',
      sort: 'eventDate',
      limit: '20',
    },
    fallback: fallbackEvents,
    mapItem: mapEvent,
  })
}

export function useNews() {
  return usePayloadData({
    slug: 'news',
    query: {
      'where[_status][equals]': 'published',
      sort: '-publishedDate',
      limit: '50',
    },
    fallback: fallbackNews,
    mapItem: mapNewsArticle,
  })
}

export function useImmigrationStories() {
  return usePayloadData({
    slug: 'immigration-stories',
    query: {
      sort: 'sortOrder',
      limit: '50',
    },
    fallback: fallbackStories,
    mapItem: mapStory,
  })
}
