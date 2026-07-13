/**
 * Barre de statistiques — Bandeau vert pleine largeur avec 4 chiffres clés.
 * Inspiré du bandeau stats du site EMSP de référence.
 */
export function StatsBar() {
  const stats = [
    { value: '42+', label: 'Projets Soumis' },
    { value: '8', label: 'Filières Représentées' },
    { value: '200+', label: 'Étudiants Actifs' },
    { value: '3', label: 'Éditions JDN' },
  ]

  return (
    <section className="bg-accent py-10 sm:py-12">
      <div className="container-hub">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              {/* Séparateur vertical (sauf le premier) */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/20" />
              )}
              <span className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </span>
              <span className="text-sm sm:text-base text-white/70 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
