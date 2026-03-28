document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Ambil semua element yang punya class reveal-left
    const reveals = document.querySelectorAll('.reveal-left');

    // 2. Setting "Teropong" (Observer)
    const observerOptions = {
        root: null, // pake viewport browser
        threshold: 0.15, // 15% elemen muncul, langsung trigger
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahin class 'active' pas element masuk layar
                entry.target.classList.add('active');
                // Berhenti amati kalau lu mau animasinya cuma jalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 3. Jalankan teropongnya ke tiap elemen
    reveals.forEach(el => {
        revealObserver.observe(el);
    });
});