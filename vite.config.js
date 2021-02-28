import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  plugins: [reactRefresh()]
})
