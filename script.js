// ===============================================
// SMOOTH SCROLLING FUNCTIONALITY
// ===============================================

/**
 * Smoothly scroll to a specific section on the page
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===============================================
// NAVIGATION ACTIVE STATE
// ===============================================

/**
 * Update navigation link active state based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===============================================
// NAVBAR SCROLL EFFECT
// ===============================================

/**
 * Add/remove scrolled class to navbar based on scroll position
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===============================================
// NAVIGATION LINK SMOOTH SCROLLING
// ===============================================

/**
 * Add smooth scrolling to all navigation links
 */
function initNavLinkScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// ===============================================
// SCROLL REVEAL ANIMATIONS
// ===============================================

/**
 * Reveal elements when they come into view
 */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('is-visible');
        }
    });
}

/**
 * Initialize scroll reveal styles
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.project-card, .skill-category, .highlight-item');

    reveals.forEach(element => {
        element.classList.add('reveal');
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        reveals.forEach(element => observer.observe(element));
        return;
    }

    reveals.forEach(element => {
        element.classList.add('is-visible');
    });
}

// ===============================================
// PROJECT CARD INTERACTIONS
// ===============================================

/**
 * Add interactivity to project cards
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}

// ===============================================
// TYPING EFFECT FOR HERO SUBTITLE
// ===============================================

/**
 * Create a typing effect for the hero subtitle
 */
function typeEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// ===============================================
// SCROLL TO TOP FUNCTIONALITY
// ===============================================

/**
 * Create and handle scroll to top button
 */
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 6px 25px rgba(139, 92, 246, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = '';
        scrollBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
    });
}

// ===============================================
// PARTICLE BACKGROUND EFFECT
// ===============================================

/**
 * Create animated particles in the hero background
 */
function createParticles() {
    if (document.querySelector('.blue-dots-bg')) return;

    const dotsLayer = document.createElement('div');
    dotsLayer.className = 'blue-dots-bg';

    const dotCount = 40;

    for (let index = 0; index < dotCount; index++) {
        const dot = document.createElement('span');
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 8 + Math.random() * 8;
        const delay = Math.random() * -duration;
        const drift = `${Math.random() * 160 - 80}px`;

        dot.className = 'blue-dot';
        dot.style.setProperty('--dot-size', `${size}px`);
        dot.style.setProperty('--dot-left', `${left}%`);
        dot.style.setProperty('--dot-top', `${top}%`);
        dot.style.setProperty('--dot-duration', `${duration}s`);
        dot.style.setProperty('--dot-delay', `${delay}s`);
        dot.style.setProperty('--dot-drift', drift);

        dotsLayer.appendChild(dot);
    }

    document.body.insertBefore(dotsLayer, document.body.firstChild);
}

// ===============================================
// INITIALIZE ALL FEATURES ON PAGE LOAD
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavLinkScrolling();
    initMobileMenu();
    
    // Initialize scroll effects
    initScrollReveal();
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialize project cards
    initProjectCards();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Create particle effect
    createParticles();
    
    // Optional: Enable typing effect (uncomment to use)
    // typeEffect();
    
    // Initial calls
    updateActiveNavLink();
    handleNavbarScroll();
    revealOnScroll();
    
    console.log('Portfolio website loaded successfully!');
});

// ===============================================
// RESPONSIVE MENU TOGGLE (FOR MOBILE)
// ===============================================

/**
 * Toggle mobile menu on smaller screens
 */
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create hamburger button for mobile
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    // Add media query for mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMobile(e) {
        if (e.matches) {
            hamburger.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            hamburger.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
    
    hamburger.addEventListener('click', () => {
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(10, 10, 10, 0.98)';
            navMenu.style.padding = '1rem';
        } else {
            navMenu.style.display = 'none';
        }
    });
    
    document.querySelector('.nav-container').appendChild(hamburger);
    mediaQuery.addListener(handleMobile);
    handleMobile(mediaQuery);
}


