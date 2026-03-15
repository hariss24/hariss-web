# Audit Design & Presentation des Services - Hariss Web

## Contexte

**Situation :** Activite freelance en lancement, 0 client a ce jour. Les projets du portfolio sont des demonstrations de competences, pas des commandes reelles. Toutes les recommandations ci-dessous sont adaptees a cette realite.

## Diagnostic global

**Le site est visuellement impressionnant mais souffre d'un decalage fondamental entre son design (agence creative haut de gamme) et sa cible (TPE, artisans, independants).** Le resultat : un site qui impressionne les developpeurs mais ne convertit pas les clients cibles.

---

## CE QUI FONCTIONNE BIEN

| Aspect | Detail |
|--------|--------|
| Identite visuelle | Palette noir/orange (#E25D1E) forte, typographies bien choisies (Syne/Playfair/Inter) |
| Animations | Custom cursor, magnetic buttons, smooth scroll, reveal animations |
| Direction artistique | Coherente : noise overlay, grid-lines, style brutaliste uniforme |
| Qualite technique | Tailwind, Lenis, animations CSS performantes, responsive |
| Portfolio demo | Les projets demo montrent un vrai savoir-faire technique et esthetique |

---

## PROBLEMES IDENTIFIES

### 1. HOMEPAGE - Proposition de valeur floue (CRITIQUE)

**Fichier:** `index.html:138-201`

- Le hero dit "Boostez votre presence en ligne" -- trop generique, c'est ce que dit tout le monde
- "Developpeur freelance CMS" est enterre dans un sous-texte gris clair -- le positionnement est invisible
- Aucun element de reassurance ou de credibilite visible
- La section "Manifesto" dit "Votre activite merite mieux" sans dire POURQUOI choisir Hariss Web specifiquement
- Pas de section services resumee sur la homepage -- on saute de la methodologie directement aux prix

### 2. HOMEPAGE - Parcours de conversion casse (CRITIQUE)

**Fichier:** `index.html:257-483`

- Le hero pousse vers "Commencer un projet" (contact) AVANT que l'utilisateur comprenne les services
- La methodologie en scrollytelling horizontal est visuellement cool mais :
  - Frustrant sur mobile (pas naturel)
  - L'utilisateur ne sait pas combien d'etapes il reste
  - Le contenu est vague ("Aller a l'essentiel", "CMS et autonomie")
- On passe de la methodologie directement aux PRIX sans avoir vu les services detailles

### 3. PAGE SERVICES - Carousel cache 2/3 des services (CRITIQUE)

**Fichier:** `services.html:160-379`

- Les 3 services sont en carousel horizontal ("Glissez pour decouvrir")
- **Statistiques : les carousels ont un taux d'interaction de ~1-3% apres le premier slide**
- Sur desktop, le scroll horizontal n'est pas naturel
- Resultat : la majorite des visiteurs ne voient que le service 1 ("Creation & Refonte de Sites Web")
- Les services 2 (SEO) et 3 (Support) sont litteralement caches

### 4. CONTENU - Jargon technique vs langage client (MAJEUR)

- "CMS Headless" -- un artisan plombier ne sait pas ce que c'est
- "Direction artistique Web" -- un boulanger veut juste un beau site
- "Back-office CMS Headless" -- incomprehensible pour la cible
- "Architecture semantique pour le SEO" -- techno-jargon
- "Design UI/UX epure" -- la cible ne connait pas ces termes
- Le ton "0% bullshit, 100% performance" est decontracte mais peut paraitre peu professionnel

### 5. PRICING - Features techniques au lieu de benefices (MAJEUR)

**Fichier:** `services.html:381-600+` et `index.html:344-483`

- Les forfaits listent des features techniques que la cible ne comprend pas
- Le "+29EUR SEO de base" en option dans l'Essentiel a 549EUR semble mesquin
- Pas de "Pour qui c'est fait" sur chaque forfait
- Pas de FAQ sous les tarifs
- Pas de garantie affichee (satisfaction, delai, revision)

### 6. PORTFOLIO - Projets demo non assumes (MAJEUR)

**Fichier:** `portfolio.html:159-213`

- 3 projets demo mais pas presentes comme tels -- le visiteur peut se demander si ce sont de vrais clients
- Pas de contexte sur le brief, le processus ou les choix de design
- Tags techniques ("WordPress", "One page") au lieu d'orientations resultat
- Pas d'etude de cas montrant le raisonnement derriere chaque projet

### 7. STRUCTURE - Pages manquantes (IMPORTANT)

- Pas de page "A propos" / "Qui suis-je" (crucial pour un freelance qui demarre -- la confiance passe par la personne)
- Le footer dit "Pret a creer l'inattendu ?" -- phrase creative mais inadaptee : les TPE/artisans veulent de la fiabilite, pas de la surprise
- Pas de numero de telephone visible
- Pas d'adresse/localisation (important pour le SEO local ET la confiance)

### 8. BRANDING - Decalage design/cible (STRATEGIQUE)

- Le sous-titre "Creative Studio" cree une dissonance avec la cible "TPE et artisans"
- Le design brutaliste noir/orange ressemble a une agence creative parisienne, pas a un prestataire pour artisans
- Un plombier ou un boulanger ne se reconnait PAS dans cette esthetique
- Le footer dit "Design : Brutalist / Code : Clean" -- c'est du jargon pour designers/devs

---

## PLAN D'AMELIORATION (par priorite)

### Task Type
- [x] Frontend
- [ ] Backend
- [x] Fullstack (contenu + design)

### Etape 1 - Homepage : Credibilite alternative + resumer les services
**Impact: CRITIQUE | Effort: MOYEN**

> Adapte a la realite "0 client" : on remplace la preuve sociale classique par des elements de credibilite accessibles immediatement.

1. **Section "Pourquoi me faire confiance"** apres le manifesto :
   - Reactivite garantie ("Reponse sous 24h")
   - Technos maitrisees (icones : HTML/CSS, WordPress, Tailwind, etc.)
   - Engagement qualite ("Revisions incluses jusqu'a satisfaction")
   - Transparence ("Devis gratuit, sans engagement, sans surprise")
2. **Section "Services en bref"** avec 3 cards simples (icone + titre + 1 phrase benefice client) AVANT les prix
3. **Reformuler le hero** : remplacer le sous-texte par une proposition de valeur claire orientee resultat
4. **Offre de lancement** visible : "Tarifs de lancement pour mes premiers clients" -- transforme le handicap en argument commercial (urgence + prix attractifs)

### Etape 2 - Page Services : Remplacer le carousel par un layout vertical
**Impact: CRITIQUE | Effort: MOYEN**

1. Transformer le carousel horizontal en sections empilees verticalement
2. Chaque service visible directement au scroll normal
3. Chaque service doit repondre a : "Quel RESULTAT concret pour mon business ?"
4. Ajouter un exemple concret sous chaque service (ex: "Imaginons un artisan plombier a Lyon...")

### Etape 3 - Reecrire le contenu en langage client
**Impact: MAJEUR | Effort: MOYEN**

| Avant (jargon) | Apres (langage client) |
|-----------------|------------------------|
| CMS Headless | Modifiez vos textes et images vous-meme, sans faire appel a un technicien |
| Direction artistique Web sur-mesure | Un design unique qui ressemble a votre entreprise |
| Architecture semantique pour le SEO | Votre site bien positionne sur Google |
| Back-office CMS Headless | Un espace d'administration simple pour gerer votre contenu |
| Design UI/UX epure | Un site clair, intuitif et agreable a utiliser |
| Micro-animations | Des effets visuels subtils pour un site vivant |
| 0% bullshit, 100% performance | Des solutions claires et efficaces |

### Etape 4 - Pricing : Ajouter contexte et FAQ
**Impact: MAJEUR | Effort: FAIBLE**

1. Ajouter "Ideal pour..." sur chaque forfait :
   - Essentiel : "Ideal pour demarrer avec une page de presentation professionnelle"
   - Pro : "Ideal pour les pros qui veulent un site complet et autonome"
   - Premium : "Ideal pour les entreprises qui veulent se demarquer"
2. Remonter le SEO de base dans l'Essentiel (ne pas facturer 29EUR de plus -- ca tue la confiance)
3. Ajouter une section FAQ sous les tarifs (5-8 questions)
4. Ajouter une mention bien visible "Devis gratuit - Sans engagement"
5. Ajouter une garantie visible ("Revisions incluses", "Paiement en 2 ou 3 fois possible")
6. Mentionner "Tarif de lancement" pour creer de l'urgence

### Etape 5 - Creer une page "A propos"
**Impact: IMPORTANT | Effort: MOYEN**

1. Photo professionnelle (meme un bon portrait smartphone suffit)
2. Histoire courte et sincere : pourquoi ce metier, ce qui te motive
3. Ton approche : comment tu travailles, ta relation avec les clients
4. Competences techniques (icones/logos des technos)
5. Ton sincere : assumer le debut d'activite avec confiance ("Je mets toute mon energie dans chaque projet pour batir ma reputation")

### Etape 6 - Portfolio : Assumer et enrichir les projets demo
**Impact: IMPORTANT | Effort: MOYEN**

1. Presenter chaque projet comme une **etude de cas** assumee :
   - "Brief fictif" : quel etait le scenario imagine
   - "Processus" : les etapes de creation (recherche, maquette, dev)
   - "Resultat" : screenshots, lien vers le site demo
   - "Ce que ca montre" : les competences demontrees
2. Tags orientes competence/resultat ("Responsive", "Optimise Google", "Autonome")
3. Ajouter une mention claire : "Projets de demonstration -- en attente de mes premiers clients pour des etudes de cas reelles"
4. **Strategie d'acquisition** : proposer 1-2 sites gratuits ou a prix reduit a de vrais commercants locaux en echange d'un temoignage et d'une etude de cas

### Etape 7 - Contact : Humaniser la page
**Impact: MOYEN | Effort: FAIBLE**

1. Ajouter un numero de telephone (ou WhatsApp Business)
2. Ajouter les horaires de disponibilite
3. Ajouter une localisation (meme approximative -- ville)
4. Mentionner le delai de reponse typique ("Je reponds sous 24h")
5. Ajouter un petit texte d'accroche personnel ("Chaque projet commence par une discussion. Parlez-moi de votre activite.")

### Etape 8 - Ajuster le branding (OPTIONNEL - plus strategique)
**Impact: STRATEGIQUE | Effort: FORT**

- Envisager de remplacer "Creative Studio" par qqch comme "Votre vitrine web sur-mesure" ou "Sites web pour independants"
- Remplacer "Pret a creer l'inattendu ?" par "Discutons de votre projet" ou "Votre site pret en X semaines"
- Remplacer "Design : Brutalist / Code : Clean" par qqch d'oriente client
- Conserver la qualite visuelle mais adoucir le cote brutaliste pur

---

## STRATEGIE "PREMIERS CLIENTS" (hors site web)

> Ces actions ne sont pas des changements de code mais sont essentielles pour alimenter le site en contenu reel.

1. **Offrir 1-2 sites a des commercants locaux** (coiffeur, restaurant, artisan) en echange d'un temoignage ecrit + autorisation de publier le projet. C'est le meilleur investissement pour demarrer.
2. **Rejoindre des groupes Facebook/LinkedIn locaux** de commercants et proposer un audit gratuit de leur presence web.
3. **Creer un profil Google Business** pour Hariss Web (aide au SEO local).
4. **Demander a l'entourage** (amis, famille) qui connait un commercant qui aurait besoin d'un site.

---

### Fichiers cles a modifier

| Fichier | Operation | Description |
|---------|-----------|-------------|
| `index.html` | Modifier | Ajouter credibilite alternative, section services resumee, offre de lancement, reformuler textes |
| `services.html` | Modifier | Remplacer carousel par layout vertical, reecrire en langage client |
| `portfolio.html` | Modifier | Transformer en etudes de cas assumees avec processus |
| `contact.html` | Modifier | Ajouter telephone, horaires, localisation, texte personnel |
| `assets/css/style.css` | Modifier | Styles pour nouvelles sections |
| *nouveau* `a-propos.html` | Creer | Page A propos authentique et sincere |

---

### Risques et Mitigation

| Risque | Mitigation |
|--------|------------|
| Perte de l'identite visuelle en simplifiant | Garder la palette et les typos, simplifier le vocabulaire pas le design |
| Assumer "0 client" peut sembler risque | La transparence inspire plus confiance que le bluff. Miser sur la qualite des demos et l'engagement personnel |
| Le carousel est un element marquant du site | Le remplacer par un layout tout aussi beau mais visible d'un coup |
| Offrir des sites gratuits = travail non paye | Le limiter a 1-2 projets strategiques, bien cadres avec un brief clair et un accord ecrit pour le temoignage |
