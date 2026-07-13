import { FileEdit, ThumbsUp, UserPlus, Trophy } from 'lucide-react'

const advantages = [
  {
    id: 'soumettre',
    title: 'Soumission rapide',
    description: "Proposez votre idée en quelques clics. Décrivez votre projet, choisissez vos filières et publiez.",
    icon: FileEdit,
  },
  {
    id: 'voter',
    title: 'Vote communautaire',
    description: "Soutenez les meilleurs projets. Les idées les plus populaires remontent dans le classement.",
    icon: ThumbsUp,
  },
  {
    id: 'equipe',
    title: "Formation d'équipe",
    description: "Trouvez des profils complémentaires et formez l'équipe idéale pour votre projet.",
    icon: UserPlus,
  },
  {
    id: 'selection',
    title: 'Sélection officielle',
    description: "Les meilleurs projets sont sélectionnés pour l'incubation et la Journée du Numérique.",
    icon: Trophy,
  },
]

/**
 * Section « Pourquoi le Hub EMSP » — Grille 2×2 de cartes.
 * Inspiré de la section « Pourquoi choisir l'EMSP » du site de référence.
 */
export function DemoTabsSection() {
  return (
    <section className="py-24 sm:py-32 bg-surface border-t border-border">
      <div className="container-hub">
        {/* En-tête */}
        <div className="max-w-3xl mb-12">
          <span className="text-sm font-bold text-accent tracking-widest uppercase mb-4 block">
            Pourquoi le Hub EMSP
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary mb-4 leading-tight">
            Les atouts qui font la différence
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            Une plateforme pensée pour simplifier la soumission d'idées, la collaboration entre filières et la sélection des projets innovants.
          </p>
        </div>

        {/* Grille 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-accent/5 border border-accent/10 hover:border-accent/25 transition-all duration-300 group"
            >
              {/* Icône */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>

              {/* Contenu */}
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
