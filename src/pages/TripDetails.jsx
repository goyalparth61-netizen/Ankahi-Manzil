import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, MapPin, IndianRupee, Clock, Bot, ArrowRight,
  ShieldCheck, AlertTriangle, CloudRain, CheckCircle2, ChevronLeft,
  Building2, Landmark, UtensilsCrossed, Mountain, ShoppingBag, Eye,
  RefreshCw, Share2, Download, Check
} from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

const tripDataMap = {
  'manali-2026': {
    title: 'Himalayan High Altitude Escape',
    destination: 'Manali',
    image: '/images/dest-manali.jpg',
    dates: 'Oct 14 – Oct 18, 2026',
    duration: '4 Days, 3 Nights',
    travelers: 'Couple (2 Adults)',
    budgetTotal: 24000,
    budgetSpent: 18450,
    status: 'Active Monitoring',
    breakdown: [
      { category: 'Stay (Boutique Villa)', spent: 9200, cap: 11000 },
      { category: 'Local Cabs & Transfers', spent: 3800, cap: 4500 },
      { category: 'Artisan Dining & Cafes', spent: 3450, cap: 5000 },
      { category: 'Activities & Permits', spent: 2000, cap: 3500 },
    ],
    days: [
      {
        dayNum: 1,
        date: 'Oct 14',
        title: 'Arrival, Pine Forest Stroll & Acclimatization',
        activities: [
          { time: '09:30', title: 'Private Transfer from Bhuntar', desc: 'Pre-verified scenic valley route', cost: 1200, icon: Building2 },
          { time: '12:00', title: 'Check-in at Apple Orchard Villa', desc: 'Early check-in confirmed by Manzilo', cost: 0, icon: Building2 },
          { time: '13:30', title: 'Trout Dining at Old Manali', desc: 'Locally caught fresh river fish specialty', cost: 950, icon: UtensilsCrossed },
          { time: '16:00', title: 'Hadimba Wooden Temple', desc: '16th century pagoda temple in deodar woods', cost: 100, icon: Landmark },
          { time: '19:00', title: 'Mall Road Craft Exploration', desc: 'Himachali woolens & handloom souvenirs', cost: 800, icon: ShoppingBag },
        ],
      },
      {
        dayNum: 2,
        date: 'Oct 15',
        title: 'Solang Valley High Pass & Alpine Meadows',
        activities: [
          { time: '08:00', title: 'Early Departure to Solang', desc: 'Scheduled before peak tourist traffic', cost: 800, icon: Mountain },
          { time: '10:30', title: 'Paragliding & Ropeway', desc: 'Gliding over snow-capped ridges', cost: 2200, icon: Mountain, isVulnerable: true },
          { time: '13:30', title: 'Himalayan Ridge Cafe Lunch', desc: 'Warm thukpa and apple strudel', cost: 650, icon: UtensilsCrossed },
          { time: '16:00', title: 'Jogini Waterfall Trek', desc: 'Gentle 45-min forest trail with valley views', cost: 0, icon: Mountain },
          { time: '20:00', title: 'Bonfire & Acoustic Starlit Dinner', desc: 'Courtyard dinner under cedar trees', cost: 1400, icon: UtensilsCrossed },
        ],
      },
      {
        dayNum: 3,
        date: 'Oct 16',
        title: 'Atal Tunnel & Sissu Cold Desert Gateway',
        activities: [
          { time: '08:30', title: 'Scenic Crossing via Atal Tunnel', desc: 'World’s longest highway tunnel above 10,000 ft', cost: 1200, icon: Mountain },
          { time: '10:30', title: 'Sissu Waterfall & Poplar Groves', desc: 'Lahaul valley crystal water cascade', cost: 0, icon: Mountain },
          { time: '13:30', title: 'Traditional Lahauli Lunch', desc: 'Siddu, local butter tea and dumplings', cost: 500, icon: UtensilsCrossed },
          { time: '17:00', title: 'Return & Relaxing Spa Session', desc: 'Herbal hot stone therapy at cottage', cost: 1800, icon: Building2 },
        ],
      },
    ],
  },
}

export default function TripDetails() {
  const { id } = useParams()
  const trip = tripDataMap[id] || tripDataMap['manali-2026']

  const [activeDay, setActiveDay] = useState(1)
  const [showSentinelDisruption, setShowSentinelDisruption] = useState(false)
  const [replanApplied, setReplanApplied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 3000)
  }

  return (
    <PageTransition>
      <div className="trip-details-page app-page relative">
        <div className="page-shell">
          
          {/* Back Navigation */}
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-am-orange transition-colors mb-6"
          >
            <ChevronLeft size={16} />
            Back to My Trips
          </Link>

          {/* Hero Banner Card */}
          <div className="travel-panel relative overflow-hidden rounded-[1.75rem] mb-8">
            <div className="relative h-[24rem] sm:h-[30rem] w-full overflow-hidden">
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
              
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-navy-900/80 backdrop-blur-md border border-border-subtle text-xs text-text-primary flex items-center gap-1.5 hover:bg-navy-800"
                >
                  {copiedLink ? <Check size={14} className="text-am-green" /> : <Share2 size={14} />}
                  {copiedLink ? 'Link Copied!' : 'Share'}
                </button>
                <Link
                  to="/manzilo"
                  className="px-3.5 py-1.5 rounded-xl bg-am-cyan text-navy-950 text-xs font-bold flex items-center gap-1.5 hover:bg-am-cyan-hover shadow-lg shadow-am-cyan/20"
                >
                  <Bot size={14} />
                  Ask Manzilo
                </Link>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-am-green/20 border border-am-green/40 text-am-green text-xs font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck size={14} />
                    {trip.status}
                  </div>
                  <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white">
                    {trip.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1 flex flex-wrap items-center gap-4">
                    <span><Calendar size={13} className="inline mr-1 text-am-orange" /> {trip.dates}</span>
                    <span><Clock size={13} className="inline mr-1 text-am-cyan" /> {trip.duration}</span>
                    <span><MapPin size={13} className="inline mr-1 text-am-gold" /> {trip.destination}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSentinelDisruption(!showSentinelDisruption)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all self-start md:self-auto ${
                    showSentinelDisruption
                      ? 'bg-am-orange/20 text-am-orange border-am-orange'
                      : 'bg-navy-900/90 text-text-secondary border-border-subtle hover:text-text-primary hover:border-am-orange/40'
                  }`}
                >
                  <AlertTriangle size={14} />
                  {showSentinelDisruption ? 'Active Disruption Simulated' : 'Test Disruption Replanning'}
                </button>
              </div>
            </div>
          </div>

          {/* REAL-TIME SENTINEL MONITOR WIDGET */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="glass-card rounded-2xl p-4 border border-border-subtle">
              <div className="text-xs text-text-secondary flex items-center gap-1.5 mb-1">
                <CloudRain size={14} className="text-am-cyan" /> Weather Sentinel
              </div>
              <div className="text-sm font-bold text-text-primary">17°C • Mostly Sunny</div>
              <div className="text-[11px] text-am-green mt-1">✓ No adverse alerts</div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border-subtle">
              <div className="text-xs text-text-secondary flex items-center gap-1.5 mb-1">
                <Clock size={14} className="text-am-orange" /> Transit Sentinel
              </div>
              <div className="text-sm font-bold text-text-primary">Roads Clear</div>
              <div className="text-[11px] text-am-green mt-1">✓ Rohtang Pass open</div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border-subtle">
              <div className="text-xs text-text-secondary flex items-center gap-1.5 mb-1">
                <Landmark size={14} className="text-am-gold" /> Venue Sentinel
              </div>
              <div className="text-sm font-bold text-text-primary">5 Venues Verified</div>
              <div className="text-[11px] text-am-green mt-1">✓ Standard operating hours</div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border-subtle">
              <div className="text-xs text-text-secondary flex items-center gap-1.5 mb-1">
                <ShieldCheck size={14} className="text-am-green" /> Disruption Index
              </div>
              <div className="text-sm font-bold text-am-green">0.03 (Very Low)</div>
              <div className="text-[11px] text-text-muted mt-1">Adaptive buffers primed</div>
            </div>
          </div>

          {/* SIMULATED DISRUPTION BANNER IF ACTIVE */}
          <AnimatePresence>
            {showSentinelDisruption && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-10 p-6 rounded-2xl bg-am-orange/10 border-2 border-am-orange/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-am-orange/20 text-am-orange flex items-center justify-center shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-am-orange uppercase tracking-wider">
                      Live Disruption Detected: Gusty Winds in Solang Valley
                    </span>
                    <h4 className="text-base font-bold text-text-primary mt-0.5">
                      Paragliding suspended by local aviation authority for Day 2 (10:30)
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      Manzilo identified the Naggar Castle Heritage Walk & Nicholas Roerich Art Gallery as an ideal substitute without schedule drift.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setReplanApplied(!replanApplied)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2 transition-all ${
                    replanApplied
                      ? 'bg-am-green/20 text-am-green border border-am-green/40'
                      : 'bg-am-orange text-white hover:bg-am-orange-hover shadow-lg shadow-am-orange/20'
                  }`}
                >
                  {replanApplied ? (
                    <>
                      <CheckCircle2 size={16} /> Replan Active
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} /> Apply Replan
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Left: Day tabs & activities */}
            <div>
              {/* Day selection tabs */}
              <div className="flex items-center gap-2 border-b border-border-subtle pb-4 mb-6">
                {trip.days.map(d => (
                  <button
                    key={d.dayNum}
                    type="button"
                    onClick={() => setActiveDay(d.dayNum)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeDay === d.dayNum
                        ? 'bg-am-orange text-white shadow-md shadow-am-orange/20'
                        : 'bg-navy-900/60 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Day 0{d.dayNum} ({d.date})
                  </button>
                ))}
              </div>

              {/* Day timeline */}
              {trip.days
                .filter(d => d.dayNum === activeDay)
                .map(d => (
                  <div key={d.dayNum} className="space-y-4">
                    <div className="p-4 rounded-xl bg-navy-900/40 border border-border-subtle mb-4">
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                        {d.title}
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Route sequence optimized for minimal mountain transit times.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {d.activities.map((act, idx) => {
                        const Icon = act.icon
                        const isDisrupted = showSentinelDisruption && act.isVulnerable && !replanApplied
                        const isReplanned = showSentinelDisruption && act.isVulnerable && replanApplied

                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                              isDisrupted
                                ? 'bg-am-orange/10 border-am-orange/40'
                                : isReplanned
                                ? 'bg-am-cyan/10 border-am-cyan/40'
                                : 'bg-navy-900/40 border-border-subtle hover:bg-navy-900/70'
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
                                    {isReplanned ? 'Naggar Castle & Roerich Gallery' : act.title}
                                  </h4>
                                  {isDisrupted && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-am-orange/20 text-am-orange">
                                      High Winds Suspended
                                    </span>
                                  )}
                                  {isReplanned && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-am-cyan/20 text-am-cyan">
                                      Manzilo Substituted
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-text-secondary mt-1">
                                  {isReplanned
                                    ? 'Historical medieval castle & Russian artist gallery unaffected by weather.'
                                    : act.desc}
                                </p>
                              </div>
                            </div>

                            <span className="font-mono text-xs font-bold text-text-primary shrink-0">
                              {act.cost === 0 ? 'Free' : `₹${act.cost}`}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </div>

            {/* Right: Budget breakdown & Quick info */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-border-subtle">
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-text-primary mb-4 flex items-center justify-between">
                  <span>Budget Tracking</span>
                  <span className="font-mono text-am-gold">₹{trip.budgetSpent.toLocaleString()} / ₹{trip.budgetTotal.toLocaleString()}</span>
                </h3>

                <div className="space-y-3">
                  {trip.breakdown.map((item, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex items-center justify-between text-text-secondary mb-1">
                        <span>{item.category}</span>
                        <span className="font-mono font-medium text-text-primary">
                          ₹{item.spent} / ₹{item.cap}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-navy-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-am-cyan rounded-full"
                          style={{ width: `${(item.spent / item.cap) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Unallocated Contingency</span>
                  <span className="font-mono font-bold text-am-green">
                    ₹{(trip.budgetTotal - trip.budgetSpent).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Local Travel Essentials */}
              <div className="glass-card rounded-2xl p-6 border border-border-subtle space-y-3">
                <h4 className="font-bold text-sm text-text-primary">Destination Essentials</h4>
                <ul className="text-xs text-text-secondary space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-am-orange">•</span> Layered woolens & thermal innerwear recommended
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-am-orange">•</span> Green Tax token already logged for Kullu boundary
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-am-orange">•</span> Jio & Airtel 5G active in town; spotty in high passes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
