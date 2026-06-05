import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import ErrorBoundary   from './components/ErrorBoundary'
import ScrollProgress  from './components/ScrollProgress'
import BackToTop       from './components/BackToTop'
import PageTransition  from './components/PageTransition'
import CursorSystem    from './components/CursorSystem'
import useLenis        from './hooks/useLenis'

/* Route-level code splitting — each page is its own chunk */
const Home        = lazy(() => import('./pages/Home'))
const About       = lazy(() => import('./pages/About'))
const Download    = lazy(() => import('./pages/Download'))
const PlatformPage= lazy(() => import('./pages/PlatformPage'))
const Help        = lazy(() => import('./pages/Help'))
const Contact     = lazy(() => import('./pages/Contact'))
const Privacy     = lazy(() => import('./pages/Privacy'))
const Terms       = lazy(() => import('./pages/Terms'))
const Donate      = lazy(() => import('./pages/Donate'))
const NotFound    = lazy(() => import('./pages/NotFound'))

/* Minimal loading screen shown while a lazy chunk is fetching */
function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="page-loader" />
    </div>
  )
}

/* Scroll to top on route change */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function AppShell() {
  useLenis()
  return (
    <ErrorBoundary>
      <CursorSystem />
      <ScrollProgress />
      <ScrollReset />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <PageTransition>
            <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/about"               element={<About />} />
            <Route path="/download"            element={<Download />} />
            <Route path="/download/android"    element={<PlatformPage platform="android" />} />
            <Route path="/download/ios"        element={<PlatformPage platform="ios" />} />
            <Route path="/download/desktop"    element={<PlatformPage platform="desktop" />} />
            <Route path="/help"                element={<Help />} />
            <Route path="/support"             element={<Help />} />
            <Route path="/contact"             element={<Contact />} />
            <Route path="/donate"              element={<Donate />} />
            <Route path="/delete-account"      element={<Help />} />

            {/* ── Legal — canonical paths MUST match the previously published
                 site (referenced by app-store listings & shipped apps) ── */}
            <Route path="/privacy-policy"      element={<Privacy />} />
            <Route path="/terms-of-service"    element={<Terms />} />

            {/* ── Backward-compatible redirects from legacy / short slugs ── */}
            <Route path="/privacy"             element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/terms"               element={<Navigate to="/terms-of-service" replace />} />
            <Route path="/about-us"            element={<Navigate to="/about" replace />} />
            <Route path="/secretly-for-android"        element={<Navigate to="/download/android" replace />} />
            <Route path="/secretly-for-ios"            element={<Navigate to="/download/ios" replace />} />
            <Route path="/secretly-for-desktop"        element={<Navigate to="/download/desktop" replace />} />
            <Route path="/secretly-huawei-app-gallery" element={<Navigate to="/download" replace />} />
            <Route path="/support-1"           element={<Navigate to="/support" replace />} />
            <Route path="/-3"                  element={<Navigate to="/delete-account" replace />} />

            <Route path="*"                    element={<NotFound />} />
          </Routes>
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
