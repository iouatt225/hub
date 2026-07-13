import { useState, useEffect } from 'react'
import { ShieldCheck, Search, Trash2, CheckCircle, ExternalLink, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { fetchProjets, type Project } from '@/lib/fixtures/projets.mock'
import { cn } from '@/lib/utils'

export function Admin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true)
      const data = await fetchProjets({ query: '', status: 'all', sortBy: 'recent' })
      setProjects(data)
      setIsLoading(false)
    }
    loadProjects()
  }, [])

  // Actions simulées
  const toggleOfficialSelection = (projectId: string) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, isOfficialSelection: !p.isOfficialSelection }
      }
      return p
    }))
  }

  const deleteProject = (projectId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) {
      setProjects(projects.filter(p => p.id !== projectId))
    }
  }

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: projects.length,
    official: projects.filter(p => p.isOfficialSelection).length,
    lookingForMembers: projects.filter(p => p.teamStatus === 'looking_for_members').length
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-hub max-w-7xl">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-text-primary">Administration</h1>
            </div>
            <p className="text-text-secondary">
              Gérez les projets déposés, modérez les contenus et définissez les sélections officielles.
            </p>
          </div>
        </div>

        {/* Statistiques Rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Projets Totaux</p>
              <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="p-3 bg-success/10 text-success rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Sélections Officielles</p>
              <p className="text-2xl font-bold text-text-primary">{stats.official}</p>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Cherchent Associés</p>
              <p className="text-2xl font-bold text-text-primary">{stats.lookingForMembers}</p>
            </div>
          </div>
        </div>

        {/* Tableau des projets */}
        <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-text-primary">Liste des projets</h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Rechercher par titre ou auteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-background-alt text-text-muted font-medium border-b border-border">
                <tr>
                  <th className="px-6 py-4">Projet</th>
                  <th className="px-6 py-4">Auteur</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Votes</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-text-muted">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent mb-2"></div>
                        Chargement...
                      </div>
                    </td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-text-muted">
                      Aucun projet trouvé.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-surface-hover transition-colors">
                      <td className="px-6 py-4 font-medium text-text-primary max-w-xs truncate">
                        <Link to={`/projet/${project.id}`} className="hover:text-accent transition-colors">
                          {project.title}
                        </Link>
                        {project.isOfficialSelection && (
                          <Badge variant="outline" className="ml-2 bg-accent/5 text-accent border-accent/20 text-[10px] px-1.5 py-0">
                            Sélection
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-text-secondary">
                        {project.author.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium border",
                          project.teamStatus === 'complete' ? "bg-success/10 text-success border-success/20" :
                          project.teamStatus === 'solo' ? "bg-background-alt text-text-secondary border-border" :
                          "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        )}>
                          {project.teamStatus === 'complete' ? 'Complet' : project.teamStatus === 'solo' ? 'Solo' : 'Cherche'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">
                        {project.votes}
                      </td>
                      <td className="px-6 py-4 text-text-secondary">
                        {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleOfficialSelection(project.id)}
                            title={project.isOfficialSelection ? "Retirer de la sélection" : "Ajouter à la sélection"}
                            className={project.isOfficialSelection ? "text-accent hover:text-accent-hover hover:bg-accent/10" : "text-text-muted hover:text-accent hover:bg-accent/10"}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="Voir le projet"
                            className="text-text-muted hover:text-text-primary"
                          >
                            <Link to={`/projet/${project.id}`}>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProject(project.id)}
                            title="Supprimer"
                            className="text-text-muted hover:text-error hover:bg-error/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
