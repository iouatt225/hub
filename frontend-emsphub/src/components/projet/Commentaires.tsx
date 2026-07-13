import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Send } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { Comment } from '@/lib/fixtures/projets.mock'

interface CommentairesProps {
  comments: Comment[]
}

export function Commentaires({ comments: initialComments }: CommentairesProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setIsSubmitting(true)
    
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 800))

    const comment: Comment = {
      id: `c-${Date.now()}`,
      author: {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
      },
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    setComments([comment, ...comments])
    setNewComment('')
    setIsSubmitting(false)
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
      {/* Formulaire d'ajout */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-4 items-start bg-surface p-4 rounded-2xl border border-border">
          <Avatar className="h-10 w-10 shrink-0 border border-border">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire constructif..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-y min-h-[80px]"
            />
            <div className="flex justify-end mt-2">
              <Button type="submit" size="sm" disabled={!newComment.trim() || isSubmitting}>
                {isSubmitting ? 'Envoi...' : <><Send className="w-4 h-4 mr-2" /> Publier</>}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-surface border border-dashed border-border rounded-2xl p-6 text-center">
          <p className="text-text-secondary text-sm mb-4">Connectez-vous pour participer à la discussion et encourager ce projet.</p>
          <Button variant="outline" size="sm" asChild>
            <a href="/">Se connecter</a>
          </Button>
        </div>
      )}

      {/* Liste des commentaires */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-text-primary">
          Commentaires ({comments.length})
        </h3>
        {comments.length === 0 ? (
          <p className="text-text-muted text-sm italic">Aucun commentaire pour le moment. Soyez le premier !</p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="h-10 w-10 shrink-0 border border-border">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-surface border border-border rounded-2xl rounded-tl-sm p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-text-primary text-sm">{comment.author.name}</span>
                      <span className="text-xs text-text-muted">{formatDate(comment.createdAt)}</span>
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
