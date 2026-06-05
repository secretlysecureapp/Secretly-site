import { Link } from 'react-router-dom'

export default function NotFound() {
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
        404 — Page not found
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 20 }}>
        This page doesn't exist.
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 17, marginBottom: 40, maxWidth: 420 }}>
        The page you are looking for has moved, been removed, or never existed.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn--primary btn--large">Go to homepage</Link>
        <Link to="/download" className="btn btn--ghost btn--large">Download Secretly</Link>
      </div>
    </div>
  )
}
