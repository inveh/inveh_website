<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { productCategories, type ProductImage } from './data/products'

const router = useRouter()

const categoryIndices = ref(productCategories.map(() => 0));

const getCurrentImageIndex = (index: number) => {
  return categoryIndices.value[index] || 0;
};

const nextSlide = (index: number) => { 
  const images = productCategories[index]!.images;
  if(images.length > 0) {
    categoryIndices.value[index] = (categoryIndices.value[index]! + 1) % images.length; 
  }
};

const prevSlide = (index: number) => { 
  const images = productCategories[index]!.images;
  if(images.length > 0) {
    categoryIndices.value[index] = (categoryIndices.value[index]! - 1 + images.length) % images.length; 
  }
};

const goToProduct = (index: number) => {
  router.push({ name: 'Product', params: { id: index.toString() } })
}
</script>

<template>
  <div class="introText_style">
    <p>At inVeh Lighting Solutions, we provide customized lighting solutions for houses, hotels, restaurants, cafe, halls, ...</p>
  </div>

  <div class="product-grid">
    <div 
      v-for="(product, index) in productCategories" 
      :key="product.model_num"
      class="product-card"
      @click="goToProduct(index)"
    >
      <div class="product-image-container">
        <img
          v-if="product.images.length > 0"
          :src="product.images[getCurrentImageIndex(index)]!.src"
          :alt="product.model_name"
          class="product-image"
        />
        
        <div class="carousel-controls" v-if="product.images.length > 1">
          <button 
            class="carousel-arrow" 
            @click.stop="prevSlide(index)"
          >&#8592;</button>
          <button 
            class="carousel-arrow" 
            @click.stop="nextSlide(index)"
          >&#8594;</button>
        </div>
      </div>

      <div class="product-info">
        <h3 class="product-title">{{ product.model_name }}</h3>
        <p class="product-price" v-if="product.model_price" v-html="product.model_price"></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
}

.introText_style {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  color: #666;
  max-width: 800px;
  line-height: 1.6;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem 1.5rem;
  padding: 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
    gap: 2rem 1rem;
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

.carousel-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 10px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-image-container:hover .carousel-controls {
  opacity: 1;
}

.carousel-arrow {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: background 0.2s;
}

.carousel-arrow:hover { 
  background: rgba(255, 255, 255, 1);
  color: #000;
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