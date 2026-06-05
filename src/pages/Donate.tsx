import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config'

/* Official Donorbox iframe embed for the campaign.
   Campaign slug lives in config.ts (SITE.donorboxCampaign). */
const DONORBOX_SRC = `https://donorbox.org/embed/${SITE.donorboxCampaign}?language=en`

export default function Donate() {
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">Support our mission</p>
          <h1 className="page-hero__title reveal reveal-delay-1">
            Help keep privacy free.
          </h1>
          <p className="page-hero__sub reveal reveal-delay-2">
            Secretly is built by a team of engineers and privacy advocates who believe secure
            communication should be accessible to everyone. Your contribution helps us keep
            Secretly free, open source, and independent.
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}
            className="two-col-grid">
            {/* Left: why donate */}
            <div>
              <p className="section-label reveal">Why donate</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                Privacy infrastructure takes resources.
              </h2>
              <p className="section-body reveal reveal-delay-2" style={{ marginBottom: 32 }}>
                Unlike ad-supported platforms, Secretly does not monetize your data. We rely on
                the support of our community to keep servers running, code audits funded, and
                development moving forward.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}
                className="reveal reveal-delay-3">
                {[
                  'Fund ongoing security audits of our encryption',
                  'Keep server infrastructure independent and private',
                  'Support full-time open-source development',
                  'Maintain multi-platform availability for everyone',
                ].map((item, i) => (
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
                Donations are processed securely via Donorbox. We accept Credit &amp; Debit Card,
                Apple Pay, and Google Pay.
              </p>
              <p className="reveal reveal-delay-4" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                For contributions above $50,000, please contact us at{' '}
                <a href="mailto:support@secretlyapp.com" style={{ color: 'var(--accent)' }}>
                  support@secretlyapp.com
                </a>.
              </p>

              <Link to="/about" className="btn btn--ghost reveal reveal-delay-4" style={{ marginTop: 24 }}>
                Learn about our mission
              </Link>
            </div>

            {/* Right: Donorbox embedded donation form */}
            <div className="reveal reveal-delay-2"
              style={{
                background: '#ffffff',
                borderRadius: 'var(--r-xl)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                minHeight: 600,
              }}>
              <iframe
                title="Donate to Secretly"
                src={DONORBOX_SRC}
                name="donorbox"
                allow="payment"
                seamless
                frameBorder={0}
                scrolling="no"
                style={{ width: '100%', minWidth: 250, maxHeight: 'none', height: 900, border: 'none', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
