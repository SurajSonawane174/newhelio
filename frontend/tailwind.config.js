/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ['var(--font-inter)']
      },
      colors:{
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        muted: 'rgb(var(--muted))',
        accent: 'rgb(var(--accent))',
      },
      backgroundImage:{
        'firefly-radial': "radial-gradient(50% 50% at 50% 50%, rgba(253, 255, 80, 0.5) 0%, rgba(217,217,217, 0) 100%)"
      },
      boxShadow:{
        'glass-inset': 'inset 0 17px 5px -9px rgba(128, 185, 224, 0.05)',
        'glass-sm': '0 8px 24px rgba(177, 185, 255, 0.4), 0 4px 12px rgba(136, 96, 230, 0.4)',
      },
      keyframes:{
      'spin-reverse':{
        '0%': {transform: 'rotate(0deg)'},
        '100%': {transform: 'rotate(-360deg)'}
      },
      fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation:{
        'spin-slow': 'spin 40s linear infinite',
        'spin-slow-reverse': 'spin-reverse 40s linear infinite',
        fadeIn: "fadeIn 2s ease-in-out forwards",
      },
      screens:{
        xs: '480px',
      }
    },
  },
  plugins: [],
};

