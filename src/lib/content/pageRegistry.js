import { PAGE_KEYS, PAGE_LABELS } from './sectionKeys.js';

/**
 * Page-wise CMS registry: which admin panels appear for each page.
 * Sections come from SECTION_REGISTRY (sectionKeys.js / DEFAULT_PAGE_SECTIONS).
 *
 * Extra panels:
 * - catalog: group tickets + tour slots (Visit)
 * - campStories: addable camp_story entries (Stories)
 * - curriculum: lesson modules (Learn)
 */

export const PAGE_EXTRA_PANELS = {
  visit: ['catalog'],
  stories: ['campStories'],
  learn: ['curriculum'],
};

export function getPageExtraPanels(pageKey) {
  return PAGE_EXTRA_PANELS[pageKey] ?? [];
}

export function getCmsPageChoices() {
  return PAGE_KEYS.map((key) => ({
    key,
    label: PAGE_LABELS[key] ?? key,
    extras: getPageExtraPanels(key),
  }));
}

export { PAGE_KEYS, PAGE_LABELS };
