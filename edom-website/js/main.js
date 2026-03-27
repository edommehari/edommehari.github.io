// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Toggle hamburger animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (mobileMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Reveal Animations utilizing Intersection Observer
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Observer options
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // trigger slightly before bottom
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animateElements.forEach(el => scrollObserver.observe(el));

    // 4. Smooth Scrolling for Anchor Links (Backup to CSS behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // height of fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Interactive Value Prop Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and hide all contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.style.display = 'none');

                // Add active class to clicked button and show its target content
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).style.display = 'block';
            });
        });
    }

    // 6. Form Submission Mailto Formatting
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const event = document.getElementById('event').value;
            const message = document.getElementById('message').value;
            
            // Format the mailto string
            const subject = encodeURIComponent(`${event}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage/Details:\n${message}`);
            
            // Open default email client
            window.location.href = `mailto:Edommehari@gmail.com?subject=${subject}&body=${body}`;
            
            // Optional: reset the form
            bookingForm.reset();
        });
    }

    // 7. Testimonial Carousel
    const track = document.getElementById('testimonialTrack');
    if (track) {
        const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
        const nextBtn = document.getElementById('nextTestimonial');
        const prevBtn = document.getElementById('prevTestimonial');
        const indicators = Array.from(document.querySelectorAll('.carousel-indicators .indicator'));
        
        let currentIndex = 0;
        let timer;
        
        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            slides.forEach((s, i) => s.classList.toggle('active', i === index));
            indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
        };
        
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        };
        
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentIndex);
        };
        
        const resetTimer = () => {
            clearInterval(timer);
            timer = setInterval(nextSlide, 7000); // Auto-rotate every 7s
        };

        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
        
        if(indicators.length > 0) {
            indicators.forEach(indicator => {
                indicator.addEventListener('click', (e) => {
                    currentIndex = parseInt(e.target.getAttribute('data-index'));
                    updateCarousel(currentIndex);
                    resetTimer();
                });
            });
        }

        // Initialize auto-rotation
        timer = setInterval(nextSlide, 7000);
    }
});
