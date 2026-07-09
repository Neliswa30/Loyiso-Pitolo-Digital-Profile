// ===== COMPLETE SCRIPT.JS =====
// ===== All functionality in one file =====

// ---- LOADING SCREEN ----
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loaderBar');
    const percent = document.getElementById('loaderPercent');
    
    if (loader) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 4;
        if (progress > 100) progress = 100;
        
        if (bar) bar.style.width = progress + '%';
        if (percent) percent.textContent = progress + '%';
        
        if (progress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.cursor = 'default';
            initAllAnimations();
          }, 400);
        }
      }, 150);
    } else {
      initAllAnimations();
    }
  });
  
  // ---- Initialize All Animations ----
  function initAllAnimations() {
    animateCounters();
    initScrollReveal();
    initTypewriter();
    initFAQ();
    initPortfolioFilters();
    initBeforeAfterSlider();
    initTiltCards();
    initMagneticButtons();
    initBackToTop();
    initScrollProgress();
    initNavbarShrink();
    initActiveNavHighlight();
    initSmoothScroll();
    initCopyEmail();
    initSpotlight();
    initParallaxVideo();
    initParticles();
    initMobileMenu();
    initGalleryVideoPlayer();
    initGalleryItems();
    initGalleryFilters();
    initImageLightbox();
  }
  
  // ---- MOBILE MENU ----
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
  
    if (hamburger && navMenu) {
      function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      }
  
      hamburger.addEventListener('click', toggleMenu);
      if (navOverlay) navOverlay.addEventListener('click', toggleMenu);
  
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (navMenu.classList.contains('active')) toggleMenu();
        });
      });
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) toggleMenu();
      });
    }
  }
  
  // ---- MOUSE SPOTLIGHT ----
  function initSpotlight() {
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight';
    document.body.prepend(spotlight);
  
    document.addEventListener('mousemove', (e) => {
      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top = e.clientY + 'px';
    });
  
    if ('ontouchstart' in window) {
      spotlight.style.display = 'none';
    }
  }
  
  // ---- CINEMATIC SCROLL REVEAL ----
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    document.querySelectorAll('.section, .about-grid, .portfolio-grid, .contact-info-grid, .services-grid, .why-grid, .social-grid, .faq-list, .cta-content, .about-hero, .portfolio-hero, .contact-hero, .showreel, .featured-studios, .services-preview, .timeline, .workflow-steps, .choose-grid, .testimonials-grid, .awards-grid, .location-content, .software-grid, .pipeline-steps, .stats-grid, .gallery-hero, .gallery-grid, .hobbies-grid').forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.08,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  
  // ---- ANIMATED STATISTICS ----
  function animateCounters() {
    const statItems = document.querySelectorAll('[data-count]');
    
    statItems.forEach(item => {
      const numberEl = item.querySelector('.stat-number, .why-number, .award-number');
      if (!numberEl) return;
      
      const target = parseInt(item.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      if (item.dataset.animated === 'true') return;
      
      const duration = 2000;
      const stepTime = 16;
      const steps = duration / stepTime;
      let current = 0;
      
      const easeOutQuad = (t) => t * (2 - t);
      
      const timer = setInterval(() => {
        const progress = Math.min(current / steps, 1);
        const eased = easeOutQuad(progress);
        const value = Math.floor(eased * target);
        
        if (current >= steps) {
          numberEl.textContent = target + '+';
          clearInterval(timer);
          item.dataset.animated = 'true';
        } else {
          numberEl.textContent = value + '+';
          current++;
        }
      }, stepTime);
    });
  }
  
  // ---- TYPEWRITER ----
  function initTypewriter() {
    const elements = document.querySelectorAll('.typewriter');
    if (!elements.length) return;
    
    elements.forEach(el => {
      const texts = el.getAttribute('data-texts') ? 
        JSON.parse(el.getAttribute('data-texts')) : 
        ['Visual Effects Artist.', 'VFX Compositor.', 'Creative Problem Solver.'];
      
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let currentText = '';
      
      function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
          currentText = fullText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          currentText = fullText.substring(0, charIndex + 1);
          charIndex++;
        }
        
        el.textContent = currentText;
        
        if (!isDeleting && charIndex === fullText.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
      }
      
      type();
    });
  }
  
  // ---- FAQ ACCORDION ----
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(el => el.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
  
  // ---- PORTFOLIO FILTERS ----
  function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-filters button');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    if (!filterButtons.length || !portfolioCards.length) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // ---- BEFORE/AFTER SLIDER ----
  function initBeforeAfterSlider() {
    const slider = document.querySelector('.before-after-slider');
    const handle = document.querySelector('.slider-handle');
    
    if (!slider || !handle) return;
    
    let isDragging = false;
    
    function updateSlider(e) {
      const rect = slider.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      handle.style.left = percent + '%';
    }
    
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e);
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const rect = slider.getBoundingClientRect();
      const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      handle.style.left = percent + '%';
    });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
  
  // ---- TILT CARDS ----
  function initTiltCards() {
    const tiltItems = document.querySelectorAll('[data-tilt]');
    
    tiltItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }
  
  // ---- MAGNETIC BUTTONS ----
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 20;
        btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  // ---- TOAST NOTIFICATIONS ----
  function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
    
    toast.addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    });
  }
  
  function initToastNotifications() {
    // Toast is created on demand via showToast()
  }
  
  // ---- BACK TO TOP ----
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // ---- SCROLL PROGRESS ----
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      bar.style.width = progress + '%';
    });
  }
  
  // ---- NAVBAR SHRINK ----
  function initNavbarShrink() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      nav.classList.toggle('small', window.scrollY > 50);
    });
  }
  
  // ---- ACTIVE NAV HIGHLIGHT ----
  function initActiveNavHighlight() {
    const links = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // ---- SMOOTH SCROLL ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
  
  // ---- COPY EMAIL TO CLIPBOARD ----
  function initCopyEmail() {
    const emailElements = document.querySelectorAll('[data-copy-email]');
    
    emailElements.forEach(el => {
      el.addEventListener('click', async () => {
        const email = el.getAttribute('data-copy-email') || el.textContent.trim();
        try {
          await navigator.clipboard.writeText(email);
          showToast('📧 Email copied to clipboard!', 'success');
        } catch {
          const input = document.createElement('input');
          input.value = email;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
          showToast('📧 Email copied to clipboard!', 'success');
        }
      });
    });
  }
  
  // ---- PARALLAX VIDEO ----
  function initParallaxVideo() {
    const videoBg = document.querySelector('.video-background');
    if (videoBg) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxTranslate = 100;
        const translate = Math.min(scrollY * 0.15, maxTranslate);
        videoBg.style.transform = `translateY(${translate}px)`;
      });
    }
  }
  
  // ---- FLOATING PARTICLES ----
  function initParticles() {
    if (window.innerWidth < 768) return;
    if (document.querySelector('.particles-container')) return;
    
    const container = document.createElement('div');
    container.className = 'particles-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    `;
    document.body.prepend(container);
    
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 20;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 107, 0, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite alternate;
        opacity: 0;
      `;
      container.appendChild(particle);
    }
    
    if (!document.getElementById('particleStyles')) {
      const style = document.createElement('style');
      style.id = 'particleStyles';
      style.textContent = `
        @keyframes floatParticle {
          0% { opacity: 0; transform: translate(0, 0) scale(0); }
          20% { opacity: 1; }
          100% { opacity: 0.6; transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, ${Math.random() > 0.5 ? '' : '-'}30px) scale(1.2); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // ============================================================
  // GALLERY SPECIFIC FUNCTIONS
  // ============================================================
  
  // ---- GALLERY VIDEO PLAYER ----
  function initGalleryVideoPlayer() {
    const videoPlayerModal = document.getElementById('videoPlayerModal');
    const videoPlayerClose = document.getElementById('videoPlayerClose');
    const galleryVideo = document.getElementById('galleryVideo');
    const galleryVideoSource = document.getElementById('galleryVideoSource');
    const galleryVideoTitle = document.getElementById('galleryVideoTitle');
    const galleryVideoDesc = document.getElementById('galleryVideoDesc');
  
    window.openVideoPlayer = function(title, description, videoSrc) {
      console.log('🎬 Opening video:', videoSrc);
      
      if (!videoSrc) {
        showToast('⚠️ Video file not found', 'error');
        return;
      }
      
      if (galleryVideoSource) {
        galleryVideoSource.src = videoSrc;
        galleryVideo.load();
      }
      
      if (galleryVideoTitle) galleryVideoTitle.textContent = title || 'Video';
      if (galleryVideoDesc) galleryVideoDesc.textContent = description || '';
      
      if (videoPlayerModal) {
        videoPlayerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
          galleryVideo.play().then(() => {
            console.log('▶️ Video playing');
          }).catch((error) => {
            console.warn('⚠️ Autoplay blocked:', error);
            showToast('Click play to start the video', 'info');
          });
        }, 300);
      }
    };
  
    window.closeVideoPlayer = function() {
      if (videoPlayerModal) {
        videoPlayerModal.classList.remove('active');
        document.body.style.overflow = '';
        if (galleryVideo) galleryVideo.pause();
      }
    };
  
    if (videoPlayerClose) {
      videoPlayerClose.addEventListener('click', window.closeVideoPlayer);
    }
  
    if (videoPlayerModal) {
      videoPlayerModal.addEventListener('click', (e) => {
        if (e.target === videoPlayerModal) window.closeVideoPlayer();
      });
    }
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoPlayerModal?.classList.contains('active')) {
        window.closeVideoPlayer();
      }
    });
  }
  
  // ---- GALLERY ITEMS ----
  function initGalleryItems() {
    document.querySelectorAll('.gallery-item[data-video]').forEach(item => {
      const videoSrc = item.getAttribute('data-video');
      const title = item.querySelector('.item-overlay h3')?.textContent || 'Video';
      const desc = item.querySelector('.item-overlay p')?.textContent || '';
      
      const watchBtn = item.querySelector('.item-watch-btn');
      if (watchBtn) {
        watchBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          e.preventDefault();
          window.openVideoPlayer(title, desc, videoSrc);
        });
      }
      
      item.addEventListener('click', function(e) {
        if (e.target.closest('.item-watch-btn')) return;
        window.openVideoPlayer(title, desc, videoSrc);
      });
    });
  }
  
  // ---- GALLERY FILTERS ----
  function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters button');
    const allItems = document.querySelectorAll('.gallery-item');
  
    if (!filterButtons.length) return;
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        const filter = button.getAttribute('data-filter');
  
        allItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // ============================================================
  // IMAGE LIGHTBOX (for portfolio cards)
  // ============================================================
  function initImageLightbox() {
    const imageModal = document.getElementById('imageModal');
    const imageModalClose = document.getElementById('imageModalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
  
    if (!imageModal) return;
  
    window.openImageModal = function(imageSrc, title, description, tags) {
      if (modalImage) modalImage.src = imageSrc;
      if (modalTitle) modalTitle.textContent = title || 'Project';
      if (modalDesc) modalDesc.textContent = description || '';
      
      if (modalTags) {
        modalTags.innerHTML = '';
        if (tags && tags.length) {
          tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            modalTags.appendChild(span);
          });
        }
      }
      
      imageModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
  
    window.closeImageModal = function() {
      imageModal.classList.remove('active');
      document.body.style.overflow = '';
    };
  
    // Click play icon on portfolio cards
    document.querySelectorAll('.play-icon').forEach(icon => {
      icon.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.portfolio-card');
        if (card) {
          const image = card.getAttribute('data-image') || '';
          const title = card.querySelector('.card-overlay h3')?.textContent || 'Project';
          const desc = card.querySelector('.card-overlay p')?.textContent || '';
          const tags = Array.from(card.querySelectorAll('.software-tags span')).map(el => el.textContent);
          window.openImageModal(image, title, desc, tags);
        }
      });
    });
  
    // Click on portfolio card (but not view-project link)
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('click', function(e) {
        if (e.target.closest('.view-project') || e.target.closest('.play-icon')) return;
        const image = this.getAttribute('data-image') || '';
        const title = this.querySelector('.card-overlay h3')?.textContent || 'Project';
        const desc = this.querySelector('.card-overlay p')?.textContent || '';
        const tags = Array.from(this.querySelectorAll('.software-tags span')).map(el => el.textContent);
        window.openImageModal(image, title, desc, tags);
      });
    });
  
    if (imageModalClose) {
      imageModalClose.addEventListener('click', window.closeImageModal);
    }
  
    if (imageModal) {
      imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) window.closeImageModal();
      });
    }
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal?.classList.contains('active')) {
        window.closeImageModal();
      }
    });
  }
  
  // ============================================================
  // CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('fullName');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      if (name && name.value.trim().length < 2) {
        showToast('Please enter your full name.', 'error');
        name.focus();
        return;
      }
      
      if (email && !email.value.includes('@')) {
        showToast('Please enter a valid email address.', 'error');
        email.focus();
        return;
      }
      
      if (message && message.value.trim().length < 10) {
        showToast('Please tell me more about your project.', 'error');
        message.focus();
        return;
      }
      
      showToast('🔥 Thank you! I\'ll respond within 24 hours.', 'success');
      contactForm.reset();
    });
  }
  
  // ---- WATCH REEL BUTTON ----
  const watchBtn = document.getElementById('watchReelBtn');
  if (watchBtn) {
    watchBtn.addEventListener('click', () => {
      const videoModal = document.getElementById('videoModal');
      const reelVideo = document.getElementById('reelVideo');
      if (videoModal) {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (reelVideo) {
          reelVideo.play().catch(() => {});
        }
      }
    });
  }
  
  // ---- LOG ----
  console.log('🎬 VFX Freelance Profile — Fully Enhanced');
  console.log('🔥 Cinematic effects, animations, and interactions loaded.');