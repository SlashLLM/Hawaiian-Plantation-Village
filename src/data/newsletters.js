/**
 * Newsletter PDFs served from public/newsletters. When a new PDF is dropped
 * into that folder, add an entry here so it appears on /archives/newsletters.
 *
 * `sortKey` is YYYY-MM so issues order chronologically; seasonal issues use
 * the season's first month (Spring 03, Summer 06, Fall 09, Winter 12).
 */
export const NEWSLETTER_CATEGORIES = [
  {
    id: 'monthly',
    name: 'Monthly issues',
    blurb: 'Regular issues with village news, programs, volunteer updates and upcoming events.',
  },
  {
    id: 'seasonal',
    name: 'Seasonal issues',
    blurb: 'Spring, summer, fall and winter editions from the village’s earlier newsletter years.',
  },
  {
    id: 'festival',
    name: 'Holiday & festival editions',
    blurb: 'Special issues for Obon and bon dance, New Year celebrations and the Haunted Plantation.',
  },
];

const file = (name) => `/newsletters/${name}`;

export const NEWSLETTERS = [
  { title: 'April 2025', year: 2025, sortKey: '2025-04', category: 'festival', note: 'With bon dance inserts', href: file('April_2025_Newsletter_bon_dance_inserts_opt.pdf') },
  { title: 'January 2025', year: 2025, sortKey: '2025-01', category: 'monthly', href: file('January_2025_Newsletter_opt.pdf') },
  { title: 'April 2024', year: 2024, sortKey: '2024-04', category: 'festival', note: '34th Annual Obon Celebration', href: file('2024_April_Newsletter_34th_Annual_Obon_Celebration.pdf') },
  { title: 'November 2023', year: 2023, sortKey: '2023-11', category: 'monthly', href: file('2023_November_Newsletter_opt.pdf') },
  { title: 'August 2023', year: 2023, sortKey: '2023-08', category: 'monthly', href: file('August_2023_Newsletter_opt.pdf') },
  { title: 'April 2023', year: 2023, sortKey: '2023-04', category: 'monthly', href: file('HPV_Newsletter_April_2023_opt.pdf') },
  { title: 'January 2023', year: 2023, sortKey: '2023-01', category: 'monthly', href: file('January_2023.pdf') },
  { title: 'November 2022', year: 2022, sortKey: '2022-11', category: 'monthly', href: file('HPV_November_2022_Newsletter_opt.pdf') },
  { title: 'August 2022', year: 2022, sortKey: '2022-08', category: 'monthly', href: file('HPV_Newsletter_August_2022_opt.pdf') },
  { title: 'May 2022', year: 2022, sortKey: '2022-05', category: 'monthly', href: file('HPV_May_2022_Newsletter_opt.pdf') },
  { title: 'March 2022', year: 2022, sortKey: '2022-03', category: 'monthly', note: 'Corrected edition', href: file('HPV_March_2022_corrected_opt.pdf') },
  { title: 'January 2022', year: 2022, sortKey: '2022-01', category: 'monthly', href: file('HPV_January_2022_opt.pdf') },
  { title: 'November 2021', year: 2021, sortKey: '2021-11', category: 'monthly', href: file('Nov_2021_HPV_Newsletter_opt.pdf') },
  { title: 'September 2021', year: 2021, sortKey: '2021-09', category: 'monthly', note: 'Plus recipe entry', href: file('Sept_2021_plus_recipe_entry.pdf') },
  { title: 'June 2021', year: 2021, sortKey: '2021-06', category: 'festival', note: 'Obon edition', href: file('HPV_OBon_6.5.21_Newsletter.pdf') },
  { title: 'November 2020', year: 2020, sortKey: '2020-11', category: 'monthly', href: file('HPV_November2020_opt.pdf') },
  { title: 'June 2020', year: 2020, sortKey: '2020-06', category: 'monthly', href: file('HPV_June2020_opt.pdf') },
  { title: 'January 2017', year: 2017, sortKey: '2017-01', category: 'monthly', href: file('HPV_Jan2017_opt.pdf') },

  { title: 'Fall 2017', year: 2017, sortKey: '2017-09', category: 'seasonal', href: file('HPV_Fall_2017_newsletter_opt.pdf') },
  { title: 'Summer 2017', year: 2017, sortKey: '2017-06', category: 'seasonal', href: file('HPV_Summer2017_opt.pdf') },
  { title: 'Fall 2016', year: 2016, sortKey: '2016-09', category: 'seasonal', href: file('HPV_Fall2016_opt.pdf') },
  { title: 'Summer 2013', year: 2013, sortKey: '2013-06', category: 'seasonal', href: file('Summer_2013_Layout_email.pdf') },
  { title: 'Summer 2012', year: 2012, sortKey: '2012-06', category: 'seasonal', href: file('Summer_2012_Layout_web.pdf') },
  { title: 'Spring 2011', year: 2011, sortKey: '2011-03', category: 'seasonal', href: file('Spring_2011_email.pdf') },
  { title: 'Winter 2010', year: 2010, sortKey: '2010-12', category: 'seasonal', href: file('Layout_2010_Winter_email.pdf') },
  { title: 'Summer 2010', year: 2010, sortKey: '2010-06', category: 'seasonal', href: file('HPV_Summer_2010_email.pdf') },
  { title: 'Spring 2010', year: 2010, sortKey: '2010-03', category: 'seasonal', href: file('HPV_Spring_2010_Newsletter_email.pdf') },
  { title: 'Fall / Winter 2009', year: 2009, sortKey: '2009-09', category: 'seasonal', href: file('HPV_-FALL-WINTER_2009_newsletter_-_final.pdf') },

  { title: 'New Year 2013', year: 2013, sortKey: '2013-01', category: 'festival', href: file('New_Year_2013_copy.pdf') },
  { title: 'New Year 2012', year: 2012, sortKey: '2012-01', category: 'festival', href: file('New_Year_2012_email.pdf') },
  { title: 'Fall 2011', year: 2011, sortKey: '2011-09', category: 'festival', note: 'Haunted Plantation', href: file('Fall_2011_Layout_Haunted_Plantation_email.pdf') },
  { title: 'New Year 2011', year: 2011, sortKey: '2011-01', category: 'festival', href: file('Layout_2011_New_Years_email.pdf') },
];
