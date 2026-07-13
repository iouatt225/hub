import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ThumbsUp } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface BoutonVoteProps {
  initialVotes: number
  // Dans un vrai cas, on passerait aussi un boolean hasVoted initial
}

export function BoutonVote({ initialVotes }: BoutonVoteProps) {
  const { user } = useAuth()
  const [votes, setVotes] = useState(initialVotes)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleVote = async () => {
    if (!user) {
      alert('Veuillez vous connecter pour voter pour ce projet.')
      return
    }

    setIsLoading(true)
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (hasVoted) {
      setVotes((v) => v - 1)
      setHasVoted(false)
    } else {
      setVotes((v) => v + 1)
      setHasVoted(true)
    }
    
    setIsLoading(false)
  }

  return (
    <Button
      variant="outline"
      onClick={handleVote}
      disabled={isLoading}
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
