# Prompts d'implémentation — Hub d'Idées & Incubation EMSP

Chaque bloc ci-dessous est un prompt autonome, à coller **un par un** (dans l'ordre) dans ton assistant de code (Claude Code, Cursor, etc.). Attends la livraison et valide avant de passer au bloc suivant. Le **Bloc 0** est un socle de contexte à coller en tout début de session (ou à garder en mémoire/fichier `CONTEXT.md` du repo) : il n'attend pas de livrable, il cadre tous les blocs suivants.

Stack cible : **React 18 + React Router + Tailwind CSS + shadcn/ui**, backend au choix (Supabase ou Node/Express + PostgreSQL), déploiement Vercel/Netlify. Design de référence : structure du template [ScrewFast](https://themewagon.github.io/screwfast/), recréée en composants React (pas d'Astro).

---

## Bloc 0 — Contexte global (à coller en premier)

```
Tu es développeur full stack sur le projet "Hub d'Idées & Incubation" de l'EMSP
(École Supérieure Multinationale des Postes, Abidjan), une plateforme web pour la
Journée du Numérique permettant aux étudiants de déposer, voter et rejoindre des
projets innovants.

Stack imposée :
- Frontend : React 18+, React Router, Tailwind CSS, shadcn/ui pour les composants
  accessibles (modales, onglets, accordéons).
- Gestion d'état : Context API (passage à Zustand/Redux Toolkit seulement si un
  module l'exige explicitement).
- Backend : [À PRÉCISER PAR TOI : Supabase | Node.js/Express + PostgreSQL].
- Auth : email institutionnel EMSP obligatoire (domaine à restreindre), JWT ou
  OAuth Google/Microsoft EMSP.
- Hébergement : Vercel ou Netlify, déploiement continu via GitHub.

Référence de design : structure de la page https://themewagon.github.io/screwfast/
(hero, bandeau logos, 4 piliers, démonstration à onglets, témoignage + stats,
cartes de statut, FAQ accordéon, CTA final, footer riche), recréée en composants
React/Tailwind — PAS en Astro. Thème sombre par défaut, un seul accent vif
(jaune électrique du template, ou bleu électrique/vert menthe si on s'éloigne du
template). Typographie sans-serif moderne (Inter ou Geist).

Convention de travail : livraison incrémentale, un module/une page à la fois.
Ne passe jamais au module suivant sans validation explicite. Chaque livraison
doit être un code complet, réutilisable, commenté quand nécessaire — pas des
extraits partiels à compléter. Réponds et commente en français.

Je vais te donner les modules un par un. Attends chaque prompt avant de coder.
Confirme que tu as bien intégré ce contexte, puis attends le Bloc 1.
```

---

## Bloc 1 — Initialisation du projet & design system

```
Module : Initialisation + Design System

Objectif : poser les fondations techniques et visuelles avant toute page.

Livrables attendus :
1. Structure de projet React (Vite) avec Tailwind CSS configuré, arborescence
   claire : /src/components, /src/pages, /src/layouts, /src/lib, /src/hooks.
2. Configuration Tailwind : palette de couleurs (fond sombre, accent vif au
   choix, gris neutres), tokens d'espacement et de rayon de bordure cohérents
   avec un rendu type "SaaS moderne".
3. Police : import Inter (ou Geist) via Google Fonts ou self-hosted, appliquée
   globalement.
4. Composants shadcn/ui à installer et préconfigurer : Button, Card, Dialog
   (modales), Tabs, Accordion, Avatar, Badge.
5. Un fichier de constantes de marque (nom du Hub, baseline, couleurs) pour
   centraliser les textes réutilisés.

Ne code aucune page pour l'instant. Livre uniquement la configuration et
présente l'arborescence finale. Attends ma validation avant le Bloc 2.
```

---

## Bloc 2 — Layout global (Header, navigation, footer, modales auth)

```
Module : Layout global

Objectif : composant de mise en page partagé par toutes les pages, header +
footer, en s'inspirant du template ScrewFast.

Livrables attendus :
1. `<Header />` : logo/nom du Hub, navigation (Accueil, Hub, Documentation),
   bouton "Se connecter" / "S'inscrire" qui ouvre une modale (Dialog shadcn/ui)
   avec formulaire email + mot de passe, validation stricte de l'email
   institutionnel EMSP (regex de domaine), lien "Mot de passe oublié".
   Header sticky au scroll, responsive (menu burger mobile).
2. `<Footer />` sur le modèle du footer ScrewFast à 3 colonnes : "Explorer"
   (Projets, Règlement, Charte), "Club Info" (À propos, Recrutement),
   "Newsletter" (champ email + bouton s'abonner). Réseaux sociaux en bas.
3. `<Layout />` englobant qui inclut Header + Footer + zone de contenu
   (children ou <Outlet /> React Router).
4. Les formulaires d'auth doivent être des composants contrôlés, prêts à être
   branchés sur le backend (pas d'appel API réel pour l'instant — simuler avec
   une fonction `onSubmit` loguée en console).

Respecte le design system posé au Bloc 1. Livre le code complet des 3
composants. Attends ma validation avant le Bloc 3.
```

---

## Bloc 3 — Page d'accueil : Hero + bandeau logos

```
Module : Page d'accueil — section Hero

Objectif : premier bloc visible de la landing, calqué sur le hero ScrewFast.

Livrables attendus :
1. `<Hero />` : titre d'accroche (ex. "Propulsez vos idées pour la Journée du
   Numérique"), sous-titre, deux CTA ("Déposer une idée" → /hub/nouvelle-idee,
   "Explorer le Hub" → /hub), un groupe d'avatars superposés (porteurs de
   projets, données mockées) + compteur "X idées déposées", note/indicateur
   d'engagement.
2. `<TrustedBy />` : bandeau de logos (filières EMSP, Club Info, partenaires),
   données mockées dans un tableau, défilement horizontal simple en CSS si
   plus de 5 logos.
3. Les deux composants doivent accepter leurs données via props (pas de valeurs
   codées en dur dans le JSX), pour être alimentés plus tard par une API.

Livre le code complet. Attends ma validation avant le Bloc 4.
```

---

## Bloc 4 — Page d'accueil : les 4 piliers

```
Module : Page d'accueil — section "piliers"

Objectif : reproduire le bloc "Meeting Industry Demands" de ScrewFast (grille
de 4 cartes icône + titre + texte), adapté aux valeurs du Hub.

Livrables attendus :
1. `<PiliersSection />` avec 4 cartes : "Centraliser les idées",
   "Collaborer inter-filières", "Valoriser les projets",
   "Sécuriser & modérer". Chaque carte : icône (lucide-react), titre, texte
   court (2 lignes max).
2. Grille responsive (1 colonne mobile, 2 tablette, 4 desktop).
3. Contenu des cartes dans un tableau de données en tête de fichier, pour
   modification facile.

Livre le code complet. Attends ma validation avant le Bloc 5.
```

---

## Bloc 5 — Page d'accueil : démonstration à onglets

```
Module : Page d'accueil — démonstration produit

Objectif : reproduire le bloc à onglets + visuel de ScrewFast, avec 3 onglets
présentant les fonctionnalités clés du Hub.

Livrables attendus :
1. `<DemoTabs />` avec le composant Tabs de shadcn/ui : onglets "Fil
   d'actualité", "Dépôt d'idée", "Filtres & matchmaking". Chaque onglet
   affiche un texte descriptif court + une image/capture (placeholder pour
   l'instant, `<img>` avec src configurable en prop).
2. Transition fluide entre onglets, actif visuellement marqué (accent de
   couleur).
3. Responsive : sur mobile, les onglets passent en liste verticale ou en
   scroll horizontal.

Livre le code complet. Attends ma validation avant le Bloc 6.
```

---

## Bloc 6 — Page d'accueil : témoignage + statistiques

```
Module : Page d'accueil — preuve sociale

Objectif : reproduire le bloc témoignage + bandeau de stats chiffrées de
ScrewFast.

Livrables attendus :
1. `<Testimonial />` : citation d'un étudiant ou enseignant, avatar, nom,
   rôle/filière — sur fond contrasté comme dans le template.
2. `<StatsCounter />` : 4 statistiques clés (idées déposées, votes cumulés,
   taux d'engagement, équipes formées), avec animation de comptage simple au
   scroll (Intersection Observer ou librairie légère type `react-countup`).
3. Données mockées, structurées en tableau pour être remplacées par un appel
   API plus tard.

Livre le code complet. Attends ma validation avant le Bloc 7.
```

---

## Bloc 7 — Page d'accueil : cartes "statut de participation"

```
Module : Page d'accueil — cartes de statut (équivalent pricing)

Objectif : reproduire la grille tarifaire de ScrewFast, transformée en filtre
d'entrée non-monétaire.

Livrables attendus :
1. `<StatutCards />` : 3 cartes "Solo", "Équipe complète", "Cherche
   associé(s)", même structure visuelle qu'un bloc pricing (titre, description
   courte, liste de bénéfices/caractéristiques, CTA "Explorer ces projets" qui
   pointe vers /hub avec un filtre pré-appliqué en query param).
2. Une carte mise en avant visuellement (ex. "Cherche associé(s)", la plus
   dynamique pour l'événement), comme le badge "Best value" de ScrewFast.

Livre le code complet. Attends ma validation avant le Bloc 8.
```

---

## Bloc 8 — Page d'accueil : FAQ + CTA final

```
Module : Page d'accueil — FAQ et conversion finale

Objectif : reproduire l'accordéon FAQ et le CTA pleine largeur de ScrewFast.

Livrables attendus :
1. `<FAQ />` avec le composant Accordion de shadcn/ui : 5-6 questions
   (comment déposer une idée, comment voter, comment rejoindre une équipe,
   règles de modération, qui peut s'inscrire, que se passe-t-il après la
   Journée du Numérique). Contenu dans un tableau de données.
2. `<CTAFinal />` : bandeau pleine largeur, fond accent, titre "Rejoignez le
   Hub et proposez votre idée avant la Journée du Numérique", bouton d'action
   unique.
3. Assemble dans une page `<Accueil />` complète tous les composants des Blocs
   3 à 8 dans l'ordre : Hero, TrustedBy, Piliers, DemoTabs, Testimonial+Stats,
   StatutCards, FAQ, CTAFinal, le tout dans le Layout du Bloc 2.

Livre le code complet, y compris la page d'assemblage. Attends ma validation
avant le Bloc 9.
```

---

## Bloc 9 — Authentification fonctionnelle

```
Module : Authentification

Objectif : brancher réellement l'auth email EMSP (jusqu'ici simulée au Bloc 2).

Précise-moi d'abord si le backend est Supabase ou Node/Express avant de coder
(pose la question si ce n'est pas encore tranché).

Livrables attendus :
1. Fonctions d'inscription/connexion réelles (Supabase Auth ou endpoint
   Express + JWT), avec validation stricte du domaine email EMSP côté client
   ET côté serveur.
2. Gestion de session (contexte React `AuthContext` avec user courant, statut
   de chargement, fonctions login/logout/register).
3. Page ou flux "mot de passe oublié" fonctionnel.
4. Protection de routes : composant `<RouteProtegee />` qui redirige vers la
   connexion si non authentifié, utilisé pour /hub/nouvelle-idee, /profil,
   /admin.

Livre le code complet. Attends ma validation avant le Bloc 10.
```

---

## Bloc 10 — Page /hub : fil d'actualité et filtres

```
Module : Page Hub (fil d'actualité)

Objectif : page listant les projets avec tri et filtres avancés.

Livrables attendus :
1. `<PageHub />` : grille de `<CarteProjet />` (titre, tags, statut d'équipe,
   nombre de votes, aperçu de la problématique), pagination ou scroll infini.
2. Barre de filtres : recherche par tag, par date, par popularité, par
   compétence recherchée (ex. "cherche développeur React"), reflétée dans
   l'URL via query params (pour permettre les liens directs depuis les
   StatutCards du Bloc 7).
3. Tri par tendance (upvotes récents) par défaut.
4. Données mockées via un tableau/fixture, structure prête pour un
   remplacement par un appel API (fonction `fetchProjets(filtres)` isolée).

Livre le code complet. Attends ma validation avant le Bloc 11.
```

---

## Bloc 11 — Formulaire de dépôt d'idée

```
Module : Page /hub/nouvelle-idee

Objectif : formulaire de dépôt de projet, validé et accessible uniquement aux
utilisateurs connectés (RouteProtegee).

Livrables attendus :
1. Formulaire avec React Hook Form + Zod : titre, problématique, solution,
   tags (multi-select ou champ libre avec suggestions), statut de l'équipe
   (Solo / Équipe complète / Cherche associés), upload optionnel de pièce
   jointe (pitch PDF, maquette).
2. Validation stricte côté client (messages d'erreur clairs en français),
   prête pour un contrôle miroir côté backend.
3. Retour visuel de succès + redirection vers la fiche du projet créé (ou vers
   /hub si l'ID n'est pas encore disponible en mock).
4. Temps de saisie doit rester simple : formulaire en une seule page, pas
   d'étapes multiples (contrainte du cahier des charges : dépôt en < 2 min).

Livre le code complet. Attends ma validation avant le Bloc 12.
```

---

## Bloc 12 — Fiche projet détaillée

```
Module : Page /projet/:id

Objectif : page détail d'un projet avec interactions (vote, commentaires,
candidature).

Livrables attendus :
1. `<PageProjet />` : affichage complet (titre, problématique, solution, tags,
   statut d'équipe, pièces jointes, porteur du projet avec lien vers son
   profil).
2. Système d'upvote (bouton avec compteur, état "déjà voté" désactivé pour
   l'utilisateur courant).
3. Espace commentaires : liste + formulaire d'ajout, réservé aux utilisateurs
   connectés.
4. Bouton "Rejoindre l'aventure" : ouvre une modale de candidature (message
   court à l'attention du porteur de projet).
5. Badge "Sélection Officielle" / "Coup de cœur" affiché si le projet est
   labellisé (donnée mockée booléenne pour l'instant).

Livre le code complet. Attends ma validation avant le Bloc 13.
```

---

## Bloc 13 — Profil utilisateur

```
Module : Page /profil/:id

Objectif : page de présentation d'un étudiant.

Livrables attendus :
1. `<PageProfil />` : avatar, nom, filière, bio courte, liste de compétences
   (badges), liste des projets déposés et liste des projets rejoints (deux
   sections distinctes, réutilise `<CarteProjet />` du Bloc 10).
2. Mode édition si l'utilisateur consulte son propre profil (bouton
   "Modifier mon profil" ouvrant un formulaire).

Livre le code complet. Attends ma validation avant le Bloc 14.
```

---

## Bloc 14 — Page Documentation (règlement & charte)

```
Module : Page /documentation

Objectif : reproduire la section "Ecosystem > Documentation" de ScrewFast,
adaptée au règlement du Hub.

Livrables attendus :
1. `<PageDocumentation />` : sommaire latéral (sticky) + contenu long-form
   (règlement du Hub, charte de bonne conduite, guide de dépôt d'idée),
   structuré en sections ancrées (id + scroll-to).
2. Mise en page lisible type documentation technique (largeur de texte
   contrainte, hiérarchie typographique claire).

Livre le code complet. Attends ma validation avant le Bloc 15.
```

---

## Bloc 15 — Panneau d'administration

```
Module : Page /admin

Objectif : modération, labellisation, statistiques — accès restreint aux
comptes admin/jury (RouteProtegee avec vérification de rôle).

Livrables attendus :
1. `<PageAdmin />` avec 3 onglets (Tabs shadcn/ui) : "Modération" (liste des
   projets, actions masquer/supprimer avec confirmation), "Labellisation"
   (attribution du badge "Sélection Officielle" par toggle), "Statistiques"
   (nombre d'idées postées, tags les plus utilisés sous forme de graphique
   simple, taux d'engagement).
2. Vérification de rôle utilisateur (`user.role === 'admin'`) avant d'afficher
   la page, redirection sinon.
3. Graphique de stats avec une librairie légère (recharts).

Livre le code complet. Attends ma validation avant le Bloc 16.
```

---

## Bloc 16 — Backend / API

```
Module : Backend

Objectif : implémenter les endpoints réels consommés par les fonctions
`fetchProjets`, `createProjet`, `voteProjet`, `postComment`, `fetchProfil`,
`moderateProjet`, `labelProjet`, `fetchStats` posées dans les blocs précédents.

Précise-moi d'abord l'option retenue (Supabase avec RLS, ou Node/Express +
PostgreSQL) si ce n'est pas déjà fait.

Livrables attendus :
1. Schéma de base de données (tables : utilisateurs, projets, tags, votes,
   commentaires, labels).
2. Endpoints ou requêtes correspondant à chaque fonction frontend listée
   ci-dessus, avec validation serveur (Zod côté Node, ou policies RLS côté
   Supabase).
3. Restriction d'inscription au domaine email EMSP appliquée aussi côté
   serveur (pas seulement côté client).
4. Documentation courte des routes/API (README ou fichier API.md).

Livre le code complet. Attends ma validation avant le Bloc 17.
```

---

## Bloc 17 — Déploiement

```
Module : Déploiement

Objectif : mise en production sur Vercel ou Netlify avec CI/CD lié à GitHub.

Livrables attendus :
1. Fichier de configuration de déploiement (vercel.json ou netlify.toml selon
   le choix), variables d'environnement listées (sans valeurs sensibles).
2. Étapes de connexion du repo GitHub à la plateforme d'hébergement.
3. Checklist de vérification post-déploiement reprenant les critères
   d'acceptation du cahier des charges (connexion < 30s, création de projet
   < 2 min et affichage instantané, chargement mobile < 2s).

Livre la configuration et la checklist. C'est le dernier module.
```

---

### Rappel d'usage

- Colle le **Bloc 0** une seule fois en début de session.
- Colle ensuite les blocs 1 à 17 **un par un**, dans l'ordre, en attendant la
  livraison et ta validation avant chaque bloc suivant.
- Si le backend n'est pas encore tranché (Supabase vs Node/Express), décide-le
  avant le Bloc 9 — plusieurs blocs suivants en dépendent.
