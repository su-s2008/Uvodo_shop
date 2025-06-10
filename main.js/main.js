document.addEventListener('DOMContentLoaded', function() {
    // Плавна прокрутка для навігаційних посилань
    const smoothScroll = function(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });

    // Фіксована навігація при прокрутці
    const header = document.querySelector('.main-header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > headerHeight) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });

    // Анімація появи елементів при прокрутці
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeIn = function() {
        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', fadeIn);
    fadeIn(); // Викликаємо один раз для елементів, які вже видимі при завантаженні

    // Модальне вікно для кнопки "Buy Uvodo now"
    const buyButton = document.querySelector('.cta-button');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');

    if (buyButton && modal && closeModal) {
        buyButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Форма зворотного зв'язку
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Тут можна додати логіку відправки форми, наприклад, через AJAX
            alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
            this.reset();
        });
    }
});