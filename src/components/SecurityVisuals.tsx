import { useTranslation } from 'react-i18next'

/* ════════════════════════════════════════════════════════════════
   Hand-built inline-SVG "proof" graphics. No images, no deps — crisp
   at any size, themed via CSS (see visuals.css), animated with CSS
   only (SSR-safe, reduced-motion aware). Labels are localized.
   ════════════════════════════════════════════════════════════════ */

/* A phone showing a readable conversation (used at both ends). */
function Phone({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <rect className="sv-node" x={x} y={48} width={104} height={168} rx={18} />
      <rect className="sv-screen" x={x + 12} y={62} width={80} height={140} rx={10} />
      {/* incoming (neutral) bubble */}
      <rect x={x + 22} y={80} width={44} height={20} rx={8} fill="rgba(255,255,255,0.10)" />
      <line className="sv-bubble-line" x1={x + 30} y1={90} x2={x + 56} y2={90} stroke="rgba(255,255,255,0.45)" />
      {/* outgoing (accent) bubble — readable */}
      <rect className="sv-bubble" x={x + 40} y={112} width={44} height={22} rx={8} />
      <line className="sv-bubble-line" x1={x + 48} y1={120} x2={x + 76} y2={120} />
      <line className="sv-bubble-line" x1={x + 48} y1={127} x2={x + 66} y2={127} />
      {/* a third short line */}
      <rect x={x + 22} y={146} width={36} height={16} rx={7} fill="rgba(255,255,255,0.10)" />
      <text className="sv-label" x={x + 52} y={238} textAnchor="middle">{label}</text>
    </g>
  )
}

/* Padlock badge sitting on the wire. */
function Lock({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle className="sv-lock-ring" cx={cx} cy={cy} r={19} />
      <rect className="sv-lock-body" x={cx - 7} y={cy - 1} width={14} height={11} rx={2.5} />
      <path className="sv-lock" d={`M${cx - 4.5} ${cy - 1} v-3.5 a4.5 4.5 0 0 1 9 0 V${cy - 1}`} />
    </g>
  )
}

/* ── E2EE FLOW: readable on both ends, ciphertext in the middle ── */
export function EncryptionFlow() {
  const { t } = useTranslation()
  return (
    <div className="sv-wrap">
      <svg className="sv" viewBox="0 0 820 250" role="img"
        aria-label="A message is readable on your device and the recipient's device, but the relay server in between sees only ciphertext.">
        <defs>
          <linearGradient id="sv-scan-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* wires (behind) */}
        <line className="sv-track" x1={128} y1={132} x2={322} y2={132} />
        <line className="sv-track" x1={498} y1={132} x2={692} y2={132} />
        <line className="sv-flow"  x1={128} y1={132} x2={322} y2={132} />
        <line className="sv-flow"  x1={498} y1={132} x2={692} y2={132} />

        {/* devices */}
        <Phone x={24} label={t('visuals.you')} />
        <Phone x={692} label={t('visuals.recipient')} />

        {/* relay server — sees only ciphertext */}
        <rect className="sv-node" x={322} y={80} width={176} height={104} rx={16} fill="var(--bg-elevated)" />
        <clipPath id="sv-srv-clip"><rect x={322} y={80} width={176} height={104} rx={16} /></clipPath>
        <g clipPath="url(#sv-srv-clip)">
          <text className="sv-cipher" x={338} y={112}>9f3a 7c21 e0d4</text>
          <text className="sv-cipher" x={338} y={134}>b18e 4a02 ff6c</text>
          <text className="sv-cipher" x={338} y={156}>2d75 c9a1 30be</text>
          <rect className="sv-scan" x={322} y={80} width={60} height={104} />
        </g>
        {/* blind indicator */}
        <g transform="translate(476, 96)">
          <circle cx={0} cy={0} r={13} fill="var(--bg-surface)" stroke="var(--border)" strokeWidth={1.5} />
          <path className="sv-eye" d="M-6 0 q6 -6 12 0 q-6 6 -12 0Z" />
          <circle cx={0} cy={0} r={1.8} fill="#ef5350" />
          <line className="sv-eye" x1={-7} y1={-7} x2={7} y2={7} />
        </g>
        <text className="sv-label" x={410} y={206} textAnchor="middle">{t('visuals.relay')}</text>
        <text className="sv-sub"   x={410} y={224} textAnchor="middle">{t('visuals.ciphertext')}</text>

        {/* locks on the wire */}
        <Lock cx={225} cy={132} />
        <Lock cx={595} cy={132} />
      </svg>
    </div>
  )
}

/* ── KEY RATCHET: a fresh key per message (forward secrecy) ── */
function KeyGlyph({ cx, cy, dim, pop }: { cx: number; cy: number; dim?: boolean; pop?: boolean }) {
  return (
    <g className={`${dim ? 'sv-key-old' : ''}`}>
      <g className={pop ? 'sv-pop' : ''}>
        <circle className="sv-key-fill" cx={cx} cy={cy} r={30} />
        <g transform={`translate(${cx - 11}, ${cy - 11})`}>
          <circle className="sv-key" cx={7} cy={7} r={6} />
          <path className="sv-key" d="M11.5 11.5 L21 21" />
          <path className="sv-key" d="M17 17 l3 -3" />
          <path className="sv-key" d="M20 20 l2.5 -2.5" />
        </g>
      </g>
    </g>
  )
}

export function KeyRatchet() {
  const { t } = useTranslation()
  const xs = [100, 310, 520, 730]
  const labels = [1, 2, 3, 4].map((n) => `${t('visuals.message')} ${n}`)
  return (
    <div className="sv-wrap">
      <svg className="sv" viewBox="0 0 820 150" role="img"
        aria-label="Each message uses a brand-new key, derived in a one-way chain, so old keys can never unlock new messages.">
        <defs>
          <marker id="sv-arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M1 1 L6 4 L1 7" fill="none" stroke="var(--text-muted)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {xs.slice(0, -1).map((x, i) => (
          <line key={i} className="sv-arrow" x1={x + 34} y1={60} x2={xs[i + 1] - 34} y2={60} />
        ))}
        {xs.map((x, i) => (
          <g key={i}>
            <KeyGlyph cx={x} cy={60} dim={i < xs.length - 1} pop={i === xs.length - 1} />
            <text className="sv-sub" x={x} y={118} textAnchor="middle">{labels[i]}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
