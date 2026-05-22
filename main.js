const content = window.SETTO_CONTENT || {};

const imagePath = key => content.images?.[key] || "/assets/placeholders/missing-image.webp";

function renderHeader() {
    document.querySelectorAll("[data-site-header]").forEach(header => {
        const nav = content.navigation || [];
        header.innerHTML = `
            <div class="header-inner">
                <a class="brand" href="/index.html" aria-label="Setto home">
                    <img src="${content.brand.logo}" alt="Setto logo" width="138" height="58">
                </a>
                <nav class="nav" id="siteNav" aria-label="Primary navigation">
                    ${nav.map(item => `<a href="${item.href}">${item.label}</a>`).join("")}
                </nav>
                <div class="header-actions">
                    <a class="btn btn-primary header-quote" href="/contact.html#inquiry">Get a Quote</a>
                    <button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav">
                        <span></span><span></span>
                    </button>
                </div>
            </div>
        `;
    });
}

function renderFooter() {
    document.querySelectorAll("[data-site-footer]").forEach(footer => {
        const brand = content.brand || {};
        footer.innerHTML = `
            <div class="container footer-grid">
                <div class="footer-brand">
                    <img src="${brand.logo}" alt="Setto logo" width="138" height="58">
                    <p>${brand.tagline}</p>
                </div>
                <div>
                    <h3>Quick Links</h3>
                    ${content.footerLinks.quickLinks.map(label => {
                        const item = content.navigation.find(nav => nav.label === label);
                        return `<a href="${item?.href || "/index.html"}">${label}</a>`;
                    }).join("")}
                </div>
                <div>
                    <h3>Products</h3>
                    <a href="/product.html">Setto Supreme S75</a>
                    <a href="/product.html#quick-facts">10 L / 15 kg Pail</a>
                    <a href="/product.html#quick-facts">590 ml Sausage</a>
                    <a href="${content.documents.tds}">Technical Data Sheet</a>
                </div>
                <div>
                    <h3>Contact</h3>
                    <a href="tel:${brand.phone?.replace(/[^0-9]/g, "")}">${brand.phone}</a>
                    <a href="mailto:${brand.email}">${brand.email}</a>
                    <p>${brand.location}</p>
                </div>
            </div>
            <div class="footer-bottom">Copyright © Setto Australia. All rights reserved.</div>
        `;
    });
}

function hydrateImages() {
    document.querySelectorAll("[data-image-key]").forEach(img => {
        img.src = imagePath(img.dataset.imageKey);
    });

    document.querySelectorAll("[data-bg-key]").forEach(el => {
        el.style.backgroundImage = `url("${imagePath(el.dataset.bgKey)}")`;
    });

    document.querySelectorAll("[data-tds-link]").forEach(link => {
        link.href = content.documents.tds;
    });
}

function renderProductFormats() {
    const target = document.querySelector("[data-product-formats]");
    if (!target) return;
    target.innerHTML = content.productFormats.map(item => `
        <article class="product-card reveal">
            <div class="card-image">
                <img src="${imagePath(item.imageKey)}" alt="${item.title}" loading="lazy" width="700" height="480">
            </div>
            <div class="card-body">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a class="text-link" href="/product.html">Read More</a>
            </div>
        </article>
    `).join("");
}

function renderSolutions() {
    document.querySelectorAll("[data-solutions]").forEach(target => {
        const limit = Number(target.dataset.limit || content.solutions.length);
        target.innerHTML = content.solutions.slice(0, limit).map(item => `
            <a class="solution-card reveal" href="${item.href}">
                <div class="card-image">
                    <img src="${imagePath(item.imageKey)}" alt="${item.title}" loading="lazy" width="700" height="480">
                </div>
                <div class="card-body">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="text-link">View Solution</span>
                </div>
            </a>
        `).join("");
    });
}

function renderTechnicalHighlights() {
    document.querySelectorAll("[data-technical-highlights]").forEach(target => {
        target.innerHTML = content.technicalHighlights.map(item => `
            <article class="metric-card reveal">
                <span>${item.label}</span>
                <strong>${item.value}</strong>
                ${item.unit ? `<small>${item.unit}</small>` : ""}
            </article>
        `).join("");
    });
}

function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(group => {
        const buttons = group.querySelectorAll("[data-tab-target]");
        const panels = group.querySelectorAll("[data-tab-panel]");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const target = button.dataset.tabTarget;
                buttons.forEach(item => item.classList.toggle("active", item === button));
                panels.forEach(panel => panel.classList.toggle("active", panel.dataset.tabPanel === target));
            });
        });
    });
}

function initNavigation() {
    const header = document.querySelector(".site-header");
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("siteNav");

    const closeMenu = () => {
        nav?.classList.remove("open");
        menuToggle?.classList.remove("active");
        menuToggle?.setAttribute("aria-expanded", "false");
    };

    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 12);
    });

    menuToggle?.addEventListener("click", () => {
        const isOpen = !nav?.classList.contains("open");
        nav?.classList.toggle("open", isOpen);
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });
}

function initInquiryForm() {
    document.querySelectorAll("[data-inquiry-form]").forEach(form => {
        const toast = document.querySelector("[data-toast]");
        form.addEventListener("submit", event => {
            event.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            const button = form.querySelector("button[type='submit']");
            const original = button.textContent;
            button.disabled = true;
            button.textContent = "Sending...";
            setTimeout(() => {
                button.disabled = false;
                button.textContent = original;
                form.reset();
                if (toast) {
                    toast.textContent = "Thanks. Your inquiry has been received.";
                    toast.classList.add("show");
                    setTimeout(() => toast.classList.remove("show"), 3200);
                }
            }, 700);
        });
    });
}

function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach(item => item.classList.add("visible"));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    hydrateImages();
    renderProductFormats();
    renderSolutions();
    renderTechnicalHighlights();
    initNavigation();
    initTabs();
    initInquiryForm();
    initReveal();
});
