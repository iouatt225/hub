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
}

/**
 * Sidebar de navigation pour le portail d'administration.
 * Responsive : drawer en overlay sur mobile, fixe sur desktop.
 */
export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
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
          'fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-border flex flex-col transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:z-30',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* En-tête sidebar */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-accent/10 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div>
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
                      isActive
                        ? 'bg-accent/10 text-accent shadow-sm'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    )
                  }
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Pied de sidebar — lien retour au site */}
        <div className="p-3 border-t border-border">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <ExternalLink className="w-[18px] h-[18px] shrink-0" />
            <span>Retour au site</span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}
