import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, LogOut, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { useAuth } from '@/contexts/AuthContext'
import { BRAND, NAV_LINKS } from '@/constants/brand'
import { cn } from '@/lib/utils'

/**
 * Header principal — sticky au scroll, responsive avec menu burger mobile.
 */
export function Header() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  /* Détection du scroll pour le style sticky */
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Fermer le menu mobile au changement de route ou d'état de connexion */
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname, user])

  /* Empêcher le scroll du body quand le menu mobile est ouvert */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="container-hub">
          <nav className="flex items-center justify-between h-16 sm:h-18">
            {/* ─── Logo / Nom ─── */}
            <Link
              to="/"
              className="flex items-center gap-2 group shrink-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors duration-200">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <span className="text-lg font-bold text-text-primary tracking-tight hidden sm:inline">
                {BRAND.shortName}
              </span>
            </Link>

            {/* ─── Navigation desktop ─── */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                    location.pathname === link.href
                      ? 'text-accent bg-accent-light/50'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
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
                      <AvatarFallback><UserIcon className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-text-primary">
                      {user.user_metadata?.full_name?.split(' ')[0] || 'Profil'}
                    </span>
                  </Link>
                  {(user.email?.startsWith('admin') || user.user_metadata?.role === 'admin') && (
                    <Button variant="ghost" className="hidden lg:flex text-accent hover:text-accent hover:bg-accent-light/50 font-semibold">
                      <Link to="/admin">Admin</Link>
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

            {/* ─── Bouton burger mobile ─── */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </nav>
        </div>

        {/* ─── Menu mobile (overlay plein écran) ─── */}
        <div
          className={cn(
            'md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl transition-all duration-300 z-40',
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        >
          <div className="container-hub py-6 flex flex-col gap-2">
            {/* Liens de navigation */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                  location.pathname === link.href
                    ? 'text-accent bg-accent/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Séparateur */}
            <div className="h-px bg-border my-4" />

            {/* Boutons auth mobile */}
            {user ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/profil/me"
                  className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                    <AvatarFallback><UserIcon className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-text-primary">
                      {user.user_metadata?.full_name || 'Mon Profil'}
                    </span>
                    <span className="text-xs text-text-muted truncate max-w-[200px]">
                      {user.email}
                    </span>
                  </div>
                </Link>
                {(user.email?.startsWith('admin') || user.user_metadata?.role === 'admin') && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center p-2 rounded-lg bg-accent/10 text-accent font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Panel Administration
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="w-full justify-center text-error border-error/20 hover:bg-error/10 hover:text-error"
                  onClick={() => {
                    signOut()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-surface hover:text-text-primary h-10 py-2 px-4 w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-text-primary text-background shadow hover:bg-text-secondary h-10 py-2 px-4 w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

    </>
  )
}
