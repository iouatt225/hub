import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { UserPlus, Users, User } from 'lucide-react'
import type { TeamMember, TeamStatus } from '@/lib/fixtures/projets.mock'

interface EquipeProjetProps {
  status: TeamStatus
  members: TeamMember[]
}

export function EquipeProjet({ status, members }: EquipeProjetProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-primary">L'équipe</h3>
        
        {/* Badge de statut */}
        {status === 'looking_for_members' && (
          <Badge variant="outline" className="text-accent border-accent/30 bg-accent/10">
            <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Cherche associés
          </Badge>
        )}
        {status === 'complete' && (
          <Badge variant="outline" className="text-success border-success/30 bg-success/10">
            <Users className="w-3.5 h-3.5 mr-1.5" /> Équipe complète
          </Badge>
        )}
        {status === 'solo' && (
          <Badge variant="outline" className="text-text-secondary border-border">
            <User className="w-3.5 h-3.5 mr-1.5" /> Projet Solo
          </Badge>
        )}
      </div>

      <div className="space-y-4 mb-6">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-hover transition-colors">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-text-primary text-sm">{member.name}</p>
              <p className="text-xs text-text-muted">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {status === 'looking_for_members' && (
        <Button className="w-full" variant="default">
          Contacter l'équipe
        </Button>
      )}
    </div>
  )
}
