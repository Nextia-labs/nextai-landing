/**
 * NEXTIA LANDING - MAIN JAVASCRIPT
 * ================================
 * Funcionalidades principales del sitio web
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // ==========================================================================
  // SMOOTH SCROLL LIBRARY INITIALIZATION
  // ==========================================================================
  
  // Inicializar Smooth Scroll con configuración optimizada
  if (typeof SmoothScroll !== 'undefined') {
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 40000,                    // Velocidad de scroll (ms)
      speedAsDuration: true,         // Velocidad como duración fija
      offset: 60,                    // Offset para navbar fijo
      easing: 'easeInOutCubic',     // Tipo de easing suave
      updateURL: true,               // Actualizar URL con hash
      popstate: true,                // Manejar botón atrás del navegador
      emitEvents: true               // Emitir eventos personalizados
    });
    
    console.log('✅ Smooth Scroll inicializado correctamente');
    
    // Event listeners para debugging
    document.addEventListener('scrollStart', function (event) {
      console.log('🚀 Scroll iniciado hacia:', event.detail.anchor.getAttribute('href'));
    });
    
    document.addEventListener('scrollStop', function (event) {
      console.log('🎯 Scroll completado a:', event.detail.anchor.getAttribute('href'));
    });
    
    // Test inmediato
    setTimeout(() => {
      console.log('🧪 Test disponible: scroll.animateScroll(document.getElementById("services"))');
    }, 2000);
    
  } else {
    console.log('❌ Smooth Scroll library no cargada');
    
    // Fallback temporal
    setTimeout(() => {
      if (typeof SmoothScroll !== 'undefined') {
        console.log('🔄 Reiniciando Smooth Scroll...');
        location.reload();
      }
    }, 1000);
  }
  
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
    // Reinicializar iconos de Lucide después del cambio
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Inicializar tema al cargar la página
  function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    } else if (storedTheme === 'light') {
      setDarkMode(false);
    } else {
      // Usar preferencia del sistema
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

  // Cerrar menú al hacer clic en enlaces o botones
  menu.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });

  // ==========================================================================
  // NAVEGACIÓN SUAVE - COMPLETAMENTE NATIVA
  // ==========================================================================
  
  // Sin funciones personalizadas - solo CSS y HTML nativo
  console.log('Navegación: usando scroll-behavior CSS nativo');

  // ==========================================================================
  // TÍTULOS CLICABLES ADICIONALES - COMPLETAMENTE NATIVO
  // ==========================================================================
  
  function initClickableTitles() {
    // Remover cualquier event listener personalizado del título del hero
    // Dejar que funcione completamente con el href nativo
    console.log('Títulos clicables: usando navegación nativa');
  }

  // Inicializar títulos clicables
  initClickableTitles();

  // ==========================================================================
  // INDICADOR DE NAVEGACIÓN ACTIVA (DESKTOP)
  // ==========================================================================
  
  const links = document.querySelectorAll(".nav-link");
  const indicator = document.getElementById("nav-indicator");
  const navWrapper = document.getElementById("nav-wrapper");

  function updateIndicator() {
    // Buscar el enlace activo que NO sea el botón agendar
    // El indicador debe mostrarse para: Inicio, Servicios, Nosotros, Contacto
    // Solo debe ocultarse para el botón "Agendar reunión"
    const currentLink = document.querySelector(".nav-link.nav-active:not(.btn-agendar-navbar):not(.btn-agendar-section)");
    
    if (!currentLink || !navWrapper || !indicator) {
      // Si no hay enlace activo válido, ocultar indicador
      indicator.style.opacity = '0';
      return;
    }

    const linkRect = currentLink.getBoundingClientRect();
    const wrapperRect = navWrapper.getBoundingClientRect();
    
    // Calcular la posición del indicador con una transición suave
    const targetX = linkRect.left - wrapperRect.left;
    
    // Mostrar y posicionar el indicador
    indicator.style.opacity = '1';
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.height = `${linkRect.height}px`;
    indicator.style.transform = `translateX(${targetX}px) scale(1)`;
    indicator.style.transition = 'all 0.3s ease-in-out';
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
      const navLinks = document.querySelectorAll(`.nav-link[href="#${id}"]`);

      if (entry.isIntersecting && navLinks.length) {
        // Remover clases activas de todos los enlaces
        document.querySelectorAll(".nav-link").forEach(el => {
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

        // Agregar clases activas a los enlaces correspondientes
        navLinks.forEach(link => {
          // Si es el botón agendar, solo marcarlo como activo sin efectos visuales
          if (link.classList.contains('btn-agendar-navbar') || link.classList.contains('btn-agendar-section')) {
            link.classList.add("nav-active");
          } else {
            link.classList.add("nav-active");

            // Efectos especiales para menú móvil
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

  // Observar todas las secciones
  document.querySelectorAll("section[id]").forEach(section => {
    observer.observe(section);
  });

  // ==========================================================================
  // NAVEGACIÓN CON SMOOTH SCROLL LIBRARY
  // ==========================================================================
  
  // Completamente delegado a la librería Smooth Scroll
  function initNavigation() {
    const mobileMenu = document.getElementById('mobileMenu');
    const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');

    // Solo manejar el cierre del menú móvil - Smooth Scroll maneja el resto
    allNavLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        // Cerrar menú móvil si está abierto
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        
        // No preventDefault - dejar que Smooth Scroll maneje el scroll
        console.log('🔗 Navegando con Smooth Scroll a:', link.getAttribute('href'));
      });
    });
    
    // También manejar enlaces del footer y otros elementos
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    footerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        console.log('📄 Footer navigation a:', link.getAttribute('href'));
      });
    });
  }

  // Inicializar navegación
  initNavigation();

  // ==========================================================================
  // EVENTOS DE REDIMENSIONAMIENTO
  // ==========================================================================
  
  window.addEventListener("resize", updateIndicator);
  
  // Inicializar indicador
  updateIndicator();

  // ==========================================================================
  // UTILIDADES ADICIONALES
  // ==========================================================================
  
  // Función para mostrar modales (si se implementan en el futuro)
  window.showModal = function(modalType) {
    // Funcionalidad a implementar
  };

  // ==========================================================================
  // FORMULARIO DE CONTACTO CON PASOS
  // ==========================================================================
  
  let currentStep = 1;
  const totalSteps = 3;

  // Función para avanzar al siguiente paso
  window.nextStep = function() {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        showStep(currentStep + 1);
      }
    }
  };

  // Función para retroceder al paso anterior
  window.prevStep = function() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  };

  // Función para mostrar un paso específico
  function showStep(step) {
    // Ocultar todos los pasos
    document.querySelectorAll('.form-step').forEach(stepEl => {
      stepEl.style.display = 'none';
    });

    // Mostrar el paso actual
    const targetStep = document.querySelector(`[data-step="${step}"]`);
    if (targetStep && targetStep.classList.contains('form-step')) {
      targetStep.style.display = 'block';
    }

    // Actualizar indicadores
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
      const stepNum = index + 1;
      const circle = indicator.querySelector('div');
      
      if (stepNum <= step) {
        indicator.classList.add('active');
        circle.classList.remove('bg-gray-300', 'dark:bg-gray-600', 'text-gray-600', 'dark:text-gray-300');
        circle.classList.add('bg-primary-blue', 'text-white');
      } else {
        indicator.classList.remove('active');
        circle.classList.remove('bg-primary-blue', 'text-white');
        circle.classList.add('bg-gray-300', 'dark:bg-gray-600', 'text-gray-600', 'dark:text-gray-300');
      }
    });

    currentStep = step;
  }

  // Función para validar el paso actual
  function validateCurrentStep() {
    const currentStepEl = document.querySelector(`[data-step="${currentStep}"].form-step`);
    const requiredFields = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
    
    let isValid = true;
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        isValid = false;
      } else {
        field.classList.remove('border-red-500');
      }
    });

    if (!isValid) {
      alert('Por favor completa todos los campos requeridos.');
    }

    return isValid;
  }

  // Manejar envío del formulario
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateCurrentStep()) {
        // Recopilar todos los datos del formulario
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          company: document.getElementById('company').value,
          subject: document.getElementById('subject').value,
          budget: document.getElementById('budget').value,
          message: document.getElementById('message').value
        };

        console.log('Datos del formulario:', formData);
        
        // Aquí puedes agregar la lógica para enviar los datos
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        
        // Resetear formulario
        contactForm.reset();
        showStep(1);
      }
    });
  }

  // ==========================================================================
  // ANIMACIONES ADICIONALES
  // ==========================================================================
  
  // Animaciones de aparición aleatoria para letras del hero
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

    // Letras con descendientes que necesitan tratamiento especial
    const descendersLetters = ['g', 'j', 'p', 'q', 'y', 'ñ'];

    letterElements.forEach((letter, index) => {
      // Verificar si la letra tiene descendientes
      const letterText = letter.textContent.toLowerCase();
      if (descendersLetters.includes(letterText)) {
        letter.classList.add('letter-descender');
      }

      // Seleccionar una animación aleatoria para cada letra
      const randomAnimation = animationClasses[Math.floor(Math.random() * animationClasses.length)];
      
      // Agregar la clase de animación
      letter.classList.add(randomAnimation);
      
      // Stagger el delay para que aparezcan secuencialmente
      const delay = index * 0.1 + Math.random() * 0.2; // Base delay + random variation
      letter.style.animationDelay = `${delay}s`;
      
      // Pequeña variación en la duración para más naturalidad
      const duration = 0.8 + Math.random() * 0.4; // 0.8s - 1.2s
      letter.style.animationDuration = `${duration}s`;
    });
  }

  // Función para reiniciar las animaciones
  window.restartLetterAnimations = function() {
    const letterElements = document.querySelectorAll('.letter-stream');
    letterElements.forEach(letter => {
      // Remover todas las clases de animación
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
      
      // Reset opacity para reiniciar
      letter.style.opacity = '0';
    });
    
    // Reinicializar después de un pequeño delay
    setTimeout(initLetterAnimations, 100);
  };

  // Inicializar animaciones de letras
  initLetterAnimations();

  // ==========================================================================
  // REVEAL ANIMATIONS
  // ==========================================================================
  
  // Función para revelar elementos cuando entran en viewport
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) {
      return;
    }

    // Crear el observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregar un delay basado en el índice del elemento
          const elementIndex = Array.from(revealElements).indexOf(entry.target);
          const delay = elementIndex * 200; // 200ms de delay entre cada elemento
          
          setTimeout(() => {
            entry.target.classList.add('reveal-visible');
          }, delay);
          
          // Dejar de observar después de revelar
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05, // Se activa cuando el 5% del elemento es visible
      rootMargin: '0px 0px -10px 0px'
    });

    // Observar cada elemento
    revealElements.forEach((element, index) => {
      observer.observe(element);
    });
  }

  // Inicializar las animaciones de revelación
  initRevealAnimations();

  // ==========================================================================
  // MODAL DE CALENDLY
  // ==========================================================================

  // Event listener para cerrar modal con Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const calendlyModal = document.getElementById('calendlyModal');
      if (calendlyModal && !calendlyModal.classList.contains('hidden')) {
        calendlyModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }
  });

  const calendlyModal = document.getElementById('calendlyModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const calendlyEmbed = document.getElementById('calendly-embed');

  // Función para abrir el modal
  window.openCalendlyModal = function() {
    if (calendlyModal) {
      calendlyModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      // Solo cargar Calendly si no está ya cargado
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

  // Función para cerrar el modal
  function closeCalendlyModal() {
    if (calendlyModal) {
      calendlyModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  // Event listeners para cerrar el modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCalendlyModal);
  }

  // Cerrar modal al hacer clic en el fondo
  if (calendlyModal) {
    calendlyModal.addEventListener('click', function(e) {
      if (e.target === calendlyModal) {
        closeCalendlyModal();
      }
    });
  }

});
