// script.js - sold out
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.buy-btn, .book-simple-btn').forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            alert('SOLD OUT\nThis item is no longer available.');
        };
    });
});




// script.js - 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播图元素
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // 更新轮播图位置
    function updateCarousel() {
        // 移动轮播轨道
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // 更新指示器
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // 下一张
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // 上一张
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // 事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // 键盘左右键控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // 触摸滑动支持
    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                nextSlide(); // 向左滑动 -> 下一张
            } else {
                prevSlide(); // 向右滑动 -> 上一张
            }
        }
    });
    
    // 导航栏点击效果
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active类
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 添加active类到当前项
            this.classList.add('active');
            
            // 获取目标section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 平滑滚动到目标
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新导航栏激活状态
    function updateNavOnScroll() {
        const sections = document.querySelectorAll('.section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.id;
            }
        });
        
        // 更新导航栏
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateNavOnScroll);
    
    // 初始化
    updateCarousel();
});