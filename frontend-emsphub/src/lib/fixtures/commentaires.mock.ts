/**
 * Données mockées — Commentaires pour le portail d'administration.
 * Sera remplacé par des appels Supabase au Bloc 16.
 */

export type CommentStatus = 'active' | 'hidden' | 'flagged'

export interface AdminComment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  content: string
  projectId: string
  projectTitle: string
  status: CommentStatus
  createdAt: string
}

export const MOCK_ADMIN_COMMENTS: AdminComment[] = [
  {
    id: 'cmt-1',
    author: { id: 'usr-9', name: 'Prof. Diallo Y.', avatar: 'https://i.pravatar.cc/150?u=diallo' },
    content: 'Très belle initiative. Avez-vous pensé à la contrainte d\'énergie pour ce type de solution ?',
    projectId: 'proj-1',
    projectTitle: 'Plateforme IoT pour l\'agriculture urbaine',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'cmt-2',
    author: { id: 'usr-1', name: 'Amadou K.', avatar: 'https://i.pravatar.cc/150?u=amadou' },
    content: 'Oui, nous prévoyons d\'utiliser des composants basse consommation (BLE).',
    projectId: 'proj-1',
    projectTitle: 'Plateforme IoT pour l\'agriculture urbaine',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
  },
  {
    id: 'cmt-3',
    author: { id: 'usr-7', name: 'Kouadio B.', avatar: 'https://i.pravatar.cc/150?u=kouadio' },
    content: 'Ce projet est nul et ne mérite pas d\'être présenté.',
    projectId: 'proj-2',
    projectTitle: 'Application de covoiturage étudiant EMSP',
    status: 'flagged',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'cmt-4',
    author: { id: 'usr-4', name: 'Fatou S.', avatar: 'https://i.pravatar.cc/150?u=fatou' },
    content: 'J\'adorerais rejoindre l\'équipe ! Je peux apporter mes compétences en IA.',
    projectId: 'proj-4',
    projectTitle: 'Plateforme de mentorat Alumni-Étudiants',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'cmt-5',
    author: { id: 'usr-2', name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    content: 'Avez-vous prévu une fonctionnalité de géolocalisation pour optimiser les trajets ?',
    projectId: 'proj-2',
    projectTitle: 'Application de covoiturage étudiant EMSP',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'cmt-6',
    author: { id: 'usr-10', name: 'Ousmane L.', avatar: 'https://i.pravatar.cc/150?u=ousmane' },
    content: 'Le concept est intéressant mais la faisabilité technique me semble un peu limitée pour un campus de cette taille.',
    projectId: 'proj-3',
    projectTitle: 'Système de paiement unifié par NFC pour le campus',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    id: 'cmt-7',
    author: { id: 'usr-8', name: 'Aïcha T.', avatar: 'https://i.pravatar.cc/150?u=aicha' },
    content: 'Allez voir mon site spam123.com pour gagner de l\'argent facilement !',
    projectId: 'proj-1',
    projectTitle: 'Plateforme IoT pour l\'agriculture urbaine',
    status: 'flagged',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'cmt-8',
    author: { id: 'usr-6', name: 'Marie-Claire A.', avatar: 'https://i.pravatar.cc/150?u=marieclaire' },
    content: 'En tant que jury, je trouve cette approche très prometteuse. Le lien avec la supply chain est évident.',
    projectId: 'proj-3',
    projectTitle: 'Système de paiement unifié par NFC pour le campus',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'cmt-9',
    author: { id: 'usr-3', name: 'Jean-Marc D.', avatar: 'https://i.pravatar.cc/150?u=jeanmarc' },
    content: 'Merci pour le retour ! Nous travaillons actuellement sur un prototype avec des tags NFC passifs.',
    projectId: 'proj-3',
    projectTitle: 'Système de paiement unifié par NFC pour le campus',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'cmt-10',
    author: { id: 'usr-7', name: 'Kouadio B.', avatar: 'https://i.pravatar.cc/150?u=kouadio' },
    content: 'Commentaire masqué par un administrateur pour contenu inapproprié.',
    projectId: 'proj-4',
    projectTitle: 'Plateforme de mentorat Alumni-Étudiants',
    status: 'hidden',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: 'cmt-11',
    author: { id: 'usr-1', name: 'Amadou K.', avatar: 'https://i.pravatar.cc/150?u=amadou' },
    content: 'L\'idée du matchmaking IA est top ! Quel algorithme pensez-vous utiliser ?',
    projectId: 'proj-4',
    projectTitle: 'Plateforme de mentorat Alumni-Étudiants',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 'cmt-12',
    author: { id: 'usr-4', name: 'Fatou S.', avatar: 'https://i.pravatar.cc/150?u=fatou' },
    content: 'Nous pensons utiliser un système de recommendation collaborative, comme pour les plateformes de streaming.',
    projectId: 'proj-4',
    projectTitle: 'Plateforme de mentorat Alumni-Étudiants',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
  },
]

/**
 * Fonction mockée simulant un appel API pour récupérer tous les commentaires.
 */
export async function fetchAdminComments(): Promise<AdminComment[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return [...MOCK_ADMIN_COMMENTS]
}
