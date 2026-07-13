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

interface RegisterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin: () => void
}

/**
 * Modale d'inscription — formulaire contrôlé avec validation stricte.
 * L'appel API réel sera branché au Bloc 9 (Supabase Auth).
 */
export function RegisterModal({
  open,
  onOpenChange,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [isLoading, setIsLoading] = useState(false)

  function validate(): boolean {
    const newErrors: Record<string, string | undefined> = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis.'
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Le nom doit contenir au moins 3 caractères.'
    }

    if (!email.trim()) {
      newErrors.email = 'L\'adresse email est requise.'
    } else if (!EMSP_EMAIL_REGEX.test(email)) {
      newErrors.email = `Seuls les emails institutionnels (@${EMSP_EMAIL_DOMAIN}) sont acceptés.`
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis.'
    } else if (password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe.'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        throw error
      }

      console.log('[Auth] Inscription réussie')
      onOpenChange(false)
      resetForm()
      // Note: L'utilisateur peut devoir confirmer son email selon la config Supabase.
      // Une alerte ou un toast serait idéal ici.
    } catch (err: any) {
      console.error(err)
      if (err.message?.includes('User already registered')) {
        setErrors({ email: 'Cette adresse email est déjà utilisée.' })
      } else {
        setErrors({ general: 'Une erreur est survenue lors de l\'inscription.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  function resetForm() {
    setFullName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors({})
  }

  function handleOpenChange(open: boolean) {
    if (!open) resetForm()
    onOpenChange(open)
  }

  function clearError(field: string) {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center pb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          </div>
          <DialogTitle className="text-2xl font-bold">Créer un compte</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Rejoignez le Hub et proposez vos idées innovantes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {errors.general && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-sm font-medium text-center text-error">
              {errors.general}
            </div>
          )}
          {/* Champ nom complet */}
          <div className="space-y-2">
            <label
              htmlFor="register-name"
              className="text-sm font-semibold text-text-primary"
            >
              Nom complet
            </label>
            <input
              id="register-name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                clearError('fullName')
              }}
              placeholder="Prénom Nom"
              className="w-full h-11 px-4 rounded-xl bg-background-alt border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="text-xs text-error font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Champ email */}
          <div className="space-y-2">
            <label
              htmlFor="register-email"
              className="text-sm font-semibold text-text-primary"
            >
              Email institutionnel
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearError('email')
              }}
              placeholder={`prenom.nom@${EMSP_EMAIL_DOMAIN}`}
              className="w-full h-11 px-4 rounded-xl bg-background-alt border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-error font-medium">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Champ mot de passe */}
            <div className="space-y-2">
              <label
                htmlFor="register-password"
                className="text-sm font-semibold text-text-primary"
              >
                Mot de passe
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearError('password')
                }}
                placeholder="Min. 8 caractères"
                className="w-full h-11 px-4 rounded-xl bg-background-alt border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-xs text-error font-medium">{errors.password}</p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div className="space-y-2">
              <label
                htmlFor="register-confirm"
                className="text-sm font-semibold text-text-primary"
              >
                Confirmer
              </label>
              <input
                id="register-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  clearError('confirmPassword')
                }}
                placeholder="Retapez-le"
                className="w-full h-11 px-4 rounded-xl bg-background-alt border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-error font-medium">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full h-11 mt-2 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Inscription en cours…
              </span>
            ) : (
              'Créer mon compte'
            )}
          </Button>

          {/* Lien vers connexion */}
          <p className="text-center text-sm text-text-secondary pt-2">
            Déjà inscrit ?{' '}
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onSwitchToLogin()
              }}
              className="text-accent hover:text-accent-hover font-bold transition-colors cursor-pointer underline underline-offset-4"
            >
              Se connecter
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
