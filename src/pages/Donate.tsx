import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config'

/* Official Donorbox iframe embed for the campaign.
   Campaign slug lives in config.ts (SITE.donorboxCampaign).
   donorbox widgets.js auto-resizes the iframe to fit its content,
   so the form is never cut off and leaves no empty space. */
const DONORBOX_SRC = `https://donorbox.org/embed/${SITE.donorboxCampaign}?language=en`

export default function Donate() {
  const ref = useReveal()
  const { t } = useTranslation()
  const benefits = t('donate.benefits', { returnObjects: true }) as string[]

  useEffect(() => {
    const id = 'donorbox-widget-script'
    if (document.getElementById(id)) return
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://donorbox.org/widgets.js'
    s.setAttribute('paypalExpress', 'false')
    document.body.appendChild(s)
  }, [])

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('donate.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">
            {t('donate.title')}
          </h1>
          <p className="page-hero__sub reveal reveal-delay-2">
            {t('donate.sub')}
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'start' }}
            className="two-col-grid">
            {/* Left: why donate */}
            <div>
              <p className="section-label reveal">{t('donate.whyLabel')}</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                {t('donate.whyTitle')}
              </h2>
              <p className="section-body reveal reveal-delay-2" style={{ marginBottom: 32 }}>
                {t('donate.whyBody')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}
                className="reveal reveal-delay-3">
                {benefits.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <p className="reveal reveal-delay-3" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                {t('donate.methods')}
              </p>
              <p className="reveal reveal-delay-4" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {t('donate.largeNote')}{' '}
                <a href="mailto:support@secretlyapp.com" style={{ color: 'var(--accent)' }}>
                  support@secretlyapp.com
                </a>.
              </p>

              <Link to="/about" className="btn btn--ghost reveal reveal-delay-4" style={{ marginTop: 24 }}>
                {t('donate.learnMore')}
              </Link>
            </div>

            {/* Right: Donorbox embedded donation form (auto-resized by widgets.js) */}
            <div className="reveal reveal-delay-2"
              style={{
                background: '#ffffff',
                borderRadius: 'var(--r-xl)',
                border: '1px solid var(--border)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                overflow: 'hidden',
                width: '100%',
                maxWidth: 500,
                margin: '0 auto',
              }}>
              <iframe
                title="Donate to Secretly"
                src={DONORBOX_SRC}
                name="donorbox"
                allow="payment"
                seamless
                frameBorder={0}
                scrolling="no"
                height={900}
                width="100%"
                style={{ width: '100%', minWidth: 250, maxHeight: 'none', border: 'none', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
