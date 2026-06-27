import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE, isAvailable } from '../config'

interface PlatformPageProps {
  platform: 'android' | 'ios' | 'desktop'
}

/* Non-translatable per-platform data (icon + store destination).
   All copy comes from i18n: t(`platform.${platform}.*`). */
const META = {
  android: { icon: '/icons/android.png', href: SITE.download.android },
  ios:     { icon: '/icons/macos.png',   href: SITE.download.ios     },
  desktop: { icon: '/icons/monitor.png', href: SITE.download.windows },
}

export default function PlatformPage({ platform }: PlatformPageProps) {
  const ref = useReveal()
  const { t } = useTranslation()
  const meta = META[platform]
  const title = t(`platform.${platform}.title`)
  const available = isAvailable(meta.href)
  const macAvailable = isAvailable(SITE.download.macos)

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('platform.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{title}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('platform.sub')}</p>
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
              <img src={meta.icon} alt={title} style={{ width: 52, height: 52, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
            </div>

            <div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                {t(`platform.${platform}.store`)}
              </p>
              {available ? (
                <a
                  href={meta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                >
                  {t(`platform.${platform}.cta`)}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </a>
              ) : (
                <span className="btn btn--primary btn--large" aria-disabled="true"
                      style={{ opacity: 0.55, pointerEvents: 'none', cursor: 'default' }}>
                  {t('platform.comingSoon')}
                </span>
              )}
              {platform === 'desktop' && (
                macAvailable ? (
                  <a href={SITE.download.macos} target="_blank" rel="noopener noreferrer"
                     className="btn btn--ghost btn--large" style={{ marginLeft: 12 }}>
                    {t('platform.macDownload')}
                  </a>
                ) : (
                  <span className="btn btn--ghost btn--large" aria-disabled="true"
                        style={{ marginLeft: 12, opacity: 0.55, pointerEvents: 'none', cursor: 'default' }}>
                    {t('platform.macComingSoon')}
                  </span>
                )
              )}
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{t(`platform.${platform}.note`)}</p>
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
              <source srcSet="/Chat.avif" type="image/avif" />
              <source srcSet="/Chat.webp" type="image/webp" />
              <img src="/Chat-fallback.png" alt={`${title} preview`}
                   width={1200} height={675}
                   style={{ maxWidth: '100%', maxHeight: 360, height: 'auto', objectFit: 'contain' }}
                   draggable={false} loading="lazy" />
            </picture>
          </div>

          <div className="reveal reveal-delay-3" style={{ marginTop: 48 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              {t('platform.anotherPlatform')}
            </p>
            <Link to="/download" className="btn btn--ghost">
              {t('platform.viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
