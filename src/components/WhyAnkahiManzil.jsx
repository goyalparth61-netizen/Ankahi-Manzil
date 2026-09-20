import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Zap, MapPin, IndianRupee, CloudRain, MessageCircle } from 'lucide-react'
import { benefits } from '../data/destinations'

const iconMap = { Brain, Zap, MapPin, IndianRupee, CloudRain, MessageCircle }

export default function WhyAnkahiManzil() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-am-teal/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-max mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why{' '}
            <span className="text-text-primary">Ankahi</span>{' '}
            <span className="gradient-text-warm">Manzil</span>
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-xl mx-auto">
            Built for the journeys that matter most.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon]
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card glass-card-hover rounded-xl p-6 transition-all duration-500 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${benefit.color}12`,
                      boxShadow: `0 0 20px ${benefit.color}10`,
                    }}
                  >
                    <Icon size={20} style={{ color: benefit.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-text-primary mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
