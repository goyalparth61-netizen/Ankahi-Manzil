import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, MapPin, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allCategories, destinations } from '../data/destinations'
import PageTransition from '../components/layout/PageTransition'

const spans = ['span-7', 'span-5', 'span-4', 'span-8', 'span-4', 'span-5', 'span-7', 'span-4', 'span-4', 'span-4', 'span-7', 'span-5']

export default function Destinations() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    return destinations.filter((destination) => {
      const textMatch =
        !search ||
        destination.name.toLowerCase().includes(search) ||
        destination.description.toLowerCase().includes(search) ||
        destination.categories.some((item) => item.toLowerCase().includes(search))
      const categoryMatch = category === 'All' || destination.categories.includes(category)
      return textMatch && categoryMatch
    })
  }, [query, category])

  return (
    <PageTransition>
      <section className="page-section pt-32 lg:pt-40">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="eyebrow mb-5">
                <Compass size={13} className="text-am-orange" />
                Explore India by feeling
              </div>
              <h1 className="display-sm max-w-[12ch]">
                The atlas is not a list.
                <span className="block serif-accent">It is an invitation.</span>
              </h1>
              <p className="lede mt-6 max-w-2xl">
                Search a place, an experience, or simply a mood. The layout shifts emphasis instead of
                pretending every destination matters equally.
              </p>
            </div>

            <div className="surface rounded-art p-4 sm:p-5">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  className="input pl-10"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search mountains, culture, Goa…"
                  aria-label="Search destinations"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-text-muted">
                <SlidersHorizontal size={12} />
                Travel mood
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {allCategories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="ai-chip"
                    data-active={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="my-10 flex flex-wrap items-center justify-between gap-4 border-y border-white/8 py-4">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-white">{filtered.length}</span> places in view
            </p>
            {(query || category !== 'All') && (
              <button
                type="button"
                className="text-xs font-bold text-am-orange"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
              >
                Reset discovery
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="editorial-grid">
              {filtered.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: .5, delay: Math.min(index * .035, .24) }}
                  className={'editorial-card ' + spans[index % spans.length]}
                >
                  <Link to={'/destinations/' + destination.slug}>
                    <img src={destination.image} alt={destination.name} loading="lazy" />
                    <div className="absolute left-4 top-4 z-[2] rounded-full border border-white/12 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white/78 backdrop-blur-md">
                      {destination.suggestedDays}
                    </div>
                    <div className="editorial-card-copy">
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-white/62">
                        <MapPin size={11} className="text-am-orange" />
                        {destination.categories.slice(0, 3).join(' • ')}
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h2 className="text-3xl font-semibold tracking-[-.045em]">{destination.name}</h2>
                          <p>{destination.description}</p>
                        </div>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/16 bg-white/6">
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="surface rounded-art px-6 py-20 text-center">
              <Sparkles size={24} className="mx-auto text-am-gold" />
              <h2 className="mt-5 text-2xl font-semibold">Nothing fits that exact search.</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
                Broaden the mood or clear the filters. Discovery works better when the brief leaves room for surprise.
              </p>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link to="/features" className="button-soft">
              Let Manzilo choose for me
              <Sparkles size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
