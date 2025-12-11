// ============================================
// COMPONENTS FUNCTIONALITY
// ============================================

// ============================================
// STATS COUNTER
// ============================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                animateCounter(target, count);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, stepTime);
}

// ============================================
// SKILLS SECTION
// ============================================
function initSkills() {
    const techContainer = document.getElementById('technicalSkills');
    const creativeContainer = document.getElementById('creativeSkills');

    if (!techContainer || !creativeContainer) return;

    skills.technical.forEach(skill => {
        techContainer.appendChild(createSkillElement(skill));
    });

    skills.creative.forEach(skill => {
        creativeContainer.appendChild(createSkillElement(skill));
    });

    // Observer removed as progress bars are no longer used

    // Observer removed
}

function createSkillElement(skill) {
    const div = document.createElement('div');
    div.className = 'skill-item';

    div.innerHTML = `
        <div class="skill-info">
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <span class="skill-name">${skill.name}</span>
        </div>
    `;

    return div;
}

// ============================================
// PROJECTS SECTION
// ============================================
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterChips = document.querySelectorAll('.chip');

    if (!projectsGrid) return;

    renderProjects(projects);

    filterChips.forEach(chip => {
        chip.addEventListener('click', function () {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            const filteredProjects = filter === 'all'
                ? projects
                : projects.filter(p => p.category === filter);

            renderProjects(filteredProjects);
        });
    });
}

function renderProjects(projectsArray) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projectsArray.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);

        // Animate in with GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(projectCard,
                { y: 50, opacity: 0 },
                {
                    duration: 0.6,
                    y: 0,
                    opacity: 1,
                    delay: index * 0.1,
                    ease: 'power3.out'
                }
            );
        }
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;

    const categoryNames = {
        'web': 'Web Design',
        'hardware': 'Hardware',
        'graphic': 'Graphic Design',
        'software': 'Software Dev'
    };

    const categoryColors = {
        'web': ['#00FFCC', '#00E0A0'],
        'hardware': ['#CC5500', '#E97451'],
        'graphic': ['#9D00FF', '#CC00FF'],
        'software': ['#0066FF', '#00A3FF']
    };

    const categoryIcons = {
        'web': 'code',
        'hardware': 'microchip',
        'graphic': 'paint-brush',
        'software': 'laptop-code'
    };

    const [color1, color2] = categoryColors[project.category] || categoryColors.web;
    const icon = categoryIcons[project.category];

    const techTags = project.technologies.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    let linksHTML = '';
    if (project.liveLink && project.liveLink !== '#') {
        linksHTML += `<a href="${project.liveLink}" target="_blank" class="project-link live">
            <i class="fas fa-external-link-alt"></i>
            <span>View</span>
        </a>`;
    }

    if (project.githubLink && project.githubLink !== '#') {
        linksHTML += `<a href="${project.githubLink}" target="_blank" class="project-link github">
            <i class="fab fa-github"></i>
            <span>Code</span>
        </a>`;
    }

    if (!linksHTML) {
        linksHTML = `<span class="project-link" style="opacity: 0.5; cursor: default;">
            <i class="fas fa-lock"></i>
            <span>Private</span>
        </span>`;
    }

    card.innerHTML = `
        <div class="project-image">
            ${project.image && project.image !== '#' ?
            `<img src="${project.image}" alt="${project.title}" 
                style="width:100%;height:100%;object-fit:cover;cursor:pointer;transition:transform 0.3s ease;" 
                onclick="openImageModal('${project.image}', '${project.title}')"
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">` :
            `<div style="width:100%;height:100%;background:linear-gradient(135deg,${color1},${color2});display:flex;flex-direction:column;align-items:center;justify-content:center;color:#0A0A0F;">
                    <i class="fas fa-${icon}" style="font-size:3rem;margin-bottom:1rem;"></i>
                    <div style="font-size:0.9rem;font-family:'Orbitron',sans-serif;font-weight:700;color:#0A0A0F;">
                        ${categoryNames[project.category]}
                    </div>
                </div>`
        }
            <span class="project-category">${categoryNames[project.category]}</span>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-links">${linksHTML}</div>
        </div>
    `;

    return card;
}

// ============================================
// TIMELINE SECTION
// ============================================
function initTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    const filterButtons = document.querySelectorAll('.timeline-filter');

    if (!timelineContainer) return;

    renderTimeline(timelineData);

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const year = this.dataset.year;
            const filteredData = year === 'all'
                ? timelineData
                : timelineData.filter(item => item.yearNumber === parseInt(year));

            renderTimeline(filteredData);
        });
    });
}

function renderTimeline(data) {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = '';

    data.forEach((item, index) => {
        const card = createTimelineCard(item);
        timelineContainer.appendChild(card);

        // Animate in with GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(card,
                { y: 30, opacity: 0 },
                {
                    duration: 0.6,
                    y: 0,
                    opacity: 1,
                    delay: index * 0.1,
                    ease: 'power3.out'
                }
            );
        }
    });
}

function createTimelineCard(item) {
    const card = document.createElement('div');
    card.className = 'timeline-card';

    const tagsHTML = item.tags.map(tag =>
        `<span class="timeline-card-tag">${tag}</span>`
    ).join('');

    card.innerHTML = `
        <div class="timeline-card-header">
            <div class="timeline-card-icon">
                <i class="${item.icon}"></i>
            </div>
            <div class="timeline-card-year">${item.year}</div>
        </div>
        <h3 class="timeline-card-title">${item.title}</h3>
        <p class="timeline-card-subtitle">${item.subtitle}</p>
        <p class="timeline-card-description">${item.description}</p>
        <div class="timeline-card-tags">${tagsHTML}</div>
    `;

    return card;
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const successMessage = document.getElementById('formSuccess');

    // Initialize EmailJS if enabled
    if (CONFIG.email.enabled && window.emailjs) {
        emailjs.init(CONFIG.email.publicKey);
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        clearErrors();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let isValid = true;

        // Validation
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(name.value.trim())) {
            showError(name, 'Name can only contain letters');
            isValid = false;
        }

        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }

        if (!isValid) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            if (CONFIG.email.enabled && window.emailjs) {
                // Real email sending with EmailJS
                // Explicitly pass Public Key as 4th argument for robustness
                const templateParams = {
                    from_name: name.value.trim(),
                    from_email: email.value.trim(),
                    message: message.value.trim(),
                    to_email: 'sahanruwansara2003@gmail.com'
                };

                console.log('Sending email with params:', templateParams);

                await emailjs.send(
                    CONFIG.email.serviceId,
                    CONFIG.email.templateId,
                    templateParams,
                    CONFIG.email.publicKey // Pass Public Key explicitly here
                );

                console.log('Email sent successfully');
                showSuccess(form, successMessage);
                showToast('✉️ Message sent successfully!');
            } else {
                // Simulation mode
                console.log('EmailJS not enabled or not loaded. simulating.');
                await simulateEmailSend({
                    name: name.value.trim(),
                    email: email.value.trim(),
                    message: message.value.trim()
                });

                showSuccess(form, successMessage);
                showToast('✉️ Message received! (Demo mode - Configure EmailJS for real emails)');
            }

            form.reset();

        } catch (error) {
            console.error('Submission Failed:', error);
            showToast('❌ Failed to send message. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            clearError(this);
        });
    });
}

function showSuccess(form, successMessage) {
    if (!form || !successMessage) return;

    form.style.display = 'none';
    successMessage.style.display = 'block';

    if (typeof gsap !== 'undefined') {
        gsap.fromTo(successMessage,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
        );

        setTimeout(() => {
            gsap.to(successMessage, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    successMessage.style.display = 'none';
                    form.style.display = 'block';
                    gsap.fromTo(form,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                }
            });
        }, 5000);
    } else {
        // Fallback if GSAP not available
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(20px)';
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
            successMessage.style.transition = 'all 0.5s ease';
        }, 10);
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');

    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;

    // Shake animation
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(formGroup,
            { x: -5 },
            { x: 5, duration: 0.1, yoyo: true, repeat: 3 }
        );
    }
}

function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

function validateField(input) {
    const value = input.value.trim();

    switch (input.id) {
        case 'name':
            if (!value) {
                showError(input, 'Name is required');
                return false;
            } else if (value.length < 2) {
                showError(input, 'Name must be at least 2 characters');
                return false;
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                showError(input, 'Name can only contain letters');
                return false;
            }
            break;

        case 'email':
            if (!value) {
                showError(input, 'Email is required');
                return false;
            } else if (!validateEmail(value)) {
                showError(input, 'Please enter a valid email address');
                return false;
            }
            break;

        case 'message':
            if (!value) {
                showError(input, 'Message is required');
                return false;
            } else if (value.length < 10) {
                showError(input, 'Message must be at least 10 characters');
                return false;
            }
            break;
    }

    clearError(input);
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function simulateEmailSend(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data (demo mode):', data);
            resolve({ success: true });
        }, 1500);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Live Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Update Time
    const timeElement = document.getElementById('hudTime');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Update Date
    const dateElement = document.getElementById('hudDate');
    if (dateElement) {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        const dayName = days[now.getDay()];
        const dayNum = String(now.getDate()).padStart(2, '0');
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();

        dateElement.textContent = `${dayName} | ${dayNum} ${monthName} ${year}`;
    }
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

// Last Updated Date
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdatedElement.textContent = date.toLocaleDateString('en-US', options);
    }
}

// Profile Photo Fallback
function ensureProfilePhoto() {
    const img = document.querySelector('.profile-photo');
    if (!img) return;

    const candidates = [
        'assets/images/profile/sahan.jpg',
        'assets/images/profile/sahan.png',
        'assets/images/profile/Sahan Profile.jpg',
        'assets/images/profile/sahan-profile.jpg',
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%2314141F"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Orbitron" font-size="120" fill="%2300FFD1"%3ESD%3C/text%3E%3C/svg%3E'
    ];

    let currentIndex = 0;

    function tryNextImage() {
        if (currentIndex >= candidates.length) return;

        const testImg = new Image();
        testImg.onload = () => {
            img.dataset.src = candidates[currentIndex];
            img.src = candidates[currentIndex];
        };
        testImg.onerror = () => {
            currentIndex++;
            tryNextImage();
        };
        testImg.src = candidates[currentIndex];
    }

    tryNextImage();
}

// Lazy Loading for Images
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('.lazy-load');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const skeleton = img.previousElementSibling;

                // Try to load the image
                img.src = img.dataset.src;

                img.onload = () => {
                    img.classList.add('loaded');
                    if (skeleton && skeleton.classList.contains('skeleton-loader')) {
                        skeleton.style.display = 'none';
                    }
                };

                img.onerror = () => {
                    // Fallback to placeholder if image fails to load
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%2314141F"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%2300FFD1"%3ESD%3C/text%3E%3C/svg%3E';
                    img.classList.add('loaded');
                    if (skeleton) skeleton.style.display = 'none';
                };

                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cookie Consent
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    if (!cookieConsent || !acceptBtn || !declineBtn) return;

    const cookieChoice = localStorage.getItem('cookieConsent');

    if (!cookieChoice) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        showToast('✅ Cookie preferences saved');
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
        showToast('❌ Cookies declined');
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            onWindowResize();
        }, 250);
    });

    // Reduce motion for accessibility
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // Disable starfield on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const starfield = document.getElementById('starfield');
        if (starfield) {
            starfield.style.display = 'none';
        }
    }
}

// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');

    if (!loadingScreen) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ============================================
// IMAGE LIGHTBOX
// ============================================
function openImageModal(src, title) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    if (!modal || !modalImg) return;

    modalImg.src = src;
    if (modalCaption) modalCaption.textContent = title;

    modal.classList.add('show');

    // Animate in
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(modalImg,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    }
}

// Global Event Listeners for Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    function closeModal() {
        modal.classList.remove('show');
        const modalImg = document.getElementById('modalImage');
        // Reset animation state
        if (typeof gsap !== 'undefined' && modalImg) {
            gsap.set(modalImg, { scale: 0.8, opacity: 0 });
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});