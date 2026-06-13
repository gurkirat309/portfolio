import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useGame } from '../../context/GameContext'

export function TopHUD() {
  const [tick, setTick] = useState(false)
  const { level, into, need, rank } = useGame()
  const pct = Math.min(100, Math.round((into / need) * 100))

  useEffect(() => {
    const id = setInterval(() => setTick(t => !t), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 gap-4"
      style={{
        height: 52,
        borderBottom: '1px solid rgba(0,240,192,0.15)',
        background: 'rgba(7,10,15,0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* scanning sweep across the whole bar */}
      <div className="hud-scan absolute inset-0 pointer-events-none overflow-hidden" />

      <span className="relative font-orbitron text-[9px] tracking-[3px] text-cyan/50 uppercase whitespace-nowrap">
        GURKIRAT.OS&nbsp;//&nbsp;v1.0.0&nbsp;//&nbsp;<span className="text-cyan/80">INITIALIZED</span>
      </span>

      {/* RIGHT — live operator progression module */}
      <div className="relative flex items-center gap-3 sm:gap-4">
        {/* rank badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-sm"
          style={{ border: `1px solid ${rank.color}55`, background: `${rank.color}0f` }}
        >
          <Shield size={11} style={{ color: rank.color }} />
          <span className="font-orbitron text-[8px] tracking-[2px]" style={{ color: rank.color }}>
            {rank.name}
          </span>
        </div>

        {/* operator level + XP bar */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end leading-none">
            <span className="font-orbitron text-[7px] tracking-[2px] text-text-muted">OPERATOR</span>
            <span className="font-orbitron text-[12px] font-bold text-cyan leading-none mt-0.5">
              LV {level}
            </span>
          </div>
          <div className="w-20 sm:w-28">
            <div
              className="relative h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(0,240,192,0.08)', border: '1px solid rgba(0,240,192,0.2)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 xp-bar-fill rounded-full"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <div className="hud-bar-shine absolute inset-0" />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="font-orbitron text-[6px] tracking-[1px] text-text-muted">SYNC</span>
              <span className="font-orbitron text-[6px] tracking-[1px] text-cyan/60">{into}/{need}</span>
            </div>
          </div>
        </div>

        {/* system online dots */}
        <div className="hidden md:flex items-center gap-2 pl-1">
          <div className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan opacity-80" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan opacity-80" />
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-cyan"
              style={{ opacity: tick ? 0.2 : 1, transition: 'opacity 0.3s' }}
            />
          </div>
          <span className="font-orbitron text-[9px] tracking-[3px] text-cyan/40 uppercase">
            ONLINE
          </span>
        </div>
      </div>
    </div>
  )
}
