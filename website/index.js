// initialization
const RESPONSIVE_WIDTH = 1024;

// let headerWhiteBg = false; // This variable is declared but not used. Consider removing if not needed.

// --- Query selectors that might not be on every page ---
const collapseBtn = document.getElementById("collapse-btn");
const collapseHeaderItems = document.getElementById("collapsed-header-items");
const navToggle = document.querySelector("#nav-dropdown-toggle-0");
const navDropdown = document.querySelector("#nav-dropdown-list-0");
const themeToggleButton = document.getElementById("theme-toggle"); // The button itself

// Initialize isHeaderCollapsed based on current width
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
// --- End query selectors ---


function onHeaderClickOutside(e) {
    if (collapseHeaderItems && !collapseHeaderItems.contains(e.target) &&
        collapseBtn && !collapseBtn.contains(e.target)) {
        // Only toggle if the header is currently expanded (not collapsed)
        if (!isHeaderCollapsed) {
            toggleHeader();
        }
    }
}

function toggleHeader() {
    if (!collapseHeaderItems || !collapseBtn) return;

    if (isHeaderCollapsed) { // If it's collapsed, we want to open it
        collapseHeaderItems.classList.add("max-lg:!tw-opacity-100", "tw-min-h-[90vh]");
        collapseHeaderItems.style.height = "90vh"; // Explicitly set height for visibility
        collapseBtn.classList.remove("bi-list");
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
        document.body.classList.add("modal-open");
        isHeaderCollapsed = false;
        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1); // Add listener after opening
    } else { // If it's open, we want to collapse it
        collapseHeaderItems.classList.remove("max-lg:!tw-opacity-100", "tw-min-h-[90vh]");
        collapseHeaderItems.style.height = "0vh"; // Collapse it
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
        collapseBtn.classList.add("bi-list");
        document.body.classList.remove("modal-open");
        isHeaderCollapsed = true;
        window.removeEventListener("click", onHeaderClickOutside); // Remove listener after closing
    }
}

function responsive() {
    const currentWidthIsMobile = window.innerWidth < RESPONSIVE_WIDTH;

    if (navToggle) {
        if (!currentWidthIsMobile) { // Desktop
            collapseHeaderItems.style.height = ""; // Reset height for desktop view
            navToggle.addEventListener("mouseenter", openNavDropdown);
            navToggle.addEventListener("mouseleave", navMouseLeave);
            // If header was collapsed on mobile, ensure it's reset for desktop
            if (isHeaderCollapsed && collapseBtn && collapseHeaderItems) {
                 // Potentially ensure header is in its default desktop state
                 // This might involve removing mobile-specific classes if they interfere
            }
        } else { // Mobile
            navToggle.removeEventListener("mouseenter", openNavDropdown);
            navToggle.removeEventListener("mouseleave", navMouseLeave);
        }
    }
    // Update isHeaderCollapsed based on current width, only if it's actually mobile
    // This ensures that if the user opens the menu on desktop, resizing to mobile keeps it conceptually "collapsible"
    isHeaderCollapsed = currentWidthIsMobile;
    if (currentWidthIsMobile && collapseHeaderItems && collapseHeaderItems.classList.contains("max-lg:!tw-opacity-100")) {
        // If we resized to mobile and the menu was open, keep its visual state but ensure isHeaderCollapsed is true
        // This part is tricky, usually CSS handles initial visibility for mobile.
        // The toggleHeader function primarily manages the *explicit* open/close action.
    } else if (!currentWidthIsMobile && collapseHeaderItems) {
        // If resized to desktop, ensure mobile specific styles that hide content are removed if needed
        // For instance, ensure height is not '0vh' if the JS was manipulating it
        collapseHeaderItems.style.height = ""; // Allow CSS to take over for desktop
    }
}

// Initial setup for header based on screen size
if (collapseBtn) { // Only add listener if the collapse button exists (likely on index.html)
    collapseBtn.addEventListener('click', toggleHeader);
}
responsive(); // Call on load
window.addEventListener("resize", responsive);


/** Dark and light theme */
function updateToggleModeBtn() {
    const toggleIconElement = themeToggleButton ? themeToggleButton.querySelector("#toggle-mode-icon") : null;
    if (!toggleIconElement) {
        return;
    }

    if (document.documentElement.classList.contains("tw-dark")) {
        toggleIconElement.classList.remove("bi-sun");
        toggleIconElement.classList.add("bi-moon");
        localStorage.setItem("color-mode", "dark");
    } else {
        toggleIconElement.classList.add("bi-sun");
        toggleIconElement.classList.remove("bi-moon");
        localStorage.setItem("color-mode", "light");
    }
}

// Initial theme setup - Default to LIGHT mode
if (localStorage.getItem('color-mode') === 'dark') { // Only go dark if explicitly set in localStorage
    document.documentElement.classList.add('tw-dark');
} else if (localStorage.getItem('color-mode') === 'light') {
    document.documentElement.classList.remove('tw-dark');
} else { // No localStorage setting, default to light (could also check OS preference here if desired)
    document.documentElement.classList.remove('tw-dark'); // Explicitly set light
    // If you want to respect OS preference when no localStorage is set:
    // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //    document.documentElement.classList.add('tw-dark');
    // } else {
    //    document.documentElement.classList.remove('tw-dark');
    // }
}
updateToggleModeBtn(); // Update icon based on initial theme

function toggleMode() {
    document.documentElement.classList.toggle("tw-dark");
    updateToggleModeBtn();
}

// if (themeToggleButton) {
//     themeToggleButton.addEventListener('click', toggleMode);
// }

// --- Nav Dropdown Logic (if #nav-dropdown-toggle-0 and #nav-dropdown-list-0 exist) ---
if (navToggle && navDropdown) {
    navToggle.addEventListener("click", toggleNavDropdown);
    navDropdown.addEventListener("mouseleave", closeNavDropdown);
}

function toggleNavDropdown() {
    if (!navDropdown) return;
    if (navDropdown.getAttribute("data-open") === "true") {
        closeNavDropdown();
    } else {
        openNavDropdown();
    }
}

function navMouseLeave() {
    if (!navDropdown) return;
    setTimeout(closeNavDropdown, 100);
}

function openNavDropdown() {
    if (!navDropdown) return;
    navDropdown.classList.add("tw-opacity-100", "tw-scale-100", "max-lg:tw-min-h-[450px]", "max-lg:!tw-h-fit", "tw-min-w-[320px]");
    navDropdown.setAttribute("data-open", true);
}

function closeNavDropdown() {
    if (!navDropdown || (navDropdown && navDropdown.matches(":hover"))) return;
    navDropdown.classList.remove("tw-opacity-100", "tw-scale-100", "max-lg:tw-min-h-[450px]", "tw-min-w-[320px]", "max-lg:!tw-h-fit");
    navDropdown.setAttribute("data-open", false);
}
// --- End Nav Dropdown Logic ---

// --- Prompt Playground, Video Modal, Animations (GSAP, Typed.js), etc. ---
// (Wrap each of these sections in checks for their primary HTML elements and necessary libraries)

const promptPlaygroundElement = document.querySelector("#pixa-playground");
let promptWindowInstance;

if (promptPlaygroundElement && typeof Prompt !== 'undefined') {
    promptWindowInstance = new Prompt("#pixa-playground");
    const currentPromptForm = document.querySelector("#prompt-form");
    if (currentPromptForm) {
        const promptInput = currentPromptForm.querySelector("input[name='prompt']");
        const MAX_PROMPTS = 3;
        currentPromptForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!promptWindowInstance) return;
            if (promptWindowInstance.promptList.length >= MAX_PROMPTS) return false;
            if (promptInput) {
                promptWindowInstance.addPrompt(promptInput.value);
                promptInput.value = "";
            }
            if (promptWindowInstance.promptList.length >= MAX_PROMPTS) {
                const signUpPrompt = document.querySelector("#signup-prompt");
                if (signUpPrompt) {
                    signUpPrompt.classList.add("tw-scale-100");
                    signUpPrompt.classList.remove("tw-scale-0");
                }
                currentPromptForm.querySelectorAll("input").forEach(e => { e.disabled = true });
            }
            return false;
        });
    }

    const dropdownElements = document.querySelectorAll('.dropdown');
    if (dropdownElements.length > 0 && typeof Dropdown !== 'undefined' && promptWindowInstance && typeof promptWindowInstance.setAIModel === 'function') {
        dropdownElements.forEach(dropdown => {
            if (document.querySelector(`#${dropdown.id}`)) {
                 new Dropdown(`#${dropdown.id}`, promptWindowInstance.setAIModel);
            }
        });
    }
}

const currentVideoBg = document.querySelector("#video-container-bg");
const currentVideoContainer = document.querySelector("#video-container");

function openVideo() { /* ... (add null checks if needed) ... */ }
function closeVideo() { /* ... (add null checks if needed) ... */ }
// Add event listeners for openVideo/closeVideo if triggers exist on the page

const currentTypedElement = document.querySelector('#prompts-sample');
if (currentTypedElement && typeof Typed !== 'undefined') {
    const typed = new Typed('#prompts-sample', {
        strings: ["How to solve a rubik's cube? Step by step guide", "What's Pixa playground?", "How to build an AI SaaS App?", "How to integrate Pixa API?"],
        typeSpeed: 80, smartBackspace: true, loop: true, backDelay: 2000,
    });
}

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.to(".reveal-up", { opacity: 0, y: "100%" });

    const currentDashboardElement = document.querySelector("#dashboard");
    const heroSectionElementForDashboard = document.querySelector("#hero-section");
    if (currentDashboardElement && heroSectionElementForDashboard) {
        gsap.to("#dashboard", {
            scale: 1, translateY: 0, rotateX: "0deg",
            scrollTrigger: {
                trigger: "#hero-section",
                start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
                end: "bottom bottom", scrub: 1,
            }
        });
    }

    const currentFaqAccordionElements = document.querySelectorAll('.faq-accordion');
    if (currentFaqAccordionElements.length > 0) {
        currentFaqAccordionElements.forEach(function(btn) {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                let content = this.nextElementSibling;
                let icon = this.querySelector(".bi-plus");
                if (content && icon) {
                    if (content.style.maxHeight === '240px') {
                        content.style.maxHeight = '0px'; content.style.padding = '0px 18px'; icon.style.transform = "rotate(0deg)";
                    } else {
                        content.style.maxHeight = '240px'; content.style.padding = '20px 18px'; icon.style.transform = "rotate(45deg)";
                    }
                }
            });
        });
    }

    const sections = gsap.utils.toArray("section");
    if (sections.length > 0) {
        sections.forEach((sec) => {
            const revealUptimeline = gsap.timeline({
                paused: true,
                scrollTrigger: { trigger: sec, start: "10% 80%", end: "20% 90%" }
            });
            const revealUpElements = sec.querySelectorAll(".reveal-up:not(.tw-absolute .reveal-up)");
            if (revealUpElements.length > 0) {
                revealUptimeline.to(revealUpElements, { opacity: 1, duration: 0.8, y: "0%", stagger: 0.2 });
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const headerElement = document.querySelector('header');
        if (headerElement) {
            const headerHeight = headerElement.offsetHeight;
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            if (anchorLinks.length > 0) {
                anchorLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = targetPosition - headerHeight - 10;
                            gsap.to(window, { duration: 1, scrollTo: offsetPosition, ease: 'power2.out' });
                        }
                    });
                });
            }
        }
    });
} else {
    console.warn("GSAP or its plugins not fully loaded. Animations and scroll behaviors might be affected.");
}

const currentDiscoverMoreSection = document.querySelector('.discover-more-section');
if (currentDiscoverMoreSection) {
    // let lastScrollTop = 0; // Not used
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            currentDiscoverMoreSection.style.opacity = '0';
        } else {
            const opacity = 1 - (scrollTop / 100);
            currentDiscoverMoreSection.style.opacity = opacity.toString();
        }
        // lastScrollTop = scrollTop;
    });
}