export type TeamStatus = 'solo' | 'complete' | 'looking_for_members'

/** Données de miniature pour le feed social */
export interface ProjectThumbnail {
  gradient: string
  emoji: string
}

export interface Project {
  id: string
  title: string
  problem: string
  solution: string
  teamStatus: TeamStatus
  tags: string[]
  author: {
    id: string
    name: string
    avatar: string
  }
  votes: number
  commentCount: number
  createdAt: string
  isOfficialSelection?: boolean
  thumbnail: ProjectThumbnail
}

export interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  content: string
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
}

export interface ProjectDetail extends Project {
  teamMembers: TeamMember[]
  comments: Comment[]
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Plateforme IoT pour l\'agriculture urbaine',
    problem: 'Les agriculteurs urbains manquent de données sur l\'humidité et la qualité des sols. Sans outils de mesure accessibles, ils gaspillent de l\'eau et obtiennent des rendements faibles.',
    solution: 'Un réseau de capteurs connectés à une application d\'analyse prédictive et d\'arrosage automatisé.',
    teamStatus: 'looking_for_members',
    tags: ['IoT', 'Agriculture', 'Soutenabilité'],
    author: {
      id: 'usr-1',
      name: 'Amadou K.',
      avatar: 'https://i.pravatar.cc/150?u=amadou',
    },
    votes: 142,
    commentCount: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    isOfficialSelection: true,
    thumbnail: { gradient: 'from-emerald-500 to-teal-600', emoji: '🌱' },
  },
  {
    id: 'proj-2',
    title: 'Application de covoiturage étudiant EMSP',
    problem: 'Problèmes récurrents de transport pour se rendre au campus depuis certains quartiers. Le coût des taxis et l\'irrégularité des transports publics pénalisent les étudiants.',
    solution: 'Une application de mise en relation sécurisée réservée aux étudiants pour partager les trajets.',
    teamStatus: 'complete',
    tags: ['Mobilité', 'Mobile App', 'Entraide'],
    author: {
      id: 'usr-2',
      name: 'Sarah M.',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
    votes: 89,
    commentCount: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    thumbnail: { gradient: 'from-blue-500 to-indigo-600', emoji: '🚗' },
  },
  {
    id: 'proj-3',
    title: 'Système de paiement unifié par NFC pour le campus',
    problem: 'Multiplicité des cartes et moyens de paiement à la cafétéria, bibliothèque et administration. Les étudiants perdent du temps et de l\'argent en frais divers.',
    solution: 'Intégration d\'un système NFC universel dans la carte étudiante lié à un portefeuille virtuel.',
    teamStatus: 'solo',
    tags: ['FinTech', 'Hardware', 'NFC'],
    author: {
      id: 'usr-3',
      name: 'Jean-Marc D.',
      avatar: 'https://i.pravatar.cc/150?u=jeanmarc',
    },
    votes: 45,
    commentCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    thumbnail: { gradient: 'from-amber-500 to-orange-600', emoji: '💳' },
  },
  {
    id: 'proj-4',
    title: 'Plateforme de mentorat Alumni-Étudiants',
    problem: 'Difficile de trouver un mentor dans le réseau des anciens qui correspond à ses aspirations. Le lien entre générations se perd après la remise des diplômes.',
    solution: 'Matchmaking basé sur l\'IA entre les compétences des étudiants et le parcours des Alumni.',
    teamStatus: 'looking_for_members',
    tags: ['IA', 'Réseautage', 'Mentorat'],
    author: {
      id: 'usr-4',
      name: 'Fatou S.',
      avatar: 'https://i.pravatar.cc/150?u=fatou',
    },
    votes: 215,
    commentCount: 34,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    isOfficialSelection: true,
    thumbnail: { gradient: 'from-purple-500 to-violet-600', emoji: '🤝' },
  },
  {
    id: 'proj-5',
    title: 'Chatbot assistant académique',
    problem: 'Les étudiants passent des heures à chercher des informations administratives : emploi du temps, dates d\'examens, procédures de stages. Le secrétariat est débordé.',
    solution: 'Un chatbot IA capable de répondre aux questions fréquentes sur la scolarité, connecté au SI de l\'EMSP.',
    teamStatus: 'looking_for_members',
    tags: ['IA', 'Éducation', 'Chatbot'],
    author: {
      id: 'usr-10',
      name: 'Ousmane L.',
      avatar: 'https://i.pravatar.cc/150?u=ousmane',
    },
    votes: 38,
    commentCount: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    thumbnail: { gradient: 'from-cyan-500 to-blue-600', emoji: '🤖' },
  },
  {
    id: 'proj-6',
    title: 'Application de gestion du stress étudiant',
    problem: 'La pression académique entraîne un stress important chez les étudiants, avec peu de ressources d\'accompagnement disponibles sur le campus.',
    solution: 'Une app mobile combinant suivi de bien-être, exercices de respiration guidés et mise en relation avec un psychologue du campus.',
    teamStatus: 'complete',
    tags: ['Santé', 'Mobile App', 'Bien-être'],
    author: {
      id: 'usr-8',
      name: 'Aïcha T.',
      avatar: 'https://i.pravatar.cc/150?u=aicha',
    },
    votes: 67,
    commentCount: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    thumbnail: { gradient: 'from-pink-500 to-rose-600', emoji: '🧘' },
  },
  {
    id: 'proj-7',
    title: 'Marketplace de services entre étudiants',
    problem: 'Les étudiants ont des compétences complémentaires (design, code, rédaction) mais aucun moyen structuré de s\'entraider ou d\'échanger des services.',
    solution: 'Une marketplace interne où les étudiants proposent et demandent des services, avec un système de crédits virtuels.',
    teamStatus: 'solo',
    tags: ['Entraide', 'Marketplace', 'Économie'],
    author: {
      id: 'usr-7',
      name: 'Kouadio B.',
      avatar: 'https://i.pravatar.cc/150?u=kouadio',
    },
    votes: 31,
    commentCount: 6,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    thumbnail: { gradient: 'from-lime-500 to-green-600', emoji: '🛒' },
  },
  {
    id: 'proj-8',
    title: 'Système de détection de présence intelligent',
    problem: 'L\'appel en cours est chronophage et source de fraude. Les enseignants perdent 10 minutes par séance pour vérifier les présences.',
    solution: 'Détection automatique via Bluetooth Low Energy entre le téléphone de l\'étudiant et des bornes installées dans les salles.',
    teamStatus: 'looking_for_members',
    tags: ['IoT', 'Hardware', 'Éducation'],
    author: {
      id: 'usr-1',
      name: 'Amadou K.',
      avatar: 'https://i.pravatar.cc/150?u=amadou',
    },
    votes: 56,
    commentCount: 9,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    thumbnail: { gradient: 'from-slate-500 to-zinc-700', emoji: '📡' },
  },
]

export interface ProjectFilters {
  query: string
  tags?: string[]
  status: string
  sortBy: 'trending' | 'recent' | 'most_voted'
}

/**
 * Fonction mockée simulant un appel API avec délai.
 * Sera remplacée par un appel Supabase au Bloc 16.
 */
export async function fetchProjets(filters: ProjectFilters): Promise<Project[]> {
  // Simuler latence réseau
  await new Promise((resolve) => setTimeout(resolve, 600))

  let results = [...MOCK_PROJECTS]

  // Filtre par recherche textuelle (titre/problème/solution)
  if (filters.query) {
    const q = filters.query.toLowerCase()
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.problem.toLowerCase().includes(q) ||
        p.solution.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  // Filtre par statut d'équipe
  if (filters.status && filters.status !== 'all') {
    results = results.filter((p) => p.teamStatus === filters.status)
  }

  // Tri
  switch (filters.sortBy) {
    case 'recent':
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'most_voted':
      results.sort((a, b) => b.votes - a.votes)
      break
    case 'trending':
    default:
      // Tendance = votes + récent (algo basique mocké)
      results.sort((a, b) => {
        const scoreA = a.votes + (Date.now() - new Date(a.createdAt).getTime() < 1000 * 60 * 60 * 48 ? 50 : 0)
        const scoreB = b.votes + (Date.now() - new Date(b.createdAt).getTime() < 1000 * 60 * 60 * 48 ? 50 : 0)
        return scoreB - scoreA
      })
      break
  }

  return results
}

/**
 * Fonction mockée simulant un appel API avec délai pour récupérer un projet par son ID.
 * Sera remplacée par un appel Supabase au Bloc 16.
 */
export async function fetchProjetById(id: string): Promise<ProjectDetail | null> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  
  const project = MOCK_PROJECTS.find(p => p.id === id)
  if (!project) return null

  // On enrichit le projet basique avec des données détaillées (équipe, commentaires)
  return {
    ...project,
    teamMembers: [
      { id: project.author.id, name: project.author.name, avatar: project.author.avatar, role: 'Porteur du projet' },
      // On simule un 2eme membre si l'équipe est "complete"
      ...(project.teamStatus === 'complete' ? [{ id: 'usr-random', name: 'Alice D.', avatar: 'https://i.pravatar.cc/150?u=alice', role: 'Développeuse Mobile' }] : [])
    ],
    comments: [
      {
        id: 'c-1',
        author: { id: 'usr-99', name: 'Dr. Koné', avatar: 'https://i.pravatar.cc/150?u=kone' },
        content: 'Très belle initiative. Avez-vous pensé à la contrainte d\'énergie pour ce type de solution ?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        id: 'c-2',
        author: { id: project.author.id, name: project.author.name, avatar: project.author.avatar },
        content: 'Oui, nous prévoyons d\'utiliser des composants basse consommation (BLE).',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString()
      }
    ]
  }
}
