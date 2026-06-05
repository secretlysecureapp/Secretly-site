import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE, isAvailable } from '../config'

const PLATFORMS = [
  { name: 'Android',       sub: 'Google Play Store',  icon: '/icons/android.png', to: '/download/android', available: isAvailable(SITE.download.android) },
  { name: 'iPhone & iPad', sub: 'Apple App Store',    icon: '/icons/phone.png',   to: '/download/ios',     available: isAvailable(SITE.download.ios)     },
  { name: 'Windows',       sub: 'Desktop app',        icon: '/icons/monitor.png', to: '/download/desktop', available: isAvailable(SITE.download.windows) },
  { name: 'macOS',         sub: 'Desktop app',        icon: '/icons/macos.png',   to: '/download/desktop', available: isAvailable(SITE.download.macos)   },
]

export default function Download() {
  const ref = useReveal()
  const { t } = useTranslation()

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('download.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('download.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('download.sub')}</p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('download.sectionLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1">{t('download.sectionTitle')}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 64 }}>
            {PLATFORMS.map((p, i) => (
              <Link key={i} to={p.to} className={`platform-card reveal reveal-delay-${i + 1}`}
                style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 28, gap: 20 }}>
                <img src={p.icon} alt="" style={{ width: 48, height: 48, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
                    {p.name}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{p.sub}</p>
                </div>
                <span className="btn btn--ghost" style={{ marginTop: 'auto', fontSize: 14, padding: '10px 20px', opacity: p.available ? 1 : 0.6 }}>
                  {p.available ? t('download.downloadBtn') : t('download.comingSoon')}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop note */}
          <div className="reveal reveal-delay-3"
            style={{
              padding: '28px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--text-primary)' }}>{t('download.noteTitle')}:</strong> {t('download.noteBody')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
