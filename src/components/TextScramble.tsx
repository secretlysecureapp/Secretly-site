import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

interface Props {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number       // ms before scramble starts
  duration?: number    // ms total scramble duration
  trigger?: boolean    // external trigger (runs once per true)
}

export default function TextScramble({
  text,
  className,
  tag: Tag = 'span',
  delay = 0,
  duration = 1200,
  trigger = true,
}: Props) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const hasRun   = useRef(false)

  useEffect(() => {
    if (!trigger || hasRun.current) return
    hasRun.current = true

    const timeout = setTimeout(() => {
      const chars   = text.split('')
      const total   = chars.length

      const animate = (now: number) => {
        if (!startRef.current) startRef.current = now
        const elapsed  = now - startRef.current
        const progress = Math.min(elapsed / duration, 1)

        // How many chars are "resolved" (from left to right)
        const resolved = Math.floor(progress * total)

        const result = chars.map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < resolved) return ch
          // Still scrambling — random char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })

        setDisplay(result.join(''))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        } else {
          setDisplay(text)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frameRef.current)
    }
  }, [trigger, text, delay, duration])

  return <Tag className={className}>{display}</Tag>
}
