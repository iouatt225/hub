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
        <DialogHeader>
          <DialogTitle className="text-2xl">Se connecter</DialogTitle>
          <DialogDescription>
            Accédez à votre espace sur le Hub d'Idées & Incubation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Champ email */}
          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-text-primary"
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
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-error">{errors.email}</p>
            )}
          </div>

          {/* Champ mot de passe */}
          <div className="space-y-2">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-text-primary"
            >
              Mot de passe
            </label>
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
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-xs text-error">{errors.password}</p>
            )}
          </div>

          {/* Lien mot de passe oublié */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onSwitchToForgot()
              }}
              className="text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Connexion en cours…
              </span>
            ) : (
              'Se connecter'
            )}
          </Button>

          {/* Lien vers inscription */}
          <p className="text-center text-sm text-text-secondary">
            Pas encore de compte ?{' '}
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onSwitchToRegister()
              }}
              className="text-accent hover:text-accent-hover font-medium transition-colors cursor-pointer"
            >
              S'inscrire
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
