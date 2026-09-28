const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const href = (path = '/') => `${base}${path}`;

export const pages = [
  { name: 'Proximity', path: '/proximity/', phrase: 'things belong together', live: true },
  { name: 'Alignment', path: '/alignment/', phrase: 'things belong somewhere', live: false },
  { name: 'Repetition', path: '/repetition/', phrase: 'things belong to a system', live: false },
  {
    name: 'Contrast',
    path: '/contrast/',
    phrase: 'things deserve different attention',
    live: false,
  },
];

export const sightingsPage = { name: 'Sightings', path: '/sightings/', live: false };
