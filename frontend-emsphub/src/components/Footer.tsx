import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  BRAND,
  FOOTER_EXPLORE_LINKS,
  FOOTER_CLUB_LINKS,
  SOCIAL_LINKS,
} from '@/constants/brand'

/** Icônes SVG sociales (lucide-react ne fournit plus les icônes de marques) */
function SocialIcon({ name, className }: { name: string; className?: string }) {
  const iconClass = className ?? 'h-4 w-4'
  switch (name) {
    case 'facebook':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case 'twitter':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
      )
    default:
      return null
  }
}

/**
 * Footer — 3 colonnes (Explorer, Club Info, Newsletter) + réseaux sociaux.
 * Inspiré du footer ScrewFast, adapté au Hub EMSP.
 */
export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  function handleNewsletterSubmit(e: FormEvent) {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    // Simulation — sera branché sur le backend au Bloc 16
    console.log('[Newsletter] Inscription :', newsletterEmail)
    setIsSubscribed(true)
    setNewsletterEmail('')

    // Réinitialiser le message après 3 secondes
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background-alt border-t border-border">
      <div className="container-hub py-12 sm:py-16">
        {/* ─── Grille principale ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Colonne 1 — Identité */}
          <div className="sm:col-span-2 lg:col-span-2 lg:pr-8">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors duration-200">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <span className="text-lg font-bold text-text-primary tracking-tight">
                {BRAND.shortName}
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              {BRAND.description}
            </p>
          </div>

          {/* Colonne 2 — Explorer */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Explorer
            </h3>
            <ul className="space-y-3">
              {FOOTER_EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Club Info */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Club Info
            </h3>
            <ul className="space-y-3">
              {FOOTER_CLUB_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Restez informé des dernières idées et actualités du Hub.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 min-w-0 h-10 px-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                required
              />
              <Button type="submit" size="icon" aria-label="S'abonner à la newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-success mt-2 animate-fade-in">
                ✓ Inscription réussie !
              </p>
            )}
          </div>
        </div>

        {/* ─── Séparateur ─── */}
        <div className="h-px bg-border my-8 sm:my-10" />

        {/* ─── Bas du footer : réseaux sociaux + copyright ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-text-muted text-center sm:text-left">
            © {currentYear} {BRAND.school} ({BRAND.schoolAcronym}) — {BRAND.city}.
            Tous droits réservés.
          </p>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:text-accent hover:bg-surface transition-all duration-200"
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
