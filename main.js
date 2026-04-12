/**
 * SETTO - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 80
    });

    // ============================================
    // Navigation
    // ============================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // Counter Animation
    // ============================================
    const counters = document.querySelectorAll('.stat-num');
    let animated = false;

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };

        update();
    };

    const checkCounters = () => {
        if (animated) return;
        const section = document.getElementById('advantages');
        if (section) {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight * 0.8) {
                animated = true;
                counters.forEach(counter => animateCounter(counter));
            }
        }
    };

    window.addEventListener('scroll', checkCounters);
    checkCounters();

    // ============================================
    // Form Handling
    // ============================================
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = `
                Sent!
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 13l4 4L19 7"/>
                </svg>
            `;

            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });

    // ============================================
    // Language Toggle
    // ============================================
    const langBtn = document.querySelector('.lang-btn');
    let isEn = true;

    langBtn.addEventListener('click', () => {
        isEn = !isEn;
        langBtn.textContent = isEn ? 'EN / 中' : '中 / EN';
    });
});