import { motion } from 'framer-motion'

export function StatBar({ label, value, index = 0 }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-rajdhani text-xs text-text-muted uppercase tracking-wide">{label}</span>
        <span className="font-orbitron text-xs text-cyan">{value}/100</span>
      </div>
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(0,240,192,0.06)', border: '1px solid rgba(0,240,192,0.1)' }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 stat-bar-fill rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + index * 0.08 }}
        />
      </div>
    </div>
  )
}
