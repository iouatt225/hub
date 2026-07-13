import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  /** Icône affichée dans un cercle coloré */
  icon: ReactNode
  /** Libellé de la statistique */
  label: string
  /** Valeur principale (nombre ou texte) */
  value: string | number
  /** Variation en pourcentage (positif ou négatif) — optionnel */
  variation?: number
  /** Couleur de l'icône (classe Tailwind pour le fond et le texte) */
  colorClass?: string
}

/**
 * Carte KPI réutilisable pour le dashboard admin.
 * Affiche une icône, un libellé, une valeur et une variation optionnelle.
 */
export function StatCard({ icon, label, value, variation, colorClass = 'bg-accent/10 text-accent' }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4 transition-all duration-200 hover:shadow-card-hover hover:border-border-hover">
      <div className={cn('p-3 rounded-xl shrink-0', colorClass)}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-muted truncate">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {variation !== undefined && (
            <span className={cn(
              'text-xs font-semibold px-1.5 py-0.5 rounded-full',
              variation >= 0 
                ? 'text-success bg-success/10' 
                : 'text-error bg-error/10'
            )}>
              {variation >= 0 ? '+' : ''}{variation}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
