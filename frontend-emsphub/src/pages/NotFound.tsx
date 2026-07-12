import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Home } from 'lucide-react'

/**
 * Page 404 — affichée quand l'URL ne correspond à aucune route.
 */
export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-text-primary mb-2">
        Page introuvable
      </h2>
      <p className="text-text-secondary mb-8 max-w-md">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Button asChild>
        <Link to="/">
          <Home className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>
    </div>
  )
}
