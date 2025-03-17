document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    });
    // Close menu when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
        }
      });
    });
    // Add animation observer for project cards
    const projectCards = document.querySelectorAll('.project-card');
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If the card is visible
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1, // Trigger when at least 10% of the item is visible
      rootMargin: '0px'
    });
    // Observe each project card
    projectCards.forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
    // Initialize typing effect for the hero section
    const typingTextElement = document.getElementById('typing-text');
    const textToType = "A Software Engineering (Honours) Student @ The University of South Australia";
    let charIndex = 0;
    function typeText() {
      if (charIndex < textToType.length) {
        typingTextElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 20); // Typing speed
      }
    }
    // Start typing animation
    setTimeout(typeText, 100);
    // Navigation active link on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPosition = window.pageYOffset;
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    // Observe education cards for animation
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
    // Adjust layout on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    });
    
    // Add fullscreen functionality for project images
    const projectImages = document.querySelectorAll('.project-image img');
    
    // Create a modal for the fullscreen image
    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    const modalImg = document.createElement('img');
    modalImg.className = 'fullscreen-image';
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.objectFit = 'contain';
    modalImg.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
    modalImg.style.transition = 'transform 0.3s ease';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '30px';
    closeButton.style.fontSize = '40px';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontWeight = 'bold';
    
    modal.appendChild(modalImg);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    
    // Open modal when clicking on an image
    projectImages.forEach(img => {
      img.style.cursor = 'pointer';
      
      // Add click to enlarge text if it doesn't exist
      const parent = img.parentElement;
      let clickText = parent.querySelector('.click-to-enlarge');
      if (!clickText) {
        clickText = document.createElement('p');
        clickText.className = 'click-to-enlarge';
        clickText.textContent = 'Click to enlarge';
        parent.appendChild(clickText);
      }
      
      img.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      });
    });
    
    // Close modal when clicking on close button or outside the image
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    });
  });