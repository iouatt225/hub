import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Edit2, Mail, ExternalLink, Calendar, ShieldCheck, Briefcase, Link2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProjectCard } from '@/components/hub/ProjectCard'
import { EditProfilModal } from '@/components/profil/EditProfilModal'
import { useAuth } from '@/contexts/AuthContext'
import { fetchProfileById, type UserProfile } from '@/lib/fixtures/profils.mock'
import { fetchProjets, type Project } from '@/lib/fixtures/projets.mock'

export function Profil() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  
  // Si on accède à /profil/me
  const profileId = id === 'me' ? user?.id : id

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userProjects, setUserProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const isOwnProfile = user?.id === profileId

  useEffect(() => {
    async function loadData() {
      if (!profileId) return
      setIsLoading(true)
      try {
        const profileData = await fetchProfileById(profileId)
        setProfile(profileData)

        // On fetch tous les projets pour filtrer ceux où l'utilisateur est impliqué (mock)
        const allProjects = await fetchProjets({ query: '', status: 'all', sortBy: 'recent' })
        const filtered = allProjects.filter(p => p.author.id === profileId)
        setUserProjects(filtered)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [profileId])

  if (id === 'me' && !user) {
    return <Navigate to="/" replace />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background pt-24 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Profil introuvable</h2>
      </div>
    )
  }

  const roleLabels = {
    student: 'Étudiant(e)',
    jury: 'Membre du Jury',
    admin: 'Administrateur'
  }

  const formattedDate = new Date(profile.joinedAt).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-hub max-w-5xl">
        
        {/* En-tête du Profil */}
        <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 shadow-sm mb-10 relative overflow-hidden">
          {/* Décoration background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
            <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
              <AvatarImage src={profile.avatar} alt={profile.fullName} />
              <AvatarFallback className="text-4xl">{profile.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
                    {profile.fullName}
                    {profile.role === 'admin' && <ShieldCheck className="w-5 h-5 text-accent" />}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-secondary">
                    <Badge variant="secondary" className="bg-background-alt">
                      {roleLabels[profile.role]}
                    </Badge>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4" /> {profile.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Membre depuis {formattedDate}
                    </span>
                  </div>
                </div>

                {isOwnProfile && (
                  <Button onClick={() => setIsEditModalOpen(true)} variant="outline" className="gap-2 bg-background">
                    <Edit2 className="w-4 h-4" /> Modifier le profil
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Colonne latérale (Infos) */}
          <div className="space-y-8">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 border-b border-border pb-2">À propos</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {profile.bio || "Cet utilisateur n'a pas encore rédigé de biographie."}
              </p>

              <h4 className="text-sm font-bold text-text-primary mb-3">Compétences</h4>
              {profile.specialties.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.specialties.map(spec => (
                    <Badge key={spec} variant="outline" className="text-xs bg-background">
                      {spec}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-text-muted mb-6 italic">Aucune compétence renseignée.</p>
              )}

              <h4 className="text-sm font-bold text-text-primary mb-3">Liens</h4>
              <div className="space-y-3">
                {profile.links.github && (
                  <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                    <Link2 className="w-4 h-4" /> GitHub <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                )}
                {profile.links.linkedin && (
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                    <Link2 className="w-4 h-4 text-blue-500" /> LinkedIn <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                )}
                {profile.links.portfolio && (
                  <a href={profile.links.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                    <Briefcase className="w-4 h-4" /> Portfolio <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                )}
                {Object.keys(profile.links).length === 0 && (
                  <p className="text-xs text-text-muted italic">Aucun lien externe.</p>
                )}
              </div>
            </div>
          </div>

          {/* Colonne Principale (Projets) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              Projets de {profile.fullName.split(' ')[0]}
              <Badge variant="secondary" className="ml-2 bg-accent/10 text-accent">
                {userProjects.length}
              </Badge>
            </h2>

            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="bg-surface border border-dashed border-border rounded-2xl p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mb-4 text-2xl">
                  🌱
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Aucun projet</h3>
                <p className="text-text-secondary text-sm max-w-sm">
                  {isOwnProfile 
                    ? "Vous n'avez pas encore proposé ni rejoint de projet sur le Hub." 
                    : "Cet utilisateur n'a pas encore de projets liés."}
                </p>
                {isOwnProfile && (
                  <Button className="mt-6" asChild>
                    <a href="/hub/nouvelle-idee">Proposer une idée</a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <EditProfilModal 
          open={isEditModalOpen} 
          onOpenChange={setIsEditModalOpen}
          profile={profile}
          onSave={(updates) => setProfile({ ...profile, ...updates })}
        />
      )}
    </div>
  )
}
