import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n, { LANGUAGES } from '../i18n'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [langOpen,    setLangOpen]    = useState(false)
  const { pathname }                  = useLocation()
  const { t }                         = useTranslation()
  const langRef                       = useRef<HTMLDivElement>(null)
  const currentLang                   = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0]

  const NAV_LINKS = [
    { label: t('nav.home'),     to: '/'        },
    { label: t('nav.download'), to: '/download' },
    { label: t('nav.about'),    to: '/about'    },
    { label: t('nav.help'),     to: '/help'     },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const switchLang = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    // RTL support for Arabic
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    setLangOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar__inner">
            <Link to="/" className="navbar__logo">
              <img src="/logo.png" alt="Secretly" className="navbar__logo-icon" />
              Secretly
            </Link>

            {/* Desktop nav */}
            <div className="navbar__nav">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="navbar__link"
                  style={pathname === l.to ? { color: 'var(--text-primary)' } : {}}
                >
                  {l.label}
                </Link>
              ))}

              {/* Language switcher */}
              <div ref={langRef} className="lang-switcher">
                <button
                  className="lang-switcher__btn"
                  onClick={() => setLangOpen(p => !p)}
                  aria-label="Switch language"
                >
                  <span className="lang-switcher__flag">{currentLang.flag}</span>
                  <span className="lang-switcher__code">{currentLang.code.toUpperCase()}</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {langOpen && (
                  <div className="lang-switcher__dropdown">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        className={`lang-switcher__option ${lang.code === i18n.language ? 'active' : ''}`}
                        onClick={() => switchLang(lang.code)}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/download" className="btn btn--primary navbar__cta" style={{ marginLeft: 12 }}>
                {t('nav.cta')}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="navbar__mobile-menu"
              onClick={() => setDrawerOpen((p) => !p)}
              aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer' }}
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect y="0"  width="22" height="2" rx="1" fill="currentColor" />
                <rect y="7"  width={drawerOpen ? 14 : 22} height="2" rx="1" fill="currentColor"
                  style={{ transition: 'width 0.25s ease' }} />
                <rect y="14" width="22" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="nav-drawer__links">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="nav-drawer__link">
              {l.label}
            </Link>
          ))}

          {/* Mobile language grid */}
          <div className="lang-mobile-grid">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                className={`lang-mobile-btn ${lang.code === i18n.language ? 'active' : ''}`}
                onClick={() => switchLang(lang.code)}
              >
                <span>{lang.flag}</span>
                <span>{lang.code.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <div className="nav-drawer__cta">
            <Link to="/download" className="btn btn--primary" style={{ width: '100%' }}>
              {t('nav.cta')} Secretly
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
