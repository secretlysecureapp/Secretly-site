/* Build-time sitemap generator. Scans dist/ for every pre-rendered
   index.html and emits dist/sitemap.xml — so new pages and blog posts
   are always included automatically (no manual drift).
   Runs as the `postbuild` npm script. */
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ORIGIN = 'https://www.secretlyapp.com'
const DIST = 'dist'

if (!existsSync(DIST)) {
  console.error('[sitemap] dist/ not found — run the build first')
  process.exit(1)
}

function findRoutes(dir, prefix = '') {
  const routes = []
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      routes.push(...findRoutes(full, `${prefix}/${name}`))
    } else if (name === 'index.html') {
      routes.push(prefix === '' ? '/' : prefix)
    }
  }
  return routes
}

function meta(route) {
  if (route === '/') return { changefreq: 'weekly', priority: '1.0' }
  if (route === '/blog' || route.startsWith('/blog/')) return { changefreq: 'weekly', priority: '0.7' }
  if (['/privacy-policy', '/terms-of-service', '/delete-account', '/contact', '/donate'].includes(route))
    return { changefreq: 'yearly', priority: '0.4' }
  return { changefreq: 'monthly', priority: '0.8' }
}

const today = new Date().toISOString().slice(0, 10)
const routes = findRoutes(DIST)
  .filter((r) => !r.includes('*'))
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))

const body = routes
  .map((r) => {
    const { changefreq, priority } = meta(r)
    const loc = r === '/' ? `${ORIGIN}/` : `${ORIGIN}${r}`
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generated at build time by scripts/gen-sitemap.mjs -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(join(DIST, 'sitemap.xml'), xml)
console.log(`[sitemap] wrote ${routes.length} URLs to dist/sitemap.xml`)
