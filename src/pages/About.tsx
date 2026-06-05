import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()
  const { t } = useTranslation()

  return (
    <div ref={ref}>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('about.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">
            {t('about.title').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('about.sub')}</p>
        </div>
      </section>
      <div className="divider" />

      {/* Main content */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'start' }}
            className="reveal">
            <div className="prose">
              <h2>{t('about.s1')}</h2>
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <h2>{t('about.s2')}</h2>
              <p>{t('about.p3')}</p>
              <p>{t('about.p4')}</p>
            </div>

            <div className="prose">
              <h2>{t('about.s3')}</h2>
              <p>{t('about.p5')}</p>
              <ul>
                {(t('about.trustItems', { returnObjects: true }) as string[]).map((item, i) => {
                  const [bold, rest] = item.split(':')
                  return (
                    <li key={i}>
                      <strong>{bold}:</strong>{rest}
                    </li>
                  )
                })}
              </ul>
              <h2>{t('about.s4')}</h2>
              <p>{t('about.p6')}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* Values / stats */}
      <section className="section--sm section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { label: 'Open source',          value: '100%',  sub: 'Fully auditable codebase'        },
              { label: 'Zero-knowledge',        value: '0',     sub: 'Server-side message storage'     },
              { label: 'Personal data required',value: 'None',  sub: 'No phone number, no email'       },
            ].map((stat, i) => (
              <div key={i} className={`pillar reveal reveal-delay-${i + 1}`}>
                <div style={{ fontSize: 48, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'var(--accent)', marginBottom: 8, letterSpacing: '-0.04em' }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
