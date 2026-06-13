import { AnimatePresence, motion } from 'framer-motion'
import { useToast } from '../../context/ToastContext'

export function ToastNotification() {
  const { toast } = useToast()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="toast"
          className="fixed bottom-12 left-1/2 z-50 pointer-events-none"
          style={{ transform: 'translateX(-50%)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="font-orbitron text-xs tracking-widest text-cyan px-5 py-2.5 rounded-sm"
            style={{
              background: 'rgba(7,10,15,0.98)',
              border: '1px solid rgba(0,240,192,0.4)',
              boxShadow: '0 0 20px rgba(0,240,192,0.15)',
            }}
          >
            {toast}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
