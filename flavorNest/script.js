// Navbar JavaScript Functionality
class ModernNavbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.isMenuOpen = false;
        this.scrollThreshold = 20;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.animateNavLinksOnLoad();
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Scroll effects
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenu.classList.add('open');
        this.isMenuOpen = true;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Animate mobile nav links with stagger effect
        this.mobileNavLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 100}ms`;
            link.style.animation = 'fade-in 0.5s ease-out forwards';
        });

        // Update aria attributes for accessibility
        this.menuToggle.setAttribute('aria-expanded', 'true');
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('open');
        this.isMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Update aria attributes for accessibility
        this.menuToggle.setAttribute('aria-expanded', 'false');
    }

    handleScroll() {
        const scrolled = window.scrollY > this.scrollThreshold;
        
        if (scrolled) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Add parallax effect to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const scrollY = window.scrollY;
            const rate = scrollY * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for navigation links
        const allNavLinks = [...this.navLinks, ...this.mobileNavLinks];
        
        allNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });

                        // Update active link
                        this.updateActiveLink(link);
                    }
                }
            });
        });
    }

    updateActiveLink(activeLink) {
        // Remove active class from all links
        const allNavLinks = [...this.navLinks, ...this.mobileNavLinks];
        allNavLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        activeLink.classList.add('active');
        
        // Find corresponding link in the other menu and activate it too
        const href = activeLink.getAttribute('href');
        const correspondingLink = document.querySelector(
            `${activeLink.classList.contains('nav-link') ? '.mobile-nav-link' : '.nav-link'}[href="${href}"]`
        );
        
        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }
    }

    animateNavLinksOnLoad() {
        // Animate desktop nav links on page load
        this.navLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 100}ms`;
        });
    }

    handleKeydown(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }
}

// Enhanced scroll spy functionality
class ScrollSpy {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveSection());
        // Initial check
        this.updateActiveSection();
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY + 120; // Offset for navbar

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                this.navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding links
                const activeLinks = document.querySelectorAll(`[href="#${sectionId}"]`);
                activeLinks.forEach(link => link.classList.add('active'));
            }
        });
    }
}

// Intersection Observer for scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );

            // Observe sections for scroll animations
            const sectionsToAnimate = document.querySelectorAll('.content-section');
            sectionsToAnimate.forEach(section => this.observer.observe(section));
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in 0.8s ease-out forwards';
            }
        });
    }
}

// Enhanced button interactions
class ButtonEnhancements {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.cta-button, .mobile-cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.handleButtonClick(e));
            button.addEventListener('mouseenter', (e) => this.addHoverEffect(e));
            button.addEventListener('mouseleave', (e) => this.removeHoverEffect(e));
        });
    }

    handleButtonClick(e) {
        const button = e.target;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Handle booking action (placeholder)
        console.log('Book Table clicked - would open booking modal/page');
    }

    addHoverEffect(e) {
        const button = e.target;
        button.style.transform = 'scale(1.05) translateY(-2px)';
    }

    removeHoverEffect(e) {
        const button = e.target;
        button.style.transform = 'scale(1) translateY(0)';
    }
}

// Performance optimized scroll handler
class PerformanceOptimizations {
    constructor() {
        this.ticking = false;
        this.init();
    }

    init() {
        // Throttled scroll handler for performance
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleOptimizedScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    handleOptimizedScroll() {
        // Add any additional scroll-based animations here
        this.updateParallaxEffects();
    }

    updateParallaxEffects() {
        const scrolled = window.pageYOffset;
        const heroTitle = document.querySelector('.hero-title');
        
        if (heroTitle) {
            const rate = scrolled * -0.3;
            heroTitle.style.transform = `translateY(${rate}px)`;
        }
    }
}

// Add CSS for ripple animation
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernNavbar();
    new ScrollSpy();
    new ScrollAnimations();
    new ButtonEnhancements();
    new PerformanceOptimizations();
    
    console.log('🍽️ Flavor Nest - Modern navbar initialized successfully!');
});

// Handle prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
}
