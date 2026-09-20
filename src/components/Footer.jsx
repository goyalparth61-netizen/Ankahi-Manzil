import { Link } from 'react-router-dom'

const footerLinks = {
  Explore: [
    { label: 'Destinations', to: '/destinations' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Features', to: '/features' },
  ],
  Platform: [
    { label: 'Trip Planner', to: '/plan' },
    { label: 'My Trips', to: '/trips' },
    { label: 'Manzilo', to: '/manzilo' },
  ],
  Support: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/about' },
    { label: 'Privacy', to: '/about' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-navy-950">
      <div className="container-max mx-auto px-4 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 4L28 28H8L18 4Z" fill="url(#ft-mountain)" opacity="0.9" />
                <path d="M12 18L18 8L24 18" stroke="url(#ft-path)" strokeWidth="2" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="ft-mountain" x1="8" y1="28" x2="28" y2="4">
                    <stop stopColor="#FF6B35" />
                    <stop offset="1" stopColor="#16C7D9" />
                  </linearGradient>
                  <linearGradient id="ft-path" x1="12" y1="18" x2="24" y2="8">
                    <stop stopColor="#FF8A3D" />
                    <stop offset="1" stopColor="#F6A623" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-lg font-bold font-[family-name:var(--font-heading)]">
                <span className="text-text-primary">Ankahi</span>{' '}
                <span className="gradient-text-warm">Manzil</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs italic">
              "Every journey has an untold destination."
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text-primary mb-4 font-[family-name:var(--font-heading)]">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="container-max mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © 2026 Ankahi Manzil. All rights reserved.
          </p>
          <p className="text-xs text-text-muted italic">
            With Manzilo, every journey finds its way.
          </p>
        </div>
      </div>
    </footer>
  )
}
