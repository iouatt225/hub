import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'
import { Home, Compass, BookOpen, User, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Layout global — englobe toutes les pages avec Header + Footer.
 * Sur mobile (md:hidden), propose un menu de navigation bas fixe et un FAB de création d'idée.
 */
export function Layout() {
  const { user } = useAuth()
  const location = useLocation()

  const mobileNavLinks = [
    { label: 'Accueil', href: '/', icon: Home },
    { label: 'Hub', href: '/hub', icon: Compass },
    { label: 'Docs', href: '/documentation', icon: BookOpen },
    { label: 'Profil', href: user ? '/profil/me' : '/login', icon: User },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Espace pour compenser le header sticky (h-16 sm:h-18) */}
      <div className="h-16 sm:h-18" />

      {/* Contenu principal — prend tout l'espace disponible */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Bouton d'action flottant (FAB) sur mobile */}
      {user && (
        <Link
          to="/hub/nouvelle-idee"
          className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-highlight text-ink rounded-full flex items-center justify-center shadow-lg border border-ink/10 active:scale-95 transition-transform z-40"
          aria-label="Déposer une idée"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </Link>
      )}

      {/* Barre de navigation basse collante sur mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border flex items-center justify-around z-40 pb-safe shadow-[0_-4px_16px_rgba(20,24,28,0.06)]">
        {mobileNavLinks.map((link) => {
          const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href))
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[9px] font-mono tracking-wider uppercase h-full w-16 transition-colors duration-150",
                isActive ? "text-route font-bold" : "text-text-muted hover:text-text-secondary"
              )}
            >
              <Icon className={cn("w-5 h-5 mb-0.5", isActive ? "stroke-[2.5]" : "stroke-[1.8]")} />
              <span>{link.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-highlight mt-0.5" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer - masqué sur mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}
