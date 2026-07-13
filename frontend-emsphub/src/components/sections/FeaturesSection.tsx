import { LayoutDashboard, Award, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const featuresData = [
  {
    id: 'dashboard',
    title: 'Dashboard Dynamique',
    description:
      "Suivez l'évolution de vos projets en temps réel. Visualisez les votes, les nouvelles candidatures pour rejoindre votre équipe, et les statistiques de la plateforme via un tableau de bord personnel intuitif.",
    icon: LayoutDashboard,
    mockImage: (
      <div className="w-full h-full min-h-[250px] rounded-xl bg-surface border border-border flex flex-col p-4 shadow-inner relative overflow-hidden">
        {/* Mockup Dashboard */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 h-20 bg-background border border-border rounded-lg p-3">
            <div className="w-1/2 h-3 bg-text-secondary/30 rounded mb-2" />
            <div className="w-1/3 h-6 bg-accent/80 rounded" />
          </div>
          <div className="flex-1 h-20 bg-background border border-border rounded-lg p-3">
            <div className="w-1/2 h-3 bg-text-secondary/30 rounded mb-2" />
            <div className="w-1/3 h-6 bg-success/80 rounded" />
          </div>
        </div>
        <div className="flex-1 bg-background border border-border rounded-lg p-4">
          <div className="w-1/4 h-4 bg-text-primary/50 rounded mb-4" />
          {/* Chart lines */}
          <div className="flex items-end gap-2 h-20">
            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-accent/40 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'gamification',
    title: 'Système de Points & Gamification',
    description:
      "Chaque action compte ! Soumettez des idées, votez, commentez et rejoignez des équipes pour gagner des points d'innovation. Débloquez des badges exclusifs et montez dans le classement de l'EMSP.",
    icon: Award,
    mockImage: (
      <div className="w-full h-full min-h-[250px] rounded-xl bg-surface border border-border flex items-center justify-center p-6 shadow-inner relative overflow-hidden">
        {/* Mockup Badges */}
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-20" />
          <div className="absolute inset-2 bg-gradient-to-tr from-accent/40 to-accent/10 border border-accent rounded-full flex flex-col items-center justify-center z-10 shadow-glow">
            <Award className="w-12 h-12 text-accent mb-2" />
            <span className="text-sm font-bold text-text-primary">Niveau 5</span>
            <span className="text-xs text-text-muted">Top Contributeur</span>
          </div>
          {/* Floating points */}
          <div className="absolute -top-4 -right-4 bg-success/20 text-success text-xs font-bold px-2 py-1 rounded-full border border-success/30 rotate-12">
            +50 pts
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'filtering',
    title: 'Filtrage Avancé & Tags',
    description:
      "Trouvez exactement ce que vous cherchez. Filtrez les projets par filière (Télécoms, Management, etc.), par état d'avancement, ou par technologies clés. Ne perdez plus de temps pour trouver votre prochaine équipe.",
    icon: Filter,
    mockImage: (
      <div className="w-full h-full min-h-[250px] rounded-xl bg-surface border border-border flex flex-col p-4 shadow-inner relative overflow-hidden">
        {/* Mockup Filtering */}
        <div className="w-full h-10 bg-background border border-border rounded-lg mb-4 flex items-center px-3 gap-2">
          <Filter className="w-4 h-4 text-text-muted" />
          <div className="w-24 h-4 bg-text-muted/30 rounded" />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent">Tech</div>
          <div className="px-3 py-1 bg-background border border-border rounded-full text-xs text-text-secondary">Management</div>
          <div className="px-3 py-1 bg-background border border-border rounded-full text-xs text-text-secondary">Finance</div>
          <div className="px-3 py-1 bg-success/10 border border-success/20 rounded-full text-xs text-success">Recrutement ouvert</div>
        </div>
        <div className="flex-1 bg-background border border-border rounded-lg p-3">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-surface rounded-full" />
            <div className="flex-1">
              <div className="w-1/2 h-3 bg-text-primary/50 rounded mb-2" />
              <div className="w-full h-2 bg-text-muted/30 rounded" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

/**
 * Section Fonctionnalités avancées.
 * Présente les outils du Hub avec un layout alterné (zigzag).
 */
export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 bg-background border-t border-border overflow-hidden">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Des outils taillés pour l'innovation
          </h2>
          <p className="text-lg text-text-secondary">
            Le Hub n'est pas qu'un simple forum. C'est une plateforme complète
            pour vous accompagner jusqu'à la Journée du Numérique.
          </p>
        </div>

        <div className="flex flex-col gap-20 sm:gap-32">
          {featuresData.map((feature, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={feature.id}
                className={cn(
                  'flex flex-col md:flex-row items-center gap-8 md:gap-16',
                  !isEven && 'md:flex-row-reverse'
                )}
              >
                {/* Texte */}
                <div className="flex-1 space-y-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Illustration / Mockup */}
                <div className="flex-1 w-full relative">
                  {/* Effet lumineux de fond */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/5 rounded-full blur-[80px] -z-10" />
                  {feature.mockImage}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
