import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EMSP_EMAIL_REGEX, EMSP_EMAIL_DOMAIN } from '@/constants/brand'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!EMSP_EMAIL_REGEX.test(email)) {
      setError(`Veuillez utiliser une adresse @${EMSP_EMAIL_DOMAIN}`)
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
    <div className="min-h-[calc(100vh-4rem)] flex w-full">
      {/* --- Côté Gauche : Branding (Caché sur mobile) --- */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-accent p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-12 hover:bg-white/30 transition-colors shadow-sm border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h1 className="text-5xl font-black leading-[1.1] mb-6 tracking-tight">
            Pas de panique.
          </h1>
          <p className="text-accent-light text-xl leading-relaxed opacity-90 max-w-md">
            Nous allons vous aider à récupérer l'accès à votre compte Hub EMSP.
          </p>
        </div>
      </div>

      {/* --- Côté Droit : Formulaire --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 bg-background">
        <div className="w-full max-w-[450px]">
          
          <div className="text-center mb-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent/20 to-accent/5 text-accent mb-6 shadow-sm border border-accent/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            </div>
            <h2 className="text-3xl font-black text-text-primary tracking-tight">Mot de passe oublié</h2>
            <p className="text-base mt-3 text-text-secondary">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 group">
                <label htmlFor="forgot-email" className="text-sm font-bold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
                  Email institutionnel
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(null)
                  }}
                  placeholder={`prenom.nom@${EMSP_EMAIL_DOMAIN}`}
                  className="w-full h-14 px-5 rounded-2xl bg-surface border border-border/60 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:-translate-y-1 transition-all duration-300 hover:border-accent/30 shadow-sm"
                  autoComplete="email"
                />
                {error && <p className="text-sm text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full h-14 mt-6 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-text-primary text-background hover:bg-text-secondary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="h-6 w-6 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer le lien'
                )}
              </Button>
            </form>
          ) : (
            <div className="bg-accent/10 text-accent-dark p-6 rounded-3xl border border-accent/20 text-center animate-in zoom-in-95">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Lien envoyé !</h3>
              <p className="text-sm">Si un compte correspond à cette adresse, vous recevrez un email contenant les instructions.</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
