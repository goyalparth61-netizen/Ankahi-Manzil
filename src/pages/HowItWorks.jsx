import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CalendarDays, Eye, AlertTriangle, Brain, RefreshCw, ArrowRight,
  ArrowDown, MapPin, Clock, IndianRupee, Heart, Compass, CloudRain,
  Plane, XCircle, ShieldAlert, Wallet, Check, Bot, RotateCcw
} from 'lucide-react'
import { agentSteps } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

const iconMap = { CalendarDays, Eye, AlertTriangle, Brain, RefreshCw }

function SectionBlock({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HowItWorks() {
  const workflowRef = useRef(null)
  const workflowInView = useInView(workflowRef, { once: true, margin: '-60px' })

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-am-purple/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-am-cyan/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-max mx-auto px-4 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-700/60 border border-border-subtle text-xs font-medium text-text-secondary mb-8"
          >
            <RotateCcw size={14} className="text-am-cyan" />
            THE AGENTIC CYCLE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto"
          >
            Your journey doesn't stay static.{' '}
            <span className="gradient-text-brand">Neither should your travel planner.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Ankahi Manzil is not a one-time itinerary generator.
            It is an agentic AI system that continuously manages your journey
            through an intelligent cycle.
          </motion.p>
        </div>
      </section>

      {/* Core Loop Visualization */}
      <section className="pb-20 lg:pb-28" ref={workflowRef}>
        <div className="container-max mx-auto px-4 lg:px-8">
          {/* Circular flow — Desktop */}
          <div className="hidden lg:flex items-start justify-between gap-2 relative max-w-4xl mx-auto mb-4">
            {/* Connecting line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-px">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={workflowInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-am-orange/40 via-am-blue/40 to-am-cyan/40 origin-left"
              />
              {workflowInView && (
                <>
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-am-orange"
                    animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-am-cyan"
                    animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: 'linear', delay: 1.5 }}
                  />
                </>
              )}
            </div>

            {agentSteps.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={workflowInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center flex-1 relative z-10"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: `${step.color}12`,
                      border: `1px solid ${step.color}30`,
                      boxShadow: `0 0 30px ${step.color}15, inset 0 0 30px ${step.color}08`,
                    }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-1" style={{ color: step.color }}>
                    {step.label}
                  </h3>
                  <p className="text-sm text-text-secondary max-w-[160px]">{step.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Looping indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={workflowInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="hidden lg:flex justify-center mt-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy-700/40 border border-border-subtle">
              <RotateCcw size={14} className="text-am-cyan" />
              <span className="text-xs text-text-secondary">Continuous cycle — the loop never stops</span>
            </div>
          </motion.div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-1 max-w-md mx-auto">
            {agentSteps.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={workflowInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${step.color}12`, border: `1px solid ${step.color}30` }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-[family-name:var(--font-heading)]" style={{ color: step.color }}>{step.label}</h3>
                      <p className="text-sm text-text-secondary">{step.description}</p>
                    </div>
                  </div>
                  {i < agentSteps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown size={16} style={{ color: `${agentSteps[i + 1].color}60` }} />
                    </div>
                  )}
                </motion.div>
              )
            })}
            <div className="flex justify-center pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-700/40 border border-border-subtle">
                <RotateCcw size={12} className="text-am-cyan" />
                <span className="text-xs text-text-secondary">Cycle repeats</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <div className="container-max mx-auto px-4 lg:px-8 space-y-24 lg:space-y-32 pb-20">

        {/* STEP 1 — PLAN */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FF6B3512', border: '1px solid #FF6B3530' }}>
                  <CalendarDays size={20} className="text-am-orange" />
                </div>
                <span className="text-xs font-bold tracking-wider text-am-orange">STEP 1</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <span className="text-am-orange">Plan</span> — Build Your Itinerary
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                You provide your destination, dates, budget and interests.
                Manzilo analyzes all constraints — timing, location, opening hours,
                travel distances — and creates a personalized day-by-day itinerary.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-am-orange/15">
              <p className="text-xs font-semibold text-am-orange mb-4">USER INPUT</p>
              <div className="space-y-3 mb-5">
                {[
                  { icon: MapPin, label: 'Destination', value: 'Manali' },
                  { icon: CalendarDays, label: 'Dates', value: '4 days' },
                  { icon: IndianRupee, label: 'Budget', value: '₹20,000' },
                  { icon: Heart, label: 'Interests', value: 'Nature, Adventure' },
                  { icon: Compass, label: 'Style', value: 'Balanced' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3 text-sm">
                    <row.icon size={14} className="text-text-muted shrink-0" />
                    <span className="text-text-secondary w-24">{row.label}</span>
                    <span className="text-text-primary font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center my-3">
                <ArrowDown size={18} className="text-am-orange/50" />
              </div>
              <div className="p-4 rounded-xl bg-am-orange/8 border border-am-orange/15">
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={14} className="text-am-orange" />
                  <span className="text-xs font-semibold text-am-orange">Manzilo</span>
                </div>
                <p className="text-sm text-text-secondary">
                  ✓ Personalized 4-day itinerary created with 18 activities,
                  optimized for your budget and travel distances.
                </p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* STEP 2 — MONITOR */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card rounded-2xl p-6 border border-am-teal/15 order-2 lg:order-1">
              <p className="text-xs font-semibold text-am-teal mb-4">MONITORING</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Weather', icon: CloudRain, status: 'Watching', color: '#2697FF' },
                  { label: 'Transport', icon: Plane, status: 'On time', color: '#18D5B5' },
                  { label: 'Open Hours', icon: Clock, status: 'Verified', color: '#F6A623' },
                  { label: 'Availability', icon: Check, status: 'Confirmed', color: '#7DDC48' },
                  { label: 'Travel Time', icon: Compass, status: 'Optimal', color: '#8B5CF6' },
                  { label: 'Schedule', icon: CalendarDays, status: 'No conflicts', color: '#16C7D9' },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-navy-800/40 border border-border-subtle">
                    <item.icon size={16} style={{ color: item.color }} className="mb-1.5" />
                    <p className="text-xs font-medium text-text-primary">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.status}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-am-green animate-pulse" />
                <span className="text-xs text-am-green">All systems active</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#18D5B512', border: '1px solid #18D5B530' }}>
                  <Eye size={20} className="text-am-teal" />
                </div>
                <span className="text-xs font-bold tracking-wider text-am-teal">STEP 2</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <span className="text-am-teal">Monitor</span> — Watch Conditions
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Once your itinerary is set, Ankahi Manzil continuously monitors
                weather forecasts, transportation schedules, venue opening hours,
                activity availability, travel distances and schedule integrity.
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* STEP 3 — DETECT */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#2697FF12', border: '1px solid #2697FF30' }}>
                  <AlertTriangle size={20} className="text-am-blue" />
                </div>
                <span className="text-xs font-bold tracking-wider text-am-blue">STEP 3</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <span className="text-am-blue">Detect</span> — Identify Disruptions
              </h2>
              <p className="text-text-secondary leading-relaxed">
                When conditions change, Manzilo immediately identifies the disruption
                and determines which parts of your itinerary are affected.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: Plane, label: 'Flight delay', color: '#FF6B35' },
                { icon: CloudRain, label: 'Unexpected rain', color: '#2697FF' },
                { icon: XCircle, label: 'Activity cancellation', color: '#8B5CF6' },
                { icon: XCircle, label: 'Venue closure', color: '#F6A623' },
                { icon: ShieldAlert, label: 'Schedule conflict', color: '#16C7D9' },
                { icon: Wallet, label: 'Budget overrun', color: '#7DDC48' },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-3 glass-card rounded-xl p-4 border border-border-subtle">
                  <d.icon size={16} style={{ color: d.color }} className="shrink-0" />
                  <span className="text-sm text-text-primary">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>

        {/* STEP 4 — REASON */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card rounded-2xl p-6 border border-am-purple/15 order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={16} className="text-am-purple" />
                <span className="text-xs font-bold text-am-purple">MANZILO REASONING</span>
              </div>

              <div className="mb-4 p-3 rounded-xl bg-am-orange/8 border border-am-orange/15">
                <p className="text-xs text-am-orange font-medium mb-1">Problem</p>
                <p className="text-sm text-text-secondary">Outdoor activity unavailable due to weather.</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-text-muted mb-2">Constraints applied:</p>
                <div className="flex flex-wrap gap-2">
                  {['Budget ≤ ₹1,000', 'Distance ≤ 5 km', 'Available 3–6 PM', 'Indoor preferred'].map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-md bg-navy-800/50 border border-border-subtle text-xs text-text-secondary">{c}</span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-text-muted mb-2">Alternatives evaluated:</p>
                <div className="space-y-2">
                  {[
                    { name: 'Himalayan Museum', score: 92, selected: true },
                    { name: 'Indoor Café', score: 87, selected: false },
                    { name: 'Shopping Mall', score: 74, selected: false },
                    { name: 'Indoor Activity', score: 68, selected: false },
                  ].map((alt) => (
                    <div key={alt.name} className={`flex items-center justify-between p-2.5 rounded-lg ${alt.selected ? 'bg-am-purple/10 border border-am-purple/20' : 'bg-navy-800/30'}`}>
                      <span className={`text-sm ${alt.selected ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>{alt.name}</span>
                      <span className={`text-xs font-medium ${alt.selected ? 'text-am-purple' : 'text-text-muted'}`}>{alt.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-am-purple/8 border border-am-purple/15">
                <p className="text-xs text-am-purple font-medium">✓ Selected: Himalayan Museum (92% match)</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#8B5CF612', border: '1px solid #8B5CF630' }}>
                  <Brain size={20} className="text-am-purple" />
                </div>
                <span className="text-xs font-bold tracking-wider text-am-purple">STEP 4</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <span className="text-am-purple">Reason</span> — Evaluate Alternatives
              </h2>
              <p className="text-text-secondary leading-relaxed">
                This is what makes Ankahi Manzil agentic. Manzilo doesn't just alert you — it
                reasons through available alternatives, applies your constraints (budget, distance,
                time, preferences), scores each option, and selects the best replacement.
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* STEP 5 — REPLAN */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#16C7D912', border: '1px solid #16C7D930' }}>
                  <RefreshCw size={20} className="text-am-cyan" />
                </div>
                <span className="text-xs font-bold tracking-wider text-am-cyan">STEP 5</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <span className="text-am-cyan">Replan</span> — Update Your Journey
              </h2>
              <p className="text-text-secondary leading-relaxed">
                The affected portion of your itinerary is rebuilt. You review the updated plan,
                approve it or ask Manzilo to try something different. Your journey continues seamlessly.
              </p>
            </div>
            <div className="space-y-3">
              <div className="glass-card rounded-xl p-4 border border-border-subtle opacity-60">
                <p className="text-xs text-text-muted mb-1">OLD ITINERARY</p>
                <p className="text-sm text-text-primary line-through">3:30 PM — Solang Valley (Outdoor)</p>
              </div>
              <div className="flex justify-center"><ArrowDown size={18} className="text-am-orange/50" /></div>
              <div className="glass-card rounded-xl p-4 border border-am-orange/15">
                <p className="text-xs text-am-orange mb-1">⚠ DISRUPTION</p>
                <p className="text-sm text-text-secondary">Heavy rain — outdoor activity affected.</p>
              </div>
              <div className="flex justify-center"><ArrowDown size={18} className="text-am-purple/50" /></div>
              <div className="glass-card rounded-xl p-4 border border-am-purple/15">
                <p className="text-xs text-am-purple mb-1">🧠 MANZILO ANALYSIS</p>
                <p className="text-sm text-text-secondary">Best alternative: Himalayan Museum (92% match)</p>
              </div>
              <div className="flex justify-center"><ArrowDown size={18} className="text-am-cyan/50" /></div>
              <div className="glass-card rounded-xl p-4 border border-am-cyan/20 bg-am-cyan/5">
                <p className="text-xs text-am-cyan mb-1">✓ UPDATED ITINERARY</p>
                <div className="space-y-1 text-sm">
                  <p className="text-text-primary">3:30 PM — Himalayan Museum</p>
                  <p className="text-text-primary">5:00 PM — Café</p>
                  <p className="text-text-primary">6:30 PM — Mall Road</p>
                </div>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* Journey Continues */}
        <SectionBlock className="text-center">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-am-cyan/10 flex items-center justify-center border border-am-cyan/20" style={{ boxShadow: '0 0 40px rgba(22,199,217,0.15)' }}>
                <RotateCcw size={28} className="text-am-cyan" />
              </div>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold mb-4">
              Your journey <span className="gradient-text-brand">continues.</span>
            </h2>
            <p className="text-text-secondary mb-8">
              The cycle never stops. As long as your trip is active, Manzilo keeps
              monitoring, detecting and adapting — so your journey is always on track.
            </p>
            <Link to="/plan" className="btn-primary text-base inline-flex items-center gap-2 px-8 py-4">
              Start Planning <ArrowRight size={18} />
            </Link>
          </div>
        </SectionBlock>
      </div>
    </PageTransition>
  )
}
