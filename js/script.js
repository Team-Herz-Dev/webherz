/**
 * PT Herz Consultant Indonesia - Main Script
 * Handles general functionality and Bootstrap interactions
 */

(function() {
    'use strict';

    // =========================================
    // 1. Current Year in Footer
    // =========================================
    const setCurrentYear = () => {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // =========================================
    // 2. Bootstrap Navbar Collapse on Link Click (Mobile)
    // =========================================
    const initNavbarCollapse = () => {
        const navLinks = document.querySelectorAll('.navbar-nav-modern .nav-link-modern');
        const navbarCollapse = document.querySelector('.navbar-collapse-modern');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    };

    // =========================================
    // 3. Smooth Scroll for Anchor Links (Fallback)
    // =========================================
    const initFallbackScroll = () => {
        // This is handled by animations.js, but as a fallback
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // =========================================
    // 4. Active Nav Link on Scroll
    // =========================================
    const initActiveNavOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav-modern .nav-link-modern');

        const setActiveLink = () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;

                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', setActiveLink, { passive: true });
        setActiveLink();
    };

    // =========================================
    // 5. Lazy Load Images
    // =========================================
    const initLazyLoad = () => {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for browsers without native support
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => observer.observe(img));
        }
    };

    // =========================================
    // 6. Handle External Links
    // =========================================
    const handleExternalLinks = () => {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.setAttribute('rel', 'noopener noreferrer');
        });
    };

    // =========================================
    // 7. Console Log Branding
    // =========================================
    const consoleBranding = () => {
        console.log('%c PT Herz Consultant Indonesia ', 'background: #FF6B35; color: white; font-size: 16px; padding: 10px 20px; border-radius: 4px;');
        console.log('%c Environmental Intelligence for a Sustainable Future ', 'color: #0A1628; font-size: 12px;');
        console.log('%c Website: https://herzindonesia.com ', 'color: #64748B; font-size: 11px;');
    };

    // =========================================
    // Initialize
    // =========================================
    const init = () => {
        setCurrentYear();
        initNavbarCollapse();
        initActiveNavOnScroll();
        initLazyLoad();
        handleExternalLinks();
        consoleBranding();
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();