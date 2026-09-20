import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Calendar, Clock, IndianRupee, Mountain, Bot, ArrowRight, ChevronLeft, Compass, Utensils } from 'lucide-react'
import { destinations } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

export default function DestinationDetails() {
  const { slug } = useParams()
  const destination = destinations.find((d) => d.slug === slug)

  if (!destination) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-4">
              Destination Not Found
            </h1>
            <p className="text-text-secondary mb-8">We couldn't find this destination.</p>
            <Link to="/destinations" className="btn-primary inline-flex items-center gap-2">
              <ChevronLeft size={16} />
              Browse Destinations
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  const examplePrompts = [
    `What can I do in ${destination.name} for 3 days?`,
    `Can I visit ${destination.name} under ₹15,000?`,
    `What should I avoid during monsoon?`,
  ]

  return (
    <PageTransition>
      {/* Hero Image */}
      <section className="relative h-[68vh] min-h-[520px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-[1800ms] hover:scale-[1.025]"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 to-transparent" />

        {/* Back link */}
        <div className="absolute top-24 lg:top-28 left-0 right-0">
          <div className="page-shell">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <ChevronLeft size={16} />
              All Destinations
            </Link>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 lg:pb-14">
          <div className="container-max mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={18} className="text-am-orange" />
                <span className="text-sm text-text-secondary">{destination.categories.join(' • ')}</span>
              </div>
              <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.05em] text-text-primary mb-4">
                {destination.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-am-gold fill-am-gold" />
                  <span className="text-sm font-semibold text-text-primary">{destination.rating}</span>
                </div>
                {destination.suggestedDays && (
                  <span className="text-sm text-text-secondary">{destination.suggestedDays}</span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="page-shell py-14 lg:py-20">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_390px] gap-10 lg:gap-16">
          {/* Main Content */}
          <div className="space-y-12">
            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-4">About</h2>
              <p className="text-text-secondary leading-relaxed">{destination.about}</p>
            </motion.section>

            {/* Top Attractions */}
            {destination.topAttractions && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-5">Top Attractions</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.topAttractions.map((attr, i) => (
                    <div key={i} className="flex items-center gap-3 glass-card rounded-xl p-4 border border-border-subtle">
                      <Compass size={16} className="text-am-orange shrink-0" />
                      <span className="text-sm text-text-primary">{attr}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Things to Do */}
            {destination.thingsToDo && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-5">Things to Do</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.thingsToDo.map((thing, i) => (
                    <div key={i} className="flex items-center gap-3 glass-card rounded-xl p-4 border border-border-subtle">
                      <Mountain size={16} className="text-am-cyan shrink-0" />
                      <span className="text-sm text-text-primary">{thing}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Nearby */}
            {destination.nearby && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-5">Nearby Places</h2>
                <div className="flex flex-wrap gap-3">
                  {destination.nearby.map((place, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-navy-700/40 border border-border-subtle text-sm text-text-secondary">
                      {place}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="travel-panel rounded-[1.5rem] p-6 sticky top-24"
            >
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-5">Quick Info</h3>

              <div className="space-y-4 mb-6">
                {[
                  { icon: Calendar, label: 'Best Time', value: destination.bestTime, color: '#F6A623' },
                  { icon: IndianRupee, label: 'Budget Range', value: destination.budget, color: '#7DDC48' },
                  { icon: Clock, label: 'Suggested Duration', value: destination.suggestedDays, color: '#16C7D9' },
                ].filter(r => r.value).map((row) => (
                  <div key={row.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${row.color}12` }}>
                      <row.icon size={16} style={{ color: row.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{row.label}</p>
                      <p className="text-sm font-medium text-text-primary">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {destination.weather && (
                <div className="p-3 rounded-xl bg-navy-800/50 border border-border-subtle mb-6">
                  <p className="text-xs text-text-muted mb-1">Weather</p>
                  <p className="text-sm text-text-secondary">{destination.weather}</p>
                </div>
              )}

              <Link
                to="/plan"
                className="btn-primary w-full text-sm flex items-center justify-center gap-2 py-3"
              >
                Plan a Trip to {destination.name}
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Manzilo Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="travel-panel rounded-[1.5rem] p-6 border-am-purple/15"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-am-cyan to-am-purple flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-text-primary">Ask Manzilo about {destination.name}</span>
              </div>
              <div className="space-y-2 mb-5">
                {examplePrompts.map((prompt, i) => (
                  <Link
                    key={i}
                    to="/manzilo"
                    className="block p-3 rounded-xl bg-navy-800/40 border border-border-subtle text-sm text-text-secondary hover:text-text-primary hover:border-am-purple/20 transition-all"
                  >
                    "{prompt}"
                  </Link>
                ))}
              </div>
              <Link
                to="/manzilo"
                className="text-sm text-am-cyan hover:text-am-teal transition-colors inline-flex items-center gap-1.5"
              >
                Chat with Manzilo <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
