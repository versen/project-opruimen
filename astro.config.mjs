// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import baseLinks from './src/integrations/base-links.mjs';
import pageRedirects from './src/data/redirects.json' with { type: 'json' };
import newsRedirects from './src/data/news-redirects.json' with { type: 'json' };

// Every URL of the Jekyll site keeps working: pages map to their new home,
// /news_items/<slug>/ maps to /news/<date-slug>/.
// BASE_PATH is set only for builds served from a sub-path (the preview repo).
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site: 'https://www.versen.nl',
  base,
  trailingSlash: 'ignore',
  // Fixed port, off the default 4321 that Quarto previews also use.
  server: { port: 4380 },
  integrations: [mdx(), baseLinks(base)],
  redirects: { ...pageRedirects, ...newsRedirects },
});
