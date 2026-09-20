import { useEffect, useMemo, useState } from 'react'
import { Check, Compass, Heart, RefreshCw, Route, Sparkles, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { getProfile, updateProfile } from '../services/profileService'
import PageTransition from '../components/layout/PageTransition'

const interestOptions = [
  'Nature',
  'Adventure',
  'Culture',
  'Food',
  'Wellness',
  'Photography',
  'Cafes & Nightlife',
  'Trekking & Hiking',
]

export default function Profile() {
  const [travelStyle, setTravelStyle] = useState('balanced')
  const [budgetPreference, setBudgetPreference] = useState('Comfort')
  const [preferredInterests, setPreferredInterests] = useState(['Nature', 'Culture'])
  const [savedDestinations, setSavedDestinations] = useState(['manali', 'goa', 'jaipur'])
  const [sentinelEnabled, setSentinelEnabled] = useState(true)
  const [source, setSource] = useState('local')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let active = true

    const load = async () => {
      const profile = await getProfile()
      if (!active) return

      setTravelStyle(profile.travelStyle || 'balanced')
      setBudgetPreference(profile.budgetPreference || 'Comfort')
      setPreferredInterests(profile.preferredInterests || [])
      setSavedDestinations(profile.savedDestinations || [])
      setSentinelEnabled(profile.sentinelEnabled !== false)
      setSource(profile.source || 'local')
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const savedPlaces = useMemo(() => {
    const selected = destinations.filter((destination) => savedDestinations.includes(destination.slug))
    return selected.length ? selected : destinations.slice(0, 4)
  }, [savedDestinations])

  const toggleInterest = (interest) => {
    setPreferredInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    )
  }

  const toggleSavedDestination = (slug) => {
    setSavedDestinations((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    )
  }

  const save = async () => {
    setSaving(true)
    const profile = await updateProfile({
      travelStyle,
      preferredInterests,
      budgetPreference,
      savedDestinations,
      sentinelEnabled,
    })
    setSource(profile.source || 'local')
    setSaving(false)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  return (
    <PageTransition>
      <section className="app-shell">
        <header className="app-head">
          <div>
            <div className="eyebrow mb-4">
              <User size={13} className="text-am-orange" />
              Travel preferences
            </div>
            <h1>
              Your travel DNA.
              <span className="block serif-accent">Now connected to the journey engine.</span>
            </h1>
            <p className="lede mt-5 max-w-2xl">
              Preferences are loaded from and saved to the FastAPI profile endpoint when available, with a safe local fallback.
            </p>
          </div>
          <button type="button" className="button-primary self-start" onClick={save} disabled={saving || loading}>
            {saving ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Saving…
              </>
            ) : saved ? (
              <>
                <Check size={14} />
                Saved
              </>
            ) : (
              'Save preferences'
            )}
          </button>
        </header>

        <div className="app-layout">
          <main className="space-y-3">
            <section className="app-panel app-panel-pad">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-am-orange/20 bg-am-orange/10 text-am-orange">
                    <Compass size={20} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.15em] text-text-muted">Preference profile</p>
                    <h2 className="mt-1 text-2xl font-semibold">How should Manzilo shape the trip?</h2>
                  </div>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.13em] ${source === 'backend' ? 'border-am-green/25 bg-am-green/10 text-am-green' : 'border-am-gold/20 bg-am-gold/10 text-am-gold'}`}>
                  {loading ? 'syncing' : source === 'backend' ? 'FastAPI' : 'fallback'}
                </span>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="travelStyle">Travel pace</label>
                  <select id="travelStyle" className="select" value={travelStyle} onChange={(event) => setTravelStyle(event.target.value)}>
                    <option value="slow">Slow & immersive</option>
                    <option value="balanced">Balanced</option>
                    <option value="packed">See more, move more</option>
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="budgetPreference">Budget preference</label>
                  <select id="budgetPreference" className="select" value={budgetPreference || ''} onChange={(event) => setBudgetPreference(event.target.value)}>
                    <option value="Value">Value focused</option>
                    <option value="Comfort">Comfort</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <span className="field-label">Preferred interests</span>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      className="ai-chip"
                      data-active={preferredInterests.includes(interest)}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="app-panel app-panel-pad">
              <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
                <Sparkles size={14} />
                Sentinel preference
              </div>

              <div className="mt-4 flex items-center justify-between gap-5 border-t border-white/8 pt-4">
                <div>
                  <p className="text-sm font-semibold">Enable Sentinel monitoring</p>
                  <p className="mt-1 max-w-xl text-xs leading-5 text-text-muted">
                    Keep disruption monitoring enabled for trips that are persisted in the FastAPI backend.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={sentinelEnabled}
                  onClick={() => setSentinelEnabled((value) => !value)}
                  className={'relative h-7 w-12 shrink-0 rounded-full border transition ' + (sentinelEnabled ? 'border-am-cyan/30 bg-am-cyan/18' : 'border-white/10 bg-white/5')}
                >
                  <span className={'absolute top-1 h-5 w-5 rounded-full bg-white transition-all ' + (sentinelEnabled ? 'left-6' : 'left-1')} />
                </button>
              </div>
            </section>

            <section className="app-panel app-panel-pad">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-am-gold">Saved inspiration</p>
                  <p className="mt-1 text-xs text-text-muted">Click destinations to include or remove them from the backend profile.</p>
                </div>
                <Heart size={15} className="text-am-orange" />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {destinations.slice(0, 8).map((destination) => {
                  const selected = savedDestinations.includes(destination.slug)
                  return (
                    <button
                      key={destination.slug}
                      type="button"
                      onClick={() => toggleSavedDestination(destination.slug)}
                      className={`flex items-center gap-3 rounded-xl border p-2 text-left transition ${selected ? 'border-am-gold/20 bg-am-gold/[.06]' : 'border-white/7 hover:bg-white/[.03]'}`}
                    >
                      <img src={destination.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{destination.name}</p>
                        <p className="truncate text-[10px] text-text-muted">{destination.categories.slice(0, 2).join(' • ')}</p>
                      </div>
                      {selected && <Check size={13} className="text-am-gold" />}
                    </button>
                  )
                })}
              </div>
            </section>
          </main>

          <aside className="app-panel app-panel-pad self-start">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Heart size={14} className="text-am-orange" />
                Current saved places
              </div>
              <Link to="/destinations" className="text-[10px] font-bold text-am-cyan">Explore more</Link>
            </div>
            <div className="mt-4 space-y-2">
              {savedPlaces.slice(0, 5).map((destination) => (
                <Link
                  key={destination.slug}
                  to={'/destinations/' + destination.slug}
                  className="group flex items-center gap-3 rounded-xl border border-white/7 p-2 hover:bg-white/[.03]"
                >
                  <img src={destination.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold group-hover:text-am-gold">{destination.name}</p>
                    <p className="truncate text-[10px] text-text-muted">{destination.categories.slice(0, 2).join(' • ')}</p>
                  </div>
                  <Route size={13} className="text-text-muted" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  )
}
