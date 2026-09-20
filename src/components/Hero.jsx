import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, MapPin, Route, ShieldCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="hero-shell relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-am-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-am-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-am-blue/3 rounded-full blur-[150px]" />
      </div>

      <div className="page-shell pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-700/60 border border-border-subtle text-xs font-medium text-text-secondary mb-8"
            >
              <Sparkles size={14} className="text-am-gold" />
              <span>Adaptive journeys • hidden stories • smarter detours</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-text-primary">Find the journey</span>
              <br />
              <span className="gradient-text-warm">no guidebook can script.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg lg:text-xl text-text-secondary/80 font-light italic mb-4 tracking-wide"
            >
              Ankahi Manzil — where the obvious route ends, your story begins.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl mb-10"
            >
              Discover meaningful Indian escapes, shape a trip around your pace and budget,
              and let Manzilo adapt the plan when weather, timing or travel conditions change.
              Less itinerary stress. More room for the unexpected.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/plan" className="btn-primary text-base flex items-center gap-2 px-7 py-3.5">
                <span>Start Planning</span>
                <span>→</span>
              </Link>
              <Link
                to="/how-it-works"
                className="btn-secondary text-base flex items-center gap-2 px-7 py-3.5"
              >
                <ArrowRight size={16} className="text-am-orange" />
                <span>Explore How It Works</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — Cinematic Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
            className="relative hero-visual"
          >
            {/* Main image container */}
            <div className="hero-image-frame relative rounded-[2rem] overflow-hidden group">
              {/* Glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-am-orange/20 via-am-blue/10 to-am-cyan/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

              <div className="relative rounded-3xl overflow-hidden border border-border-subtle">
                <img
                  src="/images/hero-traveler.jpg"
                  alt="Solo traveler overlooking mountains at sunrise"
                  className="w-full h-[430px] sm:h-[520px] lg:h-[620px] object-cover transition-transform duration-[2s] group-hover:scale-105"
                  loading="eager"
                />
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 to-transparent" />
              </div>
            </div>

            {/* Airplane route SVG */}
            <svg
              className="absolute -top-4 -left-8 w-40 h-32 pointer-events-none"
              viewBox="0 0 160 128"
              fill="none"
            >
              <motion.path
                d="M10 100 C 40 60, 80 20, 140 30"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 2, ease: 'easeInOut' }}
              />
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <text x="130" y="26" fill="rgba(255,255,255,0.5)" fontSize="16" transform="rotate(-15, 130, 26)">✈</text>
              </motion.g>
            </svg>

            <motion.div
              initial={{ opacity: 0, x: -14, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.05, duration: 0.55 }}
              className="hero-float-card absolute left-3 top-8 sm:-left-7 sm:top-16 rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-am-orange/15 text-am-orange">
                  <MapPin size={17} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">Discovery mode</p>
                  <p className="text-sm font-semibold text-text-primary">Beyond the obvious</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 14, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.55 }}
              className="hero-float-card absolute -right-2 top-[38%] hidden rounded-2xl px-4 py-3 sm:block lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-am-cyan/15 text-am-cyan">
                  <Route size={17} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">Adaptive route</p>
                  <p className="text-sm font-semibold text-text-primary">Plans that can move</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.55 }}
              className="hero-float-card absolute bottom-5 left-4 rounded-2xl px-4 py-3 sm:bottom-8 sm:left-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-am-green/15 text-am-green">
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">Manzilo</p>
                  <p className="text-sm font-semibold text-text-primary">Ready for detours</p>
                </div>
              </div>
            </motion.div>

            {/* Floating handwritten text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute -bottom-2 -right-2 lg:bottom-8 lg:-right-6 bg-navy-950/70 backdrop-blur-sm border border-border-subtle rounded-2xl px-5 py-4"
            >
              <p className="text-xs lg:text-sm text-text-secondary/70 italic leading-relaxed font-light">
                New Places<br />
                New Stories<br />
                <span className="text-am-gold/80">Same You</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
