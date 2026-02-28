/* ========================================
   AU VIEUX VÉLO BAGNOLET - JAVASCRIPT
   Minimal, performant interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========== MOBILE NAVIGATION ==========
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            nav.classList.toggle('nav--open');
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                nav.classList.remove('nav--open');
            });
        });
    }

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== SCROLL REVEAL ANIMATION ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards and review cards
    document.querySelectorAll('.service-card, .review-card, .atelier__feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealOnScroll.observe(el);
    });

    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ========== STAGGERED ANIMATION FOR GRIDS ==========
    const staggerGrids = () => {
        document.querySelectorAll('.services__grid, .reviews__grid').forEach(grid => {
            const cards = grid.querySelectorAll('.service-card, .review-card');
            cards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    };

    staggerGrids();

    // ========== PARALLAX EFFECT ON HERO ==========
    const heroImage = document.querySelector('.hero__image');

    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px) scale(1.1)`;
        }, { passive: true });
    }

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const highlightNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ========== HOVER EFFECT FOR SERVICE CARDS ==========
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });
    });

    // ========== PRELOAD CRITICAL ASSETS ==========
    const preloadImage = (src) => {
        const img = new Image();
        img.src = src;
    };

    // Preload hero image
    const heroSrc = document.querySelector('.hero__image')?.src;
    if (heroSrc) preloadImage(heroSrc);

    console.log('🚲 Au vieux vélo Bagnolet - Site chargé avec succès !');
});
