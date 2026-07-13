import { LayoutDashboard, Award, Filter, TrendingUp, Users, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const featuresData = [
  {
    id: 'dashboard',
    title: 'Dashboard Dynamique',
    description:
      "Suivez l'évolution de vos projets en temps réel. Visualisez les votes, les nouvelles candidatures pour rejoindre votre équipe, et les statistiques de la plateforme via un tableau de bord personnel intuitif.",
    icon: LayoutDashboard,
    mockImage: (
      <div className="w-full h-full min-h-[300px] rounded-2xl glass-card flex flex-col p-6 relative overflow-hidden group">
        {/* Lueur d'arrière-plan */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px] group-hover:bg-accent/30 transition-all duration-700" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-info/20 rounded-full blur-[80px] group-hover:bg-info/30 transition-all duration-700" />
        
        {/* En-tête Mockup */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="w-1/3 h-4 bg-white/10 rounded-full" />
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 shadow-glow" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 mb-6 relative z-10">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:border-accent/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-3">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="w-1/2 h-3 bg-white/20 rounded-full mb-2" />
            <div className="w-3/4 h-6 bg-white/40 rounded-full" />
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:border-success/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-success/20 text-success flex items-center justify-center mb-3">
              <Users className="w-4 h-4" />
            </div>
            <div className="w-1/2 h-3 bg-white/20 rounded-full mb-2" />
            <div className="w-3/4 h-6 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* Graphique Abstrait */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 relative z-10 flex items-end justify-between gap-2">
          {[30, 45, 25, 60, 40, 80, 50, 90, 65].map((h, i) => (
            <div key={i} className="w-full bg-accent/20 rounded-t-sm relative group-hover:bg-accent/40 transition-colors duration-500 delay-100" style={{ height: `${h}%` }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent rounded-t-sm shadow-glow" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gamification',
    title: 'Système de Points & Gamification',
    description:
      "Chaque action compte ! Soumettez des idées, votez, commentez et rejoignez des équipes pour gagner des points d'innovation. Débloquez des badges exclusifs et montez dans le classement de l'EMSP.",
    icon: Award,
    mockImage: (
      <div className="w-full h-full min-h-[300px] rounded-2xl glass-card flex items-center justify-center p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Composant central 3D-like */}
        <div className="relative w-48 h-48">
          {/* Cercles tournants */}
          <div className="absolute inset-0 border border-accent/20 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 border border-dashed border-accent/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Badge central */}
          <div className="absolute inset-8 bg-gradient-to-tr from-accent/20 to-background border border-accent/50 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_40px_rgba(250,204,21,0.2)] backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
            <Award className="w-12 h-12 text-accent mb-2 drop-shadow-md" />
            <span className="text-lg font-bold text-white drop-shadow-md">Niveau 5</span>
            <span className="text-xs text-accent uppercase tracking-widest mt-1">Élite</span>
          </div>
          
          {/* Points flottants */}
          <div className="absolute top-0 -right-4 bg-accent text-background text-sm font-bold px-3 py-1 rounded-full shadow-glow animate-bounce">
            +500 pts
          </div>
          <div className="absolute bottom-4 -left-4 bg-success/20 text-success text-xs font-bold px-2 py-1 rounded-full border border-success/30 backdrop-blur-sm">
            Badge Débloqué
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'filtering',
    title: 'Filtrage Avancé & Tags',
    description:
      "Trouvez exactement ce que vous cherchez. Filtrez les projets par filière (Télécoms, Management, etc.), par état d'avancement, ou par technologies clés. Ne perdez plus de temps pour trouver votre prochaine équipe.",
    icon: Filter,
    mockImage: (
      <div className="w-full h-full min-h-[300px] rounded-2xl glass-card flex flex-col p-6 relative overflow-hidden group">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-all duration-700" />
        
        {/* Search Bar */}
        <div className="w-full h-12 bg-white/5 border border-white/10 rounded-xl mb-6 flex items-center px-4 gap-3 relative z-10 backdrop-blur-md">
          <Search className="w-5 h-5 text-accent" />
          <div className="w-1/3 h-4 bg-white/20 rounded-full" />
          <div className="ml-auto w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
            <Filter className="w-4 h-4 text-accent" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 relative z-10">
          <div className="px-4 py-1.5 bg-accent text-background rounded-full text-xs font-bold shadow-glow">Technologie</div>
          <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 hover:bg-white/10 transition-colors">Management</div>
          <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 hover:bg-white/10 transition-colors">Finance</div>
          <div className="px-4 py-1.5 bg-success/10 border border-success/20 rounded-full text-xs text-success">Recrutement ouvert</div>
        </div>

        {/* Result Card */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 relative z-10 group-hover:border-accent/30 transition-all duration-500 hover:-translate-y-1">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl border border-accent/20 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="w-3/4 h-4 bg-white/30 rounded-full" />
              <div className="w-full h-2 bg-white/10 rounded-full" />
              <div className="w-5/6 h-2 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

/**
 * Section Fonctionnalités avancées.
 * Présente les outils du Hub avec un layout alterné (zigzag).
 */
export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-transparent relative z-10 overflow-hidden">
      <div className="container-hub">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            Des outils taillés pour l'<span className="text-gradient">innovation</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Le Hub n'est pas qu'un simple forum. C'est une plateforme complète
            pour vous accompagner jusqu'à la Journée du Numérique.
          </p>
        </div>

        <div className="flex flex-col gap-24 sm:gap-32">
          {featuresData.map((feature, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={feature.id}
                className={cn(
                  'flex flex-col md:flex-row items-center gap-12 md:gap-20',
                  !isEven && 'md:flex-row-reverse'
                )}
              >
                {/* Texte */}
                <div className="flex-1 space-y-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent shadow-glow">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Illustration / Mockup */}
                <div className="flex-1 w-full relative">
                  {/* Effet lumineux de fond */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[100px] -z-10" />
                  {feature.mockImage}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
