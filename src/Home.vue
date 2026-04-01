<script setup lang="ts">
import { ref, computed } from 'vue'

const images = [
    { 
        src: 'https://petapixel.com/assets/uploads/2022/12/what-is-unsplash-800x420.jpg', 
        alt: 'Image_1' 
    },
    { 
        src: 'https://petapixel.com/assets/uploads/2022/12/image13-1-800x536.jpg', 
        alt: 'Image_2' 
    },
    { 
        src: 'https://petapixel.com/assets/uploads/2022/12/image11-1-800x534.jpg', 
        alt: 'Image_3' 
    },
];

const currentSliderIndex = ref(0);
const showModal = ref(false);
const currentImage = computed(() => images[currentSliderIndex.value]);

const nextSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value + 1) % images.length; 
};
const prevSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value - 1 + images.length) % images.length; 
};
</script>

<template>
  <div class="introText_style">
    <p>At inVeh Lighting Solutions, we provide customized lighting solutions for houses, hotels, restaurants, cafe, halls, ...</p>
  </div>

    <h1>Pendant Lights</h1>
    <div class="carousel">
      <div
        class="carousel-images"
        @mouseenter="showModal = true"
        @mouseleave="showModal = false"
      >
        <img
          class="carousel-image-list"
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          v-show="index === currentSliderIndex"
        />
        <div class="carousel-controls">
          <button class="carousel-arrow" @click.stop="prevSlide">&#8592;</button>
          <button class="carousel-arrow" @click.stop="nextSlide">&#8594;</button>
        </div>
      </div>

      <!-- Modal shown on hover -->
      <div v-if="showModal" class="modal-overlay">
        <img :src="currentImage?.src" :alt="currentImage?.alt" class="modal-image" />
      </div>
    </div>
</template>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.introText_style {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
}

.carousel-images {
  position: relative;
  display: inline-block;
  cursor: zoom-in;
}

.carousel-image-list {
  width: 7.5cm;
  height: 5cm;
  object-fit: cover;
  display: block;
}

.carousel-controls {
  display: flex;
  justify-content: space-between;
  width: 7.5cm;
  margin-top: 6px;
}

.carousel-arrow {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #444;
  padding: 0 4px;
  line-height: 1;
}

.carousel-arrow:hover { color: #000; }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
}

.modal-image {
  max-width: 80vw;
  max-height: 70vh;
  border-radius: 8px;
  object-fit: contain;
}
</style>