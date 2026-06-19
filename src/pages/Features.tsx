import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

/* One stroke icon per feature group (order matches featuresPage.groups). */
const S = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const GROUP_ICONS = [
  <svg key="msg" {...S}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  <svg key="call" {...S}><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  <svg key="sec" {...S}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  <svg key="cust" {...S}><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /><path d="M12 2a10 10 0 0 0 0 20 1.5 1.5 0 0 0 1.06-2.56A1.5 1.5 0 0 1 14 18h1a3 3 0 0 0 3-3 6 6 0 0 0-6-6" /></svg>,
  <svg key="ai" {...S}><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3.2" /></svg>,
  <svg key="grp" {...S}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="dev" {...S}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>,
  <svg key="file" {...S}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
]

interface Item { n: string; d: string; p?: boolean }
interface Group { label: string; title: string; items: Item[] }

export default function Features() {
  const ref = useReveal()
  const { t } = useTranslation()
  const groups = t('featuresPage.groups', { returnObjects: true }) as Group[]
  const badge = t('featuresPage.premiumBadge')

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('featuresPage.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('featuresPage.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('featuresPage.sub')}</p>
          <div className="reveal reveal-delay-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, padding: '8px 16px', borderRadius: 999, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t('featuresPage.freeNote')}</span>
          </div>
        </div>
      </section>
      <div className="divider" />

      {groups.map((g, gi) => (
        <div key={gi}>
          <section className="section" style={gi % 2 === 1 ? { background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-surface) 100%)' } : undefined}>
            <div className="container">
              <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
                <span style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}>
                  {GROUP_ICONS[gi % GROUP_ICONS.length]}
                </span>
                <div>
                  <p className="section-label" style={{ marginBottom: 4 }}>{g.label}</p>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>{g.title}</h2>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {g.items.map((it, ii) => (
                  <div key={ii} className={`feature-card reveal reveal-delay-${Math.min(ii % 4 + 1, 6)}`}
                    style={{ padding: '22px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15.5, fontWeight: 600, lineHeight: 1.3 }}>{it.n}</h3>
                      {it.p && (
                        <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 999, padding: '3px 8px' }}>{badge}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{it.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="divider" />
        </div>
      ))}

      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 className="cta-section__title reveal">{t('featuresPage.ctaTitle')}</h2>
          <p className="cta-section__sub reveal reveal-delay-1">{t('featuresPage.ctaSub')}</p>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/download" className="btn btn--primary btn--large">{t('featuresPage.ctaDownload')}</Link>
            <Link to="/pricing" className="btn btn--ghost btn--large">{t('featuresPage.ctaPricing')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
