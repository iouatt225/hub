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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center pb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
          </div>
          <DialogTitle className="text-2xl font-bold">Bienvenue</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Connectez-vous pour accéder au Hub d'Idées de l'EMSP.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Champ email */}
          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="text-sm font-semibold text-text-primary"
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
              className="w-full h-11 px-4 rounded-xl bg-background-alt border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-error font-medium">{errors.email}</p>
            )}
          </div>

          {/* Champ mot de passe */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-sm font-semibold text-text-primary"
              >
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false)
                  onSwitchToForgot()
                }}
                className="text-xs font-medium text-accent hover:text-accent-hover transition-colors cursor-pointer"
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
              className="w-full h-11 px-4 rounded-xl bg-background-alt border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-xs text-error font-medium">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-medium text-center">
              {errors.general}
            </div>
          )}

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Connexion en cours…
              </span>
            ) : (
              'Se connecter'
            )}
          </Button>

          {/* Lien vers inscription */}
          <p className="text-center text-sm text-text-secondary pt-2">
            Nouveau sur le Hub ?{' '}
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onSwitchToRegister()
              }}
              className="text-accent hover:text-accent-hover font-bold transition-colors cursor-pointer underline underline-offset-4"
            >
              Créer un compte
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
