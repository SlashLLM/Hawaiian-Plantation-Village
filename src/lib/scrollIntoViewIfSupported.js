/** Scroll element into view when supported (no-op in jsdom). */
export function scrollIntoViewIfSupported(el, options) {
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView(options);
  }
}
