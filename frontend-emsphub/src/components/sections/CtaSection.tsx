import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

/**
 * Section Call to Action finale (Edge-to-edge).
 */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-accent">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-highlight/10 to-transparent pointer-events-none" />

      <div className="container-hub py-24 sm:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Passez de l'idée <br className="hidden md:block" />
              à <span className="text-highlight">l'incubation</span>.
            </h2>
            <p className="text-lg sm:text-xl text-accent-light leading-relaxed max-w-xl mx-auto md:mx-0">
              Rejoignez des centaines d'étudiants de l'EMSP. Que vous ayez une idée brillante ou simplement l'envie de collaborer, votre place est sur le Hub.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
            <Button size="lg" className="w-full h-16 px-10 text-lg rounded-2xl bg-highlight text-accent-dark hover:bg-highlight-hover hover:-translate-y-1 transition-all shadow-xl hover:shadow-2xl group" asChild>
              <Link to="/hub/nouvelle-idee">
                Soumettre un projet
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full h-16 px-10 text-lg rounded-2xl border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all" asChild>
              <Link to="/hub">
                Explorer les idées
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
