import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles } from 'lucide-react'
import { useGame } from '../../context/GameContext'

const GREETING =
  "FRIDAY online. I'm Gurkirat's onboard AI — ask me about his projects, skills, experience, or how to reach him."

const SUGGESTIONS = [
  "What's his strongest stack?",
  'Tell me about his best project',
  'Is he available for hire?',
  'What has he won?',
]

// Reveals text character-by-character, then calls onDone once.
function Typewriter({ text, onDone, onTick }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setN(i)
      onTick?.()
      if (i >= text.length) {
        clearInterval(id)
        onDone?.()
      }
    }, 12)
    return () => clearInterval(id)
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="text-cyan animate-pulse">▋</span>}
    </>
  )
}

export function FridayChat({ open, setOpen }) {
  const { award } = useGame()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: GREETING, revealed: false },
  ])
  const scrollRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, loading, scrollToBottom])

  // Award XP the first time FRIDAY is opened (deduped in GameContext).
  useEffect(() => {
    if (open) award('friday:online', 50, 'FRIDAY ONLINE')
  }, [open, award])

  const markRevealed = useCallback((idx) => {
    setMessages(prev => prev.map((m, i) => (i === idx ? { ...m, revealed: true } : m)))
  }, [])

  const send = async (text) => {
    const query = (text ?? input).trim()
    if (!query || loading) return

    const next = [...messages, { role: 'user', content: query, revealed: true }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      const reply = res.ok
        ? data.reply
        : (data.error || 'FRIDAY hit an error. Try again.')
      setMessages(prev => [...prev, { role: 'assistant', content: reply, revealed: false }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Connection lost — FRIDAY is unreachable right now.', revealed: false },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-[52px] right-5 z-[60] w-14 h-14 rounded-full flex items-center justify-center border border-cyan/50 bg-void/90 text-cyan shadow-[0_0_22px_rgba(0,240,192,0.3)] hover:shadow-[0_0_30px_rgba(0,240,192,0.5)] transition-shadow"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open FRIDAY assistant"
      >
        <span className="absolute inset-0 rounded-full border border-cyan/30 animate-ping opacity-40" />
        {open ? <X size={22} /> : <Bot size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[120px] right-5 z-[60] w-[360px] max-w-[calc(100vw-2.5rem)] h-[480px] max-h-[calc(100vh-180px)] flex flex-col bg-void/95 border border-cyan/25 rounded-sm overflow-hidden panel-top-line backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan/15 bg-panel">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                  <Bot size={16} className="text-cyan" />
                </div>
                <div className="leading-tight">
                  <div className="font-orbitron text-[11px] tracking-[2px] text-text-bright">FRIDAY</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-orbitron text-[8px] tracking-[2px] text-green-400">NEURAL UPLINK</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-cyan transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-sm font-rajdhani text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-cyan/10 border border-cyan/25 text-text-bright'
                        : 'bg-panel border border-[rgba(0,240,192,0.12)] text-text-muted'
                    }`}
                  >
                    {m.role === 'assistant' && !m.revealed ? (
                      <Typewriter text={m.content} onDone={() => markRevealed(i)} onTick={scrollToBottom} />
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-sm bg-panel border border-[rgba(0,240,192,0.12)] font-orbitron text-[9px] tracking-[2px] text-cyan/70">
                    PROCESSING<span className="animate-pulse">...</span>
                  </div>
                </div>
              )}

              {/* Suggestion chips — only before the first user message */}
              {messages.length === 1 && !loading && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-cyan/20 text-cyan/80 hover:border-cyan hover:text-cyan font-rajdhani text-xs transition-colors"
                    >
                      <Sparkles size={11} />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-cyan/15 p-3 bg-panel">
              <div className="flex items-center gap-2">
                <span className="font-orbitron text-cyan text-xs">▸</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Query the operator..."
                  className="flex-1 bg-transparent outline-none font-rajdhani text-sm text-text-bright placeholder:text-text-muted/50"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="text-cyan disabled:text-text-muted/40 hover:text-text-bright transition-colors"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
