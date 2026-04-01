<script setup lang="ts">
import { ref, computed } from 'vue'

interface ProductImage {
  src: string;
  alt: string;
  description: string;
}

const publicBaseUrl = import.meta.env.BASE_URL || '/'
const getImagePath = (relativePath: string): string => `${publicBaseUrl}${relativePath}`

const productCategories = [
  {
    title: "Tube light based models",
    subtitle: "Model INT001",
    images: [
      { 
        src: getImagePath('INT001_Tube_light_Patti/Untitled9.webp'), 
        alt: 'Tube light Patti',
        description: ''
      },
      { 
        src: getImagePath('INT001_Tube_light_Patti/Gemini_Generated_Image_g0eabeg0eabeg0ea.webp'), 
        alt: 'Tube light Patti',
        description: ''
      },
      { 
        src: getImagePath('INT001_Tube_light_Patti/Gemini_Generated_Image_o1dnnto1dnnto1dn.webp'), 
        alt: 'Tube light Patti',
        description: ''
      },
    ]
  },

  {
    title: "Down light based models",
    subtitle: "Model IND001",
    images: [
      { 
        src: getImagePath('IND001_DownLight_Indi/Gemini_Generated_Image_ejsghaejsghaejsg.webp'), 
        alt: 'DownLight_Indi',
        description: ''
      },
      { 
        src: getImagePath('IND001_DownLight_Indi/IMG20260306113404.webp'), 
        alt: 'DownLight_Indi',
        description: ''
      },
      { 
        src: getImagePath('IND001_DownLight_Indi/IMG20260401121724.webp'), 
        alt: 'DownLight_Indi',
        description: ''
      },
    ]
  },

  {
    title: "Bulb based models",
    subtitle: "Model INB001",
    images: [
      { 
        src: getImagePath('INB001_Wave_Pendant_Lamp/Gemini_Generated_Image_1tgeed1tgeed1tge.webp'), 
        alt: 'Wave_Pendant_Lamp',
        description: ''
      },
      { 
        src: getImagePath('INB001_Wave_Pendant_Lamp/IMG20260401114240.webp'), 
        alt: 'Wave_Pendant_Lamp',
        description: ''
      },
      { 
        src: getImagePath('INB001_Wave_Pendant_Lamp/IMG20260401114311.webp'), 
        alt: 'Wave_Pendant_Lamp',
        description: ''
      },
    ]
  },

  {
    title: "",
    subtitle: "Model INB002",
    images: [
      { 
        src: getImagePath('INB002_TriangleTunnelLamp/Gemini_Generated_Image_5arrmt5arrmt5arr.webp'), 
        alt: 'TriangleTunnelLamp',
        description: ''
      },
      { 
        src: getImagePath('INB002_TriangleTunnelLamp/IMG20260401115157.webp'), 
        alt: 'TriangleTunnelLamp',
        description: ''
      },
      { 
        src: getImagePath('INB002_TriangleTunnelLamp/IMG20260401115441.webp'), 
        alt: 'TriangleTunnelLamp',
        description: ''
      },
    ]
  },

  {
    title: "",
    subtitle: "Model INB003",
    images: [
      { 
        src: getImagePath('INB003_Hanging_Popsicle_stick/Gemini_Generated_Image_g9s2j3g9s2j3g9s2.webp'), 
        alt: 'Hanging_Popsicle_stick',
        description: ''
      },
      { 
        src: getImagePath('INB003_Hanging_Popsicle_stick/WhatsApp Image 2026-02-25 at 16.33.01.webp'), 
        alt: 'Hanging_Popsicle_stick',
        description: ''
      },
      { 
        src: getImagePath('INB003_Hanging_Popsicle_stick/WhatsApp Image 2026-02-25 at 16.33.01 (1).webp'), 
        alt: 'Hanging_Popsicle_stick',
        description: ''
      },
    ]
  },

  {
    title: "",
    subtitle: "Model INB004",
    images: [
      { 
        src: getImagePath('INB004_Moon_Rabbit/Gemini_Generated_Image_o7df53o7df53o7df.webp'), 
        alt: 'Moon_Rabbit',
        description: ''
      },
      { 
        src: getImagePath('INB004_Moon_Rabbit/IMG20260401115809.webp'), 
        alt: 'Moon_Rabbit',
        description: ''
      },
      { 
        src: getImagePath('INB004_Moon_Rabbit/WhatsApp Image 2026-02-25 at 16.33.00.webp'), 
        alt: 'Moon_Rabbit',
        description: ''
      },
    ]
  },

  {
    title: "",
    subtitle: "Model INB005",
    images: [
      { 
        src: getImagePath('INB005_Honey_comb/Gemini_Generated_Image_my9dpkmy9dpkmy9d.webp'), 
        alt: 'Honey_comb',
        description: ''
      },
      { 
        src: getImagePath('INB005_Honey_comb/honey comb lamp(AI).webp'), 
        alt: 'Honey_comb',
        description: ''
      },
      { 
        src: getImagePath('INB005_Honey_comb/IMG20260401120232.webp'), 
        alt: 'Honey_comb',
        description: ''
      },
    ]
  },

  {
    title: "",
    subtitle: "Model INB006",
    images: [
      { 
        src: getImagePath('INB006_Ball_bottle/Ball bottle light(AI).webp'), 
        alt: 'Ball_bottle',
        description: ''
      },
      { 
        src: getImagePath('INB006_Ball_bottle/Gemini_Generated_Image_oplj5uoplj5uoplj.webp'), 
        alt: 'Ball_bottle',
        description: ''
      },
      { 
        src: getImagePath('INB006_Ball_bottle/IMG20260401120247.webp'), 
        alt: 'Ball_bottle',
        description: ''
      },
    ]
  },

  {
    title: "",
    subtitle: "Model INB007",
    images: [
      { 
        src: getImagePath('INB007_Spiral/Gemini_Generated_Image_dzqt3ddzqt3ddzqt.webp'), 
        alt: 'Spiral',
        description: ''
      },
      { 
        src: getImagePath('INB007_Spiral/INB007(AI).webp'), 
        alt: 'Spiral',
        description: ''
      },
      { 
        src: getImagePath('INB007_Spiral/IMG20260401120125.webp'), 
        alt: 'Spiral',
        description: ''
      },
    ]
  },

  {
    title: "",
    subtitle: "Model INB008",
    images: [
      { 
        src: getImagePath('INB008_Pumpkin_styled/Gemini_Generated_Image_ynkkg7ynkkg7ynkk.webp'), 
        alt: 'Pumpkin_styled',
        description: ''
      },
      { 
        src: getImagePath('INB008_Pumpkin_styled/IMG20260401120311.webp'), 
        alt: 'Pumpkin_styled',
        description: ''
      },
      { 
        src: getImagePath('INB008_Pumpkin_styled/Pumpkin styled lamp(AI.webp'), 
        alt: 'Pumpkin_styled',
        description: ''
      },
    ]
  }, 
  
  {
    title: "",
    subtitle: "Model INB009",
    images: [
      { 
        src: getImagePath('INB009_Fairy_Moon/Fairy moon lamp(AI).webp'), 
        alt: 'Fairy_Moon',
        description: ''
      },
      { 
        src: getImagePath('INB009_Fairy_Moon/Gemini_Generated_Image_wwjn0gwwjn0gwwjn.webp'), 
        alt: 'Fairy_Moon',
        description: ''
      },
    ]
  }, 

  {
    title: "",
    subtitle: "Model INB010",
    images: [
      { 
        src: getImagePath('INB010_Pineapple/IMG20260401120216.webp'), 
        alt: 'Pineapple',
        description: ''
      },
      { 
        src: getImagePath('INB010_Pineapple/Gemini_Generated_Image_bye9n4bye9n4bye9.webp'), 
        alt: 'Pineapple',
        description: ''
      },
      { 
        src: getImagePath('INB010_Pineapple/Pineapple lamp(AI).webp'), 
        alt: 'Pineapple',
        description: ''
      },
    ]
  }, 

  {
    title: "",
    subtitle: "Model INB011",
    images: [
      { 
        src: getImagePath('INB011_Cylindrical_JailBar/Gemini_Generated_Image_7pcmdn7pcmdn7pcm.webp'), 
        alt: 'Cylindrical_JailBar',
        description: ''
      },
      { 
        src: getImagePath('INB011_Cylindrical_JailBar/IMG20260401114634.webp'), 
        alt: 'Cylindrical_JailBar',
        description: ''
      },
      { 
        src: getImagePath('INB011_Cylindrical_JailBar/IMG20260401114923.webp'), 
        alt: 'Cylindrical_JailBar',
        description: ''
      },
    ]
  },  

  {
    title: "",
    subtitle: "Model INB012",
    images: [
      { 
        src: getImagePath('INB012_Hexagon_Tulip/IMG20260401120201.webp'), 
        alt: 'Hexagon_Tulip',
        description: ''
      },
      { 
        src: getImagePath('INB012_Hexagon_Tulip/white wood light.webp'), 
        alt: 'Hexagon_Tulip',
        description: ''
      },
      { 
        src: getImagePath('INB012_Hexagon_Tulip/white wood light(AI).webp'), 
        alt: 'Hexagon_Tulip',
        description: ''
      },
    ]
  }, 

  {
    title: "",
    subtitle: "Model INB013",
    images: [
      { 
        src: getImagePath('INB013_Wooden_flower_lamp/Gemini_Generated_Image_7ovy8k7ovy8k7ovy.webp'), 
        alt: 'Wooden_flower_lamp',
        description: ''
      },
      { 
        src: getImagePath('INB013_Wooden_flower_lamp/IMG20260401115838.webp'), 
        alt: 'Wooden_flower_lamp',
        description: ''
      },
      { 
        src: getImagePath('INB013_Wooden_flower_lamp/IMG20260401115849.webp'), 
        alt: 'Wooden_flower_lamp',
        description: ''
      },
    ]
  }, 

  {
    title: "",
    subtitle: "Model INB014",
    images: [
      { 
        src: getImagePath('INB014_MiniChristmas_Tree/Christmas tree light.webp'), 
        alt: 'MiniChristmas_Tree',
        description: ''
      },
      { 
        src: getImagePath('INB014_MiniChristmas_Tree/christmas tree light(AI).webp'), 
        alt: 'MiniChristmas_Tree',
        description: ''
      },
    ]
  },   

  {
    title: "Personalised Gifts",
    subtitle: "Wooden Keychain",
    images: [
      { 
        src: getImagePath('KeyChain_engrav/IMG20260219203515_BURST000_COVER.webp'), 
        alt: 'Wooden Keychain',
        description: ''
      },
      { 
        src: getImagePath('KeyChain_engrav/IMG20260219203525.webp'), 
        alt: 'Wooden Keychain',
        description: ''
      },
      { 
        src: getImagePath('KeyChain_engrav/WhatsApp Image 2026-02-09 at 11.49.11.webp'), 
        alt: 'Wooden Keychain',
        description: ''
      },
      { 
        src: getImagePath('KeyChain_engrav/WhatsApp Image 2026-02-09 at 11.49.11 (1).webp'), 
        alt: 'Wooden Keychain',
        description: ''
      },
    ]
  }, 
];

const categoryIndices = ref(productCategories.map(() => 0));
const showModal = ref(false);
const hoveredImage = ref<ProductImage | null>(null);

const getCurrentImage = (categoryIndex: number) => computed(() => 
  productCategories[categoryIndex]!.images[categoryIndices.value[categoryIndex]!]
);

const nextSlide = (categoryIndex: number) => { 
  const images = productCategories[categoryIndex]!.images;
  categoryIndices.value[categoryIndex] = (categoryIndices.value[categoryIndex]! + 1) % images.length; 
};

const prevSlide = (categoryIndex: number) => { 
  const images = productCategories[categoryIndex]!.images;
  categoryIndices.value[categoryIndex] = (categoryIndices.value[categoryIndex]! - 1 + images.length) % images.length; 
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
            <img :src="hoveredImage!.src" :alt="hoveredImage!.alt" class="modal-image" />
          </div>
        </div>

        <div class="product-description">
          <h4>{{ getCurrentImage(categoryIndex).value?.alt }}</h4>
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
  text-align: left;
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