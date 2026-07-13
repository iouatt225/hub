import { FileEdit, ThumbsUp, UserPlus, Rocket } from 'lucide-react'

const demoSteps = [
  {
    id: 'soumettre',
    title: '1. Soumettre',
    icon: FileEdit,
    heading: 'Proposez vos idées innovantes',
    description:
      "Remplissez un formulaire simple pour présenter votre projet (titre, description, filières ciblées). Votre idée devient visible par tous les étudiants de l'EMSP connectés au Hub.",
  },
  {
    id: 'voter',
    title: '2. Voter',
    icon: ThumbsUp,
    heading: 'Soutenez les meilleurs projets',
    description:
      "Parcourez les idées soumises par vos camarades et votez pour celles qui ont le plus de potentiel pour la Journée du Numérique. Les projets les plus populaires remontent dans le classement.",
  },
  {
    id: 'rejoindre',
    title: '3. Rejoindre',
    icon: UserPlus,
    heading: 'Formez l’équipe idéale',
    description:
      "Une idée vous passionne ? Demandez à rejoindre l'équipe. Complétez le porteur de projet avec vos compétences spécifiques (Management, Télécoms, Logistique, etc.).",
  },
  {
    id: 'incuber',
    title: '4. Incuber',
    icon: Rocket,
    heading: 'Préparez la Journée du Numérique',
    description:
      "Une fois l'équipe complète et le projet validé, l'école sélectionne les meilleures initiatives pour une incubation : mentorat, ateliers et présentation officielle !",
  },
]

/**
 * Section Démonstration du parcours étudiant (Scroll-Driven).
 */
export function DemoTabsSection() {
  return (
    <section id="demo" className="py-24 sm:py-32 bg-background-alt relative">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-text-secondary">
            Découvrez le parcours d'une idée, de sa soumission jusqu'à
            l'incubation pour la Journée du Numérique.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative items-start">
          
          {/* Colonne Gauche : Les étapes défilantes */}
          <div className="flex-1 space-y-24">
            {demoSteps.map((step) => (
              <div key={step.id} className="relative pl-12 border-l-2 border-border/50 pb-12">
                <div className="absolute top-0 -left-8 w-16 h-16 rounded-2xl bg-surface border border-border shadow-sm flex items-center justify-center text-accent">
                  <step.icon className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-sm font-bold text-accent tracking-widest uppercase mb-2 block">{step.title}</span>
                  <h3 className="text-3xl font-bold text-text-primary mb-6">
                    {step.heading}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Colonne Droite : Visuel Sticky */}
          <div className="hidden lg:flex w-[500px] shrink-0 sticky top-32 h-[500px] items-center justify-center rounded-[3rem] bg-accent p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
            
            {/* Mockup abstrait illustrant l'activité */}
            <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              
              <div className="h-20 w-full rounded-xl bg-white/10 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-32 w-1/2 rounded-xl bg-white/5" />
                <div className="h-32 w-1/2 rounded-xl bg-white/5" />
              </div>
              <div className="h-10 w-3/4 rounded-xl bg-highlight/20 mt-auto" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
