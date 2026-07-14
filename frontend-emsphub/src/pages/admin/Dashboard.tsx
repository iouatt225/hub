import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  FolderKanban,
  ThumbsUp,
  TrendingUp,
  Award,
  AlertTriangle,
  FileText,
  MessageSquare,
  UserPlus,
  Vote,
  Shield,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { StatCard } from '@/components/admin/StatCard'
import {
  fetchLiveDashboardStats,
  type DashboardKPIs,
  type DailyActivity,
  type TeamStatusDistribution,
  type TagStat,
  type TopProject,
  type RecentActivity,
} from '@/lib/api/stats'

/** Icône correspondant au type d'activité récente */
function ActivityIcon({ type }: { type: RecentActivity['type'] }) {
  switch (type) {
    case 'new_project':
      return <FileText className="w-4 h-4 text-accent" />
    case 'new_comment':
      return <MessageSquare className="w-4 h-4 text-info" />
    case 'new_user':
      return <UserPlus className="w-4 h-4 text-success" />
    case 'new_vote':
      return <Vote className="w-4 h-4 text-highlight" />
    case 'moderation':
      return <Shield className="w-4 h-4 text-warning" />
  }
}

/** Formater un timestamp en temps relatif lisible */
function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `il y a ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours}h`
  const days = Math.floor(hours / 24)
  return `il y a ${days}j`
}

/**
 * Page Dashboard — Vue d'ensemble du portail d'administration.
 * Affiche les KPIs, graphiques d'activité, projets populaires et activité récente.
 */
export function Dashboard() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null)
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([])
  const [teamDistribution, setTeamDistribution] = useState<TeamStatusDistribution[]>([])
  const [tagStats, setTagStats] = useState<TagStat[]>([])
  const [topProjects, setTopProjects] = useState<TopProject[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await fetchLiveDashboardStats()
      setKpis(data.kpis)
      setDailyActivity(data.dailyActivity)
      setTeamDistribution(data.teamDistribution)
      setTagStats(data.tagStats)
      setTopProjects(data.topProjects)
      setRecentActivity(data.recentActivity)
      setIsLoading(false)
    }
    load()
  }, [])

  if (isLoading || !kpis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
          <p className="text-sm text-text-muted">Chargement du dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Titre de la page */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">Vue d'ensemble de la plateforme Hub EMSP</p>
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Utilisateurs"
          value={kpis.totalUsers}
          variation={12}
          colorClass="bg-accent/10 text-accent"
        />
        <StatCard
          icon={<FolderKanban className="w-5 h-5" />}
          label="Projets déposés"
          value={kpis.totalProjects}
          variation={8}
          colorClass="bg-info/10 text-info"
        />
        <StatCard
          icon={<ThumbsUp className="w-5 h-5" />}
          label="Votes cumulés"
          value={kpis.totalVotes.toLocaleString('fr-FR')}
          variation={23}
          colorClass="bg-highlight/10 text-highlight-hover"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Taux d'engagement"
          value={`${kpis.engagementRate}%`}
          variation={5}
          colorClass="bg-success/10 text-success"
        />
      </div>

      {/* Alertes rapides */}
      {(kpis.pendingModeration > 0) && (
        <div className="flex items-center gap-3 p-4 bg-warning/5 border border-warning/20 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-warning">{kpis.pendingModeration} commentaire(s)</span> en attente de modération.{' '}
            <Link to="/admin/commentaires" className="text-accent hover:underline font-medium">
              Voir les commentaires signalés →
            </Link>
          </p>
        </div>
      )}

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Graphique d'activité — 2/3 de la largeur */}
        <div className="xl:col-span-2 bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-1">Activité (30 derniers jours)</h2>
          <p className="text-xs text-text-muted mb-6">Inscriptions, projets déposés et votes par jour</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyActivity}>
                <defs>
                  <linearGradient id="gradInscriptions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#556B2F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#556B2F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradProjets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  tickFormatter={(v: string) => {
                    const d = new Date(v)
                    return `${d.getDate()}/${d.getMonth() + 1}`
                  }}
                />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                  labelFormatter={(v: any) =>
                    new Date(v).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
                  }
                />
                <Area
                  type="monotone"
                  dataKey="inscriptions"
                  stroke="#556B2F"
                  strokeWidth={2}
                  fill="url(#gradInscriptions)"
                  name="Inscriptions"
                />
                <Area
                  type="monotone"
                  dataKey="projets"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#gradProjets)"
                  name="Projets"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition par statut — 1/3 */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-1">Statut des équipes</h2>
          <p className="text-xs text-text-muted mb-4">Répartition des projets</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teamDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {teamDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Légende */}
          <div className="flex flex-wrap gap-4 mt-2 justify-center">
            {teamDistribution.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-text-secondary">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section inférieure : Top projets + Tags + Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top projets */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-text-primary">Top projets</h2>
            <Award className="w-5 h-5 text-highlight" />
          </div>
          <div className="space-y-3">
            {topProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projet/${project.id}`}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover transition-colors group"
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  index === 0 ? 'bg-highlight/20 text-highlight-hover' :
                  index === 1 ? 'bg-neutral-200 text-neutral-600' :
                  'bg-neutral-100 text-neutral-500'
                }`}>
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary truncate group-hover:text-accent transition-colors">
                    {project.title}
                  </p>
                  <p className="text-xs text-text-muted">{project.author}</p>
                </div>
                <span className="text-sm font-semibold text-text-secondary shrink-0">
                  {project.votes}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tags populaires */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-4">Tags populaires</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tagStats.slice(0, 7)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#556B2F" radius={[0, 6, 6, 0]} name="Projets" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-4">Activité récente</h2>
          <div className="space-y-1">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-hover transition-colors"
              >
                <div className="p-1.5 bg-background-alt rounded-lg shrink-0 mt-0.5">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text-secondary leading-snug">
                    <span className="font-medium text-text-primary">{activity.user}</span>{' '}
                    {activity.description}
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    {timeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
