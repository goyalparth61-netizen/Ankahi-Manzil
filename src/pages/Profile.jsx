import { useState } from 'react'
import { Check, Compass, Heart, Route, Sparkles, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

export default function Profile() {
  const [autoReplan, setAutoReplan] = useState(true)
  const [weatherAlerts, setWeatherAlerts] = useState(true)
  const [food, setFood] = useState('Local Culinary Explorer')
  const [transit, setTransit] = useState('Scenic Private Cab')
  const [saved, setSaved] = useState(false)

  const save = () => {
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
              <span className="block serif-accent">A quieter way to personalize.</span>
            </h1>
            <p className="lede mt-5 max-w-2xl">
              This is a demo preference workspace. It does not represent an authenticated account or persist to a backend.
            </p>
          </div>
          <button type="button" className="button-primary self-start" onClick={save}>
            {saved ? <><Check size={14} /> Saved</> : 'Save preferences'}
          </button>
        </header>

        <div className="app-layout">
          <main className="space-y-3">
            <section className="app-panel app-panel-pad">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-am-orange/20 bg-am-orange/10 text-am-orange">
                  <Compass size={20} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-text-muted">Demo profile</p>
                  <h2 className="mt-1 text-2xl font-semibold">How should the journey feel?</h2>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="food">Food style</label>
                  <select id="food" className="select" value={food} onChange={(event) => setFood(event.target.value)}>
                    <option>Local Culinary Explorer</option>
                    <option>Pure Vegetarian</option>
                    <option>Vegan & Organic</option>
                    <option>Street Food Connoisseur</option>
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="transit">Preferred transit</label>
                  <select id="transit" className="select" value={transit} onChange={(event) => setTransit(event.target.value)}>
                    <option>Scenic Private Cab</option>
                    <option>Self-Drive SUV</option>
                    <option>Electric & Public Transit</option>
                    <option>Walking & Bicycles</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="app-panel app-panel-pad">
              <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
                <Sparkles size={14} />
                Adaptation preferences
              </div>

              {[
                {
                  label: 'Auto-apply small replans',
                  text: 'Allow minor schedule shifts in the demo without asking every time.',
                  value: autoReplan,
                  set: setAutoReplan,
                },
                {
                  label: 'Show weather scenarios',
                  text: 'Surface the demo disruption flow when an outdoor plan becomes vulnerable.',
                  value: weatherAlerts,
                  set: setWeatherAlerts,
                },
              ].map((item) => (
                <div key={item.label} className="mt-4 flex items-center justify-between gap-5 border-t border-white/8 pt-4">
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="mt-1 max-w-xl text-xs leading-5 text-text-muted">{item.text}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={item.value}
                    onClick={() => item.set(!item.value)}
                    className={'relative h-7 w-12 shrink-0 rounded-full border transition ' + (item.value ? 'border-am-cyan/30 bg-am-cyan/18' : 'border-white/10 bg-white/5')}
                  >
                    <span className={'absolute top-1 h-5 w-5 rounded-full bg-white transition-all ' + (item.value ? 'left-6' : 'left-1')} />
                  </button>
                </div>
              ))}
            </section>
          </main>

          <aside className="app-panel app-panel-pad self-start">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Heart size={14} className="text-am-orange" />
                Saved inspiration
              </div>
              <Link to="/destinations" className="text-[10px] font-bold text-am-cyan">Explore more</Link>
            </div>
            <div className="mt-4 space-y-2">
              {destinations.slice(0, 4).map((destination) => (
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
