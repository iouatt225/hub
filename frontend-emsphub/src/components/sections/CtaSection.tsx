import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Sparkles, ArrowRight } from 'lucide-react'

/**
 * Section Call to Action finale de la page d'accueil.
 * Invite l'utilisateur à se lancer sur la plateforme.
 */
export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-background">
      {/* Fond décoratif (motif radial discret) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#f8fafc_0%,transparent_100%)] pointer-events-none" />

      <div className="container-hub relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto p-10 sm:p-16 rounded-[2rem] bg-accent text-white shadow-xl relative overflow-hidden">
          {/* Éclairage interne de la carte CTA */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-highlight/20 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-highlight-light mb-8 backdrop-blur-sm border border-white/20">
            <Sparkles className="h-10 w-10" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Prêt à lancer votre projet pour la <span className="text-highlight">Journée du Numérique</span> ?
          </h2>
          
          <p className="text-lg sm:text-xl text-accent-light leading-relaxed mb-10 max-w-2xl">
            Rejoignez des centaines d'étudiants de l'EMSP. Que vous ayez une idée brillante ou simplement l'envie de collaborer, votre place est sur le Hub.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-base group bg-highlight text-accent hover:bg-highlight-hover" asChild>
              <Link to="/hub/nouvelle-idee">
                Déposer une idée
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-white/30 text-white hover:bg-white/10" asChild>
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
