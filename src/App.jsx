import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plan" element={<PlaceholderPage title="Trip Planner" />} />
      <Route path="/destinations" element={<PlaceholderPage title="Destinations" />} />
      <Route path="/destinations/:slug" element={<PlaceholderPage title="Destination Details" />} />
      <Route path="/manzilo" element={<PlaceholderPage title="Chat with Manzilo" />} />
      <Route path="/trips" element={<PlaceholderPage title="My Trips" />} />
      <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
    </Routes>
  )
}

function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-4">{title}</h1>
        <p className="text-text-secondary mb-8">This page is coming soon.</p>
        <a href="/" className="btn-primary inline-block">← Back to Home</a>
      </div>
    </div>
  )
}

export default App
