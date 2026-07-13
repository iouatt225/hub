import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { BRAND } from '@/constants/brand'

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
 * Section Hero de la page d'accueil.
 * Accepte ses données via props pour permettre une évolution vers des données dynamiques.
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
    <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 bg-background">
      {/* Fond très discret avec un motif géométrique ou radial léger */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f1f5f9_0%,transparent_100%)] pointer-events-none" />

      <div className="container-hub relative z-10 text-center">
        {/* Badge événement */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-accent/20 text-sm font-medium text-accent shadow-glow">
            🚀 {BRAND.event}
          </span>
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary max-w-4xl mx-auto mb-6 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          {title}{' '}
          <span className="text-gradient drop-shadow-md">{highlight}</span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          {subtitle}
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link to={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>

        {/* Preuve sociale : Avatars + Compteur */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <div className="flex -space-x-3">
            {avatars.map((avatar) => (
              <Avatar key={avatar.id} className="border-2 border-background w-12 h-12">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
                <AvatarFallback>{avatar.alt.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="text-sm text-text-secondary text-left">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-1">
              <span className="font-bold text-text-primary">+{stats.count}</span> {stats.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
