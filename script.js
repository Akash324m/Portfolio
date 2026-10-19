/**
 * Portfolio JavaScript - Akash Mishra | Python Developer
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close when a link inside mobile menu is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    // 2. Navbar Scroll Styling
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    // 3. Dynamic Typewriter Effect for Python Developer Roles
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const roles = [
            'Python Developer',
            'FastAPI & Backend Engineer',
            'Selenium Automation Builder',
            'RAG & LLM Systems Specialist',
            'PySpark Data Pipeline Engineer'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at complete word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400;
            }

            setTimeout(typeLoop, typingSpeed);
        }

        typeLoop();
    }

    // 4. Active Nav Link on Scroll (Scroll Spy)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // 5. Scroll Reveal with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // 6. Copy Python Code Window
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const copyCodeLabel = document.getElementById('copy-code-label');
    const codeSnippet = document.getElementById('code-snippet');

    if (copyCodeBtn && codeSnippet) {
        copyCodeBtn.addEventListener('click', () => {
            const codeText = codeSnippet.innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                if (copyCodeLabel) copyCodeLabel.textContent = 'copied!';
                copyCodeBtn.classList.add('text-emerald-400');

                setTimeout(() => {
                    if (copyCodeLabel) copyCodeLabel.textContent = 'copy';
                    copyCodeBtn.classList.remove('text-emerald-400');
                }, 2000);
            }).catch(() => {
                if (copyCodeLabel) copyCodeLabel.textContent = 'failed';
            });
        });
    }

    // 7. Generic Copy-to-Clipboard Buttons (for Email & Phone)
    const copyButtons = document.querySelectorAll('.copy-btn[data-clipboard]');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-clipboard');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = `
                        <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    `;
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                    }, 2000);
                });
            }
        });
    });

    // 8. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Processing...
                `;
            }

            // Simulate immediate client submission feedback
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.classList.remove('hidden');
                    formFeedback.className = 'text-center text-xs font-mono py-2 rounded text-emerald-400 bg-emerald-500/10 border border-emerald-500/30';
                    formFeedback.textContent = '✓ Message prepared! Opening your mail client...';
                }

                // Prepare mailto link as fallback
                const mailtoLink = `mailto:akash324m@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.location.href = mailtoLink;

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>Message Dispatched!</span>
                        <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    `;
                }

                setTimeout(() => {
                    contactForm.reset();
                    if (submitBtn) {
                        submitBtn.innerHTML = `
                            <span>Send Message</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        `;
                    }
                    if (formFeedback) {
                        formFeedback.classList.add('hidden');
                    }
                }, 4000);
            }, 800);
        });
    }
});
