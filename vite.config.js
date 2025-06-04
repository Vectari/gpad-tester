import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from 'vite-plugin-prerender'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/main/one', '/main/two', '/main/three', '/main/four', '/about'], // podaj wszystkie ścieżki
    }),
  ],
})
