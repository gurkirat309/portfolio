export function CornerBrackets() {
  const size = 18
  const style = { width: size, height: size }
  const color = 'rgba(0,240,192,0.5)'

  return (
    <>
      {/* Top-left */}
      <div className="fixed top-0 left-0 z-40 pointer-events-none" style={style}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: size, height: size,
          borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      </div>
      {/* Top-right */}
      <div className="fixed top-0 right-0 z-40 pointer-events-none" style={style}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: size, height: size,
          borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
      </div>
      {/* Bottom-left */}
      <div className="fixed bottom-0 left-0 z-40 pointer-events-none" style={style}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: size, height: size,
          borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      </div>
      {/* Bottom-right */}
      <div className="fixed bottom-0 right-0 z-40 pointer-events-none" style={style}>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: size, height: size,
          borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
      </div>
    </>
  )
}
