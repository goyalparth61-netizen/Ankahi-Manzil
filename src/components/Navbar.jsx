import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Map, MessageCircle, UserRound, Sparkles } from 'lucide-react'
import { navLinks } from '../data/destinations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-xl border-b border-border-subtle shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
          : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="page-shell flex h-16 lg:h-[76px] items-center justify-between">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 group" aria-label="Ankahi Manzil home">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18 4L28 28H8L18 4Z" fill="url(#mountain-grad)" opacity="0.9" />
              <path d="M12 18L18 8L24 18" stroke="url(#path-grad)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M10 26C14 20 22 20 26 26" stroke="#16C7D9" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
              <defs>
                <linearGradient id="mountain-grad" x1="8" y1="28" x2="28" y2="4"><stop stopColor="#FF6B35" /><stop offset="1" stopColor="#16C7D9" /></linearGradient>
                <linearGradient id="path-grad" x1="12" y1="18" x2="24" y2="8"><stop stopColor="#FF8A3D" /><stop offset="1" stopColor="#F6A623" /></linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-[family-name:var(--font-heading)] text-lg lg:text-xl font-bold tracking-tight whitespace-nowrap">
            <span className="text-text-primary">Ankahi</span>{' '}
            <span className="gradient-text-warm">Manzil</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-3 xl:gap-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => `relative rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              {({ isActive }) => <>
                {link.label}
                {isActive && <motion.span className="absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-am-orange" layoutId="navIndicator" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
              </>}
            </NavLink>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            to="/manzilo"
            className="hidden xl:inline-flex h-10 items-center gap-2 rounded-full border border-border-subtle bg-navy-800/45 px-3.5 text-sm font-medium text-text-secondary hover:border-am-cyan/25 hover:text-am-cyan"
            aria-label="Chat with Manzilo"
          >
            <Sparkles size={15} />
            Manzilo
          </Link>
          <Link
            to="/profile"
            className="hidden xl:flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-navy-800/45 text-text-secondary hover:border-border-light hover:text-text-primary"
            aria-label="Open traveler profile"
          >
            <UserRound size={17} />
          </Link>
          <Link to="/plan" className="hidden md:inline-flex btn-primary text-sm">Start Planning <span aria-hidden="true">→</span></Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-text-secondary transition-colors hover:border-border-subtle hover:bg-navy-800/70 hover:text-text-primary"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-border-subtle bg-navy-950/96 backdrop-blur-xl"
          >
            <div className="page-shell flex flex-col gap-1 py-5">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} end={link.path === '/'} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-navy-800 text-am-orange' : 'text-text-secondary hover:bg-navy-800/60 hover:text-text-primary'}`}>{link.label}</NavLink>
              ))}
              <div className="my-2 h-px bg-border-subtle" />
              <NavLink to="/trips" className={({ isActive }) => `flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-navy-800 text-am-orange' : 'text-text-secondary hover:bg-navy-800/60 hover:text-text-primary'}`}><Map size={16} /> My Trips</NavLink>
              <NavLink to="/manzilo" className={({ isActive }) => `flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-navy-800 text-am-cyan' : 'text-text-secondary hover:bg-navy-800/60 hover:text-text-primary'}`}><MessageCircle size={16} /> Chat with Manzilo</NavLink>
              <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-navy-800 text-am-orange' : 'text-text-secondary hover:bg-navy-800/60 hover:text-text-primary'}`}><UserRound size={16} /> Traveler Profile</NavLink>
              <Link to="/plan" className="btn-primary mt-3 w-full text-sm">Start Planning <span aria-hidden="true">→</span></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
