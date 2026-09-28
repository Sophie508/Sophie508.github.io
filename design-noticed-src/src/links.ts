const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const href = (path = '/') => `${base}${path}`;

export const pages = [
  { name: 'Proximity', path: '/proximity/', phrase: 'things belong together' },
  { name: 'Alignment', path: '/alignment/', phrase: 'things belong somewhere' },
  { name: 'Repetition', path: '/repetition/', phrase: 'things belong to a system' },
  { name: 'Contrast', path: '/contrast/', phrase: 'things deserve different attention' },
];

export const sightingsPage = {
  name: 'Sightings',
  path: '/sightings/',
  phrase: 'things I found out there',
};

export const sightingPath = (id: string) => `/sightings/${id}/`;
