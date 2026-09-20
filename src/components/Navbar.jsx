import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Compass, Menu, Sparkles, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/destinations', label: 'Explore' },
  { to: '/features', label: 'Manzilo AI' },
  { to: '/plan', label: 'Plan' },
  { to: '/trips', label: 'My Trips' },
  { to: '/about', label: 'Story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <nav className="nav-shell" aria-label="Primary navigation">
        <motion.div
          className="nav-bar"
          data-scrolled={scrolled}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="brand" aria-label="Ankahi Manzil home">
            <span className="brand-mark"><Compass size={17} /></span>
            <span className="brand-word">Ankahi <span>Manzil</span></span>
          </Link>

          <div className="nav-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <Link to="/features" className="button-ghost">
              <Sparkles size={14} />
              Meet Manzilo
            </Link>
            <Link to="/plan" className="button-primary">Start a journey</Link>
            <button
              type="button"
              className="nav-menu button-ghost"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-3 top-[5.3rem] z-[79] rounded-[1.2rem] border border-white/10 bg-[#091612]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-white/7 text-white' : 'text-text-secondary'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/profile" className="mt-1 block rounded-xl px-4 py-3 text-sm font-bold text-text-secondary">
              Travel preferences
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
