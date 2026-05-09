<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { productCategories, type ProductImage } from './data/products'

const router = useRouter()

const goToProduct = (sku: string) => {
  router.push({ name: 'Product', params: { id: sku } })
}

// Removed formatPrice logic as its handled natively in template
</script>

<template>
  <main>
    <!-- Visually hidden H1 for SEO – does not affect visual layout -->
    <h1 class="visually-hidden">Inveh Lighting Solutions – Shop Handcrafted Wooden LED Lamps Online</h1>

    <!-- About Section -->
    <section class="about-section" aria-label="About Inveh Lighting Solutions">
      <div class="about-inner">
        <h2 class="about-heading">About Us</h2>
        <div class="about-rule"></div>
        <p class="about-text">
          Welcome to Inveh Lighting Solutions — where nature meets craftsmanship. Each piece in our
          collection is handcrafted from premium pine wood, engineered wood and acrylic using
          state-of-the-art techniques. We blend modern manufacturing with artisanal warmth to create
          lamps that don't just illuminate a room — they <em>transform</em> it.
        </p>
      </div>
    </section>

    <section class="product-grid" aria-label="Product catalog">
      <article
        v-for="product in productCategories"
        :key="product.model_num"
        class="product-card"
        @click="goToProduct(product.model_num)"
        role="button"
        tabindex="0"
        @keydown.enter="goToProduct(product.model_num)"
        :aria-label="`View ${product.model_name}`"
      >
        <div class="product-image-container">
          <img
            v-if="product.images.length > 0"
            :src="product.images[0]!.src"
            :alt="`${product.model_name} – handcrafted wooden LED lamp by Inveh Lighting`"
            class="product-image"
            loading="lazy"
            width="400"
            height="500"
          />
        </div>

        <div class="product-info">
          <h2 class="product-title">{{ product.model_name }}</h2>
          <p class="product-price" v-if="product.model_price > 0">
            <span v-if="product.discount > 0" class="original-price">Rs. {{ product.model_price }}</span>
            <span class="selling-price">Rs. {{ product.model_price - (product.discount || 0) }}</span>
          </p>
        </div>
      </article>
    </section>
  </main>
</template>


<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
}

/* ── About Section ────────────────────────────────────────────────────────── */
.about-section {
  background-color: #ffffff;
  border-top: 3px solid #02163b;
  border-bottom: 1px solid #e5e5e5;
  padding: 3rem 4rem;
  animation: fadeInDown 0.6s ease both;
}

.about-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-heading {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #02163b;
  margin: 0 0 0.75rem 0;
}

.about-rule {
  width: 48px;
  height: 2px;
  background-color: #fec955;
  margin: 0 auto 1.25rem;
  border-radius: 2px;
}

.about-text {
  font-size: 0.97rem;
  line-height: 1.8;
  color: #444;
  margin: 0;
  font-weight: 400;
}

.about-text em {
  font-style: italic;
  color: #02163b;
  font-weight: 500;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .about-section {
    padding: 2rem 1.25rem;
  }
}

/* Visually hidden but readable by screen-readers and search crawlers */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem 1.5rem;
  padding: 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
    padding: 0.5rem;
    gap: 1.5rem 0.5rem;
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.product-image-container {
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  position: relative;
  background: #f4f4f4;
  margin-bottom: 1rem;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.product-info {
  text-align: center;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-title {
  text-align: center;
  color: #111;
  font-size: 0.95rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
}

.product-price {
  text-align: center;
  color: #555;
  font-size: 0.95rem;
  font-weight: 400;
  margin: 0;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 0.5rem;
  font-size: 0.85em;
}

.selling-price {
  color: #111;
  font-weight: 600;
}
</style>