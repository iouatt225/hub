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

interface ForgotPasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin: () => void
}

/**
 * Modale de récupération de mot de passe.
 * L'envoi réel du lien de réinitialisation sera branché au Bloc 9 (Supabase Auth).
 */
export function ForgotPasswordModal({
  open,
  onOpenChange,
  onSwitchToLogin,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  function validate(): boolean {
    if (!email.trim()) {
      setError('L\'adresse email est requise.')
      return false
    }
    if (!EMSP_EMAIL_REGEX.test(email)) {
      setError(`Seuls les emails institutionnels (@${EMSP_EMAIL_DOMAIN}) sont acceptés.`)
      return false
    }
    setError(undefined)
    return true
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // Rediriger l'utilisateur après le clic sur le lien dans l'email
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        throw error
      }

      console.log('[Auth] Email de réinitialisation envoyé')
      setIsSent(true)
    } catch (err: any) {
      console.error(err)
      setError('Une erreur est survenue lors de l\'envoi de l\'email.')
    } finally {
      setIsLoading(false)
    }
  }

  function resetForm() {
    setEmail('')
    setError(undefined)
    setIsSent(false)
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
          </div>
          <DialogTitle className="text-2xl font-bold">Mot de passe oublié</DialogTitle>
          <DialogDescription className="text-base mt-2">
            {isSent
              ? 'Un email de réinitialisation a été envoyé.'
              : 'Entrez votre email pour recevoir un lien de réinitialisation.'}
          </DialogDescription>
        </DialogHeader>

        {isSent ? (
          <div className="space-y-6 mt-4">
            {/* Confirmation d'envoi */}
            <div className="flex items-center justify-center p-6 bg-success/5 border border-success/10 rounded-2xl">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                  <svg
                    className="h-7 w-7 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-base text-text-secondary leading-relaxed">
                  Vérifiez votre boîte de réception à l'adresse{' '}
                  <span className="font-bold text-text-primary">{email}</span>.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-base font-semibold"
              onClick={() => {
                onOpenChange(false)
                onSwitchToLogin()
              }}
            >
              Retour à la connexion
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Champ email */}
            <div className="space-y-2">
              <label
                htmlFor="forgot-email"
                className="text-sm font-semibold text-text-primary"
              >
                Email institutionnel
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(undefined)
                }}
                placeholder={`prenom.nom@${EMSP_EMAIL_DOMAIN}`}
                className="w-full h-11 px-4 rounded-xl bg-background-alt border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                autoComplete="email"
              />
              {error && <p className="text-xs text-error font-medium">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Envoi en cours…
                </span>
              ) : (
                'Envoyer le lien'
              )}
            </Button>

            <p className="text-center text-sm text-text-secondary pt-2">
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false)
                  onSwitchToLogin()
                }}
                className="text-text-secondary hover:text-text-primary font-bold transition-colors cursor-pointer underline underline-offset-4"
              >
                Retour à la connexion
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
