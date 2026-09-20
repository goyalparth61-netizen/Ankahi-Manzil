import { motion } from 'framer-motion'
import { ArrowRight, Route, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'

const chapters = [
  {
    phase: 'Origin',
    title: 'Travel beyond the obvious.',
    text: 'Ankahi Manzil began with a simple product question: how can a traveler move beyond the same famous checklist and discover a place that actually fits their mood, pace and interests?',
  },
  {
    phase: 'Discovery',
    title: 'From destination lists to an editorial atlas.',
    text: 'The discovery layer was shaped around visual hierarchy, travel moods and destination context so exploration feels closer to browsing a thoughtful travel journal than scanning a database.',
  },
  {
    phase: 'Planning',
    title: 'Turn inspiration into a usable journey.',
    text: 'The Journey Composer connects destination, duration, budget, travelers, pace and interests to a sample day-by-day plan while preserving the project’s existing local data and service boundaries.',
  },
  {
    phase: 'Intelligence',
    title: 'Manzilo became part of the interface.',
    text: 'Instead of describing AI through feature cards, Manzilo is demonstrated as a working travel-intelligence layer: recommendation context, itinerary reasoning, budget awareness and disruption replanning.',
  },
  {
    phase: 'Current',
    title: 'A full frontend reset.',
    text: 'The current frontend branch uses a new product experience while retaining the underlying routes, mock services, destination data and localStorage trip flow. Production APIs and authentication remain future integration work.',
  },
]

export default function History() {
  return (
    <PageTransition>
      <section className="pro-page">
        <div className="pro-hero">
          <div className="eyebrow">
            <Route size={13} className="text-am-cyan" />
            Product history
          </div>
          <h1>
            How Ankahi Manzil
            <span className="block serif-accent">found its direction.</span>
          </h1>
          <p className="lede">
            Not a release log, but the evolution of the product idea—from hidden-place discovery to an adaptive travel workspace powered by Manzilo.
          </p>
          <div className="section-nav">
            <Link to="/about">Our story</Link>
            <Link to="/team">Team CiPher</Link>
            <Link to="/features">Manzilo Studio</Link>
          </div>
        </div>

        <div className="timeline">
          {chapters.map((chapter, index) => (
            <motion.article
              key={chapter.phase}
              className="timeline-item"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: .5, delay: index * .04 }}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-am-gold">
                  {chapter.phase}
                </span>
                <p className="mt-1 font-[family-name:var(--font-heading)] text-sm text-text-muted">
                  {String(index + 1).padStart(2, '0')}
                </p>
              </div>
              <div className="timeline-marker">
                <span className="timeline-dot" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-[-.035em] sm:text-3xl">{chapter.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">{chapter.text}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="page-shell mt-12 px-0"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="surface rounded-art grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
                <Sparkles size={14} />
                Where the product is now
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-.035em]">Discover → Plan → Adapt</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
                Explore the new frontend as one connected journey rather than separate marketing pages.
              </p>
            </div>
            <Link to="/destinations" className="button-primary">
              Explore the product
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
