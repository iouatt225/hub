import { useState, useEffect } from 'react'
import { BookOpen, ShieldCheck, HelpCircle, Target, CheckCircle2, Lightbulb, Users, ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'regles', label: 'Règles du Hub', icon: ShieldCheck },
  { id: 'criteres', label: 'Critères d\'incubation', icon: Target },
  { id: 'faq', label: 'Questions fréquentes (FAQ)', icon: HelpCircle },
]

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
          if (rect.top <= 200) {
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
      const yOffset = -120 // Décalage pour le header sticky + marge
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      
      {/* ─── Hero Section (Split Layout) ─── */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#e6edd8_0%,transparent_50%)] pointer-events-none" />
        <div className="container-hub relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Gauche */}
            <div className="text-left max-w-2xl">
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-accent tracking-widest uppercase">La Bible du Hub</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text-primary mb-6 animate-slide-up leading-[1.1]" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                Votre guide vers <span className="text-gradient block mt-2">l'incubation.</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed animate-slide-up max-w-xl" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                Tout ce que vous devez savoir pour proposer une idée, monter une équipe et briller lors de la Journée du Numérique de l'EMSP.
              </p>
            </div>

            {/* Droite (Visuel Abstrait Flottant) */}
            <div className="hidden lg:block relative h-[450px] w-full animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl" />
              
              <div className="absolute top-10 right-4 w-[320px] flex flex-col items-center text-center p-6 rounded-3xl bg-surface border border-border shadow-2xl z-20 hover:-translate-y-4 transition-transform duration-500 box-border overflow-hidden">
                 <div className="w-14 h-14 shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                   <ShieldCheck className="w-8 h-8 text-accent" />
                 </div>
                 <h3 className="font-bold text-2xl mb-2 text-text-primary break-words">100% Sécurisé</h3>
                 <p className="text-sm text-text-secondary leading-relaxed break-words">Réservé exclusivement aux emails institutionnels @emsp.ci.</p>
              </div>
              
              <div className="absolute bottom-10 left-4 w-[320px] flex flex-col items-center text-center p-6 rounded-3xl bg-accent text-white shadow-2xl z-10 opacity-95 box-border overflow-hidden">
                 <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm border border-white/20">
                   <Target className="w-8 h-8 text-highlight-light" />
                 </div>
                 <h3 className="font-bold text-2xl mb-2 break-words">Objectif JDN</h3>
                 <p className="text-sm text-accent-light opacity-90 leading-relaxed break-words">Les meilleurs projets seront sélectionnés par le jury officiel.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Contenu Principal ─── */}
      <div className="container-hub mt-12 sm:mt-20">
        <div className="flex flex-col lg:flex-row gap-16 relative items-start">
          
          {/* Menu latéral (Sticky Glassmorphism) */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 glass rounded-3xl p-6 shadow-sm flex flex-col gap-2 z-30">
              <h3 className="text-xs font-extrabold text-accent uppercase tracking-widest mb-4 px-3">
                Sommaire
              </h3>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left w-full",
                    activeSection === item.id
                      ? "bg-accent text-white shadow-md"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Sections de contenu */}
          <main className="flex-1 space-y-32 w-full max-w-4xl">
            
            {/* --- SECTION: Règles (Cartes) --- */}
            <section id="regles" className="scroll-mt-32">
              <div className="mb-10">
                <span className="text-sm font-bold text-accent tracking-widest uppercase mb-2 block">Cadre Légal</span>
                <h2 className="text-4xl font-extrabold text-text-primary">Règles du Hub</h2>
                <p className="text-lg text-text-secondary mt-4">
                  Pour garantir un environnement collaboratif et bienveillant.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background-alt p-8 rounded-3xl transition-all flex flex-col items-center text-center h-full hover:shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Respect & Bienveillance</h3>
                  <p className="text-text-secondary">Les commentaires doivent être constructifs. Tout propos déplacé entraîne une exclusion immédiate.</p>
                </div>
                
                <div className="bg-background-alt p-8 rounded-3xl transition-all flex flex-col items-center text-center h-full hover:shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-highlight-light text-highlight-hover flex items-center justify-center mb-6 shrink-0">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Originalité Absolue</h3>
                  <p className="text-text-secondary">Les idées doivent être originales ou améliorer significativement l'existant. Le plagiat est interdit.</p>
                </div>
                
                <div className="bg-background-alt p-8 rounded-3xl transition-all flex flex-col items-center text-center h-full hover:shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Domaine d'application</h3>
                  <p className="text-text-secondary">En lien avec l'EMSP : Numérique, Télécoms, Innovation postale, Management, ou social étudiant.</p>
                </div>
                
                <div className="bg-background-alt p-8 rounded-3xl transition-all flex flex-col items-center text-center h-full hover:shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Engagement Actif</h3>
                  <p className="text-text-secondary">Si vous cherchez des associés, soyez réactif aux demandes de vos camarades. Le silence tue l'innovation.</p>
                </div>
              </div>
            </section>

            {/* --- SECTION: Critères (Bento Grid) --- */}
            <section id="criteres" className="scroll-mt-32">
              <div className="mb-10">
                <span className="text-sm font-bold text-accent tracking-widest uppercase mb-2 block">Évaluation</span>
                <h2 className="text-4xl font-extrabold text-text-primary">Critères d'incubation</h2>
                <p className="text-lg text-text-secondary mt-4">
                  Sur quoi le jury de la Journée du Numérique va-t-il se baser ?
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bento Card 1 (Large) */}
                <div className="relative col-span-1 md:col-span-2 p-8 rounded-[2rem] bg-accent text-white overflow-hidden shadow-md min-h-[220px]">
                  <span className="absolute -bottom-8 -right-4 text-[12rem] font-black opacity-10 leading-none pointer-events-none">1</span>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-3xl font-bold mb-4">Faisabilité Technique</h3>
                    <p className="text-lg text-accent-light max-w-xl">Le projet doit reposer sur des bases technologiques ou conceptuelles réalistes et réalisables concrètement par une équipe étudiante.</p>
                  </div>
                </div>

                {/* Bento Card 2 */}
                <div className="relative p-8 rounded-[2rem] bg-surface border border-border shadow-sm overflow-hidden group hover:shadow-card-hover transition-all min-h-[220px]">
                  <span className="absolute -bottom-6 -right-2 text-[10rem] font-black text-border/40 group-hover:text-border/60 transition-colors leading-none pointer-events-none">2</span>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-bold mb-3 text-text-primary">Impact & Pertinence</h3>
                    <p className="text-text-secondary">La solution répond à un problème avéré (social, économique, vert).</p>
                  </div>
                </div>

                {/* Bento Card 3 */}
                <div className="relative p-8 rounded-[2rem] bg-highlight text-accent-dark shadow-sm overflow-hidden group hover:shadow-card-hover transition-all min-h-[220px]">
                  <span className="absolute -bottom-6 -right-2 text-[10rem] font-black text-accent-dark/10 group-hover:text-accent-dark/20 transition-colors leading-none pointer-events-none">3</span>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-bold mb-3">L'Équipe</h3>
                    <p className="text-accent-dark/80 font-medium">Une équipe complémentaire (technique + design + business) est un atout majeur.</p>
                  </div>
                </div>
                
                {/* Bento Card 4 (Full width below) */}
                <div className="relative col-span-1 md:col-span-2 p-8 rounded-[2rem] bg-background-alt border border-border shadow-sm overflow-hidden group hover:shadow-card-hover transition-all min-h-[220px]">
                  <span className="absolute -bottom-10 -right-4 text-[12rem] font-black text-border/50 group-hover:text-border/80 transition-colors leading-none pointer-events-none">4</span>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-bold mb-3 text-text-primary">Popularité (Votes)</h3>
                    <p className="text-text-secondary max-w-xl">Bien que ce ne soit pas le seul critère, un nombre important de votes montre l'adhésion de la communauté à votre vision.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECTION: FAQ (Asymétrique) --- */}
            <section id="faq" className="scroll-mt-32 pt-10 border-t border-border">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Colonne Titre */}
                <div className="lg:col-span-5">
                  <div className="sticky top-32">
                    <span className="text-sm font-bold text-accent tracking-widest uppercase mb-2 block">Support</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
                      Questions <br /> Fréquentes
                    </h2>
                    <p className="text-lg text-text-secondary mb-8">
                      Vous ne trouvez pas la réponse à votre question ? N'hésitez pas à nous contacter directement.
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto h-12 px-6 border-border" asChild>
                      <a href="mailto:support-hub@emsp.ci">
                        Contacter le support
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Colonne Accordéon */}
                <div className="lg:col-span-7">
                  <div className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-sm">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-border">
                        <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent transition-colors">
                          Qui peut proposer une idée sur le Hub ?
                        </AccordionTrigger>
                        <AccordionContent className="text-text-secondary text-base leading-relaxed">
                          Tout étudiant ou personnel de l'EMSP possédant une adresse email institutionnelle (@emsp.ci) peut s'inscrire et proposer une idée.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2" className="border-border">
                        <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent transition-colors">
                          Puis-je modifier mon idée après publication ?
                        </AccordionTrigger>
                        <AccordionContent className="text-text-secondary text-base leading-relaxed">
                          Oui, en tant que porteur du projet, vous pouvez éditer la description, le statut de votre équipe et ajouter des tags à tout moment depuis la page de votre projet.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3" className="border-border">
                        <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent transition-colors">
                          Comment contacter une équipe pour la rejoindre ?
                        </AccordionTrigger>
                        <AccordionContent className="text-text-secondary text-base leading-relaxed">
                          Sur la page d'un projet, si l'équipe a le statut "Cherche associés", un bouton de contact vous permettra d'envoyer un message direct (ou un email) au porteur du projet.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4" className="border-b-0">
                        <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent transition-colors">
                          Quand le jury sélectionne-t-il les projets ?
                        </AccordionTrigger>
                        <AccordionContent className="text-text-secondary text-base leading-relaxed">
                          Les sélections officielles ont lieu deux fois par an (à la fin de chaque semestre). Cependant, les projets les plus populaires peuvent bénéficier d'un accompagnement anticipé.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
                
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  )
}
