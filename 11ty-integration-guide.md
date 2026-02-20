# Guide d'intégration Eleventy (11ty) et Sveltia CMS

Ce document décrit comment intégrer la nouvelle version statique en HTML/TailwindCSS de **hariss-web** dans un environnement Eleventy (11ty) avec l'ajout de Sveltia CMS pour la gestion de contenu.

## 1. Découpage pour Eleventy (Partials et Layouts)

L'avantage de la nouvelle structure HTML est qu'elle est parfaitement modulaire. Pour éviter la répétition du code, voici comment découper votre projet avec Nunjucks (`.njk`) ou Liquid :

### Structure recommandée des dossiers :
```text
/src
  /_includes/
    /components/
      header.njk       # Contient la balise <header> et la navigation (bureau/mobile)
      footer.njk       # Contient la balise <footer>
      head.njk         # Contient les meta tags, polices, et l'inclusion Tailwind
    /layouts/
      base.njk         # Le layout principal qui englobe {{ content | safe }}
      page.njk         # Layout spécifique pour les pages standards
  index.md             # Accueil
  services.md          # Services
  portfolio.md         # Portfolio
  contact.md           # Contact
```

### Exemple de `base.njk` :
```html
<!DOCTYPE html>
<html lang="fr-FR">
<head>
    {% include "components/head.njk" %}
    <title>{{ title }} - Hariss Web</title>
</head>
<body class="bg-primary text-text font-outfit antialiased flex flex-col min-h-screen">
    {% include "components/header.njk" %}
    
    <main class="flex-grow pt-24 pb-20">
        {{ content | safe }}
    </main>

    {% include "components/footer.njk" %}
    <script src="/assets/js/main.js"></script>
</body>
</html>
```

## 2. Intégration de Sveltia CMS

Sveltia CMS (une alternative légère à Decap/Netlify CMS) permet à vos clients de modifier facilement le contenu sans toucher au code HTML.

### Étape 1 : Ajouter Sveltia CMS au site
Créez un dossier `/admin` à la racine de votre site généré, contenant un fichier `index.html` :
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sveltia CMS</title>
  </head>
  <body>
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>
```

### Étape 2 : Configurer `config.yml`
Toujours dans le dossier `/admin`, créez un `config.yml` pour schématiser votre modèle de données :
```yaml
backend:
  name: github
  repo: utilisateur/repo-hariss-web
  branch: main

media_folder: "assets/images"
public_folder: "/assets/images"

collections:
  - name: "pages"
    label: "Pages du Site"
    files:
      - file: "src/index.md"
        label: "Accueil"
        name: "home"
        fields:
          - {label: "Titre Hero", name: "hero_title", widget: "string"}
          - {label: "Description Hero", name: "hero_desc", widget: "text"}
      - file: "src/services.md"
        label: "Services"
        name: "services"
        fields:
          - {label: "Titre Services", name: "title", widget: "string"}
```
*Cette configuration permettra aux clients de modifier directement les zones de texte des pages (qui seront ensuite répercutées dans vos templates Nunjucks en remplaçant le texte codé en dur par `{{ hero_title }}`).*

## 3. Gestion de Tailwind CSS dans 11ty

Actuellement, les pages utilisent le script CDN **Tailwind Play** pour faciliter le développement rapide et la visualisation locale.
Pour la production avec Eleventy :

1. Remplacez la balise `<script src="https://cdn.tailwindcss.com"></script>` (dans `head.njk`) par un `<link rel="stylesheet" href="/assets/css/style.css">`.
2. Configurez un build script dans votre `package.json` Eleventy pour compiler le CSS :
```json
"scripts": {
  "build": "npm run build:css && eleventy",
  "build:css": "npx tailwindcss -i ./src/input.css -o ./_site/assets/css/style.css --minify",
  "start": "npm-run-all --parallel dev:css dev:11ty",
  "dev:css": "npx tailwindcss -i ./src/input.css -o ./_site/assets/css/style.css --watch",
  "dev:11ty": "eleventy --serve"
}
```

## 4. Recommandations d'Optimisation (SEO, Perf, A11y)

### Performance (Lighthouse)
- **Compilation CSS :** Le build Tailwind garantit un fichier CSS d'à peine quelques ko au lieu des centaines de ko de l'ancienne version WordPress.
- **Images :** Assurez-vous d'utiliser le plugin `@11ty/eleventy-img` pour générer automatiquement du WebP et les balises `<picture>` avec les attributs `loading="lazy"` et `decoding="async"` (déjà préparés dans le HTML généré).
- **JavaScript Minimal :** Le fichier `main.js` fourni est purement Vanilla et fait moins de 2ko.

### SEO (Référencement)
- Implémentez un plugin SEO pour Eleventy (ex: `eleventy-plugin-metagen`) pour injecter dynamiquement les balises Meta, OpenGraph et Twitter Cards dans l'entête Nunjucks `head.njk`.
- Générez un fichier `sitemap.xml` et un `robots.txt` automatiquement avec 11ty.

### Accessibilité (A11y)
- Toutes les balises interactives personnalisées (boutons, modales) intègrent déjà les attributs `aria-label` et/ou `aria-hidden`.
- Assurez-vous de conserver les contrastes fournis par les couleurs `text-text` (gris clair) sur `bg-primary` (bleu foncé) qui dépassent les exigences WCAG AA.
