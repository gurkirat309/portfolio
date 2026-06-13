# GURKIRAT.OS Portfolio — Claude Context

## Project
AAA game-UI style personal portfolio for Gurkirat Singh (AI/ML Engineer).
Stack: React (Vite) + Tailwind CSS v3 + Framer Motion + Lucide React.

## Dev commands
```bash
npm run dev      # start dev server (localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview built dist/
```

> SSL note: if npm install fails with UNABLE_TO_VERIFY_LEAF_SIGNATURE, run:
> `npm config set strict-ssl false` then retry.

## Project structure
```
src/
  App.jsx                  # root — ToastProvider, screen state, layout
  context/
    ToastContext.jsx        # global toast (useToast hook)
  components/
    BootScreen.jsx          # full-screen boot animation, auto-dismiss 2.5s
    layout/
      TopHUD.jsx            # fixed top bar, signal dots
      BottomHUD.jsx         # fixed bottom bar, session timer
      NavPanel.jsx          # 200px sidebar, collapses to 56px on mobile
      CornerBrackets.jsx    # CSS corner decorations
      ScanlineOverlay.jsx   # CRT scanline effect
    ui/
      GlassPanel.jsx        # reusable panel wrapper
      XPBar.jsx             # animated XP progress bar
      StatBar.jsx           # labeled stat bar with stagger animation
      SkillNode.jsx         # skill tile — unlocked / inProgress / locked
      QuestCard.jsx         # project card with progress bar
      AchievementCard.jsx   # achievement tile with gold hover glow
      ToastNotification.jsx # bottom-center toast via AnimatePresence
  screens/
    MainMenu.jsx            # landing screen with quick stats + enter button
    CharacterProfile.jsx    # two-col: avatar/stats left, experience right
    SkillTree.jsx           # filterable skill grid
    QuestLog.jsx            # project cards stack
    Achievements.jsx        # grouped by hackathon / cert / stat
    Inventory.jsx           # arsenal tag clouds + dispatch links
    Connections.jsx         # contact panel
  hooks/
    useSessionTimer.js      # returns "HH:MM:SS" string, increments every 1s
    useScreenTransition.js  # screen state + 150ms transition helper
  data/
    profile.js              # name, level, xp, stats, experience
    skills.js               # skill list with unlocked/inProgress/locked state
    quests.js               # projects with status, progress, github/live links
    achievements.js         # hackathons, certs, stat records
    inventory.js            # arsenal categories + dispatch links
```

## Design system (MANDATORY — never deviate)
- **Fonts**: `font-orbitron` for display/HUD/badges, `font-rajdhani` for body/nav
- **Background**: `bg-void` (#070a0f)
- **Accent palette**: cyan `#00f0c0`, blue `#0080ff`, purple `#6040c0`, gold `#ffaa00`
- **Panel wrapper**: always use `<GlassPanel>` — `bg-panel border border-[rgba(0,240,192,0.12)]`
- **Screen tag format**: `// SCREEN NAME //` in `font-orbitron text-[10px] text-cyan/40 tracking-[3px]`
- **Placeholder links**: any `href="#"` must call `showToast('🔗 LINK COMING SOON — CHECK BACK')` and `e.preventDefault()`

## Adding a new screen
1. Create `src/screens/MyScreen.jsx` — wrap content in `<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}}>`
2. Add entry to `screens` object in `App.jsx`
3. Add nav item to `navItems` array in `NavPanel.jsx`

## Updating real data
Edit files in `src/data/` — no other changes needed. Links currently set to `'#'` will show the "coming soon" toast until replaced with real URLs.
