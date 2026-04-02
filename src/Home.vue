<script setup lang="ts">
import { ref } from 'vue'

interface ProductImage {
  src: string;
}

const publicBaseUrl = import.meta.env.BASE_URL || '/'
const getImagePath = (relativePath: string): string => `${publicBaseUrl}${relativePath}`

const productCategories = [
  {
    title: "Tube light based models",
    images: [
      { 
        src: getImagePath('INT001_Tube_light_Patti/Untitled9.webp'), 
      },
      { 
        src: getImagePath('INT001_Tube_light_Patti/Gemini_Generated_Image_g0eabeg0eabeg0ea.webp'), 
      },
      { 
        src: getImagePath('INT001_Tube_light_Patti/Gemini_Generated_Image_o1dnnto1dnnto1dn.webp'), 
      },
    ],
    model_name: 'Tube light Patti',
    model_num: "Model INT001",
    model_price: '<s>₹150</s> ₹100',
    description: 'dummy description',
  },

  {
    title: "Down light based models",
    images: [
      { 
        src: getImagePath('IND001_DownLight_Indi/Gemini_Generated_Image_ejsghaejsghaejsg.webp'), 
      },
      { 
        src: getImagePath('IND001_DownLight_Indi/IMG20260306113404.webp'), 
      },
      { 
        src: getImagePath('IND001_DownLight_Indi/IMG20260401121724.webp'), 
      },
    ],
    model_name: 'DownLight_Indi',
    model_num: "Model IND001",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "Bulb based models",
    images: [
      { 
        src: getImagePath('INB001_Wave_Pendant_Lamp/Gemini_Generated_Image_1tgeed1tgeed1tge.webp'), 
      },
      { 
        src: getImagePath('INB001_Wave_Pendant_Lamp/IMG20260401114240.webp'), 
      },
      { 
        src: getImagePath('INB001_Wave_Pendant_Lamp/IMG20260401114311.webp'), 
      },
    ],
    model_name: 'Wave_Pendant_Lamp',
    model_num: "Model INB001",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB002_TriangleTunnelLamp/Gemini_Generated_Image_5arrmt5arrmt5arr.webp'), 
      },
      { 
        src: getImagePath('INB002_TriangleTunnelLamp/IMG20260401115157.webp'), 
      },
      { 
        src: getImagePath('INB002_TriangleTunnelLamp/IMG20260401115441.webp'), 
      },
    ],
    model_name: 'TriangleTunnelLamp',
    model_num: "Model INB002",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB003_Hanging_Popsicle_stick/Gemini_Generated_Image_g9s2j3g9s2j3g9s2.webp'), 
      },
      { 
        src: getImagePath('INB003_Hanging_Popsicle_stick/WhatsApp Image 2026-02-25 at 16.33.01.webp'), 
      },
      { 
        src: getImagePath('INB003_Hanging_Popsicle_stick/WhatsApp Image 2026-02-25 at 16.33.01 (1).webp'), 
      },
    ],
    model_name: 'Hanging_Popsicle_stick',
    model_num: "Model INB003",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB004_Moon_Rabbit/Gemini_Generated_Image_o7df53o7df53o7df.webp'), 
      },
      { 
        src: getImagePath('INB004_Moon_Rabbit/IMG20260401115809.webp'), 
      },
      { 
        src: getImagePath('INB004_Moon_Rabbit/WhatsApp Image 2026-02-25 at 16.33.00.webp'), 
      },
    ],
    model_name: 'Moon_Rabbit',
    model_num: "Model INB004",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB005_Honey_comb/Gemini_Generated_Image_my9dpkmy9dpkmy9d.webp'), 
      },
      { 
        src: getImagePath('INB005_Honey_comb/honey comb lamp(AI).webp'), 
      },
      { 
        src: getImagePath('INB005_Honey_comb/IMG20260401120232.webp'), 
      },
    ],
    model_name: 'Honey_comb',
    model_num: "Model INB005",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB006_Ball_bottle/Ball bottle light(AI).webp'), 
      },
      { 
        src: getImagePath('INB006_Ball_bottle/Gemini_Generated_Image_oplj5uoplj5uoplj.webp'), 
      },
      { 
        src: getImagePath('INB006_Ball_bottle/IMG20260401120247.webp'), 
      },
    ],
    model_name: 'Ball_bottle',
    model_num: "Model INB006",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB007_Spiral/Gemini_Generated_Image_dzqt3ddzqt3ddzqt.webp'), 
      },
      { 
        src: getImagePath('INB007_Spiral/INB007(AI).webp'), 
      },
      { 
        src: getImagePath('INB007_Spiral/IMG20260401120125.webp'), 
      },
    ],
    model_name: 'Spiral',
    model_num: "Model INB007",
    model_price: 'dummy price',
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB008_Pumpkin_styled/Gemini_Generated_Image_ynkkg7ynkkg7ynkk.webp'), 
      },
      { 
        src: getImagePath('INB008_Pumpkin_styled/IMG20260401120311.webp'), 
      },
      { 
        src: getImagePath('INB008_Pumpkin_styled/Pumpkin styled lamp(AI.webp'), 
      },
    ],
    model_name: 'Pumpkin_styled',
    model_num: "Model INB008",
    model_price: 'dummy price',
    description: 'dummy description',
  }, 
  
  {
    title: "",
    images: [
      { 
        src: getImagePath('INB009_Fairy_Moon/Fairy moon lamp(AI).webp'), 
      },
      { 
        src: getImagePath('INB009_Fairy_Moon/Gemini_Generated_Image_wwjn0gwwjn0gwwjn.webp'), 
      },
    ],
    model_name: 'Fairy_Moon',
    model_num: "Model INB009",
    model_price: 'dummy price',
    description: 'dummy description',
  }, 

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB010_Pineapple/IMG20260401120216.webp'), 
      },
      { 
        src: getImagePath('INB010_Pineapple/Gemini_Generated_Image_bye9n4bye9n4bye9.webp'), 
      },
      { 
        src: getImagePath('INB010_Pineapple/Pineapple lamp(AI).webp'), 
      },
    ],
    model_name: 'Pineapple',
    model_num: "Model INB010",
    model_price: 'dummy price',
    description: 'dummy description',
  }, 

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB011_Cylindrical_JailBar/Gemini_Generated_Image_7pcmdn7pcmdn7pcm.webp'), 
      },
      { 
        src: getImagePath('INB011_Cylindrical_JailBar/IMG20260401114634.webp'), 
      },
      { 
        src: getImagePath('INB011_Cylindrical_JailBar/IMG20260401114923.webp'), 
      },
    ],
    model_name: 'Cylindrical_JailBar',
    model_num: "Model INB011",
    model_price: 'dummy price',
    description: 'dummy description',
  },  

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB012_Hexagon_Tulip/IMG20260401120201.webp'), 
      },
      { 
        src: getImagePath('INB012_Hexagon_Tulip/white wood light.webp'), 
      },
      { 
        src: getImagePath('INB012_Hexagon_Tulip/white wood light(AI).webp'), 
      },
    ],
    model_name: 'Hexagon_Tulip',
    model_num: "Model INB012",
    model_price: 'dummy price',
    description: 'dummy description',
  }, 

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB013_Wooden_flower_lamp/Gemini_Generated_Image_7ovy8k7ovy8k7ovy.webp'), 
      },
      { 
        src: getImagePath('INB013_Wooden_flower_lamp/IMG20260401115838.webp'), 
      },
      { 
        src: getImagePath('INB013_Wooden_flower_lamp/IMG20260401115849.webp'), 
      },
    ],
    model_name: 'Wooden_flower_lamp',
    model_num: "Model INB013",
    model_price: 'dummy price',
    description: 'dummy description',
  }, 

  {
    title: "",
    images: [
      { 
        src: getImagePath('INB014_MiniChristmas_Tree/Christmas tree light.webp'), 
      },
      { 
        src: getImagePath('INB014_MiniChristmas_Tree/christmas tree light(AI).webp'), 
      },
    ],
    model_name: 'MiniChristmas_Tree',
    model_num: "Model INB014",
    model_price: 'dummy price',
    description: 'dummy description',
  },   

  {
    title: "Personalised Gifts",
    images: [
      { 
        src: getImagePath('KeyChain_engrav/IMG20260219203515_BURST000_COVER.webp'), 
      },
      { 
        src: getImagePath('KeyChain_engrav/IMG20260219203525.webp'), 
      },
      { 
        src: getImagePath('KeyChain_engrav/WhatsApp Image 2026-02-09 at 11.49.11.webp'), 
      },
      { 
        src: getImagePath('KeyChain_engrav/WhatsApp Image 2026-02-09 at 11.49.11 (1).webp'), 
      },
    ],
    model_name: 'Wooden Keychain',
    model_num: "Wooden Keychain",
    model_price: 'dummy price',
    description: 'dummy description',
  }, 
];

const hoverIndex = ref<number | null>(null);

const currentImageIndex = (index: number) => {
  return hoverIndex.value === index && productCategories[index]!.images.length > 1 ? 1 : 0;
};
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
    >
      <div 
        class="product-image-container"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <img
          v-if="product.images.length > 0"
          :src="product.images[currentImageIndex(index)]!.src"
          :alt="product.model_name"
          class="product-image"
        />
        <div class="quick-add-btn">+</div>
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

.product-image-container:hover .product-image {
  transform: scale(1.05);
}

.quick-add-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: black;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.product-image-container:hover .quick-add-btn {
  opacity: 1;
  transform: translateY(0);
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