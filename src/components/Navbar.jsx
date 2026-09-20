import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Sparkles, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const links = [
  { to: '/destinations', label: 'Explore' },
  { to: '/features', label: 'Manzilo AI' },
  { to: '/history', label: 'History' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
            <motion.span
              className="brand-mark"
              whileHover={{ rotate: -8, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <BrandLogo className="h-full w-full object-cover" />
            </motion.span>
            <span className="brand-word">Ankahi <span>Manzil</span></span>
          </Link>

          <div className="nav-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link motion-underline ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <Link to="/trips" className="button-ghost">
              My Trips
            </Link>
            <Link to="/plan" className="button-primary">
              <Sparkles size={14} />
              Start a journey
            </Link>
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
            initial={{ opacity: 0, y: -12, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: .98 }}
            transition={{ duration: .22 }}
            className="fixed inset-x-3 top-[5.3rem] z-[79] rounded-[1.2rem] border border-white/10 bg-[#091612]/96 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * .035 }}
              >
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-white/7 text-white' : 'text-text-secondary'}`}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <div className="my-2 h-px bg-white/8" />
            <Link to="/plan" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-am-gold">Plan a journey</Link>
            <Link to="/trips" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-text-secondary">My Trips</Link>
            <Link to="/profile" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-text-secondary">Travel preferences</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
