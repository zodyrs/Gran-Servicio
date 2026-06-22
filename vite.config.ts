import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      includeAssets: ['favicon.svg', 'icons.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        id: 'https://gran-servicio.vercel.app/?source=pwa',
        name: 'Gran Servicio',
        short_name: 'GranServicio',
        description: 'App de servicios y suscripciones conectada a Supabase.',
        dir: 'ltr',
        lang: 'en',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        scope: '/',
        orientation: 'portrait',
        categories: ['business', 'utilities'],
        shortcuts: [
          { name: 'Ver servicios', short_name: 'Servicios', url: '/servicios' },
          { name: 'Registro profesional', short_name: 'Registro', url: '/registro-profesional' }
        ],
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ],
})