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
      <DialogContent className="max-w-[950px] p-0 overflow-hidden border border-border/40 rounded-[2.5rem] shadow-2xl bg-background/80 backdrop-blur-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          
          {/* --- Côté Gauche : Visuel Aéré et Animé --- */}
          <div className="hidden md:flex flex-col justify-between p-12 relative overflow-hidden border-r border-border/30">
            {/* Orbes animées en arrière-plan */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-highlight/30 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s' }} />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-tr from-accent to-accent-light rounded-2xl flex items-center justify-center mb-8 shadow-lg transform hover:scale-105 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
              </div>
              <h2 className="text-5xl font-black text-text-primary leading-[1.1] mb-6 tracking-tight">
                Bon retour <br/><span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">parmi nous.</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-sm">
                Plongez au cœur de l'innovation de l'EMSP. Découvrez, votez et collaborez sur les projets de demain.
              </p>
            </div>

            <div className="relative z-10 mt-12 p-6 rounded-3xl bg-surface/40 border border-border/50 backdrop-blur-md hover:bg-surface/60 transition-colors duration-300">
              <div className="flex -space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-background bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">JS</div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-green-100 flex items-center justify-center text-xs font-bold text-green-600">MK</div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-yellow-100 flex items-center justify-center text-xs font-bold text-yellow-600">AL</div>
              </div>
              <p className="text-sm font-medium text-text-primary">La communauté n'attend que vous !</p>
            </div>
          </div>

          {/* --- Côté Droit : Formulaire Dynamique --- */}
          <div className="p-8 sm:p-14 flex flex-col justify-center relative z-10">
            <DialogHeader className="mb-10 text-left">
              <DialogTitle className="text-3xl font-extrabold text-text-primary tracking-tight">Connexion</DialogTitle>
              <DialogDescription className="text-base mt-2 text-text-secondary">
                Entrez vos identifiants pour continuer.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ email */}
              <div className="space-y-2 group">
                <label htmlFor="login-email" className="text-sm font-bold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
                  Email institutionnel
                </label>
                <div className="relative">
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                    }}
                    placeholder={`prenom.nom@${EMSP_EMAIL_DOMAIN}`}
                    className="w-full h-14 px-5 rounded-2xl bg-surface/50 border border-border/60 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:bg-surface focus:-translate-y-1 transition-all duration-300 hover:border-accent/30 shadow-sm hover:shadow-md"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-sm text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
              </div>

              {/* Champ mot de passe */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="login-password" className="text-sm font-bold text-text-primary transition-colors group-focus-within:text-accent">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false)
                      onSwitchToForgot()
                    }}
                    className="text-sm font-bold text-accent hover:text-accent-hover transition-all hover:translate-x-1"
                  >
                    Oublié ?
                  </button>
                </div>
                <div className="relative">
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
                    className="w-full h-14 px-5 rounded-2xl bg-surface/50 border border-border/60 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:bg-surface focus:-translate-y-1 transition-all duration-300 hover:border-accent/30 shadow-sm hover:shadow-md"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && <p className="text-sm text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
              </div>

              {errors.general && (
                <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-sm font-bold text-center animate-in zoom-in-95 duration-300 shadow-sm">
                  {errors.general}
                </div>
              )}

              {/* Bouton de soumission */}
              <Button
                type="submit"
                className="relative w-full h-14 mt-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-text-primary text-background hover:bg-text-secondary overflow-hidden group"
                disabled={isLoading}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3 relative z-10">
                    <span className="h-6 w-6 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Connexion...
                  </span>
                ) : (
                  <span className="relative z-10">Se connecter</span>
                )}
              </Button>

              {/* Lien vers inscription */}
              <p className="text-center text-base text-text-secondary pt-6">
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false)
                    onSwitchToRegister()
                  }}
                  className="text-text-primary hover:text-accent font-extrabold transition-all hover:scale-105 inline-block"
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
