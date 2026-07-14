import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Send, MessageSquare } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { Comment } from '@/lib/fixtures/projets.mock'
import { createComment } from '@/lib/api/comments'

interface CommentairesProps {
  comments: Comment[]
  projectId: string
}

export function Commentaires({ comments: initialComments, projectId }: CommentairesProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setIsSubmitting(true)
    
    try {
      const comment = await createComment(projectId, user.id, newComment)
      setComments(prev => [comment, ...prev])
      setNewComment('')
    } catch (err) {
      console.error(err)
      alert("Une erreur est survenue lors de la publication de votre commentaire.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-8">
      
      {/* En-tête Commentaires */}
      <div className="flex items-center gap-2 pb-4 border-b border-border">
        <MessageSquare className="w-5 h-5 text-accent animate-pulse" />
        <h3 className="text-xl font-bold text-text-primary">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* Formulaire d'ajout de commentaire */}
      {user ? (
        <form onSubmit={handleSubmit} className="bg-background-alt rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
              <AvatarFallback className="text-xs bg-accent/10 text-accent font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-bold text-text-secondary">
              Publier en tant que <span className="text-text-primary font-extrabold">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
            </span>
          </div>

          <div className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire constructif ou une suggestion..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none min-h-[100px] leading-relaxed transition-all"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-text-muted font-medium">
                {newComment.length} caractères
              </span>
              <Button 
                type="submit" 
                size="default" 
                disabled={!newComment.trim() || isSubmitting}
                className="gap-2 font-bold"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Publication...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Commenter
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-background-alt rounded-2xl p-6 text-center">
          <p className="text-text-secondary text-sm mb-4">Connectez-vous pour participer à la discussion et soutenir ce projet.</p>
          <Button variant="outline" size="sm" asChild>
            <a href="/">Se connecter</a>
          </Button>
        </div>
      )}

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="bg-background-alt border border-border border-dashed rounded-2xl p-8 text-center text-text-muted italic text-sm">
            Aucun commentaire pour le moment. Soyez le premier à partager votre avis !
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 items-start py-4 border-b border-border/60 hover:bg-background-alt/30 transition-colors rounded-xl px-4">
                <Avatar className="h-10 w-10 shrink-0 border border-border mt-0.5">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback className="bg-accent/10 text-accent font-bold">
                    {comment.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-bold text-text-primary text-sm">{comment.author.name}</span>
                      <span className="text-[10px] text-text-muted font-medium">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-text-secondary text-sm whitespace-pre-wrap leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
