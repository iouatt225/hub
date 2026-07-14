import { supabase } from '@/lib/supabase'

export interface CommentAuthor {
  id: string
  name: string
  avatar: string
}

export interface ProjectComment {
  id: string
  content: string
  createdAt: string
  author: CommentAuthor
}

export interface AdminComment {
  id: string
  projectId: string
  projectTitle: string
  content: string
  status: 'active' | 'flagged' | 'hidden'
  createdAt: string
  author: CommentAuthor
}

/**
 * Récupère les commentaires actifs/approuvés pour un projet
 */
export async function fetchCommentsForProject(projectId: string): Promise<ProjectComment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      created_at,
      profiles:author_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('project_id', projectId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erreur lors du chargement des commentaires:', error)
    return []
  }

  return (data || []).map((c: any) => ({
    id: c.id,
    content: c.content,
    createdAt: c.created_at,
    author: {
      id: c.profiles?.id || 'inconnu',
      name: c.profiles?.full_name || 'Utilisateur',
      avatar: c.profiles?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${c.profiles?.id || 'default'}`
    }
  }))
}

/**
 * Publie un nouveau commentaire sur un projet
 */
export async function createComment(projectId: string, authorId: string, content: string): Promise<ProjectComment> {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      project_id: projectId,
      author_id: authorId,
      content: content,
      status: 'active'
    })
    .select(`
      id,
      content,
      created_at,
      profiles:author_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .single()

  if (error) {
    console.error('Erreur lors de la création du commentaire:', error)
    throw error
  }

  const result = data as any
  return {
    id: result.id,
    content: result.content,
    createdAt: result.created_at,
    author: {
      id: result.profiles?.id || 'inconnu',
      name: result.profiles?.full_name || 'Utilisateur',
      avatar: result.profiles?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${result.profiles?.id || 'default'}`
    }
  }
}

/**
 * Récupère tous les commentaires (pour la modération administrative)
 */
export async function fetchAdminComments(): Promise<AdminComment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      status,
      created_at,
      project_id,
      projects:project_id (
        title
      ),
      profiles:author_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erreur lors du chargement des commentaires admin:', error)
    return []
  }

  return (data || []).map((c: any) => ({
    id: c.id,
    projectId: c.project_id,
    projectTitle: c.projects?.title || 'Projet inconnu',
    content: c.content,
    status: c.status as 'active' | 'flagged' | 'hidden',
    createdAt: c.created_at,
    author: {
      id: c.profiles?.id || 'inconnu',
      name: c.profiles?.full_name || 'Utilisateur Anonyme',
      avatar: c.profiles?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${c.profiles?.id || 'default'}`
    }
  }))
}

/**
 * Met à jour le statut d'un commentaire (modération)
 */
export async function updateCommentStatus(commentId: string, status: 'active' | 'flagged' | 'hidden'): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .update({ status })
    .eq('id', commentId)

  if (error) {
    console.error('Erreur lors de la modération du commentaire:', error)
    return false
  }
  return true
}

/**
 * Supprime définitivement un commentaire
 */
export async function deleteComment(commentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

  if (error) {
    console.error('Erreur lors de la suppression du commentaire:', error)
    return false
  }
  return true
}
