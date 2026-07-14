import { supabase } from '@/lib/supabase'
import { MOCK_PROJECTS } from '@/lib/fixtures/projets.mock'
import type { Project, ProjectDetail, TeamStatus, ProjectThumbnail } from '@/lib/fixtures/projets.mock'
import { fetchCommentsForProject } from './comments'

export interface ProjectsFilter {
  query: string
  status: string
  sortBy: string
}

function getThumbnailForProject(tags: string[]): ProjectThumbnail {
  const defaultGradients = [
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-indigo-600',
    'from-amber-500 to-orange-600',
    'from-purple-500 to-violet-600',
    'from-cyan-500 to-blue-600',
    'from-pink-500 to-rose-600',
    'from-lime-500 to-green-600',
    'from-slate-500 to-zinc-700'
  ]
  const defaultEmojis = ['🌱', '🚗', '💳', '🤝', '🤖', '🧘', '🛒', '📡', '💡', '🚀', '🧠']

  const tagHash = tags.length > 0 ? tags[0].charCodeAt(0) : Math.floor(Math.random() * 100)
  const gradIndex = tagHash % defaultGradients.length
  const emojiIndex = tagHash % defaultEmojis.length

  return {
    gradient: defaultGradients[gradIndex],
    emoji: defaultEmojis[emojiIndex]
  }
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
      image_url,
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
    return [] // Retourner un tableau vide en cas d'erreur de base
  }

  // Mapper le retour Supabase vers l'interface Frontend `Project`
  const supabaseProjects = data.map((row: any) => ({
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
    commentCount: 0,
    createdAt: row.created_at,
    isOfficialSelection: row.is_official_selection,
    thumbnail: getThumbnailForProject(row.tags || []),
    imageUrl: row.image_url
  }))

  // Appliquer le filtrage sur le tableau
  let filtered = supabaseProjects

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(p => p.teamStatus === filters.status)
  }

  if (filters.query) {
    const q = filters.query.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.problem.toLowerCase().includes(q)
    )
  }

  // Tri
  if (filters.sortBy === 'recent') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (filters.sortBy === 'popular' || filters.sortBy === 'active') {
    filtered.sort((a, b) => b.votes - a.votes)
  }

  return filtered
}

/**
 * Récupère le détail d'un projet par son ID
 */
export async function fetchProjectById(id: string): Promise<ProjectDetail | null> {
  try {
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
        image_url,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single()

    if (error || !data) {
      throw error || new Error('Project not found in Supabase')
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
      isOfficialSelection: data.is_official_selection,
      thumbnail: getThumbnailForProject(data.tags || []),
      imageUrl: (data as any).image_url
    }

    const comments = await fetchCommentsForProject(data.id)
    return {
      ...baseProject,
      teamMembers: [
        { id: baseProject.author.id, name: baseProject.author.name, avatar: baseProject.author.avatar, role: 'Porteur du projet' }
      ],
      comments
    }
  } catch (err) {
    console.warn(`Projet ${id} non trouvé dans Supabase.`, err)
    return null
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
  imageUrl?: string
}): Promise<string | null> {
  try {
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
        is_official_selection: false,
        image_url: payload.imageUrl
      })
      .select('id')
      .single()

    if (error) {
      throw error
    }
    return data.id
  } catch (supabaseError: any) {
    console.error('Erreur Supabase lors de la création du projet:', supabaseError)
    
    // Si Supabase est configuré, on lève l'erreur pour l'afficher à l'utilisateur
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co'
    if (hasSupabase) {
      throw supabaseError
    }
    
    // Fallback local en mémoire uniquement si Supabase n'est pas configuré
    const newId = `proj-local-${Date.now()}`
    
    // Tenter de récupérer les métadonnées de l'utilisateur connecté
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData?.session?.user
    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Auteur EMSP'
    const userAvatar = user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${payload.authorId}`

    const newProject: Project = {
      id: newId,
      title: payload.title,
      problem: payload.problem,
      solution: payload.solution,
      teamStatus: payload.teamStatus,
      tags: payload.tags,
      author: {
        id: payload.authorId,
        name: userName,
        avatar: userAvatar
      },
      votes: 0,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      isOfficialSelection: false,
      thumbnail: getThumbnailForProject(payload.tags),
      imageUrl: payload.imageUrl
    }

    // Ajouter en haut de la liste locale
    MOCK_PROJECTS.unshift(newProject)
    
    return newId
  }
}

/**
 * Met à jour le statut de sélection officielle d'un projet
 */
export async function updateProjectSelection(projectId: string, isOfficial: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .update({ is_official_selection: isOfficial })
    .eq('id', projectId)

  if (error) {
    console.error('Erreur lors de la mise à jour de la sélection officielle:', error)
    return false
  }
  return true
}

/**
 * Supprime un projet de la base de données
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)

  if (error) {
    console.error('Erreur lors de la suppression du projet:', error)
    return false
  }
  return true
}

/**
 * Téléverse une image de couverture de projet vers Supabase Storage
 */
export async function uploadProjectImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
  const filePath = `covers/${fileName}`

  const { error } = await supabase.storage
    .from('project-images')
    .upload(filePath, file)

  if (error) {
    console.error('Erreur lors du téléversement de l\'image dans Supabase Storage:', error)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath)

  return publicUrl
}


