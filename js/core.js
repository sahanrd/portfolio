// ============================================
// CORE FUNCTIONALITY
// ============================================

// ============================================
// STARFIELD BACKGROUND (Three.js)
// ============================================
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: false
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(CONFIG.starfield.particleCount * 3);
        const colors = new Float32Array(CONFIG.starfield.particleCount * 3);

        for (let i = 0; i < CONFIG.starfield.particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;

            colors[i] = 0.9 + Math.random() * 0.1;
            colors[i + 1] = 0.95 + Math.random() * 0.05;
            colors[i + 2] = 1.0;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        animate();
    } catch (error) {
        console.error('Error initializing starfield:', error);
        canvas.style.display = 'none';
    }
}

function animate() {
    if (!scene || !camera || !renderer) return;

    requestAnimationFrame(animate);

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    if (!camera || !renderer) return;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse movement handler (throttled)
let mouseMoveTimeout;
document.addEventListener('mousemove', (event) => {
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
        mouseX = (event.clientX - windowHalfX) * CONFIG.starfield.mouseInfluence;
        mouseY = (event.clientY - windowHalfY) * CONFIG.starfield.mouseInfluence;
    }, 16);
});

window.addEventListener('resize', onWindowResize);

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (!cursorDot || !cursorOutline) return;

    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function updateCursor() {
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .chip');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// ============================================
// THEME TOGGLE
// ============================================


// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
    const texts = [
        'Graphic Designer • Web Designer • Astrophile',
        'Creating Digital Experiences',
        'Building The Future'
    ];

    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const backdrop = document.getElementById('mobileBackdrop');
    const links = document.querySelectorAll('.nav-link');

    if (!nav || !menuToggle || !navLinks) return;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// SCROLL PROGRESS
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height);

        if (progressBar) {
            progressBar.style.transform = `scaleX(${scrolled})`;
        }
    });
}

// ============================================
// GSAP ANIMATIONS
// ============================================
function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-badge', {
        duration: 0.8,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-greeting', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.name-glow', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.typewriter-container', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.subtitle-chip', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        delay: 0.8,
        ease: 'back.out(1.7)'
    });

    gsap.from('.floating-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 1.2,
        ease: 'power3.out'
    });



    // Section animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// ============================================
// AOS (ANIMATE ON SCROLL) - SIMPLE VERSION
// ============================================
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-init');
        observer.observe(el);
    });
}