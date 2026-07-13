import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'


/**
 * Layout dédié au portail d'administration.
 * Sidebar fixe à gauche (rétractable sur mobile et repliable sur desktop) + header admin + zone de contenu.
 * Remplace le Layout public (Header + Footer) pour les routes /admin/*.
 */
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — fixe/sticky sur desktop, drawer sur mobile */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Zone principale — prend le reste de l'espace de manière fluide */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ease-in-out">
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
