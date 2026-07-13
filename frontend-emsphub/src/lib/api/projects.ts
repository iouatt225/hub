import { supabase } from '@/lib/supabase'
import type { Project, ProjectDetail, TeamStatus } from '@/lib/fixtures/projets.mock'

export interface ProjectsFilter {
  query: string
  status: string
  sortBy: string
}

/**
 * Récupère la liste des projets depuis Supabase
 */
export async function fetchProjects(filters: ProjectsFilter): Promise<Project[]> {
  let query = supabase
    .from('projects')
    .select(`
      id,
      title,
      problem,
      solution,
      team_status,
      tags,
      votes,
      is_official_selection,
      created_at,
      profiles:author_id (
        id,
        full_name,
        avatar_url
      )
    `)

  // Filtre de statut
  if (filters.status && filters.status !== 'all') {
    query = query.eq('team_status', filters.status)
  }

  // Recherche par mot-clé (titre ou problème)
  if (filters.query) {
    query = query.or(`title.ilike.%${filters.query}%,problem.ilike.%${filters.query}%`)
  }

  // Tri
  if (filters.sortBy === 'recent') {
    query = query.order('created_at', { ascending: false })
  } else if (filters.sortBy === 'popular') {
    query = query.order('votes', { ascending: false })
  } else if (filters.sortBy === 'active') {
    // Si on avait un critère d'activité, on l'utiliserait. Sinon fallback sur les votes ou dates.
    query = query.order('votes', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Erreur fetchProjects:', error)
    return [] // Retour vide silencieux pour le front, on pourrait aussi throw
  }

  // Mapper le retour Supabase vers l'interface Frontend `Project`
  return data.map((row: any) => ({
    id: row.id,
    title: row.title,
    problem: row.problem,
    solution: row.solution,
    teamStatus: row.team_status as TeamStatus,
    tags: row.tags || [],
    author: {
      id: row.profiles?.id || 'inconnu',
      name: row.profiles?.full_name || 'Utilisateur Anonyme',
      avatar: row.profiles?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${row.id}`
    },
    votes: row.votes || 0,
    commentCount: 0, // À implémenter plus tard avec une table de commentaires
    createdAt: row.created_at,
    isOfficialSelection: row.is_official_selection
  }))
}

/**
 * Récupère le détail d'un projet par son ID
 */
export async function fetchProjectById(id: string): Promise<ProjectDetail | null> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      problem,
      solution,
      team_status,
      tags,
      votes,
      is_official_selection,
      created_at,
      profiles:author_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('Erreur fetchProjectById:', error)
    return null
  }

  // Mapping de base
  const baseProject: Project = {
    id: data.id,
    title: data.title,
    problem: data.problem,
    solution: data.solution,
    teamStatus: data.team_status as TeamStatus,
    tags: data.tags || [],
    author: {
      id: (data.profiles as any)?.id || 'inconnu',
      name: (data.profiles as any)?.full_name || 'Utilisateur Anonyme',
      avatar: (data.profiles as any)?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${data.id}`
    },
    votes: data.votes || 0,
    commentCount: 0,
    createdAt: data.created_at,
    isOfficialSelection: data.is_official_selection
  }

  // Pour l'instant, on mock l'équipe et les commentaires car les tables
  // team_members et comments ne sont pas encore formellement créées.
  return {
    ...baseProject,
    teamMembers: [
      { id: baseProject.author.id, name: baseProject.author.name, avatar: baseProject.author.avatar, role: 'Porteur du projet' }
    ],
    comments: []
  }
}

/**
 * Crée un nouveau projet dans la base
 */
export async function createProject(payload: {
  title: string
  problem: string
  solution: string
  teamStatus: TeamStatus
  tags: string[]
  authorId: string
}): Promise<string | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      title: payload.title,
      problem: payload.problem,
      solution: payload.solution,
      team_status: payload.teamStatus,
      tags: payload.tags,
      author_id: payload.authorId,
      votes: 0,
      is_official_selection: false
    })
    .select('id')
    .single()

  if (error) {
    console.error('Erreur createProject:', error)
    throw error
  }

  return data.id
}
