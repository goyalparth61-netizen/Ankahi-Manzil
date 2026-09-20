import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, Star, Leaf } from 'lucide-react'

const iconMap = { MapPin, Users, Star, Leaf }

const statsData = [
  { icon: 'MapPin', value: 50, suffix: '+', label: 'Destinations', color: '#FF6B35' },
  { icon: 'Users', value: 10, suffix: 'K+', label: 'Happy Travelers', color: '#16C7D9' },
  { icon: 'Star', value: 4.9, suffix: '/5', label: 'Avg. Journey Rating', color: '#F6A623', decimal: true },
  { icon: 'Leaf', value: 2.5, suffix: 'K+', label: 'CO₂ Saved (Est.)', color: '#7DDC48', decimal: true },
]

function AnimatedNumber({ value, suffix, decimal, inView }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const end = value
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased
      setDisplay(decimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, value, decimal])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-12 lg:py-16">
      <div className="container-max mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl px-6 py-8 lg:px-12 lg:py-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {statsData.map((stat, i) => {
              const Icon = iconMap[stat.icon]
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`flex flex-col items-center text-center ${
                    i < statsData.length - 1
                      ? 'lg:border-r lg:border-border-subtle'
                      : ''
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `${stat.color}15`,
                      boxShadow: `0 0 20px ${stat.color}20`,
                    }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div
                    className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] mb-1"
                    style={{ color: stat.color }}
                  >
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      decimal={stat.decimal}
                      inView={inView}
                    />
                  </div>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
