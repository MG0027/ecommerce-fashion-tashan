import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['jwt-decode']
  },
  server: {
    host: '0.0.0.0',  // Allow connections from outside the container
    port: 5173
  },
  plugins: [react()],
})

