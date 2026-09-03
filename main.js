const translations = {
  en: {
    brand_title: "Simpler",
    brand_subtitle: "Ebrahim Gaber",
    nav_home: "Home",
    nav_products: "Products",
    nav_about: "About",
    nav_articles: "Articles",
    nav_contact: "Contact",
    nav_toolkit: "Toolkit",
    
    // Home Hero
    hero_title: "Ebrahim Gaber",
    hero_tagline: "I simplify complex chemical & data challenges into actionable solutions — process design, ML for processes, and consulting.",
    hero_cta_work: "View Products",
    hero_cta_blog: "Read Articles",
    hero_pill_1: "🎓 Chemical Eng., B.Sc.",
    hero_pill_2: "⚙️ Aspen + ML",
    hero_pill_3: "📬 Email & WhatsApp",
    hero_role: "Consultant • Process Design • ML for Processes",

    // Home Features
    what_i_do_title: "What I do",
    what_i_do_sub: "I build process models, create ML solutions for industrial systems, and develop high-performance software tools.",
    feature_1_title: "Process Design",
    feature_1_desc: "Simulation, flowsheeting and equipment selection using Aspen tools.",
    feature_2_title: "Machine Learning & Software",
    feature_2_desc: "Data-driven models, optimization (Python, scikit-learn), and modern offline web & mobile applications.",
    feature_3_title: "Consulting & Products",
    feature_3_desc: "Problem scoping, implementation plans, and practical commercial software tools.",

    // Home Selected Work
    selected_work_title: "Selected Work & Software",
    selected_work_sub: "A few highlights — engineering case studies and production applications.",
    work_1_meta: "Software Product • 2026",
    work_1_title: "The Smart Dafter (الدفتر الذكي)",
    work_1_desc: "Offline-first PWA merchant ledger, ZATCA e-invoicing, voice feedback, and debt management.",
    work_2_meta: "Case study • 2025",
    work_2_title: "NGL Fractionation Modeling",
    work_2_desc: "Aspen + ML surrogate model to reduce simulation time.",
    work_3_meta: "Research • 2024",
    work_3_title: "Predictive ML for Fouling",
    work_3_desc: "Time-series models for proactive maintenance scheduling.",

    // Home CTA
    cta_title: "Start a project or ask a question",
    cta_sub: "Email or WhatsApp are the best ways to reach me.",
    cta_btn: "Contact Me",

    // Products Page
    products_page_title: "Products & Software Solutions",
    products_page_sub: "Handcrafted, robust digital products designed for real-world operations, retail efficiency, and data-driven management.",
    
    dafter_badge: "⭐ Flagship Software • Production Ready",
    dafter_title: "The Smart Dafter — الدفتر الذكي",
    dafter_tagline: "A production-grade, offline-first digital merchant ledger and smart invoicing system. Tailored for grocery stores, retailers, and distributors to track credit, manage sales, and print ZATCA invoices without internet.",
    dafter_feat_1_title: "100% Offline & PWA",
    dafter_feat_1_desc: "Dual-layer SQLite + IndexedDB storage handles 50,000+ transactions locally. 1-tap mobile install on Android & iOS.",
    dafter_feat_2_title: "Security Guard Licensing",
    dafter_feat_2_desc: "Cryptographically signed offline activation keys (days, months, years, lifetime) with 100% data read preservation.",
    dafter_feat_3_title: "Optional VAT & ZATCA QR",
    dafter_feat_3_desc: "Toggle between 0% standard commercial credit invoices and 15% Saudi ZATCA Phase 2 TLV Base64 QR invoices.",
    dafter_feat_4_title: "Audio & Low-Literacy Usability",
    dafter_feat_4_desc: "Voice feedback, cash register chimes, color avatar badges, and fast POS payment chips for low-literacy users.",
    dafter_btn_install: "Open & Install on Mobile",
    dafter_btn_download: "Download Offline Package (.ZIP)",
    dafter_btn_github: "GitHub Repository",
    install_hint_title: "How to Install on Mobile:",
    install_hint_desc: "Click 'Open & Install on Mobile' on your phone, then tap 'Install App' or 'Add to Home Screen' from your browser menu.",

    pos_badge: "⏳ In Active Development • Coming Soon",
    pos_title: "Smart Touch POS — نقاط البيع الذكية",
    pos_tagline: "A lightning-fast, touch-friendly Point of Sale (POS) application for retail counters. Features instant barcode scanning, dual payment support, fast receipts, and synchronized inventory tracking.",
    pos_coming_soon: "Coming Soon — Currently in development for small-to-medium supermarkets and retail shops.",

    // About Page
    about_hero_title: "My Expertise: Simplifying Chemical & Data Challenges",
    about_hero_sub: "I am an Analytical Chemical Engineer focused on Green Technology and Data Science. I combine hands-on process design (Aspen HYSYS/Plus) with Machine Learning (Python, SQL) to create sustainable, optimized chemical solutions.",
    about_metric_1_val: "1+ Year",
    about_metric_1_label: "R&D Experience",
    about_metric_2_val: "3.52/4.00",
    about_metric_2_label: "CGPA",
    about_metric_3_val: "6",
    about_metric_3_label: "Major Specializations Earned",
    about_skills_title: "Core Competencies",
    about_skills_sub: "A detailed breakdown of my primary technical skills and engineering tools.",
    about_skills_cat1_title: "Process & Green Engineering",
    about_skills_cat2_title: "Data Science & Machine Learning",
    about_certs_title: "Top Credentials",
    about_certs_sub: "Highlighting multi-course specializations from top institutions that define my core expertise.",
    cert_1_title: "Chemical Engineering (B.Eng. Hons)",
    cert_1_meta: "Universiti Teknologi Malaysia (UTM) • Graduated Mar 2024",
    cert_1_desc: "Completed with a strong CGPA of 3.52/4.00. Key areas: Process Design, Thermodynamics, Reaction Engineering.",
    cert_verify_transcripts: "Contact for Transcripts",
    cert_2_title: "Machine Learning Specialization",
    cert_2_meta: "Stanford University / DeepLearning.AI • Aug 2024",
    cert_2_desc: "Covers supervised, unsupervised learning, recommender systems, and reinforcement learning.",
    cert_3_title: "Data Analytics Professional Certificate",
    cert_3_meta: "DeepLearning.AI • Jun 2025",
    cert_3_desc: "Mastered classical statistics and AI-assisted workflows using Python, SQL, and data storytelling.",
    cert_4_title: "Chemical Hazards & Process Safety Specialization",
    cert_4_meta: "UC Davis • Jul 2025",
    cert_4_desc: "Evaluates process hazards, dispersion, fire, and explosion risks, including mitigation system design.",
    cert_5_title: "Financial Accounting: The Accounting Cycle Specialization",
    cert_5_meta: "UCI • Oct 2025",
    cert_5_desc: "Mastering the complete accounting cycle in Microsoft Excel, from recording journal entries to generating final financial statements.",
    cert_6_title: "Google UX Design Professional Certificate",
    cert_6_meta: "Google Career Certificates • 2023",
    cert_6_desc: "Mastered principles of User Experience (UX) Design, crafting intuitive interfaces through empathetic research and prototyping.",
    cert_verify_credential: "Verify Credential",
    about_cta_title: "Start a project or ask a question",
    about_cta_sub: "Let's discuss how to apply my engineering and data skills to your industrial challenge.",
    about_cta_btn: "Contact Me Now",

    // Contact Page
    contact_page_title: "Contact",
    contact_page_sub: "I respond faster to clear, concise messages. Use email for proposals and WhatsApp for quick clarifications.",
    contact_email_title: "Email",
    contact_email_desc: "Send a short message with project summary and attachments if relevant.",
    contact_email_btn: "Email Me",
    contact_wa_title: "WhatsApp",
    contact_wa_desc: "Start with a short context so I can reply efficiently.",
    contact_wa_btn: "Chat on WhatsApp",

    // Blog Page
    articles_page_title: "Articles & Insights",
    articles_page_sub: "Practical lessons from process design, data analytics, and applied machine learning in engineering.",
    articles_search_placeholder: "Search articles...",
    articles_loading: "Loading articles...",

    footer_rights: "Simpler — Ebrahim Gaber"
  },
  ar: {
    brand_title: "سمبلر (Simpler)",
    brand_subtitle: "إبراهيم جابر",
    nav_home: "الرئيسية",
    nav_products: "المنتجات",
    nav_about: "من أنا",
    nav_articles: "المقالات",
    nav_contact: "تواصل معي",
    nav_toolkit: "الأدوات",
    
    // Home Hero
    hero_title: "إبراهيم جابر",
    hero_tagline: "أبسّط التحديات الكيميائية والبرمجية المعقدة إلى حلول عملية وذكية — تصميم العمليات، تعلم الآلة، وتطوير المنتجات الرقمية.",
    hero_cta_work: "استعراض المنتجات",
    hero_cta_blog: "قراءة المقالات",
    hero_pill_1: "🎓 بكالوريوس هندسة كيميائية",
    hero_pill_2: "⚙️ أدوات Aspen + تعلم الآلة",
    hero_pill_3: "📬 البريد والواتساب",
    hero_role: "مستشار • تصميم عمليات • تعلم آلة وتطبيقات ذكية",

    // Home Features
    what_i_do_title: "ماذا أقدم؟",
    what_i_do_sub: "أقوم ببناء نماذج المحاكاة الصناعية، حلول الذكاء الاصطناعي، وتطوير أنظمة وتطبيقات ويب وجوال عالية الكفاءة.",
    feature_1_title: "تصميم العمليات والمحاكاة",
    feature_1_desc: "نمذجة العمليات الصناعية واختيار المعدات باستخدام برامج Aspen HYSYS و Plus.",
    feature_2_title: "تعلم الآلة والبرمجيات",
    feature_2_desc: "نماذج التنبؤ بالبيانات وتطوير تطبيقات ويب وجوال متطورة تعمل أوفلاين بالكامل.",
    feature_3_title: "الاستشارات وبناء المنتجات",
    feature_3_desc: "تحليل المشكلات، خطط التنفيذ، وتقديم أدوات تجارية وعملية لأصحاب الأعمال.",

    // Home Selected Work
    selected_work_title: "أبرز الأعمال والمنتجات",
    selected_work_sub: "مختارات من المشاريع الهندسية والبرمجيات قيد التشغيل الفعلي.",
    work_1_meta: "منتج برمجي • 2026",
    work_1_title: "تطبيق الدفتر الذكي (The Smart Dafter)",
    work_1_desc: "دفتر ديون وتجارة رقمي أوفلاين بالكامل، فواتير ضريبية معتمدة من هيئة الزكاة، ودعم صوتي وتثبيت مباشر للجوال.",
    work_2_meta: "دراسة حالة • 2025",
    work_2_title: "نمذجة تجزئة سوائل الغاز الطبيعي (NGL)",
    work_2_desc: "نموذج بديل يدمج Aspen مع تعلم الآلة لتقليل وقت المحاكاة بشكل قياسي.",
    work_3_meta: "بحث علمي • 2024",
    work_3_title: "تعلم الآلة التنبؤي للترسبات (Fouling)",
    work_3_desc: "نماذج السلاسل الزمنية لجدولة الصيانة الاستباقية للمبادلات الحرارية.",

    // Home CTA
    cta_title: "هل لديك مشروع أو استفسار؟",
    cta_sub: "يمكنك التواصل معي مباشرة عبر البريد الإلكتروني أو الواتساب.",
    cta_btn: "تواصل معي الآن",

    // Products Page
    products_page_title: "المنتجات والحلول البرمجية",
    products_page_sub: "منتجات وتطبيقات رقمية متكاملة ومصممة لرفع كفاءة الأعمال التجارية وتسهيل إدارة العمليات والبيانات.",
    
    dafter_badge: "⭐ المنتج البرمجي الرائد • جاهز للإنتاج",
    dafter_title: "تطبيق الدفتر الذكي — The Smart Dafter",
    dafter_tagline: "تطبيق تجاري احترافي لإدارة ديون وحسابات العملاء والموردين وفواتير البيع الآجل ونقاط البيع السريعة. مصمم خصيصاً للمتاجر، البقالات، والشركات الصغيرة ليعمل بدون إنترنت نهائياً.",
    dafter_feat_1_title: "أوفلاين 100% وتثبيت PWA",
    dafter_feat_1_desc: "قاعدة بيانات محلية مزدوجة تتسع لـ 50,000+ معاملة بدون إنترنت. تثبيت فوري كبرنامج جوال أصلي على أندرويد وآيفون.",
    dafter_feat_2_title: "نظام حماية وتراخيص مشفر",
    dafter_feat_2_desc: "مفاتيح رخص مشفرة وموقعة أوفلاين (أيام، أشهر، سنوات، دائم) مع ضمان 100% لحرية قراءة وتصدير البيانات عند انتهاء الرخصة.",
    dafter_feat_3_title: "اختيارية الضريبة وفواتير ZATCA",
    dafter_feat_3_desc: "التبديل بضغطة زر بين فواتير مبيعات عادية 0% أو فواتير ضريبية مبسطة بضريبة 15% مع رمز الاستجابة السريعة QR للمرحلة الثانية.",
    dafter_feat_4_title: "دعم صوتي وتسهيل للأميين",
    dafter_feat_4_desc: "نطق صوتي باللغة العربية، نغمات نجاح فورية، دوائر ألوان مميزة لكل عميل، وأزرار مبالغ نقدية سريعة لتسهيل الاستخدام.",
    dafter_btn_install: "فتح وتثبيت التطبيق على الجوال",
    dafter_btn_download: "تحميل الحزمة للتشغيل أوفلاين (.ZIP)",
    dafter_btn_github: "مستودع GitHub البرمجي",
    install_hint_title: "طريقة التثبيت على الجوال:",
    install_hint_desc: "اضغط على 'فتح وتثبيت التطبيق على الجوال' من متصفح جوالك، ثم اختر 'تثبيت التطبيق' أو 'إضافة إلى الشاشة الرئيسية' من قائمة المتصفح.",

    pos_badge: "⏳ قيد التطوير النشط • قريباً",
    pos_title: "نقاط البيع الذكية — Smart Touch POS",
    pos_tagline: "تطبيق نقاط بيع سريع وسلس يعتمد على شاشات اللمس لكاونترات البيع بالتجزئة، يشمل قارئ الباركود، المدفوعات المتعددة، طباعة الإيصالات، والربط بالمخزون.",
    pos_coming_soon: "قريباً جداً — نظام متكامل قيد الإعداد لمتاجر التجزئة ومحلات السوبرماركت.",

    // About Page (Arabic)
    about_hero_title: "خبراتي: تبسيط التحديات الهندسية والبيانات المعقدة",
    about_hero_sub: "مهندس كيميائي تحليلي متخصص في التقنيات الخضراء وعلوم البيانات. أدمج بين تصميم العمليات الصناعية (Aspen HYSYS/Plus) وتعلم الآلة (Python, SQL) لبناء حلول كيميائية وبرمجية مستدامة ومثالية.",
    about_metric_1_val: "+1 سنة",
    about_metric_1_label: "خبرة في البحث والتطوير R&D",
    about_metric_2_val: "3.52 / 4.00",
    about_metric_2_label: "المعدل التراكمي CGPA",
    about_metric_3_val: "6",
    about_metric_3_label: "تخصصات احترافية معتمدة",
    about_skills_title: "الكفاءات والمهارات الأساسية",
    about_skills_sub: "تفصيل شامل لأهم المهارات الهندسية والأدوات البرمجية التي أتقنها.",
    about_skills_cat1_title: "تصميم العمليات والهندسة الخضراء",
    about_skills_cat2_title: "علوم البيانات وتعلم الآلة",
    about_certs_title: "الشهادات والاعتمادات المهنية",
    about_certs_sub: "تخصصات متعددة الدورات من أرقى الجامعات والمؤسسات العالمية التي تؤكد الخبرات التخصصية.",
    cert_1_title: "بكالوريوس الهندسة الكيميائية مع مرتبة الشرف",
    cert_1_meta: "جامعة التكنولوجيا الماليزية (UTM) • مارس 2024",
    cert_1_desc: "تخرجت بمعدل تراكمي متميز 3.52 من 4.00. المحاور: تصميم العمليات، الثرموديناميكا، وهندسة المفاعلات.",
    cert_verify_transcripts: "طلب السجل الأكاديمي",
    cert_2_title: "تخصص تعلم الآلة (Machine Learning)",
    cert_2_meta: "جامعة ستانفورد / DeepLearning.AI • أغسطس 2024",
    cert_2_desc: "يشمل التعلم الخاضع للإشراف، غير الخاضع للإشراف، أنظمة التوصية، والتعلم المعزز.",
    cert_3_title: "شهادة محلل البيانات المحترف (Data Analytics)",
    cert_3_meta: "DeepLearning.AI • يونيو 2025",
    cert_3_desc: "إتقان الإحصاء الكلاسيكي وسير عمل الذكاء الاصطناعي باستخدام Python و SQL وعرض البيانات.",
    cert_4_title: "تخصص المخاطر الكيميائية وسلامة العمليات",
    cert_4_meta: "جامعة كاليفورنيا ديفيس (UC Davis) • يوليو 2025",
    cert_4_desc: "تقييم مخاطر العمليات الصناعية، انتشار الغازات، مخاطر الحريق والانفجار، وتصميم أنظمة التخفيف.",
    cert_5_title: "المحاسبة المالية: دورة الدورة المحاسبية الكاملة",
    cert_5_meta: "جامعة كاليفورنيا إيرفاين (UCI) • أكتوبر 2025",
    cert_5_desc: "إتقان الدورة المحاسبية الكاملة على إكسل، من تسجيل قيود اليومية حتى إعداد القوائم المالية النهائية.",
    cert_6_title: "شهادة جوجل الاحترافية في تصميم تجربة المستخدم (UX)",
    cert_6_meta: "شهادات جوجل المهنية • 2023",
    cert_6_desc: "مبادئ تصميم تجربة المستخدم UX، وبناء واجهات رقمية بديهية وسهلة الوصول من خلال البحث والنماذج الأولية والاختبار.",
    cert_verify_credential: "التحقق من الشهادة",
    about_cta_title: "ابدأ مشروعاً أو اطرح استفسارك",
    about_cta_sub: "يسعدني مناقشة كيفية تطبيق مهاراتي الهندسية والبرمجية لمواجهة تحدياتك الصناعية.",
    about_cta_btn: "تواصل معي الآن",

    // Contact Page (Arabic)
    contact_page_title: "تواصل معي",
    contact_page_sub: "أجيب بسرعة على الرسائل المحددة والواضحة. استخدم البريد للمقترحات الرسمية والواتساب للاستفسارات السريعة.",
    contact_email_title: "البريد الإلكتروني",
    contact_email_desc: "أرسل رسالة موجزة تتضمن ملخص المشروع أو المرفقات إن وجدت.",
    contact_email_btn: "إرسال بريد إلكتروني",
    contact_wa_title: "الواتساب",
    contact_wa_desc: "ابدأ بتوضيح سياق الاستفسار لأتمكن من الرد عليك بأعلى كفاءة.",
    contact_wa_btn: "المحادثة عبر الواتساب",

    // Blog Page (Arabic)
    articles_page_title: "المقالات والتحليلات",
    articles_page_sub: "دروس عملية من تصميم العمليات، تحليلات البيانات، وتعلم الآلة التطبيقي في الهندسة.",
    articles_search_placeholder: "بحث في المقالات...",
    articles_loading: "جاري تحميل المقالات...",

    footer_rights: "سمبلر — إبراهيم جابر"
  }
};

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

    // --- 2. LANGUAGE TOGGLE & TRANSLATION LOGIC ---
    const applyTranslations = (lang) => {
        const dict = translations[lang] || translations.en;
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Also update placeholders if any
        const inputs = document.querySelectorAll('[data-i18n-placeholder]');
        inputs.forEach(input => {
            const key = input.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                input.setAttribute('placeholder', dict[key]);
            }
        });
    };

    const setLanguage = (lang, dir) => {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', dir);
        localStorage.setItem('lang', lang);
        langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
        applyTranslations(lang);
    };

    const savedLang = localStorage.getItem('lang') || 'ar';
    setLanguage(savedLang, savedLang === 'ar' ? 'rtl' : 'ltr');

    langToggle.addEventListener('click', () => {
        const isEnglish = html.getAttribute('lang') === 'en';
        setLanguage(isEnglish ? 'ar' : 'en', isEnglish ? 'rtl' : 'ltr');
    });

    // --- 3. NAVIGATION SCROLL EFFECT ---
    const updateNavShadow = () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
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
                blogGrid.innerHTML = '';
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

