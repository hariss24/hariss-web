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
const carouselProgress = document.getElementById('carousel-progress');

if (servicesCarousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Update Progress Bar on Scroll
    if (carouselProgress) {
        const updateProgressBar = () => {
            // Calculate how far we've scrolled (0 to 1)
            const maxScrollLeft = servicesCarousel.scrollWidth - servicesCarousel.clientWidth;
            if (maxScrollLeft > 0) {
                const scrollFraction = servicesCarousel.scrollLeft / maxScrollLeft;
                // The progress bar starts at 33% (1 out of 3 cards)
                // It expands to 100% as we scroll
                const minWidth = 33.33;
                const progressWidth = minWidth + (scrollFraction * (100 - minWidth));
                carouselProgress.style.width = `${progressWidth}%`;
            }
        };

        // Listen for both native scrolling and our JS dragging
        servicesCarousel.addEventListener('scroll', updateProgressBar);
        // Initial setup
        updateProgressBar();
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
        if (!isDown) return;
        isDown = false;
        servicesCarousel.classList.remove('active');
        servicesCarousel.style.scrollSnapType = '';
    });

    servicesCarousel.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        servicesCarousel.classList.remove('active');
        servicesCarousel.style.scrollSnapType = '';
    });

    servicesCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - servicesCarousel.offsetLeft;
        const walk = (x - startX) * 1.5; // Slightly reduced multiplier for smoother feel
        servicesCarousel.scrollLeft = scrollLeft - walk;
    });
}

// 8. Portfolio Infinite Drag & Scroll Carousel
const sliderComponent = document.getElementById('portfolio-slider');
const sliderWrapper = document.getElementById('portfolio-slider-wrapper');
const sliderHint = document.getElementById('slider-hint');

if (sliderComponent && sliderWrapper) {
    const originalSlides = Array.from(sliderWrapper.querySelectorAll('.portfolio-slider-slide'));

    if (originalSlides.length > 0) {
        // Clone slides enough times to fill 3x viewport for seamless looping
        const GAP = 24;
        function measureSetWidth() {
            let w = 0;
            originalSlides.forEach(s => { w += s.offsetWidth + GAP; });
            return w;
        }

        const viewportW = sliderComponent.offsetWidth;
        const oneSetWidth = measureSetWidth();
        // We need at least 3 full sets (1 before, 1 visible, 1 after)
        const clonesNeeded = Math.max(2, Math.ceil((viewportW * 3) / oneSetWidth));

        for (let c = 0; c < clonesNeeded; c++) {
            originalSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                sliderWrapper.appendChild(clone);
            });
        }

        // All slides (originals + clones)
        const allSlides = sliderWrapper.querySelectorAll('.portfolio-slider-slide');

        // State
        let currentX = 0;
        let smoothX = 0;
        let isDragging = false;
        let dragStartX = 0;
        let dragStartScroll = 0;
        let velocity = 0;
        let lastDragX = 0;
        let hintHidden = false;
        let hasDragged = false;

        const LERP_FACTOR = 0.08;
        const WHEEL_SPEED = 1.2;
        const DRAG_SPEED = 1;
        const INERTIA_DECAY = 0.95;
        const INERTIA_THRESHOLD = 0.5;

        function lerp(a, b, t) {
            return a + (b - a) * t;
        }

        // Animation loop — moves the whole wrapper via translateX
        // and silently resets position when crossing a set boundary
        function animate() {
            // Apply inertia when not dragging
            if (!isDragging && Math.abs(velocity) > INERTIA_THRESHOLD) {
                currentX += velocity;
                velocity *= INERTIA_DECAY;
            } else if (!isDragging) {
                velocity = 0;
            }

            // Lerp toward target
            smoothX = lerp(smoothX, currentX, LERP_FACTOR);

            // Infinite loop: silently reset when we scroll past one full set
            // This keeps the numbers from growing infinitely and ensures seamless wrapping
            if (smoothX < -oneSetWidth) {
                smoothX += oneSetWidth;
                currentX += oneSetWidth;
                dragStartScroll += oneSetWidth;
            } else if (smoothX > 0) {
                smoothX -= oneSetWidth;
                currentX -= oneSetWidth;
                dragStartScroll -= oneSetWidth;
            }

            sliderWrapper.style.transform = `translate3d(${smoothX}px, 0, 0)`;
            requestAnimationFrame(animate);
        }

        // --- Wheel handler ---
        sliderComponent.addEventListener('wheel', (e) => {
            const delta = e.deltaY || e.deltaX;
            currentX -= delta * WHEEL_SPEED;
            velocity = 0;

            if (!hintHidden && sliderHint) {
                sliderHint.classList.add('hidden');
                hintHidden = true;
            }
            e.preventDefault();
        }, { passive: false });

        // --- Mouse drag handlers ---
        sliderComponent.addEventListener('mousedown', (e) => {
            isDragging = true;
            hasDragged = false;
            dragStartX = e.clientX;
            dragStartScroll = currentX;
            lastDragX = e.clientX;
            velocity = 0;
            sliderComponent.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - dragStartX;
            if (Math.abs(dx) > 5) hasDragged = true;
            velocity = (e.clientX - lastDragX) * DRAG_SPEED;
            lastDragX = e.clientX;
            currentX = dragStartScroll + dx * DRAG_SPEED;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            sliderComponent.style.cursor = 'grab';
            if (!hintHidden && sliderHint) {
                sliderHint.classList.add('hidden');
                hintHidden = true;
            }
        });

        // --- Touch handlers ---
        sliderComponent.addEventListener('touchstart', (e) => {
            isDragging = true;
            hasDragged = false;
            dragStartX = e.touches[0].clientX;
            dragStartScroll = currentX;
            lastDragX = e.touches[0].clientX;
            velocity = 0;
        }, { passive: true });

        sliderComponent.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const dx = e.touches[0].clientX - dragStartX;
            if (Math.abs(dx) > 5) hasDragged = true;
            velocity = (e.touches[0].clientX - lastDragX) * DRAG_SPEED;
            lastDragX = e.touches[0].clientX;
            currentX = dragStartScroll + dx * DRAG_SPEED;
        }, { passive: true });

        sliderComponent.addEventListener('touchend', () => {
            isDragging = false;
            if (!hintHidden && sliderHint) {
                sliderHint.classList.add('hidden');
                hintHidden = true;
            }
        });

        // --- Prevent link navigation during drag ---
        allSlides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                if (hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });

        // Start
        animate();
    }
}

// 9. FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close all other accordions
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherButton = otherItem.querySelector('.faq-button');
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-icon');

                    otherButton.setAttribute('aria-expanded', 'false');
                    otherContent.style.height = '0px';
                    otherContent.classList.remove('opacity-100');
                    otherContent.classList.add('opacity-0');
                    otherIcon.classList.remove('rotate-45');
                }
            });

            // Toggle current accordion
            if (!isExpanded) {
                // Expanding
                button.setAttribute('aria-expanded', 'true');
                content.style.height = content.scrollHeight + 'px';
                content.classList.remove('opacity-0');
                content.classList.add('opacity-100');
                icon.classList.add('rotate-45');
            } else {
                // Collapsing
                button.setAttribute('aria-expanded', 'false');
                content.style.height = '0px';
                content.classList.remove('opacity-100');
                content.classList.add('opacity-0');
                icon.classList.remove('rotate-45');
            }
        });
    });
}
