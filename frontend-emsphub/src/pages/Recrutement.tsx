import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, UserPlus, Award, Target, Rocket, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

// ============================================================================
// SCHÉMA DE VALIDATION (Zod)
// ============================================================================
const formSchema = z.object({
  fullName: z.string().min(4, 'Veuillez entrer votre nom complet'),
  email: z.string().email('Format d\'adresse email incorrect').endsWith('@emsp.ci', 'Veuillez utiliser votre email institutionnel (@emsp.ci)'),
  filiere: z.string().min(2, 'Veuillez renseigner votre filière d\'études'),
  role: z.enum(['dev_web', 'dev_iot', 'designer_ui_ux', 'event_manager', 'communication']),
  motivation: z.string().min(20, 'Veuillez développer vos motivations (min 20 caractères)'),
  githubOrLinks: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export function Recrutement() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      filiere: '',
      role: 'dev_web',
      motivation: '',
      githubOrLinks: ''
    }
  })

  // Soumission locale simulée
  const onSubmit = async (values: FormValues) => {
    console.log('Candidature soumise avec succès :', values)
    setIsSubmitting(true)
    // Simulation d'une requête réseau (ex: envoi vers supabase ou email de contact)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  // Rendu en cas de succès
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-20 flex items-center justify-center">
        <div className="bg-surface p-8 sm:p-12 rounded-3xl border border-border shadow-card max-w-lg w-full text-center mx-4 animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">Candidature reçue !</h2>
          <p className="text-text-secondary mb-8 text-sm leading-relaxed">
            Merci d'avoir postulé pour rejoindre le Club Info EMSP. Notre bureau va étudier votre dossier et vous recontactera par email sous 48 heures pour un entretien de présentation.
          </p>
          <Button size="lg" className="w-full" onClick={() => navigate('/')}>
            Retourner à l'accueil
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      
      {/* ─── En-tête / Hero ─── */}
      <section className="container-hub max-w-5xl mx-auto px-4 mb-16 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4">
          <UserPlus className="h-6 w-6" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
          Rejoignez le <span className="text-accent">Club Info EMSP</span>
        </h1>
        <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Devenez acteur de l'innovation au sein de l'école. Développez des projets d'envergure, partagez vos compétences et boostez votre insertion professionnelle.
        </p>
      </section>

      {/* ─── Pourquoi postuler ? ─── */}
      <section className="container-hub max-w-5xl mx-auto px-4 mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-accent/5 rounded-lg inline-block border border-accent/10 mb-4 text-accent">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Projets Réels</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Travaillez sur des plateformes utilisées au quotidien (Hub EMSP, outils d'incubation) et développez de vrais prototypes pour la Journée du Numérique.
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-accent/5 rounded-lg inline-block border border-accent/10 mb-4 text-accent">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Mentorat & Partage</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Bénéficiez de formations pratiques animées par les étudiants des années supérieures et les anciens élèves aujourd'hui en entreprise.
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-accent/5 rounded-lg inline-block border border-accent/10 mb-4 text-accent">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Réseau & opportunités</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Mettez en avant vos réalisations devant les entreprises partenaires lors des événements de l'école et facilitez l'obtention de vos stages.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Formulaire de candidature ─── */}
      <section className="container-hub max-w-3xl mx-auto px-4">
        <div className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="mb-8 relative z-10">
            <h2 className="text-2xl font-bold text-text-primary">Formulaire d'adhésion 2026</h2>
            <p className="text-xs text-text-secondary mt-1">Veuillez renseigner toutes les informations requises pour soumettre votre dossier.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            
            {/* Nom complet */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-bold text-text-primary">
                Nom complet <span className="text-error">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                placeholder="Ex: Kouassi Marc-Antoine"
                className={cn(
                  "w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all",
                  errors.fullName ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                )}
              />
              {errors.fullName && <p className="text-xs text-error">{errors.fullName.message}</p>}
            </div>

            {/* Grid Email + Filière */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-text-primary">
                  Email institutionnel EMSP <span className="text-error">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="nom.prenom@emsp.ci"
                  className={cn(
                    "w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all",
                    errors.email ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                  )}
                />
                {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="filiere" className="text-sm font-bold text-text-primary">
                  Filière d'études <span className="text-error">*</span>
                </label>
                <input
                  id="filiere"
                  type="text"
                  {...register('filiere')}
                  placeholder="Ex: Génie Logiciel, IoT, Réseaux"
                  className={cn(
                    "w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all",
                    errors.filiere ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                  )}
                />
                {errors.filiere && <p className="text-xs text-error">{errors.filiere.message}</p>}
              </div>
            </div>

            {/* Rôle visé */}
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-bold text-text-primary block">
                Rôle ou pôle visé <span className="text-error">*</span>
              </label>
              <select
                id="role"
                {...register('role')}
                className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="dev_web">Développement Web (Frontend/Backend)</option>
                <option value="dev_iot">Développement IoT & Systèmes Embarqués</option>
                <option value="designer_ui_ux">Design UI/UX & Identité Visuelle</option>
                <option value="event_manager">Gestion de projet & Événementiel (Organisation)</option>
                <option value="communication">Communication & Réseaux Sociaux</option>
              </select>
              {errors.role && <p className="text-xs text-error">{errors.role.message}</p>}
            </div>

            {/* Motivations */}
            <div className="space-y-2">
              <label htmlFor="motivation" className="text-sm font-bold text-text-primary">
                Vos motivations <span className="text-error">*</span>
              </label>
              <p className="text-[10px] text-text-muted">Expliquez brièvement pourquoi vous voulez nous rejoindre et ce que vous espérez apporter (min 20 caractères).</p>
              <textarea
                id="motivation"
                rows={5}
                {...register('motivation')}
                placeholder="Ex: Je souhaite intégrer le pôle développement pour consolider mes bases en React, participer à la refonte du site et apporter mes compétences en design..."
                className={cn(
                  "w-full p-4 rounded-xl bg-background border text-sm text-text-primary resize-none focus:outline-none focus:ring-2 transition-all",
                  errors.motivation ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                )}
              />
              {errors.motivation && <p className="text-xs text-error">{errors.motivation.message}</p>}
            </div>

            {/* Liens annexes */}
            <div className="space-y-2">
              <label htmlFor="githubOrLinks" className="text-sm font-bold text-text-primary">
                Liens (GitHub, Portfolio, LinkedIn)
              </label>
              <p className="text-[10px] text-text-muted">Optionnel. Entrez les liens vers vos réalisations ou profil.</p>
              <input
                id="githubOrLinks"
                type="text"
                {...register('githubOrLinks')}
                placeholder="https://github.com/... , https://portfolio..."
                className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto gap-2">
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Soumettre ma candidature
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

          </form>
        </div>
      </section>

    </div>
  )
}
