// Lets the site be served from a sub-path (e.g. a GitHub Pages project site at
// /project-opruimen/). Pages and content use root-relative links ("/about/"),
// so after the build this prefixes every root-relative href/src/data-large and
// redirect target in the generated HTML with the base path. Does nothing when
// no base path is set, which is the case for the live site.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

export default function baseLinks(base) {
  const prefix = (base ?? '').replace(/\/+$/, ''); // "/project-opruimen" or ""
  return {
    name: 'base-links',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (!prefix) return;
        const already = prefix.slice(1) + '/';
        // attribute="/path" (not "//host", not already prefixed), and meta refresh url=/path
        const attr = new RegExp(`(\\s(?:href|src|data-large)=["'])/(?!/)(?!${already})`, 'g');
        const refresh = new RegExp(`(content=["']\\d+;\\s*url=)/(?!/)(?!${already})`, 'gi');
        let files = 0;
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          const out = html.replace(attr, `$1${prefix}/`).replace(refresh, `$1${prefix}/`);
          if (out !== html) { await writeFile(file, out); files++; }
        }
        logger.info(`prefixed root-relative links with ${prefix} in ${files} files`);
      },
    },
  };
}
