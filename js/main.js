// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Enhanced Portfolio Initializing...');

    // Core features
    initLoadingScreen();
    initStarfield();
    initCustomCursor();
    initClock();
    updateLastUpdated();

    initTypewriter();
    initCookieConsent();

    // Navigation
    initNavigation();
    initScrollProgress();

    // Animations
    initAnimations();
    initAOS();

    // Content sections
    initStatsCounter();
    initSkills();
    initProjects();
    initTimeline();
    initContactForm();

    // Utilities
    initBackToTop();
    initLazyLoad();
    initSmoothScroll();
    ensureProfilePhoto();
    initPerformanceOptimizations();

    console.log('✨ Portfolio loaded successfully!');
    console.log('💡 Tip: Configure EmailJS in CONFIG object for real email functionality');
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Silently handle errors in production
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🌟 Sahan Dissanayake Portfolio', 'font-size: 20px; font-weight: bold; color: #00FFD1;');
console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #FF6B35;');
console.log('%c📧 sahanruwansara2003@gmail.com', 'font-size: 12px; color: #E8E8E8;');
console.log('%c🔗 https://www.linkedin.com/in/sahan-rd/', 'font-size: 12px; color: #E8E8E8;');