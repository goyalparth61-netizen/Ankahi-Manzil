import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles, CalendarDays, Clock, IndianRupee, Route, Eye, AlertTriangle,
  RefreshCw, MessageCircle, Brain, ShieldAlert, Layers, Building2,
  Landmark, UtensilsCrossed, Mountain, ShoppingBag, ArrowRight,
  CloudRain, Bot, Check, ArrowDown, User, Zap
} from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

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

function FeatureNumber({ n }) {
  return (
    <span className="text-xs font-mono text-text-muted mr-3">{String(n).padStart(2, '0')}</span>
  )
}

export default function Features() {
  const [planApplied, setPlanApplied] = useState(false)

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-am-orange/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-am-purple/5 rounded-full blur-[100px]" />
        </div>
        <div className="container-max mx-auto px-4 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-700/60 border border-border-subtle text-xs font-medium text-text-secondary mb-8"
          >
            <Sparkles size={14} className="text-am-gold" />
            ANKAHI MANZIL FEATURES
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 max-w-3xl mx-auto"
          >
            Everything your journey needs.{' '}
            <span className="gradient-text-brand">Powered by intelligence.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            From the first idea to unexpected changes on the road,
            Ankahi Manzil helps manage your entire journey.
          </motion.p>
        </div>
      </section>

      <div className="container-max mx-auto px-4 lg:px-8 space-y-28 lg:space-y-36 pb-24">

        {/* 01 — AI Personalized Trip Planning */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={1} />
                AI Personalized <span className="text-am-orange">Trip Planning</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Tell Manzilo your destination, dates, budget, interests and travel preferences.
                It generates a personalized, optimized itinerary that respects your constraints and style.
              </p>
              <div className="space-y-3">
                {['Destination & dates', 'Budget range', 'Interests & activities', 'Travel preferences', 'Travel style (relaxed, packed, balanced)'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-am-orange shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-7 sm:p-8 border border-border-subtle">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-am-orange/12 flex items-center justify-center border border-am-orange/20">
                  <CalendarDays size={20} className="text-am-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Planning with Manzilo</p>
                  <p className="text-xs text-text-secondary">Analyzing your preferences...</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Destination', value: 'Manali, Himachal Pradesh' },
                  { label: 'Duration', value: '4 Days, 3 Nights' },
                  { label: 'Budget', value: '₹20,000' },
                  { label: 'Interests', value: 'Nature, Adventure, Culture' },
                  { label: 'Style', value: 'Balanced' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                    <span className="text-xs text-text-secondary">{row.label}</span>
                    <span className="text-sm font-medium text-text-primary">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-xl bg-am-orange/8 border border-am-orange/15">
                <p className="text-xs text-am-orange font-medium mb-1">✨ Manzilo</p>
                <p className="text-sm text-text-secondary">
                  I've created a 4-day itinerary optimized for your budget and interests.
                  Activities are grouped by location to reduce travel time.
                </p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* 02 — Smart Day-by-Day Itinerary */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div className="glass-card rounded-2xl overflow-hidden border border-border-subtle order-2 lg:order-1">
              <div className="px-5 py-4 border-b border-border-subtle flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-am-cyan" />
                <span className="text-sm font-semibold text-text-primary">DAY 01</span>
                <span className="text-sm text-text-secondary">Delhi → Manali</span>
              </div>
              <div className="p-5 space-y-1">
                {[
                  { time: '09:00', title: 'Hotel Check-in', Icon: Building2 },
                  { time: '11:00', title: 'Hadimba Temple', Icon: Landmark },
                  { time: '13:00', title: 'Lunch', Icon: UtensilsCrossed },
                  { time: '15:30', title: 'Solang Valley', Icon: Mountain },
                  { time: '18:30', title: 'Mall Road', Icon: ShoppingBag },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-700/30 transition-colors">
                    <span className="text-sm font-mono text-text-secondary w-14 shrink-0">{act.time}</span>
                    <div className="relative flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-am-cyan" />
                      {i < 4 && <div className="w-px h-8 mt-1 bg-border-subtle" />}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <act.Icon size={16} className="text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">{act.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={2} />
                Smart Day-by-Day <span className="text-am-cyan">Itinerary</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Manzilo builds structured, timeline-based itineraries with activities
                coordinated by location, opening hours, and travel time between stops.
                Every day is organized so you spend less time commuting and more time experiencing.
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* 03 — Budget Intelligence */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={3} />
                Budget <span className="text-am-gold">Intelligence</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Manzilo tracks your spending estimates across accommodation, transport, food,
                and activities. It keeps your trip within budget and alerts you when a change
                affects your spending plan.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-7 sm:p-8 border border-border-subtle">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Total Budget', value: '₹20,000', color: '#F6A623' },
                  { label: 'Planned', value: '₹16,850', color: '#16C7D9' },
                  { label: 'Remaining', value: '₹3,150', color: '#7DDC48' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xs text-text-secondary mb-1">{s.label}</p>
                    <p className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Stay', amount: '₹6,400', pct: 38 },
                  { label: 'Transport', amount: '₹4,200', pct: 25 },
                  { label: 'Food', amount: '₹3,600', pct: 21 },
                  { label: 'Activities', amount: '₹2,650', pct: 16 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">{row.label}</span>
                      <span className="text-text-primary font-medium">{row.amount}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-navy-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-am-gold to-am-orange"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* 04 — Route Optimization */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div className="glass-card rounded-2xl p-6 border border-border-subtle order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-5">
                <Route size={18} className="text-am-teal" />
                <span className="text-sm font-semibold text-text-primary">Optimized Route</span>
              </div>
              <div className="space-y-0">
                {[
                  { place: 'Hotel', time: '9:00 AM', distance: '' },
                  { place: 'Hadimba Temple', time: '11:00 AM', distance: '2.1 km' },
                  { place: 'Local Restaurant', time: '1:00 PM', distance: '0.8 km' },
                  { place: 'Solang Valley', time: '3:30 PM', distance: '13 km' },
                  { place: 'Mall Road', time: '6:30 PM', distance: '14 km' },
                ].map((stop, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-4 py-3">
                      <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'bg-am-teal border-am-teal' : 'border-am-teal/50 bg-transparent'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{stop.place}</p>
                        <p className="text-xs text-text-secondary">{stop.time}</p>
                      </div>
                      {stop.distance && (
                        <span className="text-xs text-text-muted">{stop.distance}</span>
                      )}
                    </div>
                    {i < 4 && (
                      <div className="ml-1.5 h-6 border-l border-dashed border-am-teal/30" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-am-teal/8 border border-am-teal/15">
                <p className="text-xs text-am-teal">✓ Activities grouped by proximity — 40% less travel time</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={4} />
                Route <span className="text-am-teal">Optimization</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Manzilo groups nearby activities together and sequences your day to
                minimize unnecessary travel. You spend less time in transit and more
                time at places that matter.
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* 05 — Live Monitoring */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={5} />
                Live <span className="text-am-green">Monitoring</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Once your journey begins, Manzilo continuously watches relevant conditions
                so it can alert you before problems become disruptions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: CloudRain, label: 'Weather', status: 'Clear skies', ok: true, color: '#2697FF' },
                { icon: Route, label: 'Transport', status: 'On schedule', ok: true, color: '#18D5B5' },
                { icon: Clock, label: 'Opening Hours', status: 'All verified', ok: true, color: '#F6A623' },
                { icon: AlertTriangle, label: 'Closures', status: 'None detected', ok: true, color: '#7DDC48' },
                { icon: Layers, label: 'Availability', status: 'Confirmed', ok: true, color: '#8B5CF6' },
                { icon: ShieldAlert, label: 'Conflicts', status: 'None found', ok: true, color: '#16C7D9' },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-5 border border-border-subtle">
                  <item.icon size={18} style={{ color: item.color }} className="mb-2" />
                  <p className="text-sm font-medium text-text-primary mb-0.5">{item.label}</p>
                  <p className="text-xs text-am-green">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>

        {/* 06 — Disruption Detection */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div className="glass-card rounded-2xl p-7 sm:p-8 border border-am-orange/20 order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-am-orange" />
                <span className="text-sm font-bold text-am-orange tracking-wider">⚠ WEATHER ALERT</span>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Heavy rainfall expected near Solang Valley.
              </p>
              <div className="bg-navy-800/50 rounded-xl p-4 border border-border-subtle">
                <p className="text-xs text-text-muted mb-2">Potentially affected:</p>
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-am-orange" />
                  <span className="text-sm text-text-primary">3:30 PM — Solang Valley</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-am-orange animate-pulse" />
                <span className="text-xs text-am-orange">Manzilo is evaluating alternatives...</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={6} />
                Disruption <span className="text-am-blue">Detection</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                When conditions change — flight delays, weather shifts, venue closures, or transport
                cancellations — Manzilo detects the disruption and immediately identifies which parts
                of your itinerary are affected.
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* 07 — Automatic Replanning */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={7} />
                Automatic <span className="text-am-purple">Replanning</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Manzilo doesn't just alert you — it reasons through alternatives,
                evaluates them against your constraints, and presents an updated plan.
                One tap and your journey continues.
              </p>
            </div>
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4 border border-border-subtle opacity-60">
                <p className="text-xs text-text-muted mb-1">ORIGINAL PLAN</p>
                <p className="text-sm text-text-primary line-through">Solang Valley — 3:30 PM</p>
              </div>
              <div className="flex justify-center">
                <ArrowDown size={20} className="text-am-purple" />
              </div>
              <div className="glass-card rounded-xl p-4 border border-am-purple/20">
                <div className="flex items-center gap-2 mb-3">
                  <Bot size={14} className="text-am-purple" />
                  <p className="text-xs font-semibold text-am-purple">MANZILO REPLAN</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-am-cyan font-mono text-xs w-16">3:30 PM</span>
                    <span className="text-text-primary">Himalayan Museum</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-am-cyan font-mono text-xs w-16">5:00 PM</span>
                    <span className="text-text-primary">Café</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-am-cyan font-mono text-xs w-16">6:30 PM</span>
                    <span className="text-text-primary">Mall Road</span>
                  </div>
                </div>
                <button
                  onClick={() => { setPlanApplied(true); setTimeout(() => setPlanApplied(false), 3000) }}
                  disabled={planApplied}
                  className={`w-full mt-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    planApplied
                      ? 'bg-am-green/20 text-am-green border border-am-green/30'
                      : 'bg-am-purple/15 text-am-purple border border-am-purple/30 hover:bg-am-purple/25'
                  }`}
                >
                  {planApplied ? (<><Check size={16} /> Plan Applied!</>) : 'Apply New Plan'}
                </button>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* 08 — Manzilo AI */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div className="glass-card rounded-2xl overflow-hidden border border-border-subtle order-2 lg:order-1">
              <div className="px-5 py-4 border-b border-border-subtle flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-am-cyan to-am-purple flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Manzilo</p>
                  <p className="text-xs text-am-green">Online</p>
                </div>
              </div>
              <div className="p-6 sm:p-7 space-y-5">
                {[
                  'Can I add paragliding tomorrow?',
                  'What happens if my flight gets delayed?',
                  'Find something near my hotel.',
                  'Can I reduce tomorrow\'s budget?',
                  'Why did you change my itinerary?',
                ].map((q, i) => (
                  <div key={i} className="flex justify-end">
                    <div className="bg-am-orange/10 border border-am-orange/15 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm text-text-primary">{q}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={8} />
                <span className="bg-gradient-to-r from-am-cyan to-am-purple bg-clip-text text-transparent">Manzilo</span> AI
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Manzilo isn't just a chatbot — it understands your journey context.
                Ask it to modify plans, explain decisions, find alternatives, or
                answer any question about your trip.
              </p>
              <Link to="/manzilo" className="btn-primary text-sm inline-flex items-center gap-2">
                Chat with Manzilo <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </SectionBlock>

        {/* 09 — Conflict Detection */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={9} />
                Conflict <span className="text-am-blue">Detection</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Manzilo identifies scheduling conflicts before they become problems —
                overlapping activities, insufficient travel time between stops, or
                venues closing before your arrival.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-7 sm:p-8 border border-am-blue/20">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert size={18} className="text-am-blue" />
                <span className="text-sm font-bold text-am-blue">⚠ Schedule Conflict</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Activity A ends:</span>
                  <span className="text-text-primary font-medium">4:30 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Activity B starts:</span>
                  <span className="text-text-primary font-medium">4:15 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Travel required:</span>
                  <span className="text-am-orange font-medium">35 minutes</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-am-cyan/8 border border-am-cyan/15">
                <div className="flex items-center gap-2 mb-1">
                  <Bot size={12} className="text-am-cyan" />
                  <span className="text-xs font-semibold text-am-cyan">Manzilo recommendation</span>
                </div>
                <p className="text-sm text-text-secondary">Move Activity B → 5:15 PM</p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* 10 — Backup Options */}
        <SectionBlock>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-2 lg:py-4">
            <div className="glass-card rounded-2xl p-6 border border-border-subtle order-2 lg:order-1">
              <p className="text-xs font-medium text-text-muted mb-4">DISRUPTION MANAGEMENT</p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-am-green/8 border border-am-green/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Check size={14} className="text-am-green" />
                    <span className="text-xs font-semibold text-am-green">PRIMARY PLAN</span>
                  </div>
                  <p className="text-sm text-text-primary">Solang Valley — Outdoor adventure</p>
                </div>
                <div className="p-4 rounded-xl bg-navy-800/50 border border-border-subtle">
                  <p className="text-xs text-text-muted mb-2">ALTERNATIVES READY</p>
                  <div className="space-y-2">
                    {[
                      { name: 'Himalayan Museum', match: '92%' },
                      { name: 'Indoor Rock Climbing', match: '87%' },
                      { name: 'Café & Shopping', match: '78%' },
                    ].map((alt) => (
                      <div key={alt.name} className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">{alt.name}</span>
                        <span className="text-xs text-am-cyan font-medium">{alt.match} match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-4">
                <FeatureNumber n={10} />
                Backup <span className="text-am-green">Options</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                For every activity in your itinerary, Manzilo pre-evaluates alternatives
                ranked by compatibility with your preferences. When disruption strikes,
                the best backup is already waiting.
              </p>
            </div>
          </div>
        </SectionBlock>
      </div>

      {/* Bottom CTA */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-max mx-auto text-center">
          <SectionBlock className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold mb-6">
              Ready to let Manzilo plan your journey?
            </h2>
            <p className="text-text-secondary mb-9 max-w-xl mx-auto leading-relaxed">
              Experience intelligent travel planning that adapts to you.
            </p>
            <Link to="/plan" className="btn-primary text-base inline-flex items-center gap-2 px-8 py-4">
              Start Planning <ArrowRight size={18} />
            </Link>
          </SectionBlock>
        </div>
      </section>
    </PageTransition>
  )
}
