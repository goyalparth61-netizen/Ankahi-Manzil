import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bot, Send, Sparkles, ArrowRight, RefreshCw, AlertTriangle,
  Clock, IndianRupee, MapPin, CheckCircle2, ShieldCheck,
  Compass, MessageCircle, Mic, Trash2
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

export default function ManziloChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsTyping(true)

    // Generate context-aware response
    setTimeout(() => {
      const response = generateManziloResponse(query)
      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 1000)
  }

  const generateManziloResponse = (query) => {
    const q = query.toLowerCase()
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    if (q.includes('paragliding') || q.includes('solang')) {
      return {
        id: Date.now() + 1,
        sender: 'manzilo',
        time,
        text: "I checked the wind conditions and operating slots for Solang Valley tomorrow. Early morning (08:30 – 11:00) has low wind shear and clear visibility. Here is how I can insert it without causing schedule collision:",
        widget: {
          type: 'itinerary-update',
          title: 'Proposed Schedule Adjustment (Solang Valley)',
          items: [
            { time: '08:30 AM', desc: 'Solang Valley Paragliding (Added)', status: 'Optimal Wind Window' },
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
        text: "If your flight is delayed, my Sentinel monitor detects the airline status change immediately. Here is the automated protocol I trigger:",
        widget: {
          type: 'sentinel-protocol',
          title: 'Automated Flight Delay Protocol',
          steps: [
            '1. Auto-alert pre-booked cab driver to adjust airport pickup time.',
            '2. Notify hotel about late arrival so room reservation is held.',
            '3. Compress or reschedule Day 1 evening activity without losing reservations.',
          ],
          guarantee: 'Zero cancellation penalties where automated partner API is active.',
        },
      }
    }

    if (q.includes('cafe') || q.includes('food') || q.includes('lunch')) {
      return {
        id: Date.now() + 1,
        sender: 'manzilo',
        time,
        text: "Here are 3 handpicked cafes in Old Manali matching your budget (under ₹800) and travel preferences:",
        widget: {
          type: 'recommendations',
          title: 'Curated Old Manali Cafes',
          places: [
            { name: 'Cafe 1947', highlight: 'Riverside Italian, live acoustic music', avg: '₹600 for two' },
            { name: 'Drifters’ Inn & Cafe', highlight: 'Artisan coffee, mountain waffles & library', avg: '₹550 for two' },
            { name: 'The Lazy Dog', highlight: 'Terrace overlooking Beas River, herbal teas', avg: '₹750 for two' },
          ],
        },
      }
    }

    if (q.includes('change') || q.includes('why did you change') || q.includes('replan')) {
      return {
        id: Date.now() + 1,
        sender: 'manzilo',
        time,
        text: "I adjusted your afternoon itinerary due to a localized rain alert at 15:30 around the mountain pass. Continuing with the outdoor hike would have caused a 2-hour wet transit delay. Instead, I substituted the Himalayan Cultural Museum and an indoor artisan tea tasting.",
        widget: {
          type: 'reasoning-log',
          title: 'Agentic Decision Reasoning',
          rationale: 'Disruption Risk: 85% Rain Probability → Substituted Outdoor Trail with Indoor Sanctuary. Distance delta: 1.2km closer to hotel. Cost delta: -₹150.',
        },
      }
    }

    if (q.includes('budget') || q.includes('reduce') || q.includes('cost')) {
      return {
        id: Date.now() + 1,
        sender: 'manzilo',
        time,
        text: "I analyzed tomorrow's scheduled expenses. By swapping private taxi hire with the scenic local electric shuttle and selecting a traditional homestyle thali for dinner, we can safely shave off ₹2,150 without sacrificing experience quality.",
        widget: {
          type: 'budget-optimization',
          title: 'Budget Rebalancing Plan',
          savings: '₹2,150 Saved',
          changes: [
            { from: 'Full-day private cab (₹3,200)', to: 'Electric tourist shuttle (₹650)' },
            { from: 'Hotel multicuisine dinner (₹2,200)', to: 'Authentic Himachali Thali (₹1,600)' },
          ],
        },
      }
    }

    return {
      id: Date.now() + 1,
      sender: 'manzilo',
      time,
      text: `I've analyzed your query regarding "${query}". As your journey unfolds, I can re-sequence stops, adjust for traffic or weather shifts, and help you find the most scenic spots. Would you like me to apply an update to your active trip?`,
      widget: null,
    }
  }

  return (
    <PageTransition>
      <div className="pt-24 lg:pt-28 pb-20 relative">
        <div className="container-max mx-auto px-4 lg:px-8 max-w-5xl">
          
          {/* Header Card */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-border-subtle mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-am-cyan/20 to-am-blue/20 border border-am-cyan/30 flex items-center justify-center text-am-cyan shadow-lg shadow-am-cyan/10">
                <Bot size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-text-primary">
                    Manzilo <span className="gradient-text-cyan">Intelligence</span>
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-am-green/20 text-am-green border border-am-green/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-am-green animate-pulse" />
                    Live Sentinel Connected
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  Continuously reasoning over routes, weather radars, and trip logistics.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMessages(initialMessages)}
                aria-label="Clear Manzilo conversation"
                className="p-2 rounded-xl bg-navy-900 border border-border-subtle text-text-secondary hover:text-text-primary text-xs flex items-center gap-1.5"
                title="Clear conversation"
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <Link
                to="/plan"
                className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1"
              >
                Open Trip Planner →
              </Link>
            </div>
          </div>

          {/* CHAT CONTAINER */}
          <div className="glass-card rounded-3xl border border-border-subtle flex flex-col h-[600px] overflow-hidden shadow-2xl">
            
            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'manzilo' && (
                    <div className="w-8 h-8 rounded-xl bg-am-cyan/20 border border-am-cyan/30 flex items-center justify-center text-am-cyan shrink-0">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-am-orange text-white rounded-tr-none shadow-md shadow-am-orange/20'
                          : 'bg-navy-900/90 text-text-primary rounded-tl-none border border-border-subtle'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Rich Interactive Widget */}
                    {msg.widget && (
                      <div className="p-4 rounded-2xl bg-navy-950/80 border border-am-cyan/25 space-y-3 text-xs">
                        <div className="font-bold text-am-cyan flex items-center gap-1.5">
                          <Sparkles size={14} />
                          {msg.widget.title}
                        </div>

                        {msg.widget.items && (
                          <div className="space-y-1.5">
                            {msg.widget.items.map((it, i) => (
                              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60">
                                <span className="font-mono text-am-gold">{it.time}</span>
                                <span className="text-text-primary font-medium">{it.desc}</span>
                                <span className="text-[10px] text-am-green">{it.status}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.widget.steps && (
                          <ul className="space-y-1 text-text-secondary">
                            {msg.widget.steps.map((st, i) => (
                              <li key={i}>{st}</li>
                            ))}
                          </ul>
                        )}

                        {msg.widget.places && (
                          <div className="grid sm:grid-cols-3 gap-2">
                            {msg.widget.places.map((p, i) => (
                              <div key={i} className="p-2.5 rounded-xl bg-navy-900 border border-border-subtle/60">
                                <div className="font-bold text-text-primary">{p.name}</div>
                                <div className="text-[11px] text-text-secondary mt-0.5">{p.highlight}</div>
                                <div className="text-[10px] text-am-gold font-mono mt-1">{p.avg}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.widget.changes && (
                          <div className="space-y-1.5">
                            {msg.widget.changes.map((c, i) => (
                              <div key={i} className="flex items-center justify-between text-text-secondary">
                                <span className="line-through text-am-orange/70">{c.from}</span>
                                <span>→</span>
                                <span className="text-am-green font-medium">{c.to}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.widget.rationale && (
                          <p className="text-text-secondary italic bg-navy-900/40 p-2 rounded-lg">
                            {msg.widget.rationale}
                          </p>
                        )}

                        {msg.widget.impact && (
                          <div className="text-am-gold font-semibold pt-1">
                            {msg.widget.impact}
                          </div>
                        )}
                      </div>
                    )}

                    <div className={`text-[10px] text-text-muted ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-navy-800 border border-border-subtle flex items-center justify-center text-text-secondary shrink-0">
                      You
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <div className="w-8 h-8 rounded-xl bg-am-cyan/20 border border-am-cyan/30 flex items-center justify-center text-am-cyan">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-navy-900/90 border border-border-subtle flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-am-cyan animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-am-cyan animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-am-cyan animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[11px] text-text-muted">Manzilo is reasoning...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2.5 bg-navy-900/70 border-t border-border-subtle/60 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] text-text-muted whitespace-nowrap flex items-center gap-1">
                <Sparkles size={12} className="text-am-cyan" /> Suggested:
              </span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(p)}
                  className="px-3 py-1 rounded-lg text-xs bg-navy-800/80 hover:bg-navy-800 text-text-secondary hover:text-text-primary whitespace-nowrap border border-border-subtle/60 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-navy-950 border-t border-border-subtle flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                aria-label="Message Manzilo"
                placeholder="Ask Manzilo about itineraries, rain disruptions, budgeting, or venue hours..."
                className="flex-1 bg-navy-900/90 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-am-cyan transition-colors"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                aria-label="Send message to Manzilo"
                className="p-3 rounded-xl bg-am-orange hover:bg-am-orange-hover disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-am-orange/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
