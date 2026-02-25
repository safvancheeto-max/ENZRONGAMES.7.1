document.addEventListener('DOMContentLoaded', () => {
    // Initialize standard UI elements
    const navbar = document.querySelector('.navbar-container');
    const scrollRevealElements = document.querySelectorAll('.animate-text, .reveal-anim');

    // Scroll effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.top = '0';
            navbar.querySelector('.navbar').style.borderRadius = '0';
            navbar.querySelector('.navbar').style.border = 'none';
        } else {
            navbar.style.top = '20px';
            navbar.querySelector('.navbar').style.borderRadius = '16px';
            navbar.querySelector('.navbar').style.border = '1px solid var(--border-glass)';
        }

        revealOnScroll();
    });

    // Reveal elements on scroll
    function revealOnScroll() {
        scrollRevealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }

    // Initial check
    revealOnScroll();

    // Render Featured Games if on home page
    if (typeof renderFeaturedGames === 'function') {
        renderFeaturedGames();
    }

    // Smooth Page Transitions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            if (link.hostname === window.location.hostname && !link.hash) {
                // Potential transition logic here if needed
            }
        });
    });

    console.log("Enzron Games Platform Initialized");
});
