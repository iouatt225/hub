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

interface EditProfilModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: UserProfile
  onSave: (updatedProfile: Partial<UserProfile>) => void
}

export function EditProfilModal({ open, onOpenChange, profile, onSave }: EditProfilModalProps) {
  const [bio, setBio] = useState(profile.bio || '')
  const [specialties, setSpecialties] = useState(profile.specialties.join(', ') || '')
  const [github, setGithub] = useState(profile.links.github || '')
  const [linkedin, setLinkedin] = useState(profile.links.linkedin || '')
  const [portfolio, setPortfolio] = useState(profile.links.portfolio || '')
  
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 800))

    const specialtiesArray = specialties
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    onSave({
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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Modifier mon profil</DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations pour mieux collaborer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
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

          <div className="flex justify-end pt-4">
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
