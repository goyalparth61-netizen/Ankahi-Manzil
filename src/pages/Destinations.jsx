import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, MapPin, Star, ArrowRight } from 'lucide-react'
import { destinations, allCategories } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesFilter =
        activeFilter === 'All' ||
        dest.categories.includes(activeFilter)

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-am-orange/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-am-cyan/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-max mx-auto px-4 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary mb-6"
          >
            <MapPin size={14} className="text-am-orange" />
            EXPLORE DESTINATIONS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl mx-auto"
          >
            Where will your next{' '}
            <span className="gradient-text-brand">story begin?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base lg:text-lg text-text-secondary max-w-xl mx-auto mb-10"
          >
            Explore destinations and let Manzilo turn inspiration
            into an intelligent journey.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-lg mx-auto mb-8"
          >
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full bg-navy-700/50 border border-border-subtle rounded-xl pl-11 pr-4 py-3.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-am-orange/40 focus:ring-1 focus:ring-am-orange/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Filter Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-am-orange/20 text-am-orange border border-am-orange/30'
                    : 'bg-navy-700/40 text-text-secondary border border-border-subtle hover:text-text-primary hover:border-border-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="section-padding pt-8" ref={ref}>
        <div className="container-max mx-auto">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary text-lg mb-2">No destinations found.</p>
              <p className="text-text-muted text-sm">Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              {filteredDestinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: Math.min(i * 0.08, 0.6), duration: 0.5 }}
                >
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="group block relative rounded-2xl overflow-hidden border border-border-subtle hover:border-border-light transition-all duration-500"
                  >
                    <div className="relative h-72 sm:h-80 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                      <div className="absolute inset-0 bg-am-orange/0 group-hover:bg-am-orange/5 transition-colors duration-500" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <MapPin size={14} className="text-am-orange" />
                            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary group-hover:translate-x-1 transition-transform duration-300">
                              {dest.name}
                            </h3>
                          </div>
                          <p className="text-xs text-text-secondary">
                            {dest.categories.join(' • ')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-navy-700/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-border-subtle">
                          <Star size={13} className="text-am-gold fill-am-gold" />
                          <span className="text-sm font-semibold text-text-primary">{dest.rating}</span>
                        </div>
                      </div>
                      {dest.bestTime && (
                        <p className="text-xs text-text-muted">Best time: {dest.bestTime}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
