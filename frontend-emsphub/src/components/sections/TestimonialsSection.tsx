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
  // Dupliqué pour effet infini sur grands écrans
  {
    id: '4',
    name: 'Koffi A.',
    role: 'Étudiant en Logistique',
    content:
      "Trouver une équipe interdisciplinaire était un défi avant le Hub. Aujourd'hui, je travaille avec des développeurs sur un projet passionnant.",
    avatarSrc: 'https://i.pravatar.cc/150?u=koffi',
  },
]

/**
 * Section Témoignages (Infinite Slider).
 */
export function TestimonialsSection() {
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData]

  return (
    <section className="py-24 sm:py-32 bg-surface border-t border-border overflow-hidden">
      <div className="container-hub relative mb-12">
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary mb-4">
            Ils ont transformé leurs idées
          </h2>
          <p className="text-base text-text-secondary">
            Découvrez comment le Hub a aidé d'autres étudiants de l'EMSP à
            concrétiser leurs projets lors des éditions précédentes.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden w-full">
        <div className="absolute top-0 left-0 bottom-0 w-32 z-10 bg-gradient-to-r from-surface to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 z-10 bg-gradient-to-l from-surface to-transparent pointer-events-none" />
        
        <div className="flex w-max min-w-full animate-marquee gap-8 px-8">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex flex-col p-6 rounded-[2rem] w-[300px] sm:w-[400px] shrink-0 bg-background border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/10" />
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <Avatar className="w-12 h-12 border-2 border-border shadow-sm">
                  <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-base font-bold text-text-primary">
                    {testimonial.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-wider mt-0.5">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
