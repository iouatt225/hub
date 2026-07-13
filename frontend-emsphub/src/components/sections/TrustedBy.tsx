

export interface TrustedByProps {
  title: string
  logos: {
    id: string
    name: string
  }[]
}

/**
 * Section TrustedBy (Bandeau de partenaires).
 */
export function TrustedBy({ title, logos }: TrustedByProps) {
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="py-8 border-y border-border bg-surface overflow-hidden relative z-20">
      <div className="container-hub flex flex-col md:flex-row items-center gap-8">
        <p className="text-sm font-bold text-text-muted uppercase tracking-widest shrink-0">
          {title}
        </p>
        
        {/* Conteneur du défilement */}
        <div className="relative flex overflow-hidden flex-1 w-full">
          {/* Masques de fondu aux extrémités */}
          <div className="absolute top-0 left-0 bottom-0 w-16 z-10 bg-gradient-to-r from-surface to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 z-10 bg-gradient-to-l from-surface to-transparent pointer-events-none" />
          
          <div className="flex w-max min-w-full animate-marquee gap-12 sm:gap-16 px-12">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity grayscale duration-300"
              >
                <span className="text-base sm:text-lg font-bold text-text-secondary whitespace-nowrap">
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
