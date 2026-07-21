import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogOut, User as UserIcon, Search, Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { useAuth } from '@/contexts/AuthContext'
import { NAV_LINKS } from '@/constants/brand'
import { cn } from '@/lib/utils'

/**
 * Header principal — sticky au scroll, responsive.
 * Sur mobile, il s'aligne sur la Top Bar de la charte : logo, recherche, cloche de notification et profil.
 */
export function Header() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  /* Détection du scroll pour le style sticky */
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          // Mobile: fond Ink (sombre) de la charte. Desktop: transparent ou verre trempé au scroll.
          'bg-ink text-paper md:bg-transparent md:text-text-primary',
          isScrolled && 'md:bg-background/80 md:backdrop-blur-xl md:border-b md:border-border md:shadow-sm'
        )}
      >
        <div className="container-hub">
          <nav className="flex items-center justify-between h-16 sm:h-18">
            {/* ─── Logo / Nom ─── */}
            <Link
              to="/"
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="stamp-mark bg-background text-text-primary group-hover:bg-background-alt transition-colors duration-200 border-current">
                <span className="font-display font-semibold text-sm">H</span>
              </div>
              <span className="text-lg font-display font-semibold tracking-wide text-current">
                Hub EMSP
              </span>
            </Link>

            {/* ─── Liens de navigation desktop ─── */}
            <div className="hidden md:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-semibold transition-all duration-200 whitespace-nowrap pb-1 border-b-2',
                    location.pathname === link.href
                      ? 'text-text-primary border-highlight font-bold'
                      : 'text-text-secondary border-transparent hover:text-text-primary hover:border-text-secondary/30'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ─── Boutons auth desktop ─── */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profil/me" className="flex items-center gap-2 hover:bg-surface p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-border">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                      <AvatarFallback><UserIcon className="h-4 w-4 text-text-primary" /></AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-text-primary">
                      {user.user_metadata?.full_name?.split(' ')[0] || 'Profil'}
                    </span>
                  </Link>
                  {(user.email?.startsWith('admin') || user.user_metadata?.role === 'admin') && (
                    <Button variant="ghost" className="hidden lg:flex text-accent hover:text-accent hover:bg-accent-light/50 font-semibold font-mono text-xs">
                      <Link to="/admin">ADMIN</Link>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-text-secondary hover:text-error"
                    onClick={() => signOut()}
                    aria-label="Se déconnecter"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-surface hover:text-text-primary h-10 py-2 px-4 font-semibold text-text-secondary"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-text-primary text-background shadow hover:bg-text-secondary h-10 py-2 px-6 font-semibold"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>

            {/* ─── Top Bar Mobile Icons (exactement comme la maquette) ─── */}
            <div className="flex md:hidden items-center gap-4 text-paper">
              <Link to="/hub" aria-label="Rechercher" className="hover:text-postmark transition-colors">
                <Search className="w-5 h-5 stroke-[2]" />
              </Link>
              <div className="relative cursor-pointer hover:text-postmark transition-colors" aria-label="Notifications">
                <Bell className="w-5 h-5 stroke-[2]" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-highlight animate-pulse" />
              </div>
              <Link to={user ? "/profil/me" : "/login"} aria-label="Mon profil">
                <Avatar className="h-7 w-7 border border-paper/20">
                  <AvatarImage src={user ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}` : undefined} />
                  <AvatarFallback className="text-[9px] font-bold bg-paper/10 text-paper font-mono">
                    {user ? user.email?.slice(0, 2).toUpperCase() : '?'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
