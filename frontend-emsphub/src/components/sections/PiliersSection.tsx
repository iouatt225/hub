import { Lightbulb, Users, ShieldCheck, Trophy } from 'lucide-react'

const piliersData = [
  {
    id: 'centraliser',
    title: 'Centraliser les idées',
    description: "Un espace unique pour regrouper toutes les propositions innovantes des étudiants de l'EMSP.",
    icon: Lightbulb,
  },
  {
    id: 'collaborer',
    title: 'Collaborer inter-filières',
    description: 'Créez des synergies en formant des équipes avec des profils complémentaires.',
    icon: Users,
  },
  {
    id: 'valoriser',
    title: 'Valoriser les projets',
    description: "Donnez de la visibilité à votre travail lors de la Journée du Numérique.",
    icon: Trophy,
  },
  {
    id: 'securiser',
    title: 'Sécuriser & modérer',
    description: "Un environnement de confiance, réservé aux emails institutionnels et modéré par l'école.",
    icon: ShieldCheck,
  },
]

/**
 * Section Piliers de la page d'accueil.
 * Affiche les 4 valeurs fondamentales du Hub sous forme de grille de cartes.
 */
export function PiliersSection() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Notre vision pour l'innovation
          </h2>
          <p className="text-lg text-text-secondary">
            Le Hub d'Idées & Incubation repose sur quatre piliers pour transformer
            vos concepts en réalités concrètes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {piliersData.map((pilier) => (
            <div
              key={pilier.id}
              className="flex flex-col p-8 rounded-2xl glass-card group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-6 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 group-hover:shadow-glow">
                <pilier.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 transition-colors group-hover:text-accent">
                {pilier.title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed group-hover:text-text-primary/90 transition-colors">
                {pilier.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
