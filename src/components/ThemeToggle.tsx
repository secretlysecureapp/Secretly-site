import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'
const BAR_COLOR: Record<Theme, string> = { dark: '#0a0a0c', light: '#fbf8f3' }

/* ────────────────────────────────────────────────────────────
   Single source of truth for the theme.
   The component is rendered twice (desktop nav + mobile bar), so
   local state would let the two copies fight each other. A tiny
   module-level store keeps every instance in sync.
   ──────────────────────────────────────────────────────────── */
let current: Theme =
  typeof document !== 'undefined' &&
  document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark'

const listeners = new Set<() => void>()

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}
function getSnapshot(): Theme {
  return current
}

export function setTheme(next: Theme) {
  if (next === current) return
  current = next
  const root = document.documentElement
  // Animate colours only during the switch — no permanent transition cost
  root.classList.add('theme-anim')
  window.setTimeout(() => root.classList.remove('theme-anim'), 420)
  root.setAttribute('data-theme', next)
  try { localStorage.setItem(STORAGE_KEY, next) } catch { /* private mode */ }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLOR[next])
  listeners.forEach((fn) => fn())
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const isDark = theme === 'dark'

  const cls = (shown: boolean) =>
    `theme-toggle__ic ${shown ? 'theme-toggle__ic--shown' : 'theme-toggle__ic--hidden'}`

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {/* Sun — visible in dark mode (click switches to light) */}
      <svg className={cls(isDark)} width="17" height="17" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon — visible in light mode */}
      <svg className={cls(!isDark)} width="17" height="17" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  )
}
