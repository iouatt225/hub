import { Hero } from '@/components/sections/Hero'
import { DemoTabsSection } from '@/components/sections/DemoTabsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { heroData } from '@/lib/fixtures/accueil.mock'

/**
 * Page d'accueil complète (Refonte Nouveau Style).
 */
export function Accueil() {
  return (
    <>
      <Hero {...heroData} />
      <FeaturesSection />
      <DemoTabsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
