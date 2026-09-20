import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarDays, Eye, AlertTriangle, Brain, RefreshCw, ChevronRight } from 'lucide-react'
import { agentSteps } from '../data/destinations'

const iconMap = { CalendarDays, Eye, AlertTriangle, Brain, RefreshCw }

export default function AgentWorkflow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-am-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-max mx-auto" ref={ref}>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-700/40 border border-border-subtle text-xs font-medium text-text-secondary mb-6"
            >
              <span className="text-am-cyan">◎</span>
              HOW IT WORKS
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span style={{ color: '#FF6B35' }}>Plan.</span>{' '}
              <span style={{ color: '#18D5B5' }}>Monitor.</span>{' '}
              <span style={{ color: '#2697FF' }}>Detect.</span>{' '}
              <span style={{ color: '#8B5CF6' }}>Reason.</span>{' '}
              <span style={{ color: '#16C7D9' }}>Replan.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-text-secondary text-base lg:text-lg leading-relaxed lg:pt-14"
          >
            Our AI continuously watches your trip, detects changes,
            reasons through alternatives and replans — so your journey
            never misses a beat.
          </motion.p>
        </div>

        {/* Workflow Steps — Horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop horizontal flow */}
          <div className="hidden lg:flex items-start justify-between gap-2 relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-px">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-am-orange/40 via-am-blue/40 to-am-cyan/40 origin-left"
              />
              {/* Animated flow dots */}
              {inView && (
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
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center flex-1 relative z-10"
                >
                  {/* Icon circle */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 hover:scale-110"
                    style={{
                      background: `${step.color}12`,
                      border: `1px solid ${step.color}30`,
                      boxShadow: `0 0 30px ${step.color}15, inset 0 0 30px ${step.color}08`,
                    }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>

                  <h3
                    className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </h3>
                  <p className="text-sm text-text-secondary max-w-[160px]">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile vertical flow */}
          <div className="lg:hidden space-y-1">
            {agentSteps.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${step.color}12`,
                        border: `1px solid ${step.color}30`,
                        boxShadow: `0 0 20px ${step.color}15`,
                      }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold font-[family-name:var(--font-heading)]"
                        style={{ color: step.color }}
                      >
                        {step.label}
                      </h3>
                      <p className="text-sm text-text-secondary">{step.description}</p>
                    </div>
                  </div>
                  {i < agentSteps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ChevronRight
                        size={16}
                        className="rotate-90 text-text-muted"
                        style={{ color: `${agentSteps[i + 1].color}60` }}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
