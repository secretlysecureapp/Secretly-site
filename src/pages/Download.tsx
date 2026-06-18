import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE, isAvailable } from '../config'

const PLATFORMS = [
  { name: 'Android',       sub: 'Google Play Store',  icon: '/icons/android.png', to: '/download/android', available: isAvailable(SITE.download.android) },
  { name: 'iPhone & iPad', sub: 'Apple App Store',    icon: '/icons/macos.png',              to: '/download/ios',     available: isAvailable(SITE.download.ios)     },
  { name: 'Windows',       sub: 'Desktop app',        icon: '/icons/monitor.png',            to: '/download/desktop', available: isAvailable(SITE.download.windows) },
  { name: 'macOS',         sub: 'Desktop app',        icon: '/icons/icons8-macbook-100.png', to: '/download/desktop', available: isAvailable(SITE.download.macos)   },
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
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{p.sub === 'Desktop app' ? t('platforms.desktop') : p.sub}</p>
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

          {/* System requirements */}
          <div className="reveal reveal-delay-3" style={{ marginTop: 40 }}>
            <p className="section-label" style={{ marginBottom: 20 }}>System requirements</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { os: 'Android', req: 'Android 8.0 or later' },
                { os: 'iPhone & iPad', req: 'iOS / iPadOS 15 or later' },
                { os: 'Windows', req: 'Windows 10 or later' },
                { os: 'macOS', req: 'macOS 11 Big Sur or later' },
              ].map((r) => (
                <div key={r.os} style={{ padding: '18px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{r.os}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{r.req}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 20 }}>
              No phone number or email required. See{' '}
              <Link to="/pricing" style={{ color: 'var(--accent)' }}>plans &amp; pricing</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
