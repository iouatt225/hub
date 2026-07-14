import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Upload, Lightbulb, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { createProject } from '@/lib/api/projects'

// ============================================================================
// SCHÉMA DE VALIDATION (Zod)
// ============================================================================
const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Le titre doit contenir au moins 5 caractères')
    .max(100, 'Le titre ne doit pas dépasser 100 caractères'),
  problem: z
    .string()
    .min(20, 'Veuillez décrire le problème plus en détail (min 20 caractères)'),
  solution: z
    .string()
    .min(20, 'Veuillez décrire la solution plus en détail (min 20 caractères)'),
  teamStatus: z.enum(['solo', 'complete', 'looking_for_members'], {
    message: 'Veuillez définir le statut de votre équipe',
  }),
  tags: z
    .string()
    .min(2, 'Veuillez entrer au moins un mot-clé')
    .max(50, 'Trop de mots-clés (max 50 caractères)'),
})

type FormValues = z.infer<typeof formSchema>

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
export function NouvelleIdee() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      problem: '',
      solution: '',
      teamStatus: 'looking_for_members',
      tags: '',
    },
  })

  // Gestion de l'upload de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFileName(file.name)

      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setImageBase64(reader.result as string)
        }
      } else {
        setImageBase64(null)
      }
    }
  }

  // Soumission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return

    setIsSubmitting(true)
    
    try {
      await createProject({
        title: values.title,
        problem: values.problem,
        solution: values.solution,
        teamStatus: values.teamStatus,
        tags: values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        authorId: user.id,
        imageUrl: imageBase64 || undefined
      })
      
      setIsSuccess(true)
      // Redirection après succès
      setTimeout(() => {
        navigate('/hub')
      }, 2000)
    } catch (error: any) {
      console.error('Erreur lors de la création du projet:', error)
      alert(`Une erreur est survenue lors de la soumission de votre idée : ${error.message || error}`)
      setIsSubmitting(false)
    }
  }

  // ============================================================================
  // RENDU SUCCÈS
  // ============================================================================
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-20 flex items-center justify-center">
        <div className="bg-surface p-8 sm:p-12 rounded-3xl border border-border shadow-card max-w-lg w-full text-center mx-4">
          <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">Idée Propulsée !</h2>
          <p className="text-text-secondary mb-8">
            Félicitations, votre projet a bien été soumis sur le Hub. Il est désormais visible par tous les étudiants.
          </p>
          <div className="flex h-1 w-full bg-surface-hover rounded-full overflow-hidden">
            <div className="h-full bg-accent animate-pulse w-full origin-left transition-transform duration-1000" />
          </div>
          <p className="text-xs text-text-muted mt-4">Redirection vers le Hub...</p>
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDU FORMULAIRE
  // ============================================================================
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-hub max-w-3xl">
        
        {/* En-tête */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
            Proposer une idée
          </h1>
          <p className="text-text-secondary text-lg">
            Partagez votre vision avec la communauté de l'EMSP en moins de 2 minutes.
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-sm space-y-8"
        >
          {/* ─── 1. Titre ─── */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-bold text-text-primary">
              Titre du projet <span className="text-error">*</span>
            </label>
            <input
              id="title"
              {...register('title')}
              placeholder="Ex: Plateforme IoT pour l'agriculture urbaine"
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-background border text-text-primary focus:outline-none focus:ring-2 transition-all",
                errors.title ? "border-error focus:ring-error" : "border-border focus:ring-accent"
              )}
            />
            {errors.title && <p className="text-xs text-error">{errors.title.message}</p>}
          </div>

          {/* ─── 2. Le Problème ─── */}
          <div className="space-y-2">
            <label htmlFor="problem" className="text-sm font-bold text-text-primary">
              Le Problème <span className="text-error">*</span>
            </label>
            <p className="text-xs text-text-muted mb-2">Quel est le constat de départ ? Qui rencontre ce problème ?</p>
            <textarea
              id="problem"
              {...register('problem')}
              rows={3}
              className={cn(
                "w-full p-4 rounded-xl bg-background border text-text-primary resize-y focus:outline-none focus:ring-2 transition-all",
                errors.problem ? "border-error focus:ring-error" : "border-border focus:ring-accent"
              )}
              placeholder="Ex: Les agriculteurs urbains manquent de données sur l'humidité des sols..."
            />
            {errors.problem && <p className="text-xs text-error">{errors.problem.message}</p>}
          </div>

          {/* ─── 3. La Solution ─── */}
          <div className="space-y-2">
            <label htmlFor="solution" className="text-sm font-bold text-text-primary">
              Votre Solution <span className="text-error">*</span>
            </label>
            <p className="text-xs text-text-muted mb-2">Comment allez-vous résoudre ce problème (techno, concept) ?</p>
            <textarea
              id="solution"
              {...register('solution')}
              rows={4}
              className={cn(
                "w-full p-4 rounded-xl bg-background border text-text-primary resize-y focus:outline-none focus:ring-2 transition-all",
                errors.solution ? "border-error focus:ring-error" : "border-border focus:ring-accent"
              )}
              placeholder="Ex: Un réseau de capteurs connectés à une application d'analyse..."
            />
            {errors.solution && <p className="text-xs text-error">{errors.solution.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ─── 4. Statut de l'équipe ─── */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-text-primary">
                Statut de l'équipe <span className="text-error">*</span>
              </label>
              <Controller
                name="teamStatus"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label className={cn(
                      "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                      field.value === 'looking_for_members' ? "border-accent bg-accent/5" : "border-border bg-background hover:bg-surface-hover"
                    )}>
                      <input
                        type="radio"
                        className="mr-3 text-accent focus:ring-accent"
                        value="looking_for_members"
                        checked={field.value === 'looking_for_members'}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <span className="text-sm font-medium text-text-primary">Cherche des associés</span>
                    </label>
                    <label className={cn(
                      "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                      field.value === 'solo' ? "border-accent bg-accent/5" : "border-border bg-background hover:bg-surface-hover"
                    )}>
                      <input
                        type="radio"
                        className="mr-3 text-accent focus:ring-accent"
                        value="solo"
                        checked={field.value === 'solo'}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <span className="text-sm font-medium text-text-primary">Projet Solo</span>
                    </label>
                    <label className={cn(
                      "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                      field.value === 'complete' ? "border-accent bg-accent/5" : "border-border bg-background hover:bg-surface-hover"
                    )}>
                      <input
                        type="radio"
                        className="mr-3 text-accent focus:ring-accent"
                        value="complete"
                        checked={field.value === 'complete'}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <span className="text-sm font-medium text-text-primary">Équipe Complète</span>
                    </label>
                  </div>
                )}
              />
              {errors.teamStatus && <p className="text-xs text-error">{errors.teamStatus.message}</p>}
            </div>

            {/* ─── 5. Tags & Upload ─── */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-bold text-text-primary">
                  Mots-clés (Tags) <span className="text-error">*</span>
                </label>
                <p className="text-xs text-text-muted mb-2">Séparez par des virgules (ex: IoT, Mobile, Finance)</p>
                <input
                  id="tags"
                  {...register('tags')}
                  placeholder="Tech, Design, Web..."
                  className={cn(
                    "w-full h-12 px-4 rounded-xl bg-background border text-text-primary focus:outline-none focus:ring-2 transition-all",
                    errors.tags ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                  )}
                />
                {errors.tags && <p className="text-xs text-error">{errors.tags.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary block">
                  Pièce jointe (Optionnel)
                </label>
                <p className="text-xs text-text-muted mb-2">Un pitch deck, un PDF ou une maquette (Max 5MB)</p>
                <label className="flex items-center justify-center w-full h-24 px-4 transition bg-background border-2 border-border border-dashed rounded-xl appearance-none cursor-pointer hover:border-accent/50 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-text-muted" />
                    <span className="font-medium text-text-secondary text-sm">
                      {fileName ? fileName : 'Cliquez pour uploader'}
                    </span>
                  </span>
                  <input type="file" name="file_upload" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg,.zip" />
                </label>
              </div>
            </div>
          </div>

          {/* ─── Séparateur ─── */}
          <div className="h-px bg-border w-full my-8" />

          {/* ─── Actions ─── */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-xs text-text-muted">
              En soumettant cette idée, vous acceptez le <a href="/documentation" className="text-accent hover:underline">règlement du Hub</a>.
            </p>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Soumission…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Publier l'idée
                </span>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
