import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Map, MessageCircle } from 'lucide-react'
import { navLinks } from '../data/destinations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-950/85 backdrop-blur-xl border-b border-border-subtle'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container-max mx-auto flex items-center justify-between px-4 lg:px-8 h-18 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Mountain/Path Logo SVG */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 4L28 28H8L18 4Z" fill="url(#mountain-grad)" opacity="0.9" />
              <path d="M12 18L18 8L24 18" stroke="url(#path-grad)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M10 26C14 20 22 20 26 26" stroke="#16C7D9" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
              <defs>
                <linearGradient id="mountain-grad" x1="8" y1="28" x2="28" y2="4">
                  <stop stopColor="#FF6B35" />
                  <stop offset="1" stopColor="#16C7D9" />
                </linearGradient>
                <linearGradient id="path-grad" x1="12" y1="18" x2="24" y2="8">
                  <stop stopColor="#FF8A3D" />
                  <stop offset="1" stopColor="#F6A623" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-lg lg:text-xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            <span className="text-text-primary">Ankahi</span>{' '}
            <span className="gradient-text-warm">Manzil</span>
          </span>
        </Link>

        {/* Center Nav — Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-am-orange rounded-full"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right — CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/plan"
            className="hidden md:inline-flex btn-primary text-sm items-center gap-1.5"
          >
            Start Planning
            <span className="ml-0.5">→</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-navy-950/95 backdrop-blur-xl border-t border-border-subtle overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {/* Primary Navigation */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-am-orange bg-navy-800'
                        : 'text-text-secondary hover:text-text-primary hover:bg-navy-800/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Separator */}
              <div className="h-px bg-border-subtle my-3" />

              {/* Secondary Actions */}
              <NavLink
                to="/trips"
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2.5 ${
                    isActive
                      ? 'text-am-orange bg-navy-800'
                      : 'text-text-secondary hover:text-text-primary hover:bg-navy-800/50'
                  }`
                }
              >
                <Map size={16} />
                My Trips
              </NavLink>
              <NavLink
                to="/manzilo"
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2.5 ${
                    isActive
                      ? 'text-am-cyan bg-navy-800'
                      : 'text-text-secondary hover:text-text-primary hover:bg-navy-800/50'
                  }`
                }
              >
                <MessageCircle size={16} />
                Chat with Manzilo
              </NavLink>

              {/* Primary CTA */}
              <Link
                to="/plan"
                className="btn-primary text-sm text-center mt-4"
              >
                Start Planning →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
