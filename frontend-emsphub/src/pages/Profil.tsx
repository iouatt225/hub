import { useState, useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Mail, Calendar, ShieldCheck, Briefcase, Link2, Globe, Lock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/contexts/AuthContext'
import { fetchProfileById, type UserProfile } from '@/lib/fixtures/profils.mock'
import { fetchProjets, type Project } from '@/lib/fixtures/projets.mock'
import { cn } from '@/lib/utils'

export function Profil() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  
  // Si on accède à /profil/me
  const profileId = id === 'me' ? user?.id : id

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userProjects, setUserProjects] = useState<Project[]>([])
  const [votedProjects, setVotedProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'projects' | 'votes'>('projects')

  const isOwnProfile = user?.id === profileId

  useEffect(() => {
    async function loadData() {
      if (!profileId) return
      setIsLoading(true)
      try {
        let profileData: UserProfile | null = null
        if (isOwnProfile && user) {
          profileData = {
            id: user.id,
            fullName: user.user_metadata?.full_name || 'Utilisateur EMSP',
            firstName: user.user_metadata?.first_name || '',
            lastName: user.user_metadata?.last_name || '',
            filiere: user.user_metadata?.filiere || 'Général',
            birthDate: user.user_metadata?.birth_date || '',
            hobbies: user.user_metadata?.hobbies || [],
            email: user.email || '',
            role: (user.user_metadata?.role as any) || 'student',
            avatar: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.id}`,
            bio: user.user_metadata?.bio || 'Aucune biographie renseignée.',
            specialties: user.user_metadata?.specialties || [],
            links: user.user_metadata?.links || {},
            joinedAt: user.created_at || new Date().toISOString()
          }
        } else {
          profileData = await fetchProfileById(profileId)
        }
        setProfile(profileData)

        if (profileData) {
          // Charger tous les projets du Hub
          const allProjects = await fetchProjets({ query: '', status: 'all', sortBy: 'recent' })
          
          // Filtrer les projets créés par cet utilisateur
          const created = allProjects.filter(p => p.author.id === profileId)
          setUserProjects(created)

          // Projets aimés/soutenus (simulé avec les votes récents ou filtres aléatoires pour la démo)
          const voted = allProjects.slice(0, 2) // On simule 2 projets aimés
          setVotedProjects(voted)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [profileId, user, isOwnProfile])

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

  // Permet d'extraire le handle d'un lien (ex: github.com/username -> username)
  const getSocialHandle = (url?: string) => {
    if (!url) return '—'
    try {
      const parsed = new URL(url)
      const path = parsed.pathname.replace(/^\//, '')
      return path || parsed.hostname
    } catch {
      return url
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-hub max-w-5xl mx-auto px-4">
        
        {/* Layout en grille à deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ─── Colonne GAUCHE (Plus large : 2/3) ─── */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Fiche Profil En-tête */}
            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <Avatar className="w-20 h-20 border-2 border-border shadow-sm">
                    <AvatarImage src={profile.avatar} alt={profile.fullName} />
                    <AvatarFallback className="text-3xl font-bold bg-accent/10 text-accent">
                      {profile.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                      {profile.fullName}
                      {profile.role === 'admin' && <ShieldCheck className="w-5 h-5 text-accent" />}
                    </h1>
                    <span className="inline-flex items-center gap-1 text-xs text-text-muted mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Inscrit en {formattedDate}
                    </span>
                  </div>
                </div>

                {isOwnProfile && (
                  <Button asChild variant="outline" className="gap-2 bg-background border-border hover:bg-surface-hover transition-colors shrink-0">
                    <Link to="/profil/modifier">
                      Modifier le profil
                    </Link>
                  </Button>
                )}
              </div>

              {/* Biographie */}
              <div className="mt-6 pt-6 border-t border-border/80">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {profile.bio || "Cet utilisateur n'a pas encore rédigé de biographie."}
                </p>
              </div>

              {/* Onglets de navigation (Tabs) */}
              <div className="flex gap-6 mt-8 border-b border-border/80 -mx-6 sm:-mx-8 px-6 sm:px-8">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={cn(
                    "pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px focus:outline-none",
                    activeTab === 'projects'
                      ? "border-accent text-accent"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  )}
                >
                  Projets ({userProjects.length})
                </button>
                <button
                  onClick={() => setActiveTab('votes')}
                  className={cn(
                    "pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px focus:outline-none",
                    activeTab === 'votes'
                      ? "border-accent text-accent"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  )}
                >
                  Votes & Soutiens ({votedProjects.length})
                </button>
              </div>
            </div>

            {/* Avertissement / Info public */}
            <div className="bg-background-alt border border-border/80 rounded-xl p-4 flex items-center gap-3">
              <Lock className="w-4 h-4 text-text-muted shrink-0" />
              <p className="text-xs text-text-secondary font-medium leading-normal">
                Les projets et votes de ce profil sont publics et visibles par l'ensemble de la communauté de l'EMSP.
              </p>
            </div>

            {/* Liste de Cartes de Projets Horizontales */}
            <div className="space-y-4">
              {activeTab === 'projects' ? (
                userProjects.length > 0 ? (
                  userProjects.map(project => (
                    <Link to={`/projet/${project.id}`} key={project.id} className="block group">
                      <div className="bg-surface border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/40 transition-all flex flex-col sm:flex-row gap-5">
                        
                        {/* Image miniature de gauche */}
                        <div className="w-full sm:w-36 h-24 rounded-xl overflow-hidden relative shrink-0 bg-background-alt border border-border/50">
                          {project.imageUrl ? (
                            <img 
                              src={project.imageUrl} 
                              alt={project.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                          ) : (
                            <div className={cn("absolute inset-0 bg-gradient-to-br flex items-center justify-center transition-transform duration-500 group-hover:scale-105", project.thumbnail.gradient)}>
                              <span className="text-4xl drop-shadow-md">{project.thumbnail.emoji}</span>
                            </div>
                          )}
                        </div>

                        {/* Contenu et statistiques de droite */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[10px] text-text-muted font-semibold flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                              <Badge variant="outline" className="text-[9px] font-semibold px-2 py-0 border-border bg-background/50">
                                {project.teamStatus === 'solo' ? 'Solo' : project.teamStatus === 'complete' ? 'Équipe Complète' : 'Cherche Associés'}
                              </Badge>
                            </div>
                            <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1 mb-1.5 leading-snug">
                              {project.title}
                            </h3>
                            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                              {project.problem}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 pt-3 mt-2 border-t border-border/40">
                            <div className="flex items-center gap-1.5">
                              <Avatar className="w-4 h-4 border border-border">
                                <AvatarImage src={project.author.avatar} />
                                <AvatarFallback className="text-[8px]">{project.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-[10px] text-text-muted font-bold">{project.author.name}</span>
                            </div>

                            <div className="flex items-center gap-3 text-text-muted">
                              <div className="flex items-center gap-1 text-[10px] font-bold">
                                <span>👍</span>
                                <span>{project.votes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] font-bold">
                                <span>💬</span>
                                <span>{project.commentCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="bg-surface border border-dashed border-border rounded-2xl p-10 text-center flex flex-col items-center">
                    <span className="text-3xl mb-3">🌱</span>
                    <h3 className="text-sm font-bold text-text-primary mb-1">Aucun projet proposé</h3>
                    <p className="text-xs text-text-secondary max-w-xs mb-4">
                      {isOwnProfile 
                        ? "Vous n'avez pas encore partagé d'idée sur le Hub." 
                        : "Cet utilisateur n'a pas encore partagé de projets."}
                    </p>
                    {isOwnProfile && (
                      <Button size="sm" asChild>
                        <Link to="/hub/nouvelle-idee">Proposer une idée</Link>
                      </Button>
                    )}
                  </div>
                )
              ) : (
                votedProjects.length > 0 ? (
                  votedProjects.map(project => (
                    <Link to={`/projet/${project.id}`} key={project.id} className="block group">
                      <div className="bg-surface border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/40 transition-all flex flex-col sm:flex-row gap-5">
                        
                        {/* Image miniature */}
                        <div className="w-full sm:w-36 h-24 rounded-xl overflow-hidden relative shrink-0 bg-background-alt border border-border/50">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <div className={cn("absolute inset-0 bg-gradient-to-br flex items-center justify-center transition-transform duration-500 group-hover:scale-105", project.thumbnail.gradient)}>
                              <span className="text-4xl drop-shadow-md">{project.thumbnail.emoji}</span>
                            </div>
                          )}
                        </div>

                        {/* Détails */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[10px] text-text-muted font-semibold flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                              <Badge variant="outline" className="text-[9px] font-semibold px-2 py-0 border-border bg-background/50">
                                {project.teamStatus === 'solo' ? 'Solo' : project.teamStatus === 'complete' ? 'Équipe Complète' : 'Cherche Associés'}
                              </Badge>
                            </div>
                            <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1 mb-1.5 leading-snug">
                              {project.title}
                            </h3>
                            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                              {project.problem}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 pt-3 mt-2 border-t border-border/40">
                            <div className="flex items-center gap-1.5">
                              <Avatar className="w-4 h-4 border border-border">
                                <AvatarImage src={project.author.avatar} />
                                <AvatarFallback className="text-[8px]">{project.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-[10px] text-text-muted font-bold">{project.author.name}</span>
                            </div>

                            <div className="flex items-center gap-3 text-text-muted">
                              <div className="flex items-center gap-1 text-[10px] font-bold">
                                <span>👍</span>
                                <span>{project.votes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] font-bold">
                                <span>💬</span>
                                <span>{project.commentCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="bg-surface border border-dashed border-border rounded-2xl p-10 text-center flex flex-col items-center">
                    <span className="text-3xl mb-3">💖</span>
                    <h3 className="text-sm font-bold text-text-primary mb-1">Aucun soutien</h3>
                    <p className="text-xs text-text-secondary max-w-xs mb-4">
                      {isOwnProfile 
                        ? "Vous n'avez pas encore voté pour de projets." 
                        : "Cet utilisateur n'a pas encore soutenu de projets."}
                    </p>
                    {isOwnProfile && (
                      <Button size="sm" asChild>
                        <Link to="/hub">Explorer les projets</Link>
                      </Button>
                    )}
                  </div>
                )
              )}
            </div>

          </div>

          {/* ─── Colonne DROITE (Plus étroite : 1/3) ─── */}
          <div className="space-y-6">
            
            {/* Card 1 : Socials */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-text-primary mb-5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                Réseaux & Contacts
              </h3>

              <div className="space-y-4">
                {/* LinkedIn */}
                <div className="flex items-center justify-between text-sm py-1.5 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Link2 className="w-4 h-4 text-[#0077b5]" />
                    <span className="font-semibold text-xs">LinkedIn</span>
                  </div>
                  {profile.links.linkedin ? (
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-accent hover:underline font-medium truncate max-w-[150px]"
                    >
                      {getSocialHandle(profile.links.linkedin)}
                    </a>
                  ) : (
                    <span className="text-xs text-text-muted font-medium">—</span>
                  )}
                </div>

                {/* GitHub */}
                <div className="flex items-center justify-between text-sm py-1.5 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Link2 className="w-4 h-4 text-text-primary" />
                    <span className="font-semibold text-xs">GitHub</span>
                  </div>
                  {profile.links.github ? (
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-accent hover:underline font-medium truncate max-w-[150px]"
                    >
                      {getSocialHandle(profile.links.github)}
                    </a>
                  ) : (
                    <span className="text-xs text-text-muted font-medium">—</span>
                  )}
                </div>

                {/* Portfolio */}
                <div className="flex items-center justify-between text-sm py-1.5 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Link2 className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-xs">Site Web</span>
                  </div>
                  {profile.links.portfolio ? (
                    <a
                      href={profile.links.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-accent hover:underline font-medium truncate max-w-[150px]"
                    >
                      {getSocialHandle(profile.links.portfolio)}
                    </a>
                  ) : (
                    <span className="text-xs text-text-muted font-medium">—</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center justify-between text-sm py-1.5 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Mail className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-xs">Email</span>
                  </div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs text-accent hover:underline font-medium truncate max-w-[150px]"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 : Profil EMSP (Filière, Hobbies, etc.) */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                Filière & Profil EMSP
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-text-muted block uppercase tracking-wider">Filière d'études</span>
                  <span className="text-sm font-semibold text-text-primary block mt-0.5">{profile.filiere || 'Général'}</span>
                </div>

                {profile.birthDate && (
                  <div>
                    <span className="text-[11px] font-bold text-text-muted block uppercase tracking-wider">Date de naissance</span>
                    <span className="text-sm font-semibold text-text-primary block mt-0.5">
                      {new Date(profile.birthDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}

                {profile.specialties.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-text-muted block uppercase tracking-wider mb-1.5">Compétences</span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.specialties.map(spec => (
                        <Badge key={spec} variant="outline" className="text-[10px] font-semibold border-border bg-background">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {profile.hobbies && profile.hobbies.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-text-muted block uppercase tracking-wider mb-1.5">Hobbies & Passions</span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.hobbies.map(hobby => (
                        <Badge key={hobby} variant="secondary" className="text-[10px] font-semibold bg-background-alt text-text-secondary">
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-bold text-text-muted block uppercase tracking-wider">Statut académique</span>
                  <Badge className="bg-success/10 text-success border-success/30 hover:bg-success/10 font-bold text-[10px] mt-1.5">
                    {roleLabels[profile.role]}
                  </Badge>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
