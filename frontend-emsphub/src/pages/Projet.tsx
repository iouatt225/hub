import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Calendar, User as UserIcon, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { EquipeProjet } from '@/components/projet/EquipeProjet'
import { Commentaires } from '@/components/projet/Commentaires'
import { BoutonVote } from '@/components/projet/BoutonVote'
import { fetchProjectById } from '@/lib/api/projects'
import type { ProjectDetail } from '@/lib/fixtures/projets.mock'

export function Projet() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadProject() {
      if (!id) return
      setIsLoading(true)
      try {
        const data = await fetchProjectById(id)
        if (data) {
          setProject(data)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadProject()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background pt-24 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Projet introuvable</h2>
        <Link to="/hub" className="text-accent hover:underline">
          Retourner au Hub
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-hub max-w-5xl">
        
        {/* Navigation retour */}
        <Link to="/hub" className="inline-flex items-center text-sm font-medium text-text-muted hover:text-text-primary transition-colors mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" /> Retour au Hub
        </Link>

        {/* En-tête du projet */}
        <div className="mb-12">
          {project.isOfficialSelection && (
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 gap-1.5 mb-4 px-3 py-1 text-sm font-medium">
              <Sparkles className="w-4 h-4" /> Sélection Officielle
            </Badge>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-text-muted" />
              <span>Proposé par <span className="font-medium text-text-primary">{project.author.name}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-muted" />
              <span>Publié le {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Cover Image du Projet */}
        {project.imageUrl && (
          <div className="w-full h-80 sm:h-96 md:h-[420px] overflow-hidden rounded-3xl mb-12 border border-border shadow-sm bg-background-alt">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Colonne Principale (Gauche) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section Problème */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-error/10 text-error text-sm font-bold">1</span>
                Le Problème
              </h2>
              <div className="pl-6 border-l-4 border-error/70 text-text-secondary leading-relaxed text-lg py-1.5">
                {project.problem}
              </div>
            </section>

            {/* Section Solution */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10 text-success text-sm font-bold">2</span>
                La Solution
              </h2>
              <div className="pl-6 border-l-4 border-success/70 text-text-secondary leading-relaxed text-lg py-1.5">
                {project.solution}
              </div>
            </section>

            {/* Tags */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-text-primary">Mots-clés</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-background-alt text-sm px-3 py-1 font-semibold text-text-secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Visuel Separator */}
            <div className="h-px bg-border w-full" />

            {/* Commentaires */}
            <section id="commentaires">
              <Commentaires comments={project.comments} projectId={project.id} />
            </section>

          </div>

          {/* Colonne Latérale (Droite) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Call to action principal : Le Vote */}
            <div className="bg-background-alt rounded-2xl p-6 sticky top-24 space-y-5">
              <div>
                <h3 className="text-base font-bold text-text-primary mb-1">Soutenir ce projet</h3>
                <p className="text-xs text-text-secondary leading-normal">
                  Aidez ce projet à atteindre ses objectifs pour attirer l'attention du jury d'incubation.
                </p>
              </div>

              {/* Barre de progression d'incubation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-text-secondary">Objectif Incubation</span>
                  <span className="text-accent">{project.votes} / 100 votes</span>
                </div>
                <div className="w-full h-2 bg-background border border-border/40 rounded-full overflow-hidden">
                  <div 
                    className="bg-accent h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (project.votes / 100) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <BoutonVote projectId={project.id} initialVotes={project.votes} />
              </div>
            </div>

            {/* Équipe */}
            <EquipeProjet status={project.teamStatus} members={project.teamMembers} />

          </div>
        </div>

      </div>
    </div>
  )
}
