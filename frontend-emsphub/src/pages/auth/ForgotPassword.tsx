import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EMSP_EMAIL_REGEX } from '@/constants/brand'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!EMSP_EMAIL_REGEX.test(email)) {
      setError('Veuillez entrer une adresse email valide.')
      return
    }

    setIsLoading(true)

    try {
      // TODO: supabase.auth.resetPasswordForEmail
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err: any) {
      console.error(err)
      setError("Une erreur est survenue lors de l'envoi de l'email.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background glow subtil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[420px] relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent/10 to-accent/5 text-accent mb-6 border border-accent/10 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Mot de passe oublié</h2>
          <p className="text-sm mt-2 text-text-secondary">
            Entrez votre adresse email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label htmlFor="forgot-email" className="text-sm font-semibold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
                Adresse email
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null)
                }}
                placeholder="exemple@email.com"
                className="w-full h-12 px-4 rounded-xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all duration-200"
                autoComplete="email"
              />
              {error && <p className="text-xs text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-4 text-base font-bold rounded-xl shadow-sm hover:shadow transition-all bg-text-primary text-background hover:bg-text-secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Envoi en cours...
                </span>
              ) : (
                'Envoyer le lien'
              )}
            </Button>
          </form>
        ) : (
          <div className="bg-accent/10 text-accent-dark p-6 rounded-2xl border border-accent/20 text-center animate-in zoom-in-95">
            <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Lien envoyé !</h3>
            <p className="text-sm text-accent-dark/80">Si un compte correspond à cette adresse, vous recevrez un email avec les instructions.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
