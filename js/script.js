document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 2000);

    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        navToggle.classList.toggle('active');
    });

    // DRS animation
    const drsToggle = document.querySelector('.drs-toggle');
    const drsFlap = document.querySelector('.drs-flap');
    
    drsToggle.addEventListener('click', function() {
        drsFlap.classList.toggle('open');
        if (drsFlap.classList.contains('open')) {
            drsToggle.textContent = 'DESACTIVAR DRS';
        } else {
            drsToggle.textContent = 'ACTIVAR DRS';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile nav if open
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    });

    // Legends carousel navigation
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const legendsCarousel = document.querySelector('.legends-carousel');
    const dots = document.querySelectorAll('.dot');
    
    if (prevBtn && nextBtn && legendsCarousel) {
        let scrollAmount = 0;
        const cardWidth = 380; // Card width + gap
        
        nextBtn.addEventListener('click', function() {
            scrollAmount += cardWidth;
            if (scrollAmount > (legendsCarousel.scrollWidth - legendsCarousel.clientWidth)) {
                scrollAmount = legendsCarousel.scrollWidth - legendsCarousel.clientWidth;
            }
            legendsCarousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateActiveDot();
        });
        
        prevBtn.addEventListener('click', function() {
            scrollAmount -= cardWidth;
            if (scrollAmount < 0) {
                scrollAmount = 0;
            }
            legendsCarousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateActiveDot();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                scrollAmount = index * cardWidth;
                legendsCarousel.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                updateActiveDot(index);
            });
        });
        
        function updateActiveDot(forcedIndex) {
            const index = typeof forcedIndex !== 'undefined' ? forcedIndex : Math.round(scrollAmount / cardWidth);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    // Reveal animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
});