document.addEventListener('DOMContentLoaded', function() {
    const parallaxBg = document.getElementById('parallax-bg');
    const overlayGradient = parallaxBg.querySelector('.overlay-gradient');
    const heroContent = document.querySelector('.hero-content');
    
    let pulseIntensity = 0;
    let pulseIncreasing = true;
    
    function animatePulse() {
        if (pulseIncreasing) {
            pulseIntensity += 0.01;
            if (pulseIntensity >= 0.15) pulseIncreasing = false;
        } else {
            pulseIntensity -= 0.01;
            if (pulseIntensity <= 0) pulseIncreasing = true;
        }
        
        requestAnimationFrame(animatePulse);
    }
    
    animatePulse();
    
    document.addEventListener('mousemove', (e) => {
        if (parallaxBg) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            overlayGradient.style.background = `radial-gradient(
                circle at ${mouseX * 100}% ${mouseY * 100}%, 
                rgba(10, 14, 23, 0.2) 0%, 
                rgba(10, 14, 23, 0.6) 40%, 
                rgba(10, 14, 23, 0.85) 100%)`;
            
            const distanceX = Math.abs(mouseX - 0.5);
            const distanceY = Math.abs(mouseY - 0.5);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const intensity = Math.max(0.1, 1 - distance * 2) + pulseIntensity;
            
            heroContent.style.boxShadow = `0 0 30px rgba(0, 204, 255, ${intensity * 0.2}), 
                                          0 0 50px rgba(0, 204, 255, ${intensity * 0.1})`;
        }
    });
    
    document.addEventListener('mouseleave', () => {
        if (overlayGradient) {
            overlayGradient.style.background = `radial-gradient(
                circle at center, 
                rgba(10, 14, 23, 0.2) 0%, 
                rgba(10, 14, 23, 0.6) 50%, 
                rgba(10, 14, 23, 0.85) 100%)`;
            
            heroContent.style.boxShadow = `0 0 30px rgba(0, 204, 255, 0.1)`;
        }
    });
    
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        
        let startTime = null;
        const startValue = 0;
        
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = progress * target;
            
            counter.textContent = target > 100 
                ? currentValue.toFixed(2) 
                : Math.floor(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    const cyberGrid = document.querySelector('.cyber-grid');
    if (cyberGrid) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            cyberGrid.style.transform = `perspective(1000px) rotateX(${y * 2}deg) rotateY(${-x * 2}deg)`;
        });
    }
    
    const hologram = document.querySelector('.image-hologram');
    if (hologram) {
        document.addEventListener('mousemove', (e) => {
            const bounds = hologram.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const angleX = (mouseY - centerY) / 10;
            const angleY = (mouseX - centerX) / 10;
            
            hologram.style.transform = `perspective(1000px) rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
        });
        
        hologram.addEventListener('mouseleave', () => {
            hologram.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    const animateElements = document.querySelectorAll('.cyber-card, .chart-container, .data-point');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(element);
    });
    
    const glitchText = document.querySelector('.glitch-text');
    
    if (glitchText) {
        setInterval(() => {
            const intensity = Math.random() * 3;
            glitchText.style.textShadow = `
                ${Math.random() * intensity - intensity/2}px ${Math.random() * intensity - intensity/2}px var(--neon-blue),
                ${Math.random() * intensity - intensity/2}px ${Math.random() * intensity - intensity/2}px var(--neon-pink)
            `;
            
            setTimeout(() => {
                glitchText.style.textShadow = '';
            }, 100);
        }, 3000);
    }
    
    const cyberButtons = document.querySelectorAll('.cyber-button, .cyber-button-large');
    
    cyberButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playSound('hover');
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            playSound('click');
            
            const ripple = document.createElement('div');
            ripple.className = 'button-ripple';
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - (size/2)}px`;
            ripple.style.top = `${e.clientY - rect.top - (size/2)}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    function playSound(type) {
        console.log(`Playing ${type} sound`);
    }
    
    const scanlineEffect = document.createElement('div');
    scanlineEffect.className = 'scanline-effect';
    document.body.appendChild(scanlineEffect);
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.style.left = `${e.clientX}px`;
        cursorTrail.style.top = `${e.clientY}px`;
    });
});