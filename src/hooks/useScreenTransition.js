import { useState } from 'react'

export function useScreenTransition(initial = 'menu') {
  const [currentScreen, setCurrentScreen] = useState(initial)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigate = (screen) => {
    if (screen === currentScreen || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScreen(screen)
      setIsTransitioning(false)
    }, 150)
  }

  return { currentScreen, navigate, isTransitioning }
}
