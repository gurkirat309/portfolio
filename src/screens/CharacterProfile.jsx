import { motion } from 'framer-motion'
import { Bot, MapPin, Mail, Phone, Github, Linkedin } from 'lucide-react'
import { GlassPanel } from '../components/ui/GlassPanel'
import { XPBar } from '../components/ui/XPBar'
import { StatBar } from '../components/ui/StatBar'
import { profile } from '../data/profile'
import { useToast } from '../context/ToastContext'

export function CharacterProfile() {
  const { showToast } = useToast()

  const handleLink = (e, href) => {
    if (!href || href === '#') {
      e.preventDefault()
      showToast('🔗 LINK COMING SOON — CHECK BACK')
    }
  }

  return (
    <motion.div
      className="p-6 h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Screen tag */}
      <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-5 uppercase">
        // CHARACTER PROFILE //
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT COL */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Avatar + identity */}
          <GlassPanel>
            <div className="flex flex-col items-center text-center py-3">
              <div
                className="hex-clip flex items-center justify-center bg-cyan/10 mb-4"
                style={{ width: 72, height: 72 }}
              >
                <Bot size={36} className="text-cyan" />
              </div>
              <div className="font-orbitron text-[10px] text-cyan/50 tracking-[3px] mb-1">{profile.handle}</div>
              <div className="font-orbitron text-2xl font-bold text-text-bright mb-1">{profile.name}</div>
              <div className="font-rajdhani text-sm text-text-muted mb-1 uppercase tracking-wide">{profile.class}</div>
              <div className="flex items-center gap-1 text-text-muted mb-3">
                <MapPin size={11} />
                <span className="font-rajdhani text-xs">{profile.location}</span>
              </div>
              <div className="font-orbitron text-xs px-3 py-1 border border-cyan/20 text-cyan/60 rounded-sm mb-3">
                LV {profile.level} // {profile.guild}
              </div>

              {/* XP Bar */}
              <div className="w-full">
                <XPBar current={profile.xp.current} max={profile.xp.max} />
              </div>
            </div>

            {/* Contact links */}
            <div className="border-t border-[rgba(0,240,192,0.08)] pt-3 mt-3 flex flex-col gap-2">
              {[
                { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: profile.phone, href: '#' },
                { icon: Github, label: 'GitHub', href: profile.github },
                { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleLink(e, href)}
                  className="flex items-center gap-2 font-rajdhani text-sm text-text-muted hover:text-cyan transition-colors"
                >
                  <Icon size={12} className="text-cyan/40 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </a>
              ))}
            </div>
          </GlassPanel>

          {/* Stat bars */}
          <GlassPanel>
            <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-4 uppercase">
              // CORE STATS //
            </div>
            {profile.stats.map((stat, i) => (
              <StatBar key={stat.name} label={stat.name} value={stat.value} index={i} />
            ))}
          </GlassPanel>
        </div>

        {/* RIGHT COL — Experience timeline */}
        <div className="lg:col-span-2">
          <GlassPanel className="h-full">
            <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-5 uppercase">
              // MISSION LOG //
            </div>
            <div className="flex flex-col gap-5">
              {profile.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="relative pl-5"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-cyan/60 border border-cyan/30" />
                  {/* Timeline line */}
                  {i < profile.experience.length - 1 && (
                    <div className="absolute left-[3px] top-4 bottom-0 w-px bg-cyan/10" />
                  )}

                  <GlassPanel className="!p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <div className="font-orbitron text-sm text-text-bright">{exp.role}</div>
                        <div className="font-rajdhani text-sm text-cyan/70 mt-0.5">{exp.company}</div>
                      </div>
                      <span className="font-orbitron text-[9px] text-text-muted border border-[rgba(0,240,192,0.12)] px-2 py-1 rounded-sm whitespace-nowrap self-start">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-cyan/40 font-orbitron text-[10px] mt-0.5 flex-shrink-0">▸</span>
                          <span className="font-rajdhani text-sm text-text-muted leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  )
}
