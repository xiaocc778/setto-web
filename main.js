document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 60
    });

    // Header scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile nav
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
                navToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('.proof-num');
    let animated = false;

    const animateCounter = el => {
        const target = +el.dataset.count;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            el.textContent = current < target ? Math.floor(current) : target;
            if (current < target) requestAnimationFrame(update);
        };
        update();
    };

    const checkCounters = () => {
        if (animated) return;
        const proof = document.querySelector('.proof');
        if (proof && proof.getBoundingClientRect().top < window.innerHeight * 0.8) {
            animated = true;
            counters.forEach(animateCounter);
        }
    };
    window.addEventListener('scroll', checkCounters);
    checkCounters();

    // Form submit
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Sent!';
            setTimeout(() => {
                form.reset();
                btn.textContent = 'Send Request';
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
});