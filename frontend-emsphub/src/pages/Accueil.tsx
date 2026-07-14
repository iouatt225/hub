import { useState, useEffect } from 'react'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { FeedCard } from '@/components/feed/FeedCard'
import { FeedSidebar } from '@/components/feed/FeedSidebar'
import { fetchProjects } from '@/lib/api/projects'
import type { Project } from '@/lib/fixtures/projets.mock'
import { Loader2, Flame, Calendar, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortOption = 'trending' | 'recent' | 'most_voted'

/**
 * Page d'accueil refondue — Style Fil d'actualité (Facebook-like)
 * Affiche le HeroCompact suivi d'un feed de projets et d'une sidebar statistique.
 */
export function Accueil() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('trending')
  const [votedProjects, setVotedProjects] = useState<string[]>([])

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true)
      try {
        // Tentative de récupération depuis Supabase
        const apiFilters = {
          query: '',
          status: 'all',
          sortBy: sortBy === 'most_voted' ? 'popular' : sortBy === 'trending' ? 'active' : 'recent'
        }
        let results = await fetchProjects(apiFilters)

        setProjects(results || [])
      } catch (error) {
        console.error('Erreur de chargement des projets sur l\'accueil:', error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [sortBy])

  const handleVote = (projectId: string) => {
    setVotedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Compact supérieur */}
      <HeroCompact />

      {/* Conteneur principal layout 2 colonnes */}
      <div className="container-hub py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Colonne Feed (Gauche, 2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Barre de tri du feed */}
            <div className="bg-surface border border-border rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4">
              <span className="font-bold text-text-primary text-sm hidden sm:inline">Fil d'actualité</span>
              <div className="flex items-center gap-1 bg-background-alt border border-border rounded-xl p-1 w-full sm:w-auto">
                {([
                  { value: 'trending', label: 'Tendances', icon: Flame },
                  { value: 'recent', label: 'Récents', icon: Calendar },
                  { value: 'most_voted', label: 'Plus votés', icon: Award },
                ] as const).map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={cn(
                        'flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none',
                        sortBy === option.value
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Liste des posts (projets) */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-surface border border-border rounded-2xl">
                <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
                <p className="text-sm text-text-muted">Chargement du fil d'actualité...</p>
              </div>
            ) : projects.length > 0 ? (
              <div className="space-y-8">
                {projects.map((project) => (
                  <FeedCard
                    key={project.id}
                    project={project}
                    onVote={handleVote}
                    hasVoted={votedProjects.includes(project.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-surface border border-dashed border-border rounded-2xl">
                <span className="text-4xl mb-3">📭</span>
                <h3 className="text-base font-bold text-text-primary mb-1">Aucune publication</h3>
                <p className="text-xs text-text-muted text-center max-w-sm">
                  Aucun projet n'a encore été déposé sur la plateforme. Lisez la documentation pour vous lancer !
                </p>
              </div>
            )}
          </div>

          {/* Colonne Sidebar (Droite, 1/3) */}
          <div className="lg:col-span-1">
            <FeedSidebar />
          </div>

        </div>
      </div>
    </div>
  )
}

