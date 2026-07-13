import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Composant de protection de route.
 * Redirige vers la page d'accueil avec un paramètre ?login=true si l'utilisateur
 * n'est pas authentifié.
 */
export function RouteProtegee({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted text-sm animate-pulse">
            Vérification de l'authentification...
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirige vers la page d'accueil avec un state indiquant d'ouvrir la modale de login,
    // et en conservant l'URL demandée pour y retourner après connexion.
    return <Navigate to="/" state={{ from: location, openLogin: true }} replace />
  }

  return <>{children}</>
}
