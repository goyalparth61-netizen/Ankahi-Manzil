import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import AgentWorkflow from '../components/AgentWorkflow'
import Destinations from '../components/Destinations'
import ManziloPreview from '../components/ManziloPreview'
import AgentFeatures from '../components/AgentFeatures'
import TripPreview from '../components/TripPreview'
import WhyAnkahiManzil from '../components/WhyAnkahiManzil'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AgentWorkflow />
        <Destinations />
        <ManziloPreview />
        <AgentFeatures />
        <TripPreview />
        <WhyAnkahiManzil />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
