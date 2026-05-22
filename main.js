document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (window.AOS) {
        AOS.init({
            duration: 650,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            disable: prefersReducedMotion
        });
    }

    document.body.classList.add('page-loaded');

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 50);
    });

    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const setMobileNavState = isOpen => {
        navToggle?.classList.toggle('active', isOpen);
        nav?.classList.toggle('active', isOpen);
        navToggle?.setAttribute('aria-expanded', String(isOpen));
    };

    navToggle?.addEventListener('click', () => {
        setMobileNavState(!nav?.classList.contains('active'));
    });

    nav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMobileNavState(false));
    });

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href.length <= 1) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
            setMobileNavState(false);
        });
    });

    document.querySelectorAll('[data-pattern-target]').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.patternTarget;
            document.querySelectorAll('[data-pattern-target]').forEach(item => {
                item.classList.toggle('active', item === tab);
            });
            document.querySelectorAll('[data-pattern-panel]').forEach(panel => {
                panel.classList.toggle('active', panel.dataset.patternPanel === target);
            });
        });
    });

    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            const isOpen = trigger.classList.toggle('active');
            trigger.setAttribute('aria-expanded', String(isOpen));
            panel?.classList.toggle('active', isOpen);
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const closeLightbox = () => {
        lightbox?.classList.remove('active');
        lightbox?.setAttribute('aria-hidden', 'true');
        if (lightboxImg) lightboxImg.src = '';
    };

    document.querySelectorAll('[data-lightbox-src]').forEach(item => {
        item.addEventListener('click', () => {
            if (!lightbox || !lightboxImg) return;
            const preview = item.querySelector('img');
            lightboxImg.src = item.dataset.lightboxSrc || '';
            lightboxImg.alt = preview?.alt || '';
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    lightbox?.addEventListener('click', e => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            setMobileNavState(false);
            closeLightbox();
        }
    });

    const heroMedia = document.querySelector('.hero-media');
    const heroVideo = document.querySelector('.hero-media video');
    const heroImage = document.querySelector('.hero-media img');
    const heroSource = heroVideo?.querySelector('source[data-src]');

    const markHeroVisible = () => {
        heroImage?.classList.add('is-loaded');
        heroVideo?.classList.add('is-loaded');
    };

    if (heroImage) {
        if (heroImage.complete) {
            markHeroVisible();
        } else {
            heroImage.addEventListener('load', markHeroVisible, { once: true });
            heroImage.addEventListener('error', markHeroVisible, { once: true });
        }
    }

    const canLoadVideo = heroVideo && heroSource && !prefersReducedMotion && !window.matchMedia('(max-width: 768px)').matches;
    if (canLoadVideo) {
        const loadHeroVideo = () => {
            if (heroSource.dataset.loaded === 'true') return;
            heroSource.src = heroSource.dataset.src;
            heroSource.dataset.loaded = 'true';
            heroVideo.load();
            heroVideo.play().catch(() => {});
            heroVideo.classList.add('is-loaded');
        };

        if ('IntersectionObserver' in window && heroMedia) {
            const heroObserver = new IntersectionObserver(entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    loadHeroVideo();
                    heroObserver.disconnect();
                }
            }, { threshold: 0.1 });
            heroObserver.observe(heroMedia);
        } else {
            loadHeroVideo();
        }
    }

    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!prefersReducedMotion && supportsHover) {
        const parallaxTargets = document.querySelectorAll('.hero-media img');
        let rafPending = false;
        let lastX = 0;
        let lastY = 0;

        window.addEventListener('mousemove', e => {
            lastX = (e.clientX / window.innerWidth - 0.5) * 6;
            lastY = (e.clientY / window.innerHeight - 0.5) * 6;
            if (rafPending) return;

            rafPending = true;
            requestAnimationFrame(() => {
                parallaxTargets.forEach(el => {
                    el.style.transform = `scale(1.03) translate3d(${lastX * 0.08}px, ${lastY * 0.08}px, 0)`;
                });
                rafPending = false;
            });
        });
    }

    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        if (!btn) return;

        const original = btn.textContent;
        btn.textContent = document.documentElement.lang === 'zh' ? '发送中...' : 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = document.documentElement.lang === 'zh' ? '已发送' : 'Sent!';
            setTimeout(() => {
                form.reset();
                btn.textContent = original;
                btn.disabled = false;
            }, 1600);
        }, 900);
    });
});
