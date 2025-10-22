// ==================== //
// Navbar Scroll Effect //
// ==================== //
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== //
// Mobile Menu Toggle //
// ==================== //
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');

    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = navLinksContainer.classList.contains('active')
        ? 'rotate(45deg) translateY(10px)'
        : 'rotate(0) translateY(0)';
    spans[1].style.opacity = navLinksContainer.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinksContainer.classList.contains('active')
        ? 'rotate(-45deg) translateY(-10px)'
        : 'rotate(0) translateY(0)';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translateY(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translateY(0)';
    });
});

// ==================== //
// Active Navigation Link //
// ==================== //
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==================== //
// Animated Counter //
// ==================== //
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ==================== //
// Scroll Animations (AOS) //
// ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ==================== //
// Smooth Scroll //
// ==================== //
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

// ==================== //
// Scroll to Top Button //
// ==================== //
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== //
// Contact Form Handling //
// ==================== //
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message (you would typically send this to a backend)
    showNotification('Thank you! Your message has been received. We\'ll get back to you soon!', 'success');

    // Reset form
    contactForm.reset();

    // Log data (in production, send to backend)
    console.log('Form submitted:', data);
});

// ==================== //
// Notification System //
// ==================== //
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add styles dynamically
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: type === 'success'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        animation: 'slideInRight 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '400px',
        backdropFilter: 'blur(10px)'
    });

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ==================== //
// Service Cards Tilt Effect //
// ==================== //
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== //
// Parallax Effect for Hero //
// ==================== //
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    if (heroVisual) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// ==================== //
// Dynamic Gradient Animation //
// ==================== //
const gradientOrbs = document.querySelectorAll('.gradient-orb');

function animateOrbs() {
    gradientOrbs.forEach((orb, index) => {
        const speed = 0.0005 * (index + 1);
        const time = Date.now() * speed;

        const x = Math.sin(time) * 100;
        const y = Math.cos(time) * 100;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ==================== //
// Lazy Loading Images //
// ==================== //
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ==================== //
// Tech Stack Animation //
// ==================== //
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;

    // Add random floating animation
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = '';
        }, 10);
    });
});

// ==================== //
// Cursor Trail Effect //
// ==================== //
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.1;
    cursorY += dy * 0.1;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// ==================== //
// Form Input Animations //
// ==================== //
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Check if already has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ==================== //
// Performance Optimization //
// ==================== //
// Throttle function for scroll events
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

// Debounce function for resize events
function debounce(func, wait) {
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

// ==================== //
// Initialize on Load //
// ==================== //
window.addEventListener('load', () => {
    // Add loaded class to body for any load-specific animations
    document.body.classList.add('loaded');

    // Initial active nav link update
    updateActiveNavLink();

    // Log welcome message
    console.log('%c⚡ Automate Adelaide', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cWebsite designed with cutting-edge AI automation', 'font-size: 12px; color: #667eea;');
});

// ==================== //
// Easter Egg //
// ==================== //
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;

    if (clickCount === 5) {
        showNotification('You found the easter egg! 🎉 Contact us for a special discount!', 'success');
        clickCount = 0;
    }
});

// ==================== //
// Service Card Click Handler //
// ==================== //
const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = link.parentElement.querySelector('.service-title').textContent;
        showNotification(`Interested in ${serviceName}? Scroll down to contact us!`, 'success');

        // Scroll to contact section
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});

// ==================== //
// Keyboard Navigation //
// ==================== //
document.addEventListener('keydown', (e) => {
    // Press 'C' to scroll to contact
    if (e.key === 'c' || e.key === 'C') {
        if (!document.activeElement.matches('input, textarea, select')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Press 'H' to scroll to home
    if (e.key === 'h' || e.key === 'H') {
        if (!document.activeElement.matches('input, textarea, select')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// ==================== //
// Auto-update Copyright Year //
// ==================== //
const currentYear = new Date().getFullYear();
const copyrightText = document.querySelector('.footer-bottom p');
if (copyrightText) {
    copyrightText.textContent = `© ${currentYear} Automate Adelaide. All rights reserved.`;
}

// ==================== //
// Live Chat Functionality //
// ==================== //
const chatButton = document.getElementById('chatButton');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Toggle chat widget
chatButton.addEventListener('click', () => {
    chatWidget.classList.add('active');
    chatInput.focus();
});

chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('active');
});

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message${isUser ? ' user' : ''}`;
    messageDiv.innerHTML = `
        <div class="chat-message-avatar"><i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i></div>
        <div class="chat-message-content">${message}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
        <div class="chat-typing">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// Local AI Response System
// This simulates a local AI model. In production, you would connect this to a real local LLM
function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Knowledge base responses (Adelaide-focused)
    const responses = {
        greeting: [
            "G'day! I'm here to help you learn about our AI automation services for South Australian businesses. What would you like to know?",
            "Hi there! How can I assist you with automation for your Adelaide business today?",
            "Welcome! I'm your Adelaide AI assistant. What questions do you have about our locally-focused services?"
        ],
        automation: [
            "We offer comprehensive workflow automation that can save your South Australian business up to 40 hours weekly. Our solutions integrate seamlessly with your existing systems. Would you like to schedule a consultation at our Adelaide office?",
            "Our automation services include process automation, data integration, task scheduling, and intelligent routing. We specialise in solutions for Adelaide and regional SA businesses. Which area interests you most?"
        ],
        ai: [
            "We specialise in custom AI models tailored to South Australian business needs, including natural language processing, predictive analytics, and computer vision. What's your use case?",
            "Our AI solutions are designed specifically for Adelaide SMEs and regional SA businesses. We can build custom models that understand your data, industry, and local market. Tell me more about your needs."
        ],
        pricing: [
            "Our pricing is customised based on your specific needs and scale. We offer flexible packages for small, medium, and enterprise businesses across South Australia. Would you like to schedule a free consultation to discuss pricing?",
            "We provide affordable, scalable solutions with transparent Australian pricing. Each project is unique, so I recommend speaking with our Adelaide team for a detailed quote. Shall I help you set up a meeting?"
        ],
        contact: [
            "You can reach us at hello@automateadelaide.com.au or schedule a free consultation through our contact form. We're based in Adelaide CBD and serve businesses throughout South Australia.",
            "We'd love to hear from you! Email us at hello@automateadelaide.com.au or fill out the contact form below. Our Adelaide team typically responds within 24 hours during business hours (ACST)."
        ],
        default: [
            "That's a great question! Our team specialises in AI automation for Adelaide and South Australian businesses. Could you provide more details about what you're looking for?",
            "I'd be happy to help with that. Can you tell me more about your specific needs or challenges facing your SA business?",
            "Interesting question! To give you the best answer, could you share more about your business and what you're trying to achieve in the South Australian market?"
        ]
    };

    // Keyword matching
    if (message.match(/hello|hi|hey|greetings/i)) {
        return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (message.match(/automat|workflow|process/i)) {
        return responses.automation[Math.floor(Math.random() * responses.automation.length)];
    } else if (message.match(/ai|artificial intelligence|machine learning|ml/i)) {
        return responses.ai[Math.floor(Math.random() * responses.ai.length)];
    } else if (message.match(/price|pricing|cost|how much/i)) {
        return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
    } else if (message.match(/contact|email|phone|reach|talk/i)) {
        return responses.contact[Math.floor(Math.random() * responses.contact.length)];
    } else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}

// Handle chat form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, true);
    chatInput.value = '';

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    // Simulate AI thinking time (500-1500ms)
    const thinkingTime = 500 + Math.random() * 1000;

    setTimeout(() => {
        // Remove typing indicator
        typingIndicator.remove();

        // Get and add AI response
        const response = getAIResponse(message);
        addMessage(response);
    }, thinkingTime);
});

// ==================== //
// Custom Cursor Effect //
// ==================== //
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
const cursorFollower = document.createElement('div');
cursorFollower.className = 'custom-cursor-follower';

document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

let cursorPos = { x: 0, y: 0 };
let followerPos = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;
});

function animateCustomCursor() {
    cursor.style.left = cursorPos.x + 'px';
    cursor.style.top = cursorPos.y + 'px';

    followerPos.x += (cursorPos.x - followerPos.x) * 0.1;
    followerPos.y += (cursorPos.y - followerPos.y) * 0.1;

    cursorFollower.style.left = followerPos.x + 'px';
    cursorFollower.style.top = followerPos.y + 'px';

    requestAnimationFrame(animateCustomCursor);
}

animateCustomCursor();

// Expand cursor on hover over interactive elements
document.querySelectorAll('a, button, .service-card, .solution-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = 'rgba(102, 126, 234, 0.4)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'rgba(102, 126, 234, 0.8)';
    });
});

// ==================== //
// Particle System //
// ==================== //
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.bottom = '0px';
    particle.style.animationDuration = (5 + Math.random() * 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    document.querySelector('.background-animation').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Initial particles
for (let i = 0; i < 10; i++) {
    createParticle();
}

// ==================== //
// Enhanced Scroll Animations //
// ==================== //
const observerOptionsEnhanced = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptionsEnhanced);

// Add reveal animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px) scale(0.98)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// ==================== //
// Service Cards Enhanced 3D Effect //
// ==================== //
serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        card.style.boxShadow = `
            ${rotateY * 2}px ${-rotateX * 2}px 40px rgba(102, 126, 234, 0.3),
            0 0 60px rgba(102, 126, 234, 0.2)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
});

// ==================== //
// Gradient Orbs Enhanced Movement //
// ==================== //
const orbs = document.querySelectorAll('.gradient-orb');

function animateOrbsEnhanced() {
    orbs.forEach((orb, index) => {
        const speed = 0.0003 * (index + 1);
        const time = Date.now() * speed;

        const x = Math.sin(time) * 150 + Math.cos(time * 0.5) * 100;
        const y = Math.cos(time) * 150 + Math.sin(time * 0.7) * 80;
        const scale = 1 + Math.sin(time * 2) * 0.1;

        orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    });

    requestAnimationFrame(animateOrbsEnhanced);
}

animateOrbsEnhanced();

// ==================== //
// Add Neon Glow to Hero Title //
// ==================== //
const heroTitle = document.querySelector('.hero-title .gradient-text');
if (heroTitle) {
    heroTitle.classList.add('neon-glow');
}

// ==================== //
// Intersection Observer for Stats Counter //
// ==================== //
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat-number').forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) {
    statsObserver.observe(statsRow);
}

// ==================== //
// Add Glassmorphism to Cards //
// ==================== //
document.querySelectorAll('.service-card, .contact-form-container').forEach(card => {
    card.classList.add('glass-effect');
});

// ==================== //
// Console Art //
// ==================== //
console.log('%c  ⚡ AUTOMATE ADELAIDE ⚡  ', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 10px;');
console.log('%c🤖 AI-Powered Website | Enhanced with Advanced Animations', 'font-size: 14px; color: #667eea; font-weight: bold;');
console.log('%c💬 Try our live chat feature powered by local AI!', 'font-size: 12px; color: #4facfe;');
console.log('%cKeyboard Shortcuts:', 'font-size: 12px; color: #fff; font-weight: bold;');
console.log('%c  H - Scroll to Home', 'font-size: 11px; color: #888;');
console.log('%c  C - Scroll to Contact', 'font-size: 11px; color: #888;');

// ==================== //
// Performance Monitoring //
// ==================== //
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #4facfe; font-weight: bold;');
    }
});

// ==================== //
// Business Type Selector //
// ==================== //
const businessTypeData = {
    retail: {
        name: 'Retail & E-commerce',
        intro: 'Transform your retail operations with intelligent automation that predicts trends, personalises customer experiences, and optimises inventory.',
        automation: [
            'Automated inventory management and stock level predictions',
            'Smart pricing optimisation based on demand and competition',
            'Automated order processing and fulfillment workflows',
            'Email marketing automation with personalized campaigns'
        ],
        analytics: [
            'Customer behavior analysis and shopping pattern insights',
            'Sales forecasting and trend prediction',
            'Product performance analytics and recommendations',
            'Real-time dashboard for sales, inventory, and customer metrics'
        ],
        optimisation: [
            'Supply chain optimisation and vendor management',
            'Dynamic pricing strategies based on market conditions',
            'Warehouse layout optimisation for faster fulfilment',
            'Returns processing automation and fraud detection'
        ],
        customer: [
            'AI-powered chatbots for 24/7 customer support',
            'Personalized product recommendations',
            'Automated review management and sentiment analysis',
            'Loyalty program automation and customer segmentation'
        ]
    },
    professional: {
        name: 'Professional Services',
        intro: 'Streamline your professional services with AI that handles documentation, scheduling, and client communications, letting you focus on delivering value.',
        automation: [
            'Automated document generation and contract creation',
            'Intelligent appointment scheduling and calendar management',
            'Automated billing, invoicing, and payment reminders',
            'Email triage and response automation'
        ],
        analytics: [
            'Client portfolio analysis and risk assessment',
            'Time tracking and profitability analytics by client/project',
            'Resource allocation and capacity planning insights',
            'Performance metrics and KPI dashboards'
        ],
        optimisation: [
            'Workflow automation for case management',
            'Document management and intelligent search',
            'Client onboarding process optimisation',
            'Meeting scheduling optimisation to reduce conflicts'
        ],
        customer: [
            'Client portal for document sharing and communication',
            'Automated client status updates and reporting',
            'Smart intake forms with conditional logic',
            'Client satisfaction surveys and feedback analysis'
        ]
    },
    healthcare: {
        name: 'Healthcare & Wellness',
        intro: 'Enhance patient care with AI automation that handles administrative tasks, streamlines scheduling, and ensures compliance.',
        automation: [
            'Automated appointment scheduling and reminders',
            'Patient intake form processing and data entry',
            'Prescription refill automation',
            'Insurance verification and pre-authorization processing'
        ],
        analytics: [
            'Patient health trends and outcome analysis',
            'Resource utilisation and staff scheduling optimisation',
            'Treatment effectiveness tracking',
            'Financial performance and revenue cycle analytics'
        ],
        optimisation: [
            'Electronic health records (EHR) management and search',
            'Patient flow optimisation to reduce wait times',
            'Inventory management for medical supplies',
            'Compliance documentation and reporting automation'
        ],
        customer: [
            'Patient communication via SMS/email reminders',
            'Telehealth platform integration',
            'Patient feedback collection and analysis',
            'Educational content delivery based on conditions'
        ]
    },
    manufacturing: {
        name: 'Manufacturing & Logistics',
        intro: 'Optimize production and supply chain with AI-driven insights, predictive maintenance, and automated quality control.',
        automation: [
            'Production scheduling and workflow automation',
            'Automated quality control and defect detection',
            'Inventory and raw material ordering automation',
            'Shipping and logistics coordination'
        ],
        analytics: [
            'Predictive maintenance for equipment and machinery',
            'Production efficiency and OEE (Overall Equipment Effectiveness)',
            'Supply chain analytics and bottleneck identification',
            'Demand forecasting and production planning'
        ],
        optimisation: [
            'Route optimisation for delivery and logistics',
            'Warehouse layout and storage optimisation',
            'Energy consumption optimisation',
            'Workforce scheduling and shift planning'
        ],
        customer: [
            'Order tracking and customer notifications',
            'Automated customer service for order inquiries',
            'Quality feedback collection and analysis',
            'B2B portal for order management'
        ]
    },
    hospitality: {
        name: 'Hospitality & Tourism',
        intro: 'Deliver exceptional guest experiences with AI that personalises service, optimises bookings, and streamlines operations.',
        automation: [
            'Automated booking and reservation management',
            'Dynamic pricing based on demand and seasonality',
            'Guest check-in/check-out automation',
            'Housekeeping and maintenance task scheduling'
        ],
        analytics: [
            'Occupancy forecasting and revenue management',
            'Guest satisfaction and review sentiment analysis',
            'Staff performance and productivity tracking',
            'Market trends and competitive analysis'
        ],
        optimisation: [
            'Room allocation optimisation for maximum revenue',
            'Staff scheduling based on predicted demand',
            'Energy management and cost optimisation',
            'Inventory management for food, beverages, and supplies'
        ],
        customer: [
            'Personalized guest communications and offers',
            'AI concierge for guest inquiries and recommendations',
            'Post-stay feedback collection and analysis',
            'Loyalty program management and rewards automation'
        ]
    },
    realestate: {
        name: 'Real Estate & Property Management',
        intro: 'Transform property management with AI that automates tenant communications, maintenance, and market analysis.',
        automation: [
            'Automated tenant screening and application processing',
            'Lease generation and renewal automation',
            'Maintenance request tracking and vendor dispatch',
            'Rent collection and payment reminders'
        ],
        analytics: [
            'Property valuation and market trend analysis',
            'Rental yield and ROI calculations',
            'Tenant behavior and retention insights',
            'Portfolio performance dashboards'
        ],
        optimisation: [
            'Property marketing and listing optimisation',
            'Showing schedule coordination and optimisation',
            'Maintenance prioritisation and resource allocation',
            'Vacancy prediction and leasing strategy'
        ],
        customer: [
            'Tenant portal for maintenance requests and payments',
            'Automated property tour scheduling',
            'Virtual property tours with AI-guided presentations',
            'Tenant satisfaction surveys and feedback management'
        ]
    },
    construction: {
        name: 'Construction & Trades',
        intro: 'Build smarter with AI that manages projects, optimises scheduling, and ensures safety compliance.',
        automation: [
            'Project scheduling and task management automation',
            'Equipment tracking and maintenance scheduling',
            'Automated invoicing and progress billing',
            'Material ordering and inventory management'
        ],
        analytics: [
            'Project cost tracking and budget variance analysis',
            'Resource utilization and productivity metrics',
            'Safety incident tracking and analysis',
            'Timeline prediction and delay risk assessment'
        ],
        optimisation: [
            'Crew scheduling and workforce allocation',
            'Material waste reduction and optimisation',
            'Route optimisation for multiple job sites',
            'Permit tracking and compliance management'
        ],
        customer: [
            'Client project updates and milestone notifications',
            'Photo documentation and progress reporting',
            'Change order management and approval workflows',
            'Customer feedback and quality assurance surveys'
        ]
    },
    education: {
        name: 'Education & Training',
        intro: 'Enhance learning outcomes with AI that personalizes education, automates administration, and tracks student progress.',
        automation: [
            'Automated course enrollment and scheduling',
            'Assignment grading and feedback generation',
            'Attendance tracking and parent notifications',
            'Certification and credential management'
        ],
        analytics: [
            'Student performance tracking and early intervention alerts',
            'Learning style analysis and personalization',
            'Course effectiveness and completion rate analysis',
            'Resource allocation and capacity planning'
        ],
        optimisation: [
            'Curriculum optimisation based on learning outcomes',
            'Classroom and resource scheduling',
            'Student-teacher matching for optimal learning',
            'Digital content recommendation and delivery'
        ],
        customer: [
            'Student/parent communication portal',
            'AI tutoring and homework assistance',
            'Personalized learning path recommendations',
            'Progress reports and achievement notifications'
        ]
    },
    finance: {
        name: 'Finance & Insurance',
        intro: 'Secure your operations with AI that detects fraud, automates compliance, and provides intelligent insights.',
        automation: [
            'Automated transaction processing and reconciliation',
            'Document processing for loan/insurance applications',
            'Compliance reporting and regulatory filing automation',
            'Customer onboarding and KYC (Know Your Customer) verification'
        ],
        analytics: [
            'Fraud detection and anomaly identification',
            'Risk assessment and credit scoring',
            'Portfolio performance and investment analysis',
            'Customer lifetime value and churn prediction'
        ],
        optimisation: [
            'Claims processing workflow optimisation',
            'Underwriting process automation and decisioning',
            'Cash flow forecasting and treasury management',
            'Expense categorisation and budget tracking'
        ],
        customer: [
            'AI-powered financial advisors and chatbots',
            'Personalized product recommendations',
            'Automated customer service for account inquiries',
            'Proactive alerts for unusual activity or opportunities'
        ]
    },
    marketing: {
        name: 'Marketing & Creative Services',
        intro: 'Amplify your creative impact with AI that optimises campaigns, generates content ideas, and analyses performance.',
        automation: [
            'Social media posting and scheduling automation',
            'Email campaign creation and delivery',
            'Ad campaign management and bidding optimisation',
            'Content distribution across multiple channels'
        ],
        analytics: [
            'Campaign performance tracking and ROI analysis',
            'Audience segmentation and behavior insights',
            'Competitor analysis and market positioning',
            'Content engagement metrics and optimisation recommendations'
        ],
        optimisation: [
            'A/B testing automation for ads and content',
            'Budget allocation across channels for maximum ROI',
            'SEO optimisation and keyword strategy',
            'Influencer identification and outreach prioritisation'
        ],
        customer: [
            'Personalized content delivery based on user behavior',
            'Chatbots for lead qualification and nurturing',
            'Dynamic landing pages tailored to visitor segments',
            'Customer journey mapping and touchpoint optimisation'
        ]
    },
    technology: {
        name: 'Technology & Software',
        intro: 'Accelerate development with AI that automates testing, monitors systems, and provides intelligent code assistance.',
        automation: [
            'Automated testing and continuous integration/deployment (CI/CD)',
            'Code review and quality assurance automation',
            'Bug triage and ticket routing',
            'Documentation generation from code'
        ],
        analytics: [
            'System performance monitoring and anomaly detection',
            'User behavior analytics and feature usage tracking',
            'Code quality metrics and technical debt analysis',
            'DevOps metrics and deployment success rates'
        ],
        optimisation: [
            'Resource scaling and cloud cost optimisation',
            'Database query optimisation',
            'API performance monitoring and optimisation',
            'Development workflow and sprint planning optimisation'
        ],
        customer: [
            'AI-powered customer support and troubleshooting',
            'Automated onboarding and user education',
            'Feature request prioritization based on user impact',
            'Proactive issue detection and customer notifications'
        ]
    },
    food: {
        name: 'Food & Beverage',
        intro: 'Serve better experiences with AI that manages inventory, optimises menus, and personalises customer interactions.',
        automation: [
            'Automated inventory tracking and supplier ordering',
            'Online ordering and delivery coordination',
            'Staff scheduling based on predicted demand',
            'Recipe costing and menu pricing automation'
        ],
        analytics: [
            'Sales forecasting by time, day, and season',
            'Menu item performance and profitability analysis',
            'Customer preferences and dietary trend analysis',
            'Food waste tracking and reduction insights'
        ],
        optimisation: [
            'Kitchen workflow and prep time optimisation',
            'Delivery route optimisation for food service',
            'Table turnover and seating optimisation',
            'Energy consumption monitoring for kitchen equipment'
        ],
        customer: [
            'Personalized menu recommendations',
            'Loyalty program and rewards automation',
            'Reservation management and waitlist optimisation',
            'Feedback collection and review response automation'
        ]
    },
    automotive: {
        name: 'Automotive Services',
        intro: 'Drive efficiency with AI that schedules service, manages parts inventory, and predicts maintenance needs.',
        automation: [
            'Service appointment scheduling and reminders',
            'Parts inventory and ordering automation',
            'Vehicle inspection report generation',
            'Automated invoicing and payment processing'
        ],
        analytics: [
            'Service history tracking and predictive maintenance',
            'Technician productivity and efficiency metrics',
            'Parts usage trends and inventory optimisation',
            'Customer retention and service interval analysis'
        ],
        optimisation: [
            'Bay scheduling and workflow optimisation',
            'Warranty claim processing automation',
            'Diagnostic process optimisation',
            'Fleet management and vehicle tracking'
        ],
        customer: [
            'Service status updates and completion notifications',
            'Vehicle maintenance reminders and recall alerts',
            'Digital vehicle inspection reports with photos',
            'Customer feedback and satisfaction surveys'
        ]
    },
    fitness: {
        name: 'Fitness & Sports',
        intro: 'Energise your business with AI that personalises training, tracks progress, and optimises member engagement.',
        automation: [
            'Class scheduling and booking automation',
            'Membership management and renewal reminders',
            'Trainer scheduling and client matching',
            'Automated billing and payment processing'
        ],
        analytics: [
            'Member engagement and retention analytics',
            'Workout effectiveness and progress tracking',
            'Class attendance patterns and popularity',
            'Revenue analysis by service type and time period'
        ],
        optimisation: [
            'Personalised workout plan generation',
            'Equipment maintenance scheduling',
            'Space utilisation and class timing optimisation',
            'Nutrition plan creation and tracking'
        ],
        customer: [
            'Member mobile app with workout tracking',
            'AI fitness coach and form correction',
            'Progress notifications and achievement badges',
            'Community features and challenge automation'
        ]
    },
    beauty: {
        name: 'Beauty & Personal Care',
        intro: 'Beautify your operations with AI that manages bookings, personalizes treatments, and builds client loyalty.',
        automation: [
            'Online booking and appointment scheduling',
            'Automated appointment reminders and confirmations',
            'Inventory management for products and supplies',
            'Staff scheduling and shift management'
        ],
        analytics: [
            'Client preference tracking and service history',
            'Service popularity and revenue analysis',
            'Staff performance and utilization metrics',
            'Retail product sales and recommendation opportunities'
        ],
        optimisation: [
            'Appointment scheduling to minimise gaps',
            'Treatment duration optimisation',
            'Product recommendation based on client profile',
            'Marketing campaign timing and targeting'
        ],
        customer: [
            'Personalized treatment recommendations',
            'Loyalty rewards and referral program automation',
            'Before/after photo tracking and sharing',
            'Automated follow-up and rebooking suggestions'
        ]
    }
};

// Business Type Selector Handler
const businessTypeSelect = document.getElementById('businessType');
const solutionDisplay = document.getElementById('solutionDisplay');

if (businessTypeSelect) {
    businessTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;

        if (selectedType && businessTypeData[selectedType]) {
            const data = businessTypeData[selectedType];

            // Update solution title and intro
            document.getElementById('solutionTitle').textContent = data.name;
            document.getElementById('solutionIntro').textContent = data.intro;
            document.getElementById('businessTypeName').textContent = data.name;

            // Populate automation list
            const automationList = document.getElementById('automationList');
            automationList.innerHTML = data.automation.map(item => `<li>${item}</li>`).join('');

            // Populate analytics list
            const analyticsList = document.getElementById('analyticsList');
            analyticsList.innerHTML = data.analytics.map(item => `<li>${item}</li>`).join('');

            // Populate optimisation list
            const optimisationList = document.getElementById('optimizationList');
            optimisationList.innerHTML = data.optimisation.map(item => `<li>${item}</li>`).join('');

            // Populate customer list
            const customerList = document.getElementById('customerList');
            customerList.innerHTML = data.customer.map(item => `<li>${item}</li>`).join('');

            // Show solution display with animation
            solutionDisplay.style.display = 'block';
            setTimeout(() => {
                solutionDisplay.style.opacity = '1';
                solutionDisplay.style.transform = 'translateY(0)';
            }, 10);

            // Scroll to solution display
            setTimeout(() => {
                solutionDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            // Hide solution display
            solutionDisplay.style.opacity = '0';
            solutionDisplay.style.transform = 'translateY(20px)';
            setTimeout(() => {
                solutionDisplay.style.display = 'none';
            }, 300);
        }
    });
}

// ==================== //
// Accordion Functionality //
// ==================== //
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all accordions
        accordionItems.forEach(accordionItem => {
            accordionItem.classList.remove('active');
        });

        // Open clicked accordion if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Open first accordion by default
if (accordionItems.length > 0) {
    accordionItems[0].classList.add('active');
}

// ==================== //
// Leader Section Tabs //
// ==================== //
const expandBtns = document.querySelectorAll('.expand-btn');
const contentSections = document.querySelectorAll('.content-section');

expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');

        // Remove active from all buttons
        expandBtns.forEach(b => b.classList.remove('active'));

        // Remove active from all content sections
        contentSections.forEach(s => s.classList.remove('active'));

        // Add active to clicked button
        btn.classList.add('active');

        // Add active to corresponding content section
        const targetSection = document.getElementById(`${section}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ==================== //
// Contact Form Toggle //
// ==================== //
const openAIChatBtn = document.getElementById('openAIChat');
const showEmailFormBtn = document.getElementById('showEmailForm');
const emailFormContainer = document.getElementById('emailFormContainer');
const closeEmailFormBtn = document.getElementById('closeEmailForm');

if (openAIChatBtn) {
    openAIChatBtn.addEventListener('click', () => {
        // Open the existing chat widget
        const chatWidget = document.getElementById('chatWidget');
        const chatInput = document.getElementById('chatInput');
        if (chatWidget) {
            chatWidget.classList.add('active');
            if (chatInput) {
                chatInput.focus();
            }
        }
    });
}

if (showEmailFormBtn) {
    showEmailFormBtn.addEventListener('click', () => {
        emailFormContainer.style.display = 'block';
        setTimeout(() => {
            emailFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });
}

if (closeEmailFormBtn) {
    closeEmailFormBtn.addEventListener('click', () => {
        emailFormContainer.style.display = 'none';
    });
}
