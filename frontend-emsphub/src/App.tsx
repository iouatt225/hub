import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { Accueil } from '@/pages/Accueil'
import { NotFound } from '@/pages/NotFound'

/**
 * Composant racine — configuration du routeur React Router.
 * Les routes seront ajoutées au fur et à mesure des blocs :
 * - /hub (Bloc 10)
 * - /hub/nouvelle-idee (Bloc 11)
 * - /projet/:id (Bloc 12)
 * - /profil/:id (Bloc 13)
 * - /documentation (Bloc 14)
 * - /admin (Bloc 15)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          {/* Les routes suivantes seront ajoutées bloc par bloc */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
