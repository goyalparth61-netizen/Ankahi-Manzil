import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Brain, CalendarDays, Eye, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { agentSteps } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

const iconMap = { plan: CalendarDays, monitor: Eye, detect: AlertTriangle, reason: Brain, replan: RefreshCw }

export default function HowItWorks() {
  return (
    <PageTransition>
      <section className="page-section pt-32 lg:pt-40">
        <div className="page-shell">
          <div className="eyebrow mb-5">The adaptive loop</div>
          <h1 className="display-sm max-w-[13ch]">
            A useful itinerary is
            <span className="block serif-accent">never really finished.</span>
          </h1>
          <p className="lede mt-6 max-w-2xl">
            Ankahi Manzil treats planning as a loop: understand the trip, watch what changes,
            identify the affected part, reason about alternatives, then update only what needs to move.
          </p>
        </div>
      </section>

      <section className="page-section-tight border-y border-white/8 bg-white/[.018]">
        <div className="page-shell">
          <div className="story-split">
            <div className="sticky-story">
              <div className="surface rounded-art overflow-hidden">
                <img src="/images/dest-manali.jpg" alt="Manali route preview" className="h-[30rem] w-full object-cover" />
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-am-cyan">Example journey</p>
                  <h2 className="mt-2 text-2xl font-semibold">Manali • 4 days</h2>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    The loop below is demonstrated with local/mock data on this frontend branch.
                  </p>
                </div>
              </div>
            </div>

            <div>
              {agentSteps.map((step, index) => {
                const Icon = iconMap[step.id] || Brain
                return (
                  <motion.article
                    key={step.id}
                    className="story-step"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="story-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.035] text-am-cyan">
                        <Icon size={16} />
                      </span>
                    </div>
                    <h3>{step.label}</h3>
                    <p>{step.detail}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/features" className="button-primary">
              See the loop inside Manzilo Studio
              <ArrowRight size={15} />
            </Link>
            <Link to="/plan" className="button-ghost">Build a journey</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
