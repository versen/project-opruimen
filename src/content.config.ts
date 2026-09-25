import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
  }),
});

const person = z.object({
  name: z.string(),
  role: z.string().optional(),
  org: z.string().optional(),
  href: z.string().optional(),
  email: z.string().optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Working-group pages: listed on /working-groups/, archived ones separately.
    group: z.boolean().default(false),
    archived: z.boolean().default(false),
    order: z.number().default(0),
    // Current members (chairs are recognized by their role) and former members.
    members: z.array(person).default([]),
    former: z.array(person).default([]),
  }),
});

export const collections = { news, pages };
