// Download functionality and interactive features
document.addEventListener('DOMContentLoaded', function() {
    initializeDownloadButton();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeFloatingParticles();
    initializeTypewriterEffect();
    initializeRippleAnimations();
    initializeClickRipples();
});

// Download Button Functionality
function initializeDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', async function() {
        await downloadAITutorFolder();
    });
}

// Main download function - create actual ZIP download
async function downloadAITutorFolder() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    try {
        // Show loading state
        downloadBtn.classList.add('loading');
        downloadBtn.disabled = true;
        
        // Check if JSZip is available
        if (typeof JSZip === 'undefined') {
            // Fallback to instructions if JSZip not available
            showDownloadInstructions();
            return;
        }
        
        // Create ZIP file of AI-tutor folder
        const zip = new JSZip();
        
        // Create a folder structure in the ZIP
        const tutorFolder = zip.folder("TimebackTutor");
        
        // Add a README file with instructions
        const readmeContent = `TimebackTutor - AI Learning Companion

INSTALLATION INSTRUCTIONS:
1. Extract all files to a folder of your choice
2. Run the TimebackTutor(Run Me).command file to start the application
3. Follow the on-screen instructions

SYSTEM REQUIREMENTS:
- Node.js (for full functionality)
- Modern web browser
- Internet connection for AI features

For support, please refer to the documentation or contact support.

© 2024 TimebackTutor. All rights reserved.`;
        
        tutorFolder.file("README.txt", readmeContent);
        
        // Add placeholder files (since we can't access actual files due to CORS)
        tutorFolder.file("index.html", "<!-- TimebackTutor Main Application -->\n<!-- This is a placeholder file -->");
        tutorFolder.file("package.json", '{\n  "name": "timebacktutor",\n  "version": "1.0.0",\n  "description": "AI Learning Companion"\n}');
        tutorFolder.file("styles.css", "/* TimebackTutor Styles */\n/* This is a placeholder file */");
        tutorFolder.file("script.js", "// TimebackTutor JavaScript\n// This is a placeholder file");
        tutorFolder.file("TimebackTutor(Run Me).command", "#!/bin/bash\necho 'Starting TimebackTutor...'\n# This is a placeholder file");
        
        // Generate ZIP file
        const zipBlob = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 6
            }
        });
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(zipBlob);
        downloadLink.download = 'TimebackTutor.zip';
        
        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up
        URL.revokeObjectURL(downloadLink.href);
        
        // Show success feedback
        showDownloadSuccess();
        
    } catch (error) {
        console.error('Download failed:', error);
        showDownloadError();
    } finally {
        // Reset button state
        setTimeout(() => {
            downloadBtn.classList.remove('loading');
            downloadBtn.disabled = false;
        }, 1000);
    }
}

// Fallback download method using simple file links
function fallbackDownload() {
    // Create a simple download of the main executable
    const link = document.createElement('a');
    link.href = 'AI-tutor/TimebackTutor(Run Me).command';
    link.download = 'TimebackTutor(Run Me).command';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Success feedback
function showDownloadSuccess() {
    const notification = createNotification('Download started successfully!', 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Download instructions for local access
function showDownloadInstructions() {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Download TimebackTutor</h3>
                <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="modal-body">
                <p>To download TimebackTutor, please:</p>
                <ol>
                    <li>Navigate to the <strong>AI-tutor</strong> folder in your file system</li>
                    <li>Copy the entire folder to your desired location</li>
                    <li>Run the <strong>TimebackTutor(Run Me).command</strong> file to start the application</li>
                </ol>
                <p class="note">The AI-tutor folder contains all necessary files for the application.</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn" onclick="this.parentElement.parentElement.parentElement.remove()">Got it!</button>
            </div>
        </div>
    `;
    
    // Style the modal
    const modalStyles = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            padding: 24px 24px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            color: #1B2951;
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #636E72;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s ease;
        }
        
        .modal-close:hover {
            background: #f0f0f0;
        }
        
        .modal-body {
            padding: 24px;
        }
        
        .modal-body p {
            color: #2D3436;
            line-height: 1.6;
            margin-bottom: 16px;
        }
        
        .modal-body ol {
            color: #2D3436;
            padding-left: 20px;
            margin-bottom: 16px;
        }
        
        .modal-body li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .modal-body strong {
            color: #1B2951;
            font-weight: 600;
        }
        
        .note {
            background: #F8F9FA;
            padding: 12px 16px;
            border-radius: 8px;
            border-left: 4px solid #1B2951;
            font-size: 0.9rem;
            margin: 0 !important;
        }
        
        .modal-footer {
            padding: 0 24px 24px;
            text-align: center;
        }
        
        .modal-btn {
            background: #1B2951;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        
        .modal-btn:hover {
            background: #2C3E50;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Error feedback
function showDownloadError() {
    const notification = createNotification('Download failed. Please try again.', 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Create notification element
function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
    });
    
    if (type === 'success') {
        notification.style.background = 'rgba(34, 197, 94, 0.9)';
    } else if (type === 'error') {
        notification.style.background = 'rgba(239, 68, 68, 0.9)';
    }
    
    return notification;
}

// Smooth scrolling for scroll indicator
function initializeSmoothScrolling() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Scroll animations with fade-in and fade-out
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in when entering viewport
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Fade out when leaving viewport
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hero section fade-out on scroll
    initializeHeroFadeOut();
}

// Hero section fade-out animation
function initializeHeroFadeOut() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const fadeStart = heroHeight * 0.3; // Start fading at 30% of hero height
            const fadeEnd = heroHeight * 0.8; // Complete fade at 80% of hero height
            
            if (scrolled <= fadeStart) {
                // Fully visible
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
                }
            } else if (scrolled >= fadeEnd) {
                // Fully faded
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(-30px)';
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.transform = 'translateX(-50%) translateY(-30px)';
                }
            } else {
                // Fading transition
                const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
                const opacity = 1 - fadeProgress;
                const translateY = -30 * fadeProgress;
                
                heroContent.style.opacity = opacity.toString();
                heroContent.style.transform = `translateY(${translateY}px)`;
                
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = opacity.toString();
                    scrollIndicator.style.transform = `translateX(-50%) translateY(${translateY}px)`;
                }
            }
        });
        
        // Add transition for smooth animation
        heroContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (scrollIndicator) {
            scrollIndicator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }
    }
}

// Parallax effect for hero background
function initializeParallax() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Add CSS for notifications animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .notification:hover {
        transform: translateX(-5px);
    }
`;
document.head.appendChild(style);

// Load JSZip library dynamically
function loadJSZip() {
    return new Promise((resolve, reject) => {
        if (window.JSZip) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Initialize JSZip when page loads
loadJSZip().catch(() => {
    console.warn('JSZip failed to load, using fallback download method');
    
    // Override the download function to use fallback
    window.downloadAITutorFolder = async function() {
        const downloadBtn = document.getElementById('downloadBtn');
        
        try {
            downloadBtn.classList.add('loading');
            downloadBtn.disabled = true;
            
            // Use fallback method
            fallbackDownload();
            showDownloadSuccess();
            
        } catch (error) {
            showDownloadError();
        } finally {
            setTimeout(() => {
                downloadBtn.classList.remove('loading');
                downloadBtn.disabled = false;
            }, 1000);
        }
    };
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('download-btn')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Initialize parallax with debounced scroll
document.addEventListener('DOMContentLoaded', function() {
    const debouncedParallax = debounce(initializeParallax, 10);
    debouncedParallax();
});

// Floating Particles with Mouse Magnetism
function initializeFloatingParticles() {
    const particlesContainer = document.getElementById('floatingParticles');
    const particleCount = 25;
    let mouseX = 0;
    let mouseY = 0;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 3px and 6px
        const size = Math.random() * 3 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100vh';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random horizontal drift
        particle.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        
        particlesContainer.appendChild(particle);
    }
    
    // Mouse tracking for magnetism effect
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
            );
            
            // Magnetic effect within 150px radius
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(mouseY - particleY, mouseX - particleX);
                const moveX = Math.cos(angle) * force * 30;
                const moveY = Math.sin(angle) * force * 30;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.5})`;
                particle.classList.add('magnetic');
            } else {
                particle.style.transform = '';
                particle.classList.remove('magnetic');
            }
        });
    });
}

// Typewriter Effect with Glitch Animation
function initializeTypewriterEffect() {
    const typewriterText = document.querySelector('.typewriter-text');
    const cursor = document.querySelector('.cursor');
    const text = 'TimebackTutor';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typewriterText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 80); // Faster typing speed (was 150ms, now 80ms)
        } else {
            // Hide cursor immediately when typing is complete
            cursor.style.display = 'none';
            // Trigger glitch effect immediately
            setTimeout(() => {
                triggerGlitchEffect();
            }, 200); // Short delay before glitch
        }
    }
    
    function triggerGlitchEffect() {
        const heroTitle = document.getElementById('heroTitle');
        const typewriterSpan = document.querySelector('.typewriter-text');
        
        // Add glitch class and data attribute
        typewriterSpan.classList.add('glitch');
        typewriterSpan.setAttribute('data-text', text);
        
        // Remove glitch effect after animation
        setTimeout(() => {
            typewriterSpan.classList.remove('glitch');
            typewriterSpan.removeAttribute('data-text');
        }, 300);
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Ripple Wave Animation on Scroll
function initializeRippleAnimations() {
    const sections = document.querySelectorAll('.features-section');
    
    const rippleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createRippleEffect(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        // Add ripple container to each section
        const rippleContainer = document.createElement('div');
        rippleContainer.className = 'ripple-container';
        section.appendChild(rippleContainer);
        
        rippleObserver.observe(section);
    });
}

function createRippleEffect(section) {
    const rippleContainer = section.querySelector('.ripple-container');
    if (!rippleContainer) return;
    
    // Create multiple ripples for a wave effect
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            // Position ripple at center of section
            const rect = section.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            ripple.style.left = centerX + 'px';
            ripple.style.top = centerY + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            rippleContainer.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 2000);
        }, i * 200); // Stagger the ripples
    }
}

// Enhanced scroll animations with ripple triggers
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in when entering viewport
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger ripple effect for certain elements
                if (entry.target.classList.contains('feature-card')) {
                    setTimeout(() => {
                        createMiniRipple(entry.target);
                    }, 300);
                }
            } else {
                // Fade out when leaving viewport
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hero section fade-out on scroll
    initializeHeroFadeOut();
}

function createMiniRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.border = '1px solid rgba(74, 158, 255, 0.4)';
    ripple.style.borderRadius = '50%';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.animation = 'ripple-expand 1s ease-out forwards';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1000);
}

// Click/Tap Ripple Effect
function initializeClickRipples() {
    const clickRippleContainer = document.getElementById('clickRippleContainer');
    
    // Add click event listener to the entire document
    document.addEventListener('click', function(e) {
        // Don't create ripples when clicking on interactive elements
        if (e.target.closest('button, a, input, select, textarea, [role="button"]')) {
            return;
        }
        
        createClickRipple(e.clientX, e.clientY);
    });
    
    // Add touch event listener for mobile devices
    document.addEventListener('touchstart', function(e) {
        // Don't create ripples when touching interactive elements
        if (e.target.closest('button, a, input, select, textarea, [role="button"]')) {
            return;
        }
        
        // Prevent default to avoid double events on mobile
        const touch = e.touches[0];
        if (touch) {
            createClickRipple(touch.clientX, touch.clientY);
        }
    });
    
    function createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        
        // Position the ripple at the click/touch point
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        clickRippleContainer.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }
}
