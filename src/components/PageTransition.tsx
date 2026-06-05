import { useEffect, useRef, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

/* Wraps page content in a div that fades in on every route change */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    // rAF ensures the reset frame is rendered before animating in
    // NOTE: do NOT use transform here — any transform on a parent breaks
    // position:fixed for all descendants (cursor-dot, cursor-ring, etc.)
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.45s cubic-bezier(0.22,1,0.36,1)'
        el.style.opacity    = '1'
      })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
