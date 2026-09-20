import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Compass, Plus, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
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
    note: 'Active demo journey',
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
    note: 'Upcoming demo journey',
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
    note: 'Completed demo journey',
  },
]

const tabs = ['all', 'active', 'upcoming', 'completed']

export default function MyTrips() {
  const [trips, setTrips] = useState(defaults)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('am_saved_trips') || '[]')
      if (Array.isArray(saved) && saved.length) {
        const mapped = saved.map((item) => ({
          id: item.id,
          destination: item.destination,
          title: item.destination + ' personal journey',
          image: item.image || '/images/dest-manali.jpg',
          dates: 'Custom schedule',
          days: item.days || 4,
          statusType: 'active',
          totalBudget: item.totalBudget || 20000,
          spent: item.plannedCost || 0,
          note: 'Saved from Journey Composer',
        }))
        setTrips([...mapped, ...defaults])
      }
    } catch (error) {
      console.error('Unable to read saved trips', error)
    }
  }, [])

  const visible = useMemo(
    () => trips.filter((trip) => filter === 'all' || trip.statusType === filter),
    [trips, filter]
  )

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
              Saved plans from this browser sit beside a few built-in demo journeys, so the workspace always has something useful to explore.
            </p>
          </div>
          <Link to="/plan" className="button-primary self-start">
            <Plus size={14} />
            New journey
          </Link>
        </header>

        <div className="page-shell px-0">
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
                  transition={{ delay: index * .06 }}
                  className="group grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.02] lg:grid-cols-[22rem_1fr]"
                >
                  <div className="relative min-h-64 overflow-hidden">
                    <img src={trip.image} alt={trip.destination} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07110f]/70 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] backdrop-blur-md">
                      {trip.statusType}
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
              <h2 className="text-2xl font-semibold">No journeys here yet.</h2>
              <Link to="/plan" className="button-primary mt-6">Plan one</Link>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
