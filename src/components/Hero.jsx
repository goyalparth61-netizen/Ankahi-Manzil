import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Compass, MapPin, Route, ShieldCheck, Sparkles
} from 'lucide-react'

const insightCards = [
  { icon: MapPin, label: 'Hidden-first discovery', value: 'Places worth the detour', tone: 'text-am-orange bg-am-orange/10' },
  { icon: Route, label: 'Adaptive planning', value: 'Plans that can move', tone: 'text-am-cyan bg-am-cyan/10' },
  { icon: ShieldCheck, label: 'Manzilo sentinel', value: 'Ready for disruption', tone: 'text-am-green bg-am-green/10' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-traveler.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-35"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,17,26,.98)_0%,rgba(3,17,26,.9)_38%,rgba(3,17,26,.42)_72%,rgba(3,17,26,.78)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,17,26,.32)_0%,rgba(3,17,26,.06)_55%,rgba(3,17,26,1)_100%)]" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-[7%] top-[18%] h-64 w-64 rounded-full border border-white/5"
          animate={{ scale: [1, 1.06, 1], opacity: [.3, .55, .3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[8%] top-[22%] h-28 w-28 rounded-full border border-am-cyan/15"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="page-shell relative z-10 grid min-h-[100svh] items-center gap-10 pb-14 pt-28 lg:grid-cols-[1.06fr_.94fr] lg:pb-16 lg:pt-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55 }}
            className="kicker mb-6"
          >
            <Sparkles size={14} className="text-am-gold" />
            Discover the India between the postcards
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .08, duration: .7, ease: [0.22, 1, 0.36, 1] }}
            className="display-title max-w-[12ch]"
          >
            Find places
            <span className="block gradient-text-warm">worth getting lost for.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2, duration: .6 }}
            className="copy-lg mt-7 max-w-2xl"
          >
            Ankahi Manzil turns curiosity into a living journey — discover meaningful destinations,
            shape a trip around your pace and budget, and let Manzilo adapt when the road changes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .3, duration: .55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/destinations" className="btn-primary">
              <Compass size={17} />
              Explore destinations
            </Link>
            <Link to="/plan" className="btn-secondary">
              Plan with Manzilo
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .45, duration: .7 }}
            className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            {insightCards.map(({ icon: Icon, label, value, tone }) => (
              <div key={label} className="rounded-2xl border border-white/7 bg-navy-950/55 p-4 backdrop-blur-xl">
                <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-xl ${tone}`}>
                  <Icon size={15} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-text-muted">{label}</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 34, scale: .97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: .18, duration: .8, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden h-[68vh] min-h-[540px] lg:block"
        >
          <div className="absolute inset-y-0 right-0 w-[76%] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,.42)]">
            <img
              src="/images/dest-manali.jpg"
              alt="Snow-covered Manali mountains"
              className="h-full w-full object-cover transition-transform duration-[1800ms] hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/88 via-transparent to-navy-950/10" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-am-cyan">Featured escape</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">Manali</h2>
                  <p className="mt-1 text-sm text-white/65">Mountains • Adventure • Nature</p>
                </div>
                <Link
                  to="/destinations/manali"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 backdrop-blur-md hover:bg-white/10"
                  aria-label="Explore Manali"
                >
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 w-[42%] overflow-hidden rounded-[1.5rem] border border-white/10 bg-navy-950 shadow-[0_26px_70px_rgba(0,0,0,.4)]">
            <img src="/images/dest-goa.jpg" alt="Goa coastline" className="h-52 w-full object-cover" />
            <div className="p-4">
              <p className="text-[10px] uppercase tracking-[.14em] text-text-muted">For the slow days</p>
              <p className="mt-1 font-semibold">Goa, beyond the party map</p>
            </div>
          </div>

          <div className="absolute left-[12%] top-10 rounded-2xl border border-white/10 bg-navy-950/78 px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-am-orange/12 text-am-orange">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[.14em] text-text-muted">Discovery signal</p>
                <p className="text-sm font-semibold">Less obvious. More memorable.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
