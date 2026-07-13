import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/constants/brand'
import { Sparkles, ArrowRight } from 'lucide-react'

/**
 * Hero compact — Version réduite du Hero pour la page d'accueil feed social.
 * Conserve l'identité visuelle (image de fond, overlay, CTA) mais en plus compact.
 */
export function HeroCompact() {
  return (
    <section className="relative py-16 sm:py-24 flex items-center overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
        }}
      />
      {/* Overlay sombre avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/80 to-[#1a1a2e]/60" />
      {/* Dégradé de transition vers le fond de la page */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />

      <div className="container-hub relative z-10">
        <div className="max-w-2xl">
          {/* Badge événement */}
          <div className="mb-4 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-highlight" />
              {BRAND.event}
            </span>
          </div>

          {/* Titre */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-[1.1] animate-slide-up"
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            {BRAND.baseline.split('Journée')[0]}
            <span className="text-highlight">Journée du Numérique</span>
          </h1>

          {/* Sous-titre */}
          <p
            className="text-sm sm:text-base text-white/60 mb-6 leading-relaxed max-w-xl animate-slide-up"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            Découvrez les projets innovants des étudiants, votez pour vos favoris et rejoignez des équipes.
          </p>

          {/* CTA */}
          <div
            className="flex flex-wrap gap-3 animate-slide-up"
            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
          >
            <Button
              size="lg"
              className="h-11 px-6 text-sm rounded-xl bg-highlight text-accent-dark hover:bg-highlight-hover font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              asChild
            >
              <Link to="/hub/nouvelle-idee">
                Déposer une idée
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6 text-sm rounded-xl border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold transition-all"
              asChild
            >
              <Link to="/hub">Explorer le Hub</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
