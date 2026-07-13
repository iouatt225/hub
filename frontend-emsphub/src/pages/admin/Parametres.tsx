import { useState } from 'react'
import {
  Settings,
  Calendar,
  Tag,
  Shield,
  Palette,
  Plus,
  X,
  Save,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/** Tags initiaux de la plateforme */
const INITIAL_TAGS = [
  'IoT', 'IA', 'Mobile App', 'FinTech', 'Soutenabilité', 'Réseautage',
  'Blockchain', 'Hardware', 'Santé', 'Éducation', 'Mobilité', 'Entraide',
]

/**
 * Page Paramètres — portail d'administration.
 * Configuration de la plateforme : général, tags, modération, apparence.
 */
export function Parametres() {
  // Section Général
  const [platformName, setPlatformName] = useState("Hub d'Idées & Incubation")
  const [eventDate, setEventDate] = useState('2026-11-15')
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Bienvenue sur le Hub EMSP ! Déposez vos idées et rejoignez des équipes pour la Journée du Numérique.'
  )

  // Section Tags
  const [tags, setTags] = useState<string[]>(INITIAL_TAGS)
  const [newTag, setNewTag] = useState('')

  // Section Modération
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [registrationEnabled, setRegistrationEnabled] = useState(true)
  const [autoModeration, setAutoModeration] = useState(false)
  const [bannedWords, setBannedWords] = useState('spam, arnaque, gratuit')

  // Section Apparence
  const [accentColor, setAccentColor] = useState('#556B2F')

  // État de sauvegarde (simulé)
  const [isSaving, setIsSaving] = useState(false)
  const [savedSection, setSavedSection] = useState<string | null>(null)

  const handleSave = async (section: string) => {
    setIsSaving(true)
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsSaving(false)
    setSavedSection(section)
    setTimeout(() => setSavedSection(null), 2000)
  }

  const addTag = () => {
    const trimmed = newTag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  /** Bouton toggle réutilisable */
  const Toggle = ({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) => (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 w-full text-left group"
      type="button"
    >
      {enabled ? (
        <ToggleRight className="w-8 h-8 text-accent shrink-0" />
      ) : (
        <ToggleLeft className="w-8 h-8 text-neutral-400 shrink-0" />
      )}
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
    </button>
  )

  /** Indicateur de sauvegarde */
  const SaveIndicator = ({ section }: { section: string }) => (
    savedSection === section ? (
      <span className="text-xs text-success font-medium animate-fade-in">✓ Sauvegardé</span>
    ) : null
  )

  return (
    <div className="flex justify-center w-full py-4">
      <div className="space-y-10 w-full max-w-3xl">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Paramètres</h1>
          <p className="text-text-secondary mt-1">Configurez les paramètres de la plateforme Hub EMSP</p>
        </div>

      {/* Section Général */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Settings className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-base font-bold text-text-primary">Général</h2>
          </div>
          <div className="flex items-center gap-3">
            <SaveIndicator section="general" />
            <Button
              variant="default"
              size="sm"
              onClick={() => handleSave('general')}
              disabled={isSaving}
              className="text-sm"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1.5">
              Nom de la plateforme
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full h-10 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-text-primary block mb-1.5">
              <Calendar className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Date de la Journée du Numérique
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full h-10 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-text-primary block mb-1.5">
              Message d'accueil personnalisé
            </label>
            <textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
            />
          </div>
        </div>
      </div>

      {/* Section Tags */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-info/10 rounded-xl">
              <Tag className="w-5 h-5 text-info" />
            </div>
            <h2 className="text-base font-bold text-text-primary">Tags autorisés</h2>
          </div>
          <div className="flex items-center gap-3">
            <SaveIndicator section="tags" />
            <Button
              variant="default"
              size="sm"
              onClick={() => handleSave('tags')}
              disabled={isSaving}
              className="text-sm"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        {/* Ajout de tag */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Nouveau tag..."
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            className="flex-1 h-10 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
          />
          <Button variant="outline" size="sm" onClick={addTag} className="h-10 px-4">
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>

        {/* Liste des tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background-alt text-sm text-text-secondary border border-border group hover:border-error/30 transition-colors"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-text-muted hover:text-error transition-colors"
                title={`Supprimer le tag "${tag}"`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3">{tags.length} tag(s) configuré(s)</p>
      </div>

      {/* Section Modération */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-xl">
              <Shield className="w-5 h-5 text-warning" />
            </div>
            <h2 className="text-base font-bold text-text-primary">Modération</h2>
          </div>
          <div className="flex items-center gap-3">
            <SaveIndicator section="moderation" />
            <Button
              variant="default"
              size="sm"
              onClick={() => handleSave('moderation')}
              disabled={isSaving}
              className="text-sm"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          <Toggle
            enabled={commentsEnabled}
            onToggle={() => setCommentsEnabled(!commentsEnabled)}
            label="Activer les commentaires sur les projets"
          />
          <Toggle
            enabled={registrationEnabled}
            onToggle={() => setRegistrationEnabled(!registrationEnabled)}
            label="Activer les nouvelles inscriptions"
          />
          <Toggle
            enabled={autoModeration}
            onToggle={() => setAutoModeration(!autoModeration)}
            label="Modération automatique des commentaires (filtrage par mots clés)"
          />

          {autoModeration && (
            <div className="ml-11 animate-fade-in">
              <label className="text-sm font-medium text-text-primary block mb-1.5">
                Mots interdits (séparés par des virgules)
              </label>
              <textarea
                value={bannedWords}
                onChange={(e) => setBannedWords(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Section Apparence */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-highlight/10 rounded-xl">
              <Palette className="w-5 h-5 text-highlight-hover" />
            </div>
            <h2 className="text-base font-bold text-text-primary">Apparence</h2>
          </div>
          <div className="flex items-center gap-3">
            <SaveIndicator section="apparence" />
            <Button
              variant="default"
              size="sm"
              onClick={() => handleSave('apparence')}
              disabled={isSaving}
              className="text-sm"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Couleur d'accent
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-12 h-12 rounded-xl border border-border cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl bg-background border border-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
                />
              </div>
              {/* Preview */}
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-xl border border-border"
                  style={{ backgroundColor: accentColor }}
                  title="Aperçu"
                />
                <div
                  className={cn('w-10 h-10 rounded-xl border border-border flex items-center justify-center')}
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <span className="text-xs font-bold" style={{ color: accentColor }}>Aa</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Cette couleur sera utilisée comme accent principal sur toute la plateforme.
            </p>
          </div>

          {/* Couleurs prédéfinies */}
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Palettes suggérées
            </label>
            <div className="flex gap-2">
              {[
                { color: '#556B2F', name: 'Olive' },
                { color: '#2563eb', name: 'Bleu' },
                { color: '#059669', name: 'Menthe' },
                { color: '#7c3aed', name: 'Violet' },
                { color: '#dc2626', name: 'Rouge' },
                { color: '#ea580c', name: 'Orange' },
              ].map(palette => (
                <button
                  key={palette.color}
                  onClick={() => setAccentColor(palette.color)}
                  title={palette.name}
                  className={cn(
                    'w-10 h-10 rounded-xl border-2 transition-transform hover:scale-110',
                    accentColor === palette.color ? 'border-text-primary scale-110' : 'border-border'
                  )}
                  style={{ backgroundColor: palette.color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
