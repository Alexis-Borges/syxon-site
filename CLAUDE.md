# syxon-site

Site vitrine de syx-on.fr (Vite + React, statique).

## Déployer sur le VPS

Le site est servi en statique par nginx depuis `/var/www/syx-on.fr` sur le VPS OVH
(`ssh vps-ovh`). Il n'y a pas de git ni de build sur le serveur. Avant toute
intervention, lire `/root/INVENTAIRE.md` sur le VPS ; après, y ajouter une ligne au Journal.

Depuis le PC, après un push sur `main` :

```bash
git clone https://github.com/Alexis-Borges/syxon-site.git /tmp/syxon-deploy
cd /tmp/syxon-deploy && npm ci && npm run build
ssh vps-ovh 'cp -a /var/www/syx-on.fr /root/backups/syx-on.fr-$(date +%F-%H%M)'
tar -C dist -cf - . | ssh vps-ovh 'tar --no-same-owner -C /var/www/syx-on.fr -xf -'
```

- Partir d'un clone propre de `main`, pas d'un dossier de travail qui a des modifications.
- La copie écrase les fichiers et ne supprime rien. nginx n'a pas besoin d'être rechargé.
- Vérifier : `https://syx-on.fr/` en 200, et les fichiers `assets/index-*.js` et `.css`
  cités dans `index.html` en 200.
- Retour arrière : recopier la sauvegarde `/root/backups/syx-on.fr-<date>` dans `/var/www/syx-on.fr`.
- `public/_headers` est au format Netlify/Cloudflare : nginx l'ignore.
