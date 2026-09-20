import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Route, Eye, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: Route,
    title: 'Smart Planning',
    description:
      'Manzilo builds personalized day-by-day itineraries around your budget, interests, timing and location.',
    color: '#FF6B35',
    gradient: 'from-am-orange/15 to-am-warm/5',
  },
  {
    icon: Eye,
    title: 'Live Monitoring',
    description:
      'Travel conditions, weather and itinerary conflicts can be continuously monitored.',
    color: '#16C7D9',
    gradient: 'from-am-cyan/15 to-am-teal/5',
  },
  {
    icon: RefreshCw,
    title: 'Automatic Replanning',
    description:
      'When something changes, Manzilo reasons through alternatives and rebuilds the affected part of your journey.',
    color: '#8B5CF6',
    gradient: 'from-am-purple/15 to-am-blue/5',
  },
]

export default function AgentFeatures() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding relative">
      <div className="container-max mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-700/40 border border-border-subtle text-xs font-medium text-text-secondary mb-6">
            <RefreshCw size={14} className="text-am-cyan" />
            AGENTIC TRAVEL
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold">
            The{' '}
            <span className="gradient-text-brand">Agentic</span>{' '}
            Travel Experience
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative"
              >
                {/* Animated background glow */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"
                  style={{
                    background: `radial-gradient(circle at center, ${feature.color}20, transparent 70%)`,
                  }}
                />

                <div className="relative glass-card glass-card-hover rounded-2xl p-7 lg:p-8 h-full transition-all duration-500 group-hover:-translate-y-1">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${feature.color}12`,
                      border: `1px solid ${feature.color}25`,
                      boxShadow: `0 0 25px ${feature.color}12`,
                    }}
                  >
                    <Icon size={24} style={{ color: feature.color }} />
                  </div>

                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
