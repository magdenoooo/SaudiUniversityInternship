// Main JavaScript file for the Saudi University website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSmoothScrolling();
    initAnimations();
    initLanguageToggle();
    initScrollToTop();
    
    // Initialize page-specific features
    const currentPage = getCurrentPage();
    if (currentPage === 'faq.html') {
        initFAQ();
    }
    if (currentPage === 'contact.html') {
        initContactForm();
    }
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbar.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .step, .stat-card, .testimonial-card, .requirement-card, .field-card, .benefit-card, .timeline-item');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .step, .stat-card, .testimonial-card, .requirement-card, .field-card, .benefit-card, .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Language toggle functionality
function initLanguageToggle() {
    const langSwitch = document.getElementById('lang-switch');
    
    if (langSwitch) {
        langSwitch.addEventListener('click', function() {
            const html = document.documentElement;
            const currentLang = html.getAttribute('lang');
            const currentDir = html.getAttribute('dir');
            
            // Toggle between Arabic and English
            if (currentLang === 'ar') {
                // Switch to English
                html.setAttribute('lang', 'en');
                html.setAttribute('dir', 'ltr');
                document.body.classList.add('english');
                langSwitch.querySelector('span').textContent = 'العربية';
                
                // Update page content to English (placeholder)
                updateContentLanguage('en');
            } else {
                // Switch to Arabic
                html.setAttribute('lang', 'ar');
                html.setAttribute('dir', 'rtl');
                document.body.classList.remove('english');
                langSwitch.querySelector('span').textContent = 'EN';
                
                // Update page content to Arabic
                updateContentLanguage('ar');
            }
        });
    }
}

// Update content language (placeholder function)
function updateContentLanguage(lang) {
    // This is a placeholder function
    // In a real implementation, you would load different content based on the language
    console.log(`Switching to ${lang} language`);
    
    // Example: Update some common elements
    const examples = {
        'ar': {
            title: 'برنامج التدريب الميداني - جامعة المملكة',
            loading: 'جار التحميل...'
        },
        'en': {
            title: 'Field Training Program - Kingdom University',
            loading: 'Loading...'
        }
    };
    
    if (examples[lang]) {
        document.title = examples[lang].title;
    }
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'العودة إلى الأعلى');
    document.body.appendChild(scrollTopBtn);
    
    // Add styles for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-600);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 108, 53, 0.3);
        }
        
        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--primary-700);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 108, 53, 0.4);
        }
        
        [dir="ltr"] .scroll-to-top {
            right: 30px;
            left: auto;
        }
        
        [dir="rtl"] .scroll-to-top {
            left: 30px;
            right: auto;
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Get current page filename
function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

// Form validation helper
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.parentNode.querySelector('.error-message');
        
        // Remove existing error message
        if (errorElement) {
            errorElement.remove();
        }
        
        // Check if field is empty
        if (!value) {
            showFieldError(input, 'هذا الحقل مطلوب');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
            showFieldError(input, 'يرجى إدخال بريد إلكتروني صحيح');
            isValid = false;
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-xs);
    `;
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = 'var(--error)';
    
    // Remove error styling when user starts typing
    input.addEventListener('input', function() {
        this.style.borderColor = '';
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage(message, container) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: var(--success);
        color: white;
        padding: var(--space-lg);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-lg);
        text-align: center;
        animation: slideInDown 0.5s ease-out;
    `;
    
    container.insertBefore(successDiv, container.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Add animation keyframes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// Initialize FAQ functionality (will be overridden in faq.js if present)
function initFAQ() {
    console.log('FAQ functionality loaded from main.js (fallback)');
}

// Initialize contact form (will be overridden in contact.js if present)
function initContactForm() {
    console.log('Contact form functionality loaded from main.js (fallback)');
}

// Utility functions
const utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Get element height including margins
    getElementHeight: function(element) {
        const styles = getComputedStyle(element);
        const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
        return element.offsetHeight + margin;
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for use in other scripts
window.utils = utils;