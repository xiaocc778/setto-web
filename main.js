const content = window.SETTO_CONTENT || {};

const imagePath = key => content.images?.[key] || "/assets/placeholders/missing-image.webp";

function renderHeader() {
    document.querySelectorAll("[data-site-header]").forEach(header => {
        const isReplicaHome = document.body.classList.contains("homey-replica");
        const nav = content.navigation || [];

        if (isReplicaHome) {
            header.innerHTML = `
                <div class="replica-topbar">
                    <div class="topbar-inner">
                        <div class="topbar-contact">
                            <span>Email: ${content.brand.email}</span>
                            <span>Phone: ${content.brand.phone}</span>
                        </div>
                        <div class="topbar-social" aria-label="Social links">
                            <a href="#" aria-label="Facebook">f</a>
                            <a href="#" aria-label="Instagram">i</a>
                            <a href="#" aria-label="YouTube">y</a>
                            <a href="#" aria-label="LinkedIn">in</a>
                        </div>
                    </div>
                </div>
                <div class="header-inner">
                    <a class="brand" href="/index.html" aria-label="Setto home">
                        <img src="${content.brand.logo}" alt="Setto logo" width="190" height="76">
                    </a>
                    <div class="replica-nav-wrap">
                        <nav class="nav" id="siteNav" aria-label="Primary navigation">
                            <a href="/index.html#about">About Us</a>
                            <div class="nav-item">
                                <span class="nav-item-trigger" tabindex="0">Products</span>
                                <div class="mega-menu">
                                    <a href="/product.html">Setto Supreme S75</a>
                                    <a href="/product.html#quick-facts">10 L / 15 kg Pail</a>
                                    <a href="/product.html#quick-facts">590 ml Sausage</a>
                                    <a href="/installation.html#technical-data">Technical Data Sheet</a>
                                </div>
                            </div>
                            <div class="nav-item">
                                <span class="nav-item-trigger" tabindex="0">Solutions</span>
                                <div class="mega-menu">
                                    <a href="/applications.html">Timber Flooring</a>
                                    <a href="/applications.html">Herringbone & Chevron</a>
                                    <a href="/applications.html">Moisture Barrier</a>
                                    <a href="/applications.html">Acoustic Flooring</a>
                                    <a href="/applications.html">Underfloor Heating</a>
                                    <a href="/applications.html">Commercial Projects</a>
                                </div>
                            </div>
                            <a href="/installation.html">Video</a>
                            <a href="/blog.html">Blog</a>
                            <a href="/contact.html">Distributor</a>
                        </nav>
                    </div>
                    <div class="header-tools">
                        <button class="language-trigger" type="button">English</button>
                        <a class="search-trigger" href="/contact.html#inquiry" aria-label="Search or inquiry">Search</a>
                        <a class="btn btn-primary header-quote" href="/contact.html#inquiry">Contact Us</a>
                        <button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav">
                            <span></span><span></span>
                        </button>
                    </div>
                </div>
            `;
            return;
        }

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
                    <h3>Product Categories</h3>
                    <a href="/product.html">Setto Supreme S75</a>
                    <a href="/product.html#quick-facts">10 L / 15 kg Pail</a>
                    <a href="/product.html#quick-facts">590 ml Sausage</a>
                    <a href="${content.documents.tds}">Technical Data Sheet</a>
                </div>
                <div>
                    <h3>Stay In Touch</h3>
                    <a href="tel:${brand.phone?.replace(/[^0-9]/g, "")}">${brand.phone}</a>
                    <a href="mailto:${brand.email}">${brand.email}</a>
                    <p>Manufacturer / Importer: ${brand.manufacturer}</p>
                    <p>${brand.location}</p>
                </div>
            </div>
            <div class="footer-bottom">&copy; Setto Australia. All rights reserved.</div>
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
    const menuToggles = [menuToggle, ...document.querySelectorAll("[data-mobile-menu-toggle]")].filter(Boolean);
    const nav = document.getElementById("siteNav");
    const navItems = document.querySelectorAll(".nav-item");

    const closeMenu = () => {
        nav?.classList.remove("open");
        menuToggles.forEach(toggle => {
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
        });
        navItems.forEach(item => item.classList.remove("open"));
    };

    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 12);
    });

    menuToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
        const isOpen = !nav?.classList.contains("open");
        nav?.classList.toggle("open", isOpen);
        menuToggles.forEach(item => {
            item.classList.toggle("active", isOpen);
            item.setAttribute("aria-expanded", String(isOpen));
        });
        });
    });

    nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    navItems.forEach(item => {
        item.querySelector(".nav-item-trigger")?.addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });
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

function initHeroSlider() {
    const slider = document.querySelector("[data-hero-slider]");
    if (!slider) return;

    const slides = [...slider.querySelectorAll("[data-slide]")];
    const dots = [...slider.querySelectorAll(".hero-progress span")];
    let current = 0;
    let timer;

    const show = index => {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === current));
        dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === current));
    };

    const restart = () => {
        window.clearInterval(timer);
        timer = window.setInterval(() => show(current + 1), 5200);
    };

    slider.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
        show(current - 1);
        restart();
    });
    slider.querySelector("[data-hero-next]")?.addEventListener("click", () => {
        show(current + 1);
        restart();
    });
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            show(index);
            restart();
        });
    });
    slider.addEventListener("mouseenter", () => window.clearInterval(timer));
    slider.addEventListener("mouseleave", restart);
    restart();
}

function initCertificateSlider() {
    document.querySelectorAll("[data-cert-slider]").forEach(slider => {
        const track = slider.querySelector(".certificate-track");
        const scrollByCard = direction => {
            const card = track?.querySelector(".certificate-card");
            const amount = card ? card.getBoundingClientRect().width + 56 : 260;
            track?.scrollBy({ left: amount * direction, behavior: "smooth" });
        };

        slider.querySelector("[data-cert-prev]")?.addEventListener("click", () => scrollByCard(-1));
        slider.querySelector("[data-cert-next]")?.addEventListener("click", () => scrollByCard(1));
    });
}

function initReplicaModals() {
    const openModal = name => {
        const modal = document.querySelector(`[data-modal="${name}"]`);
        if (!modal) return;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
        modal.querySelector(".modal-close")?.focus();
    };

    const closeModal = modal => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
    };

    document.querySelectorAll("[data-open-modal]").forEach(trigger => {
        trigger.addEventListener("click", event => {
            event.preventDefault();
            openModal(trigger.dataset.openModal);
        });
    });

    document.querySelectorAll(".replica-modal").forEach(modal => {
        modal.querySelector("[data-close-modal]")?.addEventListener("click", () => closeModal(modal));
        modal.addEventListener("click", event => {
            if (event.target === modal) closeModal(modal);
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelectorAll(".replica-modal.open").forEach(closeModal);
        }
    });
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
    initHeroSlider();
    initCertificateSlider();
    initReplicaModals();
    initReveal();
});
