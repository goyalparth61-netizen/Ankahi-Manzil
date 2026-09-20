import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DestinationCard({ destination, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: Math.min(index * 0.07, 0.28), duration: 0.45 }}
      className="h-full"
    >
      <Link
        to={`/destinations/${destination.slug}`}
        className="group relative block h-full overflow-hidden rounded-[var(--card-radius-md)] border border-border-subtle bg-navy-800/50 transition-all duration-300 hover:-translate-y-1 hover:border-border-light focus-visible:border-am-cyan"
        aria-label={`Explore ${destination.name}`}
      >
        <div className="relative aspect-[4/3] min-h-[17rem] overflow-hidden sm:aspect-[16/11]">
          <img
            src={destination.image}
            alt={`${destination.name} travel destination`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-transparent" />
          <div className="absolute inset-0 bg-am-orange/0 transition-colors duration-300 group-hover:bg-am-orange/[0.035]" />

          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-lg border border-white/10 bg-navy-950/65 px-2.5 py-1.5 backdrop-blur-md">
            <Star size={14} className="fill-am-gold text-am-gold" aria-hidden="true" />
            <span className="text-sm font-semibold leading-none text-text-primary">{destination.rating}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-am-orange" aria-hidden="true" />
                <h3 className="truncate font-[family-name:var(--font-heading)] text-xl font-bold leading-tight text-text-primary sm:text-2xl">
                  {destination.name}
                </h3>
              </div>
              <p className="line-clamp-1 text-sm leading-6 text-text-secondary">
                {destination.categories.join(' • ')}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
