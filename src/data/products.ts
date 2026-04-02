export interface ProductImage {
  src: string;
}

export interface ProductCategory {
  title: string;
  images: ProductImage[];
  model_name: string;
  model_num: string;
  model_price: string;
  description: string;
}

const publicBaseUrl = import.meta.env.BASE_URL || '/'
export const getImagePath = (relativePath: string): string => `${publicBaseUrl}${relativePath}`

export const productCategories: ProductCategory[] = [
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
    model_num: "INT001",
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
    model_num: "INB001",
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
