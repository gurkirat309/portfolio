import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BootScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 420)
    }, 2500)
    return () => clearTimeout(id)
  }, [onComplete])

  const skip = () => {
    setVisible(false)
    setTimeout(onComplete, 420)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] bg-void flex flex-col items-center justify-center cursor-pointer select-none"
          onClick={skip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Scanlines */}
          <div className="scanline absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }} />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo text */}
            <div className="text-center">
              <div className="font-orbitron text-4xl font-black tracking-[8px] text-cyan mb-1">
                GURKIRAT
              </div>
              <div className="font-orbitron text-4xl font-black tracking-[8px] text-text-bright">
                .OS
              </div>
            </div>

            {/* Status */}
            <div className="font-orbitron text-xs tracking-[4px] text-cyan/60 uppercase">
              INITIALIZING GURKIRAT.OS...
            </div>

            {/* Progress bar */}
            <div className="w-64">
              <div
                className="relative h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(0,240,192,0.1)', border: '1px solid rgba(0,240,192,0.2)' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 xp-bar-fill rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'linear' }}
                />
              </div>
            </div>

            {/* Sub text */}
            <div className="font-orbitron text-[9px] tracking-[3px] text-text-muted uppercase">
              LOADING ASSETS // PLEASE STAND BY
            </div>
          </div>

          {/* Skip hint */}
          <div className="absolute bottom-12 font-orbitron text-[9px] tracking-[3px] text-text-muted/40 uppercase">
            CLICK ANYWHERE TO SKIP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
