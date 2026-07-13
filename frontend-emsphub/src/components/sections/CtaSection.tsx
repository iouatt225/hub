import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

/**
 * Section Call to Action finale — Design épuré sur fond blanc avec une bordure nette.
 */
export function CtaSection() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container-hub">
        <div className="relative overflow-hidden rounded-3xl bg-text-primary p-12 sm:p-16 lg:p-20">
          {/* Décorations de fond */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-highlight/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Texte */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Passez de l'idée <br className="hidden lg:block" />
                à <span className="text-highlight">l'incubation</span>.
              </h2>
              <p className="text-lg text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Rejoignez des centaines d'étudiants de l'EMSP. Que vous ayez une idée brillante ou simplement l'envie de collaborer, votre place est sur le Hub.
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <Button size="lg" className="h-14 px-8 text-base rounded-xl bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group" asChild>
                <Link to="/hub/nouvelle-idee">
                  Soumettre un projet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all" asChild>
                <Link to="/hub">
                  Explorer les idées
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
