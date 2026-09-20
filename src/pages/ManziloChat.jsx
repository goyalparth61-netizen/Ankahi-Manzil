import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Bot, Compass, Send, Sparkles, Trash2
} from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

const quickPrompts = [
  'Can I add paragliding in Manali tomorrow?',
  'What happens if my flight gets delayed?',
  'Find great cafes near Old Manali under ₹800',
  'Why did you change my afternoon itinerary?',
  'Can I reduce tomorrow’s budget by ₹2,000?',
]

const initialMessages = [
  {
    id: 1,
    sender: 'manzilo',
    time: 'Just now',
    text: "Namaste! I'm Manzilo, your adaptive travel companion. Unlike a regular chatbot, I continuously monitor weather, transit timetables, venue openings, and budget limits. How can I assist with your journey today?",
    widget: null,
  },
]

function generateManziloResponse(query) {
  const q = query.toLowerCase()
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (q.includes('paragliding') || q.includes('solang')) {
    return {
      id: Date.now() + 1,
      sender: 'manzilo',
      time,
      text: 'I checked the wind conditions and operating slots for Solang Valley tomorrow. Early morning (08:30 – 11:00) has low wind shear and clear visibility. Here is how I can insert it without causing schedule collision:',
      widget: {
        type: 'itinerary-update',
        title: 'Proposed Schedule Adjustment',
        items: [
          { time: '08:30 AM', desc: 'Solang Valley Paragliding', status: 'Optimal window' },
          { time: '11:45 AM', desc: 'Jogini Waterfall Trail', status: 'Shifted +45m' },
          { time: '01:30 PM', desc: 'Lunch at Cafe 1947', status: 'No change' },
        ],
        impact: 'Total added cost: ₹2,200 (within remaining buffer).',
      },
    }
  }

  if (q.includes('flight') || q.includes('delay')) {
    return {
      id: Date.now() + 1,
      sender: 'manzilo',
      time,
      text: 'If your flight is delayed, my Sentinel monitor detects the status change and protects the rest of your first day:',
      widget: {
        type: 'sentinel-protocol',
        title: 'Automated Flight Delay Protocol',
        steps: [
          'Adjust the airport pickup window.',
          'Protect the hotel reservation from late-arrival issues.',
          'Re-sequence Day 1 activities around the revised arrival time.',
        ],
        guarantee: 'Demo protocol — partner API actions are not connected on this frontend branch.',
      },
    }
  }

  if (q.includes('cafe') || q.includes('food') || q.includes('lunch')) {
    return {
      id: Date.now() + 1,
      sender: 'manzilo',
      time,
      text: 'Here are three cafe options in Old Manali that fit the budget context used in this demo:',
      widget: {
        type: 'recommendations',
        title: 'Curated Old Manali Cafes',
        places: [
          { name: 'Cafe 1947', highlight: 'Riverside Italian and acoustic music', avg: '₹600 for two' },
          { name: 'Drifters’ Inn & Cafe', highlight: 'Coffee, waffles and a relaxed library vibe', avg: '₹550 for two' },
          { name: 'The Lazy Dog', highlight: 'Terrace seating overlooking the river', avg: '₹750 for two' },
        ],
      },
    }
  }

  if (q.includes('change') || q.includes('why did you change') || q.includes('replan')) {
    return {
      id: Date.now() + 1,
      sender: 'manzilo',
      time,
      text: 'I adjusted the afternoon itinerary because the demo scenario detected a localized rain alert around the mountain pass. The alternative reduces schedule drift while keeping the experience close to your interests.',
      widget: {
        type: 'reasoning-log',
        title: 'Why the plan changed',
        rationale: 'Demo signal: 85% rain probability → outdoor trail replaced with an indoor cultural stop. Distance delta: 1.2 km closer. Cost delta: -₹150.',
      },
    }
  }

  if (q.includes('budget') || q.includes('reduce') || q.includes('cost')) {
    return {
      id: Date.now() + 1,
      sender: 'manzilo',
      time,
      text: 'I reviewed the demo expense plan. Switching transport and dinner choices can reduce the day cost without removing a core experience.',
      widget: {
        type: 'budget-optimization',
        title: 'Budget Rebalancing Plan',
        savings: '₹2,150 Saved',
        changes: [
          { from: 'Full-day private cab (₹3,200)', to: 'Electric tourist shuttle (₹650)' },
          { from: 'Hotel multicuisine dinner (₹2,200)', to: 'Himachali thali (₹1,600)' },
        ],
      },
    }
  }

  return {
    id: Date.now() + 1,
    sender: 'manzilo',
    time,
    text: `I’ve considered “${query}” in the context of this demo journey. I can help re-sequence stops, compare alternatives, and explain the trade-offs behind a plan change. What would you like to optimize first?`,
    widget: null,
  }
}

function ResponseWidget({ widget }) {
  if (!widget) return null

  return (
    <div className="mt-3 rounded-2xl border border-am-cyan/15 bg-navy-950/65 p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-am-cyan">
        <Sparkles size={13} />
        {widget.title}
      </div>

      {widget.items && (
        <div className="space-y-2">
          {widget.items.map((item) => (
            <div key={item.time} className="grid gap-1 rounded-xl border border-white/6 bg-white/[.025] p-3 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
              <span className="font-mono text-xs text-am-gold">{item.time}</span>
              <span className="text-xs font-semibold text-text-primary">{item.desc}</span>
              <span className="text-[10px] text-am-green">{item.status}</span>
            </div>
          ))}
        </div>
      )}

      {widget.steps && (
        <div className="space-y-2">
          {widget.steps.map((step) => (
            <div key={step} className="rounded-xl border border-white/6 bg-white/[.025] px-3 py-2.5 text-xs leading-5 text-text-secondary">
              {step}
            </div>
          ))}
        </div>
      )}

      {widget.places && (
        <div className="grid gap-2 md:grid-cols-3">
          {widget.places.map((place) => (
            <div key={place.name} className="rounded-xl border border-white/6 bg-white/[.025] p-3">
              <p className="text-xs font-bold text-text-primary">{place.name}</p>
              <p className="mt-1 text-[11px] leading-5 text-text-secondary">{place.highlight}</p>
              <p className="mt-2 font-mono text-[10px] text-am-gold">{place.avg}</p>
            </div>
          ))}
        </div>
      )}

      {widget.changes && (
        <div className="space-y-2">
          {widget.changes.map((change) => (
            <div key={change.from} className="grid gap-1 rounded-xl border border-white/6 bg-white/[.025] p-3 text-xs sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <span className="text-am-orange/70 line-through">{change.from}</span>
              <span className="text-text-muted">→</span>
              <span className="font-semibold text-am-green">{change.to}</span>
            </div>
          ))}
        </div>
      )}

      {widget.rationale && <p className="text-xs leading-6 text-text-secondary">{widget.rationale}</p>}
      {widget.impact && <p className="mt-3 text-xs font-semibold text-am-gold">{widget.impact}</p>}
      {widget.guarantee && <p className="mt-3 text-[11px] leading-5 text-text-muted">{widget.guarantee}</p>}
      {widget.savings && <p className="mt-3 text-sm font-bold text-am-green">{widget.savings}</p>}
    </div>
  )
}

export default function ManziloChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (textToSend) => {
    const query = textToSend || input
    if (!query.trim() || isTyping) return

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: query,
      },
    ])
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      setMessages((current) => [...current, generateManziloResponse(query)])
      setIsTyping(false)
    }, 900)
  }

  return (
    <PageTransition>
      <div className="app-page">
        <div className="page-shell">
          <header className="app-header">
            <div>
              <div className="kicker mb-4">
                <Bot size={14} className="text-am-cyan" />
                Manzilo intelligence
              </div>
              <h1>
                Ask the journey,
                <span className="block gradient-text-cyan">not just the chatbot.</span>
              </h1>
              <p className="copy-lg mt-4 max-w-2xl">
                Explore alternatives, understand replans, and pressure-test your itinerary through a conversational travel workspace.
              </p>
            </div>
            <Link to="/plan" className="btn-primary self-start">
              Open trip planner
              <ArrowRight size={15} />
            </Link>
          </header>

          <div className="grid gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <aside className="space-y-4">
              <div className="travel-panel rounded-[1.35rem] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-am-cyan/20 to-am-purple/20 text-am-cyan">
                    <Compass size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Journey context</p>
                    <p className="text-[11px] text-am-green">● Demo sentinel active</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="rounded-xl border border-white/6 bg-white/[.025] p-3">
                    <p className="text-[10px] uppercase tracking-[.13em] text-text-muted">Current route</p>
                    <p className="mt-1 font-semibold text-text-primary">Manali • 4 days • ₹20,000</p>
                  </div>
                  <div className="rounded-xl border border-white/6 bg-white/[.025] p-3">
                    <p className="text-[10px] uppercase tracking-[.13em] text-text-muted">What Manzilo can explain</p>
                    <p className="mt-1 leading-5">Budget trade-offs, itinerary changes, delays, activities, and alternative stops.</p>
                  </div>
                </div>
              </div>

              <div className="travel-panel rounded-[1.35rem] p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[.13em] text-text-muted">Try asking</p>
                  <Sparkles size={14} className="text-am-gold" />
                </div>
                <div className="space-y-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="w-full rounded-xl border border-white/6 bg-white/[.025] p-3 text-left text-xs leading-5 text-text-secondary hover:border-am-cyan/20 hover:bg-am-cyan/[.04] hover:text-text-primary"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <section className="chat-shell flex min-h-[42rem] flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/7 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-am-cyan/12 text-am-cyan">
                    <Bot size={20} />
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-950 bg-am-green" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Manzilo</p>
                    <p className="text-[10px] text-text-muted">Adaptive travel reasoning demo</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMessages(initialMessages)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/7 text-text-muted hover:bg-white/5 hover:text-text-primary"
                  aria-label="Clear Manzilo conversation"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'manzilo' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-am-cyan/12 text-am-cyan">
                        <Bot size={15} />
                      </div>
                    )}

                    <div className="max-w-[88%] sm:max-w-[78%]">
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.sender === 'user'
                          ? 'rounded-tr-md bg-am-orange text-white'
                          : 'rounded-tl-md border border-white/7 bg-white/[.035] text-text-primary'
                      }`}>
                        {message.text}
                      </div>
                      <ResponseWidget widget={message.widget} />
                      <p className={`mt-1 text-[10px] text-text-muted ${message.sender === 'user' ? 'text-right' : ''}`}>{message.time}</p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-am-cyan/12 text-am-cyan">
                      <Bot size={15} />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-white/7 bg-white/[.035] px-4 py-3">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="h-1.5 w-1.5 rounded-full bg-am-cyan"
                          animate={{ opacity: [.25, 1, .25], y: [0, -2, 0] }}
                          transition={{ repeat: Infinity, duration: .8, delay: dot * .12 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-white/7 bg-navy-950/55 p-3 sm:p-4">
                <div className="flex items-center gap-2 rounded-2xl border border-white/9 bg-navy-900/90 p-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && handleSend()}
                    aria-label="Message Manzilo"
                    placeholder="Ask about your route, budget, weather scenario, or a replan…"
                    className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm outline-none focus:shadow-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message to Manzilo"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-am-orange text-white shadow-[0_10px_24px_rgba(255,107,53,.22)] disabled:opacity-40"
                  >
                    <Send size={17} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
