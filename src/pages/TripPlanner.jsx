import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles, Calendar, MapPin, IndianRupee, Compass, Clock,
  Users, Bot, ArrowRight, CheckCircle2, AlertTriangle, CloudRain,
  Share2, Bookmark, RefreshCw, ChevronRight, ShieldCheck,
  Building2, Landmark, UtensilsCrossed, Mountain, ShoppingBag, Eye
} from 'lucide-react'
import { destinations } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

const travelStyles = [
  { id: 'relaxed', label: 'Relaxed & Leisure', desc: 'Fewer stops, more time to soak in atmosphere' },
  { id: 'balanced', label: 'Balanced Explorer', desc: 'Mix of iconic landmarks and local leisure' },
  { id: 'adventurous', label: 'High Energy & Active', desc: 'Packed days, treks, sports, sunrise starts' },
]

const interestOptions = [
  'Heritage & Forts', 'Scenic Nature', 'Local Street Food', 'Fine Dining',
  'Water Sports', 'Trekking & Hiking', 'Cafes & Nightlife', 'Spas & Wellness',
  'Art & Handlooms', 'Photography'
]

const travelPaces = ['Slow & Immersive', 'Moderate', 'Fast & Comprehensive']

export default function TripPlanner() {
  const [selectedDestination, setSelectedDestination] = useState('Manali')
  const [days, setDays] = useState(4)
  const [budget, setBudget] = useState(20000)
  const [travelers, setTravelers] = useState('Couple')
  const [selectedStyle, setSelectedStyle] = useState('balanced')
  const [selectedInterests, setSelectedInterests] = useState(['Scenic Nature', 'Cafes & Nightlife', 'Trekking & Hiking'])

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [generatedTrip, setGeneratedTrip] = useState(null)
  const [activeDay, setActiveDay] = useState(1)
  const [simulatedDisruption, setSimulatedDisruption] = useState(false)
  const [replanApplied, setReplanApplied] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const itineraryRef = useRef(null)

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleGeneratePlan = () => {
    setIsGenerating(true)
    setGenerationStep(0)
    setSimulatedDisruption(false)
    setReplanApplied(false)

    // Simulate multi-agent steps
    const stepInterval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev >= 3) {
          clearInterval(stepInterval)
          setIsGenerating(false)
          // Build generated trip object
          const tripData = buildSampleTrip(selectedDestination, days, budget, selectedInterests)
          setGeneratedTrip(tripData)
          setTimeout(() => {
            itineraryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 150)
          return 3
        }
        return prev + 1
      })
    }, 700)
  }

  const buildSampleTrip = (destName, numDays, totalBudget, interests) => {
    const dest = destinations.find(d => d.name.toLowerCase() === destName.toLowerCase()) || destinations[1]
    
    // Sample day schedule generator
    const daysData = []
    for (let d = 1; d <= numDays; d++) {
      let activities = []
      if (d === 1) {
        activities = [
          { time: '09:00', title: 'Arrival & Hotel Check-in', desc: 'Unpack, refresh and brief route orientation', icon: Building2, cost: 0, tag: 'Logistics' },
          { time: '11:30', title: dest.topAttractions[0] || 'Historical Landmark', desc: 'Guided tour and architecture walkthrough', icon: Landmark, cost: 350, tag: 'Culture' },
          { time: '13:30', title: 'Authentic Regional Lunch', desc: 'Recommended local dining spot away from tourist crowds', icon: UtensilsCrossed, cost: 850, tag: 'Food' },
          { time: '15:30', title: dest.topAttractions[1] || 'Scenic Viewpoint', desc: 'Panoramic mountain/valley views and short trek', icon: Mountain, cost: 1200, tag: 'Adventure', isVulnerable: true },
          { time: '19:00', title: 'Local Market & Night Promenade', desc: 'Handicrafts, cafe hopping and evening stroll', icon: ShoppingBag, cost: 600, tag: 'Leisure' },
        ]
      } else if (d === 2) {
        activities = [
          { time: '08:30', title: 'Sunrise Exploration & Breakfast', desc: 'Scenic morning walk with specialty mountain brew', icon: UtensilsCrossed, cost: 450, tag: 'Food' },
          { time: '10:30', title: dest.thingsToDo[0] || 'Trek & Outdoor Activity', desc: 'Curated outdoor route optimized for lowest foot traffic', icon: Mountain, cost: 1800, tag: 'Adventure' },
          { time: '14:00', title: 'Riverside Garden Lunch', desc: 'Fresh farm-to-table lunch overlooking nature', icon: UtensilsCrossed, cost: 950, tag: 'Food' },
          { time: '16:30', title: dest.topAttractions[2] || 'Heritage Sanctuary', desc: 'Tranquil cultural visit with local storyteller', icon: Landmark, cost: 400, tag: 'Culture' },
          { time: '20:00', title: 'Starlit Rooftop Dinner', desc: 'Live acoustic music and artisan cuisine', icon: UtensilsCrossed, cost: 1500, tag: 'Dining' },
        ]
      } else {
        activities = [
          { time: '09:30', title: 'Hidden Valley Excursion', desc: 'Off-the-beaten path scenic hamlet tour', icon: Mountain, cost: 1200, tag: 'Nature' },
          { time: '13:00', title: 'Local Bistro Experience', desc: 'Signature regional recipes and artisanal tea', icon: UtensilsCrossed, cost: 700, tag: 'Food' },
          { time: '15:30', title: dest.thingsToDo[1] || 'Craft Workshop & Souvenirs', desc: 'Interactive workshop with master artisans', icon: ShoppingBag, cost: 800, tag: 'Craft' },
          { time: '18:30', title: 'Sunset Golden Hour Watch', desc: 'Prime sunset coordinates identified by Manzilo', icon: Eye, cost: 0, tag: 'Scenic' },
        ]
      }

      daysData.push({
        dayNumber: d,
        title: d === 1 ? 'Arrival & Key Landmarks' : d === 2 ? 'Immersive Adventures & Heritage' : `Local Gems & Hidden Escapes Day ${d}`,
        activities,
        dayBudget: activities.reduce((acc, a) => acc + a.cost, 0) + 2500, // including estimated stay
      })
    }

    const totalPlanned = daysData.reduce((acc, d) => acc + d.dayBudget, 0)

    return {
      id: `trip-${Date.now()}`,
      destination: dest.name,
      slug: dest.slug,
      image: dest.image,
      days: numDays,
      totalBudget,
      plannedCost: totalPlanned,
      savings: Math.max(0, totalBudget - totalPlanned),
      breakdown: {
        stay: Math.round(totalPlanned * 0.45),
        transport: Math.round(totalPlanned * 0.20),
        food: Math.round(totalPlanned * 0.20),
        activities: Math.round(totalPlanned * 0.15),
      },
      status: 'Active Monitoring',
      daysData,
    }
  }

  const handleSaveTrip = () => {
    if (!generatedTrip) return
    const existing = JSON.parse(localStorage.getItem('am_saved_trips') || '[]')
    // check if already saved
    const updated = [generatedTrip, ...existing.filter(t => t.id !== generatedTrip.id)]
    localStorage.setItem('am_saved_trips', JSON.stringify(updated))
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 4000)
  }

  const agentSteps = [
    { title: 'Analyzing Constraints', desc: 'Factoring dates, budget ceiling, travel party & pace' },
    { title: 'Geospatial Route Optimization', desc: 'Clustering nearby venues to eliminate backtracking' },
    { title: 'Predictive Sentinel Check', desc: 'Scanning weather radars & historical operating hours' },
    { title: 'Compiling Adaptive Itinerary', desc: 'Configuring contingencies and buffer times' },
  ]

  return (
    <PageTransition>
      <div className="pt-24 lg:pt-28 pb-24 relative">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/4 w-[600px] h-[500px] bg-am-orange/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-am-cyan/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-max mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-am-orange/10 border border-am-orange/20 text-xs font-semibold tracking-wider text-am-orange uppercase mb-4">
              <Bot size={14} />
              Agentic Itinerary Architect
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Design Your <span className="gradient-text-warm">Adaptive Journey</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg">
              Set your parameters and let Manzilo configure a precision day-by-day itinerary with automated disruption safeguards.
            </p>
          </div>

          {/* PLANNER CONFIGURATION CARD */}
          <div className="glass-card rounded-2xl lg:rounded-3xl p-6 sm:p-10 border border-border-subtle max-w-5xl mx-auto mb-16 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              
              {/* Left Column: Core Parameters */}
              <div className="space-y-6">
                {/* 1. Destination */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5 flex items-center gap-2">
                    <MapPin size={14} className="text-am-orange" />
                    Where to? (Destination)
                  </label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full bg-navy-900 border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-am-orange transition-colors"
                  >
                    {destinations.map(d => (
                      <option key={d.slug} value={d.name} className="bg-navy-900">
                        {d.name} — {d.categories.join(', ')} ({d.budget})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Duration & Travelers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5 flex items-center gap-1.5">
                      <Calendar size={14} className="text-am-cyan" />
                      Duration (Days)
                    </label>
                    <div className="flex items-center gap-2">
                      {[3, 4, 5, 7].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setDays(num)}
                          className={`flex-1 py-2.5 text-xs font-semibold rounded-lg border transition-all ${
                            days === num
                              ? 'bg-am-orange text-white border-am-orange shadow-lg shadow-am-orange/20'
                              : 'bg-navy-900/80 text-text-secondary border-border-subtle hover:text-text-primary'
                          }`}
                        >
                          {num}D
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5 flex items-center gap-1.5">
                      <Users size={14} className="text-am-gold" />
                      Travelers
                    </label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full bg-navy-900 border border-border-subtle rounded-xl px-3 py-2.5 text-text-primary text-xs sm:text-sm focus:outline-none focus:border-am-gold"
                    >
                      <option value="Solo">Solo Traveler</option>
                      <option value="Couple">Couple / Pair</option>
                      <option value="Friends">Friends (3-5)</option>
                      <option value="Family">Family with Kids</option>
                    </select>
                  </div>
                </div>

                {/* 3. Budget Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                      <IndianRupee size={14} className="text-am-green" />
                      Total Trip Budget
                    </label>
                    <span className="font-mono text-sm font-bold text-am-gold">
                      ₹{budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8000}
                    max={60000}
                    step={1000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-am-orange"
                  />
                  <div className="flex justify-between text-[11px] text-text-muted mt-1.5">
                    <span>₹8,000 (Backpacker)</span>
                    <span>₹25,000 (Comfort)</span>
                    <span>₹60,000+ (Luxury)</span>
                  </div>
                </div>

                {/* 4. Travel Style */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5 flex items-center gap-1.5">
                    <Compass size={14} className="text-am-purple" />
                    Trip Pace & Atmosphere
                  </label>
                  <div className="space-y-2">
                    {travelStyles.map(st => (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStyle(st.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedStyle === st.id
                            ? 'bg-navy-800 border-am-orange/60 shadow-md'
                            : 'bg-navy-900/40 border-border-subtle hover:border-border-subtle/80'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold text-text-primary">{st.label}</div>
                          <div className="text-xs text-text-secondary">{st.desc}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedStyle === st.id ? 'border-am-orange bg-am-orange' : 'border-border-subtle'
                        }`}>
                          {selectedStyle === st.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interests & Prompt */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-am-teal" />
                    Focus Interests (Choose any)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map(interest => {
                      const active = selectedInterests.includes(interest)
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            active
                              ? 'bg-am-cyan/15 text-am-cyan border-am-cyan/40 shadow-sm shadow-am-cyan/10'
                              : 'bg-navy-900/60 text-text-secondary border-border-subtle hover:text-text-primary'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {interest}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Agentic intelligence banner */}
                <div className="p-4 rounded-2xl bg-navy-900/80 border border-am-blue/20">
                  <div className="flex items-center gap-2 text-am-cyan text-xs font-bold uppercase tracking-wider mb-1.5">
                    <ShieldCheck size={16} />
                    Built-in Agentic Guarantees
                  </div>
                  <ul className="text-xs text-text-secondary space-y-1.5">
                    <li className="flex items-center gap-1.5">
                      <span className="text-am-green">✓</span> Dynamic route sequencing saves 40% in transit delays
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-am-green">✓</span> Continuous weather & operational status monitoring
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-am-green">✓</span> 1-click alternative replacement when disruptions strike
                    </li>
                  </ul>
                </div>

                {/* Primary Generate Button */}
                <button
                  type="button"
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="w-full py-4 rounded-xl btn-primary font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-am-orange/20 hover:shadow-am-orange/30 transition-all cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Synthesizing Agentic Plan...
                    </>
                  ) : (
                    <>
                      Generate Adaptive Itinerary
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* GENERATION IN PROGRESS MODAL / OVERLAY */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 pt-8 border-t border-border-subtle overflow-hidden"
                >
                  <div className="max-w-xl mx-auto space-y-4">
                    <div className="flex items-center justify-between text-xs text-text-secondary font-mono">
                      <span>MANZILO REASONING ENGINE</span>
                      <span>STEP {generationStep + 1} OF 4</span>
                    </div>

                    <div className="space-y-3">
                      {agentSteps.map((step, idx) => {
                        const isDone = idx < generationStep
                        const isCurrent = idx === generationStep
                        return (
                          <div
                            key={step.title}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-all ${
                              isCurrent
                                ? 'bg-navy-800 border-am-orange text-text-primary'
                                : isDone
                                ? 'bg-navy-900/80 border-am-green/40 text-text-secondary'
                                : 'bg-navy-900/30 border-border-subtle text-text-muted'
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                              {isDone ? (
                                <CheckCircle2 size={16} className="text-am-green" />
                              ) : isCurrent ? (
                                <RefreshCw size={16} className="text-am-orange animate-spin" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-border-subtle" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-xs">{step.title}</div>
                              <div className="text-[11px] text-text-muted">{step.desc}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GENERATED ITINERARY VIEW */}
          {generatedTrip && (
            <div ref={itineraryRef} className="space-y-10 scroll-mt-24">
              
              {/* Trip Overview Bar */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-am-green/15 text-am-green border border-am-green/30">
                      {generatedTrip.status}
                    </span>
                    <span className="text-xs text-text-secondary font-mono">
                      Trip ID: #{generatedTrip.id.slice(-6)}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-text-primary">
                    {generatedTrip.destination} Expedition — {generatedTrip.days} Days
                  </h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Customized for {travelers} • {selectedStyle.toUpperCase()} Pace
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setSimulatedDisruption(!simulatedDisruption)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                      simulatedDisruption
                        ? 'bg-am-orange/20 text-am-orange border-am-orange'
                        : 'bg-navy-800 text-text-secondary border-border-subtle hover:text-text-primary hover:border-am-orange/40'
                    }`}
                  >
                    <AlertTriangle size={14} className={simulatedDisruption ? 'text-am-orange' : ''} />
                    {simulatedDisruption ? 'Disruption Active' : 'Simulate Disruption'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveTrip}
                    className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5"
                  >
                    <Bookmark size={14} />
                    {savedSuccess ? 'Saved to My Trips!' : 'Save Trip'}
                  </button>

                  <Link
                    to="/manzilo"
                    className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5"
                  >
                    <Bot size={14} />
                    Ask Manzilo
                  </Link>
                </div>
              </div>

              {/* BUDGET INTELLIGENCE WIDGET */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass-card rounded-xl p-4 border border-border-subtle">
                  <div className="text-xs text-text-secondary mb-1 flex items-center gap-1">
                    <IndianRupee size={12} className="text-am-gold" /> Total Budget
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                    ₹{generatedTrip.totalBudget.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 border border-border-subtle">
                  <div className="text-xs text-text-secondary mb-1 flex items-center gap-1">
                    <Clock size={12} className="text-am-cyan" /> Planned Expenses
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] text-am-cyan">
                    ₹{generatedTrip.plannedCost.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 border border-border-subtle">
                  <div className="text-xs text-text-secondary mb-1 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-am-green" /> Contingency Buffer
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] text-am-green">
                    ₹{generatedTrip.savings.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 border border-border-subtle">
                  <div className="text-xs text-text-secondary mb-1 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-am-purple" /> Cost Optimization
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                    94.2% Optimal
                  </div>
                </div>
              </div>

              {/* DISRUPTION ALERT BANNER IF TRIGGERED */}
              <AnimatePresence>
                {simulatedDisruption && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-5 sm:p-6 rounded-2xl bg-am-orange/10 border-2 border-am-orange/30 relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-am-orange/20 text-am-orange flex items-center justify-center shrink-0">
                          <CloudRain size={22} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-am-orange uppercase tracking-wider">
                            Real-Time Sentinel Alert: Weather Disruption
                          </div>
                          <h4 className="text-base font-bold text-text-primary mt-0.5">
                            Sudden Heavy Rainfall forecasted at 15:30 near outdoor activity
                          </h4>
                          <p className="text-xs text-text-secondary mt-1">
                            Manzilo evaluated 4 indoor alternatives within 3.2km to preserve your afternoon schedule.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setReplanApplied(true)}
                        disabled={replanApplied}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-2 transition-all ${
                          replanApplied
                            ? 'bg-am-green/20 text-am-green border border-am-green/40'
                            : 'bg-am-orange text-white hover:bg-am-orange-hover shadow-lg shadow-am-orange/25'
                        }`}
                      >
                        {replanApplied ? (
                          <>
                            <CheckCircle2 size={16} />
                            Plan Re-Optimized!
                          </>
                        ) : (
                          <>
                            <RefreshCw size={16} />
                            Apply Manzilo Replan
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* DAY TABS & TIMELINE */}
              <div className="glass-card rounded-2xl lg:rounded-3xl p-6 sm:p-8 border border-border-subtle">
                {/* Day selector tabs */}
                <div className="flex items-center gap-2 border-b border-border-subtle pb-4 mb-8 overflow-x-auto">
                  {generatedTrip.daysData.map(d => (
                    <button
                      key={d.dayNumber}
                      type="button"
                      onClick={() => setActiveDay(d.dayNumber)}
                      className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                        activeDay === d.dayNumber
                          ? 'bg-am-orange text-white shadow-md shadow-am-orange/20'
                          : 'bg-navy-900/60 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Day 0{d.dayNumber}
                    </button>
                  ))}
                </div>

                {/* Active Day Activities Timeline */}
                {generatedTrip.daysData
                  .filter(d => d.dayNumber === activeDay)
                  .map(d => (
                    <div key={d.dayNumber}>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-text-primary">
                            {d.title}
                          </h3>
                          <span className="text-xs text-text-secondary font-mono">
                            Estimated Day Cost: ₹{d.dayBudget.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-xs text-am-teal font-semibold">
                          5 Activities Planned
                        </span>
                      </div>

                      <div className="space-y-4">
                        {d.activities.map((act, idx) => {
                          const Icon = act.icon
                          const isDisrupted = simulatedDisruption && act.isVulnerable && !replanApplied
                          const isReplanned = simulatedDisruption && act.isVulnerable && replanApplied

                          return (
                            <div
                              key={idx}
                              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                isDisrupted
                                  ? 'bg-am-orange/10 border-am-orange/40'
                                  : isReplanned
                                  ? 'bg-am-cyan/10 border-am-cyan/40'
                                  : 'bg-navy-900/50 border-border-subtle hover:bg-navy-900/80'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <span className={`font-mono text-xs sm:text-sm font-bold w-14 shrink-0 pt-0.5 ${
                                  isDisrupted ? 'text-am-orange line-through' : 'text-am-cyan'
                                }`}>
                                  {act.time}
                                </span>

                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                  isDisrupted
                                    ? 'bg-am-orange/20 text-am-orange'
                                    : isReplanned
                                    ? 'bg-am-cyan/20 text-am-cyan'
                                    : 'bg-navy-800 text-text-secondary'
                                }`}>
                                  <Icon size={18} />
                                </div>

                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className={`text-sm sm:text-base font-bold ${
                                      isDisrupted ? 'text-am-orange line-through' : 'text-text-primary'
                                    }`}>
                                      {isReplanned ? 'Himalayan Cultural Centre & Indoor Cafe' : act.title}
                                    </h4>
                                    {isDisrupted && (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-am-orange/20 text-am-orange">
                                        Weather Impact
                                      </span>
                                    )}
                                    {isReplanned && (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-am-cyan/20 text-am-cyan">
                                        Manzilo Replaced
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-text-secondary mt-1">
                                    {isReplanned
                                      ? 'Indoor sanctuary & artisan cafe safely replacing outdoor activity during rain window.'
                                      : act.desc}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-3 pl-18 sm:pl-0 border-t sm:border-t-0 border-border-subtle/50 pt-2 sm:pt-0">
                                <span className="px-2.5 py-1 rounded-md bg-navy-800 text-text-secondary text-[11px] font-medium">
                                  {act.tag}
                                </span>
                                <span className="font-mono text-xs font-bold text-text-primary">
                                  {act.cost === 0 ? 'Free' : `₹${act.cost}`}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
