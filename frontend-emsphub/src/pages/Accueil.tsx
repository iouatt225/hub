import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { PiliersSection } from '@/components/sections/PiliersSection'
import { DemoTabsSection } from '@/components/sections/DemoTabsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { heroData, trustedByData } from '@/lib/fixtures/accueil.mock'

/**
 * Page d'accueil complète (Blocs 3 à 8).
 * Tous les blocs de la Landing Page sont assemblés.
 */
export function Accueil() {
  return (
    <>
      <Hero {...heroData} />
      <TrustedBy {...trustedByData} />
      <PiliersSection />
      <DemoTabsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
