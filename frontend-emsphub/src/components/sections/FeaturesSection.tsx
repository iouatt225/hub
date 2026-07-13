import { LayoutDashboard, Award, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const featuresData = [
  {
    id: 'dashboard',
    title: 'Dashboard Dynamique',
    description:
      "Suivez l'évolution de vos projets en temps réel. Visualisez les votes, les nouvelles candidatures pour rejoindre votre équipe, et les statistiques de la plateforme via un tableau de bord personnel intuitif.",
    icon: LayoutDashboard,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'gamification',
    title: 'Système de Points & Gamification',
    description:
      "Chaque action compte ! Soumettez des idées, votez, commentez et rejoignez des équipes pour gagner des points d'innovation. Débloquez des badges exclusifs et montez dans le classement de l'EMSP.",
    icon: Award,
    color: 'bg-accent-light text-accent',
  },
  {
    id: 'filtering',
    title: 'Filtrage Avancé & Tags',
    description:
      "Trouvez exactement ce que vous cherchez. Filtrez les projets par filière (Télécoms, Management, etc.), par état d'avancement, ou par technologies clés. Ne perdez plus de temps pour trouver votre prochaine équipe.",
    icon: Filter,
    color: 'bg-highlight-light text-highlight-hover',
  },
]

/**
 * Section Fonctionnalités avancées.
 * Présente les outils du Hub avec un layout ultra-épuré clair.
 */
export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28 bg-background border-t border-border overflow-hidden">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            Des outils taillés pour l'<span className="text-accent">innovation</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Le Hub n'est pas qu'un simple forum. C'est une plateforme complète
            pour vous accompagner jusqu'à la Journée du Numérique.
          </p>
        </div>

        <div className="flex flex-col gap-12 sm:gap-16 max-w-5xl mx-auto">
          {featuresData.map((feature, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={feature.id}
                className={cn(
                  'flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 sm:p-12 rounded-3xl bg-surface border border-border shadow-sm hover:shadow-card-hover transition-all duration-300',
                  !isEven && 'md:flex-row-reverse'
                )}
              >
                {/* Icône Géante (Illustration épurée) */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className={cn("w-32 h-32 sm:w-48 sm:h-48 rounded-full flex items-center justify-center", feature.color)}>
                    <feature.icon className="w-16 h-16 sm:w-24 sm:h-24" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Texte */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
