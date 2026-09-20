import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-max mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80"
              alt="Mountain panorama at sunset"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative px-8 py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-start gap-5 max-w-2xl">
              {/* Compass icon */}
              <motion.div
                animate={inView ? { rotate: [0, 15, -15, 0] } : {}}
                transition={{ delay: 0.5, duration: 2, repeat: Infinity, repeatDelay: 5 }}
                className="w-14 h-14 rounded-xl bg-am-orange/15 flex items-center justify-center shrink-0 border border-am-orange/20"
                style={{ boxShadow: '0 0 30px rgba(255,107,53,0.2)' }}
              >
                <Compass size={24} className="text-am-orange" />
              </motion.div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-3 leading-tight">
                  Ready to explore your next chapter?
                </h2>
                <p className="text-base lg:text-lg text-text-secondary">
                  Let Ankahi Manzil plan it, monitor it, and take you there.
                </p>
              </div>
            </div>

            <Link
              to="/plan"
              className="btn-primary text-base px-8 py-4 flex items-center gap-2 shrink-0"
            >
              Start Planning
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
