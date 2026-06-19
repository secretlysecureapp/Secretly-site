/* Ambient PCB circuit backdrop. Faint traces; a bright pulse runs along a
   few of them rarely (every ~16s per trace, staggered) — "редко но метко".
   Pure SVG + CSS (see visuals.css), fixed behind all content, reduced-motion
   aware. pathLength=1 lets the dash math be path-length-independent. */

const TRACES = [
  'M-40 160 H240 V320 H540',
  'M1480 200 H1180 V400 H980 V300 H720',
  'M-40 720 H180 V560 H440 V690 H760',
  'M1480 760 H1240 V600 H1020 V700 H860',
  'M700 -40 V120 H900 V280',
  'M360 940 V800 H560 V860',
]

const NODES: Array<[number, number]> = [
  [240, 320], [540, 320], [980, 300], [720, 300],
  [180, 560], [440, 560], [900, 120], [560, 800], [1020, 700],
]

/* Which traces carry a pulse, with staggered timing for rare, off-beat firing. */
const PULSES = [
  { d: TRACES[0], delay: '0s',   dur: '15s' },
  { d: TRACES[1], delay: '4.5s', dur: '17s' },
  { d: TRACES[2], delay: '9s',   dur: '16s' },
  { d: TRACES[4], delay: '12.5s', dur: '18s' },
]

export default function CircuitField() {
  return (
    <div className="circuit-field" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        {TRACES.map((d, i) => <path key={i} className="circuit-trace" d={d} />)}
        {NODES.map(([cx, cy], i) => <circle key={i} className="circuit-node" cx={cx} cy={cy} r={3} />)}
        {PULSES.map((p, i) => (
          <path key={i} className="circuit-pulse" d={p.d} pathLength={1}
            style={{ animationDelay: p.delay, animationDuration: p.dur }} />
        ))}
      </svg>
    </div>
  )
}
