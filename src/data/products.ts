export interface ProductImage {
  src: string;
}

export interface ProductCategory {
  title: string;
  images: ProductImage[];
  model_name: string;
  model_num: string;
  model_price: number;
  discount: number;
  description: string;
}

const publicBaseUrl = import.meta.env.BASE_URL || '/'
export const getImagePath = (relativePath: string): string => `${publicBaseUrl}${relativePath}`

export const productCategories: ProductCategory[] = [
  {
    title: "Tube light based models",
    images: [
      {
        src: getImagePath('INT001_Tube_light_Patti/Gemini_Generated_Image_f5b66hf5b66hf5b6.webp'),
      },
      {
        src: getImagePath('INT001_Tube_light_Patti/WhatsApp Image 2026-02-14 at 12.40.11.webp'),
      },
      {
        src: getImagePath('INT001_Tube_light_Patti/WhatsApp Image 2026-02-14 at 14.11.20.webp'),
      },
    ],
    model_name: 'Tube light Patti',
    model_num: "INT001",
    model_price: 1100,
    discount: 200,
    description: 'size:',
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
    model_num: "IND001",
    model_price: 700,
    discount: 0,
    description: 'size:15cm x 13cm',
  },

  {
    title: "Bulb based models",
    images: [
      {
        src: getImagePath('INB001_Wave_Pendant_Lamp/Gemini_Generated_Image_esv76xesv76xesv7.webp'),
      },
      {
        src: getImagePath('INB001_Wave_Pendant_Lamp/WhatsApp Image 2026-02-14 at 18.12.44.webp'),
      },
      {
        src: getImagePath('INB001_Wave_Pendant_Lamp/IMG20260401114311.webp'),
      },
    ],
    model_name: 'Wave_Pendant_Lamp',
    model_num: "INB001",
    model_price: 700,
    discount: 0,
    description: 'size:36cm x 20cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB002_TriangleTunnelLamp/Gemini_Generated_Image_b26yr4b26yr4b26y.webp'),
      },
      {
        src: getImagePath('INB002_TriangleTunnelLamp/IMG20260226165106.webp'),
      },
      {
        src: getImagePath('INB002_TriangleTunnelLamp/IMG20260401115613.webp'),
      },
    ],
    model_name: 'TriangleTunnelLamp',
    model_num: "INB002",
    model_price: 700,
    discount: 0,
    description: 'size:11cm x 12cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB003_Hanging_Popsicle_stick/Gemini_Generated_Image_jnagbrjnagbrjnag.webp'),
      },
      {
        src: getImagePath('INB003_Hanging_Popsicle_stick/Gemini_Generated_Image_g9s2j3g9s2j3g9s2.webp'),
      },
      {
        src: getImagePath('INB003_Hanging_Popsicle_stick/WhatsApp Image 2026-02-25 at 16.33.01.webp'),
      },
    ],
    model_name: 'Hanging_Popsicle_stick',
    model_num: "INB003",
    model_price: 900,
    discount: 0,
    description: 'size:30cm x 14cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB004_Moon_Rabbit/Gemini_Generated_Image_nh2cwjnh2cwjnh2c.webp'),
      },
      {
        src: getImagePath('INB004_Moon_Rabbit/Untitled10.webp'),
      },
      {
        src: getImagePath('INB004_Moon_Rabbit/WhatsApp Image 2026-02-25 at 16.33.00.webp'),
      },
    ],
    model_name: 'Moon_Rabbit',
    model_num: "INB004",
    model_price: 600,
    discount: 0,
    description: 'size:25cm x 25cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB005_Honey_comb/honey comb lamp(AI).webp'),
      },
      {
        src: getImagePath('INB005_Honey_comb/IMG20260401120232.webp'),
      },
      {
        src: getImagePath('INB005_Honey_comb/Honey comb lamp.webp'),
      },
    ],
    model_name: 'Honey_comb',
    model_num: "INB005",
    model_price: 600,
    discount: 0,
    description: 'size:26cm x 14cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB006_Ball_bottle/Ball bottle light(AI).webp'),
      },
      {
        src: getImagePath('INB006_Ball_bottle/IMG20260401120247.webp'),
      },
      {
        src: getImagePath('INB006_Ball_bottle/IMG20260226165528_exported_1772114311327.webp'),
      },
    ],
    model_name: 'Ball_bottle',
    model_num: "INB006",
    model_price: 1000,
    discount: 0,
    description: 'size:50cm x 40cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB007_Spiral/INB007(AI).webp'),
      },
      {
        src: getImagePath('INB007_Spiral/IMG20260306111946.webp'),
      },
      {
        src: getImagePath('INB007_Spiral/IMG20260401120125.webp'),
      },
    ],
    model_name: 'Spiral',
    model_num: "INB007",
    model_price: 700,
    discount: 0,
    description: 'size: 35cm x 35cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB008_Pumpkin_styled/Pumpkin styled lamp(AI.webp'),
      },
      {
        src: getImagePath('INB008_Pumpkin_styled/Pumpkin styled lamp.webp'),
      },
      {
        src: getImagePath('INB008_Pumpkin_styled/IMG20260306112833.webp'),
      },
    ],
    model_name: 'Pumpkin_styled',
    model_num: "INB008",
    model_price: 700,
    discount: 0,
    description: 'size:30cm x 45cm',
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
    model_num: "INB009",
    model_price: 600,
    discount: 0,
    description: 'size:20cm x 20cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB010_Pineapple/Pineapple lamp(AI).webp'),
      },
      {
        src: getImagePath('INB010_Pineapple/IMG20260305112701_BURST000_COVER.webp'),
      },
      {
        src: getImagePath('INB010_Pineapple/IMG20260401120216.webp'),
      },
    ],
    model_name: 'Pineapple',
    model_num: "INB010",
    model_price: 1100,
    discount: 0,
    description: 'size:30cm x 45cm',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB011_Cylindrical_JailBar/Gemini_Generated_Image_7pcmdn7pcmdn7pcm.webp'),
      },
      {
        src: getImagePath('INB011_Cylindrical_JailBar/IMG20260401114923.webp'),
      },
      {
        src: getImagePath('INB011_Cylindrical_JailBar/IMG20260401114634.webp'),
      },
    ],
    model_name: 'Cylindrical_JailBar',
    model_num: "INB011",
    model_price: 0,
    discount: 0,
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB012_Hexagon_Tulip/white wood light(AI).webp'),
      },
      {
        src: getImagePath('INB012_Hexagon_Tulip/white wood light.webp'),
      },
      {
        src: getImagePath('INB012_Hexagon_Tulip/IMG20260401120201.webp'),
      },
    ],
    model_name: 'Hexagon_Tulip',
    model_num: "INB012",
    model_price: 0,
    discount: 0,
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB013_Wooden_flower_lamp/Gemini_Generated_Image_7ovy8k7ovy8k7ovy.webp'),
      },
      {
        src: getImagePath('INB013_Wooden_flower_lamp/IMG20260401115849.webp'),
      },
      {
        src: getImagePath('INB013_Wooden_flower_lamp/IMG20260401115838.webp'),
      },
    ],
    model_name: 'Wooden_flower_lamp',
    model_num: "INB013",
    model_price: 0,
    discount: 0,
    description: 'dummy description',
  },

  {
    title: "",
    images: [
      {
        src: getImagePath('INB014_MiniChristmas_Tree/christmas tree light(AI).webp'),
      },
      {
        src: getImagePath('INB014_MiniChristmas_Tree/Christmas tree light.webp'),
      },
    ],
    model_name: 'MiniChristmas_Tree',
    model_num: "INB014",
    model_price: 0,
    discount: 0,
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
    model_price: 0,
    discount: 0,
    description: 'dummy description',
  },
];
