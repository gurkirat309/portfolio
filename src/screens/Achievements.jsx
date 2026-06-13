import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { AchievementCard } from '../components/ui/AchievementCard'
import { achievements } from '../data/achievements'
import { OPERATOR_ACHIEVEMENTS, useGame } from '../context/GameContext'

const groups = [
  { type: 'hackathon', label: '// HACKATHON VICTORIES //', color: 'text-gold' },
  { type: 'cert',      label: '// CERTIFICATIONS //',      color: 'text-cyan' },
  { type: 'stat',      label: '// PERFORMANCE RECORDS //', color: 'text-purple' },
]

function toPascalCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

function OperatorRecords() {
  const { unlocked } = useGame()
  const count = OPERATOR_ACHIEVEMENTS.filter(a => unlocked.includes(a.id)).length

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="font-orbitron text-[10px] tracking-[3px] uppercase text-cyan/60">
          // OPERATOR RECORDS //
        </div>
        <span className="font-orbitron text-[9px] tracking-[2px] text-cyan">
          {count}/{OPERATOR_ACHIEVEMENTS.length} EARNED
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {OPERATOR_ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id)
          const hidden = ach.secret && !isUnlocked
          const Icon = LucideIcons[toPascalCase(ach.icon)] || LucideIcons.Award
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center text-center gap-2 p-3 rounded-sm border transition-all duration-200"
              style={{
                borderColor: isUnlocked ? 'rgba(0,240,192,0.4)' : 'rgba(0,240,192,0.1)',
                background: isUnlocked ? 'rgba(0,240,192,0.06)' : 'rgba(7,10,15,0.4)',
                boxShadow: isUnlocked ? '0 0 16px rgba(0,240,192,0.12)' : 'none',
                opacity: isUnlocked ? 1 : 0.55,
              }}
            >
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center"
                style={{
                  background: isUnlocked ? 'rgba(0,240,192,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isUnlocked ? 'rgba(0,240,192,0.4)' : 'rgba(0,240,192,0.12)'}`,
                }}
              >
                {hidden
                  ? <Lock size={15} className="text-text-muted/50" />
                  : <Icon size={16} className={isUnlocked ? 'text-cyan' : 'text-text-muted/60'} />}
              </div>
              <div className="font-orbitron text-[8px] tracking-[1px] leading-tight" style={{ color: isUnlocked ? '#e0f0ff' : 'rgba(224,240,255,0.5)' }}>
                {hidden ? '? ? ?' : ach.name}
              </div>
              <div className="font-rajdhani text-[10px] leading-tight text-text-muted">
                {hidden ? 'CLASSIFIED RECORD' : ach.desc}
              </div>
              {isUnlocked && (
                <span className="absolute top-1.5 right-1.5 font-orbitron text-[7px] tracking-[1px] text-cyan/70">✓</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function Achievements() {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-6 uppercase">
        // ACHIEVEMENTS //
      </div>

      <OperatorRecords />

      {groups.map((group) => {
        const items = achievements.filter(a => a.type === group.type)
        if (!items.length) return null
        return (
          <div key={group.type} className="mb-8">
            <div className={`font-orbitron text-[10px] tracking-[3px] mb-4 uppercase ${group.color}/60`}>
              {group.label}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {items.map((achievement, i) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <AchievementCard achievement={achievement} />
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}
