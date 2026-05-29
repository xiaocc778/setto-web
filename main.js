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
                            <span>Melbourne Stock Available | Apply for Trade Account & Get Free Installer Samples</span>
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
                            <div class="nav-item">
                                <span class="nav-item-trigger" tabindex="0">Products</span>
                                <div class="mega-menu">
                                    <a href="/product.html">Setto Supreme S75</a>
                                    <a href="/product.html#quick-facts">10 L / 15 kg Pail</a>
                                    <a href="/product.html#quick-facts">590 ml Sausage</a>
                                    <a href="/installation.html#technical-data">Technical Data Sheet</a>
                                </div>
                            </div>
                            <a href="/systems.html">Systems</a>
                            <a href="/trade.html">Trade</a>
                            <div class="nav-item">
                                <span class="nav-item-trigger" tabindex="0">Resources</span>
                                <div class="mega-menu">
                                    <a href="/blog.html">Technical Resource Center</a>
                                    <a href="/blog.html#installation-guide">Installation Guide</a>
                                    <a href="/blog.html#technical-standards">Technical Standards</a>
                                    <a href="/blog.html#video-library">Video Library</a>
                                    <a href="/blog.html#downloads">Downloads</a>
                                    <a href="/blog.html#faqs">FAQs</a>
                                </div>
                            </div>
                            <a href="/contact.html">Contact</a>
                        </nav>
                    </div>
                    <div class="header-tools">
                        <button class="language-trigger" type="button">English</button>
                        <a class="search-trigger" href="/contact.html#inquiry" aria-label="Search or inquiry">Search</a>
                        <a class="btn btn-primary header-quote" href="/contact.html#inquiry">Request Quote</a>
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
                    <a class="btn btn-primary header-quote" href="/contact.html#inquiry">Request Quote</a>
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
        const supportLinks = content.footerLinks?.support || [
            { label: "Privacy Policy", href: "/privacy-policy.html" },
            { label: "Shipping Policy", href: "/shipping-policy.html" },
            { label: "Terms of Service", href: "/terms-of-service.html" },
            { label: "Refund Policy", href: "/refund-policy.html" },
            { label: "Contact Us", href: "/contact.html#inquiry" }
        ];
        const businessHours = brand.businessHours || "Monday to Friday, 9:00 am - 5:00 pm AEST";
        footer.innerHTML = `
            <div class="container footer-grid">
                <div class="footer-brand">
                    <img src="${brand.logo}" alt="Setto logo" width="138" height="58">
                    <p>${brand.tagline}</p>
                    <p>Trade, distributor and project supply enquiries welcome.</p>
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
                    <h3>Support</h3>
                    ${supportLinks.map(item => `<a href="${item.href}">${item.label}</a>`).join("")}
                </div>
                <div>
                    <h3>Stay In Touch</h3>
                    <a href="tel:${brand.phone?.replace(/[^0-9]/g, "")}">${brand.phone}</a>
                    <a href="mailto:${brand.email}">${brand.email}</a>
                    <p>Business Hours: ${businessHours}</p>
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

function initAdhesiveCalculator() {
    const KG_PER_PAIL = 15;
    const KG_PER_SAUSAGE = 0.944;
    const LOW_RATE = 1.1;
    const RECOMMENDED_RATE = 1.2;
    const PROJECT_NOTES = {
        "Solid Timber Flooring": "Solid timber projects often require close attention to subfloor flatness, adhesive transfer and board movement allowance.",
        "Engineered Timber Flooring": "Engineered timber estimates should be checked against board width, substrate condition and site moisture readings.",
        "Parquet / Patterned Flooring": "Patterned layouts can involve extra handling time and cut waste, so a procurement allowance is often useful.",
        "Bamboo / Cork Flooring": "Bamboo and cork systems should be checked for product compatibility, substrate condition and installer method before ordering."
    };

    const formatKg = value => {
        const rounded = Math.round(value * 10) / 10;
        return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    };

    document.querySelectorAll("[data-adhesive-calculator]").forEach(calculator => {
        const areaInput = calculator.querySelector("[data-calc-area]");
        const flooringSelect = calculator.querySelector("[data-calc-flooring]");
        const kgOutput = calculator.querySelector("[data-calc-kg]");
        const rangeOutput = calculator.querySelector("[data-calc-range]");
        const pailsOutput = calculator.querySelector("[data-calc-pails]");
        const sausagesOutput = calculator.querySelector("[data-calc-sausages]");
        const mixedOutput = calculator.querySelector("[data-calc-mixed]");
        const mixedNote = calculator.querySelector("[data-calc-mixed-note]");
        const projectNote = calculator.querySelector("[data-calc-note]");
        const allowanceButtons = calculator.querySelectorAll("[data-calc-allowance]");
        const quoteLink = calculator.querySelector("[data-calc-quote]");
        let allowancePercent = 0;

        const getMixedPack = recommendedKg => {
            const pails = Math.floor(recommendedKg / KG_PER_PAIL);
            const remainingKg = recommendedKg - (pails * KG_PER_PAIL);
            const sausages = remainingKg > 0.01 ? Math.ceil(remainingKg / KG_PER_SAUSAGE) : 0;

            if (pails === 0) {
                return { label: `${Math.ceil(recommendedKg / KG_PER_SAUSAGE)} sausages`, pails: 0, sausages: Math.ceil(recommendedKg / KG_PER_SAUSAGE) };
            }

            if (sausages === 0) {
                return { label: `${pails} ${pails === 1 ? "pail" : "pails"}`, pails, sausages };
            }

            return {
                label: `${pails} ${pails === 1 ? "pail" : "pails"} + ${sausages} ${sausages === 1 ? "sausage" : "sausages"}`,
                pails,
                sausages
            };
        };

        const reset = () => {
            if (kgOutput) kgOutput.textContent = "Enter area to estimate";
            if (rangeOutput) rangeOutput.textContent = "Based on 1.1-1.2 kg/m²";
            if (pailsOutput) pailsOutput.textContent = "-";
            if (sausagesOutput) sausagesOutput.textContent = "-";
            if (mixedOutput) mixedOutput.textContent = "-";
            if (mixedNote) mixedNote.textContent = "Optimised for practical ordering";
            if (projectNote) projectNote.textContent = PROJECT_NOTES[flooringSelect?.value] || "Select flooring type and area to generate a project estimate.";
            if (quoteLink) quoteLink.href = "/contact.html#inquiry";
        };

        const update = () => {
            const area = Number.parseFloat(areaInput?.value || "");
            const flooring = flooringSelect?.value || "Timber Flooring";

            if (!Number.isFinite(area) || area <= 0) {
                reset();
                return;
            }

            const allowanceMultiplier = 1 + (allowancePercent / 100);
            const lowKg = area * LOW_RATE;
            const highKg = area * RECOMMENDED_RATE;
            const recommendedKg = highKg * allowanceMultiplier;
            const pailCount = Math.ceil(recommendedKg / KG_PER_PAIL);
            const sausageCount = Math.ceil(recommendedKg / KG_PER_SAUSAGE);
            const mixedPack = getMixedPack(recommendedKg);

            if (kgOutput) kgOutput.textContent = `${formatKg(recommendedKg)} kg`;
            if (rangeOutput) {
                const allowanceText = allowancePercent ? ` + ${allowancePercent}% allowance` : "";
                rangeOutput.textContent = `${formatKg(lowKg)}-${formatKg(highKg)} kg base range${allowanceText}`;
            }
            if (pailsOutput) pailsOutput.textContent = `${pailCount} ${pailCount === 1 ? "pail" : "pails"}`;
            if (sausagesOutput) sausagesOutput.textContent = `${sausageCount} ${sausageCount === 1 ? "sausage" : "sausages"}`;
            if (mixedOutput) mixedOutput.textContent = mixedPack.label;
            if (mixedNote) mixedNote.textContent = "Uses pails for bulk volume and sausages for remainder.";
            if (projectNote) projectNote.textContent = PROJECT_NOTES[flooring] || "Estimate prepared for professional timber flooring installation.";

            if (quoteLink) {
                const params = new URLSearchParams({
                    area: String(area),
                    flooring,
                    allowance: `${allowancePercent}%`,
                    recommendedKg: formatKg(recommendedKg),
                    pails: String(pailCount),
                    sausages: String(sausageCount),
                    mixedPails: String(mixedPack.pails),
                    mixedSausages: String(mixedPack.sausages)
                });
                quoteLink.href = `/contact.html?${params.toString()}#inquiry`;
            }
        };

        areaInput?.addEventListener("input", update);
        flooringSelect?.addEventListener("change", update);
        allowanceButtons.forEach(button => {
            button.addEventListener("click", () => {
                allowanceButtons.forEach(item => item.classList.remove("active"));
                button.classList.add("active");
                allowancePercent = Number.parseFloat(button.dataset.calcAllowance || "0") || 0;
                update();
            });
        });
        reset();
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
    initAdhesiveCalculator();
    initReveal();
});
