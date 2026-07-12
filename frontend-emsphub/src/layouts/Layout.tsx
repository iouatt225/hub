import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

/**
 * Layout global — englobe toutes les pages avec Header + Footer.
 * Le contenu de la page active s'affiche via <Outlet />.
 */
export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Espace pour compenser le header sticky (h-16 sm:h-18) */}
      <div className="h-16 sm:h-18" />

      {/* Contenu principal — prend tout l'espace disponible */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
