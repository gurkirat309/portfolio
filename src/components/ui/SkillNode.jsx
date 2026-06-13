import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

function toPascalCase(str) {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
}

export function SkillNode({ name, icon, unlocked, inProgress }) {
  const iconKey = toPascalCase(icon)
  const Icon = LucideIcons[iconKey] || LucideIcons.Code

  const base = 'relative flex flex-col items-center gap-1.5 p-3 rounded-sm border transition-all duration-150 cursor-default select-none'

  if (unlocked) {
    return (
      <motion.div
        className={`${base} border-cyan/30 bg-cyan/5 text-cyan`}
        whileHover={{ scale: 1.04 }}
      >
        <Icon size={18} className="text-cyan" />
        <span className="font-orbitron text-[9px] text-center text-text-bright leading-tight">{name}</span>
      </motion.div>
    )
  }

  if (inProgress) {
    return (
      <motion.div
        className={`${base} border-purple/50 bg-purple/5 animate-pulse-border`}
        whileHover={{ scale: 1.04 }}
      >
        <Icon size={18} className="text-purple" />
        <span className="font-orbitron text-[9px] text-center text-purple/80 leading-tight">{name}</span>
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
      </motion.div>
    )
  }

  return (
    <div className={`${base} border-[rgba(0,240,192,0.1)] bg-void/40 opacity-35`}>
      <Icon size={18} className="text-text-muted" />
      <span className="font-orbitron text-[9px] text-center text-text-muted leading-tight">{name}</span>
      <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-void/30">
        <Lock size={12} className="text-text-muted/50" />
      </div>
    </div>
  )
}
