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
        const animationElements = document.querySelectorAll('.animate-on-scroll, .reveal-left, .fade-up-stagger, .reveal-right');

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
    // 3. Fade-in Animation (replaces typing)
    // =========================================

    const initFadeInAnimation = () => {
        const fadeElements = document.querySelectorAll('.fade-in-text');

        if (fadeElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        fadeElements.forEach((el) => observer.observe(el));
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
    // 5. Animated Counters
    // =========================================

    const initAnimatedCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // Semakin kecil semakin cepat

        if (counters.length === 0) return;

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statSection = document.querySelector('.stat-divider');
        if (statSection) {
            observer.observe(statSection);
        }
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
    // 7. Certificate Carousel
    // =========================================

    const initCertificateCarousel = () => {
        const track = document.getElementById('certTrack');
        const prevBtn = document.getElementById('certPrev');
        const nextBtn = document.getElementById('certNext');
        const dotsContainer = document.getElementById('certDots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        
        if (!track || !prevBtn || !nextBtn) return;

        const cards = track.querySelectorAll('.certificate-card');
        if (cards.length === 0) return;

        let currentIndex = 0;
        let cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, cards.length - cardsPerView);

        function getCardsPerView() {
            const width = window.innerWidth;
            if (width <= 767) return 1;
            if (width <= 991) return 2;
            return 3;
        }

        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth;
            const gap = 24;
            const offset = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
        }

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
            });
        });

        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = Math.min(currentIndex, Math.max(0, cards.length - cardsPerView));
            }
            updateCarousel();
        });

        updateCarousel();
    };

    // =========================================
    // Initialize All Modules
    // =========================================

    const init = () => {
        initHeroSlider();
        initScrollAnimations();
        initFadeInAnimation();
        initMasonryCards();
        initAnimatedCounters();
        initScrollProgress();
        initCertificateCarousel();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


