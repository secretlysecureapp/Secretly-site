/* One-off asset generator (run with: node scripts/gen-assets.cjs).
   Produces favicons, PWA icons, AVIF/WebP hero images and the download QR
   from public/logo.png + the hero fallbacks. Requires sharp + qrcode. */
const sharp = require('sharp')
const QRCode = require('qrcode')

const SRC = 'public/logo.png'
const BG = { r: 6, g: 10, b: 18, alpha: 1 } // #060a12
const T = { r: 0, g: 0, b: 0, alpha: 0 }     // transparent

async function icon(size, out, { bg = null, pad = 0 } = {}) {
  const inner = size - pad * 2
  let img = sharp(SRC).resize(inner, inner, { fit: 'contain', background: T })
  if (pad > 0) img = img.extend({ top: pad, bottom: pad, left: pad, right: pad, background: bg || T })
  await img.png().toFile(out)
}

;(async () => {
  // Favicons (transparent)
  await icon(16, 'public/favicon-16.png')
  await icon(32, 'public/favicon-32.png')
  // Apple touch icon — opaque background (iOS shows it on the home screen)
  await icon(180, 'public/apple-touch-icon.png', { bg: BG, pad: 12 })
  // PWA icons
  await icon(192, 'public/icon-192.png', { bg: BG, pad: 14 })
  await icon(512, 'public/icon-512.png', { bg: BG, pad: 36 })
  // Maskable (≈30% safe-zone padding, opaque)
  await icon(512, 'public/icon-maskable-512.png', { bg: BG, pad: 78 })

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
