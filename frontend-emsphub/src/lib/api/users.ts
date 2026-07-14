import { supabase } from '@/lib/supabase'

export interface AdminUser {
  id: string
  fullName: string
  email: string
  role: 'student' | 'admin' | 'jury'
  filiere: string
  projectCount: number
  joinedAt: string
  isActive: boolean
  avatar: string
}

/**
 * Récupère tous les profils utilisateurs avec leurs statistiques pour le portail d'administration
 */
export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      email,
      role,
      avatar_url,
      field_of_study,
      is_active,
      created_at,
      projects (
        id
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erreur lors du chargement des profils admin:', error)
    return []
  }

  return (data || []).map((u: any) => ({
    id: u.id,
    fullName: u.full_name || 'Utilisateur sans nom',
    email: u.email || '',
    role: (u.role || 'student') as 'student' | 'admin' | 'jury',
    filiere: u.field_of_study || 'Non définie',
    projectCount: u.projects ? u.projects.length : 0,
    joinedAt: u.created_at,
    isActive: u.is_active,
    avatar: u.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${u.id}`
  }))
}

/**
 * Modifie le rôle d'un utilisateur
 */
export async function updateUserRole(userId: string, role: 'student' | 'admin' | 'jury'): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) {
    console.error('Erreur lors du changement de rôle:', error)
    return false
  }
  return true
}

/**
 * Active ou désactive le compte d'un utilisateur
 */
export async function updateUserActiveStatus(userId: string, isActive: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update({ is_active: isActive })
    .eq('id', userId)

  if (error) {
    console.error('Erreur lors du changement de statut actif:', error)
    return false
  }
  return true
}
