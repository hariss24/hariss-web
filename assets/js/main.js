// 1. Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// 2. (Removed Hide/Show Header logic, header is now always fixed)

// 3. Custom Cursor (only on non-touch devices)
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

if (dot && outline && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    });

    // Lerp for outline
    function animateCursor() {
        let dx = mouseX - outlineX;
        let dy = mouseY - outlineY;

        outlineX += dx * 0.15;
        outlineY += dy * 0.15;

        outline.style.transform = `translate(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%))`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state for cursor
    const hoverables = document.querySelectorAll('.cursor-hover');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.classList.add('hovering');
            dot.style.backgroundColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            outline.classList.remove('hovering');
            dot.style.backgroundColor = '#E25D1E';

            // Reset magnetic force if it's also a magnetic element
            if (el.classList.contains('magnetic') || el.classList.contains('magnetic-area')) {
                el.style.transform = 'translate(0px, 0px)';
            }
        });
    });

    // Magnetic Elements
    const magnetics = document.querySelectorAll('.magnetic, .magnetic-area');
    magnetics.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const strength = el.getAttribute('data-magnetic-strength') || 20;

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * (strength / 100)}px, ${y * (strength / 100)}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none';
        });
    });
}

// 4. Scroll Reveal with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Add slight delay for multiple items
            const lines = entry.target.querySelectorAll('.line');
            lines.forEach((line, index) => {
                line.style.transitionDelay = `${index * 0.15}s`;
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-text').forEach(el => {
    observer.observe(el);
});

// 5. Scrollytelling Horizontal Parallax
const methodSection = document.getElementById('methodology-scroll');
const methodTrack = document.getElementById('method-track');
const methodProgress = document.getElementById('method-progress');
const methodSteps = document.querySelectorAll('.method-step');

if (methodSection && methodTrack && methodSteps.length > 0) {
    lenis.on('scroll', (e) => {
        const rect = methodSection.getBoundingClientRect();
        const vh = window.innerHeight;

        // When the section is sticky (top <= 0) and not yet scrolled past (bottom >= vh)
        if (rect.top <= 0 && rect.bottom >= vh) {
            const totalScrollDistance = rect.height - vh;
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, Math.abs(scrolled) / totalScrollDistance));

            // Each step takes exactly 100vw, so total translation is (N-1) * 100vw
            const maxTranslateVw = (methodSteps.length - 1) * 100;
            const translatePercent = progress * maxTranslateVw;

            methodTrack.style.transform = `translate3d(-${translatePercent}vw, 0, 0)`;

            // Update Progress bar height
            if (methodProgress) {
                methodProgress.style.height = `${progress * 100}%`;
            }

            // Smooth Interpolation for Opacity and Scale
            const stepFloat = progress * (methodSteps.length - 1); // 0 to 2
            methodSteps.forEach((step, idx) => {
                const distance = Math.abs(stepFloat - idx);
                const stepOpacity = Math.max(0.1, 1 - distance * 0.9);
                step.style.opacity = stepOpacity.toString();

                const content = step.querySelector('.method-content');
                if (content) {
                    const stepScale = Math.max(0.8, 1 - distance * 0.2);
                    content.style.transform = `scale(${stepScale})`;
                }
            });
        } else if (rect.top > 0) {
            // Reset to start if above
            methodTrack.style.transform = `translate3d(0vw, 0, 0)`;
            if (methodProgress) methodProgress.style.height = `0%`;
            methodSteps.forEach((s, i) => {
                s.style.opacity = i === 0 ? '1' : '0.1';
                const c = s.querySelector('.method-content');
                if (c) c.style.transform = i === 0 ? 'scale(1)' : 'scale(0.8)';
            });
        } else if (rect.bottom < vh) {
            // Lock to end if scrolled past
            const maxTranslateVw = (methodSteps.length - 1) * 100;
            methodTrack.style.transform = `translate3d(-${maxTranslateVw}vw, 0, 0)`;
            if (methodProgress) methodProgress.style.height = `100%`;
            methodSteps.forEach((s, i) => {
                const isLast = i === (methodSteps.length - 1);
                s.style.opacity = isLast ? '1' : '0.1';
                const c = s.querySelector('.method-content');
                if (c) c.style.transform = isLast ? 'scale(1)' : 'scale(0.8)';
            });
        }
    });
}

// Utils
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// 6. Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelectorAll('.menu-link');
let isMenuOpen = false;

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Open Menu
            mobileMenu.classList.remove('hidden');
            // Small delay to allow display:block to apply before animating opacity
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
            }, 10);
            const spanText = mobileMenuBtn.querySelector('span');
            if (spanText) spanText.textContent = 'Fermer';
            // Stop scrolling
            lenis.stop();
            document.body.style.overflow = 'hidden';
        } else {
            // Close Menu
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 500); // Wait for transition to finish
            const spanText = mobileMenuBtn.querySelector('span');
            if (spanText) spanText.textContent = 'Menu';
            // Resume scrolling
            lenis.start();
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                mobileMenuBtn.click();
            }
        });
    });
}

// 7. Services Mobile Carousel Logic
const servicesCarousel = document.getElementById('services-carousel');
const servicesPrevBtn = document.getElementById('services-prev');
const servicesNextBtn = document.getElementById('services-next');

if (servicesCarousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Arrow Navigation
    if (servicesPrevBtn && servicesNextBtn) {
        // Calculate the scroll distance based on one card width + gap
        const getScrollDistance = () => {
            const card = servicesCarousel.querySelector('div.grid');
            if (!card) return window.innerWidth * 0.9;
            // Get card width and compute exact scroll step
            return card.offsetWidth + 24; // 24 is gap-6 in pixels
        };

        servicesNextBtn.addEventListener('click', () => {
            servicesCarousel.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
        });

        servicesPrevBtn.addEventListener('click', () => {
            servicesCarousel.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
        });
    }

    // Drag to Scroll Logic (for Desktop/Tablet touching)
    servicesCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        servicesCarousel.classList.add('active');
        // Disable scroll snapping during drag for smoother experience
        servicesCarousel.style.scrollSnapType = 'none';

        startX = e.pageX - servicesCarousel.offsetLeft;
        scrollLeft = servicesCarousel.scrollLeft;
    });

    servicesCarousel.addEventListener('mouseleave', () => {
        isDown = false;
        servicesCarousel.classList.remove('active');
        servicesCarousel.style.scrollSnapType = '';
    });

    servicesCarousel.addEventListener('mouseup', () => {
        isDown = false;
        servicesCarousel.classList.remove('active');
        servicesCarousel.style.scrollSnapType = '';
    });

    servicesCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - servicesCarousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast multiplier
        servicesCarousel.scrollLeft = scrollLeft - walk;
    });
}
