import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Check } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

function toPascalCase(str) {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
}

export function SkillNode({ name, icon, unlocked, inProgress, scanned = false, onScan }) {
  const iconKey = toPascalCase(icon)
  const Icon = LucideIcons[iconKey] || LucideIcons.Code
  const [pulse, setPulse] = useState(false)

  const base = 'relative flex flex-col items-center gap-1.5 p-3 rounded-sm border transition-all duration-150 select-none overflow-hidden'

  if (unlocked) {
    const handleClick = () => {
      setPulse(true)
      setTimeout(() => setPulse(false), 650)
      onScan && onScan()
    }
    return (
      <motion.button
        type="button"
        onClick={handleClick}
        className={`${base} border-cyan/30 bg-cyan/5 text-cyan cursor-pointer hover:border-cyan hover:bg-cyan/10 hover:shadow-[0_0_18px_rgba(0,240,192,0.2)]`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* scan ring pulse on click */}
        {pulse && <span className="skill-scan-ring absolute inset-0 rounded-sm pointer-events-none" />}

        <Icon size={18} className="text-cyan relative z-10" />
        <span className="font-orbitron text-[9px] text-center text-text-bright leading-tight relative z-10">{name}</span>

        {/* synced checkmark badge */}
        {scanned && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-cyan/20 border border-cyan/50 flex items-center justify-center">
            <Check size={8} className="text-cyan" />
          </span>
        )}
      </motion.button>
    )
  }

  if (inProgress) {
    return (
      <motion.div
        className={`${base} border-purple/50 bg-purple/5 animate-pulse-border cursor-default`}
        whileHover={{ scale: 1.04 }}
      >
        <Icon size={18} className="text-purple" />
        <span className="font-orbitron text-[9px] text-center text-purple/80 leading-tight">{name}</span>
        <span className="font-orbitron text-[6px] tracking-[1px] text-purple/50 uppercase">RESEARCHING</span>
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
      </motion.div>
    )
  }

  return (
    <div className={`${base} border-[rgba(0,240,192,0.1)] bg-void/40 opacity-40 cursor-not-allowed`}>
      <Icon size={18} className="text-text-muted" />
      <span className="font-orbitron text-[9px] text-center text-text-muted leading-tight">{name}</span>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-sm bg-void/40">
        <Lock size={12} className="text-text-muted/60" />
        <span className="font-orbitron text-[6px] tracking-[1px] text-text-muted/50 uppercase">LOCKED</span>
      </div>
    </div>
  )
}
