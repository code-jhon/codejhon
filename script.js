// Theme Toggle Functionality
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle dark mode');

// Add theme toggle to navigation
const navContainer = document.querySelector('.nav-container');
if (navContainer) {
    navContainer.appendChild(themeToggle);
}

// Theme management
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    // Update navbar background based on scroll position and new theme
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        if (newTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        navbar.style.background = '';
    }
});

// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '';
        navbar.style.backdropFilter = '';
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Build WhatsApp message
    const whatsappMessage = buildWhatsAppMessage(name, email, subject, message);

    // WhatsApp phone number (using the number from contact info: +57 300 2685861)
    const phoneNumber = '573002685861'; // Remove spaces and + for WhatsApp API

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Update submit button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Opening WhatsApp...';
    submitBtn.disabled = true;

    // Open WhatsApp in new tab
    try {
        window.open(whatsappURL, '_blank');

        // Show success message and reset form
        setTimeout(() => {
            showFormMessage('WhatsApp opened! Your message is ready to send.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    } catch (error) {
        showFormMessage('Unable to open WhatsApp. Please try again or contact us directly at +57 300 2685861', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Build WhatsApp message with proper formatting
function buildWhatsAppMessage(name, email, subject, message) {
    return `Hello CodeJhon! 👋

I'm reaching out through your website contact form.

*Subject:* ${subject}

*From:* ${name}
*Email:* ${email}

*Message:*
${message}

Thanks for your time! 😊

---
_Sent via CodeJhon website contact form_`;
}

// Show form messages with proper styling
function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;

    // Insert message before the form
    const contactForm = document.querySelector('.contact-form');
    contactForm.parentNode.insertBefore(messageElement, contactForm);

    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .skill-category, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < titleText.length) {
        heroTitle.textContent += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Stats counter animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';

        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const profileCard = document.querySelector('.profile-card');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    if (profileCard) {
        profileCard.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add active class to current navigation item
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
        position: relative;
    }

    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #2563eb;
    }
`;
document.head.appendChild(style);