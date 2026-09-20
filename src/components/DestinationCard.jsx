import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DestinationCard({ destination, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/destinations/${destination.slug}`}
        className="group block relative rounded-2xl overflow-hidden border border-border-subtle hover:border-border-light transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80`
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
          {/* Hover glow */}
          <div className="absolute inset-0 bg-am-orange/0 group-hover:bg-am-orange/5 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={14} className="text-am-orange" />
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary group-hover:translate-x-1 transition-transform duration-300">
                  {destination.name}
                </h3>
              </div>
              <p className="text-sm text-text-secondary">
                {destination.categories.join(' • ')}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-navy-700/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-border-subtle">
              <Star size={13} className="text-am-gold fill-am-gold" />
              <span className="text-sm font-semibold text-text-primary">{destination.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
