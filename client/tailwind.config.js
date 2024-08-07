/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e63946",  // Warna merah yang lebih lembut
        secondary: "#f1faee",  // Warna putih lembut untuk kontras
        accent: "#a8dadc",  // Warna biru pucat untuk aksen
        neutral: "#1d1d1d",  // Warna abu-abu gelap
        "base-50": "#2a2a2a",  // Abu-abu gelap dengan sedikit kecerahan
        "base-100": "#1f1f1f",  // Abu-abu sangat gelap
        "base-150": "#141414",  // Abu-abu hampir hitam
        "base-200": "#0e0e0e",  // Abu-abu sangat hitam
        info: "#00a8cc",  // Biru pirus yang cerah untuk info
        success: "#4caf50",  // Hijau yang menenangkan
        warning: "#ffca28",  // Kuning yang lebih lembut
        error: "#ff6f61",  // Merah coral untuk error
      },
    },
  },

  plugins: [],
}

