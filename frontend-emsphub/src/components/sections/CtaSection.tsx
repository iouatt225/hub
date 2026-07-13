import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Sparkles, ArrowRight } from 'lucide-react'

/**
 * Section Call to Action finale de la page d'accueil.
 * Invite l'utilisateur à se lancer sur la plateforme.
 */
export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden border-t border-border bg-background">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 blur-2xl pointer-events-none" />

      <div className="container-hub relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-surface border border-border shadow-card relative overflow-hidden">
          {/* Éclairage interne de la carte */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-[50px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-[50px] pointer-events-none" />

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 text-accent mb-8 shadow-glow">
            <Sparkles className="h-8 w-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            Prêt à lancer votre projet pour la Journée du Numérique ?
          </h2>
          
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl">
            Rejoignez des centaines d'étudiants de l'EMSP. Que vous ayez une idée brillante ou simplement l'envie de collaborer, votre place est sur le Hub.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-base group" asChild>
              <Link to="/hub/nouvelle-idee">
                Déposer une idée
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" asChild>
              <Link to="/hub">
                Explorer les projets
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
