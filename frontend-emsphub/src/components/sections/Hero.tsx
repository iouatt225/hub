import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { BRAND } from '@/constants/brand'
import { Lightbulb, Trophy, Users } from 'lucide-react'

export interface HeroProps {
  title: string
  highlight: string
  subtitle: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
  stats: {
    count: number
    label: string
  }
  avatars: {
    id: string
    src: string
    alt: string
  }[]
}

/**
 * Nouvelle Section Hero - Split Layout
 */
export function Hero({
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  avatars,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 bg-background">
      {/* Fond décoratif subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#f1f5f9_0%,transparent_70%)] pointer-events-none" />

      <div className="container-hub relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Colonne Gauche : Texte et CTAs */}
          <div className="text-left max-w-2xl">
            {/* Badge événement */}
            <div className="mb-6 animate-fade-in inline-flex">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/20 text-sm font-semibold text-accent">
                🚀 {BRAND.event}
              </span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text-primary mb-6 animate-slide-up leading-[1.1]" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              {title}{' '}
              <span className="text-gradient block mt-2">{highlight}</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed animate-slide-up max-w-xl" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              {subtitle}
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-glow hover:shadow-none" asChild>
                <Link to={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-border hover:bg-surface-hover" asChild>
                <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>

            {/* Preuve sociale : Avatars + Compteur */}
            <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <div className="flex -space-x-3">
                {avatars.map((avatar) => (
                  <Avatar key={avatar.id} className="border-2 border-background w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                    <AvatarFallback>{avatar.alt.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm text-text-secondary">
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p>
                  <span className="font-bold text-text-primary">+{stats.count}</span> {stats.label}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Composition Visuelle Flottante */}
          <div className="hidden lg:block relative h-[600px] w-full animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl" />
            
            {/* Carte Flottante Principale */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-6 rounded-3xl bg-surface border border-border shadow-xl z-20 hover:-translate-y-6 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Idée Soumise</h3>
                  <p className="text-xs text-text-muted">Il y a 2 minutes</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                "Une plateforme de covoiturage exclusive pour les étudiants de l'EMSP, sécurisée et économique."
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs font-semibold text-accent px-2 py-1 bg-accent/10 rounded-md">
                  Télécoms
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-text-primary">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  En revue
                </div>
              </div>
            </div>

            {/* Petite Carte Flottante Haut Droite */}
            <div className="absolute top-20 right-0 w-64 p-5 rounded-2xl bg-surface border border-border shadow-lg z-10 opacity-90 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-highlight-light flex items-center justify-center text-highlight-hover">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-text-primary">+50 Points</p>
                  <p className="text-xs text-text-muted">Équipe complétée</p>
                </div>
              </div>
            </div>

            {/* Petite Carte Flottante Bas Gauche */}
            <div className="absolute bottom-24 left-0 w-64 p-5 rounded-2xl bg-surface border border-border shadow-lg z-30 opacity-95">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-text-primary">Nouveau membre</p>
                  <p className="text-xs text-text-muted">Profil Management</p>
                </div>
              </div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute top-40 left-10 w-4 h-4 rounded-full bg-accent/20" />
            <div className="absolute bottom-40 right-20 w-6 h-6 rounded-full bg-highlight/30" />
          </div>

        </div>
      </div>
    </section>
  )
}

