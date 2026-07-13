import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  MessageSquare,
  BarChart3,
  Settings,
  ExternalLink,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/** Éléments de navigation de la sidebar admin */
const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Utilisateurs', href: '/admin/utilisateurs', icon: Users },
  { label: 'Projets', href: '/admin/projets', icon: FolderKanban },
  { label: 'Commentaires', href: '/admin/commentaires', icon: MessageSquare },
  { label: 'Statistiques', href: '/admin/statistiques', icon: BarChart3 },
  { label: 'Paramètres', href: '/admin/parametres', icon: Settings },
] as const

interface AdminSidebarProps {
  /** Indique si la sidebar mobile est ouverte */
  isOpen: boolean
  /** Callback pour fermer la sidebar mobile */
  onClose: () => void
  /** Indique si la sidebar est repliée sur desktop */
  isCollapsed: boolean
  /** Callback pour changer l'état replié */
  onToggleCollapse: () => void
}

/**
 * Sidebar de navigation pour le portail d'administration.
 * Responsive : drawer en overlay sur mobile, fixe et rétractable sur desktop.
 */
export function AdminSidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: AdminSidebarProps) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Styles de base et mobile (drawer fixe)
          'fixed top-0 left-0 z-50 h-full bg-surface border-r border-border flex flex-col transition-all duration-300 ease-in-out',
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64',
          // Styles desktop (sticky flex item)
          'lg:sticky lg:top-0 lg:left-0 lg:z-30 lg:h-screen lg:shrink-0 lg:translate-x-0',
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        )}
      >
        {/* Bouton de réduction / agrandissement (Desktop uniquement) */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute top-8 -right-3.5 z-50 w-7 h-7 bg-surface border border-border rounded-full items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover hover:scale-105 shadow-sm transition-all cursor-pointer"
          aria-label={isCollapsed ? "Agrandir le menu" : "Réduire le menu"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* En-tête sidebar */}
        <div className={cn(
          "flex items-center justify-between p-5 border-b border-border",
          isCollapsed ? "lg:justify-center lg:p-4" : ""
        )}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 bg-accent/10 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div className={cn(
              "transition-all duration-300 ease-in-out origin-left truncate",
              isCollapsed ? "lg:w-0 lg:opacity-0 lg:ml-0 lg:pointer-events-none" : "lg:w-36 lg:opacity-100 ml-0.5",
              "block"
            )}>
              <h2 className="text-sm font-bold text-text-primary leading-tight">Hub EMSP</h2>
              <p className="text-[11px] text-text-muted leading-tight">Administration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={'end' in item ? item.end : undefined}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                      isCollapsed ? 'lg:justify-center lg:px-0 lg:w-12 lg:h-12 mx-auto' : '',
                      isActive
                        ? 'bg-accent/10 text-accent shadow-sm'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    )
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  <span className={cn(
                    "transition-all duration-300 ease-in-out origin-left truncate",
                    isCollapsed ? "lg:w-0 lg:opacity-0 lg:ml-0 lg:pointer-events-none" : "lg:w-32 lg:opacity-100",
                    "block"
                  )}>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Pied de sidebar — lien retour au site */}
        <div className="p-3 border-t border-border">
          <NavLink
            to="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors',
              isCollapsed ? 'lg:justify-center lg:px-0 lg:w-12 lg:h-12 mx-auto' : ''
            )}
            title={isCollapsed ? "Retour au site" : undefined}
          >
            <ExternalLink className="w-[18px] h-[18px] shrink-0" />
            <span className={cn(
              "transition-all duration-300 ease-in-out origin-left truncate",
              isCollapsed ? "lg:w-0 lg:opacity-0 lg:ml-0 lg:pointer-events-none" : "lg:w-32 lg:opacity-100",
              "block"
            )}>
              Retour au site
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}
