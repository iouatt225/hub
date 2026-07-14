import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Flame, Award, BarChart3, Plus, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface TopProject {
  id: string
  title: string
  author: string
  votes: number
}

interface TagStat {
  name: string
  count: number
}

export function FeedSidebar() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalUsers: 0,
    totalVotes: 0,
    activityRate: 0
  })
  const [topProjects, setTopProjects] = useState<TopProject[]>([])
  const [trendingTags, setTrendingTags] = useState<TagStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        // 1. Charger le nombre de projets
        const { count: projCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })

        // 2. Charger le nombre d'utilisateurs (profils)
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // 3. Charger tous les projets pour compter les votes et les tags
        const { data: allProjects } = await supabase
          .from('projects')
          .select(`
            id,
            title,
            votes,
            tags,
            profiles:author_id (
              full_name
            )
          `)

        let voteSum = 0
        const tagCounts: Record<string, number> = {}
        const mappedTopProjects: TopProject[] = []

        if (allProjects) {
          allProjects.forEach(p => {
            voteSum += p.votes || 0
            if (p.tags) {
              p.tags.forEach((tag: string) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1
              })
            }
            mappedTopProjects.push({
              id: p.id,
              title: p.title,
              author: (p.profiles as any)?.full_name || 'Utilisateur Anonyme',
              votes: p.votes || 0
            })
          });

          // Trier pour avoir le Top Projets
          mappedTopProjects.sort((a, b) => b.votes - a.votes)
        }

        // Trier les tags par occurrence
        const sortedTags = Object.entries(tagCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)

        // Calculer un taux d'activité indicatif
        const totalProj = projCount || 0
        const totalUsr = userCount || 0
        const activityRate = totalUsr > 0 ? Math.min(100, Math.round((totalProj / totalUsr) * 100)) : 0

        setStats({
          totalProjects: totalProj,
          totalUsers: totalUsr,
          totalVotes: voteSum,
          activityRate
        })
        setTopProjects(mappedTopProjects.slice(0, 3))
        setTrendingTags(sortedTags.slice(0, 6))
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques du sidebar:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <aside className="space-y-8 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
      {/* CTA Déposer une idée */}
      {user && (
        <Card className="bg-gradient-to-br from-accent/10 to-highlight/5 border border-accent/20 rounded-2xl overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-bold text-text-primary text-base mb-2">Une idée de projet ? 💡</h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              Publiez votre idée sur le Hub en moins de 2 minutes pour la Journée du Numérique.
            </p>
            <Button size="sm" className="w-full bg-accent hover:bg-accent-hover text-white rounded-xl text-xs py-2 h-9 font-bold" asChild>
              <Link to="/hub/nouvelle-idee">
                <Plus className="w-4 h-4 mr-1.5" />
                Lancer mon idée
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Cartes Stats rapides */}
      <Card className="bg-surface border border-border rounded-2xl shadow-sm">
        <CardHeader className="pb-4 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-accent" />
            Le Hub en chiffres
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          {isLoading ? (
            <div className="py-4 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-alt p-3.5 rounded-xl border border-border/50 text-center">
                <span className="text-xl font-extrabold text-text-primary block mb-0.5">{stats.totalProjects}</span>
                <span className="text-[10px] text-text-muted font-medium">Projets</span>
              </div>
              <div className="bg-background-alt p-3.5 rounded-xl border border-border/50 text-center">
                <span className="text-xl font-extrabold text-text-primary block mb-0.5">{stats.totalUsers}</span>
                <span className="text-[10px] text-text-muted font-medium">Créateurs</span>
              </div>
              <div className="bg-background-alt p-3.5 rounded-xl border border-border/50 text-center">
                <span className="text-xl font-extrabold text-text-primary block mb-0.5">{stats.totalVotes}</span>
                <span className="text-[10px] text-text-muted font-medium">Votes</span>
              </div>
              <div className="bg-background-alt p-3.5 rounded-xl border border-border/50 text-center">
                <span className="text-xl font-extrabold text-text-primary block mb-0.5">{stats.activityRate}%</span>
                <span className="text-[10px] text-text-muted font-medium">Activité</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Projets */}
      <Card className="bg-surface border border-border rounded-2xl shadow-sm">
        <CardHeader className="pb-4 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <Award className="w-4 h-4 text-highlight-hover" />
            Top Projets
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          {isLoading ? (
            <div className="py-4 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
            </div>
          ) : topProjects.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-2">Aucun projet pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {topProjects.map((project, idx) => (
                <Link
                  key={project.id}
                  to={`/projet/${project.id}`}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-background-alt transition-colors group"
                >
                  <span className="text-xs font-bold text-text-muted shrink-0 w-4 text-center">#{idx + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
                      {project.title}
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">{project.author}</p>
                  </div>
                  <span className="text-xs font-bold text-text-secondary shrink-0 ml-1">{project.votes} pts</span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tags en tendance */}
      <Card className="bg-surface border border-border rounded-2xl shadow-sm">
        <CardHeader className="pb-4 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-error" />
            Tendances
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          {isLoading ? (
            <div className="py-4 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
            </div>
          ) : trendingTags.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-2">Aucun tag utilisé.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <Link key={tag.name} to={`/hub?q=${tag.name}`}>
                  <Badge variant="secondary" className="bg-background-alt text-text-secondary text-[10px] hover:border-accent hover:bg-accent/5 hover:text-accent font-medium py-1 px-2.5 transition-colors cursor-pointer border border-border/30">
                    {tag.name} ({tag.count})
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-5 pt-4 border-t border-border flex justify-end">
            <Link to="/hub" className="text-[11px] text-accent hover:underline flex items-center gap-1 font-semibold">
              Tout explorer <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
