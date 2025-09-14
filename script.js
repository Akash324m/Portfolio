// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Animate hamburger menu
    const icon = mobileMenuButton.querySelector('svg');
    icon.classList.toggle('rotate-90');
});

// Close mobile menu when clicking on links
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for multiple elements
            if (entry.target.classList.contains('stagger')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Typewriter Effect Enhancement
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typewriterElement = entry.target.querySelector('.typewriter h2');
            if (typewriterElement && !typewriterElement.classList.contains('typed')) {
                typewriterElement.classList.add('typed');
                setTimeout(() => {
                    typeWriter(typewriterElement, 'Data Scientist & AI Engineer', 80);
                }, 1000);
            }
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('home');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.stars, .twinkling');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('stars') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form Submission Handler
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.classList.add('bg-green-500', 'hover:bg-green-600');
            submitButton.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600');
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('bg-green-500', 'hover:bg-green-600');
                submitButton.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600');
            }, 3000);
        }, 2000);
    });
}

// Skill Tags Animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    
    // Add hover sound effect (optional)
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Cards Tilt Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 35;
        const rotateY = (centerX - x) / 35;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Achievement Cards Counter Animation
const achievementCards = document.querySelectorAll('.achievement-card');
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            card.style.animationDelay = `${Array.from(achievementCards).indexOf(card) * 0.2}s`;
            card.classList.add('animate-fade-in-up');
        }
    });
}, { threshold: 0.3 });

achievementCards.forEach(card => {
    achievementObserver.observe(card);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading screens
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
});

// Performance Optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-dependent animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loaded {
        overflow-x: hidden;
    }
`;
document.head.appendChild(style);