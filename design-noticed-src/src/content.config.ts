import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const principles = z.enum([
  'Proximity',
  'Alignment',
  'Repetition',
  'Contrast',
  'Typography',
  'Color',
  'Hierarchy',
]);

const sightings = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sightings' }),
  schema: ({ image }) =>
    z.object({
      number: z.number().int().positive(),
      title: z.string(),
      context: z.string().optional(),
      principles: z.array(principles).min(1),
      photo: image().optional(),
      sketch: z.string().optional(),
      noticed: z.string().optional(),
      why: z.string().optional(),
      change: z.string().optional(),
      rule: z.string().optional(),
    }),
});

export const collections = { sightings };
