import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, Loader2 } from 'lucide-react'
import { ProjectCard } from '@/components/hub/ProjectCard'
import { FiltersBar } from '@/components/hub/FiltersBar'
import { fetchProjects } from '@/lib/api/projects'
import type { Project } from '@/lib/fixtures/projets.mock'

export function Hub() {
  const [searchParams] = useSearchParams()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Lecture des filtres depuis l'URL
  const query = searchParams.get('q') || ''
  const status = searchParams.get('status') || 'all'
  const sortBy = searchParams.get('sort') || 'recent'

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true)
      try {
        const results = await fetchProjects({ query, status, sortBy })
        setProjects(results)
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Petite temporisation (debounce) pour éviter trop d'appels pendant la frappe
    const timer = setTimeout(() => {
      loadProjects()
    }, 300)

    return () => clearTimeout(timer)
  }, [query, status, sortBy])

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-hub">
        {/* Header de la page */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Le Hub d'Idées</h1>
          </div>
          <p className="text-text-secondary text-lg">
            Découvrez, soutenez et rejoignez les projets innovants de l'EMSP.
          </p>
        </div>

        {/* Barre de filtres */}
        <FiltersBar onFiltersChange={() => {}} />

        {/* Grille de projets */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
            <Loader2 className="h-8 w-8 text-accent animate-spin mb-4" />
            <p className="text-text-muted">Chargement des projets...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px] bg-surface border border-dashed border-border rounded-xl">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-text-primary mb-2">Aucun projet trouvé</h3>
            <p className="text-text-secondary text-center max-w-md">
              Nous n'avons trouvé aucun projet correspondant à vos critères de recherche. Essayez de modifier vos filtres.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
