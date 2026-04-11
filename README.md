# syx·on — Site vitrine

Landing page officielle de **syx·on**, service de diffusion vidéo dynamique pour pharmacies.

---

## Stack

- **React 18** + **Vite 5**
- **CSS Modules** (un fichier `.module.css` par composant)
- **Coolvetica** via Adobe Fonts (Typekit)
- Aucune librairie UI externe — tout est custom

---

## Installation

```bash
# 1. Cloner / dézipper le projet
cd syxon-site

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de dev
npm run dev
# → http://localhost:5173

# 4. Build de production
npm run build

# 5. Prévisualiser le build
npm run preview
```

---

## Structure du projet

```
syxon-site/
├── index.html                  ← point d'entrée HTML (import Typekit ici)
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                ← mount React
    ├── App.jsx                 ← root : cursor + ordre des sections
    ├── styles/
    │   └── global.css          ← variables CSS, reset, cursor, keyframes, utilities
    └── components/
        ├── Nav.jsx / .module.css
        ├── Hero.jsx / .module.css       ← carousel 3 slides (4s)
        ├── Concept.jsx / .module.css    ← split : points gauche / stats droite
        ├── Offre.jsx / .module.css      ← tarif groupé + 2 cartes prix
        ├── Process.jsx / .module.css    ← 4 étapes
        ├── Realisations.jsx / .module.css ← split texte / écran vertical iframe
        ├── Contact.jsx / .module.css    ← formulaire + infos
        └── Footer.jsx / .module.css
```

---

## Variables CSS globales

Toutes les couleurs et la typo sont dans `src/styles/global.css` :

```css
--noir: #050505
--noir-2: #0d0d0d
--blanc: #f5f5f5
--lavande: #a8b4d0
--lavande-light: #c5cedf
--lavande-dark: #7a8aaa
--cyan: #00E5FF
--metal-start: #c5cedf
--metal-end: #6e7d9e
--font: "coolvetica", sans-serif
```

Pour changer une couleur sur tout le site : modifier uniquement ces variables.

---

## Typo — Adobe Fonts (Typekit)

Le kit est chargé dans `index.html` :

```html
<style>
  @import url("https://use.typekit.net/iaz3doh.css");
</style>
```

Le kit contient **Coolvetica** (Book, Bold, Italic). Il est lié au domaine `syx-on.fr`.  
Si le dev travaille en local sur un autre domaine, ajouter `localhost` dans les domaines autorisés sur [fonts.adobe.com](https://fonts.adobe.com).

---

## Formulaire de contact — branchement API

Dans `Contact.jsx`, la fonction `handleSubmit` est prête à être branchée :

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()

  // Option A — Brevo (ex-Sendinblue)
  await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': 'VOTRE_CLE_BREVO',
    },
    body: JSON.stringify({ email: form.email, attributes: { PRENOM: form.prenom, ... } }),
  })

  // Option B — Formspree (plus simple, sans backend)
  await fetch('https://formspree.io/f/VOTRE_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  // Option C — votre propre endpoint Express/Next/etc.
  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  setSubmitted(true)
}
```

---

## Player iframe (section Réalisations)

Dans `Realisations.jsx`, l'iframe pointe vers :

```
https://syx-on.fr/player/SCR-002-01
```

- Format : **9:16 vertical** (ratio `padding-top: 177.78%`)
- L'URL est masquée côté utilisateur (pas de barre d'adresse visible)
- Pour changer la pharmacie du mois : modifier `src`, le texte `mois`, `title`, et `caption` dans `Realisations.jsx`

---

## Carousel Hero

Dans `Hero.jsx` :

```jsx
const slides = [
  { bg: styles.mockV1, tag: '...', name: '...', headline: <>, sub: '...' },
  // ajouter / modifier les slides ici
]
```

Intervalle de rotation : **4 secondes** (modifiable dans `useEffect`, ligne `setInterval(..., 4000)`).

Pour intégrer de vraies vidéos à la place des mockups :
```jsx
// Remplacer <div className={`${styles.mockVideo} ${s.bg}`}> par :
<video autoPlay muted loop playsInline className={styles.video}>
  <source src={s.videoSrc} type="video/mp4" />
</video>
```

---

## Responsive

Breakpoint unique à **960px** (mobile/tablette).  
Chaque composant a ses propres règles `@media (max-width: 960px)` dans son `.module.css`.

---

## Déploiement

**Vercel (recommandé) :**
```bash
npm i -g vercel
vercel
```

**Netlify :**
```bash
npm run build
# drag & drop le dossier dist/ sur netlify.com
```

**Build manuel :**
```bash
npm run build
# Le dossier dist/ contient le site statique prêt à être servi
```

---

## Contact projet

Wael — WLD Artwork SASU  
`contact@syx-on.fr` · `06 34 18 39 70`
