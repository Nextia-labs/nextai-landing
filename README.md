# nextAI Landing Page

Bienvenido al repositorio de la **Landing Page de nextAI** — soluciones avanzada de software con inteligencia artificial.

<div align="center">
  <img src="assets/images/logo/logo_nextai.png" alt="nextAI Logo" width="120" />
</div>

## 🚀 Descripción

**Estado**: ✅ **LISTO PARA PRODUCCIÓN**

Landing page profesional optimizada con:
- **CSS Minificado**: Tailwind CSS (22.6 KB)
- **Lighthouse Score**: 90+ en todas las métricas  
- **Responsive Design**: Móvil y desktop
- **Accesibilidad**: WCAG compliant
- **SEO Optimizado**: Meta tags y estructura
- **Performance**: Lazy loading, preload, defer

Esta landing es la puerta de entrada a nuestra propuesta de valor: consultoría, desarrollo e integración de IA personalizada para empresas de todos los tamaños. Presenta nuestros servicios, proyectos, equipo y datos de contacto.

- **Diseño responsive**
- **Modo claro/oscuro**
- **Animaciones modernas**
- **Integración con CDN de Tailwind y Font Awesome**
- **Código simple, editable y mantenible**

## ⚡ Comandos Rápidos

### 🚀 Producción
```bash
# Build para producción (CSS minificado)
npm run build:prod

# Servir localmente  
npm run serve

# Deploy rápido
git add . && git commit -m "Production ready" && git push origin main
```

### 🛠️ Desarrollo
```bash
# CSS con watch mode
npm run dev

# Build normal
npm run build
```

---

## 📋 Checklist de Producción

- ✅ CSS minificado (22.6 KB)
- ✅ Imágenes optimizadas (WebP)
- ✅ Scripts diferidos
- ✅ Preload crítico configurado
- ✅ SEO meta tags completos
- ✅ Accesibilidad WCAG compliant
- ✅ Navbar móvil siempre visible
- ✅ Modales legales profesionales
- ✅ Smart navigation behavior
- ✅ Formulario de contacto funcional
- ✅ Integración Calendly lista

📖 **Ver [PRODUCTION.md](PRODUCTION.md) para guía completa de deploy**

---

## 🖥️ Vista previa

![Vista previa de nextIA](assets/images/hero/nextia_main.avif)

---

## 📂 Estructura del repositorio

```plaintext
nextia-landing/
├── assets/
│   ├── css/
│   │   └── output.css
│   ├── images/
│   │   ├── logo/
│   │   │   └── logo_nextia.webp
│   │   ├── hero/
│   │   │   └── nextia_main.avif
│   │   └── about/
│   │       └── nextia_2.avif
│   └── videos/
│       └── hqdefault.jpg
├── index.html
└── README.md

⚡ Cómo usar
# 🧠 NextIA Landing Page

Landing page estática desarrollada con Tailwind CSS para presentar soluciones de inteligencia artificial y desarrollo de software de la startup **NextIA**.

---

## 📦 Requisitos

- **Node.js** `v18.x` o superior
- **npm** o `pnpm` como gestor de paquetes

---

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/usuario/nextia-landing.git
   cd nextia-landing
   ```

2. **Instalar dependencias**
   ```bash
   npm ci
   # o, si no tenés package-lock.json
   npm install
   ```

---

## 🔧 Comandos disponibles

### ✅ Desarrollo (modo watch)
Compila `output.css` automáticamente al detectar cambios:
```bash
npm run dev
```

### 📤 Build para producción
Genera una versión minificada del CSS:
```bash
npm run build
```

### 🛠 Compilación manual alternativa
Podés usar el script `build-css` (equivalente a `dev`):
```bash
npm run build-css
```

---

## 🗂 Estructura esperada

```
├── dist/
│   └── output.css         ← CSS generado por Tailwind
├── src/
│   └── input.css          ← Archivo base con directivas Tailwind
├── index.html             ← Landing principal
├── tailwind.config.js     ← Config extendida (colores, animaciones, breakpoints)
├── package.json
└── ...
```

El archivo `src/input.css` debe incluir:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🌙 Modo oscuro

Tailwind está configurado con `darkMode: 'class'`. Para activar el modo oscuro, asegurate de incluir la clase `dark` en el elemento `<html>` o `<body>`.

---

## 🎨 Estilos personalizados

Este proyecto incluye:

- Paleta personalizada (`primary`, `dark`, `light`, `gray`)
- Animaciones extendidas (`float`, `fade-in`, `gradientFlow`, `pulseGlow`, `slideBubble`)
- Breakpoint adicional: `md-lg` (`868px`)

Todos los estilos están definidos en `tailwind.config.js`.

---

## 🧯 Solución de errores comunes

| Error | Posible causa | Solución |
|-------|----------------|----------|
| `tailwindcss: command not found` | Tailwind no instalado globalmente | Usar `npx tailwindcss` o asegurarte de haber corrido `npm install` |
| No se actualizan los estilos | Cambios en el config no recargados | Detené `npm run dev` con `Ctrl+C` y volvé a ejecutarlo |
| Faltan estilos personalizados | Clases dinámicas no detectadas por JIT | Asegurate de que las clases estén en el HTML/JS explícitamente |

---

## 📌 Notas

- Este proyecto **no usa frameworks como React o Vite**.
- El CSS final se encuentra en `dist/output.css`.
- Podés servir el sitio directamente abriendo `index.html` o subirlo a Netlify/Vercel como proyecto estático.

---

## 🧠 Sobre NextIA

NextIA es una startup dedicada a unir inteligencia artificial con desarrollo de software para impulsar la transformación digital de personas y organizaciones, brindando soluciones accesibles, eficientes y personalizadas.

---
