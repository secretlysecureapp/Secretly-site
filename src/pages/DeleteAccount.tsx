import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config'

export default function DeleteAccount() {
  const ref = useReveal()
  const { t } = useTranslation()
  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('deletePage.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('deletePage.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('deletePage.sub')}</p>
        </div>
      </section>
      <div className="divider" />
      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('deletePage.howLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 620, marginBottom: 24 }}>
            {t('deletePage.howTitle')}
          </h2>
          <p className="reveal reveal-delay-2" style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 680, lineHeight: 1.7 }}>
            {t('deletePage.body')}{' '}
            <a href={`mailto:${SITE.supportEmail}`} style={{ color: 'var(--text-primary)' }}>{SITE.supportEmail}</a>{' '}
            {t('deletePage.bodyOr')}{' '}
            <Link to="/support" style={{ color: 'var(--text-primary)' }}>{t('deletePage.support')}</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
