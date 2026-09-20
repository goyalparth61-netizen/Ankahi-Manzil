import Hero from '../components/Hero'
import Stats from '../components/Stats'
import WhyAnkahiManzil from '../components/WhyAnkahiManzil'
import TripPreview from '../components/TripPreview'
import AgentWorkflow from '../components/AgentWorkflow'
import Destinations from '../components/Destinations'
import ManziloPreview from '../components/ManziloPreview'
import CTA from '../components/CTA'
import PageTransition from '../components/layout/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Stats />
      <Destinations />
      <WhyAnkahiManzil />
      <AgentWorkflow compact />
      <TripPreview />
      <ManziloPreview />
      <CTA />
    </PageTransition>
  )
}
