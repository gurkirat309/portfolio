import { motion } from 'framer-motion'
import {
  LayoutDashboard, User, GitBranch, ListChecks,
  Trophy, Archive, Globe, Bot,
} from 'lucide-react'
import { XPBar } from '../ui/XPBar'
import { profile } from '../../data/profile'

const navItems = [
  { id: 'menu',         icon: LayoutDashboard, label: 'Main Menu',    badge: null },
  { id: 'profile',      icon: User,            label: 'Profile',      badge: null },
  { id: 'skills',       icon: GitBranch,       label: 'Skill Tree',   badge: '24' },
  { id: 'quests',       icon: ListChecks,      label: 'Quest Log',    badge: '3' },
  { id: 'achievements', icon: Trophy,          label: 'Achievements', badge: '9' },
  { id: 'inventory',    icon: Archive,         label: 'Inventory',    badge: null },
  { id: 'connections',  icon: Globe,           label: 'Connections',  badge: null },
]

export function NavPanel({ currentScreen, setCurrentScreen }) {
  return (
    <nav
      className="flex-shrink-0 flex flex-col"
      style={{
        width: 200,
        borderRight: '1px solid rgba(0,240,192,0.08)',
        background: 'rgba(7,10,15,0.6)',
        minWidth: 56,
      }}
    >
      {/* Nav items */}
      <div className="flex-1 py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={[
                'w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 relative text-left',
                active
                  ? 'border-l-2 border-cyan bg-cyan/5 text-cyan'
                  : 'border-l-2 border-transparent text-text-muted hover:bg-cyan/5 hover:text-text-bright',
              ].join(' ')}
            >
              {active && (
                <motion.div
                  layoutId="nav-active-glow"
                  className="absolute inset-0 bg-cyan/3 pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              )}
              <Icon size={15} className="flex-shrink-0" />
              <span className="font-rajdhani text-sm font-semibold tracking-wide hidden md:block truncate">
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto font-orbitron text-[9px] text-cyan/60 hidden md:block">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Player card */}
      <div
        className="p-3 border-t"
        style={{ borderColor: 'rgba(0,240,192,0.08)' }}
      >
        {/* Avatar hex */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className="hex-clip flex-shrink-0 flex items-center justify-center bg-cyan/10"
            style={{ width: 32, height: 32 }}
          >
            <Bot size={16} className="text-cyan" />
          </div>
          <div className="hidden md:block overflow-hidden">
            <div className="font-orbitron text-[9px] text-cyan/70 tracking-[2px] truncate">
              {profile.handle}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-orbitron text-base text-text-bright font-bold">
                LV {profile.level}
              </span>
              <span className="font-rajdhani text-[10px] text-text-muted uppercase tracking-wide">
                {profile.class}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <XPBar current={profile.xp.current} max={profile.xp.max} />
        </div>
      </div>
    </nav>
  )
}
