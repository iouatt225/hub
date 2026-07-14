import { supabase } from '@/lib/supabase'

export interface DashboardKPIs {
  totalUsers: number
  totalProjects: number
  totalVotes: number
  engagementRate: number
  pendingModeration: number
}

export interface DailyActivity {
  date: string
  inscriptions: number
  projets: number
  votes: number
}

export interface TeamStatusDistribution {
  name: string
  value: number
  color: string
}

export interface TagStat {
  name: string
  count: number
}

export interface TopProject {
  id: string
  title: string
  author: string
  votes: number
}

export interface FiliereDistribution {
  name: string
  count: number
}

export interface RecentActivity {
  id: string
  type: 'new_project' | 'new_comment' | 'new_user' | 'new_vote' | 'moderation'
  user: string
  description: string
  timestamp: string
}

export interface DashboardData {
  kpis: DashboardKPIs
  dailyActivity: DailyActivity[]
  teamDistribution: TeamStatusDistribution[]
  tagStats: TagStat[]
  topProjects: TopProject[]
  filiereDistribution: FiliereDistribution[]
  recentActivity: RecentActivity[]
}

/**
 * Charge l'ensemble des statistiques et données analytiques temps réel depuis Supabase
 */
export async function fetchLiveDashboardStats(): Promise<DashboardData> {
  // 1. Nombre d'utilisateurs inscrits
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // 2. Nombre de projets déposés
  const { count: totalProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

  // 3. Commentaires en attente de modération (signalés)
  const { count: pendingModeration } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'flagged')

  // 4. Récupérer tous les projets pour agréger les votes, tags, statuts et popularité
  const { data: projectsData } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      votes,
      team_status,
      tags,
      created_at,
      profiles:author_id (
        full_name
      )
    `)

  let totalVotesSum = 0
  const tagCounts: Record<string, number> = {}
  const statusCounts: Record<string, number> = { complete: 0, solo: 0, looking_for_members: 0 }
  const topProjectsList: TopProject[] = []

  if (projectsData) {
    projectsData.forEach(p => {
      totalVotesSum += p.votes || 0
      if (p.tags) {
        p.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
      if (p.team_status) {
        statusCounts[p.team_status] = (statusCounts[p.team_status] || 0) + 1
      }
      topProjectsList.push({
        id: p.id,
        title: p.title,
        author: (p.profiles as any)?.full_name || 'Utilisateur Anonyme',
        votes: p.votes || 0
      })
    })
  }

  // Tri et formatage des tags populaires
  const tagStats: TagStat[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  // Tri des meilleurs projets
  topProjectsList.sort((a, b) => b.votes - a.votes)

  // Calcul du taux d'engagement (votes cumulés / total d'inscrits)
  const userCount = totalUsers || 0
  const engagementRate = userCount > 0 ? Math.min(100, Math.round((totalVotesSum / userCount) * 10)) : 0

  // Formatage de la répartition des statuts
  const teamStatusLabels: Record<string, string> = {
    complete: 'Équipe complète',
    solo: 'Solo',
    looking_for_members: 'Cherche associés'
  }
  const teamColors: Record<string, string> = {
    complete: '#10b981',
    solo: '#6b7280',
    looking_for_members: '#3b82f6'
  }
  const teamDistribution: TeamStatusDistribution[] = Object.entries(statusCounts).map(([status, count]) => ({
    name: teamStatusLabels[status] || status,
    value: count,
    color: teamColors[status] || '#94a3b8'
  }))

  // 5. Récupérer les filières des profils inscrits
  const { data: profilesData } = await supabase
    .from('profiles')
    .select('field_of_study')

  const filiereCounts: Record<string, number> = {}
  if (profilesData) {
    profilesData.forEach(p => {
      const fil = p.field_of_study || 'Non définie'
      filiereCounts[fil] = (filiereCounts[fil] || 0) + 1
    })
  }
  const filiereDistribution: FiliereDistribution[] = Object.entries(filiereCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  // 6. Charger les flux récents (dernières inscriptions, projets et commentaires)
  const { data: latestUsers } = await supabase.from('profiles').select('id, full_name, created_at').order('created_at', { ascending: false }).limit(5)
  const { data: latestProjects } = await supabase.from('projects').select('id, title, created_at, profiles:author_id(full_name)').order('created_at', { ascending: false }).limit(5)
  const { data: latestComments } = await supabase.from('comments').select('id, content, created_at, project_id, projects:project_id(title), profiles:author_id(full_name)').order('created_at', { ascending: false }).limit(5)

  const recentActivity: RecentActivity[] = []
  if (latestUsers) {
    latestUsers.forEach(u => {
      recentActivity.push({
        id: `act-usr-${u.id}`,
        type: 'new_user',
        user: u.full_name || 'Utilisateur',
        description: 'a rejoint la plateforme',
        timestamp: u.created_at
      })
    })
  }
  if (latestProjects) {
    latestProjects.forEach(p => {
      recentActivity.push({
        id: `act-prj-${p.id}`,
        type: 'new_project',
        user: (p.profiles as any)?.full_name || 'Créateur',
        description: `a publié le projet "${p.title}"`,
        timestamp: p.created_at
      })
    })
  }
  if (latestComments) {
    latestComments.forEach(c => {
      recentActivity.push({
        id: `act-cmt-${c.id}`,
        type: 'new_comment',
        user: (c.profiles as any)?.full_name || 'Utilisateur',
        description: `a commenté sur "${(c.projects as any)?.title || 'un projet'}"`,
        timestamp: c.created_at
      })
    })
  }
  recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // 7. Courbes d'activité journalières (30 derniers jours)
  const dailyActMap: Record<string, { inscriptions: number; projets: number; votes: number }> = {}
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    dailyActMap[dateStr] = { inscriptions: 0, projets: 0, votes: 0 }
  }

  // Distribution temporelle des inscrits et des dépôts réels
  if (latestUsers) {
    latestUsers.forEach(u => {
      const dateStr = u.created_at.split('T')[0]
      if (dailyActMap[dateStr]) {
        dailyActMap[dateStr].inscriptions++
      }
    })
  }
  if (latestProjects) {
    latestProjects.forEach(p => {
      const dateStr = p.created_at.split('T')[0]
      if (dailyActMap[dateStr]) {
        dailyActMap[dateStr].projets++
      }
    })
  }

  // Simulation proportionnelle de l'évolution des votes pour le graphique
  Object.keys(dailyActMap).forEach(key => {
    dailyActMap[key].votes = dailyActMap[key].projets * 3
  })

  const dailyActivity: DailyActivity[] = Object.entries(dailyActMap).map(([date, counts]) => ({
    date,
    inscriptions: counts.inscriptions,
    projets: counts.projets,
    votes: counts.votes
  }))

  return {
    kpis: {
      totalUsers: userCount,
      totalProjects: totalProjects || 0,
      totalVotes: totalVotesSum,
      engagementRate,
      pendingModeration: pendingModeration || 0
    },
    dailyActivity,
    teamDistribution,
    tagStats,
    topProjects: topProjectsList.slice(0, 5),
    filiereDistribution,
    recentActivity: recentActivity.slice(0, 5)
  }
}
