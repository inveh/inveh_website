<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()

// Dynamically update <title> and other tags on each route change
useHead(computed(() => {
  const title = (route.meta.title as string) || 'Inveh Lighting Solutions – Handcrafted Wooden LED Lamps';
  const description = (route.meta.description as string) ||
    'Inveh Lighting Solutions crafts premium handmade wooden LED pendant lamps, tube lights, and personalised gifts. Shop unique eco-friendly lighting. Based in Udumalpet, Tamil Nadu, India.';
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

