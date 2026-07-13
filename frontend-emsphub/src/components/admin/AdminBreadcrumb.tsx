import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

/** Correspondance route → label lisible */
const ROUTE_LABELS: Record<string, string> = {
  admin: 'Administration',
  utilisateurs: 'Utilisateurs',
  projets: 'Projets',
  commentaires: 'Commentaires',
  statistiques: 'Statistiques',
  parametres: 'Paramètres',
}

/**
 * Fil d'Ariane dynamique pour le portail admin.
 * Génère automatiquement les segments à partir de la route active.
 */
export function AdminBreadcrumb() {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  // Construire les éléments du breadcrumb
  const items = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = ROUTE_LABELS[segment] || segment
    const isLast = index === pathSegments.length - 1

    return { path, label, isLast }
  })

  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 text-sm">
      {items.map((item) => (
        <span key={item.path} className="flex items-center gap-1">
          {!item.isLast ? (
            <>
              <Link
                to={item.path}
                className="text-text-muted hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            </>
          ) : (
            <span className="text-text-primary font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
