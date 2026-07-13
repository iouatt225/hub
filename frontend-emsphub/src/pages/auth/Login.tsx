import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EMSP_EMAIL_REGEX, EMSP_EMAIL_DOMAIN } from '@/constants/brand'
import { supabase } from '@/lib/supabase'

export function Login() {
  const navigate = useNavigate()
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
      navigate('/')
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background glow subtil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[420px] relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent/10 to-accent/5 text-accent mb-6 border border-accent/10 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Bienvenue</h2>
          <p className="text-sm mt-2 text-text-secondary">
            Entrez vos identifiants pour continuer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ email */}
          <div className="space-y-2 group">
            <label htmlFor="login-email" className="text-sm font-semibold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
              className="w-full h-12 px-4 rounded-xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all duration-200"
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
          </div>

          {/* Champ mot de passe */}
          <div className="space-y-2 group">
            <div className="flex items-center justify-between ml-1">
              <label htmlFor="login-password" className="text-sm font-semibold text-text-primary transition-colors group-focus-within:text-accent">
                Mot de passe
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                Oublié ?
              </Link>
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
              className="w-full h-12 px-4 rounded-xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all duration-200"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-xs text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
          </div>

          {errors.general && (
            <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-medium text-center animate-in zoom-in-95 duration-200">
              {errors.general}
            </div>
          )}

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full h-12 mt-4 text-base font-bold rounded-xl shadow-sm hover:shadow transition-all bg-text-primary text-background hover:bg-text-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Connexion...
              </span>
            ) : (
              'Se connecter'
            )}
          </Button>

          {/* Lien vers inscription */}
          <p className="text-center text-sm text-text-secondary pt-6">
            Pas encore de compte ?{' '}
            <Link
              to="/register"
              className="text-text-primary hover:text-accent font-bold transition-colors"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
