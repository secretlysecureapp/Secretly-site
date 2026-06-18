import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

/* Non-translatable plan meta (price, link, emphasis); copy comes from i18n. */
const PLAN_META = [
  { price: '$0',    period: '',              note: '',                          to: '/download', featured: false },
  { price: '$2.49', period: 'price.perMonth', note: 'price.premiumNote', to: '/download', featured: true  },
  { price: '$6',    period: 'price.perSeat',  note: '',                          to: '/teams',    featured: false },
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

interface PlanCopy { name: string; tagline: string; features: string[]; cta: string }

export default function Pricing() {
  const ref = useReveal()
  const { t } = useTranslation()
  const plans = t('pricingPage.plans', { returnObjects: true }) as PlanCopy[]
  const promise = t('pricingPage.promise', { returnObjects: true }) as string[]

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('pricingPage.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('pricingPage.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('pricingPage.sub')}</p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'stretch' }}>
            {plans.map((p, i) => {
              const meta = PLAN_META[i]
              return (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{
                    position: 'relative', display: 'flex', flexDirection: 'column',
                    padding: '36px 32px',
                    background: meta.featured ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                    border: meta.featured ? '1px solid var(--accent-border)' : '1px solid var(--border)',
                    borderRadius: 'var(--r-xl)',
                    boxShadow: meta.featured ? '0 24px 60px rgba(0,0,0,0.35)' : 'none',
                  }}
                >
                  {meta.featured && (
                    <span style={{ position: 'absolute', top: 18, right: 18, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 999, padding: '4px 10px' }}>
                      {t('pricingPage.popular')}
                    </span>
                  )}
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 38, letterSpacing: '-0.03em' }}>{meta.price}</span>
                    {meta.period && <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{t(meta.period)}</span>}
                  </div>
                  <div style={{ minHeight: 18, marginBottom: 14 }}>
                    {meta.note && <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t(meta.note)}</span>}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>{p.tagline}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28, flex: 1 }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', gap: 10 }}>
                        <Check />
                        <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={meta.to} className={`btn ${meta.featured ? 'btn--primary' : 'btn--ghost'}`} style={{ width: '100%', justifyContent: 'center' }}>
                    {p.cta}
                  </Link>
                </div>
              )
            })}
          </div>

          <p className="reveal" style={{ marginTop: 20, fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center' }}>
            {t('pricingPage.note')}
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>{t('pricingPage.promiseLabel')}</p>
            <h2 className="section-title reveal reveal-delay-1" style={{ marginBottom: 32 }}>{t('pricingPage.promiseTitle')}</h2>
          </div>
          <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {promise.map((tx, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: 'flex', gap: 12, justifyContent: 'flex-start' }}>
                <Check />
                <span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tx}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 className="cta-section__title reveal">{t('pricingPage.ctaTitle')}</h2>
          <p className="cta-section__sub reveal reveal-delay-1">{t('pricingPage.ctaSub')}</p>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/download" className="btn btn--primary btn--large">{t('pricingPage.ctaDownload')}</Link>
            <Link to="/teams" className="btn btn--ghost btn--large">{t('pricingPage.ctaTeams')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
