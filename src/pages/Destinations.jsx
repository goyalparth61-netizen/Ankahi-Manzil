import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Compass, MapPin, Search, SlidersHorizontal, Star
} from 'lucide-react'
import { destinations, allCategories } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

function DestinationEditorialCard({ destination, index, inView }) {
  const featured = index % 6 === 0 || index % 6 === 3

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: Math.min(index * .06, .45), duration: .55 }}
      className={featured ? 'lg:col-span-2' : ''}
    >
      <Link
        to={`/destinations/${destination.slug}`}
        className={`destination-editorial-card group block ${featured ? 'featured' : ''}`}
        aria-label={`Explore ${destination.name}`}
      >
        <img
          src={destination.image}
          alt={`${destination.name} travel destination`}
          className="destination-image"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80'
          }}
        />

        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white/80 backdrop-blur-md">
            {destination.categories[0]}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <Star size={12} className="fill-am-gold text-am-gold" />
            {destination.rating}
          </span>
        </div>

        <div className="destination-copy">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-white/55">
                <MapPin size={12} className="text-am-orange" />
                India
              </p>
              <h2 className={`font-[family-name:var(--font-heading)] font-bold tracking-tight text-white ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                {destination.name}
              </h2>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </div>

          <p className={`text-sm leading-6 text-white/68 ${featured ? 'max-w-2xl' : 'line-clamp-2'}`}>
            {destination.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold text-white/55">
            <span>{destination.suggestedDays}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{destination.bestTime}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span className="text-am-gold">{destination.budget}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const resultsRef = useRef(null)
  const inView = useInView(resultsRef, { once: true, margin: '-50px' })

  const filteredDestinations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return destinations.filter((destination) => {
      const matchesSearch =
        !query ||
        destination.name.toLowerCase().includes(query) ||
        destination.description.toLowerCase().includes(query) ||
        destination.categories.some((category) => category.toLowerCase().includes(query))

      const matchesFilter =
        activeFilter === 'All' || destination.categories.includes(activeFilter)

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  return (
    <PageTransition>
      <section className="editorial-hero">
        <div className="page-shell relative z-10">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div className="hero-copy">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
                className="kicker mb-5"
              >
                <Compass size={14} className="text-am-orange" />
                Destination atlas
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .06, duration: .65 }}
                className="display-title"
              >
                Travel by feeling,
                <span className="block gradient-text-warm">not by checklist.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .16, duration: .55 }}
                className="copy-lg mt-7 max-w-2xl"
              >
                Search by place, mood, or experience. Ankahi Manzil helps you move from
                inspiration to a destination that actually fits the journey you want.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .22, duration: .55 }}
              className="travel-panel rounded-[1.5rem] p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <SlidersHorizontal size={14} className="text-am-cyan" />
                Discover your way
              </div>

              <div className="discovery-search relative rounded-2xl">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Try “mountains”, “culture”, “Goa”…"
                  aria-label="Search destinations"
                  className="w-full rounded-2xl border-0 bg-transparent py-4 pl-11 pr-4 text-sm outline-none"
                />
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    className="discovery-chip"
                    data-active={activeFilter === category}
                    aria-pressed={activeFilter === category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                <span>{filteredDestinations.length} places match your mood</span>
                {(searchQuery || activeFilter !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      setActiveFilter('All')
                    }}
                    className="font-semibold text-am-orange hover:text-am-warm"
                  >
                    Reset
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={resultsRef} className="pb-24 lg:pb-32">
        <div className="page-shell">
          <div className="mb-8 flex items-end justify-between gap-5 border-b border-white/7 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-text-muted">Curated collection</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                {activeFilter === 'All' ? 'All destinations' : activeFilter}
              </h2>
            </div>
            <Link to="/plan" className="hidden items-center gap-2 text-sm font-semibold text-am-cyan hover:text-am-teal sm:inline-flex">
              Turn a place into a plan
              <ArrowRight size={15} />
            </Link>
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="travel-panel rounded-[1.5rem] px-6 py-20 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-am-orange/10 text-am-orange">
                <MapPin size={20} />
              </div>
              <h2 className="text-2xl font-bold">No route found yet.</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
                Try a broader mood or clear the current filters. The best detours are usually one search away.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-3">
              {filteredDestinations.map((destination, index) => (
                <DestinationEditorialCard
                  key={destination.id}
                  destination={destination}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
