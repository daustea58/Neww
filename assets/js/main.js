// Main interactive features

// Scroll fade animation for timeline
function initScrollFade() {
    const scrollElements = document.querySelectorAll('.scroll-fade');
    
    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check
}

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initScrollFade };
}
