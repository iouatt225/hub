import { useState, useEffect } from 'react'
import { BookOpen, ShieldCheck, HelpCircle, Target } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion'
import { cn } from '@/lib/utils'

export function Documentation() {
  const [activeSection, setActiveSection] = useState('regles')

  // ScrollSpy basique
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['regles', 'criteres', 'faq']
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100 // Décalage pour le header sticky
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'regles', label: 'Règles du Hub', icon: ShieldCheck },
    { id: 'criteres', label: 'Critères d\'incubation', icon: Target },
    { id: 'faq', label: 'Questions fréquentes (FAQ)', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-hub">
        
        {/* En-tête de la page */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary">Documentation</h1>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl">
            Tout ce que vous devez savoir pour proposer une idée, monter une équipe et atteindre l'étape d'incubation au sein de l'EMSP.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 relative">
          
          {/* Menu latéral (Sticky) */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-28 bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-2">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-3">
                Sommaire
              </h3>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
                    activeSection === item.id
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Contenu Principal */}
          <main className="flex-1 space-y-20 pb-20">
            
            {/* --- SECTION: Règles --- */}
            <section id="regles" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-3 border-b border-border pb-4">
                <ShieldCheck className="w-8 h-8 text-accent" />
                Règles du Hub
              </h2>
              
              <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 text-text-secondary leading-relaxed space-y-4">
                <p>
                  Bienvenue sur le Hub d'Idées de l'EMSP. Pour garantir un environnement collaboratif et productif, nous vous demandons de respecter les règles suivantes :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Respect et Bienveillance :</strong> Les commentaires doivent toujours être constructifs. Tout propos déplacé, discriminatoire ou offensant entraînera une exclusion de la plateforme.</li>
                  <li><strong>Originalité :</strong> Les idées proposées doivent être originales ou apporter une amélioration significative à une solution existante. Le plagiat est strictement interdit.</li>
                  <li><strong>Domaine d'application :</strong> Les projets doivent idéalement s'inscrire dans les domaines couverts par l'EMSP (Numérique, Télécoms, Innovation postale, Management, etc.) ou répondre à un besoin social/étudiant clair.</li>
                  <li><strong>Engagement :</strong> Si vous proposez une idée et recherchez des associés, soyez réactif aux demandes de contact de vos camarades.</li>
                </ul>
              </div>
            </section>

            {/* --- SECTION: Critères --- */}
            <section id="criteres" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-3 border-b border-border pb-4">
                <Target className="w-8 h-8 text-accent" />
                Critères d'incubation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold mb-4">1</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">Faisabilité Technique</h3>
                  <p className="text-sm text-text-secondary">Le projet doit reposer sur des bases technologiques ou conceptuelles réalistes et réalisables par une équipe étudiante.</p>
                </div>
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold mb-4">2</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">Impact et Pertinence</h3>
                  <p className="text-sm text-text-secondary">La solution doit répondre à un problème avéré. Le jury évalue l'impact potentiel (social, économique, environnemental).</p>
                </div>
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold mb-4">3</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">Qualité de l'Équipe</h3>
                  <p className="text-sm text-text-secondary">Une équipe complémentaire (ex: technique + design + business) est un atout majeur pour passer en phase d'incubation.</p>
                </div>
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold mb-4">4</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">Popularité (Votes)</h3>
                  <p className="text-sm text-text-secondary">Bien que ce ne soit pas le seul critère, le nombre de votes montre l'adhésion de la communauté à votre idée.</p>
                </div>
              </div>
            </section>

            {/* --- SECTION: FAQ --- */}
            <section id="faq" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-3 border-b border-border pb-4">
                <HelpCircle className="w-8 h-8 text-accent" />
                Questions fréquentes (FAQ)
              </h2>

              <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Qui peut proposer une idée sur le Hub ?</AccordionTrigger>
                    <AccordionContent>
                      Tout étudiant ou personnel de l'EMSP possédant une adresse email institutionnelle (@emsp.ci) peut s'inscrire et proposer une idée.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Puis-je modifier mon idée après publication ?</AccordionTrigger>
                    <AccordionContent>
                      Oui, en tant que porteur du projet, vous pouvez éditer la description, le statut de votre équipe et ajouter des tags à tout moment depuis la page de votre projet.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Comment contacter une équipe pour la rejoindre ?</AccordionTrigger>
                    <AccordionContent>
                      Sur la page d'un projet, si l'équipe a le statut "Cherche associés", un bouton de contact vous permettra d'envoyer un message direct (ou un email) au porteur du projet.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Quand le jury sélectionne-t-il les projets pour l'incubation ?</AccordionTrigger>
                    <AccordionContent>
                      Les sélections officielles ont lieu deux fois par an (à la fin de chaque semestre). Cependant, les projets les plus populaires peuvent bénéficier d'un accompagnement anticipé.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

          </main>
        </div>

      </div>
    </div>
  )
}
