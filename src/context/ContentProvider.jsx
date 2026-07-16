import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchSiteSettings,
  fetchAllPageSections,
  fetchPublishedContent,
  fetchGroupTicketTypes,
  fetchTourTimeSlots,
  fetchCurriculumModules,
} from '../lib/content/cmsApi.js';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_PAGE_SECTIONS,
  newsArticles,
  careersList,
  CAMPS_DATA,
  HOME_EVENTS,
  TESTIMONIALS,
  PARTNERS,
  VISIT_FAQS,
  TIMELINE,
  LEADERSHIP,
  WORKSHOPS,
  CURRICULUM_MODULES,
  GROUP_TICKET_TYPES,
  TOUR_TIME_SLOTS,
} from '../lib/content/fallbacks.js';
import {
  mapNewsArticle,
  mapProgramEvent,
  mapCampStory,
  mapCareer,
  mapFaq,
  mapTestimonial,
  mapTimeline,
  mapLeadership,
  mapWorkshop,
  mapCurriculumModule,
  mapGroupTicketType,
  sectionsToMap,
  getSection,
} from '../lib/content/mappers.js';
import { mergeWithFallback } from '../lib/content/validators.js';
import { cachedFetch } from '../lib/content/cache.js';
import { useAuth } from '../hooks/useAuth.js';
import { supabase } from '../lib/supabase.js';

const ContentContext = createContext(null);

const COLLECTION_FALLBACKS = {
  news: newsArticles,
  program: HOME_EVENTS,
  career: careersList,
  camp_story: CAMPS_DATA,
  faq: VISIT_FAQS,
  testimonial: TESTIMONIALS,
  partner: PARTNERS,
  timeline: TIMELINE,
  leadership: LEADERSHIP,
  workshop: WORKSHOPS,
};

const COLLECTION_MAPPERS = {
  news: mapNewsArticle,
  program: mapProgramEvent,
  career: mapCareer,
  camp_story: mapCampStory,
  faq: mapFaq,
  testimonial: mapTestimonial,
  partner: (row) => ({ name: row.title, slug: row.slug, ...row.metadata }),
  timeline: mapTimeline,
  leadership: mapLeadership,
  workshop: mapWorkshop,
};

export function ContentProvider({ children }) {
  const { isStaff } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [sectionsMap, setSectionsMap] = useState(DEFAULT_PAGE_SECTIONS);
  const [collections, setCollections] = useState({});
  const [groupTickets, setGroupTickets] = useState(GROUP_TICKET_TYPES);
  const [tourSlots, setTourSlots] = useState(TOUR_TIME_SLOTS);
  const [curriculum, setCurriculum] = useState(CURRICULUM_MODULES);

  const preview = isStaff;

  const loadGlobal = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const previewKey = preview ? ':preview' : '';
      const [remoteSettings, sectionRows, groupRows, slotRows, curriculumRows] = await Promise.all([
        cachedFetch(`settings${previewKey}`, () => fetchSiteSettings().catch(() => null)),
        cachedFetch(`sections${previewKey}`, async () => {
          if (!supabase) return [];
          let query = supabase.from('page_sections').select('*').order('sort_order');
          if (!preview) query = query.eq('status', 'published');
          const { data, error: qErr } = await query;
          if (qErr) throw qErr;
          return data ?? [];
        }),
        cachedFetch('group-tickets', () => fetchGroupTicketTypes().catch(() => [])),
        cachedFetch('tour-slots', () => fetchTourTimeSlots().catch(() => [])),
        cachedFetch('curriculum', () => fetchCurriculumModules().catch(() => [])),
      ]);

      setSettings(mergeWithFallback(remoteSettings, DEFAULT_SITE_SETTINGS));

      const remoteSections = sectionsToMap(sectionRows);
      const mergedSections = { ...DEFAULT_PAGE_SECTIONS };
      Object.keys(remoteSections).forEach((pageKey) => {
        mergedSections[pageKey] = {
          ...(DEFAULT_PAGE_SECTIONS[pageKey] ?? {}),
          ...remoteSections[pageKey],
        };
      });
      setSectionsMap(mergedSections);

      setGroupTickets(groupRows?.length ? groupRows.map(mapGroupTicketType) : GROUP_TICKET_TYPES);
      setTourSlots(slotRows?.length ? slotRows.map((s) => s.label) : TOUR_TIME_SLOTS);

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
            let query = supabase.from('content_entries').select('*').eq('content_type', type).order('sort_order');
            if (!preview) query = query.eq('status', 'published');
            const { data, error: cErr } = await query;
            if (cErr) throw cErr;
            return data ?? [];
          });
          const mapper = COLLECTION_MAPPERS[type];
          const mapped = rows?.length ? rows.map(mapper) : COLLECTION_FALLBACKS[type];
          return [type, mapped];
        }),
      );
      setCollections(Object.fromEntries(collectionResults));
    } catch (err) {
      console.error('CMS load failed, using fallbacks', err);
      setError(err.message);
      setSettings(DEFAULT_SITE_SETTINGS);
      setSectionsMap(DEFAULT_PAGE_SECTIONS);
      setCollections(COLLECTION_FALLBACKS);
      setGroupTickets(GROUP_TICKET_TYPES);
      setTourSlots(TOUR_TIME_SLOTS);
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
    settings,
    sectionsMap,
    collections,
    groupTickets,
    tourSlots,
    curriculum,
    reload: loadGlobal,
    getSection: (pageKey, sectionKey, fallback = {}) =>
      getSection(sectionsMap, pageKey, sectionKey, fallback),
    getCollection: (type) => collections[type] ?? COLLECTION_FALLBACKS[type] ?? [],
  }), [loading, error, preview, settings, sectionsMap, collections, groupTickets, tourSlots, curriculum, loadGlobal]);

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

export function useContentCollection(type) {
  const { getCollection, loading } = useContent();
  return { items: getCollection(type), loading };
}

export function useCurriculumModules() {
  const { curriculum, loading } = useContent();
  return { modules: curriculum, loading };
}
