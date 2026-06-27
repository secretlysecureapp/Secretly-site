import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import type { RouteRecord } from 'vite-react-ssg'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import ErrorBoundary   from './components/ErrorBoundary'
import ScrollProgress  from './components/ScrollProgress'
import BackToTop       from './components/BackToTop'
import PageTransition  from './components/PageTransition'
import CursorSystem    from './components/CursorSystem'
import CircuitField    from './components/CircuitField'
import Seo             from './components/Seo'
import Analytics       from './components/Analytics'
import useLenis        from './hooks/useLenis'
import i18n, { detectPreferredLanguage } from './i18n'

/* ──────────────────────────────────────────────────────────────
   Routes are defined as a data-router array consumed by
   vite-react-ssg, which statically pre-renders each page to HTML.

   IMPORTANT: pages use react-router `lazy` (NOT React.lazy). The SSG
   renderer resolves `lazy` BEFORE rendering, so real page content
   lands in the static HTML. React.lazy + Suspense would render the
   fallback during renderToString, shipping empty pages to crawlers.
   ────────────────────────────────────────────────────────────── */

/* Scroll to top on every client-side route change. */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/* App shell / layout route — chrome that wraps every page. */
function AppShell() {
  useLenis()

  // Apply the visitor's preferred language AFTER hydration so the first
  // client render still matches the English pre-rendered HTML.
  useEffect(() => {
    const lng = detectPreferredLanguage()
    if (lng !== i18n.language) i18n.changeLanguage(lng)
    document.documentElement.lang = lng
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  }, [])

  return (
    <ErrorBoundary>
      <Seo />
      <Analytics />
      <CircuitField />
      <CursorSystem />
      <ScrollProgress />
      <ScrollReset />
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </ErrorBoundary>
  )
}

/* Small client-only redirect component for legacy / short slugs. */
function Redirect({ to }: { to: string }) {
  return <Navigate to={to} replace />
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true,                 lazy: () => import('./pages/Home').then(m => ({ Component: m.default })) },
      { path: 'about',               lazy: () => import('./pages/About').then(m => ({ Component: m.default })) },
      { path: 'download',            lazy: () => import('./pages/Download').then(m => ({ Component: m.default })) },
      { path: 'download/android',    lazy: () => import('./pages/PlatformPage').then(m => ({ Component: () => <m.default platform="android" /> })) },
      { path: 'download/ios',        lazy: () => import('./pages/PlatformPage').then(m => ({ Component: () => <m.default platform="ios" /> })) },
      { path: 'download/desktop',    lazy: () => import('./pages/PlatformPage').then(m => ({ Component: () => <m.default platform="desktop" /> })) },
      { path: 'security',            lazy: () => import('./pages/Security').then(m => ({ Component: m.default })) },
      { path: 'compare',             lazy: () => import('./pages/Compare').then(m => ({ Component: m.default })) },
      { path: 'features',            lazy: () => import('./pages/Features').then(m => ({ Component: m.default })) },
      { path: 'pricing',             lazy: () => import('./pages/Pricing').then(m => ({ Component: m.default })) },
      { path: 'teams',               lazy: () => import('./pages/Teams').then(m => ({ Component: m.default })) },
      { path: 'help',                lazy: () => import('./pages/Help').then(m => ({ Component: m.default })) },
      { path: 'support',             lazy: () => import('./pages/Support').then(m => ({ Component: m.default })) },
      { path: 'contact',             lazy: () => import('./pages/Contact').then(m => ({ Component: m.default })) },
      { path: 'donate',              lazy: () => import('./pages/Donate').then(m => ({ Component: m.default })) },
      { path: 'delete-account',      lazy: () => import('./pages/DeleteAccount').then(m => ({ Component: m.default })) },
      { path: 'blog',                lazy: () => import('./pages/BlogIndex').then(m => ({ Component: m.default })) },
      { path: 'blog/:slug',          lazy: () => import('./pages/BlogPost').then(m => ({ Component: m.default })) },

      /* ── Legal — canonical paths MUST match the previously published
           site (referenced by app-store listings & shipped apps) ── */
      { path: 'privacy-policy',      lazy: () => import('./pages/Privacy').then(m => ({ Component: m.default })) },
      { path: 'terms-of-service',    lazy: () => import('./pages/Terms').then(m => ({ Component: m.default })) },

      /* ── Backward-compatible redirects from legacy / short slugs.
           Excluded from pre-rendering (see vite.config ssgOptions);
           served via host SPA fallback → client-side redirect. ── */
      { path: 'privacy',                  Component: () => <Redirect to="/privacy-policy" /> },
      { path: 'terms',                    Component: () => <Redirect to="/terms-of-service" /> },
      { path: 'about-us',                 Component: () => <Redirect to="/about" /> },
      { path: 'secretly-for-android',     Component: () => <Redirect to="/download/android" /> },
      { path: 'secretly-for-ios',         Component: () => <Redirect to="/download/ios" /> },
      { path: 'secretly-for-desktop',     Component: () => <Redirect to="/download/desktop" /> },
      { path: 'secretly-huawei-app-gallery', Component: () => <Redirect to="/download" /> },
      { path: 'support-1',                Component: () => <Redirect to="/support" /> },
      { path: '-3',                       Component: () => <Redirect to="/delete-account" /> },

      { path: '*',                   lazy: () => import('./pages/NotFound').then(m => ({ Component: m.default })) },
    ],
  },
]
