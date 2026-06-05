import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `end` when the element enters the viewport.
 * Returns [ref, displayValue].
 */
export function useCountUp(end: number, duration = 2000, suffix = '') {
  const ref      = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState('0' + suffix)
  const started  = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const startTime = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          // ease-out expo
          const eased = 1 - Math.pow(2, -10 * progress)
          const current = Math.round(eased * end)
          setVal(current.toLocaleString() + suffix)
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, suffix])

  return [ref, val] as const
}
