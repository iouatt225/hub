import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { ThumbsUp, MessageSquare, ExternalLink } from 'lucide-react'
import { FeedComments } from './FeedComments'
import type { Project, TeamStatus, Comment } from '@/lib/fixtures/projets.mock'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface FeedCardProps {
  project: Project
  onVote: (projectId: string) => void
  hasVoted: boolean
}

function StatusBadge({ status }: { status: TeamStatus }) {
  switch (status) {
    case 'solo':
      return (
        <span className="font-mono text-[10px] uppercase tracking-wider border border-cancel text-cancel bg-cancel-light/20 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
          Solo
        </span>
      )
    case 'complete':
      return (
        <span className="font-mono text-[10px] uppercase tracking-wider border border-route text-route bg-route-light/20 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
          Équipe complète
        </span>
      )
    case 'looking_for_members':
      return (
        <span className="font-mono text-[10px] uppercase tracking-wider border border-postmark-deep text-postmark-deep bg-highlight-light px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
          Cherche associés
        </span>
      )
  }
}

export function FeedCard({ project, onVote, hasVoted }: FeedCardProps) {
  const { user } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: `c-mock-1-${project.id}`,
      author: { id: 'usr-prof', name: 'Dr. Koné (Enseignant)', avatar: 'https://i.pravatar.cc/150?u=kone' },
      content: 'Excellente idée ! Est-ce que vous avez prévu un prototype pour la Journée du Numérique ?',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    ...(project.commentCount > 1 ? [{
      id: `c-mock-2-${project.id}`,
      author: { id: 'usr-student', name: 'Jean-Marc D.', avatar: 'https://i.pravatar.cc/150?u=jeanmarc' },
      content: 'Je suis très intéressé par le projet. Si vous cherchez un développeur, je suis disponible !',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    }] : [])
  ])

  const handleAddComment = (content: string) => {
    const newCommentObj: Comment = {
      id: `c-${Date.now()}`,
      author: {
        id: user?.id || 'anon',
        name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur',
        avatar: user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`
      },
      content,
      createdAt: new Date().toISOString()
    }
    setComments(prev => [...prev, newCommentObj])
  }

  // Formatage de la date relative
  const formatDate = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 60) return `il y a ${minutes} min`
    const hours = Math.floor(minutes / 3600000)
    if (hours < 24) return `il y a ${hours}h`
    const days = Math.floor(hours / 24)
    return `il y a ${days}j`
  }

  return (
    <Card className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow transition-shadow">
      {/* Liseré supérieur si sélection officielle */}
      {project.isOfficialSelection && (
        <div className="h-1.5 bg-gradient-to-r from-accent to-highlight" />
      )}

      <CardContent className="p-5 sm:p-6 lg:p-7">
        {/* En-tête : Auteur + Date + Badges */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-border">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-text-primary text-sm">{project.author.name}</span>
                <span className="text-xs text-text-muted">•</span>
                <span className="text-xs text-text-muted">{formatDate(project.createdAt)}</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">Porteur de projet</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <StatusBadge status={project.teamStatus} />
            {project.isOfficialSelection && (
              <span className="font-mono text-[10px] uppercase tracking-wider border border-highlight text-postmark-deep bg-highlight-light px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                Sélection
              </span>
            )}
          </div>
        </div>

        {/* Titre & Description du projet */}
        <div className="space-y-4 mb-6">
          <h2 className="text-lg sm:text-xl font-medium text-text-primary leading-snug hover:text-accent transition-colors font-display">
            <Link to={`/projet/${project.id}`}>{project.title}</Link>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {project.problem}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] bg-route-light text-route px-2.5 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Miniature / Capture d'écran simulée (Facebook-style) */}
        <Link to={`/projet/${project.id}`} className="block relative aspect-video rounded-xl overflow-hidden mb-6 border border-border group bg-background-alt">
          {project.imageUrl ? (
            <>
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between z-10">
                <span className="text-white text-xs sm:text-sm font-bold truncate pr-4 drop-shadow-md">
                  {project.title}
                </span>
                <span className="text-[10px] bg-accent text-white px-2.5 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap shrink-0">
                  Voir le projet
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 bg-ink flex flex-col items-center justify-center p-5 text-center transition-transform duration-500 group-hover:scale-102">
              <div className="postmark-stamp border-postmark text-postmark mb-3.5">
                <span className="text-3xl">{project.thumbnail.emoji || '🌱'}</span>
              </div>
              <div className="font-mono text-[10px] text-paper/55 tracking-widest uppercase mb-1.5">
                EMSP • N°{project.id.replace(/\D/g, '').padStart(3, '0') || project.id.slice(0, 5).toUpperCase()}
              </div>
              <h3 className="font-display font-medium text-paper text-base sm:text-lg max-w-md line-clamp-1 px-4 leading-snug">
                {project.title}
              </h3>
              <span className="mt-3.5 text-[10px] font-mono tracking-wider uppercase bg-paper/8 border border-paper/15 text-paper/75 hover:bg-paper/15 px-3 py-1 rounded-md transition-colors">
                Voir la fiche pli
              </span>
            </div>
          )}
        </Link>

        {/* Compteurs de réactions */}
        <div className="flex items-center justify-between text-xs text-text-muted pb-4 border-b border-border mb-2">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-[10px] text-accent">👍</span>
            </div>
            <span className="font-medium">{project.votes + (hasVoted ? 1 : 0)} votes</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowComments(!showComments)} className="hover:underline font-medium">
              {comments.length} commentaires
            </button>
          </div>
        </div>

        {/* Boutons d'actions */}
        <div className="grid grid-cols-3 gap-1 pt-3">
          <button
            onClick={() => onVote(project.id)}
            className={cn(
              "flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-colors focus:outline-none",
              hasVoted
                ? "text-accent bg-accent/5 hover:bg-accent/10"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
            )}
          >
            <ThumbsUp className={cn("w-4 h-4", hasVoted && "fill-accent stroke-accent")} />
            <span>Voter</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className={cn(
              "flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors focus:outline-none",
              showComments && "text-accent bg-accent/5"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Réagir</span>
          </button>

          <Link
            to={`/projet/${project.id}`}
            className="flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ouvrir</span>
          </Link>
        </div>

        {/* Section commentaires dépliante */}
        {showComments && (
          <FeedComments
            projectId={project.id}
            comments={comments}
            onAddComment={handleAddComment}
          />
        )}
      </CardContent>
    </Card>
  )
}
