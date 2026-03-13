# Homepage Reassurance Sections — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ajouter deux sections de réassurance sur la homepage : un bandeau de garanties sous le hero et une section "métiers ciblés" avant les forfaits.

**Architecture:** Deux blocs HTML insérés dans `src/index.njk`. Pas de nouveau fichier, pas de JS supplémentaire — les animations existantes (Intersection Observer + reveal-text) couvrent déjà le besoin. Icônes en SVG inline.

**Tech Stack:** Nunjucks (11ty), Tailwind CSS, SVG inline icons

---

### Task 1: Ajouter le bandeau de réassurance sous le hero

**Files:**
- Modify: `src/index.njk` (après la fermeture `</section>` du hero, ligne ~112, avant la section manifesto)

**Step 1: Ajouter le HTML du bandeau de réassurance**

Insérer ce bloc entre le hero (`</section>` ligne 112) et la section manifesto (`<!-- Manifesto / About -->` ligne 114) :

```html
<!-- Reassurance Banner -->
<section class="bg-surface py-8 md:py-10 px-6 md:px-12 relative z-20 w-full border-y border-white/5">
    <div class="container mx-auto max-w-7xl">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            <!-- Livré en 2 semaines -->
            <div class="flex items-start gap-4 md:border-r md:border-white/10 md:pr-8 lg:pr-12 reveal-text">
                <div class="line flex items-start gap-4">
                    <svg class="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <div>
                        <p class="font-syne font-bold text-white text-sm md:text-base uppercase tracking-tight">Livré en 2 semaines</p>
                        <p class="font-inter text-gray-500 text-xs md:text-sm font-light mt-1">Votre site en ligne, vite.</p>
                    </div>
                </div>
            </div>
            <!-- Réponse sous 24h -->
            <div class="flex items-start gap-4 md:border-r md:border-white/10 md:px-8 lg:px-12 reveal-text">
                <div class="line flex items-start gap-4">
                    <svg class="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <div>
                        <p class="font-syne font-bold text-white text-sm md:text-base uppercase tracking-tight">Réponse sous 24h</p>
                        <p class="font-inter text-gray-500 text-xs md:text-sm font-light mt-1">Toujours disponible.</p>
                    </div>
                </div>
            </div>
            <!-- Devis gratuit -->
            <div class="flex items-start gap-4 md:border-r md:border-white/10 md:px-8 lg:px-12 reveal-text">
                <div class="line flex items-start gap-4">
                    <svg class="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <div>
                        <p class="font-syne font-bold text-white text-sm md:text-base uppercase tracking-tight">Devis gratuit</p>
                        <p class="font-inter text-gray-500 text-xs md:text-sm font-light mt-1">Sans surprise, en 24h.</p>
                    </div>
                </div>
            </div>
            <!-- Sans engagement -->
            <div class="flex items-start gap-4 md:pl-8 lg:pl-12 reveal-text">
                <div class="line flex items-start gap-4">
                    <svg class="w-6 h-6 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <div>
                        <p class="font-syne font-bold text-white text-sm md:text-base uppercase tracking-tight">Sans engagement</p>
                        <p class="font-inter text-gray-500 text-xs md:text-sm font-light mt-1">Pas d'abonnement caché.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Vérifier le build**

Run: `npx @11ty/eleventy --serve`
Expected: Le bandeau apparaît entre le hero et la section manifesto, 4 colonnes sur desktop, 2x2 sur mobile.

**Step 3: Commit**

```bash
git add src/index.njk
git commit -m "feat: add reassurance banner below hero section"
```

---

### Task 2: Ajouter la section "Pensé pour votre métier" avant les forfaits

**Files:**
- Modify: `src/index.njk` (après la fermeture `</section>` de la méthodologie scrollytelling ligne ~203, avant la section pricing ligne ~205)

**Step 1: Ajouter le HTML de la section métiers**

Insérer ce bloc entre la section scrollytelling (`</section>` ligne 203) et la section pricing (`<!-- Pricing -->` ligne 205) :

```html
<!-- Pensé pour votre métier -->
<section class="py-24 md:py-32 px-6 md:px-12 bg-pitch relative z-10 w-full">
    <div class="container mx-auto max-w-4xl text-center">
        <div class="reveal-text mb-6">
            <p class="line font-syne text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-white">
                Pensé pour votre métier
            </p>
        </div>
        <div class="reveal-text mb-14 md:mb-20">
            <p class="line font-serif italic text-gray-400 text-lg md:text-xl font-light">
                Quel que soit votre domaine, votre site sera taillé sur mesure.
            </p>
        </div>
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
            {% set metiers = ["Artisans", "Coiffeurs", "Restaurateurs", "Plombiers", "Électriciens", "Agents immobiliers", "Thérapeutes", "Photographes", "Coachs", "Commerces de proximité"] %}
            {% for metier in metiers %}
            <span class="metier-tag font-inter text-xs md:text-sm text-gray-400 border border-white/20 px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-default">
                {{ metier }}
            </span>
            {% endfor %}
        </div>
    </div>
</section>
```

**Step 2: Vérifier le build**

Run: `npx @11ty/eleventy --serve`
Expected: Section "Pensé pour votre métier" visible entre la méthodologie et les forfaits, tags centrés avec hover orange.

**Step 3: Commit**

```bash
git add src/index.njk
git commit -m "feat: add target professions section before pricing"
```

---

### Task 3: Ajouter le staggered reveal CSS pour les tags métiers

**Files:**
- Modify: `assets/css/style.css` (en fin de fichier)

**Step 1: Ajouter les styles d'animation staggered**

Ajouter à la fin de `assets/css/style.css` :

```css
/* Staggered reveal for metier tags */
.metier-tag {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.5s ease, transform 0.5s ease, background-color 0.3s, color 0.3s, border-color 0.3s;
}

.metier-tag.is-visible {
    opacity: 1;
    transform: translateY(0);
}
```

**Step 2: Ajouter le JS staggered dans `assets/js/main.js`**

Trouver l'Intersection Observer existant pour `.reveal-text` et ajouter un observer similaire pour `.metier-tag`. Ajouter ce bloc après l'observer existant :

```javascript
// Staggered reveal for metier tags
const metierTags = document.querySelectorAll('.metier-tag');
if (metierTags.length > 0) {
    const metierObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.parentElement.querySelectorAll('.metier-tag');
                tags.forEach((tag, i) => {
                    setTimeout(() => {
                        tag.classList.add('is-visible');
                    }, i * 80);
                });
                metierObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    metierObserver.observe(metierTags[0]);
}
```

**Step 3: Vérifier le build et l'animation**

Run: `npx @11ty/eleventy --serve`
Expected: Les tags métiers apparaissent un par un avec un délai de 80ms entre chaque.

**Step 4: Commit**

```bash
git add assets/css/style.css assets/js/main.js
git commit -m "feat: add staggered reveal animation for metier tags"
```
