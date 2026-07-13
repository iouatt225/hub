import { Hero } from '@/components/sections/Hero'
import { StatsBar } from '@/components/sections/StatsBar'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { DemoTabsSection } from '@/components/sections/DemoTabsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { heroData } from '@/lib/fixtures/accueil.mock'

/**
 * Page d'accueil complète — Style inspiré du site EMSP de référence.
 */
export function Accueil() {
  return (
    <>
      <Hero {...heroData} />
      <StatsBar />
      <FeaturesSection />
      <DemoTabsSection />
      <TestimonialsSection />
    </>
  )
}
