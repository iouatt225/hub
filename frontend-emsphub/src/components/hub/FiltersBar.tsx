import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface FiltersBarProps {
  onFiltersChange: (filters: {
    query: string
    tags?: string[]
    status: string
    sortBy: 'trending' | 'recent' | 'most_voted'
  }) => void
}

export function FiltersBar({ onFiltersChange }: FiltersBarProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Lecture initiale depuis l'URL
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [status, setStatus] = useState(searchParams.get('status') || 'all')
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'most_voted'>(
    (searchParams.get('sort') as any) || 'trending'
  )

  // Debounce pour la recherche textuelle
  useEffect(() => {
    const handler = setTimeout(() => {
      applyFilters(query, status, sortBy)
    }, 400)
    return () => clearTimeout(handler)
  }, [query])

  // Application des filtres sans debounce
  useEffect(() => {
    applyFilters(query, status, sortBy)
  }, [status, sortBy])

  function applyFilters(newQuery: string, newStatus: string, newSortBy: string) {
    // Mise à jour de l'URL
    const newParams = new URLSearchParams()
    if (newQuery) newParams.set('q', newQuery)
    if (newStatus && newStatus !== 'all') newParams.set('status', newStatus)
    if (newSortBy && newSortBy !== 'trending') newParams.set('sort', newSortBy)
    
    setSearchParams(newParams, { replace: true })

    // Notification au parent
    onFiltersChange({
      query: newQuery,
      status: newStatus,
      sortBy: newSortBy as any,
    })
  }

  function clearFilters() {
    setQuery('')
    setStatus('all')
    setSortBy('trending')
  }

  const activeFiltersCount = (query ? 1 : 0) + (status !== 'all' ? 1 : 0) + (sortBy !== 'trending' ? 1 : 0)

  return (
    <div className="bg-surface border border-border rounded-xl p-4 shadow-sm mb-8">
      {/* ─── Top Bar (Recherche + Mobile Toggle) ─── */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Rechercher une idée, un mot-clé..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden relative"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* ─── Filtres (Desktop + Accordion Mobile) ─── */}
      <div
        className={cn(
          'mt-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between overflow-hidden transition-all',
          isMobileFiltersOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 md:max-h-[500px] opacity-0 md:opacity-100 mt-0 md:mt-4'
        )}
      >
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          {/* Sélecteur de statut */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-muted">Statut de l'équipe</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-9 px-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">Tous les projets</option>
              <option value="looking_for_members">Cherche associés</option>
              <option value="solo">Solo</option>
              <option value="complete">Équipe complète</option>
            </select>
          </div>

          {/* Sélecteur de tri */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-muted">Trier par</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-9 px-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="trending">Tendances 🔥</option>
              <option value="recent">Plus récents 🕒</option>
              <option value="most_voted">Plus votés ⭐</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-text-muted hover:text-text-primary self-start md:self-end h-9"
          >
            <X className="w-3 h-3 mr-2" /> Réinitialiser
          </Button>
        )}
      </div>
    </div>
  )
}
