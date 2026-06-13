import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'gurkirat_os_operator_v2'

// XP required to advance FROM `level` TO `level + 1`.
const xpToNext = (level) => 80 + level * 70

// Operator rank tiers, keyed by minimum level reached.
export const RANKS = [
  { min: 1,  name: 'INITIATE',   color: '#8aa0b0' },
  { min: 3,  name: 'OPERATIVE',  color: '#00f0c0' },
  { min: 5,  name: 'SPECIALIST', color: '#0080ff' },
  { min: 7,  name: 'VANGUARD',   color: '#6040c0' },
  { min: 9,  name: 'LEGEND',     color: '#ffaa00' },
]

export function rankForLevel(level) {
  let r = RANKS[0]
  for (const rank of RANKS) if (level >= rank.min) r = rank
  return r
}

// Meta achievements the *visitor* earns by exploring. Distinct from Gurkirat's
// career achievements in data/achievements.js.
export const OPERATOR_ACHIEVEMENTS = [
  { id: 'first-contact', name: 'FIRST CONTACT', desc: 'Boot GURKIRAT.OS',        icon: 'power',       xp: 0,   secret: false },
  { id: 'explorer',      name: 'EXPLORER',      desc: 'Discover 3 sectors',       icon: 'compass',     xp: 100, secret: false },
  { id: 'cartographer',  name: 'CARTOGRAPHER',  desc: 'Discover every sector',    icon: 'map',         xp: 300, secret: false },
  { id: 'scholar',       name: 'SCHOLAR',       desc: 'Scan 5 skill nodes',       icon: 'book-open',   xp: 120, secret: false },
  { id: 'open-channel',  name: 'OPEN CHANNEL',  desc: 'Establish a contact link', icon: 'radio',       xp: 80,  secret: false },
  { id: 'ascendant',     name: 'ASCENDANT',     desc: 'Reach Operator Level 5',   icon: 'trending-up', xp: 0,   secret: true  },
]

// Compute level + progress from total accumulated XP.
export function computeLevel(totalXp) {
  let level = 1
  let remaining = totalXp
  while (remaining >= xpToNext(level)) {
    remaining -= xpToNext(level)
    level += 1
  }
  return { level, into: remaining, need: xpToNext(level) }
}

const GameContext = createContext(null)

function loadInitial() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function GameProvider({ children }) {
  const saved = loadInitial()

  const [xp, setXp] = useState(saved?.xp ?? 0)
  const [discovered, setDiscovered] = useState(saved?.discovered ?? [])
  const [unlocked, setUnlocked] = useState(saved?.unlocked ?? [])
  const [awarded, setAwarded] = useState(saved?.awarded ?? [])
  const [events, setEvents] = useState([])

  // Ref mirror = synchronous source of truth for dedupe guards (survives
  // React StrictMode double-invocation and avoids stale-closure double counts).
  const ref = useRef({
    xp: saved?.xp ?? 0,
    level: computeLevel(saved?.xp ?? 0).level,
    discovered: saved?.discovered ?? [],
    unlocked: saved?.unlocked ?? [],
    awarded: saved?.awarded ?? [],
  })
  const eventId = useRef(0)

  const persist = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        xp: ref.current.xp,
        discovered: ref.current.discovered,
        unlocked: ref.current.unlocked,
        awarded: ref.current.awarded,
      }))
    } catch { /* storage unavailable — degrade silently */ }
  }, [])

  const pushEvent = useCallback((evt) => {
    const id = ++eventId.current
    setEvents(prev => [...prev, { id, ...evt }])
  }, [])

  const dismissEvent = useCallback((id) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  // forward declarations via refs so callbacks can call each other
  const unlockRef = useRef(null)

  const grantXP = useCallback((amount, label) => {
    if (!amount && amount !== 0) return
    const before = ref.current.level
    ref.current.xp += amount
    setXp(ref.current.xp)
    if (amount > 0) pushEvent({ kind: 'xp', amount, label })

    const after = computeLevel(ref.current.xp).level
    if (after > before) {
      ref.current.level = after
      const rank = rankForLevel(after)
      pushEvent({ kind: 'levelup', level: after, rank })
      if (after >= 5) unlockRef.current?.('ascendant')
    }
    persist()
  }, [pushEvent, persist])

  const unlock = useCallback((id) => {
    if (ref.current.unlocked.includes(id)) return false
    const ach = OPERATOR_ACHIEVEMENTS.find(a => a.id === id)
    if (!ach) return false
    ref.current.unlocked = [...ref.current.unlocked, id]
    setUnlocked(ref.current.unlocked)
    pushEvent({ kind: 'achievement', achievement: ach })
    persist()
    if (ach.xp) grantXP(ach.xp, 'ACHIEVEMENT BONUS')
    return true
  }, [pushEvent, persist, grantXP])

  useEffect(() => { unlockRef.current = unlock }, [unlock])

  const checkMilestones = useCallback(() => {
    const d = ref.current.discovered.length
    if (d >= 3) unlock('explorer')
    if (d >= 7) unlock('cartographer')

    const skillScans = ref.current.awarded.filter(k => k.startsWith('skill:')).length
    if (skillScans >= 5) unlock('scholar')

    if (ref.current.awarded.some(k => k.startsWith('link:'))) unlock('open-channel')
  }, [unlock])

  const discover = useCallback((screenId) => {
    if (ref.current.discovered.includes(screenId)) return
    ref.current.discovered = [...ref.current.discovered, screenId]
    setDiscovered(ref.current.discovered)
    grantXP(120, 'SECTOR DISCOVERED')
    checkMilestones()
  }, [grantXP, checkMilestones])

  // Generic dedupe-and-reward. Returns true the first time a key is awarded.
  const award = useCallback((key, amount, label) => {
    if (ref.current.awarded.includes(key)) return false
    ref.current.awarded = [...ref.current.awarded, key]
    setAwarded(ref.current.awarded)
    grantXP(amount, label)
    checkMilestones()
    return true
  }, [grantXP, checkMilestones])

  // First-contact achievement on first ever boot.
  useEffect(() => {
    unlock('first-contact')
  }, [unlock])

  const { level, into, need } = computeLevel(xp)

  const value = {
    xp, level, into, need,
    rank: rankForLevel(level),
    discovered, unlocked, awarded,
    discover, award, unlock, grantXP,
    isDiscovered: (id) => discovered.includes(id),
    isAwarded: (key) => awarded.includes(key),
    isUnlocked: (id) => unlocked.includes(id),
    events, dismissEvent,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}
