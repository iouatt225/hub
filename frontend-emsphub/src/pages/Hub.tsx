import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Sparkles, Loader2 } from 'lucide-react'
import { ProjectCard } from '@/components/hub/ProjectCard'
import { FiltersBar } from '@/components/hub/FiltersBar'
import { fetchProjects } from '@/lib/api/projects'
import type { Project } from '@/lib/fixtures/projets.mock'
import { Button } from '@/components/ui/Button'

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
        
        {/* En-tête de la page avec bouton de soumission et code QR */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-10 pb-6 border-b border-border/80">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
                <Sparkles className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-bold text-text-primary">Le Hub d'Idées</h1>
            </div>
            <p className="text-text-secondary text-base max-w-2xl">
              Découvrez, soutenez et rejoignez les projets innovants de l'EMSP. Partagez votre vision avec la communauté.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="gap-2 font-semibold">
                <Link to="/hub/nouvelle-idee">
                  Proposer une idée
                </Link>
              </Button>
            </div>
          </div>

          {/* QR Code de soumission rapide */}
          <div className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-4 shadow-sm shrink-0 w-full lg:w-auto max-w-sm">
            <div className="p-2 bg-white rounded-xl border border-border flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h6v6H2V2zm1.5 1.5v3h3v-3h-3zM2 16h6v6H2v-6zm1.5 1.5v3h3v-3h-3zM16 2h6v6h-6V2zm1.5 1.5v3h3v-3h-3z" />
                <path d="M4 4h2v2H4V4zm0 14h2v2H4v-2zm14-14h2v2h-2V4zm-6 2h2v2h-2V6zm2 4h2v2h-2v-2zm-4 4h2v2h-2v-2zm8 2h2v2h-2v-2zm-4 2h2v2h-2v-2zm4-4h2v2h-2v-2zm-6-2h2v2h-2v-2zm-4-4h2v2H8V8zm4 0h2v2h-2V8zm-2 4h2v2h-2v-2zm6 2h2v2h-2v-2zm-8 4h2v2H8v-2zm6 0h2v2h-2v-2zm4-2h2v2h-2v-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-text-primary">Publier sur Mobile</h3>
              <p className="text-[10px] text-text-secondary leading-normal mt-1 mb-2">
                Scannez ce code pour vous inscrire ou soumettre un projet depuis votre téléphone.
              </p>
              <Link to="/register" className="text-[10px] text-accent hover:underline font-bold">
                emsp-hub.vercel.app/register
              </Link>
            </div>
          </div>
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
