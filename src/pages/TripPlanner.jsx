import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle, ArrowRight, Bookmark, Bot, Check, Compass, IndianRupee,
  RefreshCw, Sparkles, Users
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { createTripPlan } from '../services/tripService'
import PageTransition from '../components/layout/PageTransition'

const styles = [
  ['slow', 'Slow & immersive'],
  ['balanced', 'Balanced'],
  ['packed', 'See more, move more'],
]

const interestOptions = [
  'Nature', 'Adventure', 'Culture', 'Food', 'Wellness', 'Photography'
]

function buildDay(destination, dayNumber) {
  const attractions = destination.topAttractions || []
  const activities = destination.thingsToDo || []
  const pool = [...attractions, ...activities]

  return {
    dayNumber,
    title: dayNumber === 1 ? 'Arrival + first impression' : dayNumber === 2 ? 'Signature experiences' : 'Local rhythm + hidden stops',
    stops: [
      { time: '09:00', title: dayNumber === 1 ? 'Arrival & settle in' : pool[(dayNumber - 1) % pool.length] || 'Morning exploration', cost: 300 },
      { time: '11:30', title: pool[(dayNumber + 1) % pool.length] || 'Local landmark', cost: 550 },
      { time: '14:00', title: 'Regional lunch + breathing room', cost: 800 },
      { time: '16:30', title: pool[(dayNumber + 3) % pool.length] || 'Golden-hour experience', cost: 900 },
    ],
  }
}

export default function TripPlanner() {
  const [destinationName, setDestinationName] = useState('Manali')
  const [days, setDays] = useState(4)
  const [budget, setBudget] = useState(20000)
  const [travelers, setTravelers] = useState('Couple')
  const [style, setStyle] = useState('balanced')
  const [interests, setInterests] = useState(['Nature', 'Adventure'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [plan, setPlan] = useState(null)
  const [activeDay, setActiveDay] = useState(1)
  const [disruption, setDisruption] = useState(false)
  const [replanned, setReplanned] = useState(false)
  const [saved, setSaved] = useState(false)

  const destination = useMemo(
    () => destinations.find((item) => item.name === destinationName) || destinations[0],
    [destinationName]
  )

  const toggleInterest = (interest) => {
    setInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]
    )
  }

  const generate = async () => {
    setIsGenerating(true)
    setDisruption(false)
    setReplanned(false)

    const service = await createTripPlan({
      destination: destination.name,
      days,
      budget,
      interests,
    })

    const daysData = Array.from({ length: days }, (_, index) => buildDay(destination, index + 1))
    const activityCost = daysData.flatMap((day) => day.stops).reduce((sum, stop) => sum + stop.cost, 0)
    const stayEstimate = days * 2200
    const plannedCost = activityCost + stayEstimate

    setPlan({
      id: service.tripId,
      destination: destination.name,
      slug: destination.slug,
      image: destination.image,
      days,
      totalBudget: budget,
      plannedCost,
      savings: Math.max(0, budget - plannedCost),
      travelers,
      style,
      interests,
      daysData,
    })
    setActiveDay(1)
    setIsGenerating(false)
  }

  const savePlan = () => {
    if (!plan) return
    const existing = JSON.parse(localStorage.getItem('am_saved_trips') || '[]')
    const next = [plan, ...existing.filter((item) => item.id !== plan.id)]
    localStorage.setItem('am_saved_trips', JSON.stringify(next))
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const activePlanDay = plan?.daysData.find((day) => day.dayNumber === activeDay)

  return (
    <PageTransition>
      <section className="app-shell">
        <header className="app-head">
          <div>
            <div className="eyebrow mb-4">
              <Compass size={13} className="text-am-orange" />
              Journey composer
            </div>
            <h1>
              Build the route
              <span className="block serif-accent">around the way you travel.</span>
            </h1>
            <p className="lede mt-5 max-w-2xl">
              This frontend demo turns your constraints into a day-by-day sample plan and keeps the saved result in localStorage.
            </p>
          </div>
          <Link to="/features" className="button-ghost self-start">
            <Sparkles size={14} />
            Open Manzilo Studio
          </Link>
        </header>

        <div className="app-layout">
          <main className="app-panel">
            <div className="grid lg:grid-cols-[20rem_minmax(0,1fr)]">
              <aside className="border-b border-white/8 p-5 lg:border-b-0 lg:border-r">
                <div>
                  <label className="field-label" htmlFor="destination">Destination</label>
                  <select
                    id="destination"
                    className="select"
                    value={destinationName}
                    onChange={(event) => setDestinationName(event.target.value)}
                  >
                    {destinations.map((item) => (
                      <option key={item.slug}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <span className="field-label">Duration</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 4, 5, 7].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className="ai-chip justify-center"
                        data-active={days === value}
                        onClick={() => setDays(value)}
                      >
                        {value}d
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="field-label" htmlFor="travelers">Travelers</label>
                  <select id="travelers" className="select" value={travelers} onChange={(event) => setTravelers(event.target.value)}>
                    <option>Solo</option>
                    <option>Couple</option>
                    <option>Friends</option>
                    <option>Family</option>
                  </select>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-2">
                    <label className="field-label mb-0" htmlFor="budget">Budget</label>
                    <span className="text-xs font-bold text-am-gold">₹{budget.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    id="budget"
                    type="range"
                    className="range mt-3"
                    min="8000"
                    max="60000"
                    step="1000"
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                  />
                </div>

                <div className="mt-5">
                  <span className="field-label">Pace</span>
                  <div className="space-y-2">
                    {styles.map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        className="ai-nav-item"
                        data-active={style === id}
                        onClick={() => setStyle(id)}
                      >
                        <span className="h-2 w-2 rounded-full bg-am-orange" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="field-label">Interests</span>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        className="ai-chip"
                        data-active={interests.includes(interest)}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="button" className="button-primary mt-6 w-full" onClick={generate} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Composing…
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Compose journey
                    </>
                  )}
                </button>
              </aside>

              <section className="min-w-0">
                <div className="relative h-64 overflow-hidden border-b border-white/8">
                  <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d18] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[.15em] text-white/55">{destination.categories.join(' • ')}</p>
                    <h2 className="mt-1 text-3xl font-semibold">{destination.name}</h2>
                  </div>
                </div>

                {!plan ? (
                  <div className="grid min-h-[28rem] place-items-center p-8 text-center">
                    <div className="max-w-md">
                      <Bot size={26} className="mx-auto text-am-cyan" />
                      <h3 className="mt-5 text-2xl font-semibold">Your route appears here.</h3>
                      <p className="mt-3 text-sm leading-7 text-text-secondary">
                        Set the trip intent, then compose. The generated sample itinerary remains local to this browser until you save it.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5">
                    <div className="mb-4 flex gap-2 overflow-x-auto">
                      {plan.daysData.map((day) => (
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

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDay + '-' + replanned}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-2"
                      >
                        <h3 className="mb-4 text-xl font-semibold">{activePlanDay?.title}</h3>
                        {activePlanDay?.stops.map((stop, index) => {
                          const affected = disruption && activeDay === 1 && index === 3
                          return (
                            <div key={stop.time} className="ai-route-row">
                              <span className="font-mono text-[11px] text-text-muted">{stop.time}</span>
                              <span className="ai-route-dot">{affected ? <AlertTriangle size={11} /> : <Check size={11} />}</span>
                              <div>
                                <p className={affected && !replanned ? 'text-sm font-semibold text-am-orange line-through' : 'text-sm font-semibold'}>
                                  {affected && replanned ? 'Indoor culture stop + café window' : stop.title}
                                </p>
                                <p className="mt-1 text-[11px] text-text-muted">
                                  {affected && replanned ? 'Manzilo replacement • same return window' : 'Estimated activity cost ₹' + stop.cost}
                                </p>
                              </div>
                              <span className="text-[10px] font-bold text-am-green">{affected ? (replanned ? 'Updated' : 'Affected') : 'Fits'}</span>
                            </div>
                          )
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </section>
            </div>
          </main>

          <aside className="space-y-3">
            <div className="app-panel app-panel-pad">
              <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
                <Bot size={14} />
                Manzilo context
              </div>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {plan
                  ? 'The route is intentionally sequenced with flexible afternoon space so the demo can replan one block without collapsing the whole day.'
                  : 'I will use destination, duration, budget, pace and interests to build the sample plan.'}
              </p>
            </div>

            <div className="app-panel app-panel-pad">
              <div className="flex items-center justify-between gap-3">
                <span className="field-label mb-0">Budget view</span>
                <IndianRupee size={14} className="text-am-gold" />
              </div>
              <p className="mt-3 text-2xl font-semibold">₹{(plan?.plannedCost || 0).toLocaleString('en-IN')}</p>
              <p className="mt-1 text-xs text-text-muted">planned against ₹{budget.toLocaleString('en-IN')}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/25">
                <div
                  className="h-full rounded-full bg-am-gold"
                  style={{ width: plan ? Math.min(100, (plan.plannedCost / budget) * 100) + '%' : '0%' }}
                />
              </div>
            </div>

            <div className="app-panel app-panel-pad">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Users size={14} className="text-am-orange" />
                {travelers} • {days} days
              </div>
              <p className="mt-2 text-xs leading-5 text-text-muted">{interests.length ? interests.join(' • ') : 'No interests selected yet'}</p>
            </div>

            {plan && (
              <>
                <button
                  type="button"
                  className="button-ghost w-full"
                  onClick={() => {
                    setDisruption((value) => !value)
                    setReplanned(false)
                  }}
                >
                  <AlertTriangle size={14} />
                  {disruption ? 'Clear scenario' : 'Test disruption'}
                </button>

                {disruption && (
                  <button type="button" className="button-soft w-full" onClick={() => setReplanned(true)}>
                    <RefreshCw size={14} />
                    {replanned ? 'Replan applied' : 'Apply Manzilo replan'}
                  </button>
                )}

                <button type="button" className="button-primary w-full" onClick={savePlan}>
                  <Bookmark size={14} />
                  {saved ? 'Saved to My Trips' : 'Save journey'}
                </button>

                <Link to="/trips" className="button-ghost w-full">
                  View My Trips
                  <ArrowRight size={14} />
                </Link>
              </>
            )}
          </aside>
        </div>
      </section>
    </PageTransition>
  )
}
