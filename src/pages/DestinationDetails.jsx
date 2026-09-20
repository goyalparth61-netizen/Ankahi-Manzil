import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, CalendarDays, Clock3, Compass, IndianRupee,
  MapPin, Sparkles
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { getDestinationBySlug } from '../services/destinationService'
import PageTransition from '../components/layout/PageTransition'

export default function DestinationDetails() {
  const { slug } = useParams()
  const localDestination = destinations.find((item) => item.slug === slug)
  const [destination, setDestination] = useState(localDestination)
  const [source, setSource] = useState('local')

  useEffect(() => {
    let active = true
    getDestinationBySlug(slug).then((result) => {
      if (!active || !result?.success) return
      setDestination(result.data)
      setSource(result.source || 'local')
    })
    return () => {
      active = false
    }
  }, [slug])

  if (!destination) {
    return (
      <PageTransition>
        <section className="page-section pt-36">
          <div className="page-shell text-center">
            <Compass size={28} className="mx-auto text-am-orange" />
            <h1 className="mt-5 text-4xl font-semibold">That place is not on this map.</h1>
            <Link to="/destinations" className="button-primary mt-7">Back to the atlas</Link>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="relative min-h-[82svh] overflow-hidden">
        <img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,15,.35),rgba(7,17,15,.06)_36%,rgba(7,17,15,.96)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,.76),transparent_64%)]" />

        <div className="page-shell relative z-10 flex min-h-[82svh] flex-col justify-between pb-10 pt-28">
          <Link to="/destinations" className="inline-flex w-fit items-center gap-2 text-xs font-bold text-white/72 hover:text-white">
            <ArrowLeft size={14} />
            Back to atlas
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .65 }}
            className="max-w-4xl"
          >
            <div className="eyebrow mb-4">
              <MapPin size={12} className="text-am-orange" />
              {destination.categories.join(' • ')}
            </div>
            <span className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.13em] ${source === 'backend' ? 'border-am-green/25 bg-am-green/10 text-am-green' : 'border-am-gold/20 bg-am-gold/10 text-am-gold'}`}>
              {source === 'backend' ? 'FastAPI data' : 'local fallback'}
            </span>
            <h1 className="display max-w-[9ch]">{destination.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{destination.description}</p>

            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [CalendarDays, 'Best time', destination.bestTime],
                [Clock3, 'Stay', destination.suggestedDays],
                [IndianRupee, 'Budget', destination.budget],
                [Compass, 'Rating', destination.rating + '/5'],
              ].map(([Icon, label, value]) => (
                <div key={label} className="border-t border-white/16 pt-3">
                  <Icon size={13} className="text-am-gold" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/45">{label}</p>
                  <p className="mt-1 text-xs font-semibold text-white/86">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <div className="eyebrow mb-4">Why it stays with you</div>
            <h2 className="display-sm max-w-[11ch]">
              More than a pin
              <span className="serif-accent"> on a map.</span>
            </h2>
            <p className="lede mt-6 max-w-3xl">{destination.about}</p>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-am-orange">Places to anchor the trip</p>
                <div className="mt-5 space-y-0">
                  {destination.topAttractions?.map((item, index) => (
                    <div key={item} className="flex gap-4 border-t border-white/8 py-4">
                      <span className="font-[family-name:var(--font-heading)] text-sm text-text-muted">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-am-cyan">Ways to experience it</p>
                <div className="mt-5 space-y-0">
                  {destination.thingsToDo?.map((item, index) => (
                    <div key={item} className="flex gap-4 border-t border-white/8 py-4">
                      <span className="font-[family-name:var(--font-heading)] text-sm text-text-muted">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface rounded-art p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
                <Sparkles size={14} />
                Turn inspiration into a route
              </div>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Use this destination as the starting point for the adaptive trip planner or ask Manzilo to reason about it.
              </p>
              <Link to="/plan" className="button-primary mt-5 w-full">
                Plan {destination.name}
                <ArrowRight size={14} />
              </Link>
              <Link to="/features" className="button-ghost mt-2 w-full">
                Ask Manzilo first
              </Link>
            </div>

            {destination.nearby?.length > 0 && (
              <div className="mt-5 border-t border-white/8 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-text-muted">Keep wandering</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {destination.nearby.map((place) => (
                    <span key={place} className="ai-chip">{place}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </PageTransition>
  )
}
