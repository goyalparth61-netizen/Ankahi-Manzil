import { motion } from 'framer-motion'
import { ArrowRight, Compass, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'

const principles = [
  ['Discovery before popularity', 'The product should help a traveler find a place that fits them, not simply rank what is already famous.'],
  ['Plans should breathe', 'A useful itinerary needs time buffers, alternatives and the ability to change without rewriting the entire journey.'],
  ['AI should explain itself', 'When Manzilo changes something in the demo, the interface should show what changed and what it tried to preserve.'],
]

export default function About() {
  return (
    <PageTransition>
      <section className="page-section pt-32 lg:pt-40">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="eyebrow mb-5">
                <Sparkles size={13} className="text-am-gold" />
                Why Ankahi Manzil exists
              </div>
              <h1 className="display-sm max-w-[12ch]">
                Some journeys are planned.
                <span className="block serif-accent">The memorable parts usually aren’t.</span>
              </h1>
            </div>
            <p className="lede max-w-xl lg:justify-self-end">
              “Ankahi” points to the untold; “Manzil” to the destination. The product idea is built around
              the space between those two things: the route you intended and the story that actually happens.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section-tight">
        <div className="page-shell">
          <div className="relative min-h-[38rem] overflow-hidden rounded-[1.8rem] border border-white/10">
            <img src="/images/hero-traveler.jpg" alt="Traveler overlooking a landscape" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,.96),rgba(7,17,15,.62)_52%,rgba(7,17,15,.12))]" />
            <div className="relative flex min-h-[38rem] max-w-3xl flex-col justify-center p-7 sm:p-10 lg:p-14">
              <Compass size={26} className="text-am-gold" />
              <blockquote className="mt-7 font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-[-.04em] sm:text-5xl">
                “Every journey contains an untold destination — even when the path shifts.”
              </blockquote>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/68">
                That idea is why discovery, planning and adaptation live in the same product instead of being treated as separate tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="eyebrow mb-5">Product principles</div>
          <div className="border-t border-white/10">
            {principles.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid gap-4 border-b border-white/10 py-7 md:grid-cols-[5rem_1fr_1.4fr] md:items-start"
              >
                <span className="font-[family-name:var(--font-heading)] text-sm text-text-muted">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="text-2xl font-semibold tracking-[-.04em]">{title}</h2>
                <p className="text-sm leading-7 text-text-secondary">{text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/destinations" className="button-primary">
              Explore the atlas
              <ArrowRight size={15} />
            </Link>
            <Link to="/features" className="button-ghost">Meet Manzilo</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
