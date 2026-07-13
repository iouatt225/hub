import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/Tabs'
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
 * Section Démonstration du parcours étudiant (Démo à onglets).
 */
export function DemoTabsSection() {
  return (
    <section id="demo" className="py-20 sm:py-28 bg-background-alt">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-text-secondary">
            Découvrez le parcours d'une idée, de sa soumission jusqu'à
            l'incubation pour la Journée du Numérique.
          </p>
        </div>

        {/* Composant Tabs central */}
        <div className="max-w-4xl mx-auto bg-surface rounded-3xl p-8 sm:p-12 shadow-sm border border-border">
          <Tabs defaultValue={demoSteps[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-background-alt p-1 rounded-xl">
              {demoSteps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex gap-2 rounded-lg data-[state=active]:bg-surface data-[state=active]:text-accent data-[state=active]:shadow-sm">
                  <step.icon className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">{step.title}</span>
                  <span className="sm:hidden font-medium">{step.title.split('.')[1]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {demoSteps.map((step) => (
              <TabsContent
                key={step.id}
                value={step.id}
                className="animate-fade-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
              >
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-8">
                  <div className="w-20 h-20 rounded-2xl bg-accent-light text-accent flex items-center justify-center mb-8">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-text-primary mb-6">
                    {step.heading}
                  </h3>
                  <p className="text-xl text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
