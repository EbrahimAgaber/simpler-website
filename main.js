document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const nav = document.querySelector('nav');
    const yearSpan = document.getElementById('year');

    // --- 1. THEME TOGGLE LOGIC ---
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update button icon
        if (theme === 'dark') {
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('title', 'Switch to light theme');
        } else {
            themeToggle.textContent = '🌓';
            themeToggle.setAttribute('title', 'Switch to dark theme');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // --- 2. LANGUAGE TOGGLE ---
    const setLanguage = (lang, dir) => {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', dir);
        localStorage.setItem('lang', lang);
        langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
    };

    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang, savedLang === 'ar' ? 'rtl' : 'ltr');

    langToggle.addEventListener('click', () => {
        const isEnglish = html.getAttribute('lang') === 'en';
        setLanguage(isEnglish ? 'ar' : 'en', isEnglish ? 'rtl' : 'ltr');
    });

    // --- 3. NAVIGATION SCROLL EFFECT ---
    const updateNavShadow = () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', updateNavShadow);
    updateNavShadow();

    // --- 4. FOOTER YEAR ---
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 5. MOBILE NAV TOGGLE ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle('nav-open');
        });
    }

    // --- 6. BLOG PAGE LOGIC ---
    const blogGrid = document.getElementById('blogGrid');
    if (blogGrid) {
        fetch('blog-data.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(posts => {
                blogGrid.innerHTML = ''; // Clear hardcoded articles
                posts.forEach(post => {
                    const article = document.createElement('article');
                    article.className = 'blog-card';
                    article.innerHTML = `
                        <div class="meta">${post.category} • ${post.readTime}</div>
                        <h3 class="title">${post.title}</h3>
                        <p class="muted">${post.summary}</p>
                        <a href="${post.url}" class="small-btn" target="_blank">Read</a>
                    `;
                    blogGrid.appendChild(article);
                });
            })
            .catch(err => {
                console.error(err);
                blogGrid.innerHTML = '<p style="color:red;">Failed to load articles. Please refresh.</p>';
            });
    }
});
