import { useState, type FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { EMSP_EMAIL_REGEX, EMSP_EMAIL_DOMAIN } from '@/constants/brand'
import { supabase } from '@/lib/supabase'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToRegister: () => void
  onSwitchToForgot: () => void
}

/**
 * Modale de connexion — formulaire contrôlé avec validation email EMSP.
 * L'appel API réel sera branché au Bloc 9 (Supabase Auth).
 */
export function LoginModal({
  open,
  onOpenChange,
  onSwitchToRegister,
  onSwitchToForgot,
}: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  function setError(msg: string) {
    setErrors({ general: msg })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrors({})

    if (!EMSP_EMAIL_REGEX.test(email)) {
      setErrors({ email: `Veuillez utiliser une adresse @${EMSP_EMAIL_DOMAIN}` })
      return
    }

    if (!password) {
      setErrors({ password: 'Le mot de passe est requis.' })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      console.log('[Auth] Connexion réussie')
      onOpenChange(false)
      resetForm()
    } catch (err: any) {
      console.error(err)
      if (err.message?.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.')
      } else {
        setError('Une erreur est survenue lors de la connexion.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  function resetForm() {
    setEmail('')
    setPassword('')
    setErrors({})
  }

  function handleOpenChange(open: boolean) {
    if (!open) resetForm()
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[900px] p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* --- Côté Gauche : Visuel / Branding --- */}
          <div className="hidden md:flex flex-col justify-between bg-accent p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
              </div>
              <h2 className="text-4xl font-extrabold leading-[1.1] mb-6">
                Bon retour sur le <br/>Hub d'Idées.
              </h2>
              <p className="text-accent-light text-lg leading-relaxed opacity-90 max-w-sm">
                Connectez-vous pour découvrir les nouveaux projets, voter et interagir avec la communauté de l'EMSP.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <div className="flex -space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-accent bg-blue-100" />
                <div className="w-10 h-10 rounded-full border-2 border-accent bg-green-100" />
                <div className="w-10 h-10 rounded-full border-2 border-accent bg-yellow-100" />
              </div>
              <p className="text-sm text-accent-light">Rejoignez des centaines d'étudiants innovants.</p>
            </div>
          </div>

          {/* --- Côté Droit : Formulaire --- */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <DialogHeader className="mb-8 text-left">
              <DialogTitle className="text-3xl font-extrabold text-text-primary">Connexion</DialogTitle>
              <DialogDescription className="text-base mt-2 text-text-secondary">
                Entrez vos identifiants pour continuer.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ email */}
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-sm font-bold text-text-primary ml-1">
                  Email institutionnel
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  placeholder={`prenom.nom@${EMSP_EMAIL_DOMAIN}`}
                  className="w-full h-14 px-5 rounded-2xl bg-background border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
                  autoComplete="email"
                />
                {errors.email && <p className="text-sm text-error font-medium ml-1">{errors.email}</p>}
              </div>

              {/* Champ mot de passe */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="login-password" className="text-sm font-bold text-text-primary">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false)
                      onSwitchToForgot()
                    }}
                    className="text-sm font-bold text-accent hover:text-accent-hover transition-colors"
                  >
                    Oublié ?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  placeholder="••••••••"
                  className="w-full h-14 px-5 rounded-2xl bg-background border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
                  autoComplete="current-password"
                />
                {errors.password && <p className="text-sm text-error font-medium ml-1">{errors.password}</p>}
              </div>

              {errors.general && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-medium text-center">
                  {errors.general}
                </div>
              )}

              {/* Bouton de soumission */}
              <Button
                type="submit"
                className="w-full h-14 mt-4 text-lg font-bold rounded-2xl shadow-md hover:shadow-lg transition-all bg-text-primary text-background hover:bg-text-secondary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="h-6 w-6 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Connexion...
                  </span>
                ) : (
                  'Se connecter'
                )}
              </Button>

              {/* Lien vers inscription */}
              <p className="text-center text-base text-text-secondary pt-4">
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false)
                    onSwitchToRegister()
                  }}
                  className="text-text-primary hover:text-accent font-extrabold transition-colors cursor-pointer"
                >
                  S'inscrire
                </button>
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
