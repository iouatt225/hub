import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/constants/brand'
import { ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

/**
 * Hero compact — Version réduite du Hero pour la page d'accueil.
 * Aligné sur la charte graphique cachet postal avec cercles dashed et manifeste statistique.
 */
export function HeroCompact() {
  const [stats, setStats] = useState({
    projects: 4,
    creators: 13,
    votes: 10,
    activity: '31%'
  })

  useEffect(() => {
    async function loadStats() {
      try {
        // Charger les statistiques réelles depuis Supabase
        const { count: projCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })

        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        const { data: allProjects } = await supabase
          .from('projects')
          .select('votes')

        let voteSum = 0
        if (allProjects) {
          allProjects.forEach(p => {
            voteSum += p.votes || 0
          })
        }

        const totalProj = projCount || 0
        const totalUsr = userCount || 0
        const activityRate = totalUsr > 0 ? Math.min(100, Math.round((totalProj / totalUsr) * 100)) : 0

        setStats({
          projects: totalProj,
          creators: totalUsr,
          votes: voteSum,
          activity: `${activityRate}%`
        })
      } catch (err) {
        console.error('Erreur stats hero:', err)
      }
    }
    loadStats()
  }, [])

  return (
    <section className="relative bg-ink text-paper py-16 sm:py-20 flex items-center overflow-hidden">
      {/* Cercles dashed décoratifs */}
      <div className="hero-ring" />

      {/* Dégradé de transition subtil vers le fond de la page (Paper) */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />

      <div className="container-hub relative z-10">
        <div className="max-w-2xl">
          {/* Badge événement */}
          <div className="mb-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase bg-paper/8 border border-paper/20 px-3.5 py-1.5 rounded-full text-paper/90">
              <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
              {BRAND.event}
            </span>
          </div>

          {/* Titre principal */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium font-display text-paper mb-4 leading-[1.1] animate-slide-up"
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            Propulsez vos idées pour la <em className="text-highlight not-italic">Journée du Numérique</em>
          </h1>

          {/* Sous-titre */}
          <p
            className="text-sm sm:text-base text-paper/65 mb-8 leading-relaxed max-w-xl animate-slide-up"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            Découvrez les projets innovants des étudiants, votez pour vos favoris et rejoignez des équipes.
          </p>

          {/* Actions CTA */}
          <div
            className="flex flex-wrap gap-3 animate-slide-up mb-10"
            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
          >
            <Button
              size="lg"
              className="h-11 px-6 text-sm rounded-xl bg-highlight text-ink hover:bg-highlight-hover font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              asChild
            >
              <Link to="/hub/nouvelle-idee">
                Déposer une idée
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6 text-sm rounded-xl border-paper/30 text-paper hover:bg-paper/10 hover:border-paper/50 font-semibold transition-all"
              asChild
            >
              <Link to="/hub">Explorer le Hub</Link>
            </Button>
          </div>

          {/* Manifeste Statistique (Le Hub en chiffres) */}
          <div 
            className="flex border-t border-paper/15 pt-5 max-w-lg animate-slide-up"
            style={{ animationDelay: '400ms', animationFillMode: 'both' }}
          >
            <div className="flex-1 pr-4">
              <div className="font-mono text-xl sm:text-2xl text-paper font-medium">{stats.projects}</div>
              <div className="font-mono text-[10px] text-paper/45 uppercase tracking-wider mt-1">Projets</div>
            </div>
            <div className="flex-1 pr-4">
              <div className="font-mono text-xl sm:text-2xl text-paper font-medium">{stats.creators}</div>
              <div className="font-mono text-[10px] text-paper/45 uppercase tracking-wider mt-1">Créateurs</div>
            </div>
            <div className="flex-1 pr-4">
              <div className="font-mono text-xl sm:text-2xl text-paper font-medium">{stats.votes}</div>
              <div className="font-mono text-[10px] text-paper/45 uppercase tracking-wider mt-1">Votes</div>
            </div>
            <div className="flex-1">
              <div className="font-mono text-xl sm:text-2xl text-paper font-medium">{stats.activity}</div>
              <div className="font-mono text-[10px] text-paper/45 uppercase tracking-wider mt-1">Activité</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

