<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productCategories } from './data/products'

const route = useRoute()
const router = useRouter()

const productId = computed(() => {
  const idStr = route.params.id as string
  return parseInt(idStr, 10)
})

const product = computed(() => productCategories[productId.value])

const currentImageIndex = ref(0)

const nextSlide = () => { 
  const images = product.value?.images || [];
  if(images.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length; 
  }
};

const prevSlide = () => { 
  const images = product.value?.images || [];
  if(images.length > 0) {
    currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length; 
  }
};

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="product-detail-page" v-if="product">
    <div class="back-link" @click="goBack">
      &larr; Back to Shop
    </div>

    <div class="product-layout">
      <div class="product-images">
        <div class="main-image-container">
          <img 
            v-if="product.images.length > 0"
            :src="product.images[currentImageIndex]?.src" 
            :alt="product.model_name" 
            class="main-image"
          />
          <div class="carousel-controls" v-if="product.images.length > 1">
            <button class="carousel-arrow" @click.stop="prevSlide">&#8592;</button>
            <button class="carousel-arrow" @click.stop="nextSlide">&#8594;</button>
          </div>
        </div>
        
        <div class="thumbnails" v-if="product.images.length > 1">
          <img 
            v-for="(img, idx) in product.images" 
            :key="idx" 
            :src="img.src" 
            :class="{ active: currentImageIndex === idx }"
            @click="currentImageIndex = idx"
            class="thumbnail"
          />
        </div>
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.model_name }}</h1>
        <h2 class="product-price" v-if="product.model_price" v-html="product.model_price"></h2>
        <p class="product-model-number">{{ product.model_num }}</p>
        
        <div class="product-description" v-if="product.description">
          <p>{{ product.description }}</p>
        </div>
        
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Product not found</h2>
    <div class="back-link" @click="goBack">
      &larr; Back to Shop
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
}

.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 4rem;
}

.back-link {
  cursor: pointer;
  color: #666;
  margin-bottom: 2rem;
  font-weight: 500;
  display: inline-block;
  transition: color 0.2s;
}

.back-link:hover {
  color: #000;
}

.product-layout {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

.product-images {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-container {
  width: 100%;
  aspect-ratio: 4 / 5;
  position: relative;
  background: #f8f8f8;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
}

.carousel-arrow {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background 0.2s;
}

.carousel-arrow:hover {
  transform: scale(1.1);
  background: white;
}

.thumbnails {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  opacity: 0.6;
  transition: opacity 0.2s, border-color 0.2s;
}

.thumbnail.active {
  opacity: 1;
  border-color: #333;
}

.thumbnail:hover {
  opacity: 1;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 2rem;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
  color: #111;
  letter-spacing: 1px;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
  margin: 0 0 1rem 0;
}

.product-model-number {
  font-size: 1rem;
  color: #666;
  margin: 0 0 2rem 0;
}

.product-description {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #555;
  font-size: 1.05rem;
}

.add-to-cart-btn {
  background: #111;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover {
  background: #333;
}

@media (max-width: 900px) {
  .product-layout {
    flex-direction: column;
    gap: 2rem;
  }
  
  .product-detail-page {
    padding: 1rem 1.5rem;
  }

  .main-image-container {
    aspect-ratio: 1;
  }
}
</style>
