import { useState } from 'react'
import { motion } from 'framer-motion'
import { SkillNode } from '../components/ui/SkillNode'
import { skills } from '../data/skills'

const categories = ['All', 'Language', 'AI/ML', 'Backend', 'Frontend', 'DevOps', 'Cloud', 'Database']

export function SkillTree() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? skills : skills.filter(s => s.category === filter)

  const unlocked = skills.filter(s => s.unlocked).length
  const inProgress = skills.filter(s => s.inProgress).length

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-2 uppercase">
        // SKILL TREE //
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-5">
        <LegendItem color="border-cyan/30 bg-cyan/5 text-cyan" label={`UNLOCKED (${unlocked})`} />
        <LegendItem color="border-purple/50 bg-purple/5 text-purple" label={`IN PROGRESS (${inProgress})`} />
        <LegendItem color="border-[rgba(0,240,192,0.1)] opacity-40 text-text-muted" label="LOCKED" />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={[
              'font-orbitron text-[9px] tracking-[2px] px-3 py-1.5 border transition-all duration-150 rounded-sm uppercase',
              filter === cat
                ? 'border-cyan text-cyan bg-cyan/8'
                : 'border-[rgba(0,240,192,0.15)] text-text-muted hover:border-cyan/40 hover:text-text-bright',
            ].join(' ')}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
        {filtered.map((skill) => (
          <SkillNode
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            unlocked={skill.unlocked}
            inProgress={skill.inProgress}
          />
        ))}
      </div>
    </motion.div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className={`flex items-center gap-2 px-2 py-1 border rounded-sm ${color}`}>
      <span className="font-orbitron text-[8px] tracking-[2px]">{label}</span>
    </div>
  )
}
