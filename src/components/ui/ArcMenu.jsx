import { useState, useEffect, useMemo } from 'react'
import {
  LayoutDashboard, User, GitBranch, ListChecks,
  Trophy, Archive, Globe,
} from 'lucide-react'

const NAV = [
  { id: 'menu',         icon: LayoutDashboard, label: 'MAIN MENU'    },
  { id: 'profile',      icon: User,            label: 'PROFILE'      },
  { id: 'skills',       icon: GitBranch,       label: 'SKILL TREE'   },
  { id: 'quests',       icon: ListChecks,      label: 'QUEST LOG'    },
  { id: 'achievements', icon: Trophy,          label: 'ACHIEVEMENTS' },
  { id: 'inventory',    icon: Archive,         label: 'INVENTORY'    },
  { id: 'connections',  icon: Globe,           label: 'CONNECTIONS'  },
]

const N      = NAV.length
const ARC_H  = 520
const CY     = ARC_H / 2   // 260

const toRad = d => d * Math.PI / 180

// Each breakpoint gets its own geometry so vertical spacing stays comfortable.
// Desktop (≥1024px): R=520, max_rx=350, content needs ~370px left padding.
// Tablet  (768-1024px): R=400, max_rx=280, content needs ~300px left padding.
function getGeo(winW) {
  if (winW < 1024) return { R: 400, CX: -120, SLAB_W: 145, SLAB_H: 46, A_S: -28, A_E: 28 }
  return                  { R: 520, CX: -170,  SLAB_W: 168, SLAB_H: 50, A_S: -24, A_E: 24 }
}

// rx = right-edge x of each slab (where it contacts the arc spine).
function computeSlabs(CX, R, A_S, A_E) {
  return NAV.map((_, i) => {
    const deg = A_S + (A_E - A_S) * (i / (N - 1))
    const rad = toRad(deg)
    return { rx: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
  })
}

// Clockwise arc (sweep=1) → "D" shape opening right.
function makeArcD(CX, R, a1, a2) {
  const x1 = (CX + R * Math.cos(toRad(a1))).toFixed(2)
  const y1 = (CY + R * Math.sin(toRad(a1))).toFixed(2)
  const x2 = (CX + R * Math.cos(toRad(a2))).toFixed(2)
  const y2 = (CY + R * Math.sin(toRad(a2))).toFixed(2)
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`
}

export function ArcMenu({ currentScreen, setCurrentScreen }) {
  const [winW, setWinW] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { R, CX, SLAB_W, SLAB_H, A_S, A_E } = useMemo(() => getGeo(winW), [winW])

  const containerW = Math.round(CX + R + 20)   // = max_rx + 20

  const slabs    = useMemo(() => computeSlabs(CX, R, A_S, A_E), [CX, R, A_S, A_E])
  const outerArc = useMemo(() => makeArcD(CX, R,      A_S - 3, A_E + 3), [CX, R, A_S, A_E])
  const innerArc = useMemo(() => makeArcD(CX, R - 26, A_S - 3, A_E + 3), [CX, R, A_S, A_E])
  const glowArc  = useMemo(() => makeArcD(CX, R - 10, A_S - 3, A_E + 3), [CX, R, A_S, A_E])

  return (
    <div
      aria-label="Site navigation"
      className="hidden md:block"
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: containerW,
        height: ARC_H,
        zIndex: 25,
        pointerEvents: 'none',
      }}
    >
      {/* ── SVG arc spine ── */}
      <svg
        width={containerW}
        height={ARC_H}
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* soft glow band */}
        <path d={glowArc}  stroke="rgba(0,240,192,0.07)" strokeWidth="18" fill="none" />
        {/* outer dashed spine */}
        <path
          d={outerArc}
          stroke="rgba(0,240,192,0.30)"
          strokeWidth="2"
          strokeDasharray="4 5"
          strokeLinecap="round"
          fill="none"
        />
        {/* inner depth arc */}
        <path
          d={innerArc}
          stroke="rgba(0,240,192,0.09)"
          strokeWidth="1.5"
          strokeDasharray="2 9"
          fill="none"
        />
        {/* node dots */}
        {slabs.map(({ rx, y }, i) => (
          <g key={i}>
            <circle cx={rx.toFixed(2)} cy={y.toFixed(2)} r="7"   fill="rgba(0,240,192,0.05)" />
            <circle cx={rx.toFixed(2)} cy={y.toFixed(2)} r="3.8" fill="rgba(0,240,192,0.22)" />
            <circle cx={rx.toFixed(2)} cy={y.toFixed(2)} r="1.8" fill="rgba(0,240,192,0.65)" />
          </g>
        ))}
      </svg>

      {/* ── slab buttons ── */}
      {NAV.map((item, i) => {
        const { rx, y } = slabs[i]
        const Icon = item.icon
        const isActive = currentScreen === item.id
        const leftX = Math.max(0, Math.round(rx) - SLAB_W)

        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`arc-slab${isActive ? ' arc-slab--active' : ''}`}
            style={{
              position: 'absolute',
              left:   leftX,
              top:    Math.round(y - SLAB_H / 2),
              width:  SLAB_W,
              height: SLAB_H,
              pointerEvents: 'auto',
            }}
          >
            <Icon size={15} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
