import { Compass, UsersRound, Mail } from 'lucide-react'
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
    title: 'Team CiPher',
    links: [
      ['Our story', '/about'],
      ['Project history', '/history'],
      ['Meet the team', '/team'],
      ['Contact us', '/contact'],
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
              A travel discovery and adaptive planning experience by Team CiPher—built around finding meaningful places and keeping journeys useful when plans change.
            </p>
            <div className="mt-5 flex gap-2">
              <Link to="/team" className="button-ghost" aria-label="Meet Team CiPher">
                <UsersRound size={14} />
                Team
              </Link>
              <Link to="/contact" className="button-ghost" aria-label="Contact Team CiPher">
                <Mail size={14} />
                Contact
              </Link>
            </div>
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
          <span>© 2026 Ankahi Manzil • Team CiPher</span>
          <span>Frontend demo • local data • mock service layer</span>
        </div>
      </div>
    </footer>
  )
}
