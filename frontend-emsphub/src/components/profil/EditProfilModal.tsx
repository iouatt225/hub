import { useState, type FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import type { UserProfile } from '@/lib/fixtures/profils.mock'

import { useAuth } from '@/contexts/AuthContext'

interface EditProfilModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: UserProfile
  onSave: (updatedProfile: Partial<UserProfile>) => void
}

export function EditProfilModal({ open, onOpenChange, profile, onSave }: EditProfilModalProps) {
  const { updateUserMetadata } = useAuth()
  
  const [firstName, setFirstName] = useState(profile.firstName || '')
  const [lastName, setLastName] = useState(profile.lastName || '')
  const [filiere, setFiliere] = useState(profile.filiere || '')
  const [birthDate, setBirthDate] = useState(profile.birthDate || '')
  const [hobbies, setHobbies] = useState(profile.hobbies?.join(', ') || '')
  const [avatar, setAvatar] = useState(profile.avatar || '')
  const [bio, setBio] = useState(profile.bio || '')
  const [specialties, setSpecialties] = useState(profile.specialties.join(', ') || '')
  const [github, setGithub] = useState(profile.links.github || '')
  const [linkedin, setLinkedin] = useState(profile.links.linkedin || '')
  const [portfolio, setPortfolio] = useState(profile.links.portfolio || '')
  
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const specialtiesArray = specialties
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    const hobbiesArray = hobbies
      .split(',')
      .map(h => h.trim())
      .filter(h => h.length > 0)

    try {
      // Sauvegarde réelle dans Supabase Auth Metadata
      await updateUserMetadata({
        full_name: `${firstName} ${lastName}`.trim() || profile.fullName,
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatar || profile.avatar,
        filiere,
        birth_date: birthDate,
        hobbies: hobbiesArray,
        bio,
        specialties: specialtiesArray,
        links: {
          ...(github && { github }),
          ...(linkedin && { linkedin }),
          ...(portfolio && { portfolio }),
        }
      })
    } catch (error) {
      console.error('Erreur lors de la mise à jour Supabase:', error)
    }

    // Sauvegarde en local (state) pour retour immédiat
    onSave({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`.trim() || profile.fullName,
      filiere,
      birthDate,
      hobbies: hobbiesArray,
      avatar: avatar || profile.avatar,
      bio,
      specialties: specialtiesArray,
      links: {
        ...(github && { github }),
        ...(linkedin && { linkedin }),
        ...(portfolio && { portfolio }),
      }
    })

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Modifier mon profil</DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations personnelles pour mieux collaborer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Nom & Prénom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-bold text-text-primary">
                Prénom
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex: Sarah"
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-bold text-text-primary">
                Nom
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ex: Mian"
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Photo de profil (Avatar) */}
          <div className="space-y-2">
            <label htmlFor="avatar" className="text-sm font-bold text-text-primary">
              URL de la photo de profil
            </label>
            <input
              id="avatar"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Filière & Date de naissance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="filiere" className="text-sm font-bold text-text-primary">
                Filière
              </label>
              <input
                id="filiere"
                type="text"
                value={filiere}
                onChange={(e) => setFiliere(e.target.value)}
                placeholder="Ex: Génie Logiciel"
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-sm font-bold text-text-primary">
                Date de naissance
              </label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-bold text-text-primary">
              Biographie
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Décrivez votre parcours, vos passions..."
              className="w-full p-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          {/* Spécialités */}
          <div className="space-y-2">
            <label htmlFor="specialties" className="text-sm font-bold text-text-primary">
              Compétences & Spécialités
            </label>
            <p className="text-xs text-text-muted">Séparées par des virgules (ex: React, Design, IoT)</p>
            <input
              id="specialties"
              type="text"
              value={specialties}
              onChange={(e) => setSpecialties(e.target.value)}
              placeholder="Ex: Dev Web, UI/UX..."
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Hobbies */}
          <div className="space-y-2">
            <label htmlFor="hobbies" className="text-sm font-bold text-text-primary">
              Hobbies / Passions
            </label>
            <p className="text-xs text-text-muted">Séparés par des virgules (ex: Lecture, Jeux Vidéo, Football)</p>
            <input
              id="hobbies"
              type="text"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="Ex: Football, Lecture..."
              className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Liens */}
          <div className="space-y-3 pt-2">
            <label className="text-sm font-bold text-text-primary border-b border-border pb-1 block">
              Liens (Optionnel)
            </label>
            
            <div className="space-y-1">
              <label htmlFor="linkedin" className="text-xs text-text-muted">LinkedIn URL</label>
              <input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="github" className="text-xs text-text-muted">GitHub URL</label>
              <input
                id="github"
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="portfolio" className="text-xs text-text-muted">Portfolio / Site Web</label>
              <input
                id="portfolio"
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://..."
                className="w-full h-10 px-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 animate-fade-in">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="mr-2">
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sauvegarde...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
