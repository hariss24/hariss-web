# Hariss Web - Portfolio Freelance

## Stack
- Eleventy (11ty) avec Nunjucks templating (.njk)
- Tailwind CSS via CDN (pas de build step)
- CSS custom dans assets/css/style.css
- Lenis smooth scroll + custom fullpage slider (assets/js/main.js)
- Deploiement: GitHub Pages ou Vercel (push sur main)

## Structure
- src/*.njk — pages (front matter + contenu)
- src/_includes/ — layouts et composants (base.njk, header.njk, footer.njk)
- assets/css/style.css — styles globaux custom
- assets/js/main.js — JS global (Lenis, slider, curseur)

## Z-index hierarchy (IMPORTANT)
- Noise overlay: 9999 (fixed, pointer-events:none)
- Video section (#ec-demo): 10000 (pour passer au-dessus du grain)
- Cursor (cursor-dot, cursor-outline): 10001 (fixed, pointer-events:none)
- Dot nav: 10002 (fixed, doit etre au-dessus de tout sauf modals)

## Fullpage slider
- Ajouter `is_snap: true` dans le front matter pour activer le snap scroll
- Ajouter la classe `snap-section` sur chaque section pleine page
- Le JS dans main.js gere automatiquement les pages avec la classe `is-snap-page` sur body
- base.njk conditionne la classe body: `{% if is_home or is_snap %}is-snap-page{% endif %}`

## Conventions
- Langue du site: francais (lang="fr-FR")
- Ne pas commiter _site/ (gitignored, output Eleventy)
- Vimeo embeds: ne PAS utiliser `background=1` (cause un tint jaune)
- Iframes cross-origin: ajouter un div overlay transparent pour que le curseur custom reste visible
