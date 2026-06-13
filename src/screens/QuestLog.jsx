import { motion } from 'framer-motion'
import { Github, ExternalLink, Lock, ScanLine, CheckCircle2, Target } from 'lucide-react'
import { quests } from '../data/quests'
import { useToast } from '../context/ToastContext'
import { useGame } from '../context/GameContext'

// Rarity tier derived from mission status / deployment.
function rarityOf(quest) {
  if (quest.status === 'IN_PROGRESS') return { label: 'CLASSIFIED', color: '#6040c0', xp: 0 }
  if (quest.live) return { label: 'LEGENDARY', color: '#ffaa00', xp: 60 }
  return { label: 'EPIC', color: '#00f0c0', xp: 40 }
}

export function QuestLog() {
  const completed = quests.filter(q => q.status === 'COMPLETED').length
  const totalIntel = quests.reduce((sum, q) => sum + rarityOf(q).xp, 0)

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] uppercase">
          // ACTIVE MISSIONS //
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Target size={12} className="text-cyan/50" />
            <span className="font-orbitron text-[9px] tracking-[2px] text-text-muted uppercase">
              CLEARED <span className="text-cyan">{completed}</span>/{quests.length}
            </span>
          </div>
          <span className="font-orbitron text-[9px] tracking-[2px] text-gold/70 uppercase">
            ◈ {totalIntel} INTEL XP
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {quests.map((quest, i) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <ProjectCard quest={quest} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ProjectCard({ quest }) {
  const { showToast } = useToast()
  const { award, isAwarded } = useGame()
  const isInProgress = quest.status === 'IN_PROGRESS'
  const isCompleted = quest.status === 'COMPLETED'
  const rarity = rarityOf(quest)
  const decrypted = isAwarded(`quest:${quest.id}`)

  const handleLink = (e, href) => {
    if (!href || href === '#') {
      e.preventDefault()
      showToast('🔗 LINK COMING SOON — CHECK BACK')
    }
  }

  const decrypt = () => {
    if (isInProgress) {
      showToast('🔒 CLEARANCE DENIED — MISSION CLASSIFIED')
      return
    }
    if (decrypted) return
    award(`quest:${quest.id}`, rarity.xp, 'INTEL DECRYPTED')
  }

  return (
    <div
      className="flex flex-col border rounded-sm bg-panel overflow-hidden group relative panel-top-line transition-all duration-200"
      style={{
        borderColor: `${rarity.color}22`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 22px ${rarity.color}1a`; e.currentTarget.style.borderColor = `${rarity.color}55` }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${rarity.color}22` }}
    >
      {/* Rarity ribbon */}
      <div
        className="absolute top-2 right-2 z-20 font-orbitron text-[7px] tracking-[2px] px-2 py-0.5 rounded-sm uppercase"
        style={{ color: rarity.color, border: `1px solid ${rarity.color}55`, background: 'rgba(7,10,15,0.85)' }}
      >
        {rarity.label}
      </div>

      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        {quest.image ? (
          <>
            <img
              src={quest.image}
              alt={quest.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

            {/* Hover overlay with action buttons */}
            <div className="absolute inset-0 bg-void/70 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {quest.github ? (
                <a
                  href={quest.github}
                  onClick={(e) => handleLink(e, quest.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-cyan/50 text-cyan bg-void/80 hover:bg-cyan/10 transition-all font-orbitron text-[10px] tracking-widest rounded-sm"
                >
                  <Github size={13} /> CODE
                </a>
              ) : null}
              {quest.live ? (
                <a
                  href={quest.live}
                  onClick={(e) => handleLink(e, quest.live)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gold/50 text-gold bg-void/80 hover:bg-gold/10 transition-all font-orbitron text-[10px] tracking-widest rounded-sm"
                >
                  <ExternalLink size={13} /> LIVE
                </a>
              ) : null}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-void/60 border-b border-[rgba(0,240,192,0.08)]">
            <Lock size={28} className="text-purple/30 mb-2" />
            <span className="font-orbitron text-[9px] text-purple/30 tracking-[3px]">CLASSIFIED</span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <span
            className={[
              'font-orbitron text-[8px] tracking-[2px] px-2 py-0.5 rounded-sm border',
              isCompleted
                ? 'text-gold border-gold/40 bg-void/90'
                : 'text-purple border-purple/40 bg-void/90 animate-pulse',
            ].join(' ')}
          >
            {quest.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-orbitron text-[11px] text-text-bright leading-snug mb-2">
          {quest.name}
        </h3>

        <p className="font-rajdhani text-sm text-text-muted leading-relaxed mb-3 flex-1">
          {quest.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {quest.tags.map((tag) => (
            <span
              key={tag}
              className="font-rajdhani text-[11px] border border-cyan/15 text-cyan/60 px-1.5 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="font-orbitron text-[8px] text-text-muted tracking-[2px]">PROGRESS</span>
            <span className="font-orbitron text-[8px] text-cyan">{quest.progress}%</span>
          </div>
          <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,240,192,0.06)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${quest.progress}%`,
                background: isCompleted
                  ? 'linear-gradient(90deg, #ffaa00, #ffcc44)'
                  : 'linear-gradient(90deg, #6040c0, #00f0c0)',
              }}
            />
          </div>
        </div>

        {/* Decrypt-intel mechanic */}
        <button
          type="button"
          onClick={decrypt}
          disabled={decrypted}
          className={[
            'flex items-center justify-center gap-2 w-full py-2 rounded-sm font-orbitron text-[9px] tracking-[2px] uppercase transition-all duration-150 border',
            decrypted
              ? 'border-cyan/30 text-cyan/70 bg-cyan/5 cursor-default'
              : isInProgress
                ? 'border-purple/30 text-purple/60 hover:bg-purple/5'
                : 'border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60',
          ].join(' ')}
        >
          {decrypted ? (
            <><CheckCircle2 size={12} /> INTEL DECRYPTED</>
          ) : isInProgress ? (
            <><Lock size={11} /> CLEARANCE REQUIRED</>
          ) : (
            <><ScanLine size={12} /> DECRYPT INTEL · +{rarity.xp} XP</>
          )}
        </button>

        {/* Mobile link buttons */}
        {(quest.github || quest.live) && (
          <div className="flex gap-2 mt-3 md:hidden">
            {quest.github && (
              <a
                href={quest.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-cyan/30 text-cyan text-[10px] font-orbitron tracking-wider rounded-sm hover:bg-cyan/10 transition-all"
              >
                <Github size={11} /> CODE
              </a>
            )}
            {quest.live && (
              <a
                href={quest.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gold/30 text-gold text-[10px] font-orbitron tracking-wider rounded-sm hover:bg-gold/10 transition-all"
              >
                <ExternalLink size={11} /> LIVE
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
