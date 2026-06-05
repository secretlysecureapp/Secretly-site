import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'
import MagneticButton from '../components/MagneticButton'

const FEATURE_ICONS = [
  '/icons/chat.png', '/icons/phone.png', '/icons/camera.png',
  '/icons/group-call.png', '/icons/collaboration.png', '/icons/user.png',
  '/icons/monitor.png', '/icons/edit.png', '/icons/microphone.png',
]

const SCENARIO_ICONS = [
  '/icons/user.png', '/icons/group-call.png',
  '/icons/collaboration.png', '/icons/monitor.png',
]

const PILLAR_ICONS = [
  <svg key="os" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>,
  <svg key="zk" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>,
  <svg key="enc" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
]

const PLATFORM_DATA = [
  { name: 'Android',      icon: '/icons/android.png',  to: '/download/android'  },
  { name: 'iPhone & iPad',icon: '/icons/phone.png',    to: '/download/ios'      },
  { name: 'Windows',      icon: '/icons/monitor.png',  to: '/download/desktop'  },
  { name: 'macOS',        icon: '/icons/macos.png',    to: '/download/desktop'  },
]

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { t } = useTranslation()
  const s1Ref = useReveal()
  const s2Ref = useReveal()
  const s3Ref = useReveal()
  const s4Ref = useReveal()
  const s5Ref = useReveal()
  const statsRef = useReveal()

  const [encRef,    encVal]    = useCountUp(256, 1800, '-bit')
  const [platRef,   platVal]   = useCountUp(5, 1400, '')
  const [langRef,   langVal]   = useCountUp(10, 1600, '')
  const [noDataRef, noDataVal] = useCountUp(0, 800, '')

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero-zone" className="hero bg-grid">
        {/* Atmospheric gradient */}
        <div className="hero__atmosphere" />

        {/* Trail overlay — icons spawn here, clipped to hero */}
        <div id="trail-overlay" className="hero__trail-overlay" />

        <div className="container">
          <div className="hero__content">
            {/* Left: text stack */}
            <div className="hero__text">
              <span className="hero__kicker">{t('hero.kicker')}</span>

              <h1 className="hero__headline">
                {t('hero.headline').split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h1>

              <p className="hero__subhead">{t('hero.subhead')}</p>

              <div className="hero__cta-group">
                <MagneticButton strength={8}>
                  <Link to="/download" className="btn btn--primary btn--large">
                    {t('hero.ctaDownload')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={8}>
                  <Link to="/about" className="btn btn--ghost btn--large">
                    {t('hero.ctaHow')}
                  </Link>
                </MagneticButton>
              </div>

              <div className="hero__proof">
                <span>{t('hero.proofOpenSource')}</span>
                <span className="hero__proof-dot" />
                <span>{t('hero.proofVerified')}</span>
                <span className="hero__proof-dot" />
                <span>{t('hero.proofZK')}</span>
              </div>
            </div>

            {/* Right: hero devices visual */}
            <div className="hero__visual">
              <div className="hero__devices-wrap">
                <div className="hero__devices-glow" />
                <picture>
                  <source srcSet="/Chat.webp" type="image/webp" />
                  <img
                    src="/Chat-fallback.png"
                    alt="Secretly app on phone and desktop"
                    className="hero__devices-img hero__devices-img--landscape"
                    draggable={false}
                    loading="eager"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll-hint">
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── TRUST MARQUEE ── */}
      <div className="trust-strip">
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...(t('trust.items', { returnObjects: true }) as string[]), ...(t('trust.items', { returnObjects: true }) as string[])].map((item, i) => (
              <div key={i} className="marquee-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS COUNTER ── */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item reveal">
              <span className="stat-number" ref={encRef}>{encVal}</span>
              <span className="stat-label">{t('stats.encryption')}</span>
            </div>
            <div className="stat-item reveal reveal-delay-1">
              <span className="stat-number" ref={platRef}>{platVal}</span>
              <span className="stat-label">{t('stats.platforms')}</span>
            </div>
            <div className="stat-item reveal reveal-delay-2">
              <span className="stat-number" ref={langRef}>{langVal}</span>
              <span className="stat-label">{t('stats.languages')}</span>
            </div>
            <div className="stat-item reveal reveal-delay-3">
              <span className="stat-number" ref={noDataRef}>{noDataVal}</span>
              <span className="stat-label">{t('stats.noData')}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── SECTION 1: SECURE BASE ── */}
      <section className="section" ref={s1Ref}>
        <div className="container">
          <div className="reveal">
            <p className="section-label">{t('home.s1Label')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 className="section-title reveal reveal-delay-1">{t('home.s1Title')}</h2>
              <p className="section-body reveal reveal-delay-2" style={{ marginBottom: 0 }}>{t('home.s1Body')}</p>
            </div>
            <div className="scenario-grid reveal reveal-delay-2">
              {(t('scenarios', { returnObjects: true }) as Array<{title:string;body:string}>).map((s, i) => (
                <div key={i} className="scenario-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <img src={SCENARIO_ICONS[i]} alt="" style={{ width: 24, height: 24, filter: 'brightness(0) invert(0.6) sepia(1) saturate(3) hue-rotate(160deg)', opacity: 0.8 }} />
                    <h3 className="scenario-card__title" style={{ marginBottom: 0 }}>{s.title}</h3>
                  </div>
                  <p className="scenario-card__body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── SECTION 2: HOW IT WORKS ── */}
      <section className="section" ref={s2Ref}
        style={{ background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-surface) 100%)' }}>
        <div className="container">
          <p className="section-label reveal">{t('home.s2Label')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 640, marginBottom: 64 }}>
            {t('home.s2Title')}
          </h2>
          <div className="steps-grid">
            {(t('steps', { returnObjects: true }) as Array<{num:string;title:string;body:string}>).map((step, i) => (
              <div key={i} className={`step reveal reveal-delay-${i + 1}`}>
                <span className="step__number">{step.num}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64, padding: 0, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}
            className="reveal reveal-delay-2">
            <picture>
              <source srcSet="/ChatGPT.webp" type="image/webp" />
              <img src="/ChatGPT-fallback.png" alt="Secretly app interface preview"
                   style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                   draggable={false} loading="lazy" />
            </picture>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── SECTION 3: CORE CAPABILITIES ── */}
      <section className="section" ref={s3Ref}>
        <div className="container">
          <p className="section-label reveal">{t('home.s3Label')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 48 }}>
            {t('home.s3Title')}
          </h2>
          <div className="feature-grid reveal reveal-delay-2">
            {(t('features', { returnObjects: true }) as Array<{title:string;body:string}>).map((f, i) => (
              <div key={i} className="feature-cell tilt-card"
                onMouseMove={e => {
                  const el   = e.currentTarget as HTMLDivElement
                  const rect = el.getBoundingClientRect()
                  const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 16
                  const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -16
                  el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`
                  el.style.transition = 'transform 0.05s linear'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)'
                  el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'
                }}
              >
                <div className="feature-cell__accent" />
                <img src={FEATURE_ICONS[i]} alt="" className="feature-cell__icon" />
                <h3 className="feature-cell__title">{f.title}</h3>
                <p className="feature-cell__body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── SECTION 4: TRUST PILLARS ── */}
      <section className="section"
        ref={s4Ref}
        style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
        <div className="container">
          <p className="section-label reveal">{t('home.s4Label')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 560, marginBottom: 48 }}>
            {t('home.s4Title')}
          </h2>
          <div className="pillars-grid">
            {(t('pillars', { returnObjects: true }) as Array<{title:string;body:string}>).map((p, i) => (
              <div key={i} className={`pillar reveal reveal-delay-${i + 1}`}>
                <div className="pillar__icon">{PILLAR_ICONS[i]}</div>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__body">{p.body}</p>
              </div>
            ))}
          </div>

          <div
            className="reveal reveal-delay-3"
            style={{
              marginTop: 48,
              padding: '40px 48px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}>
            <p style={{ fontSize: 20, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.02em', maxWidth: 600 }}>
              {t('home.quote')}
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {t('home.quoteAuthor')}
            </p>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── SECTION 5: DOWNLOAD CTA ── */}
      <section className="cta-section" ref={s5Ref}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label reveal" style={{ justifyContent: 'center' }}>{t('home.s5Label')}</p>
          <h2 className="cta-section__title reveal reveal-delay-1">{t('home.s5Title')}</h2>
          <p className="cta-section__sub reveal reveal-delay-2">{t('home.s5Sub')}</p>

          <div className="platform-grid reveal reveal-delay-3" style={{ maxWidth: 560, margin: '0 auto' }}>
            {PLATFORM_DATA.map((p, i) => (
              <Link key={i} to={p.to} className="platform-card">
                <img src={p.icon} alt="" className="platform-card__icon" />
                <div className="platform-card__info">
                  <p className="platform-card__label">{t('platforms.label')}</p>
                  <p className="platform-card__name">{p.name}</p>
                </div>
                <svg className="platform-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>

          <p className="reveal reveal-delay-4" style={{ marginTop: 32, fontSize: 13, color: 'var(--text-muted)' }}>
            {t('home.s5Note')}
          </p>
        </div>
      </section>
    </>
  )
}
