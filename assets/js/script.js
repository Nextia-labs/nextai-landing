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
  // NAVEGACIÓN SUAVE
  // ==========================================================================
  
  // Función global para scroll suave
  window.scrollToSection = function (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Actualizar URL sin recargar la página
      history.pushState(null, null, `#${sectionId}`);
    }
  };

  // ==========================================================================
  // TÍTULOS CLICABLES ADICIONALES
  // ==========================================================================
  
  // Inicializar eventos de clic para títulos clicables después de que se cargue el DOM
  function initClickableTitles() {
    // Texto animado del hero
    const heroTitle = document.querySelector('.gradient-text.cursor-pointer');
    if (heroTitle) {
      heroTitle.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection('services');
      });
    }

    // Enlaces del logo hacia "about"
    const logoLinks = document.querySelectorAll('a[href="#about"]');
    logoLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection('about');
      });
    });

    // Títulos de secciones con cursor pointer
    const clickableTitles = document.querySelectorAll('h2.cursor-pointer');
    clickableTitles.forEach(title => {
      title.addEventListener('click', function(e) {
        e.preventDefault();
        // Extraer el ID de la sección del onclick si existe
        const onclickAttr = this.getAttribute('onclick');
        if (onclickAttr) {
          const match = onclickAttr.match(/scrollToSection\('([^']+)'\)/);
          if (match) {
            scrollToSection(match[1]);
          }
        }
      });
    });

    console.log('🖱️ Títulos clicables inicializados');
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
    const currentLink = document.querySelector(".nav-link.nav-active:not(.btn-agendar-navbar):not(.btn-agendar-section)");
    if (!currentLink || !navWrapper || !indicator) {
      // Si no hay enlace activo o es el botón agendar, ocultar el indicador
      if (indicator) {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateX(-100px) scale(0.8)';
      }
      return;
    }

    const linkRect = currentLink.getBoundingClientRect();
    const wrapperRect = navWrapper.getBoundingClientRect();

    // Mostrar y posicionar el indicador
    indicator.style.opacity = '1';
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.height = `${linkRect.height}px`;
    indicator.style.transform = `translateX(${linkRect.left - wrapperRect.left}px) scale(1)`;
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
  // NAVEGACIÓN CON SCROLL SUAVE AL HACER CLIC
  // ==========================================================================
  
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = link.getAttribute('href');
      const id = href && href.startsWith('#') ? href.slice(1) : null;
      
      if (id) {
        const section = document.getElementById(id);
        if (section) {
          // Si es el botón agendar, ocultar inmediatamente el indicador
          if (link.classList.contains('btn-agendar-navbar') || link.classList.contains('btn-agendar-section')) {
            if (indicator) {
              indicator.style.opacity = '0';
              indicator.style.transform = 'translateX(-100px) scale(0.8)';
            }
          }
          
          section.scrollIntoView({ behavior: 'smooth' });
          // Actualizar URL sin recargar la página
          history.pushState(null, null, `#${id}`);
        }
      }
    });
  });

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
    console.log(`Modal ${modalType} - Funcionalidad a implementar`);
  };

  // Manejar formulario de contacto (básico)
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Aquí puedes agregar la lógica de envío del formulario
      console.log('Formulario enviado - Integrar con backend');
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
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

  // Función para reiniciar las animaciones (útil si se quiere repetir)
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
    console.log('🔍 Elementos .reveal encontrados:', revealElements.length);
    
    if (revealElements.length === 0) {
      console.warn('⚠️ No se encontraron elementos con clase .reveal');
      return;
    }

    // Crear el observer con configuración más permisiva
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('📦 Observando:', entry.target.className, 'Visible:', entry.isIntersecting);
        
        if (entry.isIntersecting) {
          console.log('✨ Revelando elemento');
          
          // Agregar un delay basado en el índice del elemento
          const elementIndex = Array.from(revealElements).indexOf(entry.target);
          const delay = elementIndex * 200; // 200ms de delay entre cada elemento
          
          setTimeout(() => {
            entry.target.classList.add('reveal-visible');
          }, delay);
          
          // Opcional: dejar de observar después de revelar
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05, // Se activa cuando el 5% del elemento es visible
      rootMargin: '0px 0px -10px 0px' // Margen más permisivo
    });

    // Observar cada elemento
    revealElements.forEach((element, index) => {
      console.log(`👁️ Observando elemento ${index + 1}:`, element);
      observer.observe(element);
    });
  }

  // Inicializar las animaciones de revelación
  initRevealAnimations();

  // ==========================================================================
  // PERFORMANCE Y DEBUGGING
  // ==========================================================================
  
  // Solo en desarrollo - eliminar en producción
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 NextIA Landing - Scripts cargados correctamente');
    console.log('📱 Modo oscuro:', html.classList.contains('dark') ? 'Activado' : 'Desactivado');
    console.log('✨ Animaciones de letras inicializadas');
    console.log('🖱️ Títulos clicables activados');
    
    // Agregar funcionalidad de debugging para las animaciones
    console.log('🎬 Para reiniciar animaciones de letras: restartLetterAnimations()');
  }
});
