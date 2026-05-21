<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { productCategories } from './data/products'
import { addToCartStore, isCartOpen } from './store/cart'

const route = useRoute()
const router = useRouter()

const productId = computed(() => {
  return route.params.id as string
})

const product = computed(() => productCategories.find(p => p.model_num === productId.value))

// Dynamic SEO head tags per product
useHead(computed(() => {
  const p = product.value
  if (!p) return { title: 'Product Not Found – Inveh Lighting Solutions' }
  const sellingPrice = p.model_price - (p.discount || 0)
  return {
    title: `${p.model_name} – Inveh Lighting Solutions | Handcrafted Wooden LED Lamp`,
    meta: [
      {
        name: 'description',
        content: p.description
          ? `${p.description} | Buy ${p.model_name} from Inveh Lighting Solutions.`
          : `Buy the ${p.model_name} handcrafted wooden LED lamp from Inveh Lighting Solutions. Starting at Rs. ${sellingPrice}.`
      },
      { property: 'og:title', content: `${p.model_name} – Inveh Lighting Solutions` },
      { property: 'og:description', content: p.description || `Handcrafted wooden LED lamp by Inveh Lighting Solutions.` },
      { property: 'og:image', content: p.images[0]?.src || 'https://www.inveh.in/inveh_logo.webp' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.model_name,
          sku: p.model_num,
          description: p.description,
          image: p.images.map(img => `https://www.inveh.in${img.src}`),
          brand: { '@type': 'Brand', name: 'Inveh Lighting Solutions' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: sellingPrice,
            availability: 'https://schema.org/InStock',
            url: `https://www.inveh.in/#/product/${p.model_num}`,
            seller: { '@type': 'Organization', name: 'Inveh Lighting Solutions' }
          }
        })
      }
    ]
  }
}))

const currentImageIndex = ref(0)
const isDescriptionOpen = ref(true)

const goBack = () => {
  router.push('/')
}

const toggleDescription = () => {
  isDescriptionOpen.value = !isDescriptionOpen.value
}

const quantity = ref(1)

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value) {
    addToCartStore({
      model_name: product.value.model_name,
      model_num: product.value.model_num,
      model_price: product.value.model_price,
      discount: product.value.discount || 0,
      quantity: quantity.value
    });
    isCartOpen.value = true;
  }
}
</script>

<template>
  <div class="product-detail-page" v-if="product">
    <!-- Semantic breadcrumb for SEO -->
    <nav aria-label="Breadcrumb" class="breadcrumb-nav">
      <ol class="breadcrumb-list">
        <li><router-link to="/">Home</router-link></li>
        <li aria-current="page">{{ product.model_name }}</li>
      </ol>
    </nav>

    <div class="product-layout">
      <!-- LEFT COLUMN -->
      <div class="left-column">
        <div class="gallery">
          <!-- Desktop Thumbnails (Left side of gallery) -->
          <div class="thumbnails" v-if="product.images.length > 1">
            <img 
              v-for="(img, idx) in product.images" 
              :key="idx" 
              :src="img.src" 
              :class="{ active: currentImageIndex === idx }"
              @click="currentImageIndex = idx"
              class="thumbnail"
              :alt="`${product.model_name} – view ${idx + 1}`"
              loading="lazy"
            />
          </div>

          <!-- Main Image -->
          <div class="main-image-container">
            <img 
              v-if="product.images.length > 0"
              :src="product.images[currentImageIndex]?.src" 
              :alt="product.model_name" 
              class="main-image"
            />
          </div>
        </div>

        <!-- Accordions below gallery -->
        <div class="accordions" v-if="product.description">
          <div class="accordion-item">
            <button class="accordion-header" @click="toggleDescription">
              <span>Description</span>
              <span class="accordion-icon">{{ isDescriptionOpen ? '−' : '+' }}</span>
            </button>
            <div class="accordion-content" v-show="isDescriptionOpen">
              <p>{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN (Sticky Sidebar) -->
      <div class="right-sidebar">
        <div class="sticky-content">
          <h1 class="product-title">{{ product.model_name }}</h1>
          <p class="product-model-number">SKU: {{ product.model_num }}</p>
          <div class="price-container">
            <h2 class="product-price" v-if="product.model_price > 0">
              <span v-if="product.discount > 0" class="original-price">Rs. {{ product.model_price }}</span>
              <span class="selling-price">Rs. {{ product.model_price - (product.discount || 0) }}</span>
            </h2>
            <span class="tax-info">Tax included. Shipping calculated at checkout.</span>
          </div>

          <div class="quantity-selector">
            <label>Quantity</label>
            <div class="qty-controls">
              <button class="qty-btn" @click="decrementQuantity">−</button>
              <input type="text" :value="quantity" readonly class="qty-input" />
              <button class="qty-btn" @click="incrementQuantity">+</button>
            </div>
          </div>

          <div class="action-buttons">
            <button class="add-to-cart-btn" @click="addToCart">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Product not found</h2>
    <nav aria-label="Breadcrumb" class="breadcrumb-nav">
      <ol class="breadcrumb-list">
        <li><router-link to="/">Home</router-link></li>
      </ol>
    </nav>
  </div>
</template>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
}

.product-detail-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 4rem;
}

.breadcrumb-nav {
  margin-bottom: 2rem;
}

.breadcrumb-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.breadcrumb-list li:not(:last-child)::after {
  content: '›';
  margin-left: 0.5rem;
  color: #ccc;
}

.breadcrumb-list a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-list a:hover {
  color: #000;
}

.breadcrumb-list li[aria-current='page'] {
  color: #111;
  font-weight: 500;
}

.product-layout {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

/* LEFT COLUMN */
.left-column {
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.gallery {
  display: flex;
  gap: 1.5rem;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80px;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
  border: 1px solid #ddd;
}

.thumbnail.active {
  opacity: 1;
  border-color: #333;
}

.thumbnail:hover {
  opacity: 1;
}

.main-image-container {
  flex: 1;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 700px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  max-height: 700px;
  object-fit: contain;
}

.accordions {
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.accordion-item {
  width: 100%;
}

.accordion-header {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  font-size: 1.1rem;
  font-weight: 400;
  color: #111;
  cursor: pointer;
  text-align: left;
}

.accordion-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.accordion-content {
  padding: 0 0 1.5rem 0;
  color: #555;
  line-height: 1.6;
}

/* RIGHT COLUMN (STICKY) */
.right-sidebar {
  flex: 4;
  position: relative;
}

.sticky-content {
  position: sticky;
  top: 2rem;
}

.product-title {
  font-size: 2.2rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  color: #111;
}

.product-model-number {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 1.5rem 0;
}

.price-container {
  margin-bottom: 2rem;
}

.product-price {
  font-size: 1.6rem;
  font-weight: 500;
  color: #111;
  margin: 0 0 0.25rem 0;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 1.2rem;
  margin-right: 0.5rem;
  font-weight: 400;
}

.selling-price {
  color: #111;
}

.tax-info {
  font-size: 0.85rem;
  color: #666;
}

.quantity-selector {
  margin-bottom: 2rem;
}

.quantity-selector label {
  display: block;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
  color: #333;
}

.qty-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  width: fit-content;
}

.qty-btn {
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
}

.qty-input {
  width: 50px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: 1rem;
}

.qty-btn:hover {
  background: #f4f4f4;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-to-cart-btn {
  background: #c0b298; /* Beige/Sand */
  color: white;
  border: 1px solid #c0b298;
  padding: 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-to-cart-btn:hover {
  background: #a89a81;
  border-color: #a89a81;
}

@media (max-width: 900px) {
  .product-layout {
    flex-direction: column;
    gap: 2rem;
  }
  
  .left-column, .right-sidebar {
    width: 100%;
  }

  .gallery {
    flex-direction: column-reverse;
  }
  
  .thumbnails {
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
  }

  .thumbnail {
    width: 60px;
  }

  .product-detail-page {
    padding: 1rem 1.5rem;
  }
}
</style>
