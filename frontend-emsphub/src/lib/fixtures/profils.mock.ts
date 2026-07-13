export interface UserProfile {
  id: string
  fullName: string
  email: string
  role: 'student' | 'admin' | 'jury'
  avatar: string
  bio: string
  specialties: string[]
  links: {
    github?: string
    linkedin?: string
    portfolio?: string
  }
  joinedAt: string
}

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: 'usr-1',
    fullName: 'Amadou K.',
    email: 'amadou.k@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=amadou',
    bio: 'Passionné par l\'IoT et l\'agriculture de précision. Cherche à résoudre des problèmes locaux grâce à la technologie embarquée.',
    specialties: ['IoT', 'Systèmes Embarqués', 'C++'],
    links: {
      github: 'https://github.com/amadou-k',
      linkedin: 'https://linkedin.com/in/amadou-k',
    },
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'usr-2',
    fullName: 'Sarah M.',
    email: 'sarah.m@emsp.ci',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    bio: 'Développeuse Fullstack en herbe. J\'adore React et Node.js. Toujours partante pour un hackathon !',
    specialties: ['React', 'Node.js', 'UI/UX'],
    links: {
      github: 'https://github.com/sarah-m',
      portfolio: 'https://sarah-m.dev',
    },
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
]

export async function fetchProfileById(id: string): Promise<UserProfile | null> {
  await new Promise(resolve => setTimeout(resolve, 500))
  // On retourne un mock statique si on le trouve
  const profile = MOCK_PROFILES.find(p => p.id === id)
  if (profile) return profile

  // Sinon, on simule la création d'un profil générique basé sur l'ID (utile pour /profil/me non mocké)
  return {
    id,
    fullName: 'Utilisateur EMSP',
    email: 'user@emsp.ci',
    role: 'student',
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${id}`,
    bio: 'Aucune biographie renseignée.',
    specialties: [],
    links: {},
    joinedAt: new Date().toISOString(),
  }
}
