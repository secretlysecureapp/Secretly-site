import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

export default function Help() {
  const ref = useReveal()
  const { t } = useTranslation()
  const faqs = t('help.faqs', { returnObjects: true }) as Array<{q:string;a:string}>

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('help.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('help.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('help.sub')}</p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          {/* FAQ */}
          <p className="section-label reveal">{t('help.faqLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 560, marginBottom: 40 }}>
            {t('help.faqTitle')}
          </h2>
          <div style={{ maxWidth: 740, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 72 }}>
            {faqs.map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 6)}`}
                style={{
                  padding: '24px 28px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="reveal reveal-delay-2" style={{ padding: '40px 48px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{t('help.contactTitle')}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t('help.contactSub')}</p>
            </div>
            <Link to="/contact" className="btn btn--primary">{t('help.contactBtn')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
