document.addEventListener('DOMContentLoaded', function() {
    
    const buttons = document.querySelectorAll('.action-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    
    function handleScroll() {
        
        const benefitItems = document.querySelectorAll('.benefit-item');
        benefitItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('animate')) {
                
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            }
        });
        
        
        const newsletterContainer = document.querySelector('.newsletter-container');
        if (newsletterContainer && isInViewport(newsletterContainer) && !newsletterContainer.classList.contains('animate')) {
            newsletterContainer.classList.add('animate');
        }
        
        
        const ratingBox = document.querySelector('.rating-box');
        if (ratingBox && isInViewport(ratingBox) && !ratingBox.classList.contains('animate')) {
            ratingBox.classList.add('animate');
        }
    }
    
    
    window.addEventListener('scroll', handleScroll);
    
    
    handleScroll();
}); 