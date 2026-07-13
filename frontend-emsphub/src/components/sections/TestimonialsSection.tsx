import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Quote } from 'lucide-react'

const testimonialsData = [
  {
    id: '1',
    name: 'Amadou K.',
    role: 'Étudiant en Télécoms',
    content:
      "Le Hub m'a permis de trouver des profils en management pour structurer mon idée d'application IoT. Sans cette plateforme, mon projet n'aurait jamais vu le jour pour la Journée du Numérique !",
    avatarSrc: 'https://i.pravatar.cc/150?u=amadou',
  },
  {
    id: '2',
    name: 'Sarah M.',
    role: 'Étudiante en Management',
    content:
      "J'avais une vision claire pour un service numérique, mais il me manquait l'expertise technique. J'ai pu rejoindre une équipe brillante et nous avons remporté le prix de l'innovation !",
    avatarSrc: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: '3',
    name: 'Jean-Marc D.',
    role: 'Membre du Club Info',
    content:
      "Un outil incroyable pour centraliser toutes les initiatives de l'école. Le système de vote met vraiment en valeur les projets les plus pertinents et motive tout le monde à participer.",
    avatarSrc: 'https://i.pravatar.cc/150?u=jeanmarc',
  },
]

/**
 * Section Témoignages (Testimonials).
 * Affiche une grille de retours d'expérience d'étudiants.
 */
export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 bg-background-alt border-t border-border overflow-hidden">
      <div className="container-hub relative">
        {/* Décoration d'arrière-plan */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Ils ont transformé leurs idées
          </h2>
          <p className="text-lg text-text-secondary">
            Découvrez comment le Hub a aidé d'autres étudiants de l'EMSP à
            concrétiser leurs projets lors des éditions précédentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col p-8 rounded-2xl bg-surface border border-border shadow-card relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20 rotate-180" />
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-14 h-14 border-2 border-background shadow-sm">
                  <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-base font-bold text-text-primary">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-text-secondary leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
