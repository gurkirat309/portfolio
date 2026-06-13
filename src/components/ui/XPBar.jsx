import { motion } from 'framer-motion'

export function XPBar({ current, max, color = 'cyan' }) {
  const pct = Math.round((current / max) * 100)

  return (
    <div>
      <div className="flex justify-between mb-0.5">
        <span className="font-orbitron text-[8px] text-text-muted tracking-[2px]">XP</span>
        <span className="font-orbitron text-[8px] text-cyan">
          {current.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      <div className="relative h-1.5 bg-void rounded-full overflow-hidden" style={{ border: '1px solid rgba(0,240,192,0.15)' }}>
        <motion.div
          className="absolute inset-y-0 left-0 xp-bar-fill rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
        {/* End marker */}
        <motion.div
          className="absolute inset-y-0 bg-white rounded-full"
          style={{ width: 2 }}
          initial={{ left: 0 }}
          animate={{ left: `calc(${pct}% - 1px)` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  )
}
