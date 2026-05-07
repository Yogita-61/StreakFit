/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fitness: {
          orange: '#ff6b35',
          green: '#22c55e',
          ink: '#18212f',
          mist: '#f5f7fb'
        }
      },
      boxShadow: {
        soft: '0 18px 55px rgba(24, 33, 47, 0.10)',
        glow: '0 18px 45px rgba(255, 107, 53, 0.22)'
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease both',
        'scale-in': 'scaleIn 0.3s ease both',
        'toast-in': 'toastIn 0.28s ease both'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
}
