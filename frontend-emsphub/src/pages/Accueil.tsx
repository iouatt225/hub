import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { heroData, trustedByData } from '@/lib/fixtures/accueil.mock'

/**
 * Page d'accueil complète (Bloc 3).
 * Les composants Piliers, DemoTabs, etc. seront ajoutés par la suite (Blocs 4-8).
 */
export function Accueil() {
  return (
    <>
      <Hero {...heroData} />
      <TrustedBy {...trustedByData} />

      {/* Placeholders pour les prochains blocs de la page d'accueil */}
      <div className="py-20 text-center text-sm text-text-muted border-b border-border">
        En attente du Bloc 4 (Les 4 Piliers)
      </div>
    </>
  )
}
