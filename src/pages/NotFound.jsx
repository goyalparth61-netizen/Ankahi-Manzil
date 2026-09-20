import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="page-section grid min-h-[78svh] place-items-center pt-32">
        <div className="page-shell text-center">
          <Compass size={30} className="mx-auto text-am-gold" />
          <p className="eyebrow mt-6 justify-center">Unmapped route</p>
          <h1 className="display-sm mx-auto mt-5 max-w-[9ch]">
            This path is still
            <span className="block serif-accent">ankahi.</span>
          </h1>
          <p className="lede mx-auto mt-6 max-w-lg">
            The page is not part of the current route map. Head back to discovery and choose another direction.
          </p>
          <Link to="/" className="button-primary mt-8">
            <ArrowLeft size={14} />
            Back home
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
