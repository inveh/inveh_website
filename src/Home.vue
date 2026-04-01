<script setup lang="ts">
import { ref, computed } from 'vue'

const productCategories = [
  {
    title: "Pendant Lights",
    subtitle: "Tube light based models",
    images: [
      { 
        src: 'https://petapixel.com/assets/uploads/2022/12/what-is-unsplash-800x420.jpg', 
        alt: 'Pendant Light 1',
        description: 'This is a beautiful pendant light with modern design, perfect for contemporary interiors.'
      },
      { 
        src: 'https://petapixel.com/assets/uploads/2022/12/image13-1-800x536.jpg', 
        alt: 'Pendant Light 2',
        description: 'Elegant hanging fixture that adds sophistication to any room with its unique shape.'
      },
      { 
        src: 'https://petapixel.com/assets/uploads/2022/12/image11-1-800x534.jpg', 
        alt: 'Pendant Light 3',
        description: 'Stylish lighting solution combining functionality with aesthetic appeal.'
      },
    ]
  },
  {
    title: "Wall Lights",
    subtitle: "Illuminate Your Walls",
    images: [
      { 
        src: 'https://petapixel.com/assets/uploads/2022/12/what-is-unsplash-800x420.jpg', 
        alt: 'Wall Light 1',
        description: 'Modern wall sconce that provides ambient lighting with sleek design.'
      },
      { 
        src: 'https://petapixel.com/assets/uploads/2022/12/image13-1-800x536.jpg', 
        alt: 'Wall Light 2',
        description: 'Decorative wall fixture perfect for hallways and living spaces.'
      },
    ]
  },
  {
    title: "Floor Lamps",
    subtitle: "Standing Tall in Style",
    images: [
      { 
        src: 'https://petapixel.com/assets/uploads/2022/12/image11-1-800x534.jpg', 
        alt: 'Floor Lamp 1',
        description: 'Tall floor lamp providing excellent reading light and room illumination.'
      },
      { 
        src: 'https://petapixel.com/assets/uploads/2022/12/what-is-unsplash-800x420.jpg', 
        alt: 'Floor Lamp 2',
        description: 'Contemporary floor lamp with adjustable height and brightness.'
      },
    ]
  }
];

const categoryIndices = ref(productCategories.map(() => 0));
const showModal = ref(false);
const hoveredImage = ref(null);

const getCurrentImage = (categoryIndex) => computed(() => 
  productCategories[categoryIndex].images[categoryIndices.value[categoryIndex]]
);

const nextSlide = (categoryIndex) => { 
  const images = productCategories[categoryIndex].images;
  categoryIndices.value[categoryIndex] = (categoryIndices.value[categoryIndex] + 1) % images.length; 
};

const prevSlide = (categoryIndex) => { 
  const images = productCategories[categoryIndex].images;
  categoryIndices.value[categoryIndex] = (categoryIndices.value[categoryIndex] - 1 + images.length) % images.length; 
};
</script>

<template>
  <div class="introText_style">
    <p>At inVeh Lighting Solutions, we provide customized lighting solutions for houses, hotels, restaurants, cafe, halls, ...</p>
  </div>

    <div 
      v-for="(category, categoryIndex) in productCategories" 
      :key="category.title"
      class="category-section"
    >
      <h1>{{ category.title }}</h1>
      <h2>{{ category.subtitle }}</h2>
      <div class="product-showcase">
        <div class="carousel">
          <div class="carousel-images">
            <img
              class="carousel-image-list"
              v-for="(image, imageIndex) in category.images"
              :key="`${category.title}-${imageIndex}`"
              :src="image.src"
              :alt="image.alt"
              v-show="imageIndex === categoryIndices[categoryIndex]"
              @mouseenter="hoveredImage = image; showModal = true"
              @mouseleave="showModal = false; hoveredImage = null"
            />
            <div class="carousel-controls">
              <button 
                class="carousel-arrow" 
                @click.stop="prevSlide(categoryIndex)"
              >&#8592;</button>
              <button 
                class="carousel-arrow" 
                @click.stop="nextSlide(categoryIndex)"
              >&#8594;</button>
            </div>
          </div>

          <!-- Modal shown on hover -->
          <div v-if="showModal && hoveredImage" class="modal-overlay">
            <img :src="hoveredImage.src" :alt="hoveredImage.alt" class="modal-image" />
          </div>
        </div>

        <div class="product-description">
          <h3>{{ getCurrentImage(categoryIndex).value?.alt }}</h3>
          <p>{{ getCurrentImage(categoryIndex).value?.description }}</p>
        </div>
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

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
}

h2 {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: 2rem;
  font-style: italic;
}

.category-section {
  margin-bottom: 4rem;
}

.category-section:last-child {
  margin-bottom: 0;
}

.product-showcase {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin: 2rem 0;
}

.product-description {
  flex: 1;
  max-width: 400px;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-description h3 {
  margin-top: 0;
  color: #333;
}

.product-description p {
  line-height: 1.6;
  color: #666;
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
  position: relative;
  z-index: 1010;
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