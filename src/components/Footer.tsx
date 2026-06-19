import { Link } from 'react-router-dom'
import { SITE } from '../config'

const PRODUCT_LINKS = [
  { label: 'Features',  to: '/features' },
  { label: 'Download',  to: '/download' },
  { label: 'Pricing',   to: '/pricing'  },
  { label: 'Security',  to: '/security' },
  { label: 'Compare',   to: '/compare'  },
]

const COMPANY_LINKS = [
  { label: 'About Us',  to: '/about'   },
  { label: 'For Teams', to: '/teams'   },
  { label: 'Donate',    to: '/donate'  },
  { label: 'Contact',   to: '/contact' },
]

const RESOURCE_LINKS = [
  { label: 'Help Center',    to: '/help'           },
  { label: 'Support',        to: '/support'        },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Delete Account', to: '/delete-account' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand col */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/icons/chat.png" alt="" className="footer__logo-icon" />
              Secretly
            </Link>
            <p className="footer__tagline">
              Private messaging for people and teams who need secure communication
              without phone numbers, email, or surveillance.
            </p>
            <div className="footer__socials">
              <a
                href={SITE.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="X (Twitter)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="GitHub — open source"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="footer__col-title">Product</p>
            <div className="footer__col-links">
              {PRODUCT_LINKS.map((l) => (
                <Link key={l.to + l.label} to={l.to} className="footer__col-link">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="footer__col-title">Company</p>
            <div className="footer__col-links">
              {COMPANY_LINKS.map((l) => (
                <Link key={l.to + l.label} to={l.to} className="footer__col-link">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="footer__col-title">Resources</p>
            <div className="footer__col-links">
              {RESOURCE_LINKS.map((l) => (
                <Link key={l.to + l.label} to={l.to} className="footer__col-link">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 SIA Secretly. All rights reserved.</p>
          <div className="footer__legal">
            <Link to="/privacy-policy"   className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms-of-service" className="footer__legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
