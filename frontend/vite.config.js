import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 0.0.0.0'a bind eder - network'ten erişim sağlar
    port: 5173, // Port numarası
  },
  base: process.env.NODE_ENV === 'production' ? '/menu-app/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})
