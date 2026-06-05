import { useEffect, useRef, useCallback } from 'react'

/* ──────────────────────────────────────────────────
   Icon pool with weighted selection
   Semantic to Secretly: chat, phone, calls, camera,
   microphone, monitor, user, collaboration = high weight
   ────────────────────────────────────────────────── */
const WEIGHTED_ICONS: Array<{ src: string; weight: number }> = [
  { src: '/icons/chat.png',          weight: 8 },
  { src: '/icons/phone.png',         weight: 8 },
  { src: '/icons/group-call.png',    weight: 7 },
  { src: '/icons/camera.png',        weight: 7 },
  { src: '/icons/microphone.png',    weight: 7 },
  { src: '/icons/monitor.png',       weight: 6 },
  { src: '/icons/user.png',          weight: 6 },
  { src: '/icons/collaboration.png', weight: 6 },
  { src: '/icons/play.png',          weight: 2 },
  { src: '/icons/music.png',         weight: 2 },
  { src: '/icons/android.png',       weight: 2 },
  { src: '/icons/macos.png',         weight: 2 },
  { src: '/icons/edit.png',          weight: 3 },
  { src: '/icons/controller.png',    weight: 1 },
]

// Expand into flat pool
const ICON_POOL: string[] = []
WEIGHTED_ICONS.forEach(({ src, weight }) => {
  for (let i = 0; i < weight; i++) ICON_POOL.push(src)
})

function randomIcon(): string {
  return ICON_POOL[Math.floor(Math.random() * ICON_POOL.length)]
}

/* ──────────────────────────────────────────────────
   Discord-inspired vibrant palette
   Each spawned icon is tinted a random saturated hue
   ────────────────────────────────────────────────── */
const TRAIL_COLORS: string[] = [
  '#5865F2', // Blurple
  '#57F287', // Green
  '#FEE75C', // Yellow
  '#EB459E', // Fuchsia
  '#ED4245', // Red
  '#00A8FC', // Bright blue
  '#FF73FA', // Pink
  '#F47B67', // Coral
  '#FAA81A', // Orange
  '#9B84EC', // Light purple
  '#1ABC9C', // Teal
  '#00E5FF', // Cyan (brand accent)
]

function randomColor(): string {
  return TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
}
function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/* ──────────────────────────────────────────────────
   Spec constants
   ────────────────────────────────────────────────── */
const SPAWN_THRESHOLD = 72  // px
const ICON_SIZE = 44         // px
const MAX_ACTIVE = 12
const HARD_CAP = 16

interface TrailNode {
  el: HTMLElement
  exitTimer: ReturnType<typeof setTimeout>
  removeTimer: ReturnType<typeof setTimeout>
}

export default function CursorSystem() {
  const dotRef       = useRef<HTMLDivElement>(null)
  const ringRef      = useRef<HTMLDivElement>(null)
  const spotRef      = useRef<HTMLDivElement>(null)

  const mouse        = useRef({ x: -300, y: -300 })
  const dotPos       = useRef({ x: -300, y: -300 })
  const ringPos      = useRef({ x: -300, y: -300 })
  const spotPos      = useRef({ x: -300, y: -300 })
  const lastSpawn    = useRef({ x: -9999, y: -9999 })
  const activeCount  = useRef(0)
  const nodes        = useRef<TrailNode[]>([])
  const rafId        = useRef(0)
  const isInHero     = useRef(false)
  const isInteract   = useRef(false)
  const isVisible    = useRef(false)

  /* ── Preload icons ── */
  useEffect(() => {
    ICON_POOL.slice(0, 8).forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const spawnIcon = useCallback((localX: number, localY: number) => {
    const trailOverlay = document.getElementById('trail-overlay')
    if (!trailOverlay) return
    if (activeCount.current >= HARD_CAP) return

    const offsetX = rand(-18, 18)
    const offsetY = rand(-18, 18)
    const rot     = rand(-14, 14)
    const rotEnd  = rand(-6, 6)
    const scale   = rand(0.94, 1.08)
    const lifetime = rand(900, 1300)

    const icon  = randomIcon()
    const color = randomColor()
    const el = document.createElement('div')
    el.style.cssText = `
      position: absolute;
      width:  ${ICON_SIZE}px;
      height: ${ICON_SIZE}px;
      left:   ${localX + offsetX - ICON_SIZE / 2}px;
      top:    ${localY + offsetY - ICON_SIZE / 2}px;
      opacity: 0;
      transform: scale(0.52) rotate(${rot}deg);
      pointer-events: none;
      user-select: none;
      background-color: ${color};
      -webkit-mask: url("${icon}") center / contain no-repeat;
      mask: url("${icon}") center / contain no-repeat;
      filter: drop-shadow(0 0 7px ${color}99);
      will-change: opacity, transform;
      transition:
        opacity  0.35s cubic-bezier(0.22,1,0.36,1),
        transform 0.35s cubic-bezier(0.22,1,0.36,1);
    `
    trailOverlay.appendChild(el)
    activeCount.current++

    // Animate in on next frame
    requestAnimationFrame(() => {
      el.style.opacity    = '0.85'
      el.style.transform  = `scale(${scale}) rotate(${rotEnd}deg)`
    })

    // Start fade-out after 38% of lifetime
    const exitTimer = setTimeout(() => {
      el.style.transition = `opacity ${lifetime * 0.62}ms ease, transform ${lifetime * 0.62}ms ease`
      el.style.opacity   = '0'
      el.style.transform = `scale(0.88) rotate(${rotEnd * 1.4}deg)`
    }, lifetime * 0.38)

    // Remove from DOM
    const removeTimer = setTimeout(() => {
      el.remove()
      activeCount.current = Math.max(0, activeCount.current - 1)
      nodes.current = nodes.current.filter((n) => n.el !== el)
    }, lifetime)

    nodes.current.push({ el, exitTimer, removeTimer })

    // Enforce soft cap — remove oldest if exceeded
    if (activeCount.current > MAX_ACTIVE) {
      const oldest = nodes.current.shift()
      if (oldest) {
        clearTimeout(oldest.exitTimer)
        clearTimeout(oldest.removeTimer)
        oldest.el.remove()
        activeCount.current = Math.max(0, activeCount.current - 1)
      }
    }
  }, [])

  useEffect(() => {
    // Disable on touch / mobile / reduced motion
    const isTouch   = window.matchMedia('(pointer: coarse)').matches
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || isReduced || window.innerWidth < 768) return

    isVisible.current = true
    if (dotRef.current)  dotRef.current.style.opacity  = '0'
    if (ringRef.current) ringRef.current.style.opacity = '0'
    if (spotRef.current) spotRef.current.style.opacity = '0'

    /* ── Mouse move ── */
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      // Dot is instant — update its position directly from the event (zero lag)
      dotPos.current.x = e.clientX
      dotPos.current.y = e.clientY

      if (!dotRef.current)  return
      dotRef.current.style.opacity  = '1'
      ringRef.current!.style.opacity = '1'

      const heroEl = document.getElementById('hero-zone')
      if (!heroEl) { isInHero.current = false; return }
      const rect   = heroEl.getBoundingClientRect()
      const localX = e.clientX - rect.left
      const localY = e.clientY - rect.top
      const inside = localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height

      if (inside !== isInHero.current) isInHero.current = inside
      if (!inside) return

      // Spawn check
      const dx   = localX - lastSpawn.current.x
      const dy   = localY - lastSpawn.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist >= SPAWN_THRESHOLD) {
        lastSpawn.current = { x: localX, y: localY }
        spawnIcon(localX, localY)
      }
    }

    /* ── Interactive hover ── */
    const onOver = (e: Event) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"]')) {
        isInteract.current = true
      }
    }
    const onOut = (e: Event) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"]')) {
        isInteract.current = false
      }
    }

    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
      isInHero.current = false
    }

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout',  onOut)

    /* ── RAF loop: smooth cursor follow ── */
    const tick = () => {
      const dot  = dotRef.current
      const ring = ringRef.current
      const spot = spotRef.current

      // Inner dot — exact mouse position (updated directly in mousemove, no lerp here)
      if (dot) {
        const s = isInteract.current ? 'scale(2.0)' : 'scale(1)'
        dot.style.transform = `translate(${dotPos.current.x - 6}px, ${dotPos.current.y - 6}px) ${s}`
      }

      // Outer ring — smooth follower, lags behind the dot
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.18)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.18)
      if (ring) {
        const sz = isInteract.current ? 24 : 36
        ring.style.width  = `${sz}px`
        ring.style.height = `${sz}px`
        ring.style.transform = `translate(${ringPos.current.x - sz / 2}px, ${ringPos.current.y - sz / 2}px)`
        ring.style.borderColor = isInteract.current
          ? 'rgba(0,229,255,0.9)'
          : 'rgba(0,229,255,0.45)'
      }

      // Spotlight — hero only, very slow
      if (spot) {
        if (isInHero.current) {
          spotPos.current.x = lerp(spotPos.current.x, mouse.current.x, 0.065)
          spotPos.current.y = lerp(spotPos.current.y, mouse.current.y, 0.065)
          spot.style.opacity   = '1'
          spot.style.transform = `translate(${spotPos.current.x - 270}px, ${spotPos.current.y - 270}px)`
        } else {
          spot.style.opacity = '0'
        }
      }

      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout',  onOut)
      cancelAnimationFrame(rafId.current)
      // Cleanup any lingering trail nodes
      nodes.current.forEach((n) => {
        clearTimeout(n.exitTimer)
        clearTimeout(n.removeTimer)
        n.el.remove()
      })
      nodes.current = []
      activeCount.current = 0
    }
  }, [spawnIcon])

  return (
    <>
      {/* Inner cursor dot */}
      <div ref={dotRef}  className="cursor-dot" />
      {/* Outer cursor ring */}
      <div ref={ringRef} className="cursor-ring" />
      {/* Spotlight — follows cursor inside hero */}
      <div ref={spotRef} className="cursor-spotlight" />
    </>
  )
}
