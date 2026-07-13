import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
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
}

/**
 * Hero Section — Image de fond plein écran style EMSP.
 */
export function Hero({
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
        }}
      />
      {/* Overlay sombre avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/75 to-[#1a1a2e]/50" />

      <div className="container-hub relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge événement */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold text-white/90">
              🚀 {BRAND.event}
            </span>
          </div>

          {/* Titre principal */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] animate-slide-up"
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            {title}{' '}
            <span className="text-highlight block mt-2">{highlight}</span>
          </h1>

          {/* Sous-titre */}
          <p
            className="text-lg sm:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl animate-slide-up"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            {subtitle}
          </p>

          {/* Boutons CTA */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
          >
            <Button
              size="lg"
              className="h-14 px-8 text-base rounded-xl bg-highlight text-accent-dark hover:bg-highlight-hover font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              asChild
            >
              <Link to={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base rounded-xl border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold transition-all"
              asChild
            >
              <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
