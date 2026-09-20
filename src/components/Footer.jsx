import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

const groups = [
  {
    title: 'Explore',
    links: [
      ['Destinations', '/destinations'],
      ['Manzilo AI', '/features'],
      ['How it works', '/how-it-works'],
    ],
  },
  {
    title: 'Journey',
    links: [
      ['Plan a trip', '/plan'],
      ['My trips', '/trips'],
      ['Travel preferences', '/profile'],
    ],
  },
  {
    title: 'Ankahi',
    links: [
      ['Our story', '/about'],
      ['Home', '/'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand mb-5 inline-flex">
              <span className="brand-mark"><Compass size={17} /></span>
              <span className="brand-word">Ankahi Manzil</span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-text-secondary">
              A travel discovery and adaptive planning concept for finding places that feel personal,
              then keeping the journey useful when plans change.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map(([label, to]) => (
                <Link key={to} to={to}>{label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-note">
          <span>© 2026 Ankahi Manzil</span>
          <span>Frontend demo • local data • mock service layer</span>
        </div>
      </div>
    </footer>
  )
}
