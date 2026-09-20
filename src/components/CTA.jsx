import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Compass, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .65 }}
          className="relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-white/8 shadow-[0_36px_100px_rgba(0,0,0,.32)]"
        >
          <img
            src="/images/dest-goa.jpg"
            alt="Coastal travel landscape"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,17,26,.98)_0%,rgba(3,17,26,.9)_42%,rgba(3,17,26,.32)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

          <div className="relative flex min-h-[32rem] max-w-3xl flex-col justify-center p-7 sm:p-10 lg:p-14">
            <div className="kicker mb-5">
              <Sparkles size={14} className="text-am-gold" />
              Your next story starts before the booking
            </div>
            <h2 className="section-title max-w-[11ch]">
              Don’t just pick a place.
              <span className="block gradient-text-warm">Build the journey around it.</span>
            </h2>
            <p className="copy-lg mt-6 max-w-xl">
              Choose a destination, set your pace and budget, and see how Ankahi Manzil turns a travel idea into an adaptive itinerary.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/plan" className="btn-primary">
                <Compass size={16} />
                Start planning
              </Link>
              <Link to="/destinations" className="btn-secondary">
                Browse the atlas
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
