import { Timer, Flame, FolderOpen, MapPin } from 'lucide-react'
import { useSessionTimer } from '../../hooks/useSessionTimer'

export function BottomHUD() {
  const timer = useSessionTimer()

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
        <HudStat icon={<FolderOpen size={10} />} label="PROJECTS" value="3" className="hidden sm:flex" />
      </div>

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
