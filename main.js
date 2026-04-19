document.addEventListener("DOMContentLoaded", () => {
    if (window.AOS) {
        AOS.init({
            duration: 650,
            easing: "ease-out-cubic",
            once: true,
            offset: 60
        });
    }

    document.body.classList.add("page-loaded");

    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const navToggle = document.getElementById("navToggle");

    const syncHeader = () => {
        header?.classList.toggle("scrolled", window.scrollY > 24);
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });

    navToggle?.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        nav?.classList.toggle("active");
    });

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", () => {
            navToggle?.classList.remove("active");
            nav?.classList.remove("active");
        });
    });

    const counters = document.querySelectorAll(".proof-num");
    const proofSection = document.querySelector(".proof");
    let animated = false;

    const animateCounter = (el) => {
        const target = Number(el.dataset.count || 0);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = String(Math.round(target * progress));
            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    const onScroll = () => {
        if (animated || !proofSection) return;
        if (proofSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
            animated = true;
            counters.forEach(animateCounter);
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const form = document.getElementById("contactForm");
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        const button = form.querySelector(".btn-submit");
        if (!button) return;

        const sendingText = document.documentElement.lang === "zh" ? "发送中..." : "Sending...";
        const sentText = document.documentElement.lang === "zh" ? "已发送" : "Sent";
        const defaultText = button.dataset.defaultText || button.textContent;

        button.dataset.defaultText = defaultText;
        button.textContent = sendingText;
        button.disabled = true;

        setTimeout(() => {
            button.textContent = sentText;

            setTimeout(() => {
                form.reset();
                button.textContent = defaultText;
                button.disabled = false;
            }, 1400);
        }, 1000);
    });
});
