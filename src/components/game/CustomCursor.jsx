import { useEffect, useRef } from 'react'

// Game-style targeting cursor: an instant center dot + a smooth-trailing
// bracket reticle that "locks on" over interactive elements. Desktop only;
// touch / coarse-pointer devices keep their native behaviour.
const INTERACTIVE = 'a, button, input, select, textarea, label, [role="button"], .arc-slab, [data-cursor="target"]'

export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const target = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const shown = useRef(false)
  const raf = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const reveal = () => {
      if (shown.current) return
      shown.current = true
      dotRef.current && (dotRef.current.style.opacity = '1')
      ringRef.current && (ringRef.current.style.opacity = '1')
    }
    const hide = () => {
      shown.current = false
      dotRef.current && (dotRef.current.style.opacity = '0')
      ringRef.current && (ringRef.current.style.opacity = '0')
    }

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      reveal()
      const lock = e.target.closest?.(INTERACTIVE)
      ringRef.current?.classList.toggle('cursor-ring--lock', !!lock)
    }
    const onDown = () => ringRef.current?.classList.add('cursor-ring--click')
    const onUp = () => ringRef.current?.classList.remove('cursor-ring--click')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)

    const loop = () => {
      const t = target.current
      const r = ringPos.current
      r.x += (t.x - r.x) * 0.2
      r.y += (t.y - r.y) * 0.2
      if (dotRef.current) dotRef.current.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-corner tl" />
        <span className="cursor-corner tr" />
        <span className="cursor-corner bl" />
        <span className="cursor-corner br" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
