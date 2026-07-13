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
      <DialogContent className="sm:max-w-md p-8 sm:p-10 rounded-[2rem]">
        <DialogHeader className="flex flex-col items-center text-center pb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
          </div>
          <DialogTitle className="text-3xl font-extrabold text-text-primary">Bienvenue</DialogTitle>
          <DialogDescription className="text-base mt-3 text-text-secondary">
            Connectez-vous pour accéder au Hub d'Idées de l'EMSP.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          {/* Champ email */}
          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="text-sm font-bold text-text-primary ml-1"
            >
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
              className="w-full h-14 px-5 rounded-2xl bg-surface border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-error font-medium ml-1">{errors.email}</p>
            )}
          </div>

          {/* Champ mot de passe */}
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label
                htmlFor="login-password"
                className="text-sm font-bold text-text-primary"
              >
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false)
                  onSwitchToForgot()
                }}
                className="text-sm font-bold text-accent hover:text-accent-hover transition-colors cursor-pointer"
              >
                Mot de passe oublié ?
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
              className="w-full h-14 px-5 rounded-2xl bg-surface border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-sm text-error font-medium ml-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-medium text-center">
              {errors.general}
            </div>
          )}

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full h-14 mt-4 text-lg font-bold rounded-2xl shadow-md hover:shadow-lg transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="h-6 w-6 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Connexion en cours...
              </span>
            ) : (
              'Se connecter'
            )}
          </Button>

          {/* Lien vers inscription */}
          <p className="text-center text-base text-text-secondary pt-4">
            Nouveau sur le Hub ?{' '}
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onSwitchToRegister()
              }}
              className="text-accent hover:text-accent-hover font-extrabold transition-colors cursor-pointer underline underline-offset-4"
            >
              Créer un compte
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
