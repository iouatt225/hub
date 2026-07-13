import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { RouteProtegee } from '@/components/auth/RouteProtegee'
import { RouteProtegeeAdmin } from '@/components/auth/RouteProtegeeAdmin'
import { Layout } from '@/layouts/Layout'
import { Accueil } from '@/pages/Accueil'
import { Hub } from '@/pages/Hub'
import { NouvelleIdee } from '@/pages/NouvelleIdee'
import { Projet } from '@/pages/Projet'
import { Profil } from '@/pages/Profil'
import { Documentation } from '@/pages/Documentation'
import { Admin } from '@/pages/Admin'
import { NotFound } from '@/pages/NotFound'

/**
 * Composant racine — configuration du routeur React Router et du contexte Auth.
 * Les routes seront ajoutées au fur et à mesure des blocs :
 * - Aucune route restante pour l'instant
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Accueil />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/projet/:id" element={<Projet />} />
            <Route path="/profil/:id" element={<Profil />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route 
              path="/hub/nouvelle-idee" 
              element={
                <RouteProtegee>
                  <NouvelleIdee />
                </RouteProtegee>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <RouteProtegeeAdmin>
                  <Admin />
                </RouteProtegeeAdmin>
              } 
            />
            {/* Les routes suivantes seront ajoutées bloc par bloc */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
