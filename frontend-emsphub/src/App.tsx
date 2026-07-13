import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { RouteProtegee } from '@/components/auth/RouteProtegee'
import { RouteProtegeeAdmin } from '@/components/auth/RouteProtegeeAdmin'
import { Layout } from '@/layouts/Layout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { Accueil } from '@/pages/Accueil'
import { Hub } from '@/pages/Hub'
import { NouvelleIdee } from '@/pages/NouvelleIdee'
import { Projet } from '@/pages/Projet'
import { Profil } from '@/pages/Profil'
import { ModifierProfil } from '@/pages/ModifierProfil'
import { Documentation } from '@/pages/Documentation'
import { NotFound } from '@/pages/NotFound'
import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import { ForgotPassword } from '@/pages/auth/ForgotPassword'

/* Pages du portail d'administration */
import { Dashboard } from '@/pages/admin/Dashboard'
import { Utilisateurs } from '@/pages/admin/Utilisateurs'
import { AdminProjets } from '@/pages/admin/AdminProjets'
import { Commentaires } from '@/pages/admin/Commentaires'
import { Statistiques } from '@/pages/admin/Statistiques'
import { Parametres } from '@/pages/admin/Parametres'

/**
 * Composant racine — configuration du routeur React Router et du contexte Auth.
 * Routes publiques sous Layout, routes admin sous AdminLayout avec protection de rôle.
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques — Layout avec Header + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Accueil />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/projet/:id" element={<Projet />} />
            <Route path="/profil/:id" element={<Profil />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
             <Route 
              path="/hub/nouvelle-idee" 
              element={
                <RouteProtegee>
                  <NouvelleIdee />
                </RouteProtegee>
              } 
            />
            <Route 
              path="/profil/modifier" 
              element={
                <RouteProtegee>
                  <ModifierProfil />
                </RouteProtegee>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Routes admin — AdminLayout avec sidebar + protection de rôle */}
          <Route
            element={
              <RouteProtegeeAdmin>
                <AdminLayout />
              </RouteProtegeeAdmin>
            }
          >
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/utilisateurs" element={<Utilisateurs />} />
            <Route path="/admin/projets" element={<AdminProjets />} />
            <Route path="/admin/commentaires" element={<Commentaires />} />
            <Route path="/admin/statistiques" element={<Statistiques />} />
            <Route path="/admin/parametres" element={<Parametres />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
