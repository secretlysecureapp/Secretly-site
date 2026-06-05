import { useEffect, useRef } from 'react'

/* Thin luminous accent-colored progress bar at the very top of the viewport */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const pct      = total > 0 ? (scrolled / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        height: 2,
        width: '100%',
        background: 'rgba(88,101,242,0.10)',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'linear-gradient(90deg, #5865f2, #3d7fff)',
          boxShadow: '0 0 8px rgba(88,101,242,0.6)',
          transition: 'width 80ms linear',
          willChange: 'width',
        }}
      />
    </div>
  )
}
