<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()

// Dynamically update <title> and <link rel="canonical"> on each route change
useHead(computed(() => ({
  title: (route.meta.title as string) || 'Inveh Lighting Solutions – Handcrafted Wooden LED Lamps',
  meta: [
    {
      name: 'description',
      content: (route.meta.description as string) ||
        'Inveh Lighting Solutions crafts premium handmade wooden LED pendant lamps, tube lights, and personalised gifts. Shop unique eco-friendly lighting. Based in Udumalpet, Tamil Nadu, India.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://www.inveh.in${route.path === '/' ? '/' : route.path}`
    }
  ]
})))
</script>

<template>
  <router-view />
</template>

