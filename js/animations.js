/**
 * PT Herz Consultant Indonesia - Modern Animations Module
 * Advanced animations, transitions, and micro-interactions
 */

(function() {
    'use strict';

    // =========================================
    // 0. Check for reduced motion preference
    // =========================================
    const prefersReducedMotion = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    // =========================================
    // 1. Page Transition on Load
    // =========================================
    const initPageTransition = () => {
        if (prefersReducedMotion()) return;

        document.body.classList.add('page-loading');

        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('page-loading');
                document.body.classList.add('page-loaded');
            }, 100);
        });
    };

    // =========================================
    // 2. Custom Cursor Effect
    // =========================================
    const initCursor = () => {
        if (prefersReducedMotion() || window.innerWidth < 992) return;

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorTrailer = document.querySelector('.cursor-trailer');

        if (!cursorDot || !cursorTrailer) return;

        let mouseX = 0, mouseY = 0;
        let trailerX = 0, trailerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursorDot, {
                duration: 0.1,
                x: mouseX,
                y: mouseY,
                ease: 'none'
            });
        });

        // Trailer follows with delay
        const animateTrailer = () => {
            trailerX += (mouseX - trailerX) * 0.15;
            trailerY += (mouseY - trailerY) * 0.15;

            gsap.set(cursorTrailer, {
                x: trailerX,
                y: trailerY
            });

            requestAnimationFrame(animateTrailer);
        };
        animateTrailer();

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card-modern, .portfolio-card, .feature-card-modern, .stat-card-modern');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorTrailer.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorTrailer.classList.remove('hover');
            });
        });
    };

    // =========================================
    // 3. Floating Particles Background
    // =========================================
    const initParticles = () => {
        if (prefersReducedMotion()) return;

        const container = document.getElementById('particles');
        if (!container) return;

        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            container.appendChild(particle);
        }
    };

    // =========================================
    // 4. Navbar Scroll Effect
    // =========================================
    const initNavbarScroll = () => {
        const navbar = document.querySelector('.navbar-modern');
        if (!navbar) return;

        let lastScroll = 0;

        const updateNavbar = () => {
            const scrollY = window.pageYOffset;

            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = scrollY;
        };

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateNavbar);
        }, { passive: true });

        updateNavbar();
    };

    // =========================================
    // 5. Hero Entrance Animations
    // =========================================
    const initHeroEntrance = () => {
        if (prefersReducedMotion()) {
            document.querySelectorAll('.reveal-item').forEach(el => {
                gsap.set(el, { opacity: 1, y: 0, x: 0 });
            });
            return;
        }

        const tl = gsap.timeline({ delay: 0.8 });

        // Hero badge
        tl.fromTo('.hero-badge-modern',
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }
        )
        // Title lines
        .fromTo('.title-line',
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
            '-=0.3'
        )
        // Description
        .fromTo('.hero-description',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
        )
        // Action buttons
        .fromTo('.hero-actions .reveal-item',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
            '-=0.3'
        )
        // Stats
        .fromTo('.hero-stats',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.2'
        )
        // Visual container
        .fromTo('.hero-visual-container',
            { opacity: 0, scale: 0.9, x: 50 },
            { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.8'
        );

        // Floating cards animation
        gsap.fromTo('.floating-card',
            { opacity: 0, scale: 0.8, y: 20 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                delay: 1.5,
                ease: 'back.out(1.4)'
            }
        );

        // Hero stats counter animation
        initHeroCounters();
    };

    // =========================================
    // 6. Hero Stats Counter
    // =========================================
    const initHeroCounters = () => {
        const counters = document.querySelectorAll('.hero-stat-item .stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const obj = { value: 0 };

            gsap.to(obj, {
                value: target,
                duration: 2,
                delay: 1.2,
                ease: 'power2.out',
                onUpdate: () => {
                    counter.textContent = Math.round(obj.value);
                }
            });
        });
    };

    // =========================================
    // 7. Section Reveal Animations
    // =========================================
    const initSectionReveals = () => {
        if (prefersReducedMotion()) {
            document.querySelectorAll('.reveal-up, .reveal-left, .reveal-item').forEach(el => {
                gsap.set(el, { opacity: 1, y: 0, x: 0 });
            });
            return;
        }

        // Reveal up animations
        gsap.utils.toArray('.reveal-up').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Reveal left animations
        gsap.utils.toArray('.reveal-left').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, x: -80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Generic reveal items
        gsap.utils.toArray('.reveal-item:not(.hero-badge-modern):not(.hero-left-content .reveal-item)').forEach((el, i) => {
            if (el.closest('.hero-left-content')) return; // Skip hero items

            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: (i % 3) * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    };

    // =========================================
    // 8. Service Cards Animation (Staggered)
    // =========================================
    const initServiceCards = () => {
        if (prefersReducedMotion()) {
            document.querySelectorAll('.animate-card').forEach(el => {
                gsap.set(el, { opacity: 1, y: 0 });
            });
            return;
        }

        const cards = document.querySelectorAll('.animate-card');

        cards.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    };

    // =========================================
    // 9. Portfolio Cards Animation
    // =========================================
    const initPortfolioCards = () => {
        if (prefersReducedMotion()) {
            document.querySelectorAll('.animate-portfolio').forEach(el => {
                gsap.set(el, { opacity: 1, y: 0 });
            });
            return;
        }

        const cards = document.querySelectorAll('.animate-portfolio');

        cards.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    };

    // =========================================
    // 10. Stats Counter Animation
    // =========================================
    const initStatsCounter = () => {
        if (prefersReducedMotion()) return;

        const counters = document.querySelectorAll('.counter-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));

            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to({ value: 0 }, {
                        value: target,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: function() {
                            counter.textContent = Math.round(this.targets()[0].value);
                        }
                    });
                },
                once: true
            });
        });
    };

    // =========================================
    // 11. About Section Animations
    // =========================================
    const initAboutSection = () => {
        if (prefersReducedMotion()) {
            document.querySelectorAll('#about .reveal-up, #about .reveal-left').forEach(el => {
                gsap.set(el, { opacity: 1, y: 0, x: 0 });
            });
            return;
        }

        const aboutImg = document.querySelector('.about-main-img');
        if (aboutImg) {
            gsap.fromTo(aboutImg,
                { opacity: 0, scale: 0.9, rotation: -5 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: aboutImg,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        // Feature items staggered
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    };

    // =========================================
    // 12. Commitment Section Parallax
    // =========================================
    const initCommitmentParallax = () => {
        if (prefersReducedMotion()) return;

        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            gsap.to(shape, {
                y: -100,
                rotation: 360,
                duration: 20 + index * 5,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });
        });
    };

    // =========================================
    // 13. Hover Effects - Cards
    // =========================================
    const initCardHovers = () => {
        // Service cards
        document.querySelectorAll('.service-card-modern').forEach(card => {
            const icon = card.querySelector('.sc-icon');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                if (icon) {
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.4,
                        ease: 'back.out(1.7)'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Feature cards
        document.querySelectorAll('.feature-card-modern').forEach(card => {
            const icon = card.querySelector('.fcm-icon');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                if (icon) {
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.4,
                        ease: 'back.out(1.7)'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Portfolio cards
        document.querySelectorAll('.portfolio-card').forEach(card => {
            const arrow = card.querySelector('.pc-arrow');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -12,
                    scale: 1.02,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                if (arrow) {
                    gsap.to(arrow, {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        ease: 'back.out(1.4)'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                if (arrow) {
                    gsap.to(arrow, {
                        opacity: 0,
                        x: -20,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Stat cards
        document.querySelectorAll('.stat-card-modern').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.4,
                    ease: 'back.out(1.4)'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });

        // Floating cards continuous animation
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            gsap.to(card, {
                y: -15,
                duration: 2 + index,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    };

    // =========================================
    // 14. Smooth Scroll for Anchor Links
    // =========================================
    const initSmoothScroll = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();

                    // Add click animation
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            });
        });
    };

    // =========================================
    // 15. Hero Image Slider
    // =========================================
    const initHeroSlider = () => {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        let currentSlide = 0;
        const slideDuration = 5000;

        const goToSlide = (index) => {
            if (index === currentSlide) return;

            gsap.to(slides[currentSlide], {
                opacity: 0,
                duration: 1.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    slides[currentSlide].classList.remove('active');
                }
            });

            currentSlide = index;
            slides[currentSlide].classList.add('active');
            gsap.fromTo(slides[currentSlide],
                { opacity: 0 },
                { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
            );
        };

        const nextSlide = () => {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        };

        setInterval(nextSlide, slideDuration);
    };

    // =========================================
    // 16. Button Ripple Effect
    // =========================================
    const initButtonRipples = () => {
        const buttons = document.querySelectorAll('.btn-hero-primary, .btn-commitment, .btn-services-cta, .btn-portfolio-cta, .btn-about');

        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (prefersReducedMotion()) return;

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255,255,255,0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    width: 100px;
                    height: 100px;
                    left: ${x - 50}px;
                    top: ${y - 50}px;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // =========================================
    // 17. Parallax Effects
    // =========================================
    const initParallax = () => {
        if (prefersReducedMotion()) return;

        // About section parallax
        const aboutImg = document.querySelector('.about-main-img');
        if (aboutImg) {
            gsap.to(aboutImg, {
                y: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about-modern',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }

        // Hero orbs parallax
        gsap.to('.orb-1', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-modern',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.orb-2', {
            y: -150,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-modern',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    };

    // =========================================
    // 18. Section Number Animation
    // =========================================
    const initSectionNumbers = () => {
        if (prefersReducedMotion()) return;

        document.querySelectorAll('.section-number').forEach(num => {
            gsap.fromTo(num,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: num,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    };

    // =========================================
    // 19. Navbar Links Hover Effect
    // =========================================
    const initNavHovers = () => {
        const navLinks = document.querySelectorAll('.nav-link-modern');

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    };

    // =========================================
    // 20. Image Loading Animation
    // =========================================
    const initImageLoading = () => {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            if (img.complete) {
                gsap.fromTo(img,
                    { opacity: 0, scale: 1.05 },
                    { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
                );
            } else {
                img.addEventListener('load', () => {
                    gsap.fromTo(img,
                        { opacity: 0, scale: 1.05 },
                        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
                    );
                });
            }
        });
    };

    // =========================================
    // Initialize All Animations
    // =========================================
    const init = () => {
        console.log('Modern Animations Module initializing...');

        if (typeof gsap === 'undefined') {
            console.error('GSAP not loaded - animations disabled');
            return;
        }

        // Register GSAP plugins
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
        }

        console.log('GSAP version:', gsap.version);

        // Page transition
        initPageTransition();

        // Cursor effect
        initCursor();

        // Particles
        initParticles();

        // Navbar
        initNavbarScroll();
        initNavHovers();

        // Hero
        initHeroEntrance();
        initHeroSlider();

        // Sections
        initSectionReveals();
        initAboutSection();
        initServiceCards();
        initPortfolioCards();
        initStatsCounter();
        initCommitmentParallax();
        initSectionNumbers();

        // Effects
        initCardHovers();
        initButtonRipples();
        initParallax();
        initImageLoading();

        // Smooth scroll
        initSmoothScroll();

        console.log('All modern animations initialized successfully!');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
