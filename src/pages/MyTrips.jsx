import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Bot, Calendar, CheckCircle2, ChevronRight,
  Clock, Compass, Plus, ShieldCheck, Sparkles
} from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

const defaultTrips = [
  {
    id: 'manali-2026',
    destination: 'Manali',
    slug: 'manali',
    title: 'Himalayan High Altitude Escape',
    image: '/images/dest-manali.jpg',
    dates: 'Oct 14 – Oct 18, 2026',
    days: 4,
    travelers: 'Couple',
    status: 'Active Monitoring',
    statusType: 'active',
    totalBudget: 24000,
    spent: 18450,
    disruptionState: 'Clear • Radar Scanning 24/7',
    nextActivity: 'Solang Valley Alpine Pass (15:30)',
  },
  {
    id: 'goa-2026',
    destination: 'Goa',
    slug: 'goa',
    title: 'South Goa Heritage & Coastal Circuit',
    image: '/images/dest-goa.jpg',
    dates: 'Nov 20 – Nov 25, 2026',
    days: 5,
    travelers: 'Friends (4)',
    status: 'Upcoming',
    statusType: 'upcoming',
    totalBudget: 35000,
    spent: 28000,
    disruptionState: 'Flight & Hotel Confirmed',
    nextActivity: 'Check-in at Palolem Sanctuary',
  },
  {
    id: 'jaipur-2026',
    destination: 'Jaipur',
    slug: 'jaipur',
    title: 'Pink City Royal Bastions Tour',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&q=85',
    dates: 'Aug 10 – Aug 13, 2026',
    days: 3,
    travelers: 'Solo',
    status: 'Completed',
    statusType: 'completed',
    totalBudget: 15000,
    spent: 13200,
    disruptionState: '1 Disruption Handled Successfully',
    nextActivity: 'Trip Completed',
  },
]

const tabs = [
  { id: 'all', label: 'All journeys' },
  { id: 'active', label: 'Live' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
]

function statusClass(type) {
  if (type === 'active') return 'border-am-green/30 bg-am-green/12 text-am-green'
  if (type === 'upcoming') return 'border-am-cyan/30 bg-am-cyan/12 text-am-cyan'
  return 'border-white/10 bg-white/7 text-text-secondary'
}

export default function MyTrips() {
  const [trips, setTrips] = useState(defaultTrips)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('am_saved_trips') || '[]')
      if (Array.isArray(saved) && saved.length > 0) {
        const formattedSaved = saved.map((trip) => ({
          id: trip.id,
          destination: trip.destination,
          slug: trip.slug || 'manali',
          title: `${trip.destination} Adaptive Expedition`,
          image: trip.image || '/images/dest-manali.jpg',
          dates: 'Custom Scheduled',
          days: trip.days || 4,
          travelers: 'Self & Co.',
          status: 'Active Monitoring',
          statusType: 'active',
          totalBudget: trip.totalBudget || 20000,
          spent: trip.plannedCost || 16000,
          disruptionState: 'Sentinel Guard Active',
          nextActivity: 'Day 1 Check-in',
        }))
        setTrips([...formattedSaved, ...defaultTrips])
      }
    } catch (error) {
      console.error('Unable to read saved trips', error)
    }
  }, [])

  const filteredTrips = useMemo(
    () => trips.filter((trip) => filter === 'all' || trip.statusType === filter),
    [trips, filter]
  )

  const featuredTrip = filteredTrips[0]
  const remainingTrips = filteredTrips.slice(1)
  const activeTrips = trips.filter((trip) => trip.statusType === 'active').length
  const totalDays = trips.reduce((total, trip) => total + trip.days, 0)
  const totalBudget = trips.reduce((total, trip) => total + trip.totalBudget, 0)
  const totalSpent = trips.reduce((total, trip) => total + trip.spent, 0)

  return (
    <PageTransition>
      <div className="app-page">
        <div className="page-shell">
          <header className="app-header">
            <div>
              <div className="kicker mb-4">
                <Compass size={14} className="text-am-cyan" />
                Journey workspace
              </div>
              <h1>
                Trips that stay
                <span className="block gradient-text-warm">one step ahead.</span>
              </h1>
              <p className="copy-lg mt-4 max-w-2xl">
                Your active, upcoming, and completed journeys in one calm workspace — with budget,
                itinerary, and disruption context always close at hand.
              </p>
            </div>

            <Link to="/plan" className="btn-primary self-start">
              <Plus size={16} />
              Plan a new journey
            </Link>
          </header>

          <section className="metric-strip mb-8" aria-label="Trip summary">
            <div className="metric-tile">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-text-muted">Live journeys</p>
              <p className="mt-2 text-2xl font-bold text-am-cyan">{activeTrips}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-text-muted">
                <ShieldCheck size={11} className="text-am-green" />
                Sentinel enabled
              </p>
            </div>
            <div className="metric-tile">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-text-muted">Days designed</p>
              <p className="mt-2 text-2xl font-bold text-am-orange">{totalDays}</p>
              <p className="mt-1 text-[11px] text-text-muted">Across all saved plans</p>
            </div>
            <div className="metric-tile">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-text-muted">Budget planned</p>
              <p className="mt-2 text-2xl font-bold text-am-gold">₹{totalBudget.toLocaleString('en-IN')}</p>
              <p className="mt-1 text-[11px] text-text-muted">Total journey allocation</p>
            </div>
            <div className="metric-tile">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-text-muted">Budget remaining</p>
              <p className="mt-2 text-2xl font-bold text-am-green">₹{Math.max(0, totalBudget - totalSpent).toLocaleString('en-IN')}</p>
              <p className="mt-1 text-[11px] text-text-muted">Across current plans</p>
            </div>
          </section>

          <div className="app-nav-tabs mb-8" role="tablist" aria-label="Filter trips">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`shrink-0 px-4 py-2 text-xs font-bold sm:text-sm ${
                  filter === tab.id
                    ? 'bg-am-orange text-white shadow-[0_8px_22px_rgba(255,107,53,.2)]'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {featuredTrip ? (
            <div className="space-y-6">
              <motion.section
                key={featuredTrip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="travel-panel overflow-hidden rounded-[1.75rem]"
              >
                <div className="grid lg:grid-cols-[1.1fr_.9fr]">
                  <div className="relative min-h-[22rem] overflow-hidden lg:min-h-[32rem]">
                    <img
                      src={featuredTrip.image}
                      alt={featuredTrip.destination}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/12 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/45" />
                    <div className="absolute left-5 top-5">
                      <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] backdrop-blur-md ${statusClass(featuredTrip.statusType)}`}>
                        {featuredTrip.status}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
                      <p className="text-xs font-bold uppercase tracking-[.15em] text-am-orange">{featuredTrip.destination}</p>
                      <h2 className="mt-2 text-3xl font-bold">{featuredTrip.title}</h2>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                      <div className="hidden lg:block">
                        <p className="text-xs font-bold uppercase tracking-[.15em] text-am-orange">{featuredTrip.destination}</p>
                        <h2 className="mt-3 text-4xl font-bold leading-tight">{featuredTrip.title}</h2>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/7 bg-white/[.025] p-4">
                          <p className="flex items-center gap-1.5 text-[11px] text-text-muted"><Calendar size={12} />Dates</p>
                          <p className="mt-1 text-sm font-semibold">{featuredTrip.dates}</p>
                        </div>
                        <div className="rounded-2xl border border-white/7 bg-white/[.025] p-4">
                          <p className="flex items-center gap-1.5 text-[11px] text-text-muted"><Clock size={12} />Duration</p>
                          <p className="mt-1 text-sm font-semibold">{featuredTrip.days} days</p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-am-cyan/15 bg-am-cyan/[.045] p-4">
                        <p className="flex items-center gap-2 text-xs font-semibold text-am-cyan">
                          <ShieldCheck size={14} />
                          {featuredTrip.disruptionState}
                        </p>
                        <p className="mt-2 text-sm text-text-secondary">Next: {featuredTrip.nextActivity}</p>
                      </div>

                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                          <span className="text-text-secondary">Budget usage</span>
                          <span className="font-mono font-bold">
                            ₹{featuredTrip.spent.toLocaleString('en-IN')} / ₹{featuredTrip.totalBudget.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-navy-950">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-am-cyan via-am-teal to-am-orange"
                            style={{ width: `${Math.min(100, (featuredTrip.spent / featuredTrip.totalBudget) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link to={`/trips/${featuredTrip.id}`} className="btn-primary">
                        Open journey
                        <ArrowRight size={15} />
                      </Link>
                      <Link to="/manzilo" className="btn-secondary">
                        <Bot size={15} />
                        Ask Manzilo
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.section>

              {remainingTrips.length > 0 && (
                <section>
                  <div className="mb-5 flex items-end justify-between border-b border-white/7 pb-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.15em] text-text-muted">More journeys</p>
                      <h2 className="mt-1 text-2xl font-bold">Your travel archive</h2>
                    </div>
                    <Sparkles size={18} className="text-am-gold" />
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    {remainingTrips.map((trip, index) => (
                      <motion.article
                        key={trip.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * .08 }}
                        className="travel-panel group grid overflow-hidden rounded-[1.4rem] sm:grid-cols-[12rem_1fr]"
                      >
                        <div className="relative min-h-44 overflow-hidden">
                          <img src={trip.image} alt={trip.destination} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 to-transparent" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-am-orange">{trip.destination}</p>
                              <h3 className="mt-1 text-lg font-bold">{trip.title}</h3>
                            </div>
                            <CheckCircle2 size={16} className={trip.statusType === 'completed' ? 'text-am-green' : 'text-text-muted'} />
                          </div>
                          <p className="mt-3 text-xs text-text-secondary">{trip.dates} • {trip.days} days • {trip.travelers}</p>
                          <p className="mt-3 text-xs text-text-muted">{trip.disruptionState}</p>
                          <Link
                            to={`/trips/${trip.id}`}
                            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-am-cyan hover:text-am-teal"
                          >
                            View journey
                            <ChevronRight size={13} />
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="travel-panel rounded-[1.5rem] py-20 text-center">
              <h2 className="text-2xl font-bold">No journeys in this view.</h2>
              <p className="mt-2 text-sm text-text-secondary">Try another filter or start planning a new trip.</p>
              <Link to="/plan" className="btn-primary mt-6">Plan a journey</Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
