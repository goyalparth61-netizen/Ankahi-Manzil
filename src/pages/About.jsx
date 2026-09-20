import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles, Compass, Shield, Bot, ArrowRight,
  Eye, AlertTriangle, Brain, RefreshCw, CalendarDays,
  Target, Globe, CheckCircle2
} from 'lucide-react'
import WhyAnkahiManzil from '../components/WhyAnkahiManzil'
import PageTransition from '../components/layout/PageTransition'

const manziloCapabilities = [
  {
    title: 'Plans',
    icon: CalendarDays,
    color: '#FF6B35',
    desc: 'Synthesizes your travel style, pace, constraints and real-world logistics into a cohesive day-by-day itinerary.',
  },
  {
    title: 'Monitors',
    icon: Eye,
    color: '#18D5B5',
    desc: 'Constantly tracks weather radars, transit timetables, venue operating hours, and localized travel advisories.',
  },
  {
    title: 'Detects',
    icon: AlertTriangle,
    color: '#2697FF',
    desc: 'Spots schedule collisions, road closures, flight delays, and sudden rain before they ruin your afternoon.',
  },
  {
    title: 'Reasons',
    icon: Brain,
    color: '#8B5CF6',
    desc: 'Evaluates hundreds of substitute options against your budget ceiling, transit distance, and personal preferences.',
  },
  {
    title: 'Replans',
    icon: RefreshCw,
    color: '#16C7D9',
    desc: 'Smoothly swaps affected activities and re-optimizes your timeline so your trip stays effortless.',
  },
  {
    title: 'Answers',
    icon: Bot,
    color: '#F6A623',
    desc: 'Provides instant, natural-language answers to any question about your trip, suggestions, or alternatives.',
  },
]

const visionPillars = [
  {
    icon: Shield,
    title: 'Zero-Chaos Journeys',
    desc: 'Travelers should spend their time taking in the views, not frantically searching for alternative flights in a crowded lobby.',
    color: '#16C7D9',
  },
  {
    icon: Target,
    title: 'Continuous Adaptation',
    desc: 'Static PDFs and rigid itineraries are obsolete. Real travel is living and breathing — your plan should be too.',
    color: '#FF6B35',
  },
  {
    icon: Globe,
    title: 'Hyper-Local Authenticity',
    desc: 'Balancing iconic landmarks with quiet, untold corners that give each destination its unmistakable soul.',
    color: '#8B5CF6',
  },
]

export default function About() {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const meaningRef = useRef(null)
  const isMeaningInView = useInView(meaningRef, { once: true, margin: '-60px' })

  const manziloRef = useRef(null)
  const isManziloInView = useInView(manziloRef, { once: true, margin: '-60px' })

  const visionRef = useRef(null)
  const isVisionInView = useInView(visionRef, { once: true, margin: '-60px' })


  return (
    <PageTransition>
      <div className="about-page relative overflow-hidden pb-20 pt-24 lg:pt-28">
        {/* Background glow elements */}
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-am-orange/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-am-blue/5 rounded-full blur-[160px] pointer-events-none" />

        {/* 1. HERO SECTION */}
        <section className="section-padding pt-6 lg:pt-10 pb-16" ref={heroRef}>
          <div className="container-max mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-border-subtle text-xs font-semibold tracking-wider text-text-secondary uppercase mb-6"
            >
              <Sparkles size={14} className="text-am-orange" />
              Our Story & Philosophy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8"
            >
              Some destinations are planned.{' '}
              <span className="gradient-text-warm block sm:inline">Others become stories.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="copy-lg max-w-3xl"
            >
              Ankahi Manzil was created around a simple idea:{' '}
              <strong className="text-text-primary font-semibold">travel plans shouldn’t fall apart when circumstances change.</strong>{' '}
              Instead of generating an itinerary and leaving the traveler to manage everything else,
              Ankahi Manzil continuously helps plan, understand and adapt the journey.
            </motion.p>
          </div>
        </section>

        {/* 2. THE MEANING OF ANKAHI MANZIL */}
        <section className="section-padding py-16 relative" ref={meaningRef}>
          <div className="container-max mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMeaningInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 border border-border-subtle relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-am-orange/10 to-am-cyan/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-am-orange font-mono text-sm tracking-wider uppercase mb-3">
                    <Compass size={16} />
                    Etymology & Identity
                  </div>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                    Why the name{' '}
                    <span className="gradient-text-warm">Ankahi Manzil?</span>
                  </h2>

                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
                    In Urdu and Hindi, <strong className="text-text-primary font-semibold">“Ankahi” (अनकही / ان کہی)</strong> signifies the untold — the spontaneous encounters, the unplanned detours, and the stories yet to be lived.
                  </p>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
                    <strong className="text-text-primary font-semibold">“Manzil” (मंज़िल / منزل)</strong> represents the destination — the summit, the sunset shore, or the sanctuary you set out to find.
                  </p>

                  <div className="p-5 rounded-xl bg-navy-800/80 border-l-4 border-am-orange">
                    <p className="text-base sm:text-lg font-medium text-text-primary italic">
                      “Together, Ankahi Manzil means that every journey contains an untold destination — waiting to be discovered, even when the path shifts.”
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card bg-navy-900/60 p-6 rounded-2xl border border-border-subtle flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-am-orange/15 text-am-orange flex items-center justify-center font-bold text-xl mb-4">
                        अन
                      </div>
                      <h3 className="text-lg font-bold text-text-primary mb-2">Ankahi (अनकही)</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        The stories untold. The serendipity that turns travel into memory.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border-subtle/50 text-xs text-am-orange font-medium flex items-center gap-1.5">
                      <Sparkles size={13} /> Stories yet to be lived
                    </div>
                  </div>

                  <div className="glass-card bg-navy-900/60 p-6 rounded-2xl border border-border-subtle flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-am-cyan/15 text-am-cyan flex items-center justify-center font-bold text-xl mb-4">
                        मं
                      </div>
                      <h3 className="text-lg font-bold text-text-primary mb-2">Manzil (मंज़िल)</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        The destination. The purpose and aspiration behind every departure.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border-subtle/50 text-xs text-am-cyan font-medium flex items-center gap-1.5">
                      <Target size={13} /> Your destination
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. REUSE EXISTING WHY ANKAHI MANZIL (BENEFITS) */}
        <WhyAnkahiManzil />

        {/* 4. MEET MANZILO SECTION */}
        <section className="section-padding py-16 relative" ref={manziloRef}>
          <div className="container-max mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isManziloInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-am-cyan/10 border border-am-cyan/20 text-xs font-semibold tracking-wider text-am-cyan uppercase mb-4">
                <Bot size={14} />
                Cognitive Core
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Meet <span className="gradient-text-cyan">Manzilo</span>
              </h2>
              <p className="text-text-secondary text-base lg:text-lg">
                The intelligence behind every journey. Manzilo doesn't just produce a static text list — it acts as your vigilant, proactive travel orchestrator.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {manziloCapabilities.map((cap, i) => {
                const Icon = cap.icon
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isManziloInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="glass-card glass-card-hover rounded-2xl p-6 border border-border-subtle group hover:-translate-y-1 transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                      style={{
                        background: `${cap.color}15`,
                        boxShadow: `0 0 24px ${cap.color}15`,
                      }}
                    >
                      <Icon size={22} style={{ color: cap.color }} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-text-primary">
                        {cap.title}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-navy-800 text-text-muted">
                        0{i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {cap.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/manzilo"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                Chat with Manzilo Live
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. OUR VISION */}
        <section className="section-padding py-16" ref={visionRef}>
          <div className="container-max mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800 text-xs font-semibold tracking-wider text-text-secondary uppercase mb-4 border border-border-subtle">
                <Target size={14} className="text-am-gold" />
                Guiding Principles
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Our <span className="gradient-text-warm">Vision</span>
              </h2>
              <p className="text-text-secondary text-base lg:text-lg italic">
                “To make travel planning adaptive, intelligent and personal — from the first idea to the journey home.”
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {visionPillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-7 border border-border-subtle flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ background: `${pillar.color}15` }}
                      >
                        <Icon size={22} style={{ color: pillar.color }} />
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-2 text-xs text-text-muted">
                      <CheckCircle2 size={13} className="text-am-green" />
                      Core Operating Principle
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="section-padding py-16">
          <div className="container-max mx-auto">
            <div className="relative glass-card rounded-3xl p-8 sm:p-14 text-center overflow-hidden border border-border-subtle">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-am-orange/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-am-cyan/15 rounded-full blur-3xl pointer-events-none" />

              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 relative z-10">
                Ready to experience an <span className="gradient-text-warm">adaptive journey?</span>
              </h2>
              <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto mb-8 relative z-10">
                Start planning in seconds. Let Manzilo configure dates, budgets, and contingencies so you can travel without second-guessing.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Link to="/plan" className="btn-primary w-full sm:w-auto text-base">
                  Start Planning Your Trip →
                </Link>
                <Link to="/how-it-works" className="btn-secondary w-full sm:w-auto text-base">
                  See Agentic Loop in Action
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
