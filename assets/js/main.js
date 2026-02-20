document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky Header appearance change on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg', 'bg-primary/95');
                header.classList.remove('bg-primary/90');
            } else {
                header.classList.remove('shadow-lg', 'bg-primary/95');
                header.classList.add('bg-primary/90');
            }
        });
    }

    // Interactive Image Trace for Portfolio (if needed, otherwise placeholder logic)
    // Basic setup for image hover effects could be added here later.
});
