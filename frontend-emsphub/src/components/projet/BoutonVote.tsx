import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ThumbsUp } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { checkIfUserVoted, toggleVoteProject } from '@/lib/api/projects'

interface BoutonVoteProps {
  projectId: string
  initialVotes: number
}

export function BoutonVote({ projectId, initialVotes }: BoutonVoteProps) {
  const { user } = useAuth()
  const [votes, setVotes] = useState(initialVotes)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)

  // Charger le statut du vote au chargement
  useEffect(() => {
    async function loadVoteStatus() {
      if (!user) {
        setIsLoading(false)
        return
      }
      try {
        const voted = await checkIfUserVoted(projectId, user.id)
        setHasVoted(voted)
      } catch (err) {
        console.error('Erreur lors du chargement du statut de vote:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadVoteStatus()
  }, [projectId, user])

  // Mettre à jour le compteur local si la prop initialVotes change
  useEffect(() => {
    setVotes(initialVotes)
  }, [initialVotes])

  const handleVote = async () => {
    if (!user) {
      alert('Veuillez vous connecter pour voter pour ce projet.')
      return
    }

    setIsVoting(true)
    try {
      const success = await toggleVoteProject(projectId, user.id, hasVoted)
      if (success) {
        if (hasVoted) {
          setVotes((v) => Math.max(0, v - 1))
          setHasVoted(false)
        } else {
          setVotes((v) => v + 1)
          setHasVoted(true)
        }
      } else {
        alert("Une erreur est survenue lors de l'enregistrement de votre vote.")
      }
    } catch (err) {
      console.error('Erreur lors du vote:', err)
      alert("Une erreur est survenue lors de l'enregistrement de votre vote.")
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleVote}
      disabled={isLoading || isVoting}
      className={cn(
        "gap-2 transition-all min-w-[100px]",
        hasVoted 
          ? "bg-accent/10 text-accent border-accent/50 hover:bg-accent/20" 
          : "hover:bg-surface-hover text-text-secondary"
      )}
    >
      <ThumbsUp className={cn("w-5 h-5", hasVoted && "fill-accent")} />
      <span className="font-bold text-lg">{votes}</span>
    </Button>
  )
}

