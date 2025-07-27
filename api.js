
// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Проверка сохранённой темы
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Light them';
}

themeToggle.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Dark them';
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light them';
        localStorage.setItem('theme', 'dark');
    }
});

// Анимация при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Анимация для карточек
            if (entry.target.querySelector('.cards')) {
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                    }, 50);
                });
            }
            
            // Специальная анимация для героя
            if (entry.target.id === 'home') {
                const h1 = document.querySelector('.hero h1');
                const p = document.querySelector('.hero p');
                const btn = document.querySelector('.hero .btn');
                
                setTimeout(() => {
                    h1.style.opacity = 1;
                    h1.style.transform = 'translateY(0)';
                }, 300);
                
                setTimeout(() => {
                    p.style.opacity = 1;
                    p.style.transform = 'translateY(0)';
                }, 600);
                
                setTimeout(() => {
                    btn.style.opacity = 1;
                    btn.style.transform = 'translateY(0)';
                    btn.style.animation = 'pulse 2s infinite';
                }, 900);
            }
        }
    });
}, { threshold: 0.15 });

// Наблюдаем за всеми секциями
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Активная навигация
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Инициализация анимации для героя при загрузке
window.addEventListener('load', () => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
});