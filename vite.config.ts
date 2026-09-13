import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
const seo = JSON.parse(readFileSync(new URL('./src/data/seo_list.json', import.meta.url), 'utf8')) as {
  siteTitle: string
  siteDescription: string
  socialDescription: string
  keywords: string[]
  areasServed: string[]
  knowsAbout: string[]
}

const escapeHtmlAttribute = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

const seoTemplatePlugin = {
  name: 'seo-template',
  transformIndexHtml(html: string) {
    const replacements: Record<string, string> = {
      __SEO_TITLE__: escapeHtmlAttribute(seo.siteTitle),
      __SEO_DESCRIPTION__: escapeHtmlAttribute(seo.siteDescription),
      __SEO_KEYWORDS__: escapeHtmlAttribute(seo.keywords.join(', ')),
      __SEO_SOCIAL_DESCRIPTION__: escapeHtmlAttribute(seo.socialDescription),
      __SEO_AREAS_JSON__: JSON.stringify(seo.areasServed),
      __SEO_KNOWS_ABOUT_JSON__: JSON.stringify(seo.knowsAbout),
    }

    return Object.entries(replacements).reduce(
      (result, [placeholder, value]) => result.replaceAll(placeholder, value),
      html,
    )
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    seoTemplatePlugin,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/',
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
