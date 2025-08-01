/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    screens: { 
      sm: '640px', 
      md: '768px', 
      'md-lg': '868px',  // Breakpoint personalizado para navbar
      lg: '1024px', 
      xl: '1280px', 
      xxl: '1480px' 
    },
    extend: {
      colors: {
        primary: { 
          blue: '#00CFFF', 
          violet: '#C500F5', 
          cyan: '#00FFE0' 
        },
        dark: { 
          900: '#000000', 
          800: '#0A0A0A', 
          700: '#1A1A1A' 
        },
        light: { 
          plasma: '#F0F9FF' 
        },
        gray: { 
          750: '#2D3748' 
        }
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-in",
        gradientFlow: "gradientFlow 7s ease infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        slideBubble: "slideBubble 0.6s ease-in-out"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 4px rgba(0, 255, 255, 0.2), 0 0 8px rgba(197, 0, 245, 0.2)"
          },
          "50%": {
            boxShadow: "0 0 6px rgba(0, 255, 255, 0.3), 0 0 10px rgba(197, 0, 245, 0.3)"
          }
        },
        slideBubble: {
          "0%": { transform: "translateX(-50%) scale(0.8)", opacity: 0 },
          "100%": { transform: "translateX(0) scale(1)", opacity: 1 }
        }
      }
    }
  },
  plugins: [],
}
