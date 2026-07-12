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
      newErrors.email = `Seuls les emails institutionnels (${EMSP_EMAIL_DOMAIN}) sont acceptés.`
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

    // Simulation — sera remplacé par Supabase Auth au Bloc 9
    console.log('[Auth] Inscription tentée :', {
      fullName,
      email,
      password: '***',
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    console.log('[Auth] Inscription réussie (simulée)')
    onOpenChange(false)
    resetForm()
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
        <DialogHeader>
          <DialogTitle className="text-2xl">Créer un compte</DialogTitle>
          <DialogDescription>
            Rejoignez le Hub et proposez vos idées innovantes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Champ nom complet */}
          <div className="space-y-2">
            <label
              htmlFor="register-name"
              className="text-sm font-medium text-text-primary"
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
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="text-xs text-error">{errors.fullName}</p>
            )}
          </div>

          {/* Champ email */}
          <div className="space-y-2">
            <label
              htmlFor="register-email"
              className="text-sm font-medium text-text-primary"
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
              placeholder={`prenom.nom${EMSP_EMAIL_DOMAIN}`}
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
              htmlFor="register-password"
              className="text-sm font-medium text-text-primary"
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
              placeholder="Minimum 8 caractères"
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-xs text-error">{errors.password}</p>
            )}
          </div>

          {/* Confirmation mot de passe */}
          <div className="space-y-2">
            <label
              htmlFor="register-confirm"
              className="text-sm font-medium text-text-primary"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="register-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                clearError('confirmPassword')
              }}
              placeholder="Retapez votre mot de passe"
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-error">{errors.confirmPassword}</p>
            )}
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
                Inscription en cours…
              </span>
            ) : (
              'Créer mon compte'
            )}
          </Button>

          {/* Lien vers connexion */}
          <p className="text-center text-sm text-text-secondary">
            Déjà inscrit ?{' '}
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onSwitchToLogin()
              }}
              className="text-accent hover:text-accent-hover font-medium transition-colors cursor-pointer"
            >
              Se connecter
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
