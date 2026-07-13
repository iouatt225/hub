import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EMSP_EMAIL_REGEX, EMSP_EMAIL_DOMAIN } from '@/constants/brand'

// TODO: Replace with real Supabase Auth call
async function mockRegister(_email: string) {
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

export function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  function clearError(field: keyof typeof errors) {
    if (errors[field] || errors.general) {
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    const newErrors: typeof errors = {}
    if (!fullName.trim()) newErrors.fullName = 'Le nom est requis.'
    if (!EMSP_EMAIL_REGEX.test(email)) newErrors.email = `Veuillez utiliser une adresse @${EMSP_EMAIL_DOMAIN}`
    if (password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      await mockRegister(email)
      console.log('[Auth] Inscription simulée pour', email)
      navigate('/')
    } catch (err) {
      setErrors({ general: "Une erreur est survenue lors de l'inscription." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background glow subtil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[460px] relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent/10 to-accent/5 text-accent mb-6 border border-accent/10 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Créer un compte</h2>
          <p className="text-sm mt-2 text-text-secondary">
            Rejoignez l'incubateur d'idées de l'EMSP.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.general && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-sm font-medium text-center text-error animate-in zoom-in-95">
              {errors.general}
            </div>
          )}
          
          {/* Champ nom complet */}
          <div className="space-y-2 group">
            <label htmlFor="register-name" className="text-sm font-semibold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
              className="w-full h-12 px-4 rounded-xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all duration-200"
              autoComplete="name"
            />
            {errors.fullName && <p className="text-xs text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.fullName}</p>}
          </div>

          {/* Champ email */}
          <div className="space-y-2 group">
            <label htmlFor="register-email" className="text-sm font-semibold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
              className="w-full h-12 px-4 rounded-xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all duration-200"
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Champ mot de passe */}
            <div className="space-y-2 group">
              <label htmlFor="register-password" className="text-sm font-semibold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
                className="w-full h-12 px-4 rounded-xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all duration-200"
                autoComplete="new-password"
              />
              {errors.password && <p className="text-xs text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
            </div>

            {/* Confirmation mot de passe */}
            <div className="space-y-2 group">
              <label htmlFor="register-confirm" className="text-sm font-semibold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
                className="w-full h-12 px-4 rounded-xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all duration-200"
                autoComplete="new-password"
              />
              {errors.confirmPassword && <p className="text-xs text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full h-12 mt-4 text-base font-bold rounded-xl shadow-sm hover:shadow transition-all bg-text-primary text-background hover:bg-text-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Création...
              </span>
            ) : (
              'Créer mon compte'
            )}
          </Button>

          {/* Lien vers connexion */}
          <p className="text-center text-sm text-text-secondary pt-6">
            Déjà un compte ?{' '}
            <Link
              to="/login"
              className="text-text-primary hover:text-accent font-bold transition-colors cursor-pointer"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
