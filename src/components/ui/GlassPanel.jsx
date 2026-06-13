export function GlassPanel({ children, className = '' }) {
  return (
    <div
      className={`relative bg-panel border border-[rgba(0,240,192,0.12)] rounded-sm p-4 panel-top-line ${className}`}
    >
      {children}
    </div>
  )
}
