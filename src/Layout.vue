<template>
  <!-- Logo -->
  <picture class="logo-container">
    <img
      class="logo"
      src="/inveh_logo.png"
      alt="DP"
      width="150"
      height="150"
      fetchpriority="high"
      decoding="async"
    />
  </picture>

  <!-- Banner -->
  <div class="banner">
    <img
      class="banner-image"
      src="/shop_front.jpeg"
      alt="Banner"
    />
  </div>

  <!-- Navigation -->
  <nav class="main-nav">
    <router-link to="/">Home</router-link>
    <router-link to="/Contact">Contact</router-link>
  </nav>

  <!-- Child route renders here -->
  <router-view />
</template>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.logo-container {
  display: block;
  margin: 1.5rem 0 0 1.5rem;
  position: relative;
  z-index: 10;
  margin-bottom: -200px;
}

.logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
  display: block;
}

.banner {
  width: 100%;
  position: relative;
  margin-bottom: 0;
  margin-top: 1.5rem;
}

.banner-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: middle;
  display: block;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0 2rem 0;
}

.main-nav a {
  color: #0A66C2;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.2s;
}

.main-nav a.router-link-exact-active {
  color: #003366;
  text-decoration: underline;
}

.main-nav a:hover {
  color: #003366;
}
</style>
