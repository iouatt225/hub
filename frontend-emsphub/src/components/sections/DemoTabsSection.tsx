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
    mockImage: (
      <div className="w-full h-64 sm:h-80 rounded-xl bg-background border border-border flex flex-col p-6 shadow-inner relative overflow-hidden">
        {/* Mockup UI: Formulaire simplifié */}
        <div className="w-1/3 h-4 bg-surface rounded mb-6" />
        <div className="w-full h-10 bg-surface border border-border rounded-lg mb-4" />
        <div className="w-full h-24 bg-surface border border-border rounded-lg mb-4" />
        <div className="w-24 h-10 bg-accent/20 border border-accent/40 rounded-lg ml-auto" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
      </div>
    ),
  },
  {
    id: 'voter',
    title: '2. Voter',
    icon: ThumbsUp,
    heading: 'Soutenez les meilleurs projets',
    description:
      "Parcourez les idées soumises par vos camarades et votez pour celles qui ont le plus de potentiel pour la Journée du Numérique. Les projets les plus populaires remontent dans le classement.",
    mockImage: (
      <div className="w-full h-64 sm:h-80 rounded-xl bg-background border border-border flex flex-col p-6 shadow-inner relative overflow-hidden gap-4">
        {/* Mockup UI: Liste de votes */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border">
            <div className="flex flex-col gap-2">
              <div className="w-32 h-3 bg-text-secondary/50 rounded" />
              <div className="w-20 h-2 bg-text-muted/50 rounded" />
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded bg-accent/10 border border-accent/20">
              <ThumbsUp className="w-4 h-4 text-accent mb-1" />
              <span className="text-xs text-accent font-bold">+{i * 12}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'rejoindre',
    title: '3. Rejoindre',
    icon: UserPlus,
    heading: 'Formez l’équipe idéale',
    description:
      "Une idée vous passionne ? Demandez à rejoindre l'équipe. Complétez le porteur de projet avec vos compétences spécifiques (Management, Télécoms, Logistique, etc.).",
    mockImage: (
      <div className="w-full h-64 sm:h-80 rounded-xl bg-background border border-border flex items-center justify-center p-6 shadow-inner relative overflow-hidden">
        {/* Mockup UI: Avatars connectés */}
        <div className="relative w-48 h-48">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center z-10 shadow-glow">
            <span className="text-sm font-bold text-accent">Leader</span>
          </div>
          {/* Satellites */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border" />
          {/* Lignes de connexion (simulées via svg) */}
          <svg className="absolute inset-0 w-full h-full text-border -z-0" stroke="currentColor" strokeWidth="2">
            <line x1="50%" y1="20%" x2="50%" y2="80%" />
            <line x1="20%" y1="50%" x2="80%" y2="50%" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'incuber',
    title: '4. Incuber',
    icon: Rocket,
    heading: 'Préparez la Journée du Numérique',
    description:
      "Une fois l'équipe complète et le projet validé, l'école sélectionne les meilleures initiatives pour une incubation : mentorat, ateliers et présentation officielle !",
    mockImage: (
      <div className="w-full h-64 sm:h-80 rounded-xl bg-background border border-border flex flex-col items-center justify-center p-6 shadow-inner relative overflow-hidden">
        <Rocket className="w-24 h-24 text-accent mb-6 animate-pulse" />
        <div className="w-48 h-4 bg-surface rounded-full overflow-hidden">
          <div className="w-3/4 h-full bg-accent rounded-full" />
        </div>
        <span className="text-xs text-text-muted mt-2 font-mono uppercase tracking-widest">
          Validation en cours...
        </span>
      </div>
    ),
  },
]

/**
 * Section Démonstration du parcours étudiant (Démo à onglets).
 */
export function DemoTabsSection() {
  return (
    <section className="py-20 sm:py-32 bg-background-alt border-t border-border">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-text-secondary">
            Découvrez le parcours d'une idée, de sa soumission jusqu'à
            l'incubation pour la Journée du Numérique.
          </p>
        </div>

        {/* Composant Tabs central */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue={demoSteps[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {demoSteps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex gap-2">
                  <step.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.title.split('.')[1]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {demoSteps.map((step) => (
              <TabsContent
                key={step.id}
                value={step.id}
                className="animate-fade-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-text-primary mb-4">
                      {step.heading}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>
                  <div className="order-1 md:order-2">
                    {step.mockImage}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
