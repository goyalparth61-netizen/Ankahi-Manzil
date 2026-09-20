import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Features from './pages/Features'
import Destinations from './pages/Destinations'
import DestinationDetails from './pages/DestinationDetails'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import TripPlanner from './pages/TripPlanner'
import MyTrips from './pages/MyTrips'
import TripDetails from './pages/TripDetails'
import ManziloChat from './pages/ManziloChat'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<DestinationDetails />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/plan" element={<TripPlanner />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/manzilo" element={<ManziloChat />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
