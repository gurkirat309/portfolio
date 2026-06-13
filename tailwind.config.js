/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#070a0f',
        cyan: '#00f0c0',
        blue: '#0080ff',
        purple: '#6040c0',
        gold: '#ffaa00',
        panel: 'rgba(0,240,192,0.04)',
        border: 'rgba(0,240,192,0.12)',
        'text-bright': '#e0f0ff',
        'text-muted': 'rgba(224,240,255,0.45)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
