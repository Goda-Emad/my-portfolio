// ====== تفعيل مكتبة AOS للأنيميشن ======
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ====== شريط التنقل ======
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// فتح/غلق القائمة في الموبايل
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// إغلاق القائمة عند الضغط على رابط
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ====== إخفاء/ظهور شريط التنقل عند التمرير ======
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // التمرير لأسفل - إخفاء
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // التمرير لأعلى - إظهار
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ====== تفعيل أنيميشن أشرطة المهارات عند التمرير ======
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        }
    });
};

// تشغيل عند التمرير
window.addEventListener('scroll', animateSkills);
// تشغيل عند تحميل الصفحة
window.addEventListener('load', animateSkills);

// ====== نموذج التواصل ======
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // جمع البيانات
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1]?.value || 'لا يوجد موضوع';
    const message = contactForm.querySelector('textarea').value;
    
    // التحقق من الحقول المطلوبة
    if (!name || !email || !message) {
        showNotification('⚠️', 'من فضلك املأ جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('⚠️', 'من فضلك أدخل بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // عرض رسالة نجاح
    showNotification(
        '✅', 
        'تم إرسال رسالتك بنجاح! سأتصل بك قريباً.', 
        'success'
    );
    
    // إعادة تعيين النموذج
    contactForm.reset();
});

// ====== دالة عرض الإشعارات ======
function showNotification(icon, message, type) {
    // حذف الإشعار القديم إذا وجد
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إضافة التنسيق للإشعار
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? 'rgba(108, 99, 255, 0.95)' : 'rgba(255, 70, 70, 0.95)'};
        color: #fff;
        padding: 18px 25px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        z-index: 9999;
        animation: slideUp 0.5s ease;
        max-width: 450px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // إضافة أنيميشن
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes slideDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
        .notification-icon {
            font-size: 1.5rem;
        }
        .notification-message {
            flex: 1;
        }
        .notification-close {
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: 0.3s;
            padding: 0 5px;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // إغلاق الإشعار عند الضغط على ×
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideDown 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    });
    
    // إغلاق الإشعار تلقائياً بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideDown 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// ====== تأثير الكتابة التلقائية على النبذة ======
// (اختياري - يمكن تفعيله إذا أردت)
// const bioText = "Results-driven Data Analyst with a Bachelor's in Commerce and Accounting...";
// يمكن إضافة تأثير كتابة هنا

// ====== تأثير تغيير الخلفية عند التمرير ======
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ====== إضافة كلاس active للرابط الحالي ======
const styleActive = document.createElement('style');
styleActive.textContent = `
    .nav-menu a.active {
        color: #6c63ff !important;
    }
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(styleActive);

// ====== تحسين الأداء: تحميل الصور البطيء ======
document.addEventListener('DOMContentLoaded', () => {
    // إضافة lazy loading للصور
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// ====== منع النقر بزر الماوس الأيمن (اختياري) ======
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// ====== عرض رسالة ترحيب في console ======
console.log('%c🎯 Gannatallah Emad Portfolio', 'font-size: 24px; font-weight: bold; color: #6c63ff;');
console.log('%c📊 Data Analyst | Python • SQL • Power BI', 'font-size: 16px; color: #b0b0d0;');
console.log('%c✨ شكراً لزيارتك!', 'font-size: 14px; color: #d4bfff;');

// ====== إضافة تأثير المتابعة للماوس (اختياري) ======
// يمكن إضافة cursor متحرك إذا أردت
