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
    <div className="min-h-[calc(100vh-4rem)] flex w-full">
      {/* --- Côté Gauche : Branding (Caché sur mobile) --- */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-accent p-12 text-white relative overflow-hidden">
        {/* Gradient / Pattern au fond */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-12 hover:bg-white/30 transition-colors shadow-sm border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h1 className="text-5xl font-black leading-[1.1] mb-6 tracking-tight">
            Commencez <br/>l'Aventure.
          </h1>
          <p className="text-accent-light text-xl leading-relaxed opacity-90 max-w-md">
            Créez votre compte en quelques secondes et rejoignez l'incubateur d'idées de l'EMSP.
          </p>
        </div>

        <div className="relative z-10 mt-12 bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl max-w-lg">
          <p className="text-base italic text-white mb-4">
            "Ce Hub a permis à notre équipe de trouver les bonnes personnes et de lancer notre projet beaucoup plus vite."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-highlight flex items-center justify-center text-sm font-bold text-accent-dark">A</div>
            <div className="text-sm font-bold text-white/90">Alice, Étudiante EMSP</div>
          </div>
        </div>
      </div>

      {/* --- Côté Droit : Formulaire --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 bg-background">
        <div className="w-full max-w-[480px]">
          
          <div className="text-center mb-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent/20 to-accent/5 text-accent mb-6 shadow-sm border border-accent/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            </div>
            <h2 className="text-3xl font-black text-text-primary tracking-tight">Créer un compte</h2>
            <p className="text-base mt-3 text-text-secondary">
              Rejoignez l'incubateur d'idées de l'EMSP.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-sm font-medium text-center text-error animate-in zoom-in-95">
                {errors.general}
              </div>
            )}
            
            {/* Champ nom complet */}
            <div className="space-y-2 group">
              <label htmlFor="register-name" className="text-sm font-bold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
                className="w-full h-14 px-5 rounded-2xl bg-surface border border-border/60 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:-translate-y-1 transition-all duration-300 hover:border-accent/30 shadow-sm"
                autoComplete="name"
              />
              {errors.fullName && <p className="text-sm text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.fullName}</p>}
            </div>

            {/* Champ email */}
            <div className="space-y-2 group">
              <label htmlFor="register-email" className="text-sm font-bold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
                className="w-full h-14 px-5 rounded-2xl bg-surface border border-border/60 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:-translate-y-1 transition-all duration-300 hover:border-accent/30 shadow-sm"
                autoComplete="email"
              />
              {errors.email && <p className="text-sm text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Champ mot de passe */}
              <div className="space-y-2 group">
                <label htmlFor="register-password" className="text-sm font-bold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
                  className="w-full h-14 px-5 rounded-2xl bg-surface border border-border/60 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:-translate-y-1 transition-all duration-300 hover:border-accent/30 shadow-sm"
                  autoComplete="new-password"
                />
                {errors.password && <p className="text-sm text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
              </div>

              {/* Confirmation mot de passe */}
              <div className="space-y-2 group">
                <label htmlFor="register-confirm" className="text-sm font-bold text-text-primary ml-1 transition-colors group-focus-within:text-accent">
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
                  className="w-full h-14 px-5 rounded-2xl bg-surface border border-border/60 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:-translate-y-1 transition-all duration-300 hover:border-accent/30 shadow-sm"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <p className="text-sm text-error font-medium ml-1 animate-in fade-in slide-in-from-top-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Bouton de soumission */}
            <Button
              type="submit"
              className="w-full h-14 mt-6 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-text-primary text-background hover:bg-text-secondary"
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
            <p className="text-center text-base text-text-secondary pt-6">
              Déjà un compte ?{' '}
              <Link
                to="/login"
                className="text-text-primary hover:text-accent font-extrabold transition-colors cursor-pointer"
              >
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
