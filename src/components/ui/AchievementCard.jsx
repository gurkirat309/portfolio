import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

function toPascalCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

export function AchievementCard({ achievement }) {
  const iconKey = toPascalCase(achievement.icon)
  const Icon = LucideIcons[iconKey] || LucideIcons.Star

  // Photo card — used for hackathons (mirrors the project/quest card style).
  if (achievement.image) {
    return (
      <motion.div
        className="flex flex-col bg-panel border border-gold/20 rounded-sm overflow-hidden group panel-top-line transition-all duration-200 cursor-default"
        whileHover={{ borderColor: 'rgba(255,170,0,0.5)', boxShadow: '0 0 22px rgba(255,170,0,0.12)' }}
      >
        <div className="relative overflow-hidden" style={{ height: 180 }}>
          <img
            src={achievement.image}
            alt={achievement.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

          {/* reward badge */}
          <span className="absolute top-2 right-2 font-orbitron text-[9px] text-gold border border-gold/40 bg-void/85 px-2 py-0.5 rounded-sm">
            {achievement.reward}
          </span>

          {/* name + org overlaid on the photo */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="font-orbitron text-[11px] text-text-bright leading-tight mb-0.5">
              {achievement.name}
            </div>
            <div className="font-rajdhani text-xs text-gold/80">{achievement.org}</div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Compact icon card — certifications & performance records (no photo).
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
