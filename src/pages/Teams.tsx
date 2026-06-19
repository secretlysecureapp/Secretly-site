import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config'

const PILOT_MAILTO = `mailto:${SITE.supportEmail}?subject=${encodeURIComponent('Secretly for Teams — pilot request')}&body=${encodeURIComponent(
  'Organization name:\nTeam size:\nContact email:\nWhat you need secure communication for:\n',
)}`

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function Teams() {
  const ref = useReveal()
  const { t } = useTranslation()
  const audiences = t('teamsPage.audiences', { returnObjects: true }) as Array<{ title: string; body: string }>
  const included = t('teamsPage.included', { returnObjects: true }) as string[]
  const compliance = t('teamsPage.compliance', { returnObjects: true }) as Array<{ q: string; a: string }>

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('teamsPage.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('teamsPage.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('teamsPage.sub')}</p>
          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 28 }}>
            <a href={PILOT_MAILTO} className="btn btn--primary btn--large">{t('teamsPage.pilotCta')}</a>
            <Link to="/pricing" className="btn btn--ghost btn--large">{t('teamsPage.pricingCta')}</Link>
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('teamsPage.audiencesLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 560, marginBottom: 48 }}>
            {t('teamsPage.audiencesTitle')}
          </h2>
          <div className="pillars-grid">
            {audiences.map((a, i) => (
              <div key={i} className={`pillar reveal reveal-delay-${i + 1}`}>
                <h3 className="pillar__title">{a.title}</h3>
                <p className="pillar__body">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-surface) 100%)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'center' }}>
            <div>
              <p className="section-label reveal">{t('teamsPage.includedLabel')}</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 12 }}>
                {t('teamsPage.includedTitle')}
              </h2>
              <p className="section-body reveal reveal-delay-2">
                {t('teamsPage.includedPrice')}
              </p>
            </div>
            <div className="reveal reveal-delay-2" style={{ padding: '32px 32px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {included.map((tx, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <Check />
                  <span style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tx}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('teamsPage.complianceLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 520, marginBottom: 40 }}>
            {t('teamsPage.complianceTitle')}
          </h2>
          <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {compliance.map((f, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 6)}`} style={{ padding: '24px 28px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 className="cta-section__title reveal">{t('teamsPage.ctaTitle')}</h2>
          <p className="cta-section__sub reveal reveal-delay-1">{t('teamsPage.ctaSub')}</p>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <a href={PILOT_MAILTO} className="btn btn--primary btn--large">{t('teamsPage.pilotCta')}</a>
            <Link to="/contact" className="btn btn--ghost btn--large">{t('teamsPage.contactCta')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
