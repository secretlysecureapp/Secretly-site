import { useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  strength?: number  // px max displacement, default 10
  onClick?: () => void
}

export default function MagneticButton({ children, className, strength = 10, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) / (rect.width  / 2)
    const dy   = (e.clientY - cy) / (rect.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
  }

  const handleEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.1s linear'
  }

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className ?? ''}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      onClick={onClick}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  )
}
