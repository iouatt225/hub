import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface RouteProtegeeAdminProps {
  children: React.ReactNode
}

/**
 * Composant de protection de route dédié à l'administration.
 * Vérifie d'abord que l'utilisateur est connecté,
 * puis vérifie s'il dispose des droits administrateur.
 */
export function RouteProtegeeAdmin({ children }: RouteProtegeeAdminProps) {
  const { user } = useAuth()
  const location = useLocation()

  // 1. L'utilisateur n'est pas connecté du tout
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // 2. L'utilisateur est connecté, vérification des droits admin
  // (Mock : on considère que si l'email commence par 'admin', c'est un admin,
  // ou si une meta 'role' est définie à 'admin'. Sera géré via Supabase profiles au Bloc 16)
  const isAdmin = 
    user.email?.startsWith('admin') || 
    user.user_metadata?.role === 'admin'

  if (!isAdmin) {
    // Redirection vers le hub avec potentiellement un state pour afficher une erreur
    return <Navigate to="/hub" replace />
  }

  // 3. Tout est bon, on affiche la route admin
  return <>{children}</>
}
