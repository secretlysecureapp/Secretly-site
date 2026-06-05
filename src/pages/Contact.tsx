import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config'

interface Fields {
  name: string
  email: string
  subject: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validateEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function validate(f: Fields, t: (key: string) => string): Errors {
  const e: Errors = {}
  if (!f.name.trim())               e.name    = t('contact.errors.nameRequired')
  if (!f.email.trim())              e.email   = t('contact.errors.emailRequired')
  else if (!validateEmail(f.email)) e.email   = t('contact.errors.emailInvalid')
  if (!f.subject.trim())            e.subject = t('contact.errors.subjectRequired')
  if (!f.message.trim())            e.message = t('contact.errors.messageRequired')
  else if (f.message.trim().length < 10) e.message = t('contact.errors.messageTooShort')
  return e
}

export default function Contact() {
  const ref = useReveal()
  const { t } = useTranslation()
  const [fields,  setFields]  = useState<Fields>({ name: '', email: '', subject: '', message: '' })
  const [errors,  setErrors]  = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [sendError, setSendError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFields((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof Errors]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(fields, t)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setSendError(false)

    // Preferred path: POST to the configured form endpoint (e.g. Formspree)
    if (SITE.formspreeEndpoint) {
      try {
        const res = await fetch(SITE.formspreeEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            subject: fields.subject,
            message: fields.message,
            _subject: `Secretly contact: ${fields.subject}`,
          }),
        })
        setLoading(false)
        if (res.ok) { setSent(true) } else { setSendError(true) }
      } catch {
        setLoading(false)
        setSendError(true)
      }
      return
    }

    // Fallback when no endpoint is configured: open the user's email client
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
    )
    const subject = encodeURIComponent(fields.subject)
    window.location.href = `mailto:${SITE.supportEmail}?subject=${subject}&body=${body}`
    setLoading(false)
    setSent(true)
  }

  const fieldStyle = (hasError?: string): React.CSSProperties => ({
    padding: '12px 16px',
    background: 'var(--bg-elevated)',
    border: `1px solid ${hasError ? 'rgba(255,80,80,0.6)' : 'var(--border)'}`,
    borderRadius: 'var(--r-sm)',
    color: 'var(--text-primary)',
    fontSize: 15,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  })

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">{t('contact.kicker')}</p>
          <h1 className="page-hero__title reveal reveal-delay-1">{t('contact.title')}</h1>
          <p className="page-hero__sub reveal reveal-delay-2">{t('contact.sub')}</p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'start' }}>
            {/* Contact info */}
            <div className="reveal">
              <p className="section-label">Contact channels</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 12 }}>
                {[
                  { label: 'General support',   value: 'support@secretlyapp.com',  icon: '✉️' },
                  { label: 'Security reports',  value: 'security@secretlyapp.com', icon: '🔒' },
                  { label: 'Business inquiries',value: 'business@secretlyapp.com', icon: '💼' },
                ].map((c, i) => (
                  <div key={i} style={{
                    padding: '20px 24px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}>
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                        {c.label}
                      </p>
                      <p style={{ fontSize: 15, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                        {c.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, padding: '20px 24px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-md)' }}>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  <strong style={{ color: 'var(--accent)' }}>Security note:</strong> If you
                  have found a security vulnerability, please report it via encrypted email to
                  security@secretlyapp.com. We take all reports seriously and respond promptly.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="reveal reveal-delay-2">
              {sent ? (
                <div style={{
                  padding: 40,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 'var(--r-xl)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ marginBottom: 10 }}>{t('contact.successTitle')}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t('contact.successBody')}</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ marginBottom: 8, fontSize: 20 }}>Send a message</h3>

                  {/* Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                      Your name <span style={{ color: 'rgba(255,80,80,0.8)' }}>*</span>
                    </label>
                    <input type="text" name="name" value={fields.name} onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')} autoComplete="name"
                      style={fieldStyle(errors.name)}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-border)')}
                      onBlur={(e)  => (e.target.style.borderColor = errors.name ? 'rgba(255,80,80,0.6)' : 'var(--border)')}
                    />
                    {errors.name && <p style={{ fontSize: 12, color: 'rgba(255,100,100,0.9)', marginTop: 2 }}>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                      Email <span style={{ color: 'rgba(255,80,80,0.8)' }}>*</span>
                    </label>
                    <input type="email" name="email" value={fields.email} onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')} autoComplete="email"
                      style={fieldStyle(errors.email)}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-border)')}
                      onBlur={(e)  => (e.target.style.borderColor = errors.email ? 'rgba(255,80,80,0.6)' : 'var(--border)')}
                    />
                    {errors.email && <p style={{ fontSize: 12, color: 'rgba(255,100,100,0.9)', marginTop: 2 }}>{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                      Subject <span style={{ color: 'rgba(255,80,80,0.8)' }}>*</span>
                    </label>
                    <input type="text" name="subject" value={fields.subject} onChange={handleChange}
                      placeholder={t('contact.subjectPlaceholder')}
                      style={fieldStyle(errors.subject)}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-border)')}
                      onBlur={(e)  => (e.target.style.borderColor = errors.subject ? 'rgba(255,80,80,0.6)' : 'var(--border)')}
                    />
                    {errors.subject && <p style={{ fontSize: 12, color: 'rgba(255,100,100,0.9)', marginTop: 2 }}>{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                      Message <span style={{ color: 'rgba(255,80,80,0.8)' }}>*</span>
                    </label>
                    <textarea name="message" value={fields.message} onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')} rows={5}
                      style={{ ...fieldStyle(errors.message), resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-border)')}
                      onBlur={(e)  => (e.target.style.borderColor = errors.message ? 'rgba(255,80,80,0.6)' : 'var(--border)')}
                    />
                    {errors.message && <p style={{ fontSize: 12, color: 'rgba(255,100,100,0.9)', marginTop: 2 }}>{errors.message}</p>}
                  </div>

                  {sendError && (
                    <p style={{ fontSize: 13, color: 'rgba(255,100,100,0.95)', lineHeight: 1.5 }}>
                      Could not send your message. Please try again, or email us directly at{' '}
                      <a href={`mailto:${SITE.supportEmail}`} style={{ color: 'var(--accent)' }}>
                        {SITE.supportEmail}
                      </a>.
                    </p>
                  )}

                  <button type="submit" className="btn btn--primary"
                    disabled={loading}
                    style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, gap: 10 }}>
                    {loading ? (
                      <>
                        <span className="page-loader" style={{ width: 16, height: 16, borderWidth: 2 }} />
                        {t('contact.sending')}
                      </>
                    ) : t('contact.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
