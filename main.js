document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60
    });

    document.body.classList.add('page-loaded');

    // Header scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile nav
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        nav?.classList.toggle('active');
    });

    // Smooth scroll (same-page anchors only)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href.length <= 1) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
            navToggle?.classList.remove('active');
            nav?.classList.remove('active');
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('.proof-num');
    let animated = false;

    const animateCounter = el => {
        const target = Number(el.dataset.count || 0);
        const duration = 1800;
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
        if (proof && proof.getBoundingClientRect().top < window.innerHeight * 0.82) {
            animated = true;
            counters.forEach(animateCounter);
        }
    };

    window.addEventListener('scroll', checkCounters);
    checkCounters();

    // Subtle pointer parallax
    const parallaxTargets = document.querySelectorAll('.hero-product-img, .gallery-item img');
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;

        parallaxTargets.forEach((el, i) => {
            const factor = (i % 3 + 1) * 0.08;
            el.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
        });
    });

    // Interactive tilt cards
    const tiltCards = document.querySelectorAll('.feature-card, .app-card, .workflow-step, .gallery-item');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rotateY = (px - 0.5) * 7;
            const rotateX = (0.5 - py) * 7;

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Form submit
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        if (!btn) return;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Sent!';
            setTimeout(() => {
                form.reset();
                btn.textContent = 'Send Request';
                btn.disabled = false;
            }, 1600);
        }, 1200);
    });
});
