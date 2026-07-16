export const ROUTES = {
  home: '/',
  visit: '/visit',
  stories: '/stories',
  play: '/play',
  learn: '/learn',
  learnModule: '/learn/:moduleId',
  support: '/support',
  about: '/about',
  tickets: '/tickets',
  admin: '/admin',
  adminLogin: '/admin/login',
};

export const PAGE_IDS = {
  '/': 'home',
  '/visit': 'visit',
  '/stories': 'stories',
  '/play': 'play',
  '/learn': 'learn',
  '/support': 'support',
  '/about': 'about',
  '/tickets': 'tickets',
};

export function pageIdFromPath(pathname) {
  if (pathname.startsWith('/learn/')) return 'learn';
  if (pathname.startsWith('/admin')) return 'admin';
  return PAGE_IDS[pathname] ?? 'home';
}

export function pathFromPageId(pageId, params = {}) {
  switch (pageId) {
    case 'home': return '/';
    case 'visit': return '/visit';
    case 'stories': return '/stories';
    case 'play': return '/play';
    case 'learn': return '/learn';
    case 'learn-module': return `/learn/${params.moduleId ?? ''}`;
    case 'support': return '/support';
    case 'about': return '/about';
    case 'tickets': return '/tickets';
    case 'admin': return '/admin';
    default: return '/';
  }
}
