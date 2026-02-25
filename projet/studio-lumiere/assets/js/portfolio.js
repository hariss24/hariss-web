/* ==========================================================================
   STUDIO LUMIÈRE - PORTFOLIO INTERACTIVE MOUSE TRAIL
   ========================================================================== 
   
   ╔══════════════════════════════════════════════════════════════════════════╗
   ║  EFFET : Les images suivent le curseur et se stackent en traînée        ║
   ║  - Maximum 5 images visibles simultanément                               ║
   ║  - Les images apparaissent dans l'ordre au mouvement de la souris       ║
   ║  - Effet fluide et organique                                             ║
   ╚══════════════════════════════════════════════════════════════════════════╝
   
   PERSONNALISATION :
   ------------------
   1. IMAGES : Modifiez le tableau 'portfolioImages' ci-dessous
   2. TAILLE : Modifiez 'imageWidth' et 'imageHeight'
   3. COMPORTEMENT : Ajustez les constantes de configuration
   
   ========================================================================== */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════════════════════════
       CONFIGURATION - MODIFIEZ CES VALEURS SELON VOS BESOINS
       ══════════════════════════════════════════════════════════════════════ */

    const CONFIG = {
        // Nombre maximum d'images visibles simultanément
        maxVisibleImages: 5,

        // Dimensions des images (en pixels)
        imageWidth: 280,
        imageHeight: 380,

        // Distance minimale entre chaque nouvelle image (en pixels)
        minDistanceForNewImage: 120,

        // Durée de l'animation de fade-out (en millisecondes)
        fadeOutDuration: 600,

        // Les images ne disparaissent plus automatiquement
        // Elles restent jusqu'à ce qu'une nouvelle les remplace
        persistImages: true,

        // Rotation aléatoire des images (en degrés, min et max)
        rotationRange: { min: -15, max: 15 },

        // Échelle de l'image à l'apparition
        initialScale: 0.8,

        // Vitesse de l'animation d'apparition
        appearDuration: 400
    };

    /* ══════════════════════════════════════════════════════════════════════
       LISTE DES IMAGES DU PORTFOLIO
       ══════════════════════════════════════════════════════════════════════
       
       ⚠️ INSTRUCTIONS POUR AJOUTER VOS IMAGES :
       
       1. Placez vos images dans le dossier : /assets/images/portfolio/
       2. Modifiez le tableau ci-dessous avec vos chemins d'images
       3. Format recommandé : JPG ou WebP, dimensions ~600x800px minimum
       4. Nommez vos fichiers de manière descriptive (ex: mariage-paris-001.jpg)
       
       ═══════════════════════════════════════════════════════════════════════ */

    const portfolioImages = [
        { src: 'assets/images/portfolio/placeholder1.jpg', alt: 'Photo 1' },
        { src: 'assets/images/portfolio/placeholder2.jpg', alt: 'Photo 2' },
        { src: 'assets/images/portfolio/placeholder3.jpg', alt: 'Photo 3' },
        { src: 'assets/images/portfolio/placeholder4.jpg', alt: 'Photo 4' },
        { src: 'assets/images/portfolio/placeholder5.jpg', alt: 'Photo 5' },
        { src: 'assets/images/portfolio/placeholder6.jpg', alt: 'Photo 6' },
        { src: 'assets/images/portfolio/placeholder9.jpg', alt: 'Photo 7' },
        { src: 'assets/images/portfolio/placeholder10.jpg', alt: 'Photo 8' },
        { src: 'assets/images/portfolio/placeholder11.jpg', alt: 'Photo 9' },
        { src: 'assets/images/portfolio/placeholder12.jpg', alt: 'Photo 10' },
        { src: 'assets/images/portfolio/placeholder13.jpg', alt: 'Photo 11' },
        { src: 'assets/images/portfolio/placeholder14.jpg', alt: 'Photo 12' },
        { src: 'assets/images/portfolio/placeholder15.jpg', alt: 'Photo 13' },
        { src: 'assets/images/portfolio/placeholder16.jpg', alt: 'Photo 14' },
        { src: 'assets/images/portfolio/placeholder17.jpg', alt: 'Photo 15' },
        { src: 'assets/images/portfolio/placeholder18.jpg', alt: 'Photo 16' },
        { src: 'assets/images/portfolio/placeholder19.jpg', alt: 'Photo 17' },
        { src: 'assets/images/portfolio/placeholder20.jpg', alt: 'Photo 18' },
        { src: 'assets/images/portfolio/placeholder21.jpg', alt: 'Photo 19' },
        { src: 'assets/images/portfolio/placeholder22.jpg', alt: 'Photo 20' },
        { src: 'assets/images/portfolio/placeholder23.jpg', alt: 'Photo 21' },
        { src: 'assets/images/portfolio/placeholder24.jpg', alt: 'Photo 22' },
        { src: 'assets/images/portfolio/placeholder25.jpg', alt: 'Photo 23' },
        { src: 'assets/images/portfolio/placeholder26.jpg', alt: 'Photo 24' },
        { src: 'assets/images/portfolio/placeholder27.jpg', alt: 'Photo 25' },
        { src: 'assets/images/portfolio/placeholder28.jpg', alt: 'Photo 26' },
        { src: 'assets/images/portfolio/placeholder29.jpg', alt: 'Photo 27' },
        { src: 'assets/images/portfolio/placeholder30.jpg', alt: 'Photo 28' },
        { src: 'assets/images/portfolio/placeholder31.jpg', alt: 'Photo 29' },
        { src: 'assets/images/portfolio/placeholder32.jpg', alt: 'Photo 30' },
        { src: 'assets/images/portfolio/placeholder33.jpg', alt: 'Photo 31' },
        /*{ src: 'assets/images/portfolio/placeholder34.jpg', alt: 'Photo 32' },*/
        { src: 'assets/images/portfolio/placeholder35.jpg', alt: 'Photo 33' },
        { src: 'assets/images/portfolio/placeholder36.jpg', alt: 'Photo 34' },
        { src: 'assets/images/portfolio/placeholder37.jpg', alt: 'Photo 35' },
        { src: 'assets/images/portfolio/placeholder38.jpg', alt: 'Photo 36' },
        { src: 'assets/images/portfolio/placeholder39.jpg', alt: 'Photo 37' },
        { src: 'assets/images/portfolio/placeholder40.jpg', alt: 'Photo 38' },
        { src: 'assets/images/portfolio/placeholder41.jpg', alt: 'Photo 39' },
        { src: 'assets/images/portfolio/placeholder42.jpg', alt: 'Photo 40' },
        { src: 'assets/images/portfolio/placeholder43.jpg', alt: 'Photo 41' },
        { src: 'assets/images/portfolio/preview-1.jpg', alt: 'Photo 42' },
        { src: 'assets/images/portfolio/preview-2.jpg', alt: 'Photo 43' },
        { src: 'assets/images/portfolio/preview-3.jpg', alt: 'Photo 44' }
    ];

    /* ══════════════════════════════════════════════════════════════════════
       VARIABLES D'ÉTAT
       ══════════════════════════════════════════════════════════════════════ */

    let canvas = null;
    let activeImages = [];
    let currentImageIndex = 0;
    let lastMousePosition = { x: 0, y: 0 };
    let totalDistance = 0;
    let isInitialized = false;
    let imageCounter = null;
    let infoTitle = null;
    let infoDescription = null;

    /* ══════════════════════════════════════════════════════════════════════
       INITIALISATION
       ══════════════════════════════════════════════════════════════════════ */

    function init() {
        canvas = document.querySelector('.portfolio-canvas');

        if (!canvas) {
            console.warn('Portfolio canvas not found. Make sure .portfolio-canvas exists.');
            return;
        }

        // Get UI elements
        imageCounter = document.querySelector('.portfolio-counter');
        infoTitle = document.querySelector('.portfolio-info__title');
        infoDescription = document.querySelector('.portfolio-info__description');

        // Preload images
        preloadImages();

        // Setup event listeners
        setupEventListeners();

        // Update counter
        updateCounter();

        isInitialized = true;
        console.log('✨ Portfolio interactif initialisé avec', portfolioImages.length, 'images');
    }

    /* ══════════════════════════════════════════════════════════════════════
       PRÉCHARGEMENT DES IMAGES
       ══════════════════════════════════════════════════════════════════════ */

    function preloadImages() {
        portfolioImages.forEach((imageData, index) => {
            const img = new Image();
            img.src = imageData.src;
            img.onload = () => {
                console.log(`Image ${index + 1}/${portfolioImages.length} chargée`);
            };
            img.onerror = () => {
                console.warn(`Erreur de chargement : ${imageData.src}`);
                // Use placeholder on error
                imageData.src = createPlaceholder(index);
            };
        });
    }

    /* ══════════════════════════════════════════════════════════════════════
       CRÉATION DE PLACEHOLDER (si image non trouvée)
       ══════════════════════════════════════════════════════════════════════ */

    function createPlaceholder(index) {
        // Create a canvas-based placeholder
        const placeholderCanvas = document.createElement('canvas');
        placeholderCanvas.width = CONFIG.imageWidth;
        placeholderCanvas.height = CONFIG.imageHeight;
        const ctx = placeholderCanvas.getContext('2d');

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, CONFIG.imageWidth, CONFIG.imageHeight);
        const hue = (index * 30) % 360;
        gradient.addColorStop(0, `hsl(${hue}, 20%, 85%)`);
        gradient.addColorStop(1, `hsl(${hue + 20}, 25%, 75%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CONFIG.imageWidth, CONFIG.imageHeight);

        // Add text
        ctx.fillStyle = '#5C4F42';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Image ${index + 1}`, CONFIG.imageWidth / 2, CONFIG.imageHeight / 2 - 10);
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#7D6E5D';
        ctx.fillText('Placeholder', CONFIG.imageWidth / 2, CONFIG.imageHeight / 2 + 15);

        return placeholderCanvas.toDataURL();
    }

    /* ══════════════════════════════════════════════════════════════════════
       EVENT LISTENERS
       ══════════════════════════════════════════════════════════════════════ */

    function setupEventListeners() {
        // Mouse move handler
        canvas.addEventListener('mousemove', handleMouseMove);

        // Touch support for mobile
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

        // Reset on mouse leave
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Window resize
        window.addEventListener('resize', debounce(handleResize, 200));
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        processMousePosition(x, y);
    }

    function handleTouchMove(e) {
        e.preventDefault();

        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            processMousePosition(x, y);
        }
    }

    function handleMouseLeave() {
        // Optional: fade out all images when mouse leaves
        // activeImages.forEach(img => fadeOutImage(img));
    }

    function handleResize() {
        // Recalculate positions if needed
    }

    /* ══════════════════════════════════════════════════════════════════════
       TRAITEMENT DE LA POSITION DE LA SOURIS
       ══════════════════════════════════════════════════════════════════════ */

    function processMousePosition(x, y) {
        // Calculate distance from last position
        const distance = Math.sqrt(
            Math.pow(x - lastMousePosition.x, 2) +
            Math.pow(y - lastMousePosition.y, 2)
        );

        totalDistance += distance;

        // Create new image if enough distance traveled
        if (totalDistance >= CONFIG.minDistanceForNewImage) {
            createTrailImage(x, y);
            totalDistance = 0;
        }

        // Update last position
        lastMousePosition = { x, y };
    }

    /* ══════════════════════════════════════════════════════════════════════
       CRÉATION D'UNE IMAGE DANS LA TRAÎNÉE
       ══════════════════════════════════════════════════════════════════════ */

    function createTrailImage(x, y) {
        const imageData = portfolioImages[currentImageIndex];

        // Create image element
        const img = document.createElement('img');
        img.className = 'trail-image';
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.draggable = false;

        // Calculate position (centered on cursor)
        const posX = x - CONFIG.imageWidth / 2;
        const posY = y - CONFIG.imageHeight / 2;

        // Random rotation
        const rotation = randomBetween(CONFIG.rotationRange.min, CONFIG.rotationRange.max);

        // Apply styles
        img.style.cssText = `
            position: absolute;
            left: ${posX}px;
            top: ${posY}px;
            width: ${CONFIG.imageWidth}px;
            height: ${CONFIG.imageHeight}px;
            object-fit: cover;
            pointer-events: none;
            will-change: transform, opacity;
            transform: rotate(${rotation}deg) scale(${CONFIG.initialScale});
            opacity: 0;
            z-index: ${currentImageIndex};
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            transition: transform ${CONFIG.appearDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1),
                        opacity ${CONFIG.appearDuration}ms ease-out;
        `;

        // Add to canvas
        canvas.appendChild(img);

        // Store reference
        const imageObj = {
            element: img,
            index: currentImageIndex,
            createdAt: Date.now(),
            rotation: rotation
        };
        activeImages.push(imageObj);

        // Trigger animation (next frame)
        requestAnimationFrame(() => {
            img.style.transform = `rotate(${rotation}deg) scale(1)`;
            img.style.opacity = '1';
        });

        // Update info display
        updateInfoDisplay(imageData);

        // Increment index (loop through images)
        currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;

        // Update counter
        updateCounter();

        // Remove excess images (les anciennes disparaissent quand il y a plus de 5 images)
        removeExcessImages();
    }

    /* ══════════════════════════════════════════════════════════════════════
       FADE OUT D'UNE IMAGE
       ══════════════════════════════════════════════════════════════════════ */

    function fadeOutImage(imageObj) {
        if (!imageObj || !imageObj.element) return;

        const img = imageObj.element;

        // Animate out
        img.style.transition = `opacity ${CONFIG.fadeOutDuration}ms ease-out, transform ${CONFIG.fadeOutDuration}ms ease-out`;
        img.style.opacity = '0';
        img.style.transform = `rotate(${imageObj.rotation}deg) scale(0.9)`;

        // Remove from DOM after animation
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }

            // Remove from active images array
            const index = activeImages.indexOf(imageObj);
            if (index > -1) {
                activeImages.splice(index, 1);
            }
        }, CONFIG.fadeOutDuration);
    }

    /* ══════════════════════════════════════════════════════════════════════
       SUPPRESSION DES IMAGES EN EXCÈS
       ══════════════════════════════════════════════════════════════════════ */

    function removeExcessImages() {
        while (activeImages.length > CONFIG.maxVisibleImages) {
            const oldestImage = activeImages.shift();
            fadeOutImage(oldestImage);
        }
    }

    /* ══════════════════════════════════════════════════════════════════════
       MISE À JOUR DU COMPTEUR
       ══════════════════════════════════════════════════════════════════════ */

    function updateCounter() {
        if (imageCounter) {
            const current = currentImageIndex + 1;
            const total = portfolioImages.length;
            imageCounter.innerHTML = `<span>${String(current).padStart(2, '0')}</span> / ${String(total).padStart(2, '0')}`;
        }
    }

    /* ══════════════════════════════════════════════════════════════════════
       MISE À JOUR DES INFORMATIONS
       ══════════════════════════════════════════════════════════════════════ */

    function updateInfoDisplay(imageData) {
        // Les images n'ont plus de catégories, affichage simplifié
        if (infoTitle) {
            infoTitle.textContent = 'Portfolio';
        }
        if (infoDescription) {
            infoDescription.textContent = '';
        }
    }

    /* ══════════════════════════════════════════════════════════════════════
       UTILITAIRES
       ══════════════════════════════════════════════════════════════════════ */

    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /* ══════════════════════════════════════════════════════════════════════
       API PUBLIQUE (pour personnalisation avancée)
       ══════════════════════════════════════════════════════════════════════ */

    window.PortfolioTrail = {
        // Réinitialiser le portfolio
        reset: function () {
            activeImages.forEach(img => fadeOutImage(img));
            activeImages = [];
            currentImageIndex = 0;
            totalDistance = 0;
        },

        // Obtenir la configuration actuelle
        getConfig: function () {
            return { ...CONFIG };
        },

        // Mettre à jour la configuration
        setConfig: function (newConfig) {
            Object.assign(CONFIG, newConfig);
        },

        // Obtenir les images
        getImages: function () {
            return [...portfolioImages];
        },

        // Ajouter une image dynamiquement
        addImage: function (imageData) {
            portfolioImages.push(imageData);
            return portfolioImages.length;
        }
    };

    /* ══════════════════════════════════════════════════════════════════════
       DÉMARRAGE
       ══════════════════════════════════════════════════════════════════════ */

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/* ==========================================================================
   FIN DU FICHIER - PORTFOLIO.JS
   ========================================================================== 

   ╔═══════════════════════════════════════════════════════════════════════════╗
   ║                                                                           ║
   ║   RÉCAPITULATIF POUR AJOUTER VOS IMAGES :                                ║
   ║                                                                           ║
   ║   1. Créez le dossier : /assets/images/portfolio/                        ║
   ║                                                                           ║
   ║   2. Ajoutez vos images (format JPG, PNG ou WebP)                        ║
   ║      Dimensions recommandées : 600x800px minimum                         ║
   ║                                                                           ║
   ║   3. Modifiez le tableau 'portfolioImages' au début de ce fichier        ║
   ║      Exemple :                                                            ║
   ║      {                                                                    ║
   ║          src: 'assets/images/portfolio/mon-image.jpg',                   ║
   ║          alt: 'Description de l\'image',                                 ║
   ║          category: 'Portrait'                                            ║
   ║      }                                                                    ║
   ║                                                                           ║
   ║   4. Testez en local puis uploadez sur votre serveur                     ║
   ║                                                                           ║
   ╚═══════════════════════════════════════════════════════════════════════════╝

*/
