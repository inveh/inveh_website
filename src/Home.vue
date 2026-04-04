<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { productCategories, type ProductImage } from './data/products'

const router = useRouter()

const goToProduct = (sku: string) => {
  router.push({ name: 'Product', params: { id: sku } })
}

const formatPrice = (price: number) => {
  return price > 0 ? `Rs. ${price}` : '';
}
</script>

<template>

  <div class="product-grid">
    <div 
      v-for="product in productCategories" 
      :key="product.model_num"
      class="product-card"
      @click="goToProduct(product.model_num)"
    >
      <div class="product-image-container">
        <img
          v-if="product.images.length > 0"
          :src="product.images[0]!.src"
          :alt="product.model_name"
          class="product-image"
        />
      </div>

      <div class="product-info">
        <h3 class="product-title">{{ product.model_name }}</h3>
        <p class="product-price" v-if="product.model_price > 0">{{ formatPrice(product.model_price) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
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
</style>