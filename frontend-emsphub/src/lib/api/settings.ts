import { supabase } from '@/lib/supabase'

export interface PlatformSettings {
  platformName: string
  eventDate: string
  welcomeMessage: string
  tags: string[]
  commentsEnabled: boolean
  registrationEnabled: boolean
  autoModeration: boolean
  bannedWords: string
  accentColor: string
}

/**
 * Récupère les paramètres système depuis la base de données
 */
export async function fetchSettings(): Promise<PlatformSettings> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('key, value')

    if (error) throw error

    // Valeurs par défaut au cas où la table est vide ou inaccessible
    const defaultSettings: PlatformSettings = {
      platformName: "Hub d'Idées & Incubation",
      eventDate: "2026-11-15",
      welcomeMessage: "Bienvenue sur le Hub EMSP ! Déposez vos idées et rejoignez des équipes pour la Journée du Numérique.",
      tags: ["IoT", "IA", "Mobile App", "FinTech", "Soutenabilité", "Réseautage", "Blockchain", "Hardware", "Santé", "Éducation", "Mobilité", "Entraide"],
      commentsEnabled: true,
      registrationEnabled: true,
      autoModeration: false,
      bannedWords: "spam, arnaque, gratuit",
      accentColor: "#15803D"
    }

    if (!data || data.length === 0) {
      return defaultSettings
    }

    // Convertit le tableau de clé/valeur en objet typé
    const settings = { ...defaultSettings }
    data.forEach((row: { key: string; value: any }) => {
      if (row.key in settings) {
        (settings as any)[row.key] = row.value
      }
    })

    return settings
  } catch (err) {
    console.error('Erreur lors du chargement des paramètres:', err)
    // Retourner les valeurs par défaut pour ne pas bloquer l'interface
    return {
      platformName: "Hub d'Idées & Incubation",
      eventDate: "2026-11-15",
      welcomeMessage: "Bienvenue sur le Hub EMSP ! Déposez vos idées et rejoignez des équipes pour la Journée du Numérique.",
      tags: ["IoT", "IA", "Mobile App", "FinTech", "Soutenabilité", "Réseautage", "Blockchain", "Hardware", "Santé", "Éducation", "Mobilité", "Entraide"],
      commentsEnabled: true,
      registrationEnabled: true,
      autoModeration: false,
      bannedWords: "spam, arnaque, gratuit",
      accentColor: "#15803D"
    }
  }
}

/**
 * Sauvegarde les paramètres modifiés dans la base de données
 */
export async function saveSettings(settings: Partial<PlatformSettings>): Promise<boolean> {
  try {
    const promises = Object.entries(settings).map(async ([key, value]) => {
      const { error } = await supabase
        .from('settings')
        .upsert({ key, value })
      if (error) throw error
    })

    await Promise.all(promises)
    return true
  } catch (err) {
    console.error('Erreur lors de la sauvegarde des paramètres:', err)
    return false
  }
}
