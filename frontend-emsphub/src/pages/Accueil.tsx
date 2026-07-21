import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { FeedCard } from '@/components/feed/FeedCard'
import { FeedSidebar } from '@/components/feed/FeedSidebar'
import { fetchProjects, toggleVoteProject } from '@/lib/api/projects'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/lib/fixtures/projets.mock'
import { Loader2, Flame, Calendar, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortOption = 'trending' | 'recent' | 'most_voted'

/**
 * Page d'accueil refondue — Style Fil d'actualité (Facebook-like)
 * Affiche le HeroCompact suivi d'un feed de projets et d'une sidebar statistique.
 */
export function Accueil() {
  const { user } = useAuth()
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
        console.log('[Accueil.tsx] loaded projects:', results)

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

  // Charger les votes réels de l'utilisateur connecté
  useEffect(() => {
    async function loadUserLikes() {
      if (!user) {
        setVotedProjects([])
        return
      }
      try {
        const { data, error } = await supabase
          .from('votes')
          .select('project_id')
          .eq('user_id', user.id)
        if (error) throw error
        if (data) {
          setVotedProjects(data.map(d => d.project_id))
        }
      } catch (err) {
        console.error('Erreur lors du chargement des likes de l\'utilisateur:', err)
      }
    }
    loadUserLikes()
  }, [projects, user])

  const handleVote = async (projectId: string) => {
    if (!user) {
      alert('Veuillez vous connecter pour voter pour ce projet.')
      return
    }

    const hasVoted = votedProjects.includes(projectId)
    
    // UI Optimiste : Basculer l'état local du bouton de vote
    setVotedProjects(prev =>
      hasVoted
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )

    // UI Optimiste : Mettre à jour le compteur sur la liste de projets locaux
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            votes: hasVoted ? Math.max(0, p.votes - 1) : p.votes + 1
          }
        }
        return p
      })
    )

    try {
      const success = await toggleVoteProject(projectId, user.id, hasVoted)
      if (!success) {
        // Rollback de l'état local si l'enregistrement a échoué
        setVotedProjects(prev =>
          hasVoted
            ? [...prev, projectId]
            : prev.filter(id => id !== projectId)
        )
        setProjects(prevProjects =>
          prevProjects.map(p => {
            if (p.id === projectId) {
              return {
                ...p,
                votes: hasVoted ? p.votes + 1 : Math.max(0, p.votes - 1)
              }
            }
            return p
          })
        )
        alert("Une erreur est survenue lors de l'enregistrement de votre vote.")
      }
    } catch (err) {
      console.error('Erreur lors du vote:', err)
      // Rollback
      setVotedProjects(prev =>
        hasVoted
          ? [...prev, projectId]
          : prev.filter(id => id !== projectId)
      )
      setProjects(prevProjects =>
        prevProjects.map(p => {
          if (p.id === projectId) {
            return {
              ...p,
              votes: hasVoted ? p.votes + 1 : Math.max(0, p.votes - 1)
            }
          }
          return p
        })
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Compact supérieur */}
      <HeroCompact />

      {/* Stories horizontales sur mobile (projets récents de la base de données) */}
      {projects.length > 0 && (
        <div className="md:hidden flex gap-4.5 px-5 py-4.5 overflow-x-auto snap-x bg-ink border-b border-paper/10 scrollbar-none">
          {projects.slice(0, 8).map((proj) => {
            const num = proj.id.replace(/\D/g, '')
            const code = `N°${num ? num.padStart(3, '0') : proj.id.slice(0, 3).toUpperCase()}`
            return (
              <Link
                key={proj.id}
                to={`/projet/${proj.id}`}
                className="flex flex-col items-center gap-1.5 snap-start shrink-0"
              >
                <div className="w-13 h-13 rounded-full border border-highlight flex items-center justify-center text-xl bg-ink-soft relative active:scale-90 transition-transform">
                  {/* Filigrane dashed interne signature */}
                  <span className="absolute inset-1 rounded-full border border-dashed border-highlight/45 pointer-events-none" />
                  <span>{proj.thumbnail.emoji || '🌱'}</span>
                </div>
                <span className="font-mono text-[9px] text-paper/60 text-center tracking-wide font-medium">
                  {code}
                </span>
              </Link>
            )
          })}
        </div>
      )}

      {/* Conteneur principal layout 2 colonnes */}
      <div className="container-hub py-6 md:py-16">
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

