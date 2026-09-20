import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle, ArrowRight, Brain, Check, Clock3, Compass,
  IndianRupee, MapPin, Route, Send, Sparkles, WandSparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'
import ManziloLogo from '../components/ManziloLogo'

const modes = [
  { id: 'discover', label: 'Discover', icon: Compass, hint: 'Find a place that fits the feeling.' },
  { id: 'plan', label: 'Build', icon: Route, hint: 'Turn the place into a usable day.' },
  { id: 'adapt', label: 'Adapt', icon: Brain, hint: 'See how the journey responds to change.' },
]

const moods = [
  { id: 'mountains', label: 'Quiet mountains', categories: ['Mountains', 'Nature'] },
  { id: 'culture', label: 'Culture + food', categories: ['Culture', 'Food'] },
  { id: 'coast', label: 'Slow coast', categories: ['Beaches'] },
  { id: 'adventure', label: 'High energy', categories: ['Adventure'] },
]

function buildRoute(destination) {
  const attractions = destination.topAttractions || []
  const things = destination.thingsToDo || []
  return [
    { time: '09:00', title: attractions[0] || 'Local orientation walk', note: 'Low crowd window' },
    { time: '11:30', title: attractions[1] || things[0] || 'Signature local stop', note: 'Short transfer' },
    { time: '14:00', title: things[0] || 'Regional lunch + pause', note: 'Budget friendly' },
    { time: '16:30', title: attractions[2] || things[1] || 'Golden-hour experience', note: 'Flexible slot' },
  ]
}

function modeCopy(mode, destination) {
  if (mode === 'discover') {
    return {
      user: 'I want somewhere that feels different, not a checklist trip.',
      bot: `${destination.name} fits that intent because it combines ${destination.categories.slice(0, 2).join(' and ').toLowerCase()} with enough range for a personal itinerary. I would start here, then tune the pace.`,
      label: 'Why this place',
    }
  }

  if (mode === 'plan') {
    return {
      user: `Build me a balanced day in ${destination.name} without rushing.`,
      bot: 'I grouped the stops by sequence rather than popularity. The plan keeps one flexible slot in the afternoon so the day can absorb traffic, weather or a longer lunch.',
      label: 'Plan logic',
    }
  }

  return {
    user: 'What if the afternoon outdoor stop becomes unavailable?',
    bot: 'I would protect the morning, replace only the affected block, and preserve the same return window. The goal is to change as little as possible while keeping the day meaningful.',
    label: 'Adaptation logic',
  }
}

export default function Features() {
  const [mode, setMode] = useState('discover')
  const [mood, setMood] = useState('mountains')
  const [selectedSlug, setSelectedSlug] = useState('manali')
  const [budget, setBudget] = useState(20000)
  const [applied, setApplied] = useState(false)

  const moodConfig = moods.find((item) => item.id === mood)
  const recommended = useMemo(() => {
    return destinations.find((destination) =>
      moodConfig.categories.some((category) => destination.categories.includes(category))
    ) || destinations[0]
  }, [moodConfig])

  const destination = destinations.find((item) => item.slug === selectedSlug) || recommended
  const route = buildRoute(destination)
  const chat = modeCopy(mode, destination)

  const applyRecommendation = () => {
    setSelectedSlug(recommended.slug)
    setApplied(true)
    window.setTimeout(() => setApplied(false), 1800)
  }

  return (
    <PageTransition>
      <section className="ai-shell">
        <div className="page-shell mb-5 px-0">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="eyebrow mb-4">
                <ManziloLogo className="manzilo-logo manzilo-logo-sm" />
                Manzilo Studio
              </div>
              <h1 className="display-sm max-w-[13ch]">
                Don’t read about the AI.
                <span className="block serif-accent">Use the travel intelligence.</span>
              </h1>
            </div>
            <p className="lede max-w-xl lg:text-right">
              This interactive demo uses the same local destination data and product logic as the rest
              of the frontend. Change the intent and watch the journey surface respond.
            </p>
          </div>
        </div>

        <div className="ai-grid">
          <aside className="ai-pane">
            <div className="ai-pane-header">
              <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-text-muted">Travel mode</p>
            </div>
            <div className="ai-pane-body space-y-1">
              {modes.map(({ id, label, icon: Icon, hint }) => (
                <button
                  key={id}
                  type="button"
                  className="ai-nav-item"
                  data-active={mode === id}
                  onClick={() => setMode(id)}
                >
                  <Icon size={15} />
                  <span>
                    <span className="block">{label}</span>
                    <span className="mt-0.5 block text-[10px] font-medium text-text-muted">{hint}</span>
                  </span>
                </button>
              ))}

              <div className="my-4 rule" />

              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-text-muted">Trip feeling</p>
              <div className="ai-chip-row flex-wrap">
                {moods.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="ai-chip"
                    data-active={mood === item.id}
                    onClick={() => {
                      setMood(item.id)
                      const next = destinations.find((destination) =>
                        item.categories.some((category) => destination.categories.includes(category))
                      )
                      if (next) setSelectedSlug(next.slug)
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="my-4 rule" />

              <label className="field-label" htmlFor="studio-budget">Budget signal</label>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-text-secondary">₹8k</span>
                <strong className="text-am-gold">₹{budget.toLocaleString('en-IN')}</strong>
                <span className="text-text-secondary">₹50k</span>
              </div>
              <input
                id="studio-budget"
                type="range"
                min="8000"
                max="50000"
                step="1000"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="range mt-2"
              />

              <button type="button" onClick={applyRecommendation} className="button-soft mt-4 w-full">
                {applied ? <><Check size={14} /> Recommendation applied</> : <><Sparkles size={14} /> Use Manzilo pick</>}
              </button>
            </div>
          </aside>

          <main className="ai-canvas">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${destination.slug}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: .28 }}
                className="min-h-full"
              >
                <div className="ai-cover">
                  <img src={destination.image} alt={destination.name} />
                  <div className="ai-cover-copy">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-white/60">
                      <MapPin size={11} className="text-am-orange" />
                      {destination.categories.slice(0, 3).join(' • ')}
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h2 className="text-4xl font-semibold tracking-[-.05em] sm:text-5xl">{destination.name}</h2>
                        <p className="mt-1 text-xs text-white/62">{destination.bestTime} • {destination.suggestedDays}</p>
                      </div>
                      <Link to={`/destinations/${destination.slug}`} className="button-ghost">
                        Open destination <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                {mode === 'discover' && (
                  <div className="p-4 sm:p-5">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="surface-soft rounded-xl p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Mood match</p>
                        <p className="mt-2 text-xl font-semibold text-am-cyan">Strong</p>
                        <p className="mt-1 text-xs text-text-secondary">Based on selected travel feeling.</p>
                      </div>
                      <div className="surface-soft rounded-xl p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Budget context</p>
                        <p className="mt-2 text-xl font-semibold text-am-gold">₹{budget.toLocaleString('en-IN')}</p>
                        <p className="mt-1 text-xs text-text-secondary">{destination.budget}</p>
                      </div>
                      <div className="surface-soft rounded-xl p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Suggested rhythm</p>
                        <p className="mt-2 text-xl font-semibold text-am-green">Balanced</p>
                        <p className="mt-1 text-xs text-text-secondary">{destination.suggestedDays} works well.</p>
                      </div>
                    </div>

                    <div className="mt-4 surface-soft rounded-xl p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[.13em] text-text-muted">Manzilo sees</p>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">{destination.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {destination.thingsToDo?.slice(0, 4).map((thing) => (
                          <span key={thing} className="ai-chip">{thing}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(mode === 'plan' || mode === 'adapt') && (
                  <div className="ai-route">
                    <div className="flex items-center justify-between gap-3 px-1">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[.15em] text-text-muted">
                          {mode === 'plan' ? 'Day 01 • generated route' : 'Day 01 • live route'}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold">A day that leaves room to breathe</h3>
                      </div>
                      <span className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] text-text-secondary sm:inline-flex">
                        Demo itinerary
                      </span>
                    </div>

                    {route.map((stop, index) => {
                      const affected = mode === 'adapt' && index === 3
                      return (
                        <div key={stop.time} className="ai-route-row">
                          <span className="pt-0.5 font-mono text-[11px] text-text-muted">{stop.time}</span>
                          <span className="ai-route-dot">
                            {affected ? <AlertTriangle size={11} /> : <Check size={11} />}
                          </span>
                          <div>
                            <p className={`text-sm font-semibold ${affected ? 'text-am-orange line-through opacity-65' : 'text-text-primary'}`}>
                              {stop.title}
                            </p>
                            <p className="mt-1 text-[11px] text-text-muted">{stop.note}</p>
                            {affected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 rounded-lg border border-am-cyan/15 bg-am-cyan/[.055] p-3"
                              >
                                <p className="text-[10px] font-bold uppercase tracking-[.12em] text-am-cyan">Replacement</p>
                                <p className="mt-1 text-xs font-semibold">{destination.nearby?.[0] || 'Local cultural stop'} + café window</p>
                                <p className="mt-1 text-[11px] text-text-secondary">Preserves the same return time and lowers the cost slightly.</p>
                              </motion.div>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-am-green">{affected ? 'Replan ready' : 'Fits'}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <aside className="ai-pane">
            <div className="ai-pane-header flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ManziloLogo className="manzilo-logo manzilo-logo-sm" />
                <div>
                  <p className="text-xs font-extrabold">Manzilo</p>
                  <p className="text-[10px] text-am-green">context active</p>
                </div>
              </div>
            </div>

            <div className="ai-pane-body">
              <div className="space-y-2">
                <div className="ai-message user">{chat.user}</div>
                <motion.div
                  key={chat.bot}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ai-message bot"
                >
                  {chat.bot}
                </motion.div>
              </div>

              <div className="my-4 rule" />

              <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.15em] text-text-muted">{chat.label}</p>
              <div className="space-y-2">
                <div className="ai-status">
                  <Clock3 size={14} className="mt-0.5 text-am-cyan" />
                  <div>
                    <strong>Time-aware sequencing</strong>
                    <p>Stops are arranged as a usable day rather than a popularity ranking.</p>
                  </div>
                </div>
                <div className="ai-status">
                  <IndianRupee size={14} className="mt-0.5 text-am-gold" />
                  <div>
                    <strong>Budget context</strong>
                    <p>The selected ₹{budget.toLocaleString('en-IN')} signal stays visible while choices change.</p>
                  </div>
                </div>
                <div className="ai-status">
                  <Brain size={14} className="mt-0.5 text-am-purple" />
                  <div>
                    <strong>Explainable change</strong>
                    <p>When the demo replans, it shows what changed and what it tried to preserve.</p>
                  </div>
                </div>
              </div>

              <div className="my-4 rule" />

              <Link to="/manzilo" className="button-primary w-full">
                Open full conversation
                <Send size={14} />
              </Link>
              <Link to="/plan" className="button-ghost mt-2 w-full">
                Build this journey
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  )
}
