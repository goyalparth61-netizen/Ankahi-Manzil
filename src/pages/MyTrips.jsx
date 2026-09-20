import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Compass, Plus, RefreshCw, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getTrips } from '../services/tripService'
import PageTransition from '../components/layout/PageTransition'

const defaults = [
  {
    id: 'manali-2026',
    destination: 'Manali',
    title: 'Himalayan High Altitude Escape',
    image: '/images/dest-manali.jpg',
    dates: 'Oct 14 – Oct 18, 2026',
    days: 4,
    statusType: 'active',
    totalBudget: 24000,
    spent: 18450,
    note: 'Built-in demo journey',
  },
  {
    id: 'goa-2026',
    destination: 'Goa',
    title: 'South Goa Heritage & Coastal Circuit',
    image: '/images/dest-goa.jpg',
    dates: 'Nov 20 – Nov 25, 2026',
    days: 5,
    statusType: 'upcoming',
    totalBudget: 35000,
    spent: 28000,
    note: 'Built-in demo journey',
  },
  {
    id: 'jaipur-2026',
    destination: 'Jaipur',
    title: 'Pink City Royal Bastions Tour',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&q=85',
    dates: 'Aug 10 – Aug 13, 2026',
    days: 3,
    statusType: 'completed',
    totalBudget: 15000,
    spent: 13200,
    note: 'Built-in demo journey',
  },
]

const tabs = ['all', 'active', 'upcoming', 'completed']

function normalizeTrip(trip, source) {
  return {
    id: trip.id || trip.tripId,
    destination: trip.destination || 'Journey',
    title: trip.title || `${trip.destination || 'Custom'} journey`,
    image: trip.image || '/images/dest-manali.jpg',
    dates: trip.dates || 'Custom schedule',
    days: Number(trip.days || trip.daysData?.length || 4),
    statusType: trip.statusType || trip.status || 'active',
    totalBudget: Number(trip.totalBudget ?? trip.budget ?? 20000),
    spent: Number(trip.spent ?? trip.plannedCost ?? 0),
    note: source === 'backend'
      ? (trip.disruptionState || 'Saved in FastAPI backend')
      : 'Saved in local fallback cache',
    source,
  }
}

export default function MyTrips() {
  const [trips, setTrips] = useState(defaults)
  const [filter, setFilter] = useState('all')
  const [source, setSource] = useState('demo')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadTrips = async () => {
      setLoading(true)
      const result = await getTrips()
      if (!active) return

      const normalized = (result.data || [])
        .filter((trip) => trip.id || trip.tripId)
        .map((trip) => normalizeTrip(trip, result.source))

      if (normalized.length > 0) {
        setTrips(normalized)
        setSource(result.source)
      } else {
        setTrips(defaults)
        setSource(result.source === 'backend' ? 'backend-empty' : 'demo')
      }
      setLoading(false)
    }

    loadTrips()
    return () => {
      active = false
    }
  }, [])

  const visible = useMemo(
    () => trips.filter((trip) => filter === 'all' || trip.statusType === filter),
    [trips, filter]
  )

  const refresh = async () => {
    setLoading(true)
    const result = await getTrips()
    const normalized = (result.data || [])
      .filter((trip) => trip.id || trip.tripId)
      .map((trip) => normalizeTrip(trip, result.source))

    setTrips(normalized.length ? normalized : defaults)
    setSource(normalized.length ? result.source : (result.source === 'backend' ? 'backend-empty' : 'demo'))
    setLoading(false)
  }

  const sourceLabel =
    source === 'backend'
      ? 'FastAPI database'
      : source === 'local'
        ? 'Local fallback cache'
        : source === 'backend-empty'
          ? 'Backend connected • no saved trips yet'
          : 'Built-in demo journeys'

  return (
    <PageTransition>
      <section className="app-shell">
        <header className="app-head">
          <div>
            <div className="eyebrow mb-4">
              <Compass size={13} className="text-am-cyan" />
              Journey library
            </div>
            <h1>
              Trips in motion.
              <span className="block serif-accent">Stories in progress.</span>
            </h1>
            <p className="lede mt-5 max-w-2xl">
              Journeys are loaded from the FastAPI backend when available, with local and built-in demo fallbacks for resilient presentation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 self-start">
            <button type="button" className="button-ghost" onClick={refresh} disabled={loading}>
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <Link to="/plan" className="button-primary">
              <Plus size={14} />
              New journey
            </Link>
          </div>
        </header>

        <div className="page-shell px-0">
          <div className="mb-4 flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[.025] px-4 py-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-text-muted">Data source</p>
              <p className="mt-1 text-xs font-semibold text-text-secondary">{sourceLabel}</p>
            </div>
            <span className={`h-2.5 w-2.5 rounded-full ${source === 'backend' || source === 'backend-empty' ? 'bg-am-green' : 'bg-am-gold'}`} />
          </div>

          <div className="mb-7 flex gap-2 overflow-x-auto border-y border-white/8 py-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className="ai-chip capitalize"
                data-active={filter === tab}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {visible.length ? (
            <div className="space-y-4">
              {visible.map((trip, index) => (
                <motion.article
                  key={trip.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * .05 }}
                  className="group grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.02] lg:grid-cols-[22rem_1fr]"
                >
                  <div className="relative min-h-64 overflow-hidden">
                    <img src={trip.image} alt={trip.destination} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07110f]/70 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] backdrop-blur-md">
                        {trip.statusType}
                      </span>
                      {trip.source === 'backend' && (
                        <span className="rounded-full border border-am-green/25 bg-am-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-am-green backdrop-blur-md">
                          live
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-5 sm:p-7">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.15em] text-am-orange">{trip.destination}</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] sm:text-3xl">{trip.title}</h2>
                      <p className="mt-2 text-sm text-text-secondary">{trip.note}</p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="border-t border-white/8 pt-3">
                          <CalendarDays size={13} className="text-am-gold" />
                          <p className="mt-2 text-[10px] uppercase tracking-[.12em] text-text-muted">Schedule</p>
                          <p className="mt-1 text-xs font-semibold">{trip.dates}</p>
                        </div>
                        <div className="border-t border-white/8 pt-3">
                          <Route size={13} className="text-am-cyan" />
                          <p className="mt-2 text-[10px] uppercase tracking-[.12em] text-text-muted">Duration</p>
                          <p className="mt-1 text-xs font-semibold">{trip.days} days</p>
                        </div>
                        <div className="border-t border-white/8 pt-3">
                          <span className="text-xs font-bold text-am-green">₹</span>
                          <p className="mt-2 text-[10px] uppercase tracking-[.12em] text-text-muted">Planned</p>
                          <p className="mt-1 text-xs font-semibold">₹{trip.spent.toLocaleString('en-IN')} / ₹{trip.totalBudget.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 flex items-center justify-between gap-4">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/6">
                        <div
                          className="h-full rounded-full bg-am-gold"
                          style={{ width: Math.min(100, (trip.spent / Math.max(1, trip.totalBudget)) * 100) + '%' }}
                        />
                      </div>
                      <Link to={'/trips/' + trip.id} className="button-ghost">
                        Open
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="surface rounded-art py-20 text-center">
              <h2 className="text-2xl font-semibold">No journeys in this view.</h2>
              <Link to="/plan" className="button-primary mt-6">Plan one</Link>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
