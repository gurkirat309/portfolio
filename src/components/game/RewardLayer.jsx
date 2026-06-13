import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { useGame } from '../../context/GameContext'

function toPascalCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

// One reward event auto-expires itself, then tells the context to drop it.
function useAutoDismiss(id, ms) {
  const { dismissEvent } = useGame()
  useEffect(() => {
    const t = setTimeout(() => dismissEvent(id), ms)
    return () => clearTimeout(t)
  }, [id, ms, dismissEvent])
}

function XpPopup({ event }) {
  useAutoDismiss(event.id, 1800)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30, scale: 0.85 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.9 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-sm self-end"
      style={{
        background: 'rgba(7,10,15,0.92)',
        border: '1px solid rgba(0,240,192,0.4)',
        boxShadow: '0 0 18px rgba(0,240,192,0.18)',
      }}
    >
      <span className="font-orbitron text-[12px] font-bold text-cyan">+{event.amount}</span>
      <span className="font-orbitron text-[8px] tracking-[2px] text-cyan/60">XP</span>
      {event.label && (
        <span className="font-orbitron text-[8px] tracking-[2px] text-text-muted uppercase border-l border-cyan/20 pl-2">
          {event.label}
        </span>
      )}
    </motion.div>
  )
}

function AchievementToast({ event }) {
  useAutoDismiss(event.id, 4200)
  const ach = event.achievement
  const Icon = LucideIcons[toPascalCase(ach.icon)] || LucideIcons.Award

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="relative flex items-center gap-3 pr-5 pl-3 py-2.5 rounded-sm overflow-hidden self-end"
      style={{
        background: 'rgba(7,10,15,0.96)',
        border: '1px solid rgba(255,170,0,0.5)',
        boxShadow: '0 0 26px rgba(255,170,0,0.18)',
        minWidth: 250,
      }}
    >
      <div className="reward-sheen absolute inset-0 pointer-events-none" />
      <div
        className="flex-shrink-0 w-9 h-9 rounded-sm flex items-center justify-center"
        style={{ background: 'rgba(255,170,0,0.1)', border: '1px solid rgba(255,170,0,0.4)' }}
      >
        <Icon size={17} className="text-gold" />
      </div>
      <div className="min-w-0">
        <div className="font-orbitron text-[8px] tracking-[3px] text-gold/70 uppercase mb-0.5">
          ◈ ACHIEVEMENT UNLOCKED
        </div>
        <div className="font-orbitron text-[11px] text-text-bright tracking-wide leading-none">
          {ach.name}
        </div>
        <div className="font-rajdhani text-[11px] text-text-muted mt-0.5">{ach.desc}</div>
      </div>
    </motion.div>
  )
}

function LevelUpFlash({ event }) {
  useAutoDismiss(event.id, 2600)
  return (
    <motion.div
      className="fixed inset-0 z-[55] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* radial flash */}
      <motion.div
        className="absolute"
        style={{
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${event.rank.color}22 0%, transparent 60%)`,
        }}
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      {/* expanding ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ border: `1px solid ${event.rank.color}` }}
        initial={{ width: 80, height: 80, opacity: 0.8 }}
        animate={{ width: 520, height: 520, opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <motion.div
        className="relative text-center"
        initial={{ scale: 0.7, y: 14, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <div className="font-orbitron text-[10px] tracking-[8px] text-cyan/70 uppercase mb-2">
          OPERATOR SYNC INCREASED
        </div>
        <div
          className="font-orbitron font-black tracking-[6px] leading-none"
          style={{ fontSize: 56, color: '#e0f0ff', textShadow: `0 0 30px ${event.rank.color}` }}
        >
          LEVEL {event.level}
        </div>
        <div
          className="inline-block mt-3 font-orbitron text-[11px] tracking-[5px] px-4 py-1.5 rounded-sm uppercase"
          style={{ color: event.rank.color, border: `1px solid ${event.rank.color}66`, background: `${event.rank.color}11` }}
        >
          RANK // {event.rank.name}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function RewardLayer() {
  const { events } = useGame()

  const xpEvents = events.filter(e => e.kind === 'xp')
  const achEvents = events.filter(e => e.kind === 'achievement')
  const levelEvents = events.filter(e => e.kind === 'levelup')

  return (
    <>
      {/* XP popups — top-right, under the HUD */}
      <div className="fixed right-4 z-50 flex flex-col items-end gap-1.5 pointer-events-none" style={{ top: 62 }}>
        <AnimatePresence>
          {xpEvents.map(e => <XpPopup key={e.id} event={e} />)}
        </AnimatePresence>
      </div>

      {/* Achievement banners — right side, vertically centred */}
      <div className="fixed right-4 z-50 flex flex-col items-end gap-2 pointer-events-none" style={{ top: '40%' }}>
        <AnimatePresence>
          {achEvents.map(e => <AchievementToast key={e.id} event={e} />)}
        </AnimatePresence>
      </div>

      {/* Level-up flash — fullscreen */}
      <AnimatePresence>
        {levelEvents.map(e => <LevelUpFlash key={e.id} event={e} />)}
      </AnimatePresence>
    </>
  )
}
