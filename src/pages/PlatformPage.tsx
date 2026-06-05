import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { SITE, isAvailable } from '../config'

interface PlatformPageProps {
  platform: 'android' | 'ios' | 'desktop'
}

const CONFIG = {
  android: {
    kicker:   'Download',
    title:    'Secretly for Android',
    sub:      'Stay invisible. No phone number, no email — just a randomly generated Secretly ID for total anonymity.',
    icon:     '/icons/android.png',
    ctaLabel: 'Download for Android',
    ctaHref:  SITE.download.android,
    note:     'Or visit secretlyapp.com/download from your phone.',
    storeLabel: 'Available on Google Play',
  },
  ios: {
    kicker:   'Download',
    title:    'Secretly for iPhone & iPad',
    sub:      'Stay invisible. No phone number, no email — just a randomly generated Secretly ID for total anonymity.',
    icon:     '/icons/phone.png',
    ctaLabel: 'Download for iPhone or iPad',
    ctaHref:  SITE.download.ios,
    note:     'Or visit secretlyapp.com/download from your phone.',
    storeLabel: 'Available on the App Store',
  },
  desktop: {
    kicker:   'Download',
    title:    'Secretly for Desktop',
    sub:      'Stay invisible. No phone number, no email — just a randomly generated Secretly ID for total anonymity.',
    icon:     '/icons/monitor.png',
    ctaLabel: 'Download for Windows',
    ctaHref:  SITE.download.windows,
    note:     'To use the desktop app, Secretly must first be installed on your phone.',
    storeLabel: 'Windows & macOS',
  },
}

export default function PlatformPage({ platform }: PlatformPageProps) {
  const cfg = CONFIG[platform]
  const ref = useReveal()
  const available = isAvailable(cfg.ctaHref)
  const macAvailable = isAvailable(SITE.download.macos)

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{cfg.kicker}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{cfg.title}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{cfg.sub}</p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div
            className="reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 32,
              maxWidth: 560,
            }}>
            <div style={{
              width: 96,
              height: 96,
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src={cfg.icon} alt={cfg.title} style={{ width: 52, height: 52, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
            </div>

            <div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                {cfg.storeLabel}
              </p>
              {available ? (
                <a
                  href={cfg.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                >
                  {cfg.ctaLabel}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </a>
              ) : (
                <span className="btn btn--primary btn--large" aria-disabled="true"
                      style={{ opacity: 0.55, pointerEvents: 'none', cursor: 'default' }}>
                  Coming soon
                </span>
              )}
              {platform === 'desktop' && (
                macAvailable ? (
                  <a href={SITE.download.macos} target="_blank" rel="noopener noreferrer"
                     className="btn btn--ghost btn--large" style={{ marginLeft: 12 }}>
                    Download for macOS
                  </a>
                ) : (
                  <span className="btn btn--ghost btn--large" aria-disabled="true"
                        style={{ marginLeft: 12, opacity: 0.55, pointerEvents: 'none', cursor: 'default' }}>
                    macOS — coming soon
                  </span>
                )
              )}
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{cfg.note}</p>
          </div>

          {/* App preview */}
          <div className="reveal reveal-delay-2" style={{
            marginTop: 64,
            padding: 48,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <picture>
              <source srcSet="/Chat.webp" type="image/webp" />
              <img src="/Chat-fallback.png" alt={`${cfg.title} preview`}
                   style={{ maxWidth: '100%', maxHeight: 360, height: 'auto', objectFit: 'contain' }}
                   draggable={false} loading="lazy" />
            </picture>
          </div>

          <div className="reveal reveal-delay-3" style={{ marginTop: 48 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Looking for another platform?
            </p>
            <Link to="/download" className="btn btn--ghost">
              View all downloads →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
