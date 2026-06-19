/* Animated 3D-ish "principle" scenes for the home feature cards. Each shows
   how the feature works (messages flying, sound waves, lock closing, sync
   pulse, …). Pure SVG + CSS (see visuals.css .fscene / .fs-*). The .fscene
   wrapper adds the perspective tilt + float; per-scene motion shows the idea. */

const VB = '0 0 72 72'

const SCENES = [
  // 0 — Private chats: bubbles pop in, back and forth
  <svg viewBox={VB} key="chat">
    <g className="fs-pop">
      <rect className="fs-pl" x="6" y="33" width="40" height="22" rx="9" />
      <line className="fs-line" x1="13" y1="41" x2="36" y2="41" />
      <line className="fs-line" x1="13" y1="47" x2="29" y2="47" />
    </g>
    <g className="fs-pop" style={{ animationDelay: '1.6s' }}>
      <rect className="fs-acc" x="26" y="11" width="40" height="22" rx="9" />
      <line x1="33" y1="19" x2="58" y2="19" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <line x1="33" y1="25" x2="50" y2="25" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    </g>
  </svg>,

  // 1 — Voice calls: mic with sound waves
  <svg viewBox={VB} key="voice">
    <circle className="fs-acc-s fs-wave" cx="36" cy="32" r="10" style={{ animationDelay: '0s' }} />
    <circle className="fs-acc-s fs-wave" cx="36" cy="32" r="10" style={{ animationDelay: '0.9s' }} />
    <circle className="fs-acc-s fs-wave" cx="36" cy="32" r="10" style={{ animationDelay: '1.8s' }} />
    <rect className="fs-acc" x="30" y="20" width="12" height="22" rx="6" />
    <path className="fs-acc-s" d="M24 36a12 12 0 0 0 24 0" />
    <line className="fs-acc-s" x1="36" y1="48" x2="36" y2="56" />
    <line className="fs-acc-s" x1="29" y1="56" x2="43" y2="56" />
  </svg>,

  // 2 — Video calls: screen, lens, rec dot, scan
  <svg viewBox={VB} key="video">
    <rect className="fs-pl" x="12" y="20" width="38" height="32" rx="6" />
    <path className="fs-acc" d="M52 28l11-6v28l-11-6z" />
    <circle className="fs-acc fs-blink" cx="20" cy="27" r="3" />
    <line className="fs-glow fs-scan" x1="16" y1="36" x2="46" y2="36" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
  </svg>,

  // 3 — Group calls: connected avatars + traveling pulse
  <svg viewBox={VB} key="group">
    <path className="fs-dim-s" d="M20 26L52 26M20 26L36 50M52 26L36 50" />
    <circle className="fs-acc" cx="20" cy="26" r="7" />
    <circle className="fs-acc" cx="52" cy="26" r="7" />
    <circle className="fs-acc" cx="36" cy="50" r="7" />
    <circle className="fs-glow fs-travel" cx="36" cy="26" r="3" fill="#fff" />
  </svg>,

  // 4 — File sharing: document lifts and transfers
  <svg viewBox={VB} key="file">
    <path className="fs-pl" d="M22 30h20l8 8v18a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2z" opacity="0.32" />
    <g className="fs-lift">
      <path className="fs-acc" d="M22 30h20l8 8v18a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2z" />
      <path d="M42 30v8h8" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2" />
      <line x1="27" y1="46" x2="45" y2="46" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="27" y1="52" x2="40" y2="52" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </g>
  </svg>,

  // 5 — Total anonymity: incognito hat + glasses, shimmering
  <svg viewBox={VB} key="anon">
    <path className="fs-acc fs-shimmer" d="M26 18h20a3 3 0 0 1 3 3v8H23v-8a3 3 0 0 1 3-3z" />
    <line className="fs-acc-s fs-shimmer" x1="16" y1="30" x2="56" y2="30" />
    <circle className="fs-acc fs-shimmer" cx="27" cy="44" r="8" />
    <circle className="fs-acc fs-shimmer" cx="45" cy="44" r="8" />
    <line className="fs-acc-s fs-shimmer" x1="35" y1="44" x2="37" y2="44" />
  </svg>,

  // 6 — Multi-platform: phone + laptop with sync pulse
  <svg viewBox={VB} key="multi">
    <rect className="fs-acc-s" x="10" y="22" width="16" height="28" rx="3" />
    <line className="fs-acc-s" x1="15" y1="46" x2="21" y2="46" />
    <rect className="fs-acc-s" x="40" y="24" width="22" height="15" rx="2" />
    <path className="fs-acc-s" d="M37 45h28l-2-6H39z" />
    <path className="fs-dim-s" d="M27 34h13" />
    <circle className="fs-acc fs-glow fs-travel" cx="33" cy="34" r="3" />
  </svg>,

  // 7 — Hidden chats: padlock closing
  <svg viewBox={VB} key="lock">
    <path className="fs-acc-s fs-lock" d="M27 37v-7a9 9 0 0 1 18 0v7" />
    <rect className="fs-acc" x="22" y="37" width="28" height="22" rx="4" />
    <circle cx="36" cy="46" r="3" fill="rgba(0,0,0,0.4)" />
    <rect x="34.6" y="47" width="2.8" height="6" rx="1.4" fill="rgba(0,0,0,0.4)" />
  </svg>,

  // 8 — Panic button: ripples + pressing alert
  <svg viewBox={VB} key="panic">
    <circle className="fs-acc-s fs-wave" cx="36" cy="36" r="14" style={{ animationDelay: '0s' }} />
    <circle className="fs-acc-s fs-wave" cx="36" cy="36" r="14" style={{ animationDelay: '1.1s' }} />
    <circle className="fs-acc fs-press" cx="36" cy="36" r="13" />
    <line x1="36" y1="30" x2="36" y2="38" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    <circle cx="36" cy="43" r="2" fill="#fff" />
  </svg>,
]

export default function FeatureScene({ type }: { type: number }) {
  return <div className="fscene" aria-hidden="true">{SCENES[type % SCENES.length]}</div>
}
