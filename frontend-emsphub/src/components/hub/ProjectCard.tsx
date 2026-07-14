import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { ThumbsUp, MessageSquare, Users, User, UserPlus, Sparkles } from 'lucide-react'
import type { Project, TeamStatus } from '@/lib/fixtures/projets.mock'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
}

function StatusBadge({ status }: { status: TeamStatus }) {
  switch (status) {
    case 'solo':
      return (
        <Badge variant="outline" className="gap-1.5 font-normal text-text-secondary border-border bg-background">
          <User className="w-3.5 h-3.5" /> Solo
        </Badge>
      )
    case 'complete':
      return (
        <Badge variant="outline" className="gap-1.5 font-normal text-success border-success/30 bg-success/10">
          <Users className="w-3.5 h-3.5" /> Équipe complète
        </Badge>
      )
    case 'looking_for_members':
      return (
        <Badge variant="outline" className="gap-1.5 font-normal text-accent border-accent/30 bg-accent/10">
          <UserPlus className="w-3.5 h-3.5" /> Cherche associés
        </Badge>
      )
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projet/${project.id}`} className="block h-full group focus:outline-none focus:ring-2 focus:ring-accent rounded-xl">
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-card hover:border-accent/40 relative overflow-hidden bg-surface">
        {/* Liseré supérieur si sélection officielle */}
        {project.isOfficialSelection && (
          <div className="absolute top-0 inset-x-0 h-1 z-10 bg-gradient-to-r from-accent to-accent-hover" />
        )}

        {/* Cover Image ou Gradient Thumbnail */}
        <div className="w-full h-40 overflow-hidden relative border-b border-border bg-background-alt shrink-0">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={cn("absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center p-4 text-center transition-transform duration-500 group-hover:scale-105", project.thumbnail.gradient)}>
              <span className="text-4xl mb-2 transform transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                {project.thumbnail.emoji}
              </span>
              <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/10 font-medium opacity-90">
                Fiche Projet
              </span>
            </div>
          )}
        </div>

        <CardHeader className="p-6 pb-3">
          <div className="flex justify-between items-start gap-4 mb-2">
            <StatusBadge status={project.teamStatus} />
            {project.isOfficialSelection && (
              <Badge variant="default" className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 gap-1">
                <Sparkles className="w-3 h-3" /> Sélection
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg font-bold text-text-primary line-clamp-2 group-hover:text-accent transition-colors leading-tight">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 px-6 pb-6">
          <p className="text-sm text-text-secondary line-clamp-3 mb-4 leading-relaxed">
            {project.problem}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-background-alt text-xs font-medium">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="bg-background-alt text-xs font-medium">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 border-t border-border/80 flex justify-between items-center bg-background-alt/50">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6 border border-border/80">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback className="text-[10px]">{project.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-text-muted font-semibold">{project.author.name}</span>
          </div>

          <div className="flex items-center gap-3 text-text-muted">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{project.commentCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{project.votes}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
