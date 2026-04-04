<script setup lang="ts">
import { computed } from 'vue';
import { cart, isCartOpen } from './store/cart';
import CartDrawer from './components/CartDrawer.vue';

const cartTotal = computed(() => cart.reduce((total, item) => total + item.quantity, 0));

const openCart = () => {
  isCartOpen.value = true;
};
</script>

<template>
  <div class="layout-wrapper">
    <!-- Announcement Bar -->
    <div class="announcement-bar">
      <span>Welcome to Inveh Lighting Solutions</span>
    </div>

    <!-- Main Header -->
    <header class="oorjaa-header">
      <div class="header-inner">
        <!-- Left: Brand image logo -->
        <div class="header-item left">
          <img class="header-logo-img" src="/inveh_logo.webp" alt="Inveh Logo" />
        </div>

        <!-- Center: Logo -->
        <div class="header-item center">
          <router-link to="/" class="brand-logo">INVEH</router-link>
        </div>

        <!-- Right: Cart -->
        <div class="header-item right">
          <div class="cart-icon-wrapper" @click="openCart">
            <svg class="icon cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span v-if="cartTotal > 0" class="cart-badge">{{ cartTotal }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/Contact">Contact</router-link>
      </nav>
    </header>

    <!-- Child route renders here -->
    <main class="main-content">
      <router-view />
    </main>
    
    <footer class="site-footer">
      <p>&copy; 2026 Inveh Lighting. All Rights Reserved.</p>
    </footer>

    <!-- Cart Drawer -->
    <CartDrawer />
  </div>
</template>

<style>
/* Global imports for the target typography */
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600&display=swap');

body {
  margin: 0;
  padding: 0;
  color: #1a1a1a;
  background-color: #ffffff;
  font-family: 'Work Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.announcement-bar {
  background-color: #f7f7f7;
  color: #1a1a1a;
  text-align: center;
  padding: 8px 15px;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.oorjaa-header {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 20px;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1000;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 40px 15px;
}

.header-item {
  flex: 1;
  display: flex;
  align-items: center;
}

.header-item.left {
  justify-content: flex-start;
}

.header-item.center {
  justify-content: center;
}

.header-item.right {
  justify-content: flex-end;
  gap: 24px;
}

.header-logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.brand-logo {
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 0.25em;
  color: #1a1a1a;
  text-decoration: none;
  text-transform: uppercase;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #1a1a1a;
  transition: opacity 0.2s ease;
}

.icon:hover {
  opacity: 0.6;
}

.cart-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #1a1a1a;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 5px;
}

.main-nav a {
  /* Exactly mimicking Oorjaa's font-size and color */
  color: #1a1a1a;
  font-size: 14px;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.2s ease;
  position: relative;
}

.main-nav a::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -4px;
  left: 0;
  background-color: #1a1a1a;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.main-nav a:hover::after,
.main-nav a.router-link-exact-active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.main-content {
  flex: 1;
  padding: 0;
}

.site-footer {
  text-align: center;
  padding: 40px 20px;
  font-size: 12px;
  color: #888;
  border-top: 1px solid #eaeaea;
  margin-top: auto;
}

</style>
