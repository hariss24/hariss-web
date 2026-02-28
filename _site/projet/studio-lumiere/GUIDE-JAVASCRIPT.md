# 📚 Guide Complet JavaScript - Studio Lumière

> Ce guide a pour but de t'expliquer en détail le fonctionnement du code JavaScript utilisé dans le projet **Studio Lumière**. 
> Que tu sois débutant ou que tu souhaites approfondir tes connaissances, ce document décortique chaque fonctionnalité étape par étape avec des exemples concrets.

---

## 📖 Table des matières

1. [Les Fondamentaux de JavaScript](#-les-fondamentaux-de-javascript)
2. [Manipulation du DOM (Le Document)](#-manipulation-du-dom)
3. [Analyse du fichier principal : main.js](#-analyse-de-mainjs)
4. [Analyse de l'effet Portfolio : portfolio.js](#-analyse-de-portfoliojs)
5. [Concepts Avancés et Bonnes Pratiques](#-concepts-avancés)
6. [Exercices pour progresser](#-exercices-pratiques)

---

## 📝 Les Fondamentaux de JavaScript

Contrairement à d'autres langages, JavaScript est très flexible. Il n'est pas nécessaire de définir des classes pour tout, et le type des variables est deviné automatiquement.

### 1. Variables et Constantes
On utilise aujourd'hui principalement deux mots-clés pour stocker des données :
- **`const`** : Pour une valeur qui ne changera jamais (ex: une configuration, un élément HTML). C'est la valeur par défaut à utiliser.
- **`let`** : Pour une valeur qui peut évoluer (ex: un compteur, une position).

```javascript
const NOM_DU_SITE = "Studio Lumière"; // Ne changera pas
let nombreDePhotos = 0;              // Peut changer
nombreDePhotos = 5;                  // Mise à jour de la valeur
```

> [!IMPORTANT]
> **Pourquoi peut-on modifier le texte d'un élément `const` ?**  
> `const` empêche de remplacer la variable entière (réassignation), mais il permet de modifier les propriétés à l'intérieur d'un objet (mutation).  
> C'est comme une maison : l'adresse ne change pas (`const`), mais tu peux changer la couleur des murs à l'intérieur.

> 💡 **Exemple d'utilisation** : Imagine que tu veuilles afficher un message de bienvenue personnalisé.
> ```javascript
> const messageBienvenue = "Bienvenue sur notre site !";
> let visiteur = "Jean";
> console.log(messageBienvenue + " Bonjour " + visiteur);
> ```

### 2. Les Types de Données
- **Strings** : Du texte entre guillemets ("Bonjour").
- **Numbers** : Des chiffres, entiers ou décimaux (42, 3.14).
- **Booleans** : Vrai ou Faux (`true`, `false`).
- **Objets** : Un groupe d'informations liées (comme un dictionnaire).
- **Tableaux (Arrays)** : Une liste ordonnée d'éléments.

```javascript
// Un objet regroupant les infos d'une photo
const photo = {
    titre: "Mariage en Provence",
    annee: 2024,
    estPubliee: true
};

// Une liste de catégories
const categories = ["Portrait", "Nature", "Événement"];
```

> 💡 **Exemple d'utilisation** : Si tu veux savoir combien de catégories tu as dans ton portfolio :
> ```javascript
> console.log("Il y a " + categories.length + " catégories disponibles.");
> ```

---

## 🔍 Manipulation du DOM

Le **DOM** (Document Object Model) est la représentation de ta page HTML pour JavaScript. Il permet au script de "voir" et de modifier ton HTML.

### Sélectionner des éléments
Pour agir sur un élément, il faut d'abord l'attraper :
- `document.querySelector('.ma-classe')` : Attrape le premier élément ayant cette classe.
- `document.querySelectorAll('.ma-classe')` : Attrape tous les éléments ayant cette classe (crée une liste).

> 💡 **Exemple d'utilisation** : Changer dynamiquement le titre de ta page :
> ```javascript
> const titrePrincipal = document.querySelector('h1');
> titrePrincipal.textContent = "Nouveau Titre Studio";
> ```

### Modifier le style et les classes
Une fois l'élément sélectionné, on peut changer son apparence :
- `element.classList.add('nom')` : Ajoute une classe CSS.
- `element.classList.toggle('nom')` : L'ajoute si elle n'est pas là, la retire sinon.
- `element.style.color = 'red'` : Change directement le style CSS.

> 💡 **Exemple d'utilisation** : Créer un bouton "Mode Sombre" simple :
> ```javascript
> const boutonMode = document.querySelector('#btn-mode');
> boutonMode.addEventListener('click', function() {
>     document.body.classList.toggle('dark-theme');
> });
> ```

---

## 📄 Analyse de main.js

Ce fichier est le cerveau des interactions générales de ton site (navigation, animations au scroll, etc.).

### 1. Attendre que la page soit prête
Tout le code est enveloppé dans un "écouteur d'événement" :
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Le code ici ne s'exécute que quand HTML est totalement chargé
});
```
> 💡 **Exemple d'utilisation** : Si tu as un message de chargement qui doit disparaître quand tout est prêt :
> ```javascript
> document.addEventListener('DOMContentLoaded', function() {
>     document.querySelector('.loader').style.display = 'none';
> });
> ```

### 2. Le Header Interactif
On veut que le menu change d'apparence dès que l'utilisateur commence à descendre dans la page :
```javascript
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleHeaderScroll);
```
> 💡 **Exemple d'utilisation** : Tu peux utiliser cette technique pour faire apparaître un bouton "Retour en haut" uniquement quand on a scrollé.

### 3. Le Menu Mobile
Pour le menu "hamburger" sur téléphone :
```javascript
navToggle.addEventListener('click', function() {
    this.classList.toggle('active'); // Anime l'icône
    navList.classList.toggle('active'); // Affiche la liste des liens
});
```
> 💡 **Exemple d'utilisation** : C'est ce qui transforme ton icône de menu en une croix (X) quand tu cliques dessus, tout en faisant glisser le menu depuis le côté.

### 4. Animations au défilement (Scroll Reveal)
On utilise `IntersectionObserver` pour surveiller quand un élément entre dans l'écran :
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});
```
> 💡 **Exemple d'utilisation** : Tes photos de mariage qui "glissent" de bas en haut avec un fondu quand tu arrives au milieu de la page.

---

## 🖼️ Analyse de portfolio.js

Ce fichier gère l'effet "traînée d'images" qui suivent la souris sur la page portfolio.

### 1. L'encapsulation (Sécurité)
Le code commence et finit par `(function() { ... })();`. 

> 💡 **Exemple d'utilisation** : Cela évite que si tu utilises un autre script (comme Google Analytics), les deux ne se disputent pas pour savoir qui a raison sur la variable `x` ou `y`.

### 2. Suivre la souris
Le script écoute chaque mouvement de ta souris :
```javascript
canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    processMousePosition(x, y);
});
```
> 💡 **Exemple d'utilisation** : C'est la base de tout ce qui suit le curseur, comme un curseur personnalisé ou, dans notre cas, les images du portfolio.

### 3. Calculer quand afficher une image
On calcule la distance pour éviter les saccades.

> 💡 **Exemple d'utilisation** : C'est comme un peintre qui laisserait tomber une goutte de peinture tous les 10 mètres : l'effet (la traînée) dépend de la vitesse de ton mouvement.

### 4. La rotation aléatoire
Chaque image reçoit une rotation aléatoire :
```javascript
const rotation = Math.random() * (15 - (-15)) + (-15);
img.style.transform = `rotate(${rotation}deg)`;
```
> 💡 **Exemple d'utilisation** : Si tu changes `15` par `360`, les images apparaîtront dans tous les sens possibles !

---

## 🚀 Concepts Avancés

### Les Fonctions Fléchées (`=>`)
```javascript
const direBonjour = (nom) => `Salut ${nom}`;
```
> 💡 **Exemple d'utilisation** : Très pratique pour filtrer une liste de photos par année par exemple :
> ```javascript
> const photos2024 = portfolioImages.filter(img => img.year === 2024);
> ```

### Template Literals (Gabarits)
Utilisation du **\`** (backtick) pour mélanger texte et variables.
```javascript
const ville = "Paris";
console.log(`Bienvenue à ${ville} !`);
```
> 💡 **Exemple d'utilisation** : Générer une carte HTML pour une nouvelle photo dynamiquement :
> ```javascript
> const htmlCard = `<div class="card"><h3>${photo.titre}</h3></div>`;
> ```

### setTimeout (Le Chronomètre)
```javascript
setTimeout(() => {
    console.log("Action différée");
}, 1500);
```
> 💡 **Exemple d'utilisation** : Effacer un message de succès ("Message envoyé !") automatiquement après 3 secondes.

---

## 🎯 Exercices Pratiques

Pour t'aider à t'approprier le code, essaie ces petites modifications :

1. **Modifier la vitesse de traînée** : Dans `portfolio.js`, change `minDistanceForNewImage`. Si tu mets `50`, il y aura beaucoup plus d'images.
2. **Couleur du curseur** : Change le `background-color` de l'élément créé dans l'exercice 4.
3. **Double clic** : Essaie de changer l'événement `click` par `dblclick` pour voir la différence.

---

## 📚 Où apprendre davantage ?

- **MDN Web Docs** : La référence technique absolue.
- **JavaScript.info** : Des explications très visuelles et claires.

---

*Ce guide a été enrichi avec des exemples pour t'aider à mieux visualiser l'impact de chaque ligne de code.*
