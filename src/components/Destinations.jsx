import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import DestinationCard from './DestinationCard'

export default function Destinations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="destinations" className="section-padding relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-am-orange/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-max mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary mb-4"
            >
              <MapPin size={14} className="text-am-orange" />
              POPULAR DESTINATIONS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold"
            >
              Handpicked Destinations{' '}
              <span className="gradient-text-brand">for You</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/destinations"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-am-orange hover:text-am-warm transition-colors group"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
