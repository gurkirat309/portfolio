import { motion } from 'framer-motion'
import { AchievementCard } from '../components/ui/AchievementCard'
import { achievements } from '../data/achievements'

const groups = [
  { type: 'hackathon', label: '// HACKATHON VICTORIES //', color: 'text-gold' },
  { type: 'cert',      label: '// CERTIFICATIONS //',      color: 'text-cyan' },
  { type: 'stat',      label: '// PERFORMANCE RECORDS //', color: 'text-purple' },
]

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
