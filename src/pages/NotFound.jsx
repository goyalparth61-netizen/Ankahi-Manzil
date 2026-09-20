import { Link } from 'react-router-dom'
import { Compass, ArrowLeft, MapPin } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="relative flex min-h-[78vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-am-orange/5 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-am-cyan/5 blur-[100px]" />
        </div>
        <div className="page-shell relative py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-am-orange/20 bg-am-orange/10 text-am-orange">
            <Compass size={30} />
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-am-cyan">Route not found</p>
          <h1 className="mx-auto mb-5 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold sm:text-5xl lg:text-6xl">
            This path is still <span className="gradient-text-warm">ankahi.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-text-secondary">
            The page you are looking for is not on the current map. Head back home or explore a destination that is ready for your next story.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary"><ArrowLeft size={16} />Back Home</Link>
            <Link to="/destinations" className="btn-secondary"><MapPin size={16} />Explore Destinations</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
