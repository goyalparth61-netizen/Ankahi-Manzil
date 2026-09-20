import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle, ArrowLeft, CalendarDays, Check, Clock3, Compass,
  IndianRupee, MapPin, RefreshCw, Share2
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { getTripById, monitorTrip, replanTrip } from '../services/tripService'
import PageTransition from '../components/layout/PageTransition'
import ManziloLogo from '../components/ManziloLogo'

function normalizeDays(daysData = []) {
  return daysData.map((day, index) => ({
    dayNumber: day.dayNumber ?? day.dayNum ?? index + 1,
    title: day.title || `Day ${index + 1}`,
    stops: (day.stops || day.activities || []).map((activity) => ({
      time: activity.time,
      title: activity.title || activity.activity,
      cost: Number(activity.cost || 0),
      desc: activity.desc || activity.description,
      isVulnerable: Boolean(activity.isVulnerable),
    })),
  }))
}

function buildDemoTrip(id) {
  const destination = id === 'goa-2026'
    ? destinations.find((item) => item.slug === 'goa')
    : id === 'jaipur-2026'
      ? destinations.find((item) => item.slug === 'jaipur')
      : destinations.find((item) => item.slug === 'manali')

  const dayCount = id === 'goa-2026' ? 5 : id === 'jaipur-2026' ? 3 : 4
  const total = id === 'goa-2026' ? 35000 : id === 'jaipur-2026' ? 15000 : 24000
  const spent = id === 'goa-2026' ? 28000 : id === 'jaipur-2026' ? 13200 : 18450
  const pool = [...(destination.topAttractions || []), ...(destination.thingsToDo || [])]

  const days = Array.from({ length: Math.min(dayCount, 4) }, (_, dayIndex) => ({
    dayNumber: dayIndex + 1,
    title: dayIndex === 0 ? 'Arrival + first impression' : dayIndex === 1 ? 'Signature experiences' : 'Local rhythm + open space',
    stops: [
      { time: '09:00', title: dayIndex === 0 ? 'Arrival & settle in' : pool[dayIndex] || 'Morning exploration', cost: 300 },
      { time: '11:30', title: pool[dayIndex + 1] || 'Local landmark', cost: 600 },
      { time: '14:00', title: 'Regional lunch + pause', cost: 850 },
      { time: '16:30', title: pool[dayIndex + 3] || 'Golden-hour stop', cost: 900 },
    ],
  }))

  return {
    id,
    title: id === 'goa-2026'
      ? 'South Goa Heritage & Coastal Circuit'
      : id === 'jaipur-2026'
        ? 'Pink City Royal Bastions Tour'
        : 'Himalayan High Altitude Escape',
    destination: destination.name,
    image: destination.image,
    dates: id === 'goa-2026'
      ? 'Nov 20 – Nov 25, 2026'
      : id === 'jaipur-2026'
        ? 'Aug 10 – Aug 13, 2026'
        : 'Oct 14 – Oct 18, 2026',
    days,
    budgetTotal: total,
    budgetSpent: spent,
    status: id === 'jaipur-2026' ? 'Completed demo' : 'Demo monitoring',
    source: 'demo',
  }
}

function normalizeTrip(apiTrip, fallback) {
  if (!apiTrip) return fallback

  const localDestination = destinations.find((item) =>
    item.slug === apiTrip.slug || item.name === apiTrip.destination
  )

  const normalizedDays = normalizeDays(apiTrip.daysData || [])
  return {
    id: apiTrip.id || apiTrip.tripId || fallback.id,
    title: apiTrip.title || `${apiTrip.destination || fallback.destination} Adaptive Expedition`,
    destination: apiTrip.destination || fallback.destination,
    image: apiTrip.image || localDestination?.image || fallback.image,
    dates: apiTrip.dates || 'Custom schedule',
    days: normalizedDays.length ? normalizedDays : fallback.days,
    budgetTotal: Number(apiTrip.budgetTotal ?? apiTrip.totalBudget ?? apiTrip.budget ?? fallback.budgetTotal),
    budgetSpent: Number(apiTrip.budgetSpent ?? apiTrip.plannedCost ?? apiTrip.spent ?? fallback.budgetSpent),
    status: apiTrip.status || fallback.status,
    source: apiTrip.source || 'backend',
  }
}

export default function TripDetails() {
  const { id } = useParams()
  const fallback = useMemo(() => buildDemoTrip(id), [id])
  const [trip, setTrip] = useState(fallback)
  const [activeDay, setActiveDay] = useState(1)
  const [disruption, setDisruption] = useState(null)
  const [replanned, setReplanned] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [monitoring, setMonitoring] = useState(false)
  const [replanning, setReplanning] = useState(false)
  const [replanMessage, setReplanMessage] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      const result = await getTripById(id)
      if (!active) return
      setTrip(normalizeTrip(result, fallback))
      setActiveDay(1)
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [id, fallback])

  const active = trip.days.find((day) => day.dayNumber === activeDay) || trip.days[0]

  const copy = async () => {
    await navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const toggleDisruption = async () => {
    if (disruption) {
      setDisruption(null)
      setReplanned(false)
      setReplanMessage('')
      return
    }

    setMonitoring(true)
    const result = await monitorTrip(trip.id, true)
    const detected = result.disruptions?.[0] || {
      id: 'local_disruption',
      title: 'Demo weather disruption',
      severity: 'medium',
    }
    setDisruption(detected)
    setReplanned(false)
    setMonitoring(false)
  }

  const applyReplan = async () => {
    if (!disruption) return
    setReplanning(true)
    const result = await replanTrip(trip.id, disruption.id)
    setReplanned(Boolean(result.success))
    setReplanMessage(result.message || 'Itinerary replanned successfully.')
    setReplanning(false)

    if (result.source === 'backend') {
      const refreshed = await getTripById(trip.id)
      if (refreshed) setTrip(normalizeTrip(refreshed, trip))
    }
  }

  return (
    <PageTransition>
      <section className="app-shell">
        <div className="page-shell px-0">
          <Link to="/trips" className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-white">
            <ArrowLeft size={14} />
            Back to My Trips
          </Link>

          <div className="relative min-h-[34rem] overflow-hidden rounded-[1.7rem] border border-white/10">
            <img src={trip.image} alt={trip.destination} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,15,.18),rgba(7,17,15,.9)_82%,rgba(7,17,15,.98))]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,.72),transparent_65%)]" />

            <div className="relative flex min-h-[34rem] flex-col justify-between p-5 sm:p-8">
              <div className="flex flex-wrap justify-end gap-2">
                <span className={`inline-flex items-center rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[.13em] ${trip.source === 'backend' ? 'border-am-green/25 bg-am-green/10 text-am-green' : 'border-am-gold/20 bg-am-gold/10 text-am-gold'}`}>
                  {loading ? 'Syncing…' : trip.source === 'backend' ? 'FastAPI live' : 'Demo fallback'}
                </span>
                <button type="button" className="button-ghost" onClick={copy}>
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  {copied ? 'Copied' : 'Share'}
                </button>
                <Link to="/manzilo" className="button-primary">
                  <ManziloLogo className="h-6 w-6 rounded-md bg-white object-contain p-[1px]" />
                  Ask Manzilo
                </Link>
              </div>

              <div className="max-w-4xl">
                <div className="eyebrow mb-4">
                  <MapPin size={12} className="text-am-orange" />
                  {trip.status}
                </div>
                <h1 className="display-sm max-w-[13ch]">{trip.title}</h1>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/65">
                  <span className="flex items-center gap-1.5"><Compass size={12} />{trip.destination}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays size={12} />{trip.dates}</span>
                  <span className="flex items-center gap-1.5"><Clock3 size={12} />{trip.days.length} itinerary days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="surface-soft rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Route state</p>
              <p className="mt-2 text-lg font-semibold text-am-green">{disruption ? 'Disruption detected' : 'Stable'}</p>
              <p className="mt-1 text-xs text-text-muted">
                {trip.source === 'backend' ? 'Sentinel endpoint connected.' : 'Fallback simulation available.'}
              </p>
            </div>
            <div className="surface-soft rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Budget planned</p>
              <p className="mt-2 text-lg font-semibold text-am-gold">₹{trip.budgetSpent.toLocaleString('en-IN')}</p>
              <p className="mt-1 text-xs text-text-muted">of ₹{trip.budgetTotal.toLocaleString('en-IN')}</p>
            </div>
            <div className="surface-soft rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Adaptation</p>
              <p className="mt-2 text-lg font-semibold text-am-cyan">{replanned ? 'Applied' : 'Ready'}</p>
              <p className="mt-1 text-xs text-text-muted">{replanMessage || 'Smallest-change strategy.'}</p>
            </div>
          </div>

          <div className="mt-4 app-layout">
            <main className="app-panel">
              <div className="border-b border-white/8 p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {trip.days.map((day) => (
                    <button
                      key={day.dayNumber}
                      type="button"
                      className="ai-chip"
                      data-active={activeDay === day.dayNumber}
                      onClick={() => setActiveDay(day.dayNumber)}
                    >
                      Day {day.dayNumber}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h2 className="text-xl font-semibold">{active?.title}</h2>
                <div className="mt-4 space-y-2">
                  {active?.stops?.map((stop, index) => {
                    const affected = Boolean(disruption) && activeDay === 1 && (stop.isVulnerable || index === active.stops.length - 1)
                    return (
                      <motion.div key={stop.time + stop.title} layout className="ai-route-row">
                        <span className="font-mono text-[11px] text-text-muted">{stop.time}</span>
                        <span className="ai-route-dot">{affected ? <AlertTriangle size={11} /> : <Check size={11} />}</span>
                        <div>
                          <p className={affected && !replanned ? 'text-sm font-semibold text-am-orange line-through' : 'text-sm font-semibold'}>
                            {affected && replanned ? 'Replanned alternative activity' : stop.title}
                          </p>
                          <p className="mt-1 text-[11px] text-text-muted">
                            {affected && replanned
                              ? 'Updated by the replan service while preserving the surrounding schedule.'
                              : stop.desc || 'Estimated activity cost ₹' + (stop.cost || 0)}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-am-green">{affected ? (replanned ? 'Updated' : 'Affected') : 'Fits'}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </main>

            <aside className="space-y-3">
              <div className="app-panel app-panel-pad">
                <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
                  <ManziloLogo className="manzilo-logo manzilo-logo-sm" />
                  Manzilo explanation
                </div>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {disruption
                    ? replanned
                      ? 'The replan endpoint has handled the disruption. When the backend is live, refreshed trip data is loaded immediately.'
                      : `${disruption.title || 'A disruption'} is affecting the itinerary. Apply the replan to request an alternative from FastAPI.`
                    : 'Trigger Sentinel monitoring to check the trip and simulate a presentation-ready disruption.'}
                </p>
              </div>

              <button
                type="button"
                className="button-ghost w-full"
                onClick={toggleDisruption}
                disabled={monitoring}
              >
                <AlertTriangle size={14} />
                {monitoring ? 'Checking Sentinel…' : disruption ? 'Clear disruption' : 'Run Sentinel simulation'}
              </button>

              <AnimatePresence>
                {disruption && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    type="button"
                    className="button-soft w-full"
                    onClick={applyReplan}
                    disabled={replanning}
                  >
                    <RefreshCw size={14} className={replanning ? 'animate-spin' : ''} />
                    {replanning ? 'Replanning…' : replanned ? 'Replan applied' : 'Apply FastAPI replan'}
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="app-panel app-panel-pad">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <IndianRupee size={14} className="text-am-gold" />
                  Budget remaining
                </div>
                <p className="mt-3 text-2xl font-semibold">₹{Math.max(0, trip.budgetTotal - trip.budgetSpent).toLocaleString('en-IN')}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
