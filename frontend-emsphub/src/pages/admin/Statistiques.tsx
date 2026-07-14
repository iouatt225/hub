import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Calendar } from 'lucide-react'
import {
  fetchLiveDashboardStats,
  type DailyActivity,
  type TeamStatusDistribution,
  type TagStat,
  type TopProject,
  type FiliereDistribution,
} from '@/lib/api/stats'
import { cn } from '@/lib/utils'

/** Couleurs pour les filières */
const FILIERE_COLORS = ['#556B2F', '#3b82f6', '#f59e0b', '#8b5cf6']

type TimePeriod = '7d' | '30d' | 'all'

/**
 * Page Statistiques — portail d'administration.
 * Graphiques détaillés et analytics de la plateforme.
 */
export function Statistiques() {
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([])
  const [teamDistribution, setTeamDistribution] = useState<TeamStatusDistribution[]>([])
  const [tagStats, setTagStats] = useState<TagStat[]>([])
  const [topProjects, setTopProjects] = useState<TopProject[]>([])
  const [filiereDistribution, setFiliereDistribution] = useState<FiliereDistribution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState<TimePeriod>('30d')

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await fetchLiveDashboardStats()
      setDailyActivity(data.dailyActivity)
      setTeamDistribution(data.teamDistribution)
      setTagStats(data.tagStats)
      setTopProjects(data.topProjects)
      setFiliereDistribution(data.filiereDistribution)
      setIsLoading(false)
    }
    load()
  }, [])

  // Filtrer les données selon la période sélectionnée
  const filteredActivity = (() => {
    if (period === 'all') return dailyActivity
    const days = period === '7d' ? 7 : 30
    return dailyActivity.slice(-days)
  })()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
          <p className="text-sm text-text-muted">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* En-tête avec sélecteur de période */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Statistiques</h1>
          <p className="text-text-secondary mt-1">Analytics détaillées et tendances de la plateforme</p>
        </div>

        <div className="flex items-center gap-1 bg-surface border border-border rounded-xl p-1">
          {([
            { value: '7d', label: '7 jours' },
            { value: '30d', label: '30 jours' },
            { value: 'all', label: 'Tout' },
          ] as const).map((option) => (
            <button
              key={option.value}
              onClick={() => setPeriod(option.value)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                period === option.value
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              )}
            >
              <Calendar className="w-3.5 h-3.5" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Graphique principal — Évolution inscriptions */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="text-base font-bold text-text-primary mb-1">Évolution des inscriptions et projets</h2>
        <p className="text-xs text-text-muted mb-6">Activité quotidienne sur la période sélectionnée</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredActivity}>
              <defs>
                <linearGradient id="gradInscrStat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#556B2F" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#556B2F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradProjStat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradVotesStat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                  new Date(v).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                }
              />
              <Area type="monotone" dataKey="inscriptions" stroke="#556B2F" strokeWidth={2} fill="url(#gradInscrStat)" name="Inscriptions" />
              <Area type="monotone" dataKey="projets" stroke="#3b82f6" strokeWidth={2} fill="url(#gradProjStat)" name="Projets" />
              <Area type="monotone" dataKey="votes" stroke="#f59e0b" strokeWidth={2} fill="url(#gradVotesStat)" name="Votes" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grille de graphiques secondaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tags populaires — Bar chart horizontal */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-1">Tags les plus utilisés</h2>
          <p className="text-xs text-text-muted mb-4">Top 10 des tags dans les projets</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tagStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#556B2F" radius={[0, 6, 6, 0]} name="Utilisations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Votes par projet — Bar chart vertical */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-1">Votes par projet</h2>
          <p className="text-xs text-text-muted mb-4">Top 5 des projets les plus votés</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProjects}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="title"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  tickFormatter={(v: string) => v.length > 18 ? v.slice(0, 18) + '…' : v}
                />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  labelFormatter={(v: any) => String(v)}
                />
                <Bar dataKey="votes" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Votes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition par statut d'équipe — Donut */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-1">Statuts d'équipe</h2>
          <p className="text-xs text-text-muted mb-4">Répartition des projets par type d'équipe</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teamDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
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
        </div>

        {/* Répartition par filière — Donut */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-text-primary mb-1">Utilisateurs par filière</h2>
          <p className="text-xs text-text-muted mb-4">Répartition des inscrits par domaine d'études</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filiereDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="count"
                  label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                >
                  {filiereDistribution.map((_, index) => (
                    <Cell key={index} fill={FILIERE_COLORS[index % FILIERE_COLORS.length]} />
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
          <div className="flex flex-wrap gap-4 mt-3 justify-center">
            {filiereDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FILIERE_COLORS[index % FILIERE_COLORS.length] }} />
                <span className="text-xs text-text-secondary">{entry.name} ({entry.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
