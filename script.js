// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Smooth reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll('.skill-card, .workshop-card, .project-card, .timeline-item, .contact-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add stagger effect to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==================================================
// MODAL FUNCTIONALITY FOR CERTIFICATES AND PROJECTS
// ==================================================

// Image data - Add your certificate and project image paths here
const imageData = {
    // Certificates
    cert1: {
        image: 'certificate.png',
        name: 'Buddhist Philosophy Workshop Certificate',
        type: 'certificate'
    },
    // Projects
    project1: {
        image: 'digestive-system.jpeg',
        name: 'Human Digestive System Model',
        type: 'project'
    },
};

// Current image being displayed
let currentImage = null;

// Open certificate modal
function openCertificate(certId) {
    console.log('Opening certificate:', certId); // Debug log
    openModal(certId, 'Certificate');
}

// Open project image modal
function openProjectImage(projectId) {
    console.log('Opening project:', projectId); // Debug log
    openModal(projectId, 'Project Image');
}

// Generic modal open function
function openModal(imageId, title) {
    console.log('openModal called with:', imageId, title); // Debug log
    
    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const certificateImage = document.getElementById('certificateImage');
    const downloadText = document.getElementById('downloadText');
    
    // Check if elements exist
    if (!modal) {
        console.error('Modal not found!');
        alert('Error: Modal element not found. Check your HTML!');
        return;
    }
    
    if (imageData[imageId]) {
        currentImage = imageData[imageId];
        certificateImage.src = currentImage.image;
        certificateImage.alt = currentImage.name;
        modalTitle.textContent = currentImage.type === 'certificate' ? 'Certificate' : 'Project Image';
        downloadText.textContent = currentImage.type === 'certificate' ? 'Download Certificate' : 'Download Image';
        
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        console.log('Modal opened successfully!'); // Debug log
    } else {
        console.error('Image ID not found:', imageId);
        alert('Error: Image data not found for ID: ' + imageId);
    }
}

// Close modal
function closeModal() {
    console.log('Closing modal'); // Debug log
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        currentImage = null;
    }
}

// Backward compatibility
function closeCertificate() {
    closeModal();
}

// Download image
function downloadImage() {
    if (currentImage) {
        const link = document.createElement('a');
        link.href = currentImage.image;
        const fileName = currentImage.name.toLowerCase().replace(/\s+/g, '-') + '.jpg';
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Download initiated'); // Debug log
    } else {
        console.error('No current image to download');
    }
}

// Backward compatibility
function downloadCertificate() {
    downloadImage();
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Prevent modal content click from closing modal
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Portfolio initialized'); // Debug log
    
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        console.log('Modal content click handler added'); // Debug log
    }
});

console.log('Portfolio JavaScript loaded successfully! ✨');