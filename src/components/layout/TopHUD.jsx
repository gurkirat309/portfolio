import { useState, useEffect } from 'react'

export function TopHUD() {
  const [tick, setTick] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTick(t => !t), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4"
      style={{
        height: 52,
        borderBottom: '1px solid rgba(0,240,192,0.15)',
        background: 'rgba(7,10,15,0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span className="font-orbitron text-[9px] tracking-[3px] text-cyan/50 uppercase">
        GURKIRAT.OS&nbsp;//&nbsp;v1.0.0&nbsp;//&nbsp;INITIALIZED
      </span>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan opacity-80" />
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan opacity-80" />
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-cyan"
            style={{ opacity: tick ? 0.2 : 1, transition: 'opacity 0.3s' }}
          />
        </div>
        <span className="font-orbitron text-[9px] tracking-[3px] text-cyan/40 uppercase">
          SYSTEM ONLINE
        </span>
      </div>
    </div>
  )
}
