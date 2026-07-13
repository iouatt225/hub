import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_TOP_PROJECTS, MOCK_TAG_STATS, MOCK_DASHBOARD_KPIS } from '@/lib/fixtures/stats.mock'
import { Flame, Award, BarChart3, Plus, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function FeedSidebar() {
  const { user } = useAuth()

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
      {/* CTA Déposer une idée */}
      {user && (
        <Card className="bg-gradient-to-br from-accent/10 to-highlight/5 border border-accent/20 rounded-2xl overflow-hidden shadow-sm">
          <CardContent className="p-5">
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
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-accent" />
            Le Hub en chiffres
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background-alt p-3 rounded-xl border border-border/50 text-center">
              <span className="text-xl font-extrabold text-text-primary block">{MOCK_DASHBOARD_KPIS.totalProjects}</span>
              <span className="text-[10px] text-text-muted font-medium">Projets</span>
            </div>
            <div className="bg-background-alt p-3 rounded-xl border border-border/50 text-center">
              <span className="text-xl font-extrabold text-text-primary block">{MOCK_DASHBOARD_KPIS.totalUsers}</span>
              <span className="text-[10px] text-text-muted font-medium">Créateurs</span>
            </div>
            <div className="bg-background-alt p-3 rounded-xl border border-border/50 text-center">
              <span className="text-xl font-extrabold text-text-primary block">{MOCK_DASHBOARD_KPIS.totalVotes}</span>
              <span className="text-[10px] text-text-muted font-medium">Votes</span>
            </div>
            <div className="bg-background-alt p-3 rounded-xl border border-border/50 text-center">
              <span className="text-xl font-extrabold text-text-primary block">{MOCK_DASHBOARD_KPIS.engagementRate}%</span>
              <span className="text-[10px] text-text-muted font-medium">Activité</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Projets */}
      <Card className="bg-surface border border-border rounded-2xl shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <Award className="w-4 h-4 text-highlight-hover" />
            Top Projets
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {MOCK_TOP_PROJECTS.slice(0, 3).map((project, idx) => (
              <Link
                key={project.id}
                to={`/projet/${project.id}`}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-background-alt transition-colors group"
              >
                <span className="text-xs font-bold text-text-muted shrink-0 w-4 text-center">#{idx + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
                    {project.title}
                  </p>
                  <p className="text-[10px] text-text-muted">{project.author}</p>
                </div>
                <span className="text-xs font-bold text-text-secondary shrink-0">{project.votes} pts</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags en tendance */}
      <Card className="bg-surface border border-border rounded-2xl shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-error" />
            Tendances
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-1.5">
            {MOCK_TAG_STATS.slice(0, 6).map((tag) => (
              <Link key={tag.name} to={`/hub?q=${tag.name}`}>
                <Badge variant="secondary" className="bg-background-alt text-text-secondary text-[10px] hover:border-accent hover:bg-accent/5 hover:text-accent font-medium py-1 transition-colors cursor-pointer border border-border/30">
                  {tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border flex justify-end">
            <Link to="/hub" className="text-[11px] text-accent hover:underline flex items-center gap-1 font-semibold">
              Tout explorer <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
