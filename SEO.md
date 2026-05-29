# SEO — Syxon

Ce qui a été mis en place côté code, et ce qu'il te reste à faire à la main.

Domaine officiel : **https://syx-on.fr/**

## ✅ Déjà fait (dans le code)

- **`index.html`** : title optimisé, meta description, mots-clés, canonical, theme-color,
  balises Open Graph (aperçu WhatsApp/LinkedIn/Facebook) et Twitter Card, données
  structurées JSON-LD (entreprise, contact, zone Île-de-France), et un fallback `<noscript>`.
- **`public/robots.txt`** : autorise tous les robots + pointe vers le sitemap.
- **`public/sitemap.xml`** : liste l'URL du site pour Google.
- **Images générées dans `public/`** :
  - `favicon.png` (256×256, icône de l'onglet)
  - `apple-touch-icon.png` (180×180, fond sombre, pour iOS)
  - `logo.png` (logotype, utilisé par le JSON-LD)
  - `og-image.jpg` (1200×630, logo sur fond sombre — aperçu de partage)

  > Sources d'origine conservées : `syxon-icon-*.png`, `syxon-logotype-*.png`, `syxon-signature-*.png`.

## 🚀 À faire après la mise en ligne (hors code, ~30 min)

Le code seul ne suffit pas à apparaître sur Google. Étapes indispensables :

1. **Google Search Console** (https://search.google.com/search-console)
   - Ajoute le site, vérifie la propriété (DNS ou balise), soumets `https://syx-on.fr/sitemap.xml`.
   - C'est ce qui dit à Google « indexe-moi » et te montre tes positions.
2. **Fiche Google Business Profile** (https://business.google.com)
   - Crée la fiche Syxon (zone : Île-de-France, secteur : communication / affichage).
   - C'est ce qui fait apparaître Syxon dans Google Maps et les recherches locales —
     **le levier le plus rapide** pour qu'un pharmacien te trouve.
3. **Cohérence des coordonnées** (Nom, Adresse, Téléphone) identiques partout.
4. **Vérifier l'aperçu de partage** une fois en ligne :
   - https://www.opengraph.xyz (colle l'URL → voir l'aperçu réel)
   - LinkedIn Post Inspector / Facebook Sharing Debugger.

## 🔒 Sécurité

Audit réalisé le 2026-05-29 :

- ✅ 0 vulnérabilité dans les dépendances de production (`npm audit`).
- ✅ Aucun secret / `.env` commité. Aucun vecteur XSS (React échappe par défaut).
- ✅ `node_modules/` retiré du suivi Git (était commité par erreur).
- ✅ Formulaire durci : honeypot anti-spam (`_gotcha`) + `maxLength` sur tous les champs.
- ✅ En-têtes de sécurité dans `public/_headers` (CSP, HSTS, X-Frame-Options, etc.).

**En-têtes selon l'hébergeur :**
- **Netlify / Cloudflare Pages** : le fichier `public/_headers` est pris en compte automatiquement.
- **Vercel** : créer un `vercel.json` à la racine :
  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains" }
        ]
      }
    ]
  }
  ```

> Après mise en ligne, vérifie le score sur https://securityheaders.com et https://observatory.mozilla.org.
> Si une ressource est bloquée (police, formulaire), ajuste la directive CSP correspondante dans `_headers`.

## 📌 Bon à savoir

- Le site est une SPA React : Google lit le JS, mais pour un référencement plus solide
  sur le long terme, envisager du pré-rendu (ex. `vite-plugin-prerender`) ou un framework
  SSR si tu ajoutes plusieurs pages.
- Le classement prend des **semaines à mois**. Le nom « syxon » sortira vite ; les
  termes concurrentiels (« affichage dynamique pharmacie ») demandent du contenu + du temps.
- Pense à mettre à jour la date `lastmod` dans `sitemap.xml` à chaque grosse modif.
