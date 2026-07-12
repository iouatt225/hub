export interface TrustedByProps {
  title: string
  logos: {
    id: string
    name: string
  }[]
}

/**
 * Section TrustedBy (Bandeau de partenaires).
 * Affiche les logos ou noms des partenaires/filières dans un défilement infini.
 */
export function TrustedBy({ title, logos }: TrustedByProps) {
  // Dupliquer la liste pour l'effet de défilement continu
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="py-10 border-y border-border bg-background-alt overflow-hidden">
      <div className="container-hub">
        <p className="text-center text-sm font-semibold text-text-muted uppercase tracking-widest mb-8">
          {title}
        </p>
        
        {/* Conteneur du défilement */}
        <div className="relative flex overflow-hidden">
          {/* Masques de fondu aux extrémités */}
          <div className="absolute top-0 left-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background-alt to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background-alt to-transparent pointer-events-none" />
          
          {/* Animation CSS via Tailwind (voir index.css pour la keyframe, ou utilitaire custom) */}
          <div className="flex w-max min-w-full animate-marquee gap-12 sm:gap-24 px-12 sm:px-24">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-300"
              >
                <span className="text-lg sm:text-xl font-bold text-text-secondary whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
