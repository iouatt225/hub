import { useState, useEffect, useMemo } from 'react'
import {
  Search,
  MessageSquare,
  AlertTriangle,
  EyeOff,
  Eye,
  Trash2,
  ExternalLink,
  ChevronDown,
  Flag,
  CheckCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/admin/StatCard'
import { fetchAdminComments, type AdminComment, type CommentStatus } from '@/lib/fixtures/commentaires.mock'
import { cn } from '@/lib/utils'

/** Configuration visuelle des statuts de commentaires */
const STATUS_CONFIG: Record<CommentStatus, { label: string; className: string; icon: typeof CheckCircle }> = {
  active: { label: 'Actif', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle },
  flagged: { label: 'Signalé', className: 'bg-warning/10 text-warning border-warning/20', icon: Flag },
  hidden: { label: 'Masqué', className: 'bg-neutral-100 text-neutral-500 border-neutral-200', icon: EyeOff },
}

/**
 * Page Commentaires — portail d'administration.
 * Modération des commentaires avec filtres, actions et indicateurs de signalement.
 */
export function Commentaires() {
  const [comments, setComments] = useState<AdminComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await fetchAdminComments()
      setComments(data)
      setIsLoading(false)
    }
    load()
  }, [])

  // Filtrage
  const filteredComments = useMemo(() => {
    return comments.filter(c => {
      const matchesSearch = searchQuery === '' ||
        c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [comments, searchQuery, statusFilter])

  // Stats
  const stats = useMemo(() => ({
    total: comments.length,
    active: comments.filter(c => c.status === 'active').length,
    flagged: comments.filter(c => c.status === 'flagged').length,
    hidden: comments.filter(c => c.status === 'hidden').length,
  }), [comments])

  // Actions
  const toggleVisibility = (commentId: string) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id !== commentId) return c
        const newStatus: CommentStatus = c.status === 'hidden' ? 'active' : 'hidden'
        return { ...c, status: newStatus }
      })
    )
  }

  const approveComment = (commentId: string) => {
    setComments(prev =>
      prev.map(c => c.id === commentId ? { ...c, status: 'active' as CommentStatus } : c)
    )
  }

  const deleteComment = (commentId: string) => {
    if (window.confirm('Supprimer définitivement ce commentaire ?')) {
      setComments(prev => prev.filter(c => c.id !== commentId))
    }
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Commentaires</h1>
        <p className="text-text-secondary mt-1">Modérez les commentaires et traitez les signalements</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<MessageSquare className="w-5 h-5" />}
          label="Total"
          value={stats.total}
          colorClass="bg-accent/10 text-accent"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Actifs"
          value={stats.active}
          colorClass="bg-success/10 text-success"
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Signalés"
          value={stats.flagged}
          colorClass="bg-warning/10 text-warning"
        />
        <StatCard
          icon={<EyeOff className="w-5 h-5" />}
          label="Masqués"
          value={stats.hidden}
          colorClass="bg-neutral-200/50 text-neutral-500"
        />
      </div>

      {/* Alerte signalements */}
      {stats.flagged > 0 && (
        <div className="flex items-center gap-3 p-4 bg-warning/5 border border-warning/20 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-warning">{stats.flagged} commentaire(s) signalé(s)</span> nécessitent votre attention.
          </p>
          <button
            onClick={() => setStatusFilter('flagged')}
            className="text-sm text-accent font-medium hover:underline ml-auto shrink-0"
          >
            Filtrer les signalés →
          </button>
        </div>
      )}

      {/* Tableau des commentaires */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {/* Filtres */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher par contenu, auteur ou projet..."
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
              <option value="active">Actifs</option>
              <option value="flagged">Signalés</option>
              <option value="hidden">Masqués</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>

          <span className="text-xs text-text-muted sm:ml-auto">{filteredComments.length} résultat(s)</span>
        </div>

        {/* Liste des commentaires (card-style sur mobile, tableau sur desktop) */}
        <div className="divide-y divide-border">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 py-12 text-text-muted">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent" />
              Chargement...
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="py-12 text-center text-text-muted">
              Aucun commentaire trouvé.
            </div>
          ) : (
            filteredComments.map((comment) => {
              const config = STATUS_CONFIG[comment.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={comment.id}
                  className={cn(
                    'p-4 hover:bg-surface-hover transition-colors',
                    comment.status === 'flagged' && 'bg-warning/[0.02]'
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-9 h-9 rounded-full border border-border shrink-0 mt-0.5"
                    />

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-text-primary">{comment.author.name}</span>
                        <Badge
                          variant="outline"
                          className={cn('text-[10px] px-2 py-0', config.className)}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                        <span className="text-xs text-text-muted">
                          {new Date(comment.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className={cn(
                        'text-sm leading-relaxed mb-2',
                        comment.status === 'hidden' ? 'text-text-muted italic line-through' : 'text-text-secondary'
                      )}>
                        {comment.content}
                      </p>

                      <Link
                        to={`/projet/${comment.projectId}`}
                        className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {comment.projectTitle}
                      </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      {comment.status === 'flagged' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => approveComment(comment.id)}
                          title="Approuver"
                          className="text-success hover:bg-success/10"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(comment.id)}
                        title={comment.status === 'hidden' ? 'Rendre visible' : 'Masquer'}
                        className="text-text-muted hover:text-text-primary"
                      >
                        {comment.status === 'hidden'
                          ? <Eye className="w-4 h-4" />
                          : <EyeOff className="w-4 h-4" />
                        }
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteComment(comment.id)}
                        title="Supprimer"
                        className="text-text-muted hover:text-error hover:bg-error/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
