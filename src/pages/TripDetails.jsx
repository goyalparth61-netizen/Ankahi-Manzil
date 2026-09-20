import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle, ArrowLeft, Bot, CalendarDays, Check, Clock3, Compass,
  IndianRupee, MapPin, RefreshCw, Share2
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { destinations } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

function buildTrip(id) {
  let saved = null
  try {
    saved = JSON.parse(localStorage.getItem('am_saved_trips') || '[]').find((item) => item.id === id)
  } catch {
    saved = null
  }

  if (saved) {
    const destination = destinations.find((item) => item.slug === saved.slug) || destinations.find((item) => item.name === saved.destination) || destinations[1]
    return {
      id,
      title: saved.destination + ' personal journey',
      destination: destination.name,
      image: saved.image || destination.image,
      dates: 'Custom schedule',
      days: saved.daysData || [],
      budgetTotal: saved.totalBudget || 20000,
      budgetSpent: saved.plannedCost || 0,
      status: 'Saved locally',
    }
  }

  const destination = id === 'goa-2026'
    ? destinations.find((item) => item.slug === 'goa')
    : id === 'jaipur-2026'
      ? destinations.find((item) => item.slug === 'jaipur')
      : destinations.find((item) => item.slug === 'manali')

  const dayCount = id === 'goa-2026' ? 5 : id === 'jaipur-2026' ? 3 : 4
  const total = id === 'goa-2026' ? 35000 : id === 'jaipur-2026' ? 15000 : 24000
  const spent = id === 'goa-2026' ? 28000 : id === 'jaipur-2026' ? 13200 : 18450

  const days = Array.from({ length: Math.min(dayCount, 4) }, (_, dayIndex) => {
    const pool = [...(destination.topAttractions || []), ...(destination.thingsToDo || [])]
    return {
      dayNumber: dayIndex + 1,
      title: dayIndex === 0 ? 'Arrival + first impression' : dayIndex === 1 ? 'Signature experiences' : 'Local rhythm + open space',
      stops: [
        { time: '09:00', title: dayIndex === 0 ? 'Arrival & settle in' : pool[dayIndex] || 'Morning exploration', cost: 300 },
        { time: '11:30', title: pool[dayIndex + 1] || 'Local landmark', cost: 600 },
        { time: '14:00', title: 'Regional lunch + pause', cost: 850 },
        { time: '16:30', title: pool[dayIndex + 3] || 'Golden-hour stop', cost: 900 },
      ],
    }
  })

  return {
    id,
    title: id === 'goa-2026' ? 'South Goa Heritage & Coastal Circuit' : id === 'jaipur-2026' ? 'Pink City Royal Bastions Tour' : 'Himalayan High Altitude Escape',
    destination: destination.name,
    image: destination.image,
    dates: id === 'goa-2026' ? 'Nov 20 – Nov 25, 2026' : id === 'jaipur-2026' ? 'Aug 10 – Aug 13, 2026' : 'Oct 14 – Oct 18, 2026',
    days,
    budgetTotal: total,
    budgetSpent: spent,
    status: id === 'jaipur-2026' ? 'Completed demo' : 'Demo monitoring',
  }
}

export default function TripDetails() {
  const { id } = useParams()
  const trip = useMemo(() => buildTrip(id), [id])
  const [activeDay, setActiveDay] = useState(1)
  const [disruption, setDisruption] = useState(false)
  const [replanned, setReplanned] = useState(false)
  const [copied, setCopied] = useState(false)

  const active = trip.days.find((day) => day.dayNumber === activeDay) || trip.days[0]

  const copy = async () => {
    await navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
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
              <div className="flex justify-end gap-2">
                <button type="button" className="button-ghost" onClick={copy}>
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  {copied ? 'Copied' : 'Share'}
                </button>
                <Link to="/manzilo" className="button-primary">
                  <Bot size={14} />
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
              <p className="mt-2 text-lg font-semibold text-am-green">{disruption ? 'Scenario active' : 'Stable'}</p>
              <p className="mt-1 text-xs text-text-muted">Local demo state, not live monitoring.</p>
            </div>
            <div className="surface-soft rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Budget planned</p>
              <p className="mt-2 text-lg font-semibold text-am-gold">₹{trip.budgetSpent.toLocaleString('en-IN')}</p>
              <p className="mt-1 text-xs text-text-muted">of ₹{trip.budgetTotal.toLocaleString('en-IN')}</p>
            </div>
            <div className="surface-soft rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Adaptation</p>
              <p className="mt-2 text-lg font-semibold text-am-cyan">{replanned ? 'Applied' : 'Ready to demo'}</p>
              <p className="mt-1 text-xs text-text-muted">Changes only the affected block.</p>
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
                    const affected = disruption && activeDay === 1 && index === 3
                    return (
                      <motion.div key={stop.time} layout className="ai-route-row">
                        <span className="font-mono text-[11px] text-text-muted">{stop.time}</span>
                        <span className="ai-route-dot">{affected ? <AlertTriangle size={11} /> : <Check size={11} />}</span>
                        <div>
                          <p className={affected && !replanned ? 'text-sm font-semibold text-am-orange line-through' : 'text-sm font-semibold'}>
                            {affected && replanned ? 'Indoor local culture stop + café buffer' : stop.title}
                          </p>
                          <p className="mt-1 text-[11px] text-text-muted">
                            {affected && replanned ? 'Replacement chosen to preserve return time' : 'Estimated activity cost ₹' + (stop.cost || 0)}
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
                  <Bot size={14} />
                  Manzilo explanation
                </div>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {disruption
                    ? replanned
                      ? 'Only the vulnerable afternoon block was replaced. Earlier stops and the return window stay unchanged.'
                      : 'This demo scenario marks the final outdoor stop as unavailable. Apply the replan to see the smallest-change strategy.'
                    : 'The route is stable. Trigger a disruption to demonstrate adaptive itinerary behavior.'}
                </p>
              </div>

              <button
                type="button"
                className="button-ghost w-full"
                onClick={() => {
                  setDisruption((value) => !value)
                  setReplanned(false)
                }}
              >
                <AlertTriangle size={14} />
                {disruption ? 'Clear disruption' : 'Simulate disruption'}
              </button>

              <AnimatePresence>
                {disruption && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    type="button"
                    className="button-soft w-full"
                    onClick={() => setReplanned(true)}
                  >
                    <RefreshCw size={14} />
                    {replanned ? 'Replan active' : 'Apply smallest-change replan'}
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
