import { motion } from 'framer-motion'
import { Mail, Linkedin, Phone, MapPin, Github } from 'lucide-react'
import { GlassPanel } from '../components/ui/GlassPanel'
import { profile } from '../data/profile'
import { useToast } from '../context/ToastContext'

const contacts = [
  { icon: Mail,    label: 'EMAIL',    value: profile.email,    href: `mailto:${profile.email}`, real: true },
  { icon: Phone,   label: 'PHONE',    value: profile.phone,    href: '#', real: false },
  { icon: Github,  label: 'GITHUB',   value: 'github.com/gurkirat', href: profile.github, real: false },
  { icon: Linkedin,label: 'LINKEDIN', value: 'linkedin.com/in/gurkirat', href: profile.linkedin, real: false },
  { icon: MapPin,  label: 'LOCATION', value: profile.location, href: null, real: true },
]

export function Connections() {
  const { showToast } = useToast()

  const handleLink = (e, contact) => {
    if (!contact.real || contact.href === '#') {
      e.preventDefault()
      showToast('🔗 LINK COMING SOON — CHECK BACK')
    }
  }

  return (
    <motion.div
      className="p-6 flex flex-col items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="font-orbitron text-[10px] text-cyan/40 tracking-[3px] mb-8 uppercase self-start">
        // CONNECTIONS //
      </div>

      <GlassPanel className="w-full max-w-lg">
        {/* Status */}
        <div className="text-center mb-6">
          <h2 className="font-orbitron text-lg text-text-bright tracking-widest mb-3 uppercase">
            INITIATE CONTACT
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-green-400/30 bg-green-400/5 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-orbitron text-[10px] text-green-400 tracking-[2px]">
              AVAILABLE FOR NEW MISSIONS
            </span>
          </div>
        </div>

        {/* Contact rows */}
        <div className="flex flex-col gap-2 mb-6">
          {contacts.map((contact) => {
            const Icon = contact.icon
            const isClickable = contact.href && contact.href !== null
            const Tag = isClickable ? 'a' : 'div'
            return (
              <Tag
                key={contact.label}
                href={contact.href || undefined}
                onClick={isClickable ? (e) => handleLink(e, contact) : undefined}
                className={[
                  'flex items-center gap-4 p-3 border border-[rgba(0,240,192,0.08)] rounded-sm',
                  isClickable ? 'hover:border-cyan/30 hover:bg-cyan/3 transition-all cursor-pointer' : '',
                ].join(' ')}
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-cyan/15 rounded-sm bg-cyan/5">
                  <Icon size={14} className="text-cyan/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-orbitron text-[8px] text-text-muted tracking-[2px] mb-0.5">{contact.label}</div>
                  <div className="font-rajdhani text-sm text-text-bright truncate">{contact.value}</div>
                </div>
              </Tag>
            )
          })}
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-center gap-2 py-2.5 border border-cyan/30 text-cyan hover:bg-cyan/10 transition-all font-orbitron text-[10px] tracking-widest rounded-sm"
          >
            <Mail size={13} />
            EMAIL
          </a>
          <a
            href={profile.linkedin}
            onClick={(e) => {
              if (profile.linkedin === '#') { e.preventDefault(); showToast('🔗 LINK COMING SOON — CHECK BACK') }
            }}
            className="flex items-center justify-center gap-2 py-2.5 border border-[rgba(0,240,192,0.15)] text-text-muted hover:border-cyan/30 hover:text-cyan transition-all font-orbitron text-[10px] tracking-widest rounded-sm"
          >
            <Linkedin size={13} />
            LINKEDIN
          </a>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
