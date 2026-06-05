import { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props  { children: ReactNode }
interface State  { hasError: boolean; message: string }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message ?? 'Unknown error' }
  }

  componentDidCatch(err: Error, info: { componentStack: string }) {
    // In production connect to Sentry / LogRocket here
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', err.message, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: '0 24px',
        textAlign: 'center',
        background: 'var(--bg-base)',
      }}>
        <img src="/icons/monitor.png" alt="" width={56} height={56}
          style={{ opacity: 0.4, filter: 'brightness(0) invert(1)' }} />
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, letterSpacing: '-0.03em' }}>
          Something went wrong
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 400, fontSize: 15 }}>
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.reload()}
            className="btn btn--primary"
          >
            Reload page
          </button>
          <Link to="/" className="btn btn--ghost" onClick={() => this.setState({ hasError: false, message: '' })}>
            Go home
          </Link>
        </div>
      </div>
    )
  }
}
