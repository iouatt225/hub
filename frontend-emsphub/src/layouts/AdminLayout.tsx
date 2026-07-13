import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { cn } from '@/lib/utils'

/**
 * Layout dédié au portail d'administration.
 * Sidebar fixe à gauche (rétractable sur mobile et repliable sur desktop) + header admin + zone de contenu.
 * Remplace le Layout public (Header + Footer) pour les routes /admin/*.
 */
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — fixe sur desktop, drawer sur mobile */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Zone principale — décalée de la largeur de la sidebar sur desktop */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        {/* Header admin */}
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />

        {/* Contenu des sous-pages */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
