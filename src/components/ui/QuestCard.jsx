import { Github, ExternalLink } from 'lucide-react'
import { useToast } from '../../context/ToastContext'

export function QuestCard({ quest }) {
  const { showToast } = useToast()

  const handleLink = (e, href) => {
    if (!href || href === '#') {
      e.preventDefault()
      showToast('🔗 LINK COMING SOON — CHECK BACK')
    }
  }

  const isCompleted = quest.status === 'COMPLETED'
  const isInProgress = quest.status === 'IN_PROGRESS'

  return (
    <div
      className="relative border-l-2 border-purple bg-panel border border-[rgba(0,240,192,0.08)] rounded-sm p-4 transition-all duration-200 hover:border-[rgba(0,240,192,0.2)] hover:shadow-[0_0_16px_rgba(96,64,192,0.1)]"
    >
      {/* Status badge */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={[
            'font-orbitron text-[9px] tracking-[2px] px-2 py-0.5 rounded-sm border',
            isCompleted
              ? 'text-gold border-gold/40 bg-gold/5'
              : 'text-cyan border-cyan/40 bg-cyan/5 animate-pulse',
          ].join(' ')}
        >
          {quest.status.replace('_', ' ')}
        </span>

        <div className="flex items-center gap-2">
          {quest.github && (
            <a
              href={quest.github}
              onClick={(e) => handleLink(e, quest.github)}
              className="flex items-center gap-1 font-orbitron text-[9px] text-text-muted hover:text-cyan transition-colors px-2 py-1 border border-transparent hover:border-cyan/20 rounded-sm"
            >
              <Github size={11} />
              <span className="hidden sm:block">CODE</span>
            </a>
          )}
          {quest.live && (
            <a
              href={quest.live}
              onClick={(e) => handleLink(e, quest.live)}
              className="flex items-center gap-1 font-orbitron text-[9px] text-text-muted hover:text-cyan transition-colors px-2 py-1 border border-transparent hover:border-cyan/20 rounded-sm"
            >
              <ExternalLink size={11} />
              <span className="hidden sm:block">LIVE</span>
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-orbitron text-sm text-text-bright mb-1.5 leading-snug">
        {quest.name}
      </h3>

      {/* Description */}
      <p className="font-rajdhani text-sm text-text-muted mb-3 leading-relaxed">
        {quest.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {quest.tags.map((tag) => (
          <span
            key={tag}
            className="font-rajdhani text-xs border border-cyan/20 text-cyan/70 px-2 py-0.5 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="font-orbitron text-[8px] text-text-muted tracking-[2px]">PROGRESS</span>
          <span className="font-orbitron text-[8px] text-cyan">{quest.progress}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,240,192,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${quest.progress}%`,
              background: isCompleted
                ? 'linear-gradient(90deg, #ffaa00, #ffcc44)'
                : 'linear-gradient(90deg, #6040c0, #00f0c0)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
