import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, Link2, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

// ============================================================================
// SCHÉMA DE VALIDATION (Zod)
// ============================================================================
const formSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  filiere: z.string().min(2, 'La filière doit contenir au moins 2 caractères'),
  birthDate: z.string().optional(),
  bio: z.string().max(300, 'La biographie ne doit pas dépasser 300 caractères').optional(),
  specialties: z.string().optional(),
  hobbies: z.string().optional(),
  github: z.string().url('URL non valide').or(z.literal('')).optional(),
  linkedin: z.string().url('URL non valide').or(z.literal('')).optional(),
  portfolio: z.string().url('URL non valide').or(z.literal('')).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ModifierProfil() {
  const { user, updateUserMetadata } = useAuth()
  const navigate = useNavigate()
  
  const [avatarBase64, setAvatarBase64] = useState<string>('')
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialisation des données
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      filiere: '',
      birthDate: '',
      bio: '',
      specialties: '',
      hobbies: '',
      github: '',
      linkedin: '',
      portfolio: '',
    }
  })

  // Charger les données de l'utilisateur
  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata || {}
      setValue('firstName', metadata.first_name || '')
      setValue('lastName', metadata.last_name || '')
      setValue('filiere', metadata.filiere || 'Général')
      setValue('birthDate', metadata.birth_date || '')
      setValue('bio', metadata.bio || '')
      setValue('specialties', metadata.specialties?.join(', ') || '')
      setValue('hobbies', metadata.hobbies?.join(', ') || '')
      setValue('github', metadata.links?.github || '')
      setValue('linkedin', metadata.links?.linkedin || '')
      setValue('portfolio', metadata.links?.portfolio || '')
      
      setAvatarBase64(metadata.avatar_url || '')
    }
  }, [user, setValue])

  // Conversion d'un fichier en Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  // Traitement du fichier importé
  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Veuillez sélectionner uniquement des images (PNG, JPG, JPEG, SVG).')
      return
    }
    if (file.size > 2 * 1024 * 1024) { // Limite 2MB pour le base64 de métadonnées
      setErrorMsg('La taille de l\'image ne doit pas dépasser 2 Mo.')
      return
    }
    setErrorMsg(null)
    try {
      const base64 = await fileToBase64(file)
      setAvatarBase64(base64)
    } catch (e) {
      console.error(e)
      setErrorMsg('Erreur lors du traitement de l\'image.')
    }
  }

  // Événements Drag and Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0])
    }
  }

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Soumission
  const onSubmit = async (values: FormValues) => {
    if (!user) return
    setIsSubmitting(true)
    setErrorMsg(null)

    const specialtiesArray = values.specialties
      ? values.specialties.split(',').map(s => s.trim()).filter(Boolean)
      : []

    const hobbiesArray = values.hobbies
      ? values.hobbies.split(',').map(h => h.trim()).filter(Boolean)
      : []

    try {
      await updateUserMetadata({
        full_name: `${values.firstName} ${values.lastName}`.trim(),
        first_name: values.firstName,
        last_name: values.lastName,
        avatar_url: avatarBase64 || `https://api.dicebear.com/7.x/initials/svg?seed=${user.id}`,
        filiere: values.filiere,
        birth_date: values.birthDate,
        hobbies: hobbiesArray,
        bio: values.bio,
        specialties: specialtiesArray,
        links: {
          ...(values.github && { github: values.github }),
          ...(values.linkedin && { linkedin: values.linkedin }),
          ...(values.portfolio && { portfolio: values.portfolio }),
        }
      })
      navigate('/profil/me')
    } catch (e: any) {
      console.error(e)
      setErrorMsg(e.message || 'Une erreur est survenue lors de la mise à jour.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-hub max-w-3xl mx-auto">
        
        {/* Retour au Profil */}
        <div className="mb-6 flex justify-start">
          <Link to="/profil/me" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour à mon profil
          </Link>
        </div>

        {/* En-tête */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-text-primary mb-2">Modifier mon profil</h1>
          <p className="text-text-secondary">
            Personnalisez vos informations de profil afin d'optimiser vos collaborations et candidatures pour la Journée du Numérique.
          </p>
        </div>

        {/* Message d'erreur global */}
        {errorMsg && (
          <div className="mb-8 p-4 bg-error/5 border border-error/20 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <p className="text-sm text-error font-medium">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
          
          {/* Section 1 : Photo de profil (Drag & Drop) */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-text-primary block">
              Photo de profil <span className="text-error">*</span>
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-border/50 bg-background-alt">
              {/* Preview */}
              <Avatar className="w-24 h-24 border-2 border-border shadow-sm">
                <AvatarImage src={avatarBase64} alt="Aperçu avatar" />
                <AvatarFallback className="bg-accent/10 text-accent font-bold text-xl">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>

              {/* Zone Drag & Drop */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={handleTriggerFileInput}
                className={cn(
                  "flex-1 w-full h-28 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-200 focus:outline-none select-none",
                  dragActive ? "border-accent bg-accent/5 scale-[0.99]" : "border-border hover:border-accent/40 bg-background hover:bg-surface-hover"
                )}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                  className="hidden"
                />
                <Upload className="w-5 h-5 text-text-muted mb-1.5" />
                <p className="text-xs text-text-primary font-semibold">
                  Glissez-déposez une photo ici ou cliquez pour parcourir
                </p>
                <p className="text-[10px] text-text-muted mt-1">
                  Format acceptés : PNG, JPG, JPEG, SVG. Maximum 2 Mo.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 : Identité */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-bold text-text-primary">
                Prénom <span className="text-error">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName')}
                placeholder="Ex: Sarah"
                className={cn(
                  "w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all",
                  errors.firstName ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                )}
              />
              {errors.firstName && <p className="text-xs text-error">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-bold text-text-primary">
                Nom <span className="text-error">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName')}
                placeholder="Ex: Mian"
                className={cn(
                  "w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all",
                  errors.lastName ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                )}
              />
              {errors.lastName && <p className="text-xs text-error">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Section 3 : Filière & Naissance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="filiere" className="text-sm font-bold text-text-primary">
                Filière <span className="text-error">*</span>
              </label>
              <input
                id="filiere"
                type="text"
                {...register('filiere')}
                placeholder="Ex: Génie Logiciel, Télécoms..."
                className={cn(
                  "w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all",
                  errors.filiere ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                )}
              />
              {errors.filiere && <p className="text-xs text-error">{errors.filiere.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-sm font-bold text-text-primary">
                Date de naissance
              </label>
              <input
                id="birthDate"
                type="date"
                {...register('birthDate')}
                className={cn(
                  "w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all",
                  errors.birthDate ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                )}
              />
              {errors.birthDate && <p className="text-xs text-error">{errors.birthDate.message}</p>}
            </div>
          </div>

          {/* Section 4 : Bio */}
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-bold text-text-primary">
              Biographie / Description
            </label>
            <p className="text-[11px] text-text-muted">Parlez de vos passions, motivations ou objectifs (Max 300 caractères).</p>
            <textarea
              id="bio"
              rows={4}
              {...register('bio')}
              placeholder="Ex: Développeuse Fullstack passionnée par le web et l'IA..."
              className={cn(
                "w-full p-4 rounded-xl bg-background border text-sm text-text-primary resize-none focus:outline-none focus:ring-2 transition-all",
                errors.bio ? "border-error focus:ring-error" : "border-border focus:ring-accent"
              )}
            />
            {errors.bio && <p className="text-xs text-error">{errors.bio.message}</p>}
          </div>

          {/* Section 5 : Spécialités & Hobbies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="specialties" className="text-sm font-bold text-text-primary">
                Compétences (Spécialités)
              </label>
              <p className="text-[11px] text-text-muted">Séparez par des virgules (ex: React, Design, IoT)</p>
              <input
                id="specialties"
                type="text"
                {...register('specialties')}
                placeholder="Ex: Java, Python, UI/UX..."
                className="w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="hobbies" className="text-sm font-bold text-text-primary">
                Hobbies / Passions
              </label>
              <p className="text-[11px] text-text-muted">Séparés par des virgules (ex: Lecture, Jeux Vidéo)</p>
              <input
                id="hobbies"
                type="text"
                {...register('hobbies')}
                placeholder="Ex: Football, Musique..."
                className="w-full h-11 px-4 rounded-xl bg-background border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all border-border focus:ring-accent"
              />
            </div>
          </div>

          {/* Section 6 : Liens */}
          <div className="space-y-4 pt-4 border-t border-border/80">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-accent" />
              Liens de réseaux
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="linkedin" className="text-[11px] font-semibold text-text-secondary">LinkedIn URL</label>
                <input
                  id="linkedin"
                  type="text"
                  {...register('linkedin')}
                  placeholder="https://linkedin.com/in/..."
                  className={cn(
                    "w-full h-10 px-3 rounded-lg bg-background border text-xs text-text-primary focus:outline-none focus:ring-2 transition-all",
                    errors.linkedin ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                  )}
                />
                {errors.linkedin && <p className="text-[10px] text-error">{errors.linkedin.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="github" className="text-[11px] font-semibold text-text-secondary">GitHub URL</label>
                <input
                  id="github"
                  type="text"
                  {...register('github')}
                  placeholder="https://github.com/..."
                  className={cn(
                    "w-full h-10 px-3 rounded-lg bg-background border text-xs text-text-primary focus:outline-none focus:ring-2 transition-all",
                    errors.github ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                  )}
                />
                {errors.github && <p className="text-[10px] text-error">{errors.github.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="portfolio" className="text-[11px] font-semibold text-text-secondary">Portfolio / Site Web</label>
                <input
                  id="portfolio"
                  type="text"
                  {...register('portfolio')}
                  placeholder="https://..."
                  className={cn(
                    "w-full h-10 px-3 rounded-lg bg-background border text-xs text-text-primary focus:outline-none focus:ring-2 transition-all",
                    errors.portfolio ? "border-error focus:ring-error" : "border-border focus:ring-accent"
                  )}
                />
                {errors.portfolio && <p className="text-[10px] text-error">{errors.portfolio.message}</p>}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6 gap-3 border-t border-border/80">
            <Button type="button" variant="ghost" onClick={() => navigate('/profil/me')}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Sauvegarde…
                </span>
              ) : (
                'Enregistrer les modifications'
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
