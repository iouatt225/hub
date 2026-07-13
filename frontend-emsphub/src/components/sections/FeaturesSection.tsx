import { LayoutDashboard, Award, Filter, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const bentoFeatures = [
  {
    id: 'dashboard',
    title: 'Dashboard Dynamique',
    description: "Visualisez les votes, candidatures et statistiques en temps réel.",
    icon: LayoutDashboard,
    className: "col-span-1 md:col-span-2 lg:col-span-2 bg-surface text-text-primary min-h-[250px]",
    iconColor: "bg-accent-light text-accent",
    large: true,
  },
  {
    id: 'gamification',
    title: 'Gamification',
    description: "Gagnez des points d'innovation à chaque action.",
    icon: Award,
    className: "col-span-1 md:col-span-1 lg:col-span-1 bg-highlight text-accent-dark min-h-[250px]",
    iconColor: "bg-white/20 text-accent-dark",
    large: false,
  },
  {
    id: 'filtering',
    title: 'Filtrage Avancé',
    description: "Trouvez des projets par filière ou technologie.",
    icon: Filter,
    className: "col-span-1 md:col-span-1 lg:col-span-1 bg-accent text-white min-h-[250px]",
    iconColor: "bg-white/20 text-white",
    large: false,
  },
  {
    id: 'security',
    title: 'Environnement Sécurisé',
    description: "Modération et emails institutionnels exclusifs.",
    icon: ShieldCheck,
    className: "col-span-1 md:col-span-1 lg:col-span-2 bg-surface text-text-primary min-h-[250px]",
    iconColor: "bg-blue-50 text-blue-600",
    large: false,
  },
]

/**
 * Section Fonctionnalités (Bento Grid).
 */
export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-background border-t border-border overflow-hidden">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            Des outils taillés pour l'<span className="text-accent">innovation</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Une suite complète pour vous accompagner de l'idée brute jusqu'à la Journée du Numérique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {bentoFeatures.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                'relative p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden group flex flex-col justify-between',
                feature.className
              )}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.iconColor)}>
                  <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                
                <div className="mt-auto">
                  <h3 className={cn("font-bold mb-2", feature.large ? "text-3xl" : "text-xl")}>
                    {feature.title}
                  </h3>
                  <p className={cn("leading-relaxed", feature.large ? "text-lg opacity-80" : "text-sm opacity-90")}>
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Effet d'éclairage interne au survol (générique) */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
