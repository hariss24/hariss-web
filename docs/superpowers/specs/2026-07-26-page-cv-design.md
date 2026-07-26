# Page CV — hariss-web.fr

Date : 2026-07-26

## Objectif

Publier le CV de Hariss Hafeji sur `/CV`, dans l'identité visuelle du site, avec un
parcours présenté en timeline animée au scroll. Priorité affichée par le commanditaire :
**lisibilité facile** du contenu, impact visuel sur l'habillage.

## Décisions

| Sujet | Décision |
|---|---|
| Emplacement | `/CV`, **hors navigation** (header et footer inchangés) |
| Indexation | `noindex, nofollow` — lien envoyé à la main aux recruteurs |
| Coordonnées | Complètes : email, téléphone, localisation |
| Source de contenu | `src/_data/cv.json`, schéma conservé tel quel |
| Direction artistique | Dark (identité du site) + timeline verticale animée |
| Impression | `@media print` — le visiteur génère son PDF depuis le navigateur |
| Design system | Nouveau groupe `cv/` sur claude.ai/design. `candidatures/` non touché |

## Arbitrage lisibilité / spectaculaire

Le spectaculaire est cantonné au héros et au rail de la timeline. Le corps du CV
(missions, compétences, formation) reste en contraste élevé, taille confortable,
sans effet qui gêne la lecture.

## Architecture

Fichiers créés :
- `src/_data/cv.json` — source unique de vérité
- `src/cv.njk` — page, `permalink: /CV/`, layout `base.njk`

Fichiers modifiés :
- `assets/css/style.css` — bloc `/* CV */` + `@media print` en fin de fichier
- `src/_includes/base.njk` — meta robots conditionnelle sur la variable `noindex`

Aucun JavaScript ajouté : l'`IntersectionObserver` existant de `main.js` observe déjà
`.reveal-text` et échelonne les `.line` enfants de 0,15 s. Chaque entrée de la timeline
est un `.reveal-text` autonome, donc se révèle à son propre passage dans le viewport.

## Sections affichées

Ordre repris de `sectionOrder`, `softSkills` masqué conformément à `hiddenSections` :

1. Héros — nom, titre, coordonnées, Portfolio, Disponibilité, boutons Imprimer / Contact
2. Résumé
3. Expérience (timeline, 4 entrées)
4. Compétences (4)
5. Formation (2)
6. Outils (5 catégories)
7. Langues (3)
8. Projets (1)
9. Centres d'intérêt (3)

`certifications`, `volunteer` et `customSections` sont vides : les boucles ne rendent
rien, aucun titre de section orphelin ne doit apparaître.

## Responsive

- Mobile : une colonne, rail de timeline collé à gauche, date en surtitre. Aucun scroll horizontal.
- Desktop ≥ 768 px : date et lieu en colonne fixe à gauche du rail, contenu à droite.

## Critères de succès vérifiables

1. `npx @11ty/eleventy` termine sans erreur et génère `_site/CV/index.html`
2. La page contient les 4 expériences, 2 formations, 3 langues, 5 catégories d'outils
3. `<meta name="robots" content="noindex, nofollow">` présent dans le `<head>` de `/CV`
4. Aucune occurrence de `/CV` dans `header.njk` ni `footer.njk`
5. Rendu contrôlé sans débordement horizontal à 375 px et 1440 px
6. Les autres pages du site ne reçoivent pas de balise `noindex`
