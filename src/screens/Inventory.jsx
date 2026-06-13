import { motion } from 'framer-motion'
import { Github, Linkedin, FileText, Mail, ChevronRight } from 'lucide-react'
import { GlassPanel } from '../components/ui/GlassPanel'
import { arsenal } from '../data/inventory'
import { profile } from '../data/profile'
import { useToast } from '../context/ToastContext'

const dispatchLinks = [
  { label: 'GitHub',   icon: Github,   href: profile.github },
  { label: 'LinkedIn', icon: Linkedin, href: profile.linkedin },
  { label: 'Resume',   icon: FileText, href: '#' },
  { label: 'Email',    icon: Mail,     href: `mailto:${profile.email}` },
]

const categoryColors = {
  'Language': 'text-cyan border-cyan/20',
  'AI/ML':    'text-purple border-purple/30',
  'Backend':  'text-blue border-blue/20',
  'Frontend': 'text-cyan border-cyan/20',
  'Database': 'text-gold border-gold/20',
  'DevOps':   'text-text-muted border-[rgba(0,240,192,0.15)]',
  'Cloud':    'text-text-bright border-[rgba(0,240,192,0.15)]',
}

export function Inventory() {
  const { showToast } = useToast()

  const handleLink = (e, href) => {
    if (!href || href === '#') {
      e.preventDefault()
      showToast('🔗 LINK COMING SOON — CHECK BACK')
    }
  }

  return (
    <motion.div
      className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Arsenal */}
      <GlassPanel>
        <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-5 uppercase">
          // ARSENAL //
        </div>
        <div className="flex flex-col gap-4">
          {Object.entries(arsenal).map(([category, items]) => (
            <div key={category}>
              <div className="font-orbitron text-[9px] text-text-muted tracking-[2px] mb-2 uppercase">
                {category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className={`font-rajdhani text-xs px-2.5 py-1 border rounded-sm ${categoryColors[category] || 'text-text-muted border-[rgba(0,240,192,0.12)]'}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Dispatch Links */}
      <div className="flex flex-col gap-4">
        <GlassPanel>
          <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-5 uppercase">
            // DISPATCH LINKS //
          </div>
          <div className="flex flex-col gap-2">
            {dispatchLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleLink(e, href.startsWith('mailto:') ? null : href)}
                className="flex items-center justify-between w-full px-4 py-3 border border-cyan/20 hover:border-cyan text-text-muted hover:text-text-bright transition-all duration-150 group rounded-sm"
              >
                <div className="flex items-center gap-3">
                  <Icon size={15} className="text-cyan/50 group-hover:text-cyan transition-colors" />
                  <span className="font-rajdhani font-semibold tracking-wide">{label}</span>
                </div>
                <ChevronRight size={14} className="text-cyan/30 group-hover:text-cyan transition-colors" />
              </a>
            ))}
          </div>
        </GlassPanel>

        {/* Status card */}
        <GlassPanel>
          <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-3 uppercase">
            // SYSTEM STATUS //
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-orbitron text-xs text-green-400 tracking-widest">AVAILABLE FOR HIRE</span>
          </div>
          <p className="font-rajdhani text-sm text-text-muted leading-relaxed">
            Open to full-time AI/ML engineering roles and research collaborations.
            Currently based in Bangalore, India. Remote-friendly.
          </p>
        </GlassPanel>
      </div>
    </motion.div>
  )
}
