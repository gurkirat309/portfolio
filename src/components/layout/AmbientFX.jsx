// Ambient, non-interactive world life rendered behind all content.
// Pure CSS animation (no JS loops) — keeps it cheap and always running.

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  delay: `${(i % 9) * 1.4}s`,
  duration: `${10 + (i % 6) * 3}s`,
  size: i % 4 === 0 ? 2 : 1,
}))

export function AmbientFX() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* deep radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 30%, rgba(0,128,255,0.06) 0%, transparent 45%),' +
            'radial-gradient(circle at 85% 75%, rgba(96,64,192,0.05) 0%, transparent 45%)',
        }}
      />

      {/* perspective grid floor */}
      <div className="ambient-grid absolute inset-x-0 bottom-0" style={{ height: '45%' }} />

      {/* slow radar sweep, anchored bottom-left */}
      <div
        className="absolute"
        style={{ left: '-180px', bottom: '-180px', width: 520, height: 520 }}
      >
        <div className="ambient-radar w-full h-full" />
      </div>

      {/* drifting data particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="ambient-particle absolute rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: 'rgba(0,240,192,0.6)',
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* edge vignette for depth */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 220px rgba(0,0,0,0.7)' }}
      />
    </div>
  )
}
