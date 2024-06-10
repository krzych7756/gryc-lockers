   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel/slick/slick.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Intersection Observer for animations
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        const targets = document.querySelectorAll('.section');
        targets.forEach(target => observer.observe(target));

        // Stats Counter
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const counters = statsSection.querySelectorAll('h3');
            const statsObserverOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const statsObserverCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counters.forEach(counter => {
                            const updateCount = () => {
                                const target = +counter.getAttribute('data-target');
                                const count = +counter.innerText;
                                const increment = target / 100;

                                if (count < target) {
                                    counter.innerText = Math.ceil(count + increment);
                                    setTimeout(updateCount, 20);
                                } else {
                                    counter.innerText = target;
                                }
                            };
                            updateCount();
                        });
                    }
                });
            };

            const statsObserver = new IntersectionObserver(statsObserverCallback, statsObserverOptions);
            statsObserver.observe(statsSection);
        }

        // CSS Important Rule Enforcement
        function addImportantToRule(rule) {
            const style = rule.style;
            for (let i = 0; i < style.length; i++) {
                const propertyName = style[i];
                const propertyValue = style.getPropertyValue(propertyName);
                const priority = style.getPropertyPriority(propertyName);
                if (priority !== 'important') {
                    style.setProperty(propertyName, propertyValue, 'important');
                }
            }
        }

        function addImportantToAllCSSRules() {
            for (let i = 0; i < document.styleSheets.length; i++) {
                const styleSheet = document.styleSheets[i];
                try {
                    if (styleSheet.cssRules) {
                        const rules = styleSheet.cssRules || styleSheet.rules;
                        for (let j = 0; j < rules.length; j++) {
                            const rule = rules[j];
                            if (rule.style) {
                                addImportantToRule(rule);
                            } else if (rule.cssRules) {
                                for (let k = 0; k < rule.cssRules.length; k++) {
                                    addImportantToRule(rule.cssRules[k]);
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.warn('Unable to access stylesheet:', styleSheet, e);
                }
            }
        }

        addImportantToAllCSSRules();

        // Creator Carousel
        const wrapper = document.querySelector('.creator-wrapper');
        const items = document.querySelectorAll('.creator-item');
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');
        let currentIndex = 0;

        function updateCarousel() {
            const width = wrapper.clientWidth;
            wrapper.scrollTo({
                left: currentIndex * width,
                behavior: 'smooth'
            });
        }

        if (wrapper && items.length) {
            leftArrow.addEventListener('click', function () {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });

            rightArrow.addEventListener('click', function () {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });

            window.addEventListener('resize', updateCarousel);
        }

        // Intersection Observer for showing elements
        const sections = document.querySelectorAll('.section, .values, .cta, .contact-form, .use-cases, .testimonials, .creator, .product-images, .stats, footer');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        // Slick Carousel Initializations
        $('.use-cases .carousel').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: false,
            arrows: true,
            prevArrow: '<button class="left-arrow">&#9664;</button>',
            nextArrow: '<button class="right-arrow">&#9654;</button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        });

        $('.testimonials .testimonial-wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            arrows: false,
            pauseOnHover: true
        });

        $('.u-repeater-1').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            prevArrow: $('.u-gallery-nav-prev'),
            nextArrow: $('.u-gallery-nav-next'),
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        $('.u-gallery-nav-prev, .u-gallery-nav-next').on('touchstart touchmove', function (event) {
            event.preventDefault();
        }, { passive: true });
    });

 function expandContent(button) {
        const carouselItem = button.closest('.carousel-item');
        const extraContent = carouselItem.querySelector('.extra-content');
        const carousel = document.querySelector('.use-cases .carousel');

        if (carouselItem.classList.contains('expanded')) {
            carouselItem.classList.remove('expanded');
            extraContent.style.display = 'none';
            button.textContent = "Rozwiń";
        } else {
            const allCarouselItems = carousel.querySelectorAll('.carousel-item');
            allCarouselItems.forEach(item => {
                item.classList.remove('expanded');
                const itemExtraContent = item.querySelector('.extra-content');
                if (itemExtraContent) itemExtraContent.style.display = 'none';
                item.querySelector('button').textContent = "Rozwiń";
            });

            carouselItem.classList.add('expanded');
            extraContent.style.display = 'block';
            button.textContent = "Zwiń";
        }
    }
document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.getElementById("lightbox-content");
    const close = document.querySelector(".close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxContent.src = item.src;
        });
    });

    close.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightboxContent.src = "";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxContent) {
            lightbox.style.display = "none";
            lightboxContent.src = "";
        }
    });
});

</script>
