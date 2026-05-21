import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/clpe-dashboard/', // Adapter selon le nom du dépôt GitHub
})
