export const ROUTES = {
  home: '/',
  visit: '/visit',
  explore: '/explore',
  exploreCulture: '/explore/:cultureId',
  stories: '/stories',
  archives: '/archives',
  archivePhoto: '/archives/:arkId',
  play: '/play',
  learn: '/learn',
  learnModule: '/learn/:moduleId',
  events: '/events',
  support: '/support',
  volunteer: '/volunteer',
  about: '/about',
  tickets: '/tickets',
  giveAloha: '/give-aloha',
  admin: '/admin',
  adminLogin: '/admin/login',
};

export const PAGE_IDS = {
  '/': 'home',
  '/visit': 'visit',
  '/explore': 'explore',
  '/stories': 'stories',
  '/archives': 'archives',
  '/play': 'play',
  '/learn': 'learn',
  '/events': 'events',
  '/support': 'support',
  '/volunteer': 'volunteer',
  '/about': 'about',
  '/tickets': 'tickets',
  '/give-aloha': 'give-aloha',
};

export function pageIdFromPath(pathname) {
  if (pathname.startsWith('/learn/')) return 'learn';
  if (pathname.startsWith('/archives/')) return 'archives';
  if (pathname.startsWith('/explore/')) return 'explore';
  if (pathname.startsWith('/admin')) return 'admin';
  return PAGE_IDS[pathname] ?? 'home';
}

export function pathFromPageId(pageId, params = {}) {
  switch (pageId) {
    case 'home': return '/';
    case 'visit': return '/visit';
    case 'explore': return '/explore';
    case 'explore-culture': return `/explore/${params.cultureId ?? ''}`;
    case 'stories': return '/stories';
    case 'archives': return '/archives';
    case 'archive-photo': return `/archives/${params.arkId ?? ''}`;
    case 'play': return '/play';
    case 'learn': return '/learn';
    case 'learn-module': return `/learn/${params.moduleId ?? ''}`;
    case 'events': return '/events';
    case 'support': return '/support';
    case 'volunteer': return '/volunteer';
    case 'about': return '/about';
    case 'tickets': return '/tickets';
    case 'give-aloha': return '/give-aloha';
    case 'admin': return '/admin';
    default: return '/';
  }
}
