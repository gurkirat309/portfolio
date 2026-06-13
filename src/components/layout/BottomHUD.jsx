import { Timer, Flame, MapPin, Radar } from 'lucide-react'
import { useSessionTimer } from '../../hooks/useSessionTimer'
import { useGame } from '../../context/GameContext'

const TOTAL_SECTORS = 7

export function BottomHUD() {
  const timer = useSessionTimer()
  const { discovered } = useGame()
  const found = Math.min(discovered.length, TOTAL_SECTORS)
  const syncPct = Math.round((found / TOTAL_SECTORS) * 100)

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4"
      style={{
        height: 36,
        borderTop: '1px solid rgba(0,240,192,0.10)',
        background: 'rgba(7,10,15,0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-center gap-5">
        <HudStat icon={<Timer size={10} />} label="SESSION" value={timer} />
        <HudStat icon={<Flame size={10} />} label="STREAK" value="14D" className="hidden sm:flex" />

        {/* Sector discovery meter */}
        <div className="flex items-center gap-2">
          <Radar size={10} className="text-cyan/40" />
          <span className="font-orbitron text-[8px] tracking-[1px] text-text-muted uppercase">SECTORS</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: TOTAL_SECTORS }).map((_, i) => (
              <span
                key={i}
                className="inline-block rounded-[1px] transition-all duration-300"
                style={{
                  width: 7,
                  height: 5,
                  background: i < found ? '#00f0c0' : 'rgba(0,240,192,0.12)',
                  boxShadow: i < found ? '0 0 6px rgba(0,240,192,0.5)' : 'none',
                }}
              />
            ))}
          </div>
          <span className="font-orbitron text-[9px] text-cyan">{found}/{TOTAL_SECTORS}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden sm:flex font-orbitron text-[8px] tracking-[2px] text-cyan/40 uppercase">
          SYNC {syncPct}%
        </span>
        <div className="flex items-center gap-1.5">
          <MapPin size={10} className="text-cyan/40" />
          <span className="font-orbitron text-[8px] tracking-[2px] text-cyan/40 uppercase hidden sm:block">
            BANGALORE, INDIA
          </span>
          <span className="font-orbitron text-[8px] tracking-[2px] text-cyan/40 uppercase">
            // ONLINE
          </span>
        </div>
      </div>
    </div>
  )
}

function HudStat({ icon, label, value, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-cyan/40">{icon}</span>
      <span className="font-orbitron text-[8px] tracking-[1px] text-text-muted uppercase">{label}</span>
      <span className="font-orbitron text-[9px] text-cyan">{value}</span>
    </div>
  )
}
