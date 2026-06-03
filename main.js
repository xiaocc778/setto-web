const content = window.SETTO_CONTENT || {};

const imagePath = key => content.images?.[key] || "/assets/placeholders/missing-image.webp";
const socialIcon = name => {
    const icons = {
        facebook: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 8.2V6.8c0-.7.2-1.1 1.2-1.1h1.5V3.1c-.7-.1-1.4-.1-2.1-.1-2.2 0-3.8 1.4-3.8 3.9v1.3H8.3V11h2.5v10h3.1V11h2.5l.4-2.8H14Z"/></svg>`,
        instagram: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9Zm4.5 3.4A3.6 3.6 0 1 1 8.4 12 3.6 3.6 0 0 1 12 8.4Zm0 2A1.6 1.6 0 1 0 13.6 12 1.6 1.6 0 0 0 12 10.4Zm4.2-2.9a1 1 0 1 1 1 1 1 1 0 0 1-1-1Z"/></svg>`,
        youtube: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21.6 7.1a3 3 0 0 0-2.1-2.1C17.6 4.5 12 4.5 12 4.5s-5.6 0-7.5.5a3 3 0 0 0-2.1 2.1A31.6 31.6 0 0 0 2 12a31.6 31.6 0 0 0 .4 4.9 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 22 12a31.6 31.6 0 0 0-.4-4.9ZM10 15.4V8.6l5.8 3.4L10 15.4Z"/></svg>`,
        linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5.4 8.8h3.1V21H5.4V8.8ZM7 3a1.8 1.8 0 1 1 0 3.6A1.8 1.8 0 0 1 7 3Zm4 5.8h3v1.7h.1a3.3 3.3 0 0 1 3-1.9c3.2 0 3.8 2.1 3.8 4.8V21h-3.1v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V21H11V8.8Z"/></svg>`
    };
    return icons[name] || "";
};

const socialLink = name => content.socialLinks?.[name] || "#";

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
                            <a href="${socialLink("facebook")}" aria-label="Facebook">${socialIcon("facebook")}</a>
                            <a href="${socialLink("instagram")}" aria-label="Instagram">${socialIcon("instagram")}</a>
                            <a href="${socialLink("youtube")}" aria-label="YouTube">${socialIcon("youtube")}</a>
                            <a href="${socialLink("linkedin")}" aria-label="LinkedIn">${socialIcon("linkedin")}</a>
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
                                    <a href="/product.html#quick-facts">10L / Pail</a>
                                    <a href="/product.html#quick-facts">600 ml Foil Sausage Pack</a>
                                    <a href="/installation.html#technical-data">Technical Data Sheet</a>
                                </div>
                            </div>
                            <div class="nav-item">
                                <span class="nav-item-trigger" tabindex="0">Technical Documentation</span>
                                <div class="mega-menu">
                                    <a href="/blog.html">Technical Resource Center</a>
                                    <a href="/installation.html">Installation Guide</a>
                                    <a href="/blog.html#video-library">Video Library</a>
                                    <a href="/blog.html#downloads">Downloads</a>
                                    <a href="/blog.html#faqs">FAQs</a>
                                </div>
                            </div>
                            <a href="/contact.html">Contact us</a>
                        </nav>
                    </div>
                    <div class="header-tools">
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
                    <img src="${brand.footerLogo || brand.logo}" alt="Setto logo" width="156" height="66">
                    <p>${brand.tagline}</p>
                    <p>Trade, distributor and project supply enquiries welcome.</p>
                    <a class="footer-email-link" href="mailto:${brand.email}">${brand.email}</a>
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
        const query = new URLSearchParams(window.location.search);
        const estimateFields = {
            area: "calculator_area_m2",
            trowel: "calculator_v_trowel_size",
            pails: "calculator_pails",
            coverage: "calculator_coverage_range"
        };

        const ensureHiddenField = (name, value) => {
            if (!value || form.elements[name]) return;
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            form.appendChild(input);
        };

        Object.entries(estimateFields).forEach(([param, fieldName]) => {
            ensureHiddenField(fieldName, query.get(param));
        });
        ensureHiddenField("page_url", window.location.href);

        const estimateSummary = [
            query.get("area") ? `Area: ${query.get("area")} m2` : "",
            query.get("trowel") ? `V Trowel: ${query.get("trowel")}` : "",
            query.get("coverage") ? `Coverage: ${query.get("coverage")}` : "",
            query.get("pails") ? `Pails: ${query.get("pails")}` : "",
        ].filter(Boolean).join(" | ");

        if (estimateSummary && form.elements.message && !form.elements.message.value) {
            form.elements.message.value = `Calculator estimate - ${estimateSummary}\n\n`;
        }

        if (query.get("sent") === "1" && toast) {
            toast.textContent = "Thanks. Your inquiry has been submitted.";
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 4200);
        }

        form.addEventListener("submit", event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                form.reportValidity();
                return;
            }
            const button = form.querySelector("button[type='submit']");
            const original = button.textContent;
            button.disabled = true;
            button.textContent = "Sending...";

            if (form.action && form.action !== window.location.href) {
                return;
            }

            event.preventDefault();
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

function initFloatingQrActions() {
    const qrTargets = [
        {
            key: "whatsapp",
            label: "WhatsApp",
            image: "/assets/images/whatsapp.jpg",
            alt: "SETTO WhatsApp QR code",
            icon: `
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 2.5a9.2 9.2 0 0 0-7.8 14.1L3 21.5l5-1.2A9.2 9.2 0 1 0 12 2.5Zm0 2a7.2 7.2 0 0 1 6.1 11 7.2 7.2 0 0 1-8.4 2.7l-.5-.2-3 .7.7-2.9-.3-.5A7.2 7.2 0 0 1 12 4.5Z"/>
                    <path d="M8.8 8.1c.2-.5.4-.5.7-.5h.6c.2 0 .5.1.6.4l.8 1.8c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.4.7 1 1.3 1.7 1.8.3.2.4.2.6 0l.8-.6c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.6-.1.6-.4 1.1-.8 1.4-.5.4-1.2.5-2.2.2-2-.6-4.6-2.8-5.5-5.1-.4-1-.3-1.8.1-2.4l.3-.2Z"/>
                </svg>`
        }
    ];

    document.querySelectorAll(".float-actions, .replica-float-actions").forEach(container => {
        container.className = "qr-float-widget";
        container.setAttribute("aria-label", "Scan to contact SETTO");
        container.innerHTML = `
            <div class="qr-popover" data-qr-popover hidden>
                <button class="qr-close" type="button" data-qr-close aria-label="Close QR code">x</button>
                <p data-qr-title>Scan to contact SETTO</p>
                <img data-qr-image alt="" width="220" height="220">
            </div>
            ${qrTargets.map(item => `
                <button class="qr-float-button ${item.key}" type="button" data-qr-trigger="${item.key}" aria-expanded="false" aria-label="Show SETTO ${item.label} QR code">
                    ${item.icon}
                    <span>${item.label}</span>
                </button>
            `).join("")}
        `;

        const popover = container.querySelector("[data-qr-popover]");
        const title = container.querySelector("[data-qr-title]");
        const image = container.querySelector("[data-qr-image]");
        const triggers = container.querySelectorAll("[data-qr-trigger]");
        const closeButton = container.querySelector("[data-qr-close]");

        const close = () => {
            popover.hidden = true;
            container.classList.remove("open");
            triggers.forEach(trigger => trigger.setAttribute("aria-expanded", "false"));
        };

        triggers.forEach(trigger => {
            trigger.addEventListener("click", event => {
                event.stopPropagation();
                const target = qrTargets.find(item => item.key === trigger.dataset.qrTrigger);
                if (!target) return;
                const isSameOpen = container.classList.contains("open") && image.getAttribute("src") === target.image;
                if (isSameOpen) {
                    close();
                    return;
                }
                title.textContent = `Scan ${target.label} QR code`;
                image.src = target.image;
                image.alt = target.alt;
                popover.hidden = false;
                container.classList.add("open");
                triggers.forEach(item => item.setAttribute("aria-expanded", String(item === trigger)));
            });
        });

        closeButton?.addEventListener("click", close);
        document.addEventListener("click", event => {
            if (!container.contains(event.target)) close();
        });
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") close();
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
    const TROWEL_COVERAGE = {
        "3 mm V-Notch": { low: 16, high: 18 },
        "4 mm V-Notch": { low: 12, high: 14 },
        "5 mm V-Notch": { low: 10, high: 12 },
        "6 mm V-Notch": { low: 8, high: 10 }
    };

    document.querySelectorAll("[data-adhesive-calculator]").forEach(calculator => {
        const areaInput = calculator.querySelector("[data-calc-area]");
        const trowelSelect = calculator.querySelector("[data-calc-trowel], [data-calc-flooring]");
        const kgOutput = calculator.querySelector("[data-calc-kg]");
        const rangeOutput = calculator.querySelector("[data-calc-range]");
        const pailsOutput = calculator.querySelector("[data-calc-pails]");
        const packOutput = calculator.querySelector("[data-calc-sausages]");
        const coverageOutput = calculator.querySelector("[data-calc-mixed]");
        const coverageNote = calculator.querySelector("[data-calc-mixed-note]");
        const projectNote = calculator.querySelector("[data-calc-note]");
        const quoteLink = calculator.querySelector("[data-calc-quote]");

        const reset = () => {
            if (kgOutput) kgOutput.textContent = "Enter area to estimate";
            if (rangeOutput) rangeOutput.textContent = "Coverage depends on selected V-notch trowel";
            if (pailsOutput) pailsOutput.textContent = "-";
            if (packOutput) packOutput.textContent = "600 ml Foil Sausage Pack";
            if (coverageOutput) coverageOutput.textContent = "-";
            if (coverageNote) coverageNote.textContent = "Coverage range selected by trowel size";
            if (projectNote) projectNote.textContent = "Recommend 5.5 mm V-notch trowel. Foil packs are available for detail work and controlled application, but are not included in the pail estimate.";
            if (quoteLink) quoteLink.href = "/contact.html#inquiry";
        };

        const update = () => {
            const area = Number.parseFloat(areaInput?.value || "");
            const trowel = trowelSelect?.value || "5 mm V-Notch";
            const coverage = TROWEL_COVERAGE[trowel] || TROWEL_COVERAGE["5 mm V-Notch"];

            if (!Number.isFinite(area) || area <= 0) {
                reset();
                return;
            }

            const minPails = Math.ceil(area / coverage.high);
            const recommendedPails = Math.ceil(area / coverage.low);
            const pailText = minPails === recommendedPails ? `${recommendedPails} pail${recommendedPails === 1 ? "" : "s"}` : `${minPails}-${recommendedPails} pails`;
            const coverageText = `${coverage.low}-${coverage.high} m2 per pail`;

            if (kgOutput) kgOutput.textContent = pailText;
            if (rangeOutput) rangeOutput.textContent = `${trowel}: ${coverageText}`;
            if (pailsOutput) pailsOutput.textContent = pailText;
            if (packOutput) packOutput.textContent = "Optional";
            if (coverageOutput) coverageOutput.textContent = coverageText;
            if (coverageNote) coverageNote.textContent = "Pail estimate is rounded up for procurement planning.";
            if (projectNote) projectNote.textContent = "Recommend 5.5 mm V-notch trowel. Final usage depends on substrate flatness, trowel angle and site method.";

            if (quoteLink) {
                const params = new URLSearchParams({
                    area: String(area),
                    trowel,
                    coverage: coverageText,
                    pails: pailText
                });
                quoteLink.href = `/contact.html?${params.toString()}#inquiry`;
            }
        };

        areaInput?.addEventListener("input", update);
        trowelSelect?.addEventListener("change", update);
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
    initFloatingQrActions();
    initHeroSlider();
    initCertificateSlider();
    initReplicaModals();
    initAdhesiveCalculator();
    initReveal();
});
