import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { useAuth } from '@/contexts/AuthContext'
import type { Comment } from '@/lib/fixtures/projets.mock'

interface FeedCommentsProps {
  projectId: string
  comments: Comment[]
  onAddComment?: (content: string) => void
}

export function FeedComments({ comments, onAddComment }: FeedCommentsProps) {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    if (onAddComment) {
      onAddComment(newComment)
    }
    setNewComment('')
  }

  // Obtenir le nom d'affichage de l'utilisateur courant pour l'avatar
  const currentUserName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur'
  const currentUserAvatar = user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUserName}`

  return (
    <div className="mt-4 pt-4 border-t border-border space-y-4">
      {/* Liste des commentaires existants */}
      {comments.length > 0 ? (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2 text-sm bg-background-alt p-3 rounded-xl">
              <Avatar className="w-7 h-7 border border-border shrink-0 mt-0.5">
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback className="text-[9px]">{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-text-primary text-xs">{comment.author.name}</span>
                  <span className="text-[10px] text-text-muted">
                    {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-text-secondary text-xs leading-relaxed break-words">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-text-muted italic py-1">Aucun commentaire pour le moment. Soyez le premier à réagir !</p>
      )}

      {/* Formulaire d'ajout de commentaire */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <Avatar className="w-8 h-8 border border-border shrink-0">
            <AvatarImage src={currentUserAvatar} alt={currentUserName} />
            <AvatarFallback className="text-xs">{currentUserName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Écrire un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full h-9 pl-4 pr-10 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-text-muted text-text-primary"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-accent disabled:opacity-50 disabled:hover:text-text-muted transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-background-alt p-3 rounded-xl text-center text-xs text-text-muted">
          Vous devez{' '}
          <Link to="/login" className="text-accent hover:underline font-semibold">
            vous connecter
          </Link>{' '}
          pour laisser un commentaire.
        </div>
      )}
    </div>
  )
}
