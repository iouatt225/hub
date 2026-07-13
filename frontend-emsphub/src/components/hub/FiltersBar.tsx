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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // Application des filtres sans debounce
  useEffect(() => {
    applyFilters(query, status, sortBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="flex flex-col gap-4 mb-10">
      {/* ─── Barre de recherche principale ─── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Rechercher une idée, un mot-clé..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-14 pr-6 rounded-2xl bg-surface border border-border/80 text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all shadow-sm hover:shadow"
          />
        </div>
        
        {/* Bouton filtres mobile */}
        <Button
          variant="outline"
          className="md:hidden h-14 w-14 rounded-2xl border-border/80 bg-surface flex-shrink-0 relative"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <SlidersHorizontal className="w-5 h-5 text-text-secondary" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm border-2 border-background">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* ─── Filtres (Desktop + Accordion Mobile) ─── */}
      <div
        className={cn(
          'flex flex-col md:flex-row gap-4 md:items-center overflow-hidden transition-all duration-300 ease-in-out',
          isMobileFiltersOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[100px] md:opacity-100'
        )}
      >
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Sélecteur de statut */}
          <div className="relative group">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none h-11 pl-4 pr-10 rounded-xl bg-background border border-border text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 hover:border-border-hover transition-all cursor-pointer shadow-sm"
            >
              <option value="all">Statut : Tous les projets</option>
              <option value="looking_for_members">Cherche associés</option>
              <option value="solo">Équipe Solo</option>
              <option value="complete">Équipe complète</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          {/* Sélecteur de tri */}
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none h-11 pl-4 pr-10 rounded-xl bg-background border border-border text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 hover:border-border-hover transition-all cursor-pointer shadow-sm"
            >
              <option value="trending">Trier par : Tendances 🔥</option>
              <option value="recent">Trier par : Plus récents ⏳</option>
              <option value="most_voted">Trier par : Plus votés ⭐</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-text-muted hover:text-error hover:bg-error/10 h-11 rounded-xl px-4 font-semibold self-start md:self-auto transition-colors"
          >
            <X className="w-4 h-4 mr-2" /> Réinitialiser
          </Button>
        )}
      </div>
    </div>
  )
}
