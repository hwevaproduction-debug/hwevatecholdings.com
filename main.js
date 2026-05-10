// Initialize AOS Animation
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    disable: 'mobile' // Disable on mobile for better performance
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSidebar();
    initScrollAnimations();
    initCounters();
    initContactForm();
    initPortfolioOverlay();
    initStatsCounters();
    initSmoothScrolling();
    initBackToTop();
    initTestimonialSlider();
    initFormValidation();
    initLazyLoading();
    initPerformanceOptimizations();
    initPageNavigation();
    initBreadcrumbs();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar-area');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarToggler.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.remove('active');
        }
    });
    
    // Auto-close mobile menu when clicking a link
    const navLinks = navbarCollapse.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('active');
            }
        });
    });
}

// Sidebar functionality
function initSidebar() {
    const menuBar = document.querySelector('.menu-bar');
    const sidebar = document.querySelector('.sidebar-left');
    const sidebarClose = document.querySelector('.sidebar-close a');
    
    if (menuBar) {
        menuBar.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.add('active');
            document.body.classList.add('sidebar-open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebar();
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !menuBar.contains(e.target)) {
            closeSidebar();
        }
    });
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    }
}

// Page navigation enhancements
function initPageNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Update sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu ul li a');
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Breadcrumb functionality
function initBreadcrumbs() {
    const breadcrumbArea = document.querySelector('.breadcrumb-area');
    if (!breadcrumbArea) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageTitles = {
        'index.html': 'Home',
        'about.html': 'About Us',
        'services.html': 'Services',
        'portfolio.html': 'Portfolio',
        'team.html': 'Team',
        'contact.html': 'Contact'
    };
    
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb && currentPage !== 'index.html' && currentPage !== '') {
        breadcrumb.innerHTML = `
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">${pageTitles[currentPage] || currentPage}</li>
        `;
    }
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Add stagger delay for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            setTimeout(() => {
                if (validateContactForm(data)) {
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
                    contactForm.reset();
                    clearFormValidation(contactForm);
                } else {
                    showNotification('Please fill in all required fields correctly.', 'error');
                }
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Real-time validation
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

// Form validation functions
function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Privacy checkbox validation
    if (!data.privacy) {
        return false;
    }
    
    return true;
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous validation
    field.parentNode.classList.remove('success', 'error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !fieldValue) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (fieldName === 'email' && fieldValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Apply validation classes
    if (isValid && fieldValue) {
        field.parentNode.classList.add('success');
    } else if (!isValid) {
        field.parentNode.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFormValidation(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('success', 'error');
        const errorMessages = group.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    });
}

// Portfolio overlay functionality
function initPortfolioOverlay() {
    const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-highlight-card');
    
    portfolioItems.forEach(item => {
        const btn = item.querySelector('.btn');
        
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showPortfolioModal(item);
            });
        }
    });
}

// Portfolio modal
function showPortfolioModal(item) {
    const title = item.querySelector('h3, h4').textContent;
    const description = item.querySelector('p').textContent;
    const stats = Array.from(item.querySelectorAll('.stat')).map(stat => {
        const strong = stat.querySelector('strong').textContent;
        const span = stat.querySelector('span').textContent;
        return { strong, span };
    });
    
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <div class="modal-stats">
                        ${stats.map(stat => `
                            <div class="stat">
                                <strong>${stat.strong}</strong>
                                <span>${stat.span}</span>
                            </div>
                        `).join('')}
                    </div>
                    <p>This project showcases our expertise in delivering high-quality digital solutions. In a real implementation, this would contain detailed project information, screenshots, technology stack, and client testimonials.</p>
                    <div class="modal-features">
                        <h4>Key Features:</h4>
                        <ul>
                            <li>Responsive design for all devices</li>
                            <li>Optimized performance and loading speed</li>
                            <li>User-friendly interface and experience</li>
                            <li>Scalable architecture and clean code</li>
                            <li>Comprehensive testing and quality assurance</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn primary-btn">View Case Study</button>
                    <button class="btn primary-btn-outline">Live Demo</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
    
    // Animate modal in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Pricing cards interaction
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.single-pricing');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = 'var(--shadow-5)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow-2)';
            }
        });
    });
}

// Stats counters
function initStatsCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStat = (stat) => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="lni lni-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        // Initialize Tiny Slider for testimonials
        if (typeof tns !== 'undefined') {
            const slider = tns({
                container: '.testimonial-slider',
                items: 1,
                slideBy: 1,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                nav: true,
                navPosition: 'bottom',
                controls: false,
                speed: 600,
                responsive: {
                    768: {
                        items: 1
                    }
                }
            });
        }
    }
}

// Form validation enhancements
function initFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add floating label effect
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });
            
            // Check if field has value on load
            if (input.value) {
                input.parentNode.classList.add('focused');
            }
        }
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll events here if needed
        }, 100);
    });
    
    // Preload critical resources
    const criticalImages = [
        'https://via.placeholder.com/600x400/155bd5/ffffff?text=Digital+Innovation'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="lni lni-${type === 'success' ? 'checkmark-circle' : type === 'error' ? 'close-circle' : 'information'}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Auto remove after 5 seconds
    const autoClose = setTimeout(() => {
        closeNotification();
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification();
    });
    
    function closeNotification() {
        notification.classList.remove('active');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }
}

// Service cards hover effect
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-highlight-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-2)';
        });
    });
});

// Team member cards interaction
document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.team-member-card');
    
    teamCards.forEach(card => {
        const socialLinks = card.querySelector('.member-social');
        
        card.addEventListener('mouseenter', function() {
            if (socialLinks) {
                socialLinks.style.transform = 'translateY(0)';
                socialLinks.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (socialLinks) {
                socialLinks.style.transform = 'translateY(10px)';
                socialLinks.style.opacity = '0.8';
            }
        });
    });
});

// Add CSS for notification and modal
const additionalStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        border-radius: 15px;
        box-shadow: var(--shadow-5);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s ease;
        max-width: 400px;
        border-left: 4px solid transparent;
    }
    
    .notification.active {
        transform: translateX(0);
    }
    
    .notification-content {
        padding: 20px;
        display: flex;
        align-items: flex-start;
        gap: 15px;
    }
    
    .notification-success {
        border-left-color: var(--success);
    }
    
    .notification-error {
        border-left-color: var(--error);
    }
    
    .notification-info {
        border-left-color: var(--info);
    }
    
    .notification-icon {
        flex-shrink: 0;
    }
    
    .notification-icon i {
        font-size: 1.5rem;
    }
    
    .notification-success .notification-icon i {
        color: var(--success);
    }
    
    .notification-error .notification-icon i {
        color: var(--error);
    }
    
    .notification-info .notification-icon i {
        color: var(--info);
    }
    
    .notification-message {
        flex: 1;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--dark-1);
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--dark-2);
        margin-left: 10px;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: var(--light-2);
        color: var(--dark-1);
    }
    
    .portfolio-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .portfolio-modal.active {
        opacity: 1;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background: var(--white);
        border-radius: 20px;
        max-width: 700px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
        box-shadow: var(--shadow-6);
    }
    
    @keyframes modalSlideIn {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .modal-header {
        padding: 30px 30px 20px;
        border-bottom: 1px solid var(--gray-4);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--black);
        font-size: 1.5rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--dark-2);
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: var(--light-2);
        color: var(--dark-1);
    }
    
    .modal-body {
        padding: 30px;
    }
    
    .modal-stats {
        display: flex;
        justify-content: space-around;
        margin: 20px 0;
        padding: 20px;
        background: var(--light-3);
        border-radius: 15px;
    }
    
    .modal-features {
        margin-top: 30px;
    }
    
    .modal-features h4 {
        margin-bottom: 15px;
        color: var(--black);
    }
    
    .modal-features ul {
        list-style: none;
        padding: 0;
    }
    
    .modal-features ul li {
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
        color: var(--dark-2);
    }
    
    .modal-features ul li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--success);
        font-weight: bold;
    }
    
    .modal-footer {
        padding: 20px 30px 30px;
        border-top: 1px solid var(--gray-4);
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: var(--white);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .back-to-top.active {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--primary-dark);
        transform: translateY(-3px);
        box-shadow: var(--shadow-4);
    }
    
    .back-to-top:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }
    
    @media (max-width: 767px) {
        .notification {
            left: 15px;
            right: 15px;
            transform: translateY(-100px);
        }
        
        .notification.active {
            transform: translateY(0);
        }
        
        .notification-content {
            padding: 15px;
        }
        
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
        
        .modal-content {
            margin: 10px;
            max-height: 95vh;
        }
        
        .modal-header,
        .modal-body,
        .modal-footer {
            padding: 20px;
        }
        
        .modal-stats {
            flex-direction: column;
        }
        
        .modal-footer {
            flex-direction: column;
        }
        
        .modal-footer .btn {
            width: 100%;
        }
    }
    
    /* Form floating label styles */
    .form-group {
        position: relative;
    }
    
    .form-group.focused label {
        color: var(--primary);
        font-size: 0.85rem;
        transform: translateY(-25px);
    }
    
    /* Professional service card enhancements */
    .service-highlight-card .service-content {
        position: relative;
        z-index: 2;
    }
    
    .service-highlight-card .btn {
        margin-top: 15px;
    }
    
    /* Professional portfolio card enhancements */
    .portfolio-highlight-card .portfolio-content {
        position: relative;
        z-index: 2;
    }
    
    /* Professional stats enhancements */
    .business-stats-area .single-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    /* Professional contact enhancements */
    .contact-info-area .contact-info-item {
        transition: all 0.3s ease;
    }
    
    .contact-info-area .contact-info-item:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-3);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);