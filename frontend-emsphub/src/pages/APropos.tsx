import { Sparkles, Code, Cpu, Shield, Brain, Heart, Users } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'

const CLUB_PILLARS = [
  {
    icon: <Code className="w-6 h-6 text-accent" />,
    title: "Développement Logiciel & Web",
    desc: "Apprentissage des technologies modernes (React, Next.js, Tailwind, Node.js) et création de solutions applicatives concrètes pour le campus."
  },
  {
    icon: <Cpu className="w-6 h-6 text-accent" />,
    title: "IoT & Systèmes Embarqués",
    desc: "Exploration des capteurs, de l'Arduino, du Raspberry Pi et de l'automatisation. Nous concevons les prototypes connectés de demain."
  },
  {
    icon: <Shield className="w-6 h-6 text-accent" />,
    title: "Réseaux & Cybersécurité",
    desc: "Sensibilisation aux bonnes pratiques de sécurité, hacking éthique, administration système et déploiement d'infrastructures réseaux."
  },
  {
    icon: <Brain className="w-6 h-6 text-accent" />,
    title: "Intelligence Artificielle & Data",
    desc: "Initiation aux concepts fondamentaux du Machine Learning, de la science des données et de l'automatisation intelligente."
  }
]

const TEAM_MEMBERS = [
  {
    name: "Dr. Koné K.",
    role: "Superviseur Académique / Enseignant-Chercheur",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=kone",
    bio: "Coordonne les activités pédagogiques et guide le club dans les orientations académiques et technologiques."
  },
  {
    name: "Sarah Mian",
    role: "Présidente & Lead Frontend",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    bio: "Étudiante en Génie Logiciel. Passionnée d'UX/UI et de développement web moderne."
  },
  {
    name: "Amadou Konaté",
    role: "Vice-Président & Lead IoT",
    avatar: "https://i.pravatar.cc/150?u=amadou",
    bio: "Étudiant en Télécoms & Réseaux. Spécialiste des microcontrôleurs et des architectures réseaux."
  },
  {
    name: "Jean-Marc Diarra",
    role: "Secrétaire Général & DevOps",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=jeanmarc",
    bio: "Gère l'administration du club et l'infrastructure de déploiement de nos outils collaboratifs."
  }
]

export function APropos() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      
      {/* ─── Hero Section ─── */}
      <section className="container-hub max-w-5xl mx-auto px-4 mb-16 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
          À Propos du <span className="text-accent">Club Info EMSP</span>
        </h1>
        <p className="text-text-secondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Le cœur battant de l'innovation et des technologies à l'École Supérieure Multinationale des Postes. Nous formons, créons et propulsons les talents du numérique.
        </p>
      </section>

      {/* ─── Présentation générale ─── */}
      <section className="container-hub max-w-4xl mx-auto px-4 mb-20">
        <div className="bg-surface border border-border rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex-1 space-y-4 relative z-10">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" /> Our Mission
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Fondé par et pour les étudiants de l'EMSP, le <strong>Club Info</strong> est une association technologique qui vise à combler le fossé entre la théorie académique et la pratique industrielle. Nous fournissons aux étudiants les outils, le mentorat et l'environnement collaboratif nécessaires pour concevoir des prototypes concrets.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Qu'il s'agisse de concevoir des applications web pour faciliter le quotidien du campus (comme cette plateforme EMSP Hub) ou d'intégrer des systèmes connectés pour la Journée du Numérique, nous encourageons l'autonomie et l'excellence technique.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Piliers Technologiques ─── */}
      <section className="container-hub max-w-5xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-2">Nos Domaines d'Activité</h2>
          <p className="text-text-secondary text-sm">Les axes de développement et de formation que nous couvrons au club.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLUB_PILLARS.map((pillar, idx) => (
            <div key={idx} className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:border-accent/30 transition-all duration-300">
              <div className="p-3 bg-accent/5 rounded-xl inline-block mb-4 border border-accent/10">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{pillar.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── L'Équipe Bureau ─── */}
      <section className="container-hub max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-2 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-accent" /> Le Bureau du Club
          </h2>
          <p className="text-text-secondary text-sm">Ceux qui guident, encadrent et font vivre le Club Informatique au quotidien.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="bg-surface border border-border rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between items-center group hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border-2 border-border shadow-sm mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xl bg-accent/10 text-accent font-bold">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-base font-bold text-text-primary leading-tight">{member.name}</h3>
                <span className="text-[11px] font-semibold text-accent block mt-1">{member.role}</span>
              </div>
              
              <p className="text-[11px] text-text-secondary leading-relaxed mt-4 pt-3 border-t border-border/50 w-full italic">
                "{member.bio}"
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
