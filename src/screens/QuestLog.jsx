import { motion } from 'framer-motion'
import { QuestCard } from '../components/ui/QuestCard'
import { quests } from '../data/quests'

export function QuestLog() {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-6 uppercase">
        // ACTIVE MISSIONS //
      </div>

      <div className="flex flex-col gap-4 max-w-3xl">
        {quests.map((quest, i) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <QuestCard quest={quest} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
