import { useState, useEffect, useMemo } from 'react'
import {
  Users as UsersIcon,
  Search,
  ShieldCheck,
  GraduationCap,
  Scale,
  ChevronDown,
  ExternalLink,
  UserX,
  UserCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/admin/StatCard'
import { fetchAdminUsers, type AdminUser } from '@/lib/fixtures/utilisateurs.mock'
import { cn } from '@/lib/utils'

/** Libellés et couleurs des rôles */
const ROLE_CONFIG: Record<string, { label: string; className: string }> = {
  student: { label: 'Étudiant', className: 'bg-info/10 text-info border-info/20' },
  admin: { label: 'Admin', className: 'bg-accent/10 text-accent border-accent/20' },
  jury: { label: 'Jury', className: 'bg-highlight/10 text-highlight-hover border-highlight/20' },
}

/**
 * Page de gestion des utilisateurs — portail d'administration.
 * Tableau avec filtres, recherche, changement de rôle et gestion des comptes.
 */
export function Utilisateurs() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [filiereFilter, setFiliereFilter] = useState<string>('all')

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const data = await fetchAdminUsers()
      setUsers(data)
      setIsLoading(false)
    }
    load()
  }, [])

  // Extraire les filières uniques pour le filtre
  const filieres = useMemo(() => {
    const set = new Set(users.map(u => u.filiere))
    return Array.from(set).sort()
  }, [users])

  // Filtrage combiné
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = searchQuery === '' ||
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'all' || u.role === roleFilter
      const matchesFiliere = filiereFilter === 'all' || u.filiere === filiereFilter
      return matchesSearch && matchesRole && matchesFiliere
    })
  }, [users, searchQuery, roleFilter, filiereFilter])

  // Stats
  const stats = useMemo(() => ({
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    admins: users.filter(u => u.role === 'admin').length,
    jury: users.filter(u => u.role === 'jury').length,
  }), [users])

  // Action : changer le rôle d'un utilisateur
  const changeRole = (userId: string, newRole: AdminUser['role']) => {
    setUsers(prev =>
      prev.map(u => u.id === userId ? { ...u, role: newRole } : u)
    )
  }

  // Action : activer/désactiver un utilisateur
  const toggleActive = (userId: string) => {
    setUsers(prev =>
      prev.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u)
    )
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Utilisateurs</h1>
        <p className="text-text-secondary mt-1">Gérez les comptes et les rôles des utilisateurs de la plateforme</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<UsersIcon className="w-5 h-5" />}
          label="Total"
          value={stats.total}
          colorClass="bg-accent/10 text-accent"
        />
        <StatCard
          icon={<GraduationCap className="w-5 h-5" />}
          label="Étudiants"
          value={stats.students}
          colorClass="bg-info/10 text-info"
        />
        <StatCard
          icon={<ShieldCheck className="w-5 h-5" />}
          label="Administrateurs"
          value={stats.admins}
          colorClass="bg-success/10 text-success"
        />
        <StatCard
          icon={<Scale className="w-5 h-5" />}
          label="Jury"
          value={stats.jury}
          colorClass="bg-highlight/10 text-highlight-hover"
        />
      </div>

      {/* Tableau */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {/* Barre de filtres */}
        <div className="p-4 border-b border-border flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Recherche */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
            />
          </div>

          {/* Filtre rôle */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none h-10 pl-4 pr-10 rounded-xl bg-background border border-border text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              <option value="all">Tous les rôles</option>
              <option value="student">Étudiants</option>
              <option value="admin">Administrateurs</option>
              <option value="jury">Jury</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>

          {/* Filtre filière */}
          <div className="relative">
            <select
              value={filiereFilter}
              onChange={(e) => setFiliereFilter(e.target.value)}
              className="appearance-none h-10 pl-4 pr-10 rounded-xl bg-background border border-border text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              <option value="all">Toutes les filières</option>
              {filieres.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>

          <span className="text-xs text-text-muted lg:ml-auto">
            {filteredUsers.length} résultat(s)
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-alt text-text-muted font-medium border-b border-border">
              <tr>
                <th className="px-5 py-3.5">Utilisateur</th>
                <th className="px-5 py-3.5">Rôle</th>
                <th className="px-5 py-3.5 hidden md:table-cell">Filière</th>
                <th className="px-5 py-3.5 hidden lg:table-cell">Projets</th>
                <th className="px-5 py-3.5 hidden lg:table-cell">Inscription</th>
                <th className="px-5 py-3.5 hidden sm:table-cell">Statut</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-text-muted">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent" />
                      Chargement...
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-text-muted">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleConfig = ROLE_CONFIG[user.role]
                  return (
                    <tr key={user.id} className="hover:bg-surface-hover transition-colors">
                      {/* Avatar + nom + email */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="w-9 h-9 rounded-full object-cover border border-border shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">{user.fullName}</p>
                            <p className="text-xs text-text-muted truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Rôle (dropdown) */}
                      <td className="px-5 py-3.5">
                        <div className="relative inline-block">
                          <select
                            value={user.role}
                            onChange={(e) => changeRole(user.id, e.target.value as AdminUser['role'])}
                            className={cn(
                              'appearance-none text-xs font-semibold px-2.5 py-1 pr-7 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent',
                              roleConfig.className
                            )}
                          >
                            <option value="student">Étudiant</option>
                            <option value="admin">Admin</option>
                            <option value="jury">Jury</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
                        </div>
                      </td>

                      {/* Filière */}
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-text-secondary">{user.filiere}</span>
                      </td>

                      {/* Projets */}
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-text-secondary">{user.projectCount}</span>
                      </td>

                      {/* Date d'inscription */}
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-text-secondary">
                          {new Date(user.joinedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>

                      {/* Statut actif/inactif */}
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[10px] px-2 py-0.5',
                            user.isActive
                              ? 'bg-success/10 text-success border-success/20'
                              : 'bg-error/10 text-error border-error/20'
                          )}
                        >
                          {user.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="Voir le profil"
                            className="text-text-muted hover:text-accent hover:bg-accent/10"
                          >
                            <Link to={`/profil/${user.id}`}>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleActive(user.id)}
                            title={user.isActive ? 'Désactiver le compte' : 'Réactiver le compte'}
                            className={cn(
                              user.isActive
                                ? 'text-text-muted hover:text-error hover:bg-error/10'
                                : 'text-text-muted hover:text-success hover:bg-success/10'
                            )}
                          >
                            {user.isActive
                              ? <UserX className="w-4 h-4" />
                              : <UserCheck className="w-4 h-4" />
                            }
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
