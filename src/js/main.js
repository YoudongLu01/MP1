
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

//slides
const slidesWrapper = document.getElementById('slides-wrapper');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = 5;


//video
const video1 = document.getElementById("video1");

//gunpla part
const images = document.querySelectorAll(".images img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modalImg");
const modaltxt = document.querySelector(".modalTxt")
const close = document.querySelector(".close")



//slides functions
function updateSlides() {
    // Move slides container
    const translateX = -currentSlide * 20; // 20% per slide
    slidesWrapper.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

//go next
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlides();
}

//go prev slides
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlides();
}

//go to specific slides
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlides();
}

//auto play slides and change every 5s
function autoPlaySlides() {
    setInterval(nextSlide, 5000); 
}


function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

//change nav bar highlight by position
function updateActiveNavLink() {
    let current = '';
    
    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        // Check if section is in viewport (with navbar offset)
        if (window.scrollY >= sectionTop - navbar.clientHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

//smoothscrollto
function smoothScrollTo(targetId) {
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const titleElement = targetSection.querySelector('h1');
        

        const titleTop = titleElement.offsetTop;
        
        const offsetTop = titleTop - navbar.offsetHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}


//scoller event listener
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    updateActiveNavLink();
});

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        smoothScrollTo(targetId);
    });
});

// PPT Slides Event Listeners
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

// Dots navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

//video functions
function playpause(){
    if (video1.paused){
        video1.play();
    } else{
        video1.pause()
    }
}

function muteunmute(){
    if (video1.muted){
        video1.muted = false
    }else{
        video1.muted = true
    }
}

//gunpla function
images.forEach( image =>{
    image.addEventListener("click",()=> {
        
        modalImg.src = image.src;
        modaltxt.innerHTML = image.alt;
        modal.classList.add("appear");
        close.addEventListener("click", ()=> {
            modal.classList.remove("appear");
        }

        )
    })
}

);