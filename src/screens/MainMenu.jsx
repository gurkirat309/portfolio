import { motion } from 'framer-motion'
import { Download, Bot } from 'lucide-react'
import ProfileCard from '../components/ui/ProfileCard'
import { GlassPanel } from '../components/ui/GlassPanel'
import { profile } from '../data/profile'

const quickStats = [
  { label: 'LEVEL',    value: profile.level },
  { label: 'XP',       value: profile.xp.current.toLocaleString() },
  { label: 'PROJECTS', value: '5' },
  { label: 'WINS',     value: '4' },
]

export function MainMenu({ onEnter, onOpenFriday }) {
  return (
    <motion.div
      className="flex items-start lg:items-center justify-center min-h-full px-4 sm:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-5xl">

        {/* LEFT — ProfileCard */}
        <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
          <ProfileCard
            avatarUrl="/me.jpeg"
            name="Gurkirat Singh"
            title="AI Engineer"
            handle="gurkirat309"
            status="Available for hire"
            contactText="CONTACT"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={true}
            behindGlowColor="rgba(0, 240, 192, 0.4)"
            behindGlowSize="55%"
            innerGradient="linear-gradient(145deg, rgba(0,128,255,0.15) 0%, rgba(0,240,192,0.08) 100%)"
            onContactClick={() => onEnter && onEnter('connections')}
          />
        </div>

        {/* RIGHT — Info panel */}
        <div className="flex-1 flex flex-col gap-5 text-center lg:text-left">
          {/* Tag */}
          <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] uppercase">
            // CHARACTER SELECT //
          </div>

          {/* Name */}
          <div>
            <h1 className="font-orbitron text-4xl sm:text-5xl xl:text-6xl font-black tracking-widest text-text-bright leading-none">
              GURKIRAT
            </h1>
            <h1 className="font-orbitron text-4xl sm:text-5xl xl:text-6xl font-black tracking-widest text-cyan leading-none">
              SINGH
            </h1>
          </div>

          {/* Subtitle */}
          <div className="font-orbitron text-[11px] tracking-[3px] text-text-muted uppercase">
            AI / ML ENGINEER&nbsp;&nbsp;//&nbsp;&nbsp;GENERATIVE AI SPECIALIST
          </div>

          {/* Bio */}
          <p className="font-rajdhani text-lg text-text-muted leading-relaxed max-w-md mx-auto lg:mx-0">
            {profile.bio}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickStats.map((stat) => (
              <GlassPanel key={stat.label} className="flex flex-col items-center py-3 !p-3">
                <span className="font-orbitron text-xl text-cyan font-bold">{stat.value}</span>
                <span className="font-orbitron text-[8px] text-text-muted tracking-[2px] mt-1">{stat.label}</span>
              </GlassPanel>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <button
              onClick={onOpenFriday}
              className="group relative inline-flex items-center gap-2.5 font-orbitron text-sm tracking-widest px-7 py-3 bg-cyan/10 border border-cyan text-cyan hover:bg-cyan/20 hover:shadow-[0_0_24px_rgba(0,240,192,0.4)] transition-all duration-200 uppercase overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-cyan animate-pulse" />
              <Bot size={17} className="group-hover:scale-110 transition-transform" />
              CHAT WITH F.R.I.D.A.Y
            </button>
            <a
              href="/genai_resume.pdf"
              download="Gurkirat_Singh_Resume.pdf"
              className="inline-flex items-center gap-2 font-orbitron text-sm tracking-widest px-7 py-3 border border-cyan/40 text-cyan/80 hover:border-cyan hover:text-cyan hover:bg-cyan/10 transition-all duration-200 uppercase"
            >
              <Download size={16} />
              [ DOWNLOAD CV ]
            </a>
          </div>

          {/* Decorative line */}
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan/30" />
            <span className="font-orbitron text-[8px] text-cyan/30 tracking-[4px]">v1.0.0</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan/30" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
