import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_UPDATED = '2026-11-26';

export default defineConfig({
  site: 'https://geniopop.com',
  trailingSlash: 'always',
  integrations: [sitemap({
    // hreflang lives in each page's <head>; per-language sitemaps come with the first content pages
    // root redirects to /es/ while only Spanish is live
    filter: (page) => !page.endsWith('/404/') && new URL(page).pathname !== '/',
    serialize: (item) => ({ ...item, lastmod: SITE_UPDATED }),
  })],
  build: { inlineStylesheets: 'always' },
});
