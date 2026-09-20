import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar, MapPin, IndianRupee, ShieldCheck, ArrowRight,
  Plus, Bot, Clock, AlertTriangle, CheckCircle2, ChevronRight
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
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
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

export default function MyTrips() {
  const [trips, setTrips] = useState(defaultTrips)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('am_saved_trips') || '[]')
      if (saved && saved.length > 0) {
        // Merge saved trips with defaultTrips
        const formattedSaved = saved.map(s => ({
          id: s.id,
          destination: s.destination,
          slug: s.slug || 'manali',
          title: `${s.destination} Adaptive Expedition`,
          image: s.image || '/images/dest-manali.jpg',
          dates: 'Custom Scheduled',
          days: s.days || 4,
          travelers: 'Self & Co.',
          status: 'Active Monitoring',
          statusType: 'active',
          totalBudget: s.totalBudget || 20000,
          spent: s.plannedCost || 16000,
          disruptionState: 'Sentinel Guard Active',
          nextActivity: 'Day 1 Check-in',
        }))
        setTrips([...formattedSaved, ...defaultTrips])
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const filteredTrips = trips.filter(t => {
    if (filter === 'all') return true
    if (filter === 'active') return t.statusType === 'active'
    if (filter === 'upcoming') return t.statusType === 'upcoming'
    if (filter === 'completed') return t.statusType === 'completed'
    return true
  })

  return (
    <PageTransition>
      <div className="pt-24 lg:pt-28 pb-24 relative">
        <div className="container-max mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-am-cyan/10 border border-am-cyan/20 text-xs font-semibold tracking-wider text-am-cyan uppercase mb-3">
                <ShieldCheck size={14} />
                Live Trip Portfolio
              </div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-text-primary">
                My <span className="gradient-text-warm">Trips</span>
              </h1>
              <p className="text-sm sm:text-base text-text-secondary mt-1">
                Manage your itineraries and monitor live disruption-safe routes configured by Manzilo.
              </p>
            </div>

            <Link
              to="/plan"
              className="btn-primary inline-flex items-center gap-2 text-sm self-start md:self-auto"
            >
              <Plus size={16} />
              Plan New Trip
            </Link>
          </div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Active Trips</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-cyan">
                {trips.filter(t => t.statusType === 'active').length}
              </div>
              <div className="text-[11px] text-text-muted mt-1 flex items-center gap-1">
                <ShieldCheck size={12} className="text-am-green" /> Monitored 24/7
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Total Days Planned</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-orange">
                {trips.reduce((acc, t) => acc + t.days, 0)} Days
              </div>
              <div className="text-[11px] text-text-muted mt-1">Across 3 regions</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Replans Automated</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-purple">
                4 Saved
              </div>
              <div className="text-[11px] text-text-muted mt-1">0 missed activities</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Budget Protected</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-green">
                ₹8,250
              </div>
              <div className="text-[11px] text-text-muted mt-1">Under allocated cap</div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 border-b border-border-subtle pb-4 mb-8 overflow-x-auto">
            {[
              { id: 'all', label: 'All Trips' },
              { id: 'active', label: 'Active & Monitored' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'completed', label: 'Completed' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  filter === tab.id
                    ? 'bg-am-orange text-white'
                    : 'bg-navy-900/60 text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Trip Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <div
                key={trip.id}
                className="glass-card rounded-2xl border border-border-subtle overflow-hidden flex flex-col justify-between group hover:border-am-orange/40 transition-all hover:-translate-y-1"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        trip.statusType === 'active'
                          ? 'bg-am-green/20 text-am-green border border-am-green/40 backdrop-blur-md'
                          : trip.statusType === 'upcoming'
                          ? 'bg-am-cyan/20 text-am-cyan border border-am-cyan/40 backdrop-blur-md'
                          : 'bg-navy-800/80 text-text-muted border border-border-subtle backdrop-blur-md'
                      }`}>
                        {trip.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4">
                      <span className="text-xs text-am-orange font-bold uppercase tracking-wider">
                        {trip.destination}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                        {trip.title}
                      </h3>
                    </div>
                  </div>

                  {/* Trip details */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-text-muted flex items-center gap-1 mb-0.5">
                          <Calendar size={12} /> Dates
                        </div>
                        <div className="font-semibold text-text-primary">{trip.dates}</div>
                      </div>

                      <div>
                        <div className="text-text-muted flex items-center gap-1 mb-0.5">
                          <Clock size={12} /> Duration
                        </div>
                        <div className="font-semibold text-text-primary">{trip.days} Days</div>
                      </div>
                    </div>

                    {/* Sentinel status banner */}
                    <div className="p-3 rounded-xl bg-navy-900/80 border border-border-subtle/80 flex items-center justify-between text-xs">
                      <span className="text-text-secondary flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-am-cyan" />
                        {trip.disruptionState}
                      </span>
                    </div>

                    {/* Budget bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-text-secondary">Budget Utilization</span>
                        <span className="font-mono font-bold text-text-primary">
                          ₹{trip.spent.toLocaleString('en-IN')} / ₹{trip.totalBudget.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-navy-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-am-cyan to-am-orange rounded-full"
                          style={{ width: `${Math.min(100, (trip.spent / trip.totalBudget) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="p-5 pt-0 flex items-center gap-3">
                  <Link
                    to={`/trips/${trip.id}`}
                    className="flex-1 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-border-subtle"
                  >
                    View Details
                    <ChevronRight size={14} />
                  </Link>
                  <Link
                    to="/manzilo"
                    className="p-2.5 rounded-xl bg-am-cyan/15 hover:bg-am-cyan/25 text-am-cyan transition-colors"
                    title="Ask Manzilo about this trip"
                  >
                    <Bot size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
