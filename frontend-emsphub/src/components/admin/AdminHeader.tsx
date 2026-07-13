import { Menu, Bell, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { AdminBreadcrumb } from '@/components/admin/AdminBreadcrumb'
import { Button } from '@/components/ui/Button'

interface AdminHeaderProps {
  /** Callback pour ouvrir la sidebar mobile */
  onMenuToggle: () => void
}

/**
 * Header du portail d'administration.
 * Contient le bouton menu (mobile), le breadcrumb, les notifications et le profil admin.
 */
export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { user, signOut } = useAuth()

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Admin'
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Gauche : menu burger + breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <AdminBreadcrumb />
        </div>

        {/* Droite : notifications + profil */}
        <div className="flex items-center gap-3">
          {/* Bouton notifications */}
          <button
            className="relative p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Indicateur de notification non lue */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>

          {/* Séparateur */}
          <div className="h-8 w-px bg-border hidden sm:block" />

          {/* Profil admin */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-text-primary leading-tight">{displayName}</p>
              <p className="text-[11px] text-text-muted leading-tight">Administrateur</p>
            </div>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-border">
                <span className="text-xs font-bold text-accent">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              title="Se déconnecter"
              className="text-text-muted hover:text-error hover:bg-error/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
