import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

function toPascalCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

export function AchievementCard({ achievement }) {
  const iconKey = toPascalCase(achievement.icon)
  const Icon = LucideIcons[iconKey] || LucideIcons.Star

  return (
    <motion.div
      className="relative bg-panel border border-gold/20 rounded-sm p-4 panel-top-line cursor-default transition-all duration-200"
      whileHover={{ borderColor: 'rgba(255,170,0,0.5)', boxShadow: '0 0 20px rgba(255,170,0,0.1)' }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-sm bg-gold/8 border border-gold/20 flex items-center justify-center">
          <Icon size={16} className="text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-orbitron text-[10px] text-text-bright mb-0.5 leading-tight">
            {achievement.name}
          </div>
          <div className="font-rajdhani text-xs text-text-muted mb-2">{achievement.org}</div>
          <span className="font-orbitron text-[9px] text-gold border border-gold/30 bg-gold/5 px-2 py-0.5 rounded-sm">
            {achievement.reward}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
