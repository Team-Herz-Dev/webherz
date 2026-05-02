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
    // 4. Masonry Grid Cards Animation
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
        initMasonryCards();
        initScrollProgress();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


