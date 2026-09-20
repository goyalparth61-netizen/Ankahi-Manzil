import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Compass, Send, Sparkles, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { chatWithManzilo } from '../services/manziloService'
import PageTransition from '../components/layout/PageTransition'

const quick = [
  'Can I add paragliding tomorrow?',
  'Help me reduce the budget',
  'What if my flight is delayed?',
  'Why did you change the itinerary?',
  'Find cafes near my trip',
]

const firstMessage = {
  id: 'hello',
  sender: 'manzilo',
  text: 'Tell me what kind of trip you are trying to make. When the FastAPI backend is online, I can use persisted trip context, conversation memory and rich travel widgets.',
  widget: null,
  source: 'local',
}

function Widget({ widget }) {
  if (!widget) return null

  return (
    <div className="mt-3 rounded-2xl border border-am-cyan/15 bg-am-cyan/[.045] p-4">
      <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
        <Sparkles size={13} />
        {widget.title || 'Manzilo insight'}
      </div>

      {widget.items && (
        <div className="mt-3 space-y-2">
          {widget.items.map((item) => (
            <div key={item.time + item.desc} className="grid gap-1 rounded-xl border border-white/7 bg-black/10 p-3 sm:grid-cols-[5rem_1fr_auto]">
              <span className="font-mono text-[10px] text-am-gold">{item.time}</span>
              <span className="text-xs font-semibold">{item.desc}</span>
              <span className="text-[10px] text-am-green">{item.status}</span>
            </div>
          ))}
        </div>
      )}

      {widget.steps && (
        <div className="mt-3 space-y-2">
          {widget.steps.map((step) => (
            <div key={step} className="rounded-xl border border-white/7 bg-black/10 px-3 py-2 text-xs leading-5 text-text-secondary">
              {step}
            </div>
          ))}
        </div>
      )}

      {widget.places && (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {widget.places.map((place) => (
            <div key={place.name} className="rounded-xl border border-white/7 bg-black/10 p-3">
              <p className="text-xs font-bold">{place.name}</p>
              <p className="mt-1 text-[11px] leading-5 text-text-secondary">{place.highlight}</p>
              <p className="mt-2 text-[10px] font-bold text-am-gold">{place.avg}</p>
            </div>
          ))}
        </div>
      )}

      {widget.changes && (
        <div className="mt-3 space-y-2">
          {widget.changes.map((change) => (
            <div key={change.from} className="rounded-xl border border-white/7 bg-black/10 p-3 text-xs">
              <p className="text-am-orange/70 line-through">{change.from}</p>
              <p className="mt-1 font-semibold text-am-green">{change.to}</p>
            </div>
          ))}
        </div>
      )}

      {widget.rationale && <p className="mt-3 text-xs leading-6 text-text-secondary">{widget.rationale}</p>}
      {widget.impact && <p className="mt-3 text-xs font-semibold text-am-gold">{widget.impact}</p>}
      {widget.guarantee && <p className="mt-3 text-[11px] leading-5 text-text-muted">{widget.guarantee}</p>}
      {widget.savings && <p className="mt-3 text-sm font-bold text-am-green">{widget.savings}</p>}
    </div>
  )
}

function getLatestTripId() {
  try {
    const saved = JSON.parse(localStorage.getItem('am_saved_trips') || '[]')
    return saved?.[0]?.id || saved?.[0]?.tripId || null
  } catch {
    return null
  }
}

export default function ManziloChat() {
  const [messages, setMessages] = useState([firstMessage])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const [source, setSource] = useState('local')
  const endRef = useRef(null)
  const tripId = useMemo(() => getLatestTripId(), [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async (preset) => {
    const message = (preset || input).trim()
    if (!message || typing) return

    setMessages((current) => [...current, { id: Date.now(), sender: 'user', text: message }])
    setInput('')
    setTyping(true)

    try {
      const result = await chatWithManzilo(message, conversationId, tripId)
      setConversationId(result.conversationId || conversationId)
      setSource(result.source || 'local')
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'manzilo',
          text: result.response,
          widget: result.widget || null,
          source: result.source || 'local',
        },
      ])
    } finally {
      setTyping(false)
    }
  }

  const clearConversation = () => {
    setMessages([firstMessage])
    setConversationId(null)
    setSource('local')
  }

  return (
    <PageTransition>
      <section className="ai-shell">
        <div className="page-shell mb-5 px-0">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="eyebrow mb-4">
                <Bot size={13} className="text-am-cyan" />
                Conversation workspace
              </div>
              <h1 className="display-sm max-w-[12ch]">
                Ask Manzilo
                <span className="block serif-accent">inside the journey.</span>
              </h1>
            </div>
            <Link to="/plan" className="button-primary self-start">
              Open Journey Composer
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="page-shell grid gap-3 px-0 lg:grid-cols-[19rem_minmax(0,1fr)]">
          <aside className="ai-pane self-start">
            <div className="ai-pane-header">
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-text-muted">Current context</p>
            </div>
            <div className="ai-pane-body">
              <div className="flex items-center gap-3">
                <span className="ai-orb" />
                <div>
                  <p className="text-sm font-semibold">Manzilo</p>
                  <p className={`text-[10px] ${source === 'backend' ? 'text-am-green' : 'text-am-gold'}`}>
                    {source === 'backend' ? 'FastAPI agent connected' : 'local fallback active'}
                  </p>
                </div>
              </div>

              <div className="mt-5 surface-soft rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <Compass size={13} className="text-am-orange" />
                  Trip grounding
                </div>
                <p className="mt-2 text-[11px] leading-5 text-text-muted">
                  {tripId
                    ? `Latest saved trip ID: ${tripId}. It is sent with each backend chat request.`
                    : 'No local trip selected. The backend can still ground the chat to its latest persisted trip.'}
                </p>
                {conversationId && (
                  <p className="mt-2 truncate font-mono text-[10px] text-am-cyan">Conversation: {conversationId}</p>
                )}
              </div>

              <p className="mb-2 mt-5 text-[10px] font-bold uppercase tracking-[.15em] text-text-muted">Try a prompt</p>
              <div className="space-y-2">
                {quick.map((prompt) => (
                  <button key={prompt} type="button" className="ai-nav-item" onClick={() => send(prompt)}>
                    <Sparkles size={13} />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="ai-pane flex min-h-[38rem] flex-col">
            <div className="ai-pane-header flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="ai-orb" />
                <div>
                  <p className="text-sm font-semibold">Manzilo conversation</p>
                  <p className="text-[10px] text-text-muted">Persistent backend memory when connected</p>
                </div>
              </div>
              <button
                type="button"
                onClick={clearConversation}
                aria-label="Clear conversation"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-text-muted hover:bg-white/5 hover:text-white"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div className="max-w-[88%] sm:max-w-[82%]">
                    <div className={message.sender === 'user' ? 'ai-message user' : 'ai-message bot'}>
                      {message.text}
                    </div>
                    <Widget widget={message.widget} />
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="ai-message bot flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-am-cyan"
                        animate={{ opacity: [.25, 1, .25], y: [0, -2, 0] }}
                        transition={{ duration: .8, repeat: Infinity, delay: dot * .12 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-white/8 p-3 sm:p-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/12 p-1.5 pl-4">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && send()}
                  placeholder="Ask about a place, budget, delay, replan or nearby options…"
                  aria-label="Message Manzilo"
                  className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5f2ea] text-[#0b1714] disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>
    </PageTransition>
  )
}
