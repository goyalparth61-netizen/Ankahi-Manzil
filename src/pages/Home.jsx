import { motion } from 'framer-motion'
import { ArrowRight, Compass, MapPin, Route, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

const featured = destinations.slice(0, 5)

const journeySteps = [
  {
    index: '01',
    title: 'Start with a feeling.',
    text: 'Mountains, quiet coastlines, food, heritage, slow days or high-energy adventure — discovery starts with the kind of trip you want, not a giant list.',
  },
  {
    index: '02',
    title: 'Turn curiosity into a route.',
    text: 'Choose a place and Ankahi Manzil shapes a day-by-day journey around time, interests, pace and budget.',
  },
  {
    index: '03',
    title: 'Keep the plan alive.',
    text: 'Manzilo demonstrates how an itinerary can react when a weather scenario, delay or schedule conflict changes the day.',
  },
]

export default function Home() {
  return (
    <PageTransition>
      <section className="hero-frame">
        <div className="hero-bg">
          <img src="/images/hero-traveler.jpg" alt="Traveler looking over a mountain valley" />
        </div>

        <div className="page-shell hero-content">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55 }}
              className="eyebrow mb-6"
            >
              Travel beyond the obvious
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .08, duration: .72, ease: [0.22, 1, 0.36, 1] }}
              className="display max-w-[11ch]"
            >
              Discover the places
              <span className="block serif-accent">that aren’t on everyone’s list.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2, duration: .55 }}
              className="lede mt-7 max-w-2xl"
            >
              Ankahi Manzil is a travel discovery and adaptive planning experience for people who
              want more than the same itinerary copied from the same guide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3, duration: .5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/destinations" className="button-primary">
                Explore the atlas
                <ArrowRight size={15} />
              </Link>
              <Link to="/features" className="button-ghost">
                <Sparkles size={15} />
                See Manzilo think
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .42, duration: .65 }}
              className="hero-meta"
            >
              <div className="hero-meta-item">
                <strong>Discover</strong>
                <span>Curated Indian destinations by mood and experience.</span>
              </div>
              <div className="hero-meta-item">
                <strong>Plan</strong>
                <span>Shape the route around time, budget and interests.</span>
              </div>
              <div className="hero-meta-item">
                <strong>Adapt</strong>
                <span>See how Manzilo responds when the day changes.</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-note"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .45, duration: .6 }}
          >
            <p className="text-xs uppercase tracking-[.16em] text-white/55">A note for the curious</p>
            <p className="mt-3 max-w-md font-[family-name:var(--font-heading)] text-lg leading-7 text-white/82">
              The best trip usually begins when you stop asking “what is famous?” and start asking
              “what would feel unforgettable to me?”
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <div className="eyebrow mb-4">The atlas</div>
              <h2 className="display-sm max-w-[12ch]">
                A few places to
                <span className="serif-accent"> pull you off-route.</span>
              </h2>
            </div>
            <p className="lede max-w-xl lg:justify-self-end">
              Not every destination gets the same visual weight. Wander through a mix of landscapes,
              moods and reasons to go.
            </p>
          </div>

          <div className="editorial-grid">
            {featured.map((destination, index) => {
              const classes = ['span-7', 'span-5', 'span-4', 'span-4', 'span-4']
              return (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: .55, delay: index * .06 }}
                  className={`editorial-card ${classes[index]}`}
                >
                  <Link to={`/destinations/${destination.slug}`} aria-label={`Explore ${destination.name}`}>
                    <img src={destination.image} alt={destination.name} loading={index < 2 ? 'eager' : 'lazy'} />
                    <div className="editorial-card-copy">
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/62">
                        <MapPin size={11} className="text-am-orange" />
                        {destination.categories.slice(0, 2).join(' • ')}
                      </div>
                      <h3>{destination.name}</h3>
                      <p>{destination.description}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <Link to="/destinations" className="button-ghost">
              View all destinations
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section border-y border-white/8 bg-white/[.018]">
        <div className="page-shell story-split">
          <div className="sticky-story">
            <div className="eyebrow mb-4">How the product feels</div>
            <h2 className="display-sm max-w-[10ch]">
              Exploration first.
              <span className="block serif-accent"> Intelligence underneath.</span>
            </h2>
            <p className="lede mt-6 max-w-lg">
              Ankahi Manzil is designed to feel like wandering through a travel magazine and then
              quietly turning that inspiration into something operational.
            </p>
            <Link to="/how-it-works" className="button-soft mt-7">
              See the journey model
              <ArrowRight size={15} />
            </Link>
          </div>

          <div>
            <div className="story-stage relative mb-6">
              <img src="/images/dest-manali.jpg" alt="Mountain journey in Manali" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07110f] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-am-cyan">
                  <Route size={14} />
                  Manali • adaptive journey demo
                </div>
                <p className="mt-3 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl">
                  A route can be beautiful and still be practical.
                </p>
              </div>
            </div>

            {journeySteps.map((step) => (
              <motion.div
                key={step.index}
                className="story-step"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
              >
                <span className="story-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[1.8rem] border border-white/10 min-h-[34rem]"
          >
            <img src="/images/dest-goa.jpg" alt="Goa coast" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,.98),rgba(7,17,15,.82)_45%,rgba(7,17,15,.24))]" />
            <div className="relative flex min-h-[34rem] max-w-3xl flex-col justify-center p-7 sm:p-10 lg:p-14">
              <div className="eyebrow mb-5">
                <Compass size={13} className="text-am-gold" />
                Make it yours
              </div>
              <h2 className="display-sm max-w-[10ch]">
                Pick a place.
                <span className="block serif-accent">Let the route become personal.</span>
              </h2>
              <p className="lede mt-6 max-w-xl">
                Tell Manzilo how you travel and turn a destination into a plan you can actually use.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/plan" className="button-primary">Build a journey</Link>
                <Link to="/features" className="button-ghost">Open Manzilo Studio</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
