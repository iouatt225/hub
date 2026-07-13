/**
 * Données mockées — Utilisateurs pour le portail d'administration.
 * Sera remplacé par des appels Supabase (table profiles) au Bloc 16.
 */

export interface AdminUser {
  id: string
  fullName: string
  email: string
  role: 'student' | 'admin' | 'jury'
  avatar: string
  filiere: string
  bio: string
  projectCount: number
  isActive: boolean
  joinedAt: string
}

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    fullName: 'Amadou K.',
    email: 'amadou.k@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=amadou',
    filiere: 'Télécoms',
    bio: 'Passionné par l\'IoT et l\'agriculture de précision.',
    projectCount: 2,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'usr-2',
    fullName: 'Sarah M.',
    email: 'sarah.m@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    filiere: 'Management',
    bio: 'Développeuse Fullstack en herbe.',
    projectCount: 1,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: 'usr-3',
    fullName: 'Jean-Marc D.',
    email: 'jeanmarc.d@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=jeanmarc',
    filiere: 'Finance',
    bio: 'Intéressé par la FinTech et les systèmes embarqués.',
    projectCount: 1,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 'usr-4',
    fullName: 'Fatou S.',
    email: 'fatou.s@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=fatou',
    filiere: 'Télécoms',
    bio: 'Passionnée d\'IA et de réseautage professionnel.',
    projectCount: 1,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: 'usr-5',
    fullName: 'Dr. Ibrahim Koné',
    email: 'admin.kone@emsp.ci',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=kone',
    filiere: 'Direction',
    bio: 'Directeur du numérique et responsable du Hub EMSP.',
    projectCount: 0,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  },
  {
    id: 'usr-6',
    fullName: 'Marie-Claire A.',
    email: 'marieclaire.a@emsp.ci',
    role: 'jury',
    avatar: 'https://i.pravatar.cc/150?u=marieclaire',
    filiere: 'Logistique',
    bio: 'Enseignante en logistique et supply chain.',
    projectCount: 0,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: 'usr-7',
    fullName: 'Kouadio B.',
    email: 'kouadio.b@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=kouadio',
    filiere: 'Télécoms',
    bio: 'Développeur mobile, passionné par React Native.',
    projectCount: 0,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'usr-8',
    fullName: 'Aïcha T.',
    email: 'aicha.t@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=aicha',
    filiere: 'Finance',
    bio: 'Étudiante en finance, intéressée par la blockchain.',
    projectCount: 0,
    isActive: false,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: 'usr-9',
    fullName: 'Prof. Diallo Y.',
    email: 'diallo.y@emsp.ci',
    role: 'jury',
    avatar: 'https://i.pravatar.cc/150?u=diallo',
    filiere: 'Management',
    bio: 'Professeur en management de l\'innovation.',
    projectCount: 0,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 55).toISOString(),
  },
  {
    id: 'usr-10',
    fullName: 'Ousmane L.',
    email: 'ousmane.l@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=ousmane',
    filiere: 'Logistique',
    bio: 'Passionné par l\'optimisation et les algorithmes.',
    projectCount: 3,
    isActive: true,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
]

/**
 * Fonction mockée simulant un appel API pour récupérer tous les utilisateurs.
 */
export async function fetchAdminUsers(): Promise<AdminUser[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...MOCK_ADMIN_USERS]
}
