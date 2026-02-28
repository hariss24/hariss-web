# 📷 Studio Lumière - Portfolio Photographique

Un template de site web portfolio pour photographes, élégant et moderne, avec une esthétique douce et premium inspirée des galeries d'art contemporain.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 🎨 Caractéristiques

- **Design Premium** : Esthétique crème/beige avec typographies élégantes
- **Effet Portfolio Interactif** : Les images suivent le curseur en traînée
- **100% Responsive** : Optimisé desktop et mobile
- **Zéro Dépendances** : HTML, CSS et JavaScript pur
- **Code Commenté** : Facile à personnaliser
- **SEO Ready** : Structure sémantique HTML5

---

## 📁 Structure du Projet

```
photography-portfolio/
├── index.html              # Page d'accueil
├── portfolio.html          # Portfolio interactif
├── services.html           # Prestations et tarifs
├── about.html              # À propos
├── contact.html            # Contact
├── README.md               # Ce fichier
│
└── assets/
    ├── css/
    │   └── style.css       # Styles principaux
    │
    ├── js/
    │   ├── main.js         # Scripts généraux
    │   └── portfolio.js    # Effet interactif portfolio
    │
    └── images/
        ├── hero-bg.jpg           # Image hero page d'accueil
        ├── about-teaser.jpg      # Image section à propos (accueil)
        ├── about-portrait.jpg    # Portrait page à propos
        ├── about-story.jpg       # Image secondaire page à propos
        ├── favicon.png           # Favicon
        ├── og-image.jpg          # Image Open Graph
        │
        └── portfolio/            # ⭐ VOS IMAGES PORTFOLIO
            ├── preview-1.jpg
            ├── preview-2.jpg
            ├── preview-3.jpg
            ├── placeholder1.jpg
            ├── placeholder2.jpg
            ├── placeholder3.jpg
            ├── placeholder4.jpg
            ├── placeholder5.jpg
            ├── placeholder6.jpg
            ├── placeholder7.jpg
            ├── placeholder8.jpg
            ├── placeholder9.jpg
            └── placeholder10.jpg
```

---

## 🚀 Installation

### Option 1 : Via cPanel (WordPress)

1. **Connectez-vous** à votre cPanel
2. Accédez au **Gestionnaire de fichiers**
3. Naviguez vers le dossier de votre domaine (généralement `public_html`)
4. **Uploadez** tous les fichiers du projet
5. Assurez-vous que `index.html` est à la racine

### Option 2 : Via FTP

1. Connectez-vous avec votre client FTP (FileZilla, etc.)
2. Uploadez l'intégralité du dossier `photography-portfolio`
3. Renommez ou déplacez les fichiers selon votre configuration

---

## ✏️ Personnalisation

### 1. Logo et Nom du Site

Dans chaque fichier HTML, recherchez :
```html
<a href="index.html" class="logo">Studio <span>Lumière</span></a>
```
Et remplacez par votre nom.

### 2. Images

| Image | Dimensions Recommandées | Emplacement |
|-------|------------------------|-------------|
| Hero Background | 1920x1080px | `assets/images/hero-bg.jpg` |
| Portrait | 800x1000px | `assets/images/about-portrait.jpg` |
| Preview Portfolio | 600x800px | `assets/images/portfolio/preview-*.jpg` |
| Portfolio Interactif | 600x800px | `assets/images/portfolio/placeholder*.jpg` |

### 3. Couleurs

Dans `assets/css/style.css`, modifiez les variables CSS :
```css
:root {
    --color-cream: #F7F4F0;        /* Fond principal */
    --color-beige: #E8E2D9;         /* Fond secondaire */
    --color-brown: #7D6E5D;         /* Texte secondaire */
    --color-charcoal: #3A352F;      /* Texte principal */
    --color-sage: #A8B5A0;          /* Accent */
}
```

### 4. Typographies

Les polices sont chargées via Google Fonts. Pour les changer :
```css
@import url('https://fonts.googleapis.com/css2?family=VotrePolice&display=swap');

:root {
    --font-display: 'VotrePolice', serif;
    --font-body: 'VotrePolice', sans-serif;
}
```

### 5. Images du Portfolio Interactif

Dans `assets/js/portfolio.js`, modifiez le tableau `portfolioImages` :
```javascript
const portfolioImages = [
    {
        src: 'assets/images/portfolio/votre-image.jpg',
        alt: 'Description de l\'image',
        category: 'Portrait'
    },
    // Ajoutez autant d'images que souhaité
];
```

### 6. Coordonnées

Dans `contact.html`, remplacez :
- Email : `contact@studio-lumiere.com`
- Téléphone : `+33 6 12 34 56 78`
- Localisation : `Paris, France`

### 7. Tarifs

Dans `services.html`, modifiez les prix dans chaque `.service-card`.

### 8. Réseaux Sociaux

Recherchez et remplacez tous les liens `https://instagram.com`, `https://facebook.com`, etc.

---

## 💡 Configuration du Formulaire de Contact

Le formulaire est en HTML pur. Pour le rendre fonctionnel, vous avez plusieurs options :

### Option A : Formspree (Gratuit)
```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
```

### Option B : Netlify Forms
```html
<form name="contact" method="POST" data-netlify="true">
```

### Option C : PHP
Créez un fichier `process-form.php` et modifiez l'action du formulaire.

---

## 🎭 Effet Portfolio Interactif

L'effet de traînée d'images est configurable dans `portfolio.js` :

```javascript
const CONFIG = {
    maxVisibleImages: 5,          // Images visibles simultanément
    imageWidth: 280,              // Largeur des images
    imageHeight: 380,             // Hauteur des images
    minDistanceForNewImage: 120,  // Distance avant nouvelle image
    fadeOutDuration: 600,         // Durée du fade-out (ms)
    imageLifespan: 2000,          // Durée de vie d'une image (ms)
    rotationRange: { min: -15, max: 15 }, // Rotation aléatoire
};
```

---

## 📱 Responsive

Le site est optimisé pour :
- **Desktop** : 1200px+
- **Laptop** : 1024px - 1199px
- **Tablet** : 768px - 1023px
- **Mobile** : < 768px

---

## 🔍 SEO

N'oubliez pas de personnaliser :
- Les balises `<title>` de chaque page
- Les balises `<meta name="description">`
- Les balises Open Graph (`og:title`, `og:description`, `og:image`)
- Les attributs `alt` des images

---

## 📄 Mentions Légales

N'oubliez pas d'ajouter vos pages :
- Mentions légales
- Politique de confidentialité
- CGV (si applicable)

---

## 🆘 Support

Pour toute question sur ce template :
- Vérifiez que tous les fichiers sont correctement uploadés
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Assurez-vous que les chemins des images sont corrects

---

## 📝 Licence

Ce template est fourni à des fins personnelles et commerciales. 
Crédits appréciés mais non obligatoires.

---

## ✨ Crédits

- Typographies : [Google Fonts](https://fonts.google.com/)
- Icônes : SVG inline personnalisées
- Inspiré par [bridget.pictures](https://bridget.pictures)

---

Créé avec ❤️ pour les photographes
