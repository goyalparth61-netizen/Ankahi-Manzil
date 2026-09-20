import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Building2, Landmark, UtensilsCrossed, Mountain, ShoppingBag,
  Clock, IndianRupee, Activity, CheckCircle, AlertTriangle,
  CloudRain, Bot, ArrowRight, Sparkles, Check
} from 'lucide-react'
import { tripItinerary } from '../data/destinations'

const activityIcons = { Building2, Landmark, UtensilsCrossed, Mountain, ShoppingBag }

export default function TripPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [planApplied, setPlanApplied] = useState(false)
  const [showDisruption, setShowDisruption] = useState(false)

  // Trigger disruption animation 2s after section enters viewport
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setShowDisruption(true), 2000)
    return () => clearTimeout(timer)
  }, [inView])

  const handleApplyPlan = () => {
    setPlanApplied(true)
    setTimeout(() => setPlanApplied(false), 3000)
  }

  return (
    <section id="trip-preview" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-am-blue/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-max mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-700/40 border border-border-subtle text-xs font-medium text-text-secondary mb-6">
            <Sparkles size={14} className="text-am-gold" />
            LIVE DEMO
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            One journey.{' '}
            <span className="gradient-text-brand">One intelligent workspace.</span>
          </h2>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-br from-am-blue/10 via-transparent to-am-cyan/10 rounded-3xl blur-2xl opacity-40" />

          <div className="relative glass-card rounded-2xl overflow-hidden border border-border-subtle">
            {/* Dashboard header */}
            <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-am-orange" />
                <div>
                  <span className="text-sm font-semibold text-text-primary">DAY 01</span>
                  <span className="text-sm text-text-secondary ml-3">{tripItinerary.route}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-am-green">
                  <CheckCircle size={12} />
                  {tripItinerary.stats.status}
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_320px] divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
              {/* Left — Timeline */}
              <div className="p-6">
                <div className="space-y-1">
                  {tripItinerary.activities.map((activity, i) => {
                    const Icon = activityIcons[activity.icon]
                    const isAffected = showDisruption && activity.title === 'Solang Valley'

                    return (
                      <motion.div
                        key={activity.time}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-500 ${
                          isAffected
                            ? 'bg-am-orange/8 border border-am-orange/20'
                            : 'hover:bg-navy-700/30'
                        }`}
                      >
                        {/* Time */}
                        <span className={`text-sm font-mono w-14 shrink-0 ${
                          isAffected ? 'text-am-orange/60 line-through' : 'text-text-secondary'
                        }`}>
                          {activity.time}
                        </span>

                        {/* Timeline dot */}
                        <div className="relative flex flex-col items-center">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            isAffected ? 'bg-am-orange' : 'bg-am-cyan'
                          }`} />
                          {i < tripItinerary.activities.length - 1 && (
                            <div className={`w-px h-8 mt-1 ${
                              isAffected ? 'bg-am-orange/30' : 'bg-border-subtle'
                            }`} />
                          )}
                        </div>

                        {/* Activity */}
                        <div className="flex items-center gap-2.5">
                          {Icon && (
                            <Icon
                              size={16}
                              className={isAffected ? 'text-am-orange/60' : 'text-text-secondary'}
                            />
                          )}
                          <span className={`text-sm font-medium ${
                            isAffected ? 'text-am-orange/60 line-through' : 'text-text-primary'
                          }`}>
                            {activity.title}
                          </span>
                          {isAffected && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-am-orange/20 text-am-orange font-medium">
                              Affected
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Right — Stats + Disruption */}
              <div className="p-6 space-y-6">
                {/* Trip stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-navy-800/50 rounded-xl p-3.5 border border-border-subtle">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IndianRupee size={13} className="text-am-gold" />
                      <span className="text-xs text-text-secondary">Est. Cost</span>
                    </div>
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-text-primary">
                      {tripItinerary.stats.cost}
                    </p>
                  </div>
                  <div className="bg-navy-800/50 rounded-xl p-3.5 border border-border-subtle">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock size={13} className="text-am-blue" />
                      <span className="text-xs text-text-secondary">Travel Time</span>
                    </div>
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-text-primary">
                      {tripItinerary.stats.travelTime}
                    </p>
                  </div>
                  <div className="bg-navy-800/50 rounded-xl p-3.5 border border-border-subtle">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Activity size={13} className="text-am-teal" />
                      <span className="text-xs text-text-secondary">Activities</span>
                    </div>
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-text-primary">
                      {tripItinerary.stats.activities}
                    </p>
                  </div>
                  <div className="bg-navy-800/50 rounded-xl p-3.5 border border-border-subtle">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle size={13} className="text-am-green" />
                      <span className="text-xs text-text-secondary">Status</span>
                    </div>
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-am-green">
                      {showDisruption ? '⚠️' : '✓'} {showDisruption ? 'Alert' : tripItinerary.stats.status}
                    </p>
                  </div>
                </div>

                {/* Disruption Alert */}
                <AnimatePresence>
                  {showDisruption && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Alert */}
                      <div className="bg-am-orange/8 border border-am-orange/25 rounded-xl p-4 mb-4 alert-pulse">
                        <div className="flex items-center gap-2 mb-2">
                          <CloudRain size={16} className="text-am-orange" />
                          <span className="text-xs font-bold text-am-orange tracking-wider">
                            {tripItinerary.disruption.title}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {tripItinerary.disruption.message}
                        </p>
                      </div>

                      {/* Manzilo suggestion */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="bg-navy-700/40 border border-am-cyan/15 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-am-cyan/20 flex items-center justify-center">
                            <Bot size={12} className="text-am-cyan" />
                          </div>
                          <span className="text-xs font-semibold text-am-cyan">Manzilo</span>
                        </div>

                        <p className="text-sm text-text-secondary mb-3">
                          {tripItinerary.replan.affected} may be affected. Suggested adjustment:
                        </p>

                        <div className="space-y-2 mb-3">
                          {tripItinerary.replan.suggestion.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-am-cyan font-mono text-xs">{s.time}</span>
                              <ArrowRight size={12} className="text-text-muted" />
                              <span className="text-text-primary">{s.activity}</span>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-text-secondary mb-4">
                          Estimated additional cost:{' '}
                          <span className="text-am-gold font-semibold">{tripItinerary.replan.additionalCost}</span>
                        </p>

                        <button
                          onClick={handleApplyPlan}
                          disabled={planApplied}
                          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                            planApplied
                              ? 'bg-am-green/20 text-am-green border border-am-green/30'
                              : 'bg-am-cyan/15 text-am-cyan border border-am-cyan/30 hover:bg-am-cyan/25'
                          }`}
                        >
                          {planApplied ? (
                            <>
                              <Check size={16} />
                              Plan Applied Successfully!
                            </>
                          ) : (
                            'Apply New Plan'
                          )}
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
