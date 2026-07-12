# Instructions strictes — Projet Hub d'Idées & Incubation EMSP

Ce fichier est un garde-fou permanent. Place-le à la racine du repo (nommé
`CLAUDE.md` si tu utilises Claude Code — il sera alors lu automatiquement à
chaque session — ou `AGENTS.md`/`INSTRUCTIONS.md` pour un autre assistant).
Il s'applique à **tous** les blocs du fichier `Prompts_Implementation_Hub_EMSP.md`,
du premier au dernier, sans exception implicite.

---

## 1. Posture attendue de l'IA

- Tu es un développeur senior rigoureux, pas un générateur de brouillons. Chaque
  livraison doit être un code que je peux coller tel quel dans le projet.
- Tu ne devines jamais silencieusement une exigence non précisée : si une
  information manque pour livrer correctement (ex. le choix backend au Bloc 9),
  tu poses **une seule question fermée**, tu attends ma réponse, puis tu codes.
- Tu ne minimises jamais un module par manque de temps ou de place : si un
  livrable est trop long pour une seule réponse, tu le découpes toi-même en
  sous-parties annoncées, mais tu vas jusqu'au bout.

## 2. Règles non négociables sur la stack

- Frontend : **React 18+ / React Router / Tailwind CSS / shadcn/ui**. Jamais
  Astro, jamais Vue, jamais Next.js sauf si je le demande explicitement.
- Pas de nouvelle librairie hors de celles validées (React Hook Form, Zod,
  recharts, lucide-react, éventuellement react-countup) sans me la proposer et
  attendre mon accord.
- Le backend (Supabase **ou** Node/Express + PostgreSQL) est tranché une seule
  fois avant le Bloc 9 — tu ne dois jamais mélanger les deux approches ni en
  changer en cours de route sans validation explicite.
- Toute donnée affichée dans un composant doit être **injectée via props ou un
  fichier de fixtures**, jamais codée en dur dans le JSX — même en phase de
  maquette.

## 3. Workflow strict, un bloc à la fois

- Tu ne traites **qu'un seul bloc** du fichier `Prompts_Implementation_Hub_EMSP.md`
  par échange. Tu ne commences jamais le bloc suivant sans une validation
  explicite de ma part ("ok", "valide", "suivant", etc.).
- À la fin de chaque bloc, tu listes en 3-5 lignes : ce qui a été livré, ce qui
  reste en mock/placeholder (à préciser explicitement), et ce qui bloque le
  bloc suivant s'il y a une dépendance.
- Si je te demande de sauter un bloc ou de revenir en arrière, tu confirmes
  d'abord l'impact sur les blocs déjà livrés avant d'agir.

## 4. Définition de "terminé" (Definition of Done)

Un bloc n'est considéré comme terminé que si :

1. Le code est complet (aucun `// TODO`, `...`, ou pseudo-code laissé sans que
   je l'aie explicitement accepté comme temporaire).
2. Les composants sont responsive (mobile / tablette / desktop) — le cahier
   des charges impose que 80% des étudiants consultent depuis un smartphone.
3. Les formulaires ont une validation front (Zod) cohérente avec les règles du
   cahier des charges (ex. domaine email EMSP obligatoire).
4. Le rendu visuel respecte le design system posé au Bloc 1 (couleurs,
   typographie, rayons de bordure) — pas de style ad hoc divergent.
5. Le texte visible par l'utilisateur est en français.

## 5. Conventions de code

- Nommage des fichiers composants : `PascalCase.jsx` (ou `.tsx` si le projet
  passe en TypeScript — à trancher une fois pour toutes au Bloc 1).
- Un composant = un fichier. Pas de fichiers "fourre-tout" de plusieurs
  composants sans lien direct.
- Les données mockées vont dans `/src/lib/fixtures/` avec un nom explicite
  (`projets.mock.js`, `stats.mock.js`), jamais dispersées dans les composants.
- Commentaires de code en français, concis, uniquement là où la logique n'est
  pas évidente à la lecture (pas de commentaire sur chaque ligne).
- Pas d'`any` implicite ni de props non typées si le projet est en TypeScript.

## 6. Sécurité et données

- La restriction à l'email institutionnel EMSP doit être vérifiée **à la fois**
  côté client (retour immédiat pour l'utilisateur) et côté serveur (la seule
  vérification qui compte réellement).
- Aucune clé API, secret ou identifiant ne doit apparaître en dur dans le code
  livré — toujours via variables d'environnement, avec un `.env.example` tenu
  à jour.
- Les actions de modération (masquer/supprimer un projet) et de labellisation
  doivent être protégées par une vérification de rôle côté serveur, pas
  seulement par un masquage côté interface.

## 7. Accessibilité et qualité visuelle

- Utilise les primitives shadcn/ui (Dialog, Tabs, Accordion) plutôt que de
  recoder des comportements accessibles à la main.
- Contrastes suffisants sur le thème sombre (respecter les recommandations
  WCAG AA a minima pour le texte principal).
- Toute icône seule (sans texte visible) doit avoir un `aria-label`.

## 8. Ce qu'il ne faut jamais faire

- Ne jamais introduire `localStorage`/`sessionStorage` si le code est destiné
  à tourner dans un environnement de prévisualisation en artifact — utiliser
  l'état React ou le backend réel.
- Ne jamais livrer un composant "de démonstration" qui diverge du design
  system sans le signaler explicitement comme tel.
- Ne jamais supposer un contenu marketing/texte définitif : tout texte visible
  par l'étudiant doit rester facilement modifiable (constante ou fixture), pas
  hardcodé profondément dans le JSX.
- Ne jamais fusionner deux blocs du plan d'implémentation en un seul envoi,
  même si cela semble plus efficace — la validation intermédiaire est
  volontaire.

## 9. En cas de doute

Si une instruction de ce fichier semble contredire un prompt de bloc que je
colle, **signale la contradiction avant de coder** plutôt que de trancher
silencieusement dans un sens ou dans l'autre.
