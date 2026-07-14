import { Rocket, Award, Target, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Recrutement() {
  const externalFormUrl = "https://forms.cloud.microsoft/r/LPRkYNCsG7"

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      
      {/* ─── Hero Section ─── */}
      <section className="container-hub max-w-5xl mx-auto px-4 mb-16 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
          Rejoignez le <span className="text-accent">Club Info EMSP</span>
        </h1>
        <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Devenez acteur de l'innovation au sein de l'école. Développez des projets d'envergure, partagez vos compétences et boostez votre insertion professionnelle.
        </p>
      </section>

      {/* ─── Pourquoi postuler ? ─── */}
      <section className="container-hub max-w-5xl mx-auto px-4 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between hover:border-accent/20 transition-colors">
          <div>
            <div className="p-2.5 bg-accent/5 rounded-lg inline-block border border-accent/10 mb-4 text-accent">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Projets Réels</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Travaillez sur des plateformes utilisées au quotidien (Hub EMSP, outils d'incubation) et développez de vrais prototypes pour la Journée du Numérique.
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between hover:border-accent/20 transition-colors">
          <div>
            <div className="p-2.5 bg-accent/5 rounded-lg inline-block border border-accent/10 mb-4 text-accent">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Mentorat & Partage</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Bénéficiez de formations pratiques animées par les étudiants des années supérieures et les anciens élèves aujourd'hui en entreprise.
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between hover:border-accent/20 transition-colors">
          <div>
            <div className="p-2.5 bg-accent/5 rounded-lg inline-block border border-accent/10 mb-4 text-accent">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Réseau & Opportunités</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Mettez en avant vos réalisations devant les entreprises partenaires lors des événements de l'école et facilitez l'obtention de vos stages.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Zone d'adhésion Externe (Lien + QR Code) ─── */}
      <section className="container-hub max-w-3xl mx-auto px-4">
        <div className="bg-surface border border-border rounded-3xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Formulaire d'Adhésion en Ligne
            </h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed mb-8">
              Scannez le code QR ci-dessous avec votre mobile ou cliquez sur le bouton pour accéder au formulaire officiel d'inscription du IT Club EMSP.
            </p>

            {/* Code QR officiel fourni par l'utilisateur */}
            <div className="p-1 bg-gradient-to-br from-accent/50 to-blue-500 rounded-3xl shadow-lg border border-border mb-8 overflow-hidden">
              <div className="bg-background-alt p-3 rounded-[22px]">
                <img 
                  src="/qr-code-adhesion.png" 
                  alt="Code QR Adhésion IT Club EMSP" 
                  className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Lien cliquable & CTA */}
            <div className="space-y-4 w-full max-w-sm">
              <Button asChild size="lg" className="w-full gap-2 font-bold shadow-md">
                <a href={externalFormUrl} target="_blank" rel="noreferrer">
                  Accéder au formulaire
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              
              <div className="pt-2">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">
                  Lien direct
                </span>
                <a 
                  href={externalFormUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs text-accent hover:underline font-semibold break-all"
                >
                  forms.cloud.microsoft/r/LPRkYNCsG7
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
