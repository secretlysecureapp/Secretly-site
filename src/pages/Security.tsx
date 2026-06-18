import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config'
import { EncryptionFlow, KeyRatchet } from '../components/SecurityVisuals'

const Icon = {
  lock: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
  phone: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
  file: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>),
  shield: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
}
const ENC_ICONS = [Icon.lock, Icon.phone, Icon.file, Icon.shield]
const HOW_NUMS = ['01', '02', '03', '04']

function Check() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><polyline points="20 6 9 17 4 12" /></svg>)
}
function Cross() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef5350" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M18 6 6 18M6 6l12 12" /></svg>)
}

export default function Security() {
  const ref = useReveal()
  const { t } = useTranslation()
  const encrypted = t('securityPage.encrypted', { returnObjects: true }) as Array<{ title: string; body: string }>
  const never = t('securityPage.never', { returnObjects: true }) as string[]
  const handles = t('securityPage.handles', { returnObjects: true }) as string[]
  const how = t('securityPage.how', { returnObjects: true }) as Array<{ title: string; body: string }>
  const device = t('securityPage.device', { returnObjects: true }) as string[]

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('securityPage.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('securityPage.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('securityPage.sub')}</p>
        </div>
      </section>
      <div className="divider" />

      {/* ── E2EE FLOW VISUAL ── */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: 920, margin: '0 auto' }}>
            <EncryptionFlow />
            <p className="reveal reveal-delay-1" style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)', marginTop: 20, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              {t('securityPage.flowCaption')}
            </p>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── WHAT'S ENCRYPTED ── */}
      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('securityPage.encLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 48 }}>{t('securityPage.encTitle')}</h2>
          <div className="pillars-grid">
            {encrypted.map((e, i) => (
              <div key={i} className={`pillar reveal reveal-delay-${i + 1}`}>
                <div className="pillar__icon">{ENC_ICONS[i]}</div>
                <h3 className="pillar__title">{e.title}</h3>
                <p className="pillar__body">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── ZERO-KNOWLEDGE ── */}
      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-surface) 100%)' }}>
        <div className="container">
          <p className="section-label reveal">{t('securityPage.zkLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 620, marginBottom: 16 }}>{t('securityPage.zkTitle')}</h2>
          <p className="section-body reveal reveal-delay-2" style={{ maxWidth: 640, marginBottom: 48 }}>{t('securityPage.zkSub')}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div className="reveal reveal-delay-2" style={{ padding: '32px 32px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, marginBottom: 20 }}>{t('securityPage.neverTitle')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {never.map((tx, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12 }}><Cross /><span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tx}</span></div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-3" style={{ padding: '32px 32px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, marginBottom: 20 }}>{t('securityPage.handlesTitle')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {handles.map((tx, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12 }}><Check /><span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tx}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── HOW IT WORKS + RATCHET ── */}
      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('securityPage.howLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 640, marginBottom: 64 }}>{t('securityPage.howTitle')}</h2>
          <div className="steps-grid">
            {how.map((s, i) => (
              <div key={i} className={`step reveal reveal-delay-${i + 1}`}>
                <span className="step__number">{HOW_NUMS[i]}</span>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__body">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 56, maxWidth: 860, marginLeft: 'auto', marginRight: 'auto' }}>
            <KeyRatchet />
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)', marginTop: 18, maxWidth: 580, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              {t('securityPage.ratchetCaption')}
            </p>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── REGISTRATION & VERIFICATION ── */}
      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'start' }}>
            <div>
              <p className="section-label reveal">{t('securityPage.regLabel1')}</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>{t('securityPage.regTitle1')}</h2>
              <p className="section-body reveal reveal-delay-2">{t('securityPage.regBody1')}</p>
            </div>
            <div>
              <p className="section-label reveal reveal-delay-1">{t('securityPage.regLabel2')}</p>
              <h2 className="section-title reveal reveal-delay-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>{t('securityPage.regTitle2')}</h2>
              <p className="section-body reveal reveal-delay-3">{t('securityPage.regBody2')}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── ON YOUR DEVICE ── */}
      <section className="section">
        <div className="container">
          <p className="section-label reveal">{t('securityPage.deviceLabel')}</p>
          <h2 className="section-title reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 32 }}>{t('securityPage.deviceTitle')}</h2>
          <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {device.map((tx, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: 'flex', gap: 12 }}>
                <Check /><span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tx}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* ── AUDIT STATUS ── */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ padding: '40px 48px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', maxWidth: 820 }}>
            <p className="section-label" style={{ marginBottom: 16 }}>{t('securityPage.auditLabel')}</p>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 16, letterSpacing: '-0.02em' }}>{t('securityPage.auditTitle')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 12 }}><Check /><span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t('securityPage.audit1')}</span></div>
              <div style={{ display: 'flex', gap: 12 }}><Check /><span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t('securityPage.audit2')}</span></div>
              <div style={{ display: 'flex', gap: 12 }}><Check /><span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text-primary)' }}>{t('securityPage.auditPlannedLead')}</strong> {t('securityPage.auditPlannedRest')}</span></div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {t('securityPage.vulnA')}{' '}
              <a href="mailto:security@secretlyapp.com" style={{ color: 'var(--accent)' }}>security@secretlyapp.com</a>{t('securityPage.vulnB')}{' '}
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>GitHub</a>{t('securityPage.vulnC')}
            </p>
          </div>
        </div>
      </section>
      <div className="divider" />

      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 className="cta-section__title reveal">{t('securityPage.ctaTitle')}</h2>
          <p className="cta-section__sub reveal reveal-delay-1">{t('securityPage.ctaSub')}</p>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/download" className="btn btn--primary btn--large">{t('securityPage.ctaDownload')}</Link>
            <Link to="/compare" className="btn btn--ghost btn--large">{t('securityPage.ctaCompare')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
