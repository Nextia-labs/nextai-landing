/**
 * NEXTIA LANDING - MAIN JAVASCRIPT
 * ================================
 * Funcionalidades principales del sitio web
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // ==========================================================================
  // MODO OSCURO
  // ==========================================================================
  
  const toggle = document.getElementById('toggleDarkMode');
  const html = document.documentElement;

  function setDarkMode(dark) {
    if (dark) {
      html.classList.add('dark');
      toggle.innerHTML = '<i data-lucide="moon"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      toggle.innerHTML = '<i data-lucide="sun"></i>';
      localStorage.setItem('theme', 'light');
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    } else if (storedTheme === 'light') {
      setDarkMode(false);
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  initTheme();
  toggle.addEventListener('click', () => setDarkMode(!html.classList.contains('dark')));

  // ==========================================================================
  // MENÚ MÓVIL
  // ==========================================================================
  
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });

  // ==========================================================================
  // INDICADOR DE NAVEGACIÓN ACTIVA (DESKTOP)
  // ==========================================================================
  
  const links = document.querySelectorAll(".nav-link, .btn-agendar-navbar, .btn-agendar-section");
  const indicator = document.getElementById("nav-indicator");
  const navWrapper = document.getElementById("nav-wrapper");

  function updateIndicator() {
    const currentLink = document.querySelector(".nav-link.nav-active, .btn-agendar-navbar.nav-active, .btn-agendar-section.nav-active");
    
    if (!currentLink || !navWrapper || !indicator) {
      indicator.style.opacity = '0';
      return;
    }

    const linkRect = currentLink.getBoundingClientRect();
    const wrapperRect = navWrapper.getBoundingClientRect();
    const targetX = linkRect.left - wrapperRect.left;
    
    indicator.style.opacity = '1';
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.height = `${linkRect.height}px`;
    indicator.style.transform = `translateX(${targetX}px) scale(1)`;
    indicator.style.transition = 'all 0.3s ease-in-out';
  }

  // Smart behavior for navbar "Agendar reunión" button
  function handleNavbarAgendarClick(event) {
    const button = document.getElementById('navbar-agendar-btn');
    if (button && button.classList.contains('nav-active')) {
      // Button is active (user is in CTA section), open Calendly modal
      event.preventDefault();
      openCalendlyModal();
    } else {
      // Button is not active, scroll to CTA section normally
      // Let the default href behavior happen
    }
  }

  // Smart behavior for mobile menu "Agendar reunión" button  
  function handleMobileAgendarClick(event) {
    // Find the mobile menu "Agendar reunión" item
    const mobileNavItems = document.querySelectorAll('#mobileMenu .btn-agendar-section');
    const mobileAgendarItem = Array.from(mobileNavItems).find(item => 
      item.getAttribute('href') === '#cta'
    );
    
    if (mobileAgendarItem && mobileAgendarItem.classList.contains('nav-active')) {
      // Prevent default scrolling
      event.preventDefault();
      // Close mobile menu first
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
      // Then open Calendly modal
      setTimeout(() => {
        openCalendlyModal();
      }, 200);
    } else {
      // Let the normal href behavior happen (scroll to section)
      // Mobile menu will close automatically due to existing logic
    }
  }

  // ==========================================================================
  // DETECCIÓN DE SECCIÓN ACTIVA CON INTERSECTION OBSERVER
  // ==========================================================================
  
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLinks = document.querySelectorAll(`.nav-link[href="#${id}"], .btn-agendar-navbar[href="#${id}"], .btn-agendar-section[href="#${id}"]`);

      if (entry.isIntersecting && navLinks.length) {
        document.querySelectorAll(".nav-link, .btn-agendar-navbar, .btn-agendar-section").forEach(el => {
          el.classList.remove(
            "nav-active", 
            "bg-gradient-to-r", 
            "from-cyan-400", 
            "via-fuchsia-500", 
            "to-cyan-400", 
            "animate-gradientFlow", 
            "shadow-cyan"
          );
        });

        navLinks.forEach(link => {
          if (link.classList.contains('btn-agendar-navbar') || link.classList.contains('btn-agendar-section')) {
            link.classList.add("nav-active");
          } else {
            link.classList.add("nav-active");

            if (menu && menu.contains(link)) {
              link.classList.add(
                "bg-gradient-to-r", 
                "from-cyan-400", 
                "via-fuchsia-500", 
                "to-cyan-400", 
                "animate-gradientFlow", 
                "shadow-cyan"
              );
            }
          }
        });

        updateIndicator();
      }
    });
  }, observerOptions);

  document.querySelectorAll("section[id]").forEach(section => {
    observer.observe(section);
  });

  // ==========================================================================
  // NAVEGACIÓN CON SCROLL NATIVO
  // ==========================================================================
  
  function initNavigation() {
    const mobileMenu = document.getElementById('mobileMenu');
    const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');

    allNavLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        
        // El scroll suave se maneja automáticamente por CSS (scroll-behavior: smooth)
        // No necesitamos preventDefault() ni lógica adicional
      });
    });
  }

  initNavigation();

  // ==========================================================================
  // EVENTOS DE REDIMENSIONAMIENTO
  // ==========================================================================
  
  window.addEventListener("resize", updateIndicator);
  updateIndicator();

  // ==========================================================================
  // ANIMACIONES DE LETRAS DEL HERO
  // ==========================================================================
  
  function initLetterAnimations() {
    const letterElements = document.querySelectorAll('.letter-stream');
    const animationClasses = [
      'letter-animate-down',
      'letter-animate-up', 
      'letter-animate-left',
      'letter-animate-right',
      'letter-animate-top-left',
      'letter-animate-top-right',
      'letter-animate-bottom-left',
      'letter-animate-bottom-right'
    ];

    const descendersLetters = ['g', 'j', 'p', 'q', 'y', 'ñ'];

    letterElements.forEach((letter, index) => {
      const letterText = letter.textContent.toLowerCase();
      if (descendersLetters.includes(letterText)) {
        letter.classList.add('letter-descender');
      }

      const randomAnimation = animationClasses[Math.floor(Math.random() * animationClasses.length)];
      letter.classList.add(randomAnimation);
      
      const delay = index * 0.1 + Math.random() * 0.2;
      letter.style.animationDelay = `${delay}s`;
      
      const duration = 0.8 + Math.random() * 0.4;
      letter.style.animationDuration = `${duration}s`;
    });
  }

  window.restartLetterAnimations = function() {
    const letterElements = document.querySelectorAll('.letter-stream');
    letterElements.forEach(letter => {
      letter.classList.remove(
        'letter-animate-down',
        'letter-animate-up', 
        'letter-animate-left',
        'letter-animate-right',
        'letter-animate-top-left',
        'letter-animate-top-right',
        'letter-animate-bottom-left',
        'letter-animate-bottom-right',
        'letter-descender'
      );
      letter.style.opacity = '0';
    });
    
    setTimeout(initLetterAnimations, 100);
  };

  initLetterAnimations();

  // ==========================================================================
  // REVEAL ANIMATIONS
  // ==========================================================================
  
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elementIndex = Array.from(revealElements).indexOf(entry.target);
          const delay = elementIndex * 200;
          
          setTimeout(() => {
            entry.target.classList.add('reveal-visible');
          }, delay);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -10px 0px'
    });

    revealElements.forEach((element, index) => {
      observer.observe(element);
    });
  }

  initRevealAnimations();

  // ==========================================================================
  // MODAL DE CALENDLY
  // ==========================================================================

  const calendlyModal = document.getElementById('calendlyModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const calendlyEmbed = document.getElementById('calendly-embed');

  window.openCalendlyModal = function() {
    if (calendlyModal) {
      calendlyModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      if (calendlyEmbed && !calendlyEmbed.hasChildNodes()) {
        calendlyEmbed.innerHTML = `
          <iframe src="https://calendly.com/rodrigoaunins/30min?hide_landing_page_details=1&hide_gdpr_banner=1" 
                  width="100%" 
                  height="100%" 
                  frameborder="0"
                  style="border-radius: 8px; background: white;">
          </iframe>
        `;
      }
    }
  };

  function closeCalendlyModal() {
    if (calendlyModal) {
      calendlyModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCalendlyModal);
  }

  if (calendlyModal) {
    calendlyModal.addEventListener('click', function(e) {
      if (e.target === calendlyModal) {
        closeCalendlyModal();
      }
    });
  }

  // ==========================================================================
  // MODALES DE PRIVACIDAD Y TÉRMINOS
  // ==========================================================================
  
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  };

  // ==========================================================================
  // MANEJO GLOBAL DE MODALES CON ESCAPE Y CLICK EN FONDO
  // ==========================================================================

  // Cerrar todos los modales con Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      // Calendly Modal
      if (calendlyModal && !calendlyModal.classList.contains('hidden')) {
        closeCalendlyModal();
      }
      
      // Modales de Privacidad y Términos
      const modals = ['privacidadModal', 'terminosModal'];
      modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && !modal.classList.contains('hidden')) {
          closeModal(modalId);
        }
      });
    }
  });

  // Cerrar modales al hacer clic en el fondo
  ['privacidadModal', 'terminosModal'].forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal(modalId);
        }
      });
    }
  });

  // ==========================================================================
  // UTILIDADES ADICIONALES
  // ==========================================================================
  
  window.showModal = function(modalType) {
    // Funcionalidad para modales futuros
  };

  // Make smart navbar functions globally available
  window.handleNavbarAgendarClick = handleNavbarAgendarClick;
  window.handleMobileAgendarClick = handleMobileAgendarClick;

});
