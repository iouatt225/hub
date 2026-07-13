import { LayoutDashboard, Award, Filter, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    id: 'dashboard',
    title: 'Dashboard Dynamique',
    description: "Visualisez les votes, candidatures et statistiques en temps réel.",
    icon: LayoutDashboard,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: 'gamification',
    title: 'Gamification',
    description: "Gagnez des points d'innovation à chaque action.",
    icon: Award,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    id: 'filtering',
    title: 'Filtrage Avancé',
    description: "Trouvez des projets par filière ou technologie.",
    icon: Filter,
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
  },
  {
    id: 'security',
    title: 'Environnement Sécurisé',
    description: "Modération et emails institutionnels exclusifs.",
    icon: ShieldCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
]

/**
 * Section Fonctionnalités — grille uniforme de 4 cartes identiques.
 */
export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-accent tracking-widest uppercase mb-3 block">Fonctionnalités</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            Des outils taillés pour l'<span className="text-accent">innovation</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Une suite complète pour vous accompagner de l'idée brute jusqu'à la Journée du Numérique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="relative p-8 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icône */}
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.iconBg)}>
                <feature.icon className={cn("w-7 h-7", feature.iconColor)} strokeWidth={1.5} />
              </div>
              
              {/* Contenu */}
              <h3 className="font-bold text-lg text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Effet de fond subtil au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
