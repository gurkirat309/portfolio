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

const N       = NAV.length
const A_START = 228   // angle for i=0  →  top of arc
const A_END   = 132   // angle for i=N-1 → bottom of arc
const SLAB_H  = 46
const ARC_H   = 480   // fixed container height
const CY      = ARC_H / 2   // 240

const toRad = d => d * Math.PI / 180

// choose geometry based on viewport width
function getGeo(winW) {
  if (winW < 1024) return { R: 220, CX: 320, SLAB_W: 150 }
  return                  { R: 290, CX: 400, SLAB_W: 178 }
}

// slab positions along the arc (computed once per geometry)
function computeSlabs(CX, R) {
  return NAV.map((_, i) => {
    const deg = A_START + (A_END - A_START) * (i / (N - 1))
    const rad = toRad(deg)
    return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
  })
}

// SVG "A" arc path — counter-clockwise (sweep=0) from angle a1 → a2
function makeArcD(CX, R, a1, a2) {
  const x1 = (CX + R * Math.cos(toRad(a1))).toFixed(2)
  const y1 = (CY + R * Math.sin(toRad(a1))).toFixed(2)
  const x2 = (CX + R * Math.cos(toRad(a2))).toFixed(2)
  const y2 = (CY + R * Math.sin(toRad(a2))).toFixed(2)
  // large-arc=0 (span <180°), sweep=0 (CCW → left arc)
  return `M ${x1} ${y1} A ${R} ${R} 0 0 0 ${x2} ${y2}`
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

  const { R, CX, SLAB_W } = useMemo(() => getGeo(winW), [winW])
  const containerW = CX + 30

  const slabs    = useMemo(() => computeSlabs(CX, R), [CX, R])
  const outerArc = useMemo(() => makeArcD(CX, R,      230, 130), [CX, R])
  const innerArc = useMemo(() => makeArcD(CX, R - 18, 230, 130), [CX, R])

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
        {/* outer dashed spine */}
        <path
          d={outerArc}
          stroke="rgba(0,240,192,0.18)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
          strokeLinecap="round"
          fill="none"
        />
        {/* inner depth arc */}
        <path
          d={innerArc}
          stroke="rgba(0,240,192,0.07)"
          strokeWidth="1"
          strokeDasharray="2 8"
          fill="none"
        />
        {/* node dots at each slab anchor */}
        {slabs.map((pos, i) => (
          <g key={i}>
            <circle cx={pos.x.toFixed(2)} cy={pos.y.toFixed(2)} r="4"   fill="rgba(0,240,192,0.06)" />
            <circle cx={pos.x.toFixed(2)} cy={pos.y.toFixed(2)} r="2.2" fill="rgba(0,240,192,0.22)" />
            <circle cx={pos.x.toFixed(2)} cy={pos.y.toFixed(2)} r="1"   fill="rgba(0,240,192,0.55)" />
          </g>
        ))}
      </svg>

      {/* ── slab buttons ── */}
      {NAV.map((item, i) => {
        const { x, y } = slabs[i]
        const Icon = item.icon
        const isActive = currentScreen === item.id

        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`arc-slab${isActive ? ' arc-slab--active' : ''}`}
            style={{
              position: 'absolute',
              left: Math.round(x),
              top:  Math.round(y - SLAB_H / 2),
              width:  SLAB_W,
              height: SLAB_H,
              pointerEvents: 'auto',
            }}
          >
            <Icon size={14} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
