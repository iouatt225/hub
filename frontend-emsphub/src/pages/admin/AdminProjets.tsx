import { useState, useEffect, useMemo } from 'react'
import {
  Search,
  Trash2,
  CheckCircle,
  ExternalLink,
  FolderKanban,
  Award,
  AlertCircle,
  ChevronDown,
  Eye,
  EyeOff,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/admin/StatCard'
import { fetchProjets, type Project } from '@/lib/fixtures/projets.mock'
import { cn } from '@/lib/utils'

/** Labels des statuts d'équipe */
const TEAM_STATUS_LABELS: Record<string, { label: string; className: string }> = {
  complete: { label: 'Complet', className: 'bg-success/10 text-success border-success/20' },
  solo: { label: 'Solo', className: 'bg-neutral-100 text-neutral-600 border-neutral-200' },
  looking_for_members: { label: 'Cherche associés', className: 'bg-info/10 text-info border-info/20' },
}

/**
 * Page Projets — portail d'administration.
 * Gestion complète des projets : filtres avancés, labellisation, suppression, vue détail.
 */
export function AdminProjets() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectionFilter, setSelectionFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await fetchProjets({ query: '', status: 'all', sortBy: 'recent' })
      setProjects(data)
      setIsLoading(false)
    }
    load()
  }, [])

  // Filtrage combiné
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || p.teamStatus === statusFilter
      const matchesSelection = selectionFilter === 'all' ||
        (selectionFilter === 'official' && p.isOfficialSelection) ||
        (selectionFilter === 'standard' && !p.isOfficialSelection)
      return matchesSearch && matchesStatus && matchesSelection
    })
  }, [projects, searchQuery, statusFilter, selectionFilter])

  // Stats
  const stats = useMemo(() => ({
    total: projects.length,
    official: projects.filter(p => p.isOfficialSelection).length,
    looking: projects.filter(p => p.teamStatus === 'looking_for_members').length,
    totalVotes: projects.reduce((sum, p) => sum + p.votes, 0),
  }), [projects])

  // Actions
  const toggleOfficialSelection = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, isOfficialSelection: !p.isOfficialSelection } : p)
    )
    // Mettre à jour le panneau détail si ouvert
    if (selectedProject?.id === projectId) {
      setSelectedProject(prev => prev ? { ...prev, isOfficialSelection: !prev.isOfficialSelection } : null)
    }
  }

  const deleteProject = (projectId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.')) {
      setProjects(prev => prev.filter(p => p.id !== projectId))
      if (selectedProject?.id === projectId) {
        setSelectedProject(null)
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Projets</h1>
        <p className="text-text-secondary mt-1">Modérez les projets, gérez les sélections officielles et les contenus</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FolderKanban className="w-5 h-5" />}
          label="Projets totaux"
          value={stats.total}
          colorClass="bg-accent/10 text-accent"
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Sélections officielles"
          value={stats.official}
          colorClass="bg-highlight/10 text-highlight-hover"
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5" />}
          label="Cherchent associés"
          value={stats.looking}
          colorClass="bg-info/10 text-info"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Votes cumulés"
          value={stats.totalVotes}
          colorClass="bg-success/10 text-success"
        />
      </div>

      <div className="flex gap-6">
        {/* Tableau principal */}
        <div className={cn(
          'bg-surface border border-border rounded-2xl overflow-hidden flex-1 transition-all duration-300',
          selectedProject ? 'lg:max-w-[60%]' : ''
        )}>
          {/* Filtres */}
          <div className="p-4 border-b border-border flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Rechercher par titre, auteur ou tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none h-10 pl-4 pr-10 rounded-xl bg-background border border-border text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="all">Tous les statuts</option>
                <option value="solo">Solo</option>
                <option value="complete">Équipe complète</option>
                <option value="looking_for_members">Cherche associés</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectionFilter}
                onChange={(e) => setSelectionFilter(e.target.value)}
                className="appearance-none h-10 pl-4 pr-10 rounded-xl bg-background border border-border text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="all">Toutes sélections</option>
                <option value="official">Sélection officielle</option>
                <option value="standard">Non labellisé</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>

            <span className="text-xs text-text-muted lg:ml-auto">{filteredProjects.length} résultat(s)</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-background-alt text-text-muted font-medium border-b border-border">
                <tr>
                  <th className="px-5 py-3.5">Projet</th>
                  <th className="px-5 py-3.5 hidden md:table-cell">Auteur</th>
                  <th className="px-5 py-3.5 hidden sm:table-cell">Statut</th>
                  <th className="px-5 py-3.5 hidden lg:table-cell">Votes</th>
                  <th className="px-5 py-3.5 hidden lg:table-cell">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-text-muted">
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent" />
                        Chargement...
                      </div>
                    </td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-text-muted">
                      Aucun projet trouvé.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => {
                    const teamConfig = TEAM_STATUS_LABELS[project.teamStatus]
                    return (
                      <tr
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={cn(
                          'hover:bg-surface-hover transition-colors cursor-pointer',
                          selectedProject?.id === project.id && 'bg-accent/5'
                        )}
                      >
                        <td className="px-5 py-3.5 max-w-xs">
                          <p className="font-medium text-text-primary truncate">{project.title}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-background-alt text-text-muted">
                                {tag}
                              </span>
                            ))}
                            {project.isOfficialSelection && (
                              <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20 text-[10px] px-1.5 py-0">
                                ★ Sélection
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell text-text-secondary">
                          {project.author.name}
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium border', teamConfig.className)}>
                            {teamConfig.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell text-text-secondary">
                          {project.votes}
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell text-text-secondary">
                          {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleOfficialSelection(project.id)}
                              title={project.isOfficialSelection ? 'Retirer de la sélection' : 'Ajouter à la sélection'}
                              className={project.isOfficialSelection
                                ? 'text-accent hover:text-accent-hover hover:bg-accent/10'
                                : 'text-text-muted hover:text-accent hover:bg-accent/10'
                              }
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
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panneau de détail (slide-over) */}
        {selectedProject && (
          <div className="hidden lg:block w-[38%] bg-surface border border-border rounded-2xl p-6 h-fit sticky top-24 animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-text-primary pr-4">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Auteur */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedProject.author.avatar}
                alt={selectedProject.author.name}
                className="w-8 h-8 rounded-full border border-border"
              />
              <div>
                <p className="text-sm font-medium text-text-primary">{selectedProject.author.name}</p>
                <p className="text-xs text-text-muted">
                  Déposé le {new Date(selectedProject.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-background-alt text-text-secondary border border-border">
                  {tag}
                </span>
              ))}
            </div>

            {/* Infos */}
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Problématique</p>
                <p className="text-sm text-text-secondary leading-relaxed">{selectedProject.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Solution</p>
                <p className="text-sm text-text-secondary leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Stats du projet */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-background-alt rounded-xl">
                <p className="text-lg font-bold text-text-primary">{selectedProject.votes}</p>
                <p className="text-[10px] text-text-muted">Votes</p>
              </div>
              <div className="text-center p-3 bg-background-alt rounded-xl">
                <p className="text-lg font-bold text-text-primary">{selectedProject.commentCount}</p>
                <p className="text-[10px] text-text-muted">Commentaires</p>
              </div>
              <div className="text-center p-3 bg-background-alt rounded-xl">
                <p className="text-lg font-bold text-text-primary">
                  {selectedProject.isOfficialSelection ? '★' : '—'}
                </p>
                <p className="text-[10px] text-text-muted">Sélection</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant={selectedProject.isOfficialSelection ? 'default' : 'outline'}
                className="flex-1 text-sm"
                onClick={() => toggleOfficialSelection(selectedProject.id)}
              >
                {selectedProject.isOfficialSelection ? (
                  <><EyeOff className="w-4 h-4 mr-1.5" /> Retirer sélection</>
                ) : (
                  <><Eye className="w-4 h-4 mr-1.5" /> Sélection officielle</>
                )}
              </Button>
              <Button
                variant="outline"
                className="text-error border-error/30 hover:bg-error/10 text-sm"
                onClick={() => deleteProject(selectedProject.id)}
              >
                <Trash2 className="w-4 h-4 mr-1.5" /> Supprimer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
