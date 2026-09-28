/* One-off asset generator (run with: npm run assets).
   Produces favicons, PWA icons, AVIF/WebP hero images and the download QR.
   Requires sharp + qrcode.

   Every brand icon is drawn from ONE master, public/brand/mark.png: the
   Secretly glyph (speech bubble + fingerprint "S") in white on transparent,
   cropped to the glyph. The site itself shows it as a CSS mask
   (src/components/LogoMark.tsx), so its colour follows the theme; the
   favicons and app icons below put it on the app's black plate.

   The master is cut from the app's 1024 icon (white glyph on a black plate),
   apps/flutter/secretly_app/ios/Runner/Assets.xcassets/AppIcon.appiconset/
   Icon-App-1024x1024@1x.png in the app repo:
     node scripts/gen-assets.cjs --mark <path to that PNG>
   Brightness becomes alpha. Levels 40→215 drop the faint halo of the (2x
   upscaled) source and keep the stroke weight: the 50 % point stays at mid-grey. */
const sharp = require('sharp')
const QRCode = require('qrcode')

const MARK = 'public/brand/mark.png'
const MARK_SIDE = 768   // master canvas; the glyph keeps its native size inside it
const PLATE = '#000000' // plate colour of the app icon (iOS, macOS, Android launcher)
const GLYPH = 0.70      // glyph size on the plate, as on the app icons

/* ── Master: app icon (white on black) → white glyph on transparent ── */
async function cutMark(src) {
  const LO = 40, HI = 215
  const { data, info } = await sharp(src).removeAlpha().greyscale().raw()
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const alpha = Buffer.alloc(w * h)
  let x0 = w, y0 = h, x1 = -1, y1 = -1
  for (let i = 0; i < w * h; i++) {
    const a = Math.round(Math.min(255, Math.max(0, ((data[i] - LO) * 255) / (HI - LO))))
    alpha[i] = a
    if (a) {
      const x = i % w, y = (i - x) / w
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
  if (x1 < 0) throw new Error(`${src}: no glyph found (expected white on black)`)
  const gw = x1 - x0 + 1, gh = y1 - y0 + 1

  // grey (always white) + alpha, cropped to the glyph
  const ga = Buffer.alloc(gw * gh * 2)
  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      const o = (y * gw + x) * 2
      ga[o] = 255
      ga[o + 1] = alpha[(y0 + y) * w + (x0 + x)]
    }
  }
  let glyph = sharp(ga, { raw: { width: gw, height: gh, channels: 2 } })
  let [cw, ch] = [gw, gh]
  const fit = Math.round(MARK_SIDE * 0.96) // ≥ 2 % padding per side
  if (Math.max(gw, gh) > fit) {           // bigger source: scale down to fit
    const k = fit / Math.max(gw, gh)
    ;[cw, ch] = [Math.round(gw * k), Math.round(gh * k)]
    glyph = sharp(await glyph.resize(cw, ch).png().toBuffer())
  }
  const left = Math.floor((MARK_SIDE - cw) / 2), top = Math.floor((MARK_SIDE - ch) / 2)
  await glyph
    .extend({
      left, right: MARK_SIDE - cw - left, top, bottom: MARK_SIDE - ch - top,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    // white + at most 256 alpha levels: the palette PNG is lossless here and ~30 % smaller
    .png({ compressionLevel: 9, palette: true, effort: 10, dither: 0 })
    .toFile(MARK)
  console.log(`${MARK}: ${MARK_SIDE}px, glyph ${cw}x${ch}`)
}

/* ── Icons from the master ── */

// Glyph trimmed to its bounds, fitted into a box×box square.
const glyph = (box) =>
  sharp(MARK).trim().resize(box, box, { fit: 'inside' }).png().toBuffer()

// Largest distance from the glyph's centre to any of its pixels, as a share of
// its longer side — the bubble's tail sticks out furthest. For the maskable safe zone.
async function glyphReach() {
  const { data, info } = await sharp(MARK).trim().extractChannel('alpha').raw()
    .toBuffer({ resolveWithObject: true })
  const cx = (info.width - 1) / 2, cy = (info.height - 1) / 2
  let r = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[y * info.width + x] > 8) r = Math.max(r, Math.hypot(x - cx, y - cy))
    }
  }
  return r / Math.max(info.width, info.height)
}

// Superellipse |x|^5 + |y|^5 = 1 — close to the continuous-corner outline of
// the iOS / macOS app icon.
function squircle(s, n = 5, steps = 720) {
  const r = s / 2, pts = []
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * 2 * Math.PI, c = Math.cos(t), si = Math.sin(t)
    pts.push(`${(r + r * Math.sign(c) * Math.abs(c) ** (2 / n)).toFixed(2)},` +
             `${(r + r * Math.sign(si) * Math.abs(si) ** (2 / n)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
}

// Black plate + white glyph. shape 'round' = squircle with transparent corners;
// 'square' = full bleed, for platforms that cut their own shape (iOS, maskable).
// Drawn at 1024 and scaled down once.
async function tile(size, out, { shape = 'round', glyphShare = GLYPH } = {}) {
  const S = 1024
  const plate = shape === 'square'
    ? `<rect width="${S}" height="${S}" fill="${PLATE}"/>`
    : `<path d="${squircle(S)}" fill="${PLATE}"/>`
  const big = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">${plate}</svg>`))
    .composite([{ input: await glyph(Math.round(S * glyphShare)), gravity: 'center' }])
    .png().toBuffer()
  let img = sharp(big).resize(size, size)
  if (shape === 'square') img = img.removeAlpha() // opaque: nothing to see through
  await img.png({ compressionLevel: 9 }).toFile(out)
}

// Adaptive favicon for browsers that take SVG: the glyph alone, black on a
// light tab strip, white on a dark one. The shape is an embedded PNG used as a
// mask (white = keep), so one small file serves both schemes.
async function faviconSvg(out) {
  const V = 128
  const alpha = await sharp(await glyph(V)).resize(V, V, {
    fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 },
  }).extractChannel('alpha').raw().toBuffer()
  const png = await sharp({ create: { width: V, height: V, channels: 3, background: '#ffffff' } })
    .joinChannel(alpha, { raw: { width: V, height: V, channels: 1 } })
    .png({ compressionLevel: 9, palette: true, effort: 10, dither: 0 }).toBuffer()
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${V} ${V}">` +
    `<style>rect{fill:#000}@media (prefers-color-scheme:dark){rect{fill:#fff}}</style>` +
    `<mask id="m"><image width="${V}" height="${V}" href="data:image/png;base64,${png.toString('base64')}"/></mask>` +
    `<rect width="${V}" height="${V}" mask="url(#m)"/></svg>\n`
  require('fs').writeFileSync(out, svg)
}

;(async () => {
  const i = process.argv.indexOf('--mark')
  if (i > 0) await cutMark(process.argv[i + 1])

  // Favicons: rounded plate, transparent corners; the glyph a bit larger than
  // on the app icon so it still reads at 16 px. Plus an adaptive SVG (glyph only).
  await tile(16, 'public/favicon-16.png', { glyphShare: 0.76 })
  await tile(32, 'public/favicon-32.png', { glyphShare: 0.76 })
  await faviconSvg('public/favicon.svg')
  // Apple touch icon — full bleed, iOS rounds the corners itself
  await tile(180, 'public/apple-touch-icon.png', { shape: 'square' })
  // PWA icons ("any") — rounded plate, transparent corners
  await tile(192, 'public/icon-192.png')
  await tile(512, 'public/icon-512.png')
  // Maskable — full bleed; the whole glyph inside the safe circle (r = 40 %)
  const reach = await glyphReach()
  await tile(512, 'public/icon-maskable-512.png', {
    shape: 'square', glyphShare: (0.40 * 0.96) / reach,
  })

  // Hero images → AVIF (new) + re-encoded smaller WebP (overwrite)
  for (const name of ['Chat', 'ChatGPT']) {
    const fallback = `public/${name}-fallback.png`
    await sharp(fallback).avif({ quality: 55, effort: 4 }).toFile(`public/${name}.avif`)
    await sharp(fallback).webp({ quality: 72 }).toFile(`public/${name}.webp`)
  }

  // Download QR (scan → /download)
  await QRCode.toFile('public/qr-download.png', 'https://www.secretlyapp.com/download', {
    width: 360, margin: 1, errorCorrectionLevel: 'M',
    color: { dark: '#0b1120ff', light: '#ffffffff' },
  })

  console.log('assets generated')
})().catch((e) => { console.error(e); process.exit(1) })
