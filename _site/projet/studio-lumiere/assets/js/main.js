/* ==========================================================================
   STUDIO LUMIÈRE - MAIN JAVASCRIPT
   ========================================================================== 
   
   Ce fichier gère les interactions générales du site :
   - Navigation responsive
   - Animations au scroll
   - Header sticky
   - Curseur personnalisé (optionnel)
   
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ══════════════════════════════════════════════════════════════════════
       HEADER SCROLL EFFECT
       ══════════════════════════════════════════════════════════════════════ */
    
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    
    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check
    
    /* ══════════════════════════════════════════════════════════════════════
       MOBILE NAVIGATION TOGGLE
       ══════════════════════════════════════════════════════════════════════ */
    
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navList.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
    
    /* ══════════════════════════════════════════════════════════════════════
       SCROLL REVEAL ANIMATIONS
       ══════════════════════════════════════════════════════════════════════ */
    
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    /* ══════════════════════════════════════════════════════════════════════
       SMOOTH SCROLL FOR ANCHOR LINKS
       ══════════════════════════════════════════════════════════════════════ */
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ══════════════════════════════════════════════════════════════════════
       CUSTOM CURSOR (Optionnel - décommenter pour activer)
       ══════════════════════════════════════════════════════════════════════ */
    
    /*
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('visible');
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
    });
    
    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .portfolio-preview__item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    */
    
    /* ══════════════════════════════════════════════════════════════════════
       ACTIVE NAV LINK HIGHLIGHTING
       ══════════════════════════════════════════════════════════════════════ */
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav__link');
    
    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    /* ══════════════════════════════════════════════════════════════════════
       PRELOADER (Optionnel)
       ══════════════════════════════════════════════════════════════════════ */
    
    // Si vous ajoutez un preloader, utilisez ce code :
    /*
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 500);
    });
    */
    
    /* ══════════════════════════════════════════════════════════════════════
       IMAGE LAZY LOADING
       ══════════════════════════════════════════════════════════════════════ */
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    /* ══════════════════════════════════════════════════════════════════════
       FORM VALIDATION (Page Contact)
       ══════════════════════════════════════════════════════════════════════ */
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const errors = [];
            
            if (!data.name || data.name.trim().length < 2) {
                errors.push('Veuillez entrer votre nom');
                isValid = false;
            }
            
            if (!data.email || !isValidEmail(data.email)) {
                errors.push('Veuillez entrer une adresse email valide');
                isValid = false;
            }
            
            if (!data.message || data.message.trim().length < 10) {
                errors.push('Veuillez entrer un message (minimum 10 caractères)');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.textContent = 'Message envoyé !';
                    this.reset();
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            } else {
                alert(errors.join('\n'));
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /* ══════════════════════════════════════════════════════════════════════
       PARALLAX EFFECT (Subtle)
       ══════════════════════════════════════════════════════════════════════ */
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const offset = scrollY * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        }, { passive: true });
    }
    
    /* ══════════════════════════════════════════════════════════════════════
       ANNÉE DYNAMIQUE DANS LE FOOTER
       ══════════════════════════════════════════════════════════════════════ */
    
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    console.log('✨ Studio Lumière - Site initialisé avec succès');
});

/* ==========================================================================
   UTILITAIRES GLOBAUX
   ========================================================================== */

// Debounce function for performance
function debounce(func, wait = 100) {
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

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
