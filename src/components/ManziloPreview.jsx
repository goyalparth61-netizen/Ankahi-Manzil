import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bot, User, Zap, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const conversation = [
  {
    type: 'user',
    text: "I'm going to Manali for 4 days with ₹20,000.",
    delay: 0,
  },
  {
    type: 'manzilo',
    text: "I've created a 4-day plan optimized for your budget, interests and travel time.",
    delay: 1.2,
  },
  {
    type: 'system',
    icon: 'alert',
    title: '⚡ Weather disruption detected',
    text: 'Heavy rainfall is expected tomorrow afternoon. I\'ve prepared an alternative indoor itinerary.',
    delay: 2.8,
  },
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-am-cyan/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

function ChatMessage({ msg, show }) {
  if (!show) return null

  if (msg.type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-end"
      >
        <div className="flex items-start gap-2 max-w-[85%]">
          <div className="bg-am-orange/15 border border-am-orange/20 rounded-2xl rounded-br-md px-4 py-3">
            <p className="text-sm text-text-primary">{msg.text}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-am-orange/20 flex items-center justify-center shrink-0">
            <User size={14} className="text-am-orange" />
          </div>
        </div>
      </motion.div>
    )
  }

  if (msg.type === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-am-orange/8 border border-am-orange/20 rounded-2xl px-4 py-3 alert-pulse">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap size={14} className="text-am-orange" />
            <span className="text-xs font-semibold text-am-orange">{msg.title}</span>
          </div>
          <p className="text-sm text-text-secondary">{msg.text}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-start"
    >
      <div className="flex items-start gap-2 max-w-[85%]">
        <div className="w-8 h-8 rounded-full bg-am-cyan/20 flex items-center justify-center shrink-0 relative">
          <Bot size={14} className="text-am-cyan" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-am-green border-2 border-navy-700" />
        </div>
        <div className="bg-navy-600/40 border border-border-subtle rounded-2xl rounded-bl-md px-4 py-3">
          <p className="text-sm text-text-primary">{msg.text}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ManziloPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [visibleMessages, setVisibleMessages] = useState([])
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    if (!inView) return

    const timers = []
    conversation.forEach((msg, i) => {
      // Show typing before each manzilo/system message
      if (msg.type !== 'user') {
        timers.push(
          setTimeout(() => setShowTyping(true), msg.delay * 1000 - 600)
        )
      }
      timers.push(
        setTimeout(() => {
          setShowTyping(false)
          setVisibleMessages((prev) => [...prev, i])
        }, msg.delay * 1000)
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-am-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-am-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-max mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-am-purple/10 border border-am-purple/20 text-xs font-medium text-am-purple mb-6"
            >
              <Sparkles size={14} />
              AI COMPANION
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              Meet{' '}
              <span className="bg-gradient-to-r from-am-cyan via-am-blue to-am-purple bg-clip-text text-transparent">
                Manzilo
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-text-secondary mb-8"
            >
              Your journey's intelligence layer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 mb-8"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-am-cyan/20 to-am-purple/20 flex items-center justify-center shrink-0 border border-am-cyan/20">
                  <Bot size={20} className="text-am-cyan" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">
                    Hi, I'm Manzilo 👋
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Tell me where you're going, what you love, and what matters
                    to you. I'll plan the journey — and keep adapting it when
                    things change.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/manzilo"
                className="btn-primary text-sm flex items-center gap-2"
              >
                Chat with Manzilo
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/features"
                className="btn-secondary text-sm"
              >
                Explore Features
              </Link>
            </motion.div>
          </div>

          {/* Right — Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-am-cyan/10 via-am-purple/5 to-am-orange/10 rounded-3xl blur-2xl opacity-50" />

            <div className="relative glass-card rounded-2xl overflow-hidden border border-border-subtle">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-border-subtle flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-am-cyan to-am-purple flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-am-green border-2 border-navy-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Manzilo</p>
                  <p className="text-xs text-am-green">Online</p>
                </div>
              </div>

              {/* Chat body */}
              <div className="px-5 py-5 space-y-4 min-h-[300px]">
                <AnimatePresence mode="popLayout">
                  {conversation.map(
                    (msg, i) =>
                      visibleMessages.includes(i) && (
                        <ChatMessage key={i} msg={msg} show={true} />
                      )
                  )}
                </AnimatePresence>
                {showTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-am-cyan/20 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-am-cyan" />
                    </div>
                    <div className="bg-navy-600/40 border border-border-subtle rounded-2xl rounded-bl-md">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input area */}
              <div className="px-5 py-4 border-t border-border-subtle">
                <div className="flex items-center gap-3 bg-navy-800/60 rounded-xl px-4 py-3 border border-border-subtle">
                  <p className="text-sm text-text-muted flex-1">
                    Ask Manzilo anything...
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-am-cyan/20 flex items-center justify-center">
                    <ArrowRight size={14} className="text-am-cyan" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
