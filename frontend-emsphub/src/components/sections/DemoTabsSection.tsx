import { FileEdit, ThumbsUp, UserPlus, Rocket } from 'lucide-react'

const demoSteps = [
  {
    id: 'soumettre',
    number: '01',
    title: 'Soumettre',
    icon: FileEdit,
    description:
      "Remplissez un formulaire simple pour présenter votre projet. Votre idée devient visible par tous les étudiants de l'EMSP.",
  },
  {
    id: 'voter',
    number: '02',
    title: 'Voter',
    icon: ThumbsUp,
    description:
      "Parcourez les idées soumises par vos camarades et votez pour celles qui ont le plus de potentiel.",
  },
  {
    id: 'rejoindre',
    number: '03',
    title: 'Rejoindre',
    icon: UserPlus,
    description:
      "Une idée vous passionne ? Demandez à rejoindre l'équipe et complétez-la avec vos compétences.",
  },
  {
    id: 'incuber',
    number: '04',
    title: 'Incuber',
    icon: Rocket,
    description:
      "L'école sélectionne les meilleures initiatives pour une incubation : mentorat, ateliers et présentation officielle !",
  },
]

/**
 * Section « Comment ça marche » — 4 étapes avec des cartes numérotées.
 */
export function DemoTabsSection() {
  return (
    <section id="demo" className="py-24 sm:py-32 bg-surface border-t border-border relative">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-bold text-accent tracking-widest uppercase mb-3 block">Parcours</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-text-secondary">
            Découvrez le parcours d'une idée, de sa soumission jusqu'à l'incubation.
          </p>
        </div>

        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
          
          {/* Ligne de connexion entre les étapes (desktop uniquement) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
          
          {demoSteps.map((step) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Cercle numéroté */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-accent/20 flex items-center justify-center mb-6 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                <step.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Numéro */}
              <span className="text-xs font-bold text-accent tracking-widest uppercase mb-2">{step.number}</span>
              
              {/* Titre */}
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed max-w-[260px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
