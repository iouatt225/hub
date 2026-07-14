/**
 * Constantes de marque — Hub d'Idées & Incubation EMSP
 * Centralise les textes et valeurs réutilisés dans toute l'application.
 */

export const BRAND = {
  /** Nom complet de la plateforme */
  name: "Hub d'Idées & Incubation",
  /** Nom court pour les espaces restreints */
  shortName: "Hub EMSP",
  /** Baseline / slogan */
  baseline: "Propulsez vos idées pour la Journée du Numérique",
  /** Description complète */
  description:
    "Plateforme collaborative de l'EMSP permettant aux étudiants de déposer, voter et rejoindre des projets innovants pour la Journée du Numérique.",
  /** Nom de l'école */
  school: "École Supérieure Multinationale des Postes",
  /** Acronyme de l'école */
  schoolAcronym: "EMSP",
  /** Ville */
  city: "Abidjan",
  /** Événement principal */
  event: "Journée du Numérique",
} as const;

/** Liens de navigation principale */
export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Hub", href: "/hub" },
  { label: "Documentation", href: "/documentation" },
] as const;

/** Liens du footer — colonne Explorer */
export const FOOTER_EXPLORE_LINKS = [
  { label: "Projets", href: "/hub" },
  { label: "Règlement", href: "/documentation#reglement" },
  { label: "Charte", href: "/documentation#charte" },
] as const;

/** Liens du footer — colonne Club Info */
export const FOOTER_CLUB_LINKS = [
  { label: "Recrutement", href: "/recrutement" },
] as const;

/** Liens sociaux */
export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Twitter / X", href: "#", icon: "twitter" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
] as const;

/** Couleurs du design system (pour usage programmatique) */
export const COLORS = {
  accent: "#facc15",
  accentHover: "#eab308",
  background: "#0a0a0f",
  backgroundAlt: "#111118",
  surface: "#1a1a2e",
  textPrimary: "#fafafa",
  textSecondary: "#a3a3a3",
} as const;

/** Domaine email par défaut pour les exemples */
export const EMSP_EMAIL_DOMAIN = "gmail.com";

/** Regex de validation email générique (permet n'importe quel domaine d'email) */
export const EMSP_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
