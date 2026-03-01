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
    // SOLUTIONS SWIPER
    // =============================================
    new Swiper('.solutionsSwiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.solutions-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.solutions-next',
            prevEl: '.solutions-prev',
        },
        breakpoints: {
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
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

// =============================================
// MODALES LEGALES (Términos y Privacidad)
// =============================================
function showTerminos() {
    Swal.fire({
        title: '<strong>Términos de Uso</strong>',
        imageUrl: 'img/logo2.png',
        imageWidth: 200,
        imageAlt: 'Nodesys Logo',
        html: `
            <div style="text-align:left; max-height:400px; overflow-y:auto; font-size:14px; line-height:1.6;">
                <h3>1. Uso del Sitio</h3>
                <p>El acceso y uso de https://nodesys.com.mx está sujeto a los presentes términos.
                Al navegar en este sitio web, usted acepta cumplirlos.</p>

                <h3>2. Propiedad Intelectual</h3>
                <p>Todo el contenido (textos, imágenes, logotipos, código fuente, diseño) es propiedad
                de Nodesys y está protegido por las leyes de propiedad intelectual de México.</p>

                <h3>3. Servicios</h3>
                <p>Nodesys se reserva el derecho de modificar o discontinuar sus servicios en cualquier
                momento sin previo aviso.</p>

                <h3>4. Limitación de Responsabilidad</h3>
                <p>Nodesys no será responsable de daños directos o indirectos derivados del uso de este sitio web.</p>

                <h3>5. Enlaces a Terceros</h3>
                <p>Este sitio puede contener enlaces a sitios web de terceros. Nodesys no es responsable del
                contenido ni de las prácticas de privacidad de dichos sitios.</p>

                <h3>6. Modificaciones</h3>
                <p>Nos reservamos el derecho de actualizar los presentes términos en cualquier momento.
                Las modificaciones serán efectivas al publicarse en el sitio.</p>

                <h3>7. Legislación Aplicable</h3>
                <p>Los presentes términos se rigen por las leyes de México, sometiendo cualquier
                controversia a los tribunales competentes de Monterrey, Nuevo León.</p>

                <h3>8. Contacto</h3>
                <p>Para consultas: <a href="mailto:contacto@nodesys.com.mx">contacto@nodesys.com.mx</a></p>
            </div>
        `,
        width: 700,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#013b84',
        showCloseButton: true,
    });
}

function showPrivacidad() {
    Swal.fire({
        title: '<strong>Política de Privacidad</strong>',
        imageUrl: 'img/logo2.png',
        imageWidth: 200,
        imageAlt: 'Nodesys Logo',
        html: `
            <div style="text-align:left; max-height:400px; overflow-y:auto; font-size:14px; line-height:1.6;">
                <h3>1. Información que Recopilamos</h3>
                <p>A través de nuestro formulario de contacto, recopilamos: nombre, correo electrónico,
                teléfono, empresa, servicio de interés y mensaje. Esta información se proporciona de forma voluntaria.</p>

                <h3>2. Uso de la Información</h3>
                <p>La información se utiliza exclusivamente para: responder consultas, proporcionar
                información sobre nuestros servicios y mejorar la experiencia del usuario.</p>

                <h3>3. Protección de Datos</h3>
                <p>Implementamos medidas de seguridad técnicas (HTTPS/TLS) para proteger su información
                personal contra acceso no autorizado.</p>

                <h3>4. Cookies y Tecnologías de Rastreo</h3>
                <p>Este sitio puede utilizar cookies de análisis para comprender el comportamiento
                de los usuarios. Puede desactivar las cookies en la configuración de su navegador.</p>

                <h3>5. Compartición de Datos</h3>
                <p>Nodesys no vende, alquila ni comparte información personal con terceros, excepto
                cuando sea requerido por ley.</p>

                <h3>6. Derechos del Titular (ARCO)</h3>
                <p>Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus
                datos personales (Derechos ARCO conforme a la LFPDPPP). Para ejercerlos, contacte a:
                <a href="mailto:privacidad@nodesys.com.mx">privacidad@nodesys.com.mx</a></p>

                <h3>7. Retención de Datos</h3>
                <p>Los datos se conservan únicamente el tiempo necesario para cumplir con los fines para los
                que fueron recopilados.</p>

                <h3>8. Cambios a esta Política</h3>
                <p>Nos reservamos el derecho de modificar esta política. Las actualizaciones se publicarán
                en esta misma sección.</p>

                <h3>9. Contacto</h3>
                <p>Para consultas sobre privacidad: <a href="mailto:privacidad@nodesys.com.mx">privacidad@nodesys.com.mx</a></p>
                <p>Última actualización: 28 de febrero de 2026</p>
            </div>
        `,
        width: 700,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#013b84',
        showCloseButton: true,
    });
}

// =============================================
// SOLICITAR INFO (Modal de interés por solución)
// =============================================
function solicitarInfo(solucion) {
    Swal.fire({
        title: `<span style="color:#013b84">${solucion}</span>`,
        html: `
            <p style="color:#666;margin-bottom:18px;">Déjanos tus datos y un asesor se pondrá en contacto contigo para brindarte información detallada sobre <strong>${solucion}</strong>.</p>
            <form id="swalSolucionForm" style="text-align:left">
                <div style="margin-bottom:12px">
                    <label style="display:block;font-weight:600;font-size:.85rem;margin-bottom:4px;color:#333">Nombre completo *</label>
                    <input id="swalNombre" type="text" class="swal2-input" placeholder="Tu nombre" style="margin:0;width:100%">
                </div>
                <div style="margin-bottom:12px">
                    <label style="display:block;font-weight:600;font-size:.85rem;margin-bottom:4px;color:#333">Correo electrónico *</label>
                    <input id="swalEmail" type="email" class="swal2-input" placeholder="correo@ejemplo.com" style="margin:0;width:100%">
                </div>
                <div style="margin-bottom:12px">
                    <label style="display:block;font-weight:600;font-size:.85rem;margin-bottom:4px;color:#333">Teléfono</label>
                    <input id="swalTelefono" type="tel" class="swal2-input" placeholder="10 dígitos" style="margin:0;width:100%">
                </div>
                <div style="margin-bottom:4px">
                    <label style="display:block;font-weight:600;font-size:.85rem;margin-bottom:4px;color:#333">Mensaje (opcional)</label>
                    <textarea id="swalMensaje" class="swal2-textarea" placeholder="Cuéntanos brevemente tu proyecto o necesidad…" style="margin:0;width:100%;min-height:80px"></textarea>
                </div>
            </form>
        `,
        width: 520,
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-send"></i> Enviar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#013b84',
        cancelButtonColor: '#6c757d',
        showCloseButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('swalNombre').value.trim();
            const email = document.getElementById('swalEmail').value.trim();
            const telefono = document.getElementById('swalTelefono').value.trim();
            const mensaje = document.getElementById('swalMensaje').value.trim();

            if (!nombre || !email) {
                Swal.showValidationMessage('Por favor ingresa tu nombre y correo electrónico');
                return false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                Swal.showValidationMessage('Ingresa un correo electrónico válido');
                return false;
            }
            return { nombre, email, telefono, mensaje, solucion };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const d = result.value;
            const waText = encodeURIComponent(
                `¡Hola Nodesys! 👋\n\nMe interesa: *${d.solucion}*\n\nNombre: ${d.nombre}\nCorreo: ${d.email}${d.telefono ? '\nTeléfono: ' + d.telefono : ''}${d.mensaje ? '\nMensaje: ' + d.mensaje : ''}`
            );
            const waURL = `https://wa.me/528122930709?text=${waText}`;

            Swal.fire({
                icon: 'success',
                title: '¡Gracias por tu interés!',
                html: `<p>Hemos recibido tu solicitud sobre <strong>${d.solucion}</strong>. También puedes contactarnos directamente:</p>`,
                confirmButtonText: '<i class="bi bi-whatsapp"></i> Enviar por WhatsApp',
                confirmButtonColor: '#25d366',
                showCancelButton: true,
                cancelButtonText: 'Cerrar',
                cancelButtonColor: '#013b84',
            }).then((r) => {
                if (r.isConfirmed) {
                    window.open(waURL, '_blank');
                }
            });
        }
    });
}