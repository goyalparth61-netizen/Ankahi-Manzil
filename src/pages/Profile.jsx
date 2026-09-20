import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  User, Settings, ShieldCheck, Heart, MapPin, Calendar,
  Bell, Award, CheckCircle2, ChevronRight, Sliders,
  Compass, IndianRupee, Bot
} from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { destinations } from '../data/destinations'

export default function Profile() {
  const [autoReplanMinor, setAutoReplanMinor] = useState(true)
  const [weatherAlerts, setWeatherAlerts] = useState(true)
  const [dietary, setDietary] = useState('Local Culinary Explorer')
  const [transitPref, setTransitPref] = useState('Scenic Private Cab')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const bucketList = destinations.slice(0, 4)

  return (
    <PageTransition>
      <div className="profile-page app-page relative">
        <div className="page-shell max-w-6xl">
          
          {/* Traveler Header Card */}
          <div className="travel-panel rounded-[1.75rem] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80"
                  alt="User Avatar"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-am-orange"
                />
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-am-green border-2 border-navy-950 text-white" title="Sentinel Active">
                  <ShieldCheck size={14} />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-am-orange/15 text-am-orange border border-am-orange/30 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Pro Traveler
                </div>
                <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-text-primary">
                  Devansh Verma
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary">
                  devansh.verma@example.com • Member since 2024
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2 self-start sm:self-auto"
            >
              {savedSuccess ? 'Preferences Saved!' : 'Save Changes'}
            </button>
          </div>

          {/* Traveler Performance Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Days on Road</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-cyan">
                14 Days
              </div>
              <div className="text-[11px] text-text-muted mt-1">4 states explored</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Disruptions Handled</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-orange">
                5 Fixed
              </div>
              <div className="text-[11px] text-text-muted mt-1">0 missed activities</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Budget Optimized</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-green">
                ₹11,400
              </div>
              <div className="text-[11px] text-text-muted mt-1">Below target caps</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-border-subtle">
              <div className="text-xs text-text-secondary mb-1">Schedule Fidelity</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-am-purple">
                98.6%
              </div>
              <div className="text-[11px] text-text-muted mt-1">Minimal drift</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
            
            {/* Left: Preferences & Agent Settings */}
            <div className="space-y-6">
              
              {/* Agent Automation Settings */}
              <div className="glass-card rounded-2xl p-6 border border-border-subtle space-y-5">
                <div className="flex items-center gap-2 text-am-cyan font-bold text-sm">
                  <Bot size={18} />
                  Manzilo Autonomous Sentinel Permissions
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900/60 border border-border-subtle/70">
                    <div>
                      <div className="text-sm font-semibold text-text-primary">
                        Auto-Apply Minor Replans
                      </div>
                      <div className="text-xs text-text-secondary">
                        Automatically adjust schedule if disruption delay is under 30 minutes
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={autoReplanMinor}
                      aria-label="Auto-apply minor replans"
                      onClick={() => setAutoReplanMinor(!autoReplanMinor)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        autoReplanMinor ? 'bg-am-orange' : 'bg-navy-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                        autoReplanMinor ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900/60 border border-border-subtle/70">
                    <div>
                      <div className="text-sm font-semibold text-text-primary">
                        Predictive Weather Radar Alerts
                      </div>
                      <div className="text-xs text-text-secondary">
                        Receive proactive alternative routes when precipitation probability exceeds 60%
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={weatherAlerts}
                      aria-label="Predictive weather radar alerts"
                      onClick={() => setWeatherAlerts(!weatherAlerts)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        weatherAlerts ? 'bg-am-cyan' : 'bg-navy-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                        weatherAlerts ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Travel Preferences Form */}
              <div className="glass-card rounded-2xl p-6 border border-border-subtle space-y-5">
                <div className="flex items-center gap-2 text-am-orange font-bold text-sm">
                  <Sliders size={18} />
                  Travel DNA & Preferences
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      Culinary Style
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full bg-navy-900 border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary"
                    >
                      <option>Local Culinary Explorer</option>
                      <option>Pure Vegetarian</option>
                      <option>Vegan & Organic</option>
                      <option>Street Food Connoisseur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      Preferred Transit
                    </label>
                    <select
                      value={transitPref}
                      onChange={(e) => setTransitPref(e.target.value)}
                      className="w-full bg-navy-900 border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary"
                    >
                      <option>Scenic Private Cab</option>
                      <option>Self-Drive SUV</option>
                      <option>Electric & Public Transit</option>
                      <option>Walking & Bicycles</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bucket List Destinations */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-border-subtle">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-text-primary flex items-center gap-2">
                    <Heart size={16} className="text-am-orange" />
                    Saved Destinations
                  </h3>
                  <Link to="/destinations" className="text-xs text-am-cyan hover:underline">
                    Explore all →
                  </Link>
                </div>

                <div className="space-y-3">
                  {bucketList.map(item => (
                    <Link
                      key={item.slug}
                      to={`/destinations/${item.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-navy-900/60 transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-text-primary group-hover:text-am-orange transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-text-secondary truncate">
                          {item.bestTime} • {item.budget}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-text-muted group-hover:text-text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
