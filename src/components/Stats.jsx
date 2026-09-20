import { motion } from 'framer-motion'
import { Bot, Compass, RefreshCw, Route } from 'lucide-react'
import { agentSteps, destinations } from '../data/destinations'

const facts = [
  {
    icon: Compass,
    value: destinations.length,
    label: 'Curated destinations',
    detail: 'Across coast, mountains, culture, nature and more',
    accent: 'text-am-orange bg-am-orange/10',
  },
  {
    icon: RefreshCw,
    value: agentSteps.length,
    label: 'Adaptive stages',
    detail: 'Plan → monitor → detect → reason → replan',
    accent: 'text-am-cyan bg-am-cyan/10',
  },
  {
    icon: Bot,
    value: 'Manzilo',
    label: 'Travel companion',
    detail: 'Explains options, trade-offs and demo replans',
    accent: 'text-am-purple bg-am-purple/10',
  },
  {
    icon: Route,
    value: 'Local',
    label: 'Trip persistence',
    detail: 'Saved plans stay in your browser for the demo',
    accent: 'text-am-green bg-am-green/10',
  },
]

export default function Stats() {
  return (
    <section className="relative pb-8 pt-4 lg:pb-12">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: .55 }}
          className="travel-panel grid overflow-hidden rounded-[1.5rem] sm:grid-cols-2 lg:grid-cols-4"
        >
          {facts.map(({ icon: Icon, value, label, detail, accent }, index) => (
            <div
              key={label}
              className={`p-5 sm:p-6 lg:p-7 ${index < facts.length - 1 ? 'border-white/7 lg:border-r' : ''} ${index < 2 ? 'sm:border-b lg:border-b-0' : ''}`}
            >
              <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-2xl ${accent}`}>
                <Icon size={18} />
              </div>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-text-primary">
                {value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[.12em] text-text-secondary">{label}</p>
              <p className="mt-3 text-xs leading-5 text-text-muted">{detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
