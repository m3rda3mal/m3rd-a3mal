// تعريف المتغيرات
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightbox-video');
const closeLightboxBtn = document.querySelector('.close-lightbox');

// 1. تشغيل الفلاتر (مطاعم - ذهب - الكل)
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // تغيير لون الزرار النشط
        filterBtns.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        // إخفاء وإظهار الفيديوهات
        const filterValue = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 2. تشغيل الشاشة المنبثقة (Lightbox)
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoSrc = item.getAttribute('data-video'); // جلب مسار الفيديو
        const videoSource = lightboxVideo.querySelector('source');
        
        videoSource.src = videoSrc; // وضع المسار داخل الفيديو
        lightboxVideo.load(); // تحميل الفيديو
        lightbox.classList.add('active'); // إظهار الشاشة
        lightboxVideo.play(); // تشغيل الفيديو تلقائياً
    });
});

// 3. إغلاق الشاشة المنبثقة
function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxVideo.pause(); // إيقاف الفيديو
    lightboxVideo.currentTime = 0; // إرجاع الفيديو للأول
}

// الإغلاق عند الضغط على X
closeLightboxBtn.addEventListener('click', closeLightbox);

// الإغلاق عند الضغط على الخلفية السوداء
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

