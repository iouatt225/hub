import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Lightbulb, Users, Rocket } from 'lucide-react'

/**
 * Section « À propos du Hub » — Split layout (texte + visuel).
 * Inspiré de la section « A propos de l'EMSP » du site de référence.
 */
export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container-hub">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Colonne Gauche — Texte */}
          <div>
            <span className="text-sm font-bold text-accent tracking-widest uppercase mb-4 block">
              À propos du Hub
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight">
              Connecter les talents pour la Journée du Numérique
            </h2>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              Le Hub EMSP est la plateforme officielle d'idées et d'incubation de l'École Multinationale Supérieure des Postes. 
              Déposez vos projets innovants, formez des équipes pluridisciplinaires et participez à la sélection 
              pour la Journée du Numérique.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 rounded-xl border-accent text-accent hover:bg-accent hover:text-white font-semibold transition-all group"
              asChild
            >
              <Link to="/documentation">
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Colonne Droite — Composition visuelle */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -right-8 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
            
            {/* Carte principale */}
            <div className="relative bg-surface border border-border rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Idée Soumise</h3>
                  <p className="text-xs text-text-muted">Il y a 2 minutes</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                "Une plateforme de covoiturage exclusive pour les étudiants de l'EMSP, sécurisée et économique."
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs font-semibold text-accent px-2 py-1 bg-accent/10 rounded-md">
                  Télécoms
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-text-primary">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  En revue
                </div>
              </div>
            </div>

            {/* Mini carte flottante */}
            <div className="absolute -bottom-6 -left-6 bg-surface border border-border rounded-2xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-text-primary">+3 membres</p>
                <p className="text-xs text-text-muted">Équipe complète</p>
              </div>
            </div>

            {/* Mini carte flottante haut droite */}
            <div className="absolute -top-4 right-8 bg-surface border border-border rounded-2xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-highlight/10 flex items-center justify-center text-highlight-hover">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-text-primary">Sélectionné</p>
                <p className="text-xs text-text-muted">JDN 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
