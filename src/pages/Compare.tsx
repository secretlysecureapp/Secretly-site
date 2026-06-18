import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

type Cell = boolean | string
interface Row { label: string; secretly: Cell; signal: Cell; threema: Cell; session: Cell }

/* Brand names — never translated. */
const COLS = ['Secretly', 'Signal', 'Threema', 'Session'] as const

function Yes() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-label="Yes">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function No() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="No">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
function renderCell(v: Cell) {
  if (v === true) return <Yes />
  if (v === false) return <No />
  return <span style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>{v}</span>
}

export default function Compare() {
  const ref = useReveal()
  const { t } = useTranslation()
  const rows = t('comparePage.rows', { returnObjects: true }) as Row[]
  const standout = t('comparePage.standout', { returnObjects: true }) as Array<{ title: string; body: string }>
  const th: React.CSSProperties = { padding: '16px 18px', textAlign: 'left', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }
  const td: React.CSSProperties = { padding: '14px 18px', borderTop: '1px solid var(--border)', verticalAlign: 'middle' }

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('comparePage.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('comparePage.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('comparePage.sub')}</p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', background: 'var(--bg-surface)' }}>
            <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...th, color: 'var(--text-muted)' }}>{t('comparePage.feature')}</th>
                  {COLS.map((c) => (
                    <th key={c} style={{ ...th, textAlign: 'center', color: c === 'Secretly' ? 'var(--accent)' : 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, background: c === 'Secretly' ? 'var(--accent-dim)' : 'transparent' }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ ...td, fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{r.label}</td>
                    <td style={{ ...td, textAlign: 'center', background: 'var(--accent-dim)' }}><div style={{ display: 'flex', justifyContent: 'center' }}>{renderCell(r.secretly)}</div></td>
                    <td style={{ ...td, textAlign: 'center' }}><div style={{ display: 'flex', justifyContent: 'center' }}>{renderCell(r.signal)}</div></td>
                    <td style={{ ...td, textAlign: 'center' }}><div style={{ display: 'flex', justifyContent: 'center' }}>{renderCell(r.threema)}</div></td>
                    <td style={{ ...td, textAlign: 'center' }}><div style={{ display: 'flex', justifyContent: 'center' }}>{renderCell(r.session)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="reveal" style={{ marginTop: 20, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 760 }}>
            {t('comparePage.footnote')}
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
        <div className="container">
          <p className="section-label reveal">{t('comparePage.standoutLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 40 }}>
            {t('comparePage.standoutTitle')}
          </h2>
          <div className="pillars-grid">
            {standout.map((p, i) => (
              <div key={i} className={`pillar reveal reveal-delay-${i + 1}`}>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 className="cta-section__title reveal">{t('comparePage.ctaTitle')}</h2>
          <p className="cta-section__sub reveal reveal-delay-1">{t('comparePage.ctaSub')}</p>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/download" className="btn btn--primary btn--large">{t('comparePage.ctaDownload')}</Link>
            <Link to="/security" className="btn btn--ghost btn--large">{t('comparePage.ctaSecurity')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
