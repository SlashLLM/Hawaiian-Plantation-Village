import '@testing-library/jest-dom/vitest';

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one.
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}
