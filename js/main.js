/* =============================================
   NODESYS - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // PRELOADER
    // =============================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 500);
        }, 800);
    });

    // =============================================
    // NAVBAR SCROLL EFFECT
    // =============================================
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);

    // Close mobile menu on click
    const navbarCollapse = document.getElementById('navbarNav');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // =============================================
    // HERO PARTICLES
    // =============================================
    const particlesContainer = document.getElementById('heroParticles');
    
    function createParticles() {
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            const colors = [
                'rgba(108, 92, 231, 0.4)',
                'rgba(0, 206, 201, 0.3)',
                'rgba(253, 121, 168, 0.3)',
                'rgba(162, 155, 254, 0.3)',
                'rgba(255, 255, 255, 0.2)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                background: ${color};
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                box-shadow: 0 0 ${size * 2}px ${color};
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // =============================================
    // COUNTER ANIMATION
    // =============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter, .stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!target || counter.dataset.animated === 'true') return;
            
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && counter.dataset.animated !== 'true') {
                        counter.dataset.animated = 'true';
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.textContent = Math.floor(current);
                        }, 16);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    animateCounters();

    // =============================================
    // AOS ANIMATIONS
    // =============================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: 'mobile'
    });

    // =============================================
    // SWIPER - CLIENTS CAROUSEL
    // =============================================
    new Swiper('.clientsSwiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 5 },
        }
    });

    // =============================================
    // SWIPER - TESTIMONIALS
    // =============================================
    new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        }
    });

    // =============================================
    // PORTFOLIO FILTER
    // =============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });

    // =============================================
    // SMOOTH SCROLL
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // BACK TO TOP
    // =============================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // =============================================
    // CONTACT FORM
    // =============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Simular envío
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>¡Mensaje Enviado!';
                btn.classList.remove('btn-gradient');
                btn.style.background = '#00b894';
                btn.style.border = 'none';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-gradient');
                    btn.style.background = '';
                    btn.style.border = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }

    // =============================================
    // TYPING EFFECT (optional - hero badge)
    // =============================================
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const words = ['tecnología inteligente', 'soluciones a medida', 'transformación digital', 'innovación continua'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentWord = '';
        
        function typeEffect() {
            currentWord = words[wordIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        setTimeout(typeEffect, 2000);
    }

    // =============================================
    // NEWSLETTER FORM
    // =============================================
    const newsletterForm = document.querySelector('.footer-newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const btn = this.querySelector('button');
            
            if (input.value) {
                btn.innerHTML = '<i class="bi bi-check-lg"></i>';
                input.value = '';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="bi bi-send"></i>';
                }, 2000);
            }
        });
    }

    // =============================================
    // FADE IN ANIMATION KEYFRAME
    // =============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

});
