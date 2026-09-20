import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-am-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-am-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-am-blue/3 rounded-full blur-[150px]" />
      </div>

      <div className="container-max mx-auto px-4 lg:px-8 pt-24 lg:pt-32 pb-12 lg:pb-20">
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
              <span>AI Travel Operating System</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-text-primary">Ankahi</span>
              <br />
              <span className="gradient-text-warm">Manzil</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg lg:text-xl text-text-secondary/80 font-light italic mb-4 tracking-wide"
            >
              Your journey. Always in motion.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl mb-10"
            >
              More than just an itinerary, Ankahi Manzil is your AI travel
              companion that plans, monitors and adapts your journey in
              real-time — so you can focus on experiencing the unknown.
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
                <span>See How It Works</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — Cinematic Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
            className="relative"
          >
            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden group">
              {/* Glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-am-orange/20 via-am-blue/10 to-am-cyan/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

              <div className="relative rounded-3xl overflow-hidden border border-border-subtle">
                <img
                  src="/images/hero-traveler.jpg"
                  alt="Solo traveler overlooking mountains at sunrise"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover transition-transform duration-[2s] group-hover:scale-105"
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
