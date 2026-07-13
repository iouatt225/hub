/**
 * Données mockées — Statistiques pour le dashboard et la page analytics.
 * Sera remplacé par des requêtes Supabase agrégées au Bloc 16.
 */

/** Données d'activité sur 30 jours (inscriptions + projets déposés) */
export interface DailyActivity {
  date: string
  inscriptions: number
  projets: number
  votes: number
}

/** Génère des données d'activité simulées sur les 30 derniers jours */
function generateDailyActivity(): DailyActivity[] {
  const data: DailyActivity[] = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      inscriptions: Math.floor(Math.random() * 5) + (i < 7 ? 2 : 0),
      projets: Math.floor(Math.random() * 3),
      votes: Math.floor(Math.random() * 20) + 5,
    })
  }
  return data
}

export const MOCK_DAILY_ACTIVITY = generateDailyActivity()

/** KPIs globaux du dashboard */
export interface DashboardKPIs {
  totalUsers: number
  totalProjects: number
  totalVotes: number
  engagementRate: number
  newUsersThisWeek: number
  newProjectsThisWeek: number
  officialSelections: number
  pendingModeration: number
}

export const MOCK_DASHBOARD_KPIS: DashboardKPIs = {
  totalUsers: 127,
  totalProjects: 42,
  totalVotes: 1283,
  engagementRate: 73.5,
  newUsersThisWeek: 12,
  newProjectsThisWeek: 5,
  officialSelections: 8,
  pendingModeration: 2,
}

/** Répartition des projets par statut d'équipe */
export interface TeamStatusDistribution {
  name: string
  value: number
  color: string
}

export const MOCK_TEAM_DISTRIBUTION: TeamStatusDistribution[] = [
  { name: 'Solo', value: 15, color: '#94a3b8' },
  { name: 'Équipe complète', value: 12, color: '#10b981' },
  { name: 'Cherche associés', value: 15, color: '#3b82f6' },
]

/** Tags les plus utilisés */
export interface TagStat {
  name: string
  count: number
}

export const MOCK_TAG_STATS: TagStat[] = [
  { name: 'IoT', count: 12 },
  { name: 'IA', count: 10 },
  { name: 'Mobile App', count: 9 },
  { name: 'FinTech', count: 7 },
  { name: 'Soutenabilité', count: 6 },
  { name: 'Réseautage', count: 5 },
  { name: 'Blockchain', count: 4 },
  { name: 'Hardware', count: 4 },
  { name: 'Santé', count: 3 },
  { name: 'Éducation', count: 3 },
]

/** Projets les plus votés (top 5) */
export interface TopProject {
  id: string
  title: string
  votes: number
  author: string
}

export const MOCK_TOP_PROJECTS: TopProject[] = [
  { id: 'proj-4', title: 'Plateforme de mentorat Alumni-Étudiants', votes: 215, author: 'Fatou S.' },
  { id: 'proj-1', title: 'Plateforme IoT pour l\'agriculture urbaine', votes: 142, author: 'Amadou K.' },
  { id: 'proj-2', title: 'Application de covoiturage étudiant EMSP', votes: 89, author: 'Sarah M.' },
  { id: 'proj-3', title: 'Système de paiement unifié par NFC', votes: 45, author: 'Jean-Marc D.' },
  { id: 'proj-5', title: 'Chatbot assistant académique', votes: 38, author: 'Ousmane L.' },
]

/** Activité récente */
export type ActivityType = 'new_project' | 'new_comment' | 'new_user' | 'new_vote' | 'moderation'

export interface RecentActivity {
  id: string
  type: ActivityType
  description: string
  user: string
  timestamp: string
}

export const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
  {
    id: 'act-1',
    type: 'new_project',
    description: 'a déposé le projet "Chatbot assistant académique"',
    user: 'Ousmane L.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'act-2',
    type: 'new_comment',
    description: 'a commenté "Plateforme IoT pour l\'agriculture urbaine"',
    user: 'Prof. Diallo Y.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'act-3',
    type: 'new_user',
    description: 's\'est inscrit sur la plateforme',
    user: 'Kouadio B.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'act-4',
    type: 'new_vote',
    description: 'a voté pour "Application de covoiturage étudiant EMSP"',
    user: 'Aïcha T.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'act-5',
    type: 'moderation',
    description: 'a signalé un commentaire sur "Plateforme de mentorat"',
    user: 'Système',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'act-6',
    type: 'new_project',
    description: 'a déposé le projet "Application de gestion du stress"',
    user: 'Aïcha T.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'act-7',
    type: 'new_comment',
    description: 'a commenté "Système de paiement NFC"',
    user: 'Marie-Claire A.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
  },
]

/** Répartition des utilisateurs par filière */
export interface FiliereDistribution {
  name: string
  count: number
}

export const MOCK_FILIERE_DISTRIBUTION: FiliereDistribution[] = [
  { name: 'Télécoms', count: 45 },
  { name: 'Management', count: 32 },
  { name: 'Finance', count: 28 },
  { name: 'Logistique', count: 22 },
]

/**
 * Fonction mockée simulant un appel API pour récupérer les stats du dashboard.
 */
export async function fetchDashboardStats() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return {
    kpis: MOCK_DASHBOARD_KPIS,
    dailyActivity: MOCK_DAILY_ACTIVITY,
    teamDistribution: MOCK_TEAM_DISTRIBUTION,
    tagStats: MOCK_TAG_STATS,
    topProjects: MOCK_TOP_PROJECTS,
    recentActivity: MOCK_RECENT_ACTIVITY,
    filiereDistribution: MOCK_FILIERE_DISTRIBUTION,
  }
}
