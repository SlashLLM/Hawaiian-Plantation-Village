import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCurriculumModules, fetchHomeEventsSection } from '../lib/content/cmsApi.js';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_PAGE_SECTIONS,
  CAMPS_DATA,
  PHOTOGRAPHS,
  newsArticles,
  careersList,
  CURRICULUM_MODULES,
} from '../lib/content/staticContent.js';
import {
  mapCampStory,
  mapPhotograph,
  mapNewsArticle,
  mapCareer,
  mapCurriculumModule,
  sectionsToMap,
  getSection,
} from '../lib/content/mappers.js';
import { mergeSectionPayload } from '../lib/content/validators.js';
import { cachedFetch } from '../lib/content/cache.js';
import { useAuth } from '../hooks/useAuth.js';
import { supabase } from '../lib/supabase.js';

const ContentContext = createContext(null);

/**
 * Site settings and page copy are static (staticContent.js). Only what the
 * Content CMS tabs manage is loaded from Supabase: the content_entries
 * collections below, curriculum modules, and the home.events section.
 * Event pages (custom_pages) load on their own route.
 */
const COLLECTION_FALLBACKS = {
  camp_story: CAMPS_DATA,
  photograph: PHOTOGRAPHS,
  news: newsArticles,
  career: careersList,
};

/** Identity used to drop static fallbacks the database already provides (photographs have no id). */
const itemKey = (item) => item.id ?? item.arkId ?? item.slug;

const COLLECTION_MAPPERS = {
  camp_story: mapCampStory,
  photograph: mapPhotograph,
  news: mapNewsArticle,
  career: mapCareer,
};

/** Static sections with the CMS-managed home.events row merged over its default. */
function withHomeEvents(eventsRow) {
  const remote = sectionsToMap(eventsRow ? [eventsRow] : []).home?.events;
  if (!remote) return DEFAULT_PAGE_SECTIONS;
  return {
    ...DEFAULT_PAGE_SECTIONS,
    home: {
      ...DEFAULT_PAGE_SECTIONS.home,
      events: mergeSectionPayload(DEFAULT_PAGE_SECTIONS.home?.events ?? {}, remote),
    },
  };
}

export function ContentProvider({ children }) {
  const { isStaff } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionsMap, setSectionsMap] = useState(DEFAULT_PAGE_SECTIONS);
  const [collections, setCollections] = useState({});
  const [curriculum, setCurriculum] = useState(CURRICULUM_MODULES);

  const preview = isStaff;

  const loadGlobal = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const previewKey = preview ? ':preview' : '';
      const [eventsRow, curriculumRows] = await Promise.all([
        cachedFetch(`home-events${previewKey}`, () => fetchHomeEventsSection({ preview })),
        cachedFetch('curriculum', () => fetchCurriculumModules().catch(() => [])),
      ]);

      setSectionsMap(withHomeEvents(eventsRow));

      if (curriculumRows?.length) {
        setCurriculum(curriculumRows.map((m) => mapCurriculumModule(m, m.curriculum_checkpoints)));
      } else {
        setCurriculum(CURRICULUM_MODULES);
      }

      const types = Object.keys(COLLECTION_FALLBACKS);
      const collectionResults = await Promise.all(
        types.map(async (type) => {
          const rows = await cachedFetch(`collection:${type}${previewKey}`, async () => {
            if (!supabase) return [];
            let query = supabase
              .from('content_entries')
              .select('*')
              .eq('content_type', type)
              .order('sort_order');
            if (type === 'camp_story') {
              query = query.or('page_key.eq.stories,page_key.is.null');
            }
            if (!preview) query = query.eq('status', 'published');
            const { data, error: cErr } = await query;
            if (cErr) throw cErr;
            return data ?? [];
          });
          const mapper = COLLECTION_MAPPERS[type];
          const dbItems = rows?.length ? rows.map(mapper) : [];
          const fallbackItems = COLLECTION_FALLBACKS[type] || [];
          const dbKeys = new Set(dbItems.map(itemKey).filter(Boolean));
          const mapped = [
            ...dbItems,
            ...fallbackItems.filter((item) => !itemKey(item) || !dbKeys.has(itemKey(item))),
          ];
          return [type, mapped];
        }),
      );
      setCollections(Object.fromEntries(collectionResults));
    } catch (err) {
      console.error('CMS load failed, using fallbacks', err);
      setError(err.message);
      setSectionsMap(DEFAULT_PAGE_SECTIONS);
      setCollections(COLLECTION_FALLBACKS);
      setCurriculum(CURRICULUM_MODULES);
    } finally {
      setLoading(false);
    }
  }, [preview]);

  useEffect(() => {
    loadGlobal();
  }, [loadGlobal]);

  useEffect(() => {
    function handleCmsUpdated() {
      loadGlobal();
    }
    window.addEventListener('hpv:cms-updated', handleCmsUpdated);
    return () => window.removeEventListener('hpv:cms-updated', handleCmsUpdated);
  }, [loadGlobal]);

  const value = useMemo(() => ({
    loading,
    error,
    preview,
    settings: DEFAULT_SITE_SETTINGS,
    sectionsMap,
    collections,
    curriculum,
    reload: loadGlobal,
    getSection: (pageKey, sectionKey, fallback = {}) =>
      getSection(sectionsMap, pageKey, sectionKey, fallback),
    getCollection: (type) => collections[type] ?? COLLECTION_FALLBACKS[type] ?? [],
  }), [loading, error, preview, sectionsMap, collections, curriculum, loadGlobal]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}

export function useSiteSettings() {
  const { settings, loading } = useContent();
  return { settings, loading };
}

export function usePageSection(pageKey, sectionKey, fallback = {}) {
  const { getSection, loading } = useContent();
  return { section: getSection(pageKey, sectionKey, fallback), loading };
}

/** Items from a page section payload list field (default path: `items`). */
export function usePageListSection(pageKey, sectionKey, listPath = 'items', fallbackItems) {
  const { section, loading } = usePageSection(pageKey, sectionKey, {});
  const defaultItems = DEFAULT_PAGE_SECTIONS[pageKey]?.[sectionKey]?.[listPath];
  const resolvedFallback = fallbackItems ?? (Array.isArray(defaultItems) ? defaultItems : []);
  const items = Array.isArray(section?.[listPath]) && section[listPath].length
    ? section[listPath]
    : resolvedFallback;
  return { items, section, loading };
}

export function useContentCollection(type) {
  const { getCollection, loading } = useContent();
  return { items: getCollection(type), loading };
}

export function useCurriculumModules() {
  const { curriculum, loading } = useContent();
  return { modules: curriculum, loading };
}
