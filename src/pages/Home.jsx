import Hero from '../components/Hero'
import Stats from '../components/Stats'
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
      <AgentWorkflow compact />
      <Destinations />
      <ManziloPreview />
      <CTA />
    </PageTransition>
  )
}
