import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LoginModal } from '@/components/auth/LoginModal'
import { RegisterModal } from '@/components/auth/RegisterModal'
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal'
import { BRAND, NAV_LINKS } from '@/constants/brand'
import { cn } from '@/lib/utils'

/**
 * Header principal — sticky au scroll, responsive avec menu burger mobile.
 * Intègre les modales de connexion, inscription et mot de passe oublié.
 */
export function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)

  /* Détection du scroll pour le style sticky */
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Fermer le menu mobile au changement de route */
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

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
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg'
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
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    location.pathname === link.href
                      ? 'text-accent bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ─── Boutons auth desktop ─── */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLoginOpen(true)}
              >
                Se connecter
              </Button>
              <Button
                size="sm"
                onClick={() => setRegisterOpen(true)}
              >
                S'inscrire
              </Button>
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
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setLoginOpen(true)
                }}
              >
                Se connecter
              </Button>
              <Button
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setRegisterOpen(true)
                }}
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Modales d'authentification ─── */}
      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToRegister={() => setRegisterOpen(true)}
        onSwitchToForgot={() => setForgotOpen(true)}
      />
      <RegisterModal
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
      <ForgotPasswordModal
        open={forgotOpen}
        onOpenChange={setForgotOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </>
  )
}
