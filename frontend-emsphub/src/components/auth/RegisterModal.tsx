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
      <DialogContent className="max-w-[900px] p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* --- Côté Gauche : Visuel / Branding --- */}
          <div className="hidden md:flex flex-col justify-between bg-accent p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)]" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              </div>
              <h2 className="text-4xl font-extrabold leading-[1.1] mb-6">
                Commencez <br/>l'Aventure.
              </h2>
              <p className="text-accent-light text-lg leading-relaxed opacity-90 max-w-sm">
                Créez votre compte en quelques secondes et rejoignez l'incubateur d'idées de l'EMSP.
              </p>
            </div>

            <div className="relative z-10 mt-12 bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10">
              <p className="text-sm italic text-accent-light mb-3">
                "Ce Hub a permis à notre équipe de trouver les bonnes personnes et de lancer notre projet."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-highlight flex items-center justify-center text-xs font-bold text-accent-dark">A</div>
                <div className="text-xs font-bold text-white">Alice, Étudiante EMSP</div>
              </div>
            </div>
          </div>

          {/* --- Côté Droit : Formulaire --- */}
          <div className="p-8 sm:p-10 flex flex-col justify-center max-h-[90vh] overflow-y-auto">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-3xl font-extrabold text-text-primary">Créer un compte</DialogTitle>
              <DialogDescription className="text-base mt-2 text-text-secondary">
                Remplissez vos informations.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.general && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-sm font-medium text-center text-error">
                  {errors.general}
                </div>
              )}
              {/* Champ nom complet */}
              <div className="space-y-2">
                <label htmlFor="register-name" className="text-sm font-bold text-text-primary ml-1">
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
                  className="w-full h-12 px-5 rounded-2xl bg-background border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
                  autoComplete="name"
                />
                {errors.fullName && <p className="text-sm text-error font-medium ml-1">{errors.fullName}</p>}
              </div>

              {/* Champ email */}
              <div className="space-y-2">
                <label htmlFor="register-email" className="text-sm font-bold text-text-primary ml-1">
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
                  className="w-full h-12 px-5 rounded-2xl bg-background border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
                  autoComplete="email"
                />
                {errors.email && <p className="text-sm text-error font-medium ml-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Champ mot de passe */}
                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-bold text-text-primary ml-1">
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
                    className="w-full h-12 px-5 rounded-2xl bg-background border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
                    autoComplete="new-password"
                  />
                  {errors.password && <p className="text-sm text-error font-medium ml-1">{errors.password}</p>}
                </div>

                {/* Confirmation mot de passe */}
                <div className="space-y-2">
                  <label htmlFor="register-confirm" className="text-sm font-bold text-text-primary ml-1">
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
                    className="w-full h-12 px-5 rounded-2xl bg-background border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-accent/40"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <p className="text-sm text-error font-medium ml-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Bouton de soumission */}
              <Button
                type="submit"
                className="w-full h-14 mt-6 text-lg font-bold rounded-2xl shadow-md hover:shadow-lg transition-all bg-text-primary text-background hover:bg-text-secondary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="h-6 w-6 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Création...
                  </span>
                ) : (
                  'Créer mon compte'
                )}
              </Button>

              {/* Lien vers connexion */}
              <p className="text-center text-sm text-text-secondary pt-4">
                Déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false)
                    onSwitchToLogin()
                  }}
                  className="text-text-primary hover:text-accent font-extrabold transition-colors cursor-pointer"
                >
                  Se connecter
                </button>
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
