import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config'

const LEGACY_MAILTO = `mailto:${SITE.supportEmail}?subject=${encodeURIComponent('Restore lifetime Premium (legacy $5.99 purchase)')}&body=${encodeURIComponent(
  'I previously purchased Secretly on Google Play and would like my lifetime Premium restored.\n\nGoogle Play order number (starts with GPA.): \nApproximate purchase date: \n',
)}`

export default function Support() {
  const ref = useReveal()
  const { t } = useTranslation()
  const topics = t('supportPage.topics', { returnObjects: true }) as Array<{ title: string; body: string }>
  const channels = t('supportPage.channels', { returnObjects: true }) as Array<{ title: string; body: string }>

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('supportPage.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('supportPage.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">
            {t('supportPage.subA')}{' '}
            <Link to="/help" style={{ color: 'var(--text-primary)' }}>{t('supportPage.helpCenter')}</Link>.
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('supportPage.topicsLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 520, marginBottom: 40 }}>
            {t('supportPage.topicsTitle')}
          </h2>
          <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topics.map((tp, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ padding: '24px 28px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{tp.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820, padding: '40px 48px', background: 'var(--bg-elevated)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-xl)' }}>
            <p className="section-label" style={{ marginBottom: 16 }}>{t('supportPage.legacyLabel')}</p>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 16, letterSpacing: '-0.02em' }}>
              {t('supportPage.legacyTitle')}
            </h3>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
              {t('supportPage.legacyBody1')}
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
              {t('supportPage.legacyBody2a')}{' '}
              <a href={`mailto:${SITE.supportEmail}`} style={{ color: 'var(--accent)' }}>{SITE.supportEmail}</a>{' '}
              {t('supportPage.legacyBody2b')}{' '}
              <code style={{ fontFamily: 'monospace', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '2px 7px', fontSize: 13 }}>GPA.</code>{' '}
              {t('supportPage.legacyBody2c')}
            </p>
            <a href={LEGACY_MAILTO} className="btn btn--primary">{t('supportPage.legacyCta')}</a>
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('supportPage.channelsLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 520, marginBottom: 40 }}>
            {t('supportPage.channelsTitle')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div className="reveal reveal-delay-1" style={{ padding: '28px 28px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{channels[0]?.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{channels[0]?.body}</p>
              <a href={`mailto:${SITE.supportEmail}`} style={{ color: 'var(--accent)', fontSize: 14 }}>{SITE.supportEmail}</a>
            </div>
            <div className="reveal reveal-delay-2" style={{ padding: '28px 28px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{channels[1]?.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{channels[1]?.body}</p>
              <a href="mailto:security@secretlyapp.com" style={{ color: 'var(--accent)', fontSize: 14 }}>security@secretlyapp.com</a>
            </div>
            <div className="reveal reveal-delay-3" style={{ padding: '28px 28px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{channels[2]?.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{channels[2]?.body}</p>
              <Link to="/contact" style={{ color: 'var(--accent)', fontSize: 14 }}>{t('supportPage.openForm')} →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
