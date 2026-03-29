/**
 * Scroll-Driven Animations Module
 * Clean, modular, and production-ready implementation
 */

(function() {
    'use strict';

    // =========================================
    // 1. Hero Slider - Auto Background Image Changer
    // =========================================

    const initHeroSlider = () => {
        const slides = document.querySelectorAll('.hero-slide');

        if (slides.length === 0) return;

        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds per slide

        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        // Start auto-slide
        setInterval(nextSlide, slideInterval);
    };

    // =========================================
    // 2. Intersection Observer for Fade-In & Reveal Animations
    // =========================================

    const initScrollAnimations = () => {
        const animationElements = document.querySelectorAll('.animate-on-scroll, .reveal-left');

        if (animationElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animationElements.forEach((el) => observer.observe(el));
    };

    // =========================================
    // 3. Typing Animation with Intersection Observer
    // =========================================

    const initTypingAnimation = () => {
        const typingElements = document.querySelectorAll('.typing-title, .typing-subtitle');

        if (typingElements.length === 0) return;

        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    const element = entry.target;
                    const text = element.getAttribute('data-text');
                    const speed = element.classList.contains('typing-title') ? 100 : 50;

                    if (!text) return;

                    element.classList.add('typed');
                    element.textContent = '';

                    let charIndex = 0;
                    const typeWriter = () => {
                        if (charIndex < text.length) {
                            element.textContent += text.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeWriter, speed);
                        }
                    };

                    typeWriter();
                    typingObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        typingElements.forEach((el) => typingObserver.observe(el));
    };

    // =========================================
    // 4. Parallax Effect with requestAnimationFrame
    // =========================================

    const initParallaxV2 = () => {
        // Kita cari elemen yang punya salah satu atau kedua atribut ini
        const parallaxElements = document.querySelectorAll('[data-parallax], [data-parallax-x]');

        if (parallaxElements.length === 0) return;

        const updateParallax = () => {
            const vh = window.innerHeight;
            const scrollY = window.pageYOffset;

            parallaxElements.forEach((el) => {
                const rect = el.getBoundingClientRect();

                // Performa: Cek apakah elemen ada di area pandang
                if (rect.top > vh + 100 || rect.bottom < -100) return;

                const elementCenter = (rect.top + scrollY) + rect.height / 2;
                const viewportCenter = scrollY + vh / 2;
                const distance = viewportCenter - elementCenter;

                // 1. Ambil Speed Vertikal (Y)
                const speedY = parseFloat(el.getAttribute('data-parallax')) || 0;
                const offsetY = distance * speedY;
                el.style.setProperty('--parallax-offset-y', `${offsetY}px`);

                // 2. Ambil Speed Horizontal (X) - BARU!
                const speedX = parseFloat(el.getAttribute('data-parallax-x')) || 0;
                const offsetX = distance * speedX;
                el.style.setProperty('--parallax-offset-x', `${offsetX}px`);
            });
        };

        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateParallax);
        }, { passive: true });

        updateParallax();
    };

    // =========================================
    // 5. Masonry Grid Cards Animation
    // =========================================

    const initMasonryCards = () => {
        const masonryCards = document.querySelectorAll('.masonry-card');

        if (masonryCards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        masonryCards.forEach(el => observer.observe(el));
    };

    // =========================================
    // 6. Scroll Progress Indicator
    // =========================================

    const initScrollProgress = () => {
        const progressBar = document.querySelector('.scroll-progress-bar');

        if (!progressBar) return;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
    };

    // =========================================
    // Initialize All Modules
    // =========================================

    const init = () => {
        initHeroSlider();
        initScrollAnimations();
        initTypingAnimation();
        initParallaxV2();
        initMasonryCards();
        initScrollProgress();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


