<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import seo from './data/seo_list.json'

const route = useRoute()

// Dynamically update <title> and other tags on each route change
useHead(computed(() => {
  const title = (route.meta.title as string) || seo.siteTitle;
  const description = (route.meta.description as string) || seo.siteDescription;
  const canonicalUrl = `https://www.inveh.in${route.path === '/' ? '/' : route.path}`;
  const defaultImage = 'https://www.inveh.in/inveh_logo.webp';

  return {
    title,
    meta: [
      { name: 'description', content: description },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: defaultImage },
      { property: 'og:site_name', content: 'Inveh Lighting Solutions' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: defaultImage }
    ],
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl
      }
    ]
  };
}))
</script>

<template>
  <router-view />
</template>

