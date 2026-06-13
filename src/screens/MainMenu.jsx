import { motion } from 'framer-motion'
import { GlassPanel } from '../components/ui/GlassPanel'
import { profile } from '../data/profile'

const quickStats = [
  { label: 'LEVEL',    value: profile.level,       suffix: '' },
  { label: 'XP',       value: profile.xp.current.toLocaleString(), suffix: '' },
  { label: 'PROJECTS', value: '3',                 suffix: '' },
  { label: 'WINS',     value: '4',                 suffix: '' },
]

export function MainMenu({ onEnter }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-8 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Tag */}
      <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-8 uppercase">
        // CHARACTER SELECT //
      </div>

      {/* Name display */}
      <div className="mb-4">
        <h1 className="font-orbitron text-6xl font-black tracking-widest text-text-bright leading-none">
          GURKIRAT
        </h1>
        <h1 className="font-orbitron text-6xl font-black tracking-widest text-cyan leading-none">
          SINGH
        </h1>
      </div>

      {/* Subtitle */}
      <div className="font-orbitron text-sm tracking-[4px] text-text-muted mb-6 uppercase">
        AI / ML ENGINEER&nbsp;&nbsp;//&nbsp;&nbsp;GENERATIVE AI SPECIALIST
      </div>

      {/* Bio */}
      <p className="font-rajdhani text-lg text-text-muted max-w-lg mb-10 leading-relaxed">
        {profile.bio}
      </p>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 w-full max-w-xl">
        {quickStats.map((stat) => (
          <GlassPanel key={stat.label} className="flex flex-col items-center py-3">
            <span className="font-orbitron text-xl text-cyan font-bold">{stat.value}{stat.suffix}</span>
            <span className="font-orbitron text-[9px] text-text-muted tracking-[2px] mt-1">{stat.label}</span>
          </GlassPanel>
        ))}
      </div>

      {/* CTA button */}
      <button
        onClick={onEnter}
        className="font-orbitron text-sm tracking-widest px-8 py-3 border border-cyan text-cyan hover:bg-cyan/10 transition-all duration-200 uppercase relative group"
      >
        <span className="relative z-10">[ ENTER PORTFOLIO ]</span>
        <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Decorative bottom line */}
      <div className="mt-12 flex items-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/30" />
        <span className="font-orbitron text-[8px] text-cyan/30 tracking-[4px]">v1.0.0</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/30" />
      </div>
    </motion.div>
  )
}
