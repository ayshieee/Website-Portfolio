document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = mobileMenuBtn?.querySelector('i');

    if (mobileMenuBtn && navMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            });
        });
    }

    document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop;
            if (window.scrollY >= top - 100) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    const animateSkills = () => {
        const bars = document.querySelectorAll('.progress-fill');
        bars.forEach(bar => {
            const level = bar.dataset.level;
            if (level) {
                const rect = bar.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    bar.style.width = level + '%';
                }
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    setTimeout(animateSkills, 500);

    let currentCertIndex = 0;
    const certItems = document.querySelectorAll('.cert-item');
    const certDots = document.querySelectorAll('.cert-dot');

    const showCert = (index) => {
        certItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        certDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    if (certItems.length > 0) {
        setInterval(() => {
            currentCertIndex = (currentCertIndex + 1) % certItems.length;
            showCert(currentCertIndex);
        }, 3000);
    }

    if (certDots.length > 0) {
        certDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentCertIndex = index;
                showCert(currentCertIndex);
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section, .glass-card, .skill-item, .project-card').forEach(el => {
        observer.observe(el);
    });
});