/* Prerender smoke test — asserts the built dist/ is healthy.
   Runs in CI after the build (npm run test:smoke). Dependency-free:
   it inspects the actual shipped HTML, which is what crawlers see. */
import { readFileSync, existsSync } from 'node:fs'

const DIST = 'dist'
let failures = 0
const fail = (m) => { console.error('  ✗ ' + m); failures++ }
const ok = (m) => console.log('  ✓ ' + m)
const fileFor = (r) => (r === '/' ? `${DIST}/index.html` : `${DIST}${r}/index.html`)

/* 1. Core pages must exist with valid, unique-looking head + real body. */
const required = [
  '/', '/download', '/security', '/pricing', '/features', '/compare',
  '/teams', '/help', '/blog', '/blog/how-encryption-works',
  '/privacy-policy', '/terms-of-service',
]
console.log('Pages:')
for (const r of required) {
  const f = fileFor(r)
  if (!existsSync(f)) { fail(`missing ${f}`); continue }
  const html = readFileSync(f, 'utf8')
  let bad = false
  if (!/<title[^>]*>[^<]{5,}<\/title>/.test(html)) { fail(`${r}: missing/empty <title>`); bad = true }
  if (!html.includes('rel="canonical"')) { fail(`${r}: missing canonical`); bad = true }
  if (html.length < 2000) { fail(`${r}: suspiciously small (${html.length}b)`); bad = true }
  if (/>\s*(undefined|NaN|\[object Object\])\s*</.test(html)) { fail(`${r}: leaked undefined/NaN`); bad = true }
  if (!bad) ok(`${r} (${Math.round(html.length / 1024)}kb)`)
}

/* 2. Structured data + trust files. */
console.log('Markers:')
const checks = [
  [`${DIST}/help/index.html`, 'FAQPage', 'FAQ schema on /help'],
  [`${DIST}/teams/index.html`, 'FAQPage', 'FAQ schema on /teams'],
  [`${DIST}/blog/how-encryption-works/index.html`, 'BlogPosting', 'Article schema on blog post'],
  [`${DIST}/index.html`, 'SoftwareApplication', 'SoftwareApplication schema on home'],
  [`${DIST}/.well-known/security.txt`, 'security@secretlyapp.com', 'security.txt contact'],
  [`${DIST}/sitemap.xml`, '/blog/how-encryption-works', 'sitemap includes blog posts'],
  [`${DIST}/manifest.json`, 'icon-512.png', 'manifest references PWA icon'],
  [`${DIST}/pricing/index.html`, '14.99', 'pricing shows correct annual price'],
]
for (const [f, needle, label] of checks) {
  if (existsSync(f) && readFileSync(f, 'utf8').includes(needle)) ok(label)
  else fail(`${label} (looked for "${needle}" in ${f})`)
}

/* 3. No stale price / dead asset regressions. */
console.log('Regressions:')
const home = existsSync(fileFor('/')) ? readFileSync(fileFor('/'), 'utf8') : ''
if (home.includes('logo.png" sizes')) fail('home still uses oversized logo.png favicon')
else ok('favicon migrated off logo.png')

console.log(failures === 0 ? '\nSMOKE PASSED ✓' : `\nSMOKE FAILED ✗ (${failures} issue${failures === 1 ? '' : 's'})`)
process.exit(failures ? 1 : 0)
