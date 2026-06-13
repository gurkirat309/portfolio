import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ScanlineOverlay } from './components/layout/ScanlineOverlay'
import { CornerBrackets } from './components/layout/CornerBrackets'
import { TopHUD } from './components/layout/TopHUD'
import { BottomHUD } from './components/layout/BottomHUD'
import { NavPanel } from './components/layout/NavPanel'
import { ArcMenu } from './components/ui/ArcMenu'
import { BootScreen } from './components/BootScreen'
import { ToastNotification } from './components/ui/ToastNotification'
import { ToastProvider } from './context/ToastContext'

import { MainMenu } from './screens/MainMenu'
import { CharacterProfile } from './screens/CharacterProfile'
import { SkillTree } from './screens/SkillTree'
import { QuestLog } from './screens/QuestLog'
import { Achievements } from './screens/Achievements'
import { Inventory } from './screens/Inventory'
import { Connections } from './screens/Connections'

const screens = {
  menu:         MainMenu,
  profile:      CharacterProfile,
  skills:       SkillTree,
  quests:       QuestLog,
  achievements: Achievements,
  inventory:    Inventory,
  connections:  Connections,
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [currentScreen, setCurrentScreen] = useState('menu')

  const ActiveScreen = screens[currentScreen] || MainMenu

  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-void font-rajdhani overflow-hidden">
        <ScanlineOverlay />
        <CornerBrackets />
        <TopHUD />

        {!booted && <BootScreen onComplete={() => setBooted(true)} />}

        {/* Arc menu — fixed overlay, desktop only */}
        <ArcMenu currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

        <div
          className="flex"
          style={{ height: 'calc(100vh - 52px - 36px)', marginTop: 52 }}
        >
          {/* Sidebar nav — mobile only */}
          <div className="md:hidden flex-shrink-0">
            <NavPanel currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          </div>

          <main className="flex-1 overflow-y-auto md:pl-[300px] lg:pl-[375px]">
            <AnimatePresence mode="wait">
              <ActiveScreen
                key={currentScreen}
                onEnter={(screen) => setCurrentScreen(screen || 'profile')}
              />
            </AnimatePresence>
          </main>
        </div>

        <BottomHUD />
        <ToastNotification />
      </div>
    </ToastProvider>
  )
}
