import { SITE, isAvailable } from '../config'

/* Recognisable App Store / Google Play badges (SVG, dark "pill" style). */

function AppStoreBadge() {
  return (
    <svg viewBox="0 0 120 40" width="138" height="46" role="img" aria-label="Download on the App Store">
      <rect x="0.5" y="0.5" width="119" height="39" rx="7" fill="#000" stroke="rgba(255,255,255,0.28)" />
      <path fill="#fff" transform="translate(12 8.5) scale(1.05)"
        d="M13.62 9.04c-.02-2.06 1.68-3.05 1.76-3.1-.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.48.75-3.12.75-.64 0-1.64-.73-2.7-.71-1.39.02-2.67.81-3.38 2.05-1.44 2.5-.37 6.2 1.04 8.23.69.99 1.51 2.1 2.58 2.06 1.04-.04 1.43-.67 2.68-.67 1.25 0 1.6.67 2.7.65 1.11-.02 1.82-1.01 2.5-2 .79-1.15 1.11-2.26 1.13-2.32-.02-.01-2.17-.83-2.19-3.29zM11.57 3.3c.57-.69.95-1.65.85-2.6-.82.03-1.81.55-2.39 1.24-.52.6-.98 1.58-.86 2.51.91.07 1.84-.46 2.4-1.15z" />
      <text x="40" y="16" fill="#fff" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontSize="7">Download on the</text>
      <text x="39" y="30" fill="#fff" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontSize="15.5" fontWeight="600" letterSpacing="-0.3">App Store</text>
    </svg>
  )
}

function GooglePlayBadge() {
  return (
    <svg viewBox="0 0 135 40" width="155" height="46" role="img" aria-label="Get it on Google Play">
      <rect x="0.5" y="0.5" width="134" height="39" rx="7" fill="#000" stroke="rgba(255,255,255,0.28)" />
      <g transform="translate(12 11) scale(0.95)">
        <path fill="#00D3FF" d="M.7.3C.5.5.4.8.4 1.2v13.6c0 .4.1.7.3.9l.05.05L8.4 8.05v-.1L.75.25z" />
        <path fill="#FFCE00" d="M11 10.6 8.4 8.05v-.1L11 5.4l.06.03 3.06 1.74c.87.5.87 1.31 0 1.81L11.06 10.7z" />
        <path fill="#FF3B44" d="M11.06 10.57 8.4 7.95.7 15.7c.29.3.76.34 1.29.04l9.08-5.17" />
        <path fill="#00E676" d="M11.06 5.43 2.0.26C1.46-.04.99 0 .7.3L8.4 7.95z" />
      </g>
      <text x="42" y="16" fill="#fff" fontFamily="Roboto, Arial, sans-serif" fontSize="6.5" letterSpacing="0.6">GET IT ON</text>
      <text x="41" y="30" fill="#fff" fontFamily="Roboto, Arial, sans-serif" fontSize="15" fontWeight="500" letterSpacing="-0.2">Google Play</text>
    </svg>
  )
}

export default function StoreBadges() {
  const ios = isAvailable(SITE.download.ios)
  const android = isAvailable(SITE.download.android)
  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
      {ios && (
        <a href={SITE.download.ios} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0, borderRadius: 8 }}>
          <AppStoreBadge />
        </a>
      )}
      {android && (
        <a href={SITE.download.android} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0, borderRadius: 8 }}>
          <GooglePlayBadge />
        </a>
      )}
    </div>
  )
}
