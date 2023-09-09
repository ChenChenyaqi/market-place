// noinspection JSUnusedGlobalSymbols

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL("./src/pages", import.meta.url)),
      '$': fileURLToPath(new URL("./src/assets", import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  }
})
