import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px',
    }}>
      <p style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ display: 'block', width: 28, height: 1.5, background: 'var(--accent)' }} />
        {t('notFound.code')}
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 20 }}>
        {t('notFound.title')}
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 17, marginBottom: 40, maxWidth: 420 }}>
        {t('notFound.body')}
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn--primary btn--large">{t('notFound.home')}</Link>
        <Link to="/download" className="btn btn--ghost btn--large">{t('notFound.download')}</Link>
      </div>
    </div>
  )
}
