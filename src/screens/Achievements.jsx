import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Image, ChevronLeft, ChevronRight } from 'lucide-react'
import { AchievementCard } from '../components/ui/AchievementCard'
import { achievements } from '../data/achievements'

const hackathons = achievements.filter(a => a.type === 'hackathon')

const groups = [
  { type: 'hackathon', label: '// HACKATHON VICTORIES //', color: 'text-gold' },
  { type: 'cert',      label: '// CERTIFICATIONS //',      color: 'text-cyan' },
  { type: 'stat',      label: '// PERFORMANCE RECORDS //', color: 'text-purple' },
]

export function Achievements() {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (idx) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => (i - 1 + hackathons.length) % hackathons.length)
  const next = () => setLightboxIndex(i => (i + 1) % hackathons.length)

  return (
    <>
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] uppercase">
            // ACHIEVEMENTS //
          </div>
          {/* Victory Gallery trigger */}
          <button
            onClick={() => setGalleryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gold/40 text-gold hover:bg-gold/10 transition-all font-orbitron text-[10px] tracking-[2px] rounded-sm group"
          >
            <Image size={13} className="group-hover:scale-110 transition-transform" />
            VICTORY GALLERY
          </button>
        </div>

        {groups.map((group) => {
          const items = achievements.filter(a => a.type === group.type)
          if (!items.length) return null
          return (
            <div key={group.type} className="mb-8">
              <div className={`font-orbitron text-[10px] tracking-[3px] mb-4 uppercase ${group.color}/60`}>
                {group.label}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((achievement, i) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <AchievementCard achievement={achievement} />
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Victory Gallery overlay */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: '#070a0f' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Scanline */}
            <div className="scanline absolute inset-0 pointer-events-none opacity-50" />

            {/* Gallery HUD bar */}
            <div
              className="relative z-10 flex items-center justify-between px-6"
              style={{ height: 52, borderBottom: '1px solid rgba(0,240,192,0.15)', background: 'rgba(7,10,15,0.95)' }}
            >
              <div className="flex items-center gap-3">
                <Trophy size={14} className="text-gold" />
                <span className="font-orbitron text-[10px] tracking-[3px] text-gold/70 uppercase">
                  VICTORY GALLERY // FIELD DOCUMENTATION
                </span>
              </div>
              <button
                onClick={() => setGalleryOpen(false)}
                className="flex items-center gap-2 font-orbitron text-[9px] tracking-[2px] text-text-muted hover:text-cyan transition-colors px-3 py-1.5 border border-[rgba(0,240,192,0.12)] hover:border-cyan/40 rounded-sm"
              >
                <X size={12} /> CLOSE
              </button>
            </div>

            {/* Gallery grid */}
            <div className="relative z-10 flex-1 overflow-y-auto p-8">
              <div className="max-w-5xl mx-auto">
                <p className="font-orbitron text-[9px] text-text-muted tracking-[3px] text-center mb-8 uppercase">
                  // AUTHENTICATED MISSION RECORDS //
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {hackathons.map((achievement, idx) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08 }}
                      className="group relative cursor-pointer"
                      onClick={() => openLightbox(idx)}
                    >
                      <div
                        className="relative overflow-hidden rounded-sm border border-gold/20 hover:border-gold/60 transition-all duration-200"
                        style={{ boxShadow: '0 0 0 0 rgba(255,170,0,0)' }}
                      >
                        <img
                          src={achievement.image}
                          alt={achievement.name}
                          className="w-full object-cover transition-transform duration-500 group-hover:scale-103"
                          style={{ height: 240 }}
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-200" />

                        {/* Info strip */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="font-orbitron text-xs text-text-bright mb-0.5">
                            {achievement.name}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-rajdhani text-sm text-text-muted">{achievement.org}</span>
                            <span className="font-orbitron text-[10px] text-gold border border-gold/30 bg-void/80 px-2 py-0.5 rounded-sm">
                              {achievement.reward}
                            </span>
                          </div>
                        </div>

                        {/* Expand hint */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="font-orbitron text-[8px] text-gold/80 bg-void/80 border border-gold/30 px-2 py-1 rounded-sm tracking-widest">
                            EXPAND
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: 'rgba(7,10,15,0.96)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeLightbox}
          >
            <div className="scanline absolute inset-0 pointer-events-none opacity-30" />

            {/* Image container */}
            <motion.div
              className="relative z-10 max-w-3xl w-full mx-6"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="border border-gold/30 rounded-sm overflow-hidden" style={{ boxShadow: '0 0 40px rgba(255,170,0,0.1)' }}>
                <img
                  src={hackathons[lightboxIndex].image}
                  alt={hackathons[lightboxIndex].name}
                  className="w-full object-contain"
                  style={{ maxHeight: '70vh' }}
                />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center">
                <div className="font-orbitron text-sm text-text-bright">{hackathons[lightboxIndex].name}</div>
                <div className="font-rajdhani text-sm text-text-muted mt-0.5">
                  {hackathons[lightboxIndex].org} — <span className="text-gold">{hackathons[lightboxIndex].reward}</span>
                </div>
              </div>

              {/* Nav arrows */}
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 flex items-center justify-center border border-[rgba(0,240,192,0.2)] text-text-muted hover:text-cyan hover:border-cyan/40 transition-all rounded-sm bg-void/80"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 flex items-center justify-center border border-[rgba(0,240,192,0.2)] text-text-muted hover:text-cyan hover:border-cyan/40 transition-all rounded-sm bg-void/80"
              >
                <ChevronRight size={18} />
              </button>

              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-0 right-0 -translate-y-full mr-0 mb-2 flex items-center gap-1.5 font-orbitron text-[9px] tracking-[2px] text-text-muted hover:text-cyan transition-colors"
              >
                <X size={11} /> ESC
              </button>

              {/* Counter */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 font-orbitron text-[9px] text-text-muted tracking-[3px]">
                {lightboxIndex + 1} / {hackathons.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
