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
    title: "Tube Light Models",
    images: [
      { src: getImagePath('INT001_Tube_light_Patti/INT001_Tube_light_Patti_1.webp') },
      { src: getImagePath('INT001_Tube_light_Patti/INT001_Tube_light_Patti_2.webp') },
      { src: getImagePath('INT001_Tube_light_Patti/INT001_Tube_light_Patti_3.webp') },
    ],
    model_name: 'Pine Tube Light',
    model_num: "INT001",
    model_price: 1500,
    discount: 400,
    description: 'A Pine wood housing to the standard batten tube light (20W). Size: 44.5cm (Width) x 4.5cm (Depth) x 6cm (Height)',
  },

  {
    title: "Down Light Models",
    images: [
      { src: getImagePath('IND001_DownLight_Indi/IND001_DownLight_Indi_1.webp') },
      { src: getImagePath('IND001_DownLight_Indi/IND001_DownLight_Indi_2.webp') },
      { src: getImagePath('IND001_DownLight_Indi/IND001_DownLight_Indi_3.webp') },
    ],
    model_name: 'Pine Down Light',
    model_num: "IND001",
    model_price: 1000,
    discount: 300,
    description: 'A Pine wood housing to the standard down light (3W). Customisation possible in the area of the wood similar like the butterfly in the picture. Mentioned price is unit price. Size: 13cm(Width) x 13cm(Depth) x 15cm(Height)',
  },

  {
    title: "Bulb Models",
    images: [
      { src: getImagePath('INB001_Wave_Pendant_Lamp/INB001_Wave_Pendant_Lamp_1.webp') },
      { src: getImagePath('INB001_Wave_Pendant_Lamp/INB001_Wave_Pendant_Lamp_2.webp') },
      { src: getImagePath('INB001_Wave_Pendant_Lamp/INB001_Wave_Pendant_Lamp_3.webp') },
    ],
    model_name: 'Wave Pendant Lamp',
    model_num: "INB001",
    model_price: 1000,
    discount: 300,
    description: 'A cylindrical wave pendant surrounding an antique brass pendant holder giving a warm glow. Size: 36cm (Height) x 20cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB002_TriangleTunnelLamp/INB002_TriangleTunnelLamp_1.webp') },
      { src: getImagePath('INB002_TriangleTunnelLamp/INB002_TriangleTunnelLamp_2.webp') },
      { src: getImagePath('INB002_TriangleTunnelLamp/INB002_TriangleTunnelLamp_3.webp') },
    ],
    model_name: 'Triangle Tunnel Lamp',
    model_num: "INB002",
    model_price: 700,
    discount: 0,
    description: 'Set of pine wood traingles stacked over one another giving a tunnel like glow. Size:11cm (Width) x 12cm (Depth)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB003_Hanging_Popsicle_stick/INB003_Hanging_Popsicle_stick_1.webp') },
      { src: getImagePath('INB003_Hanging_Popsicle_stick/INB003_Hanging_Popsicle_stick_2.webp') },
      { src: getImagePath('INB003_Hanging_Popsicle_stick/INB003_Hanging_Popsicle_stick_3.webp') },
    ],
    model_name: 'Hanging Popsicle Sticks',
    model_num: "INB003",
    model_price: 900,
    discount: 0,
    description: 'Pine wood popsicle sticks hanging in a circular frame giving a feeling of Chinese Feng-ling. Size:30cm (Height) x 14cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB004_Moon_Rabbit/INB004_Moon_Rabbit_1.webp') },
      { src: getImagePath('INB004_Moon_Rabbit/INB004_Moon_Rabbit_2.webp') },
      { src: getImagePath('INB004_Moon_Rabbit/INB004_Moon_Rabbit_3.webp') },
    ],
    model_name: 'Moon Rabbit',
    model_num: "INB004",
    model_price: 600,
    discount: 0,
    description: 'Rabbit silhouette cut out in the center with a moon behind it. Sure the little children in your home will love this. Size: 25cm cube',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB005_Honey_comb/INB005_Honey_comb_1.webp') },
      { src: getImagePath('INB005_Honey_comb/INB005_Honey_comb_2.webp') },
      { src: getImagePath('INB005_Honey_comb/INB005_Honey_comb_3.webp') },
    ],
    model_name: 'Honey Comb',
    model_num: "INB005",
    model_price: 800,
    discount: 200,
    description: 'Mughal empire honeycomb lighting with its warmnes takes you to a different era. size: 14cm (Width) x 14cm(Depth) x 26cm(Height',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB006_Ball_bottle/INB006_Ball_bottle_1.webp') },
      { src: getImagePath('INB006_Ball_bottle/INB006_Ball_bottle_2.webp') },
      { src: getImagePath('INB006_Ball_bottle/INB006_Ball_bottle_3.webp') },
    ],
    model_name: 'Ball Bottle',
    model_num: "INB006",
    model_price: 1200,
    discount: 200,
    description: 'A design derived from ancient calabash containers will sure make the surrounding environment warm and cozy. Size: 50cm (Height) x 40cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB007_Spiral/INB007_Spiral_1.webp') },
      { src: getImagePath('INB007_Spiral/INB007_Spiral_2.webp') },
      { src: getImagePath('INB007_Spiral/INB007_Spiral_3.webp') },
    ],
    model_name: 'Spiral',
    model_num: "INB007",
    model_price: 700,
    discount: 0,
    description: 'Caution: You may feel sleepy or hypnotized when you start tracing each circle! Size: 35cm (Height) x 35cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB008_Pumpkin_styled/INB008_Pumpkin_styled_1.webp') },
      { src: getImagePath('INB008_Pumpkin_styled/INB008_Pumpkin_styled_2.webp') },
      { src: getImagePath('INB008_Pumpkin_styled/INB008_Pumpkin_styled_3.webp') },
    ],
    model_name: 'Pumpkin',
    model_num: "INB008",
    model_price: 1000,
    discount: 300,
    description: 'Inspired from Germany\'s Ludwigsburg Pumpkin Festival. Size: 30cm (Height) x 45cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB009_Fairy_Moon/INB009_Fairy_Moon_1.webp') },
      { src: getImagePath('INB009_Fairy_Moon/INB009_Fairy_Moon_2.webp') },
    ],
    model_name: 'Fairy Moon',
    model_num: "INB009",
    model_price: 500,
    discount: 100,
    description: 'Let your imagination fly with this fairy moon. Size: 20cm (Width) x 4.5cm (Depth) x 20cm (Height)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB010_Pineapple/INB010_Pineapple_1.webp') },
      { src: getImagePath('INB010_Pineapple/INB010_Pineapple_2.webp') },
      { src: getImagePath('INB010_Pineapple/INB010_Pineapple_3.webp') },
    ],
    model_name: 'Pineapple',
    model_num: "INB010",
    model_price: 1500,
    discount: 300,
    description: 'More spiky on the outside, more warm on the inside, same like a Pineapple!. A tropical vibe to your home!. Size:30cm (Height) x 45cm (Diameter',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB011_Cylindrical_JailBar/INB011_Cylindrical_JailBar_1.webp') },
      { src: getImagePath('INB011_Cylindrical_JailBar/INB011_Cylindrical_JailBar_2.webp') },
      { src: getImagePath('INB011_Cylindrical_JailBar/INB011_Cylindrical_JailBar_3.webp') },
    ],
    model_name: 'Cylindrical JailBar',
    model_num: "INB011",
    model_price: 800,
    discount: 0,
    description: 'To escape the busy day, let the light spend some time in a jail until we energise!. Size: 20cm (Height) x 14cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB012_Hexagon_Tulip/INB012_Hexagon_Tulip_1.webp') },
      { src: getImagePath('INB012_Hexagon_Tulip/INB012_Hexagon_Tulip_2.webp') },
      { src: getImagePath('INB012_Hexagon_Tulip/INB012_Hexagon_Tulip_3.webp') },
    ],
    model_name: 'Hexagon Tulip',
    model_num: "INB012",
    model_price: 500,
    discount: 0,
    description: 'Get the Amsterdam Tulips garden vibe with this hexagon tulip lamp. Size: 15cm (Height) x 17cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB013_Wooden_flower_lamp/INB013_Wooden_flower_lamp_1.webp') },
      { src: getImagePath('INB013_Wooden_flower_lamp/INB013_Wooden_flower_lamp_2.webp') },
      { src: getImagePath('INB013_Wooden_flower_lamp/INB013_Wooden_flower_lamp_3.webp') },
    ],
    model_name: 'Wooden flower',
    model_num: "INB013",
    model_price: 700,
    discount: 100,
    description: 'Let the light bloom in your home with this wooden flower lamp. Size: 25cm (Height) x 20cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB014_MiniChristmas_Tree/INB014_MiniChristmas_Tree_1.webp') },
      { src: getImagePath('INB014_MiniChristmas_Tree/INB014_MiniChristmas_Tree_2.webp') },
    ],
    model_name: 'Mini Christmas Tree',
    model_num: "INB014",
    model_price: 500,
    discount: 0,
    description: 'If you want to enjoy the Christmas in Lilliputian civilization, then this Mini Christmas Tree is a perfect choice. Size: 12cm (Height) x 14cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB015_WoodenRabbit_NightLight_Bunny/INB015_WoodenRabbit_NightLight_Bunny_1.webp') },
      { src: getImagePath('INB015_WoodenRabbit_NightLight_Bunny/INB015_WoodenRabbit_NightLight_Bunny_2.webp') },
      { src: getImagePath('INB015_WoodenRabbit_NightLight_Bunny/INB015_WoodenRabbit_NightLight_Bunny_3.webp') },
      { src: getImagePath('INB015_WoodenRabbit_NightLight_Bunny/INB015_WoodenRabbit_NightLight_Bunny_4.webp') },
    ],
    model_name: 'Wooden Rabbit Night Light Bunny',
    model_num: "INB015",
    model_price: 0,
    discount: 0,
    description: 'This is a Table Lamp. Size: x cm (Height) x x cm (Diameter)',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB017_LightHouse/INB017_LightHouse_1.webp') },
      { src: getImagePath('INB017_LightHouse/INB017_LightHouse_2.webp') },
      { src: getImagePath('INB017_LightHouse/INB017_LightHouse_4.webp') },
    ],
    model_name: 'Light House',
    model_num: "INB017",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB018_Cylinder_ZigZag/INB018_Cylinder_ZigZag_1.webp') },
      { src: getImagePath('INB018_Cylinder_ZigZag/INB018_Cylinder_ZigZag_3.webp') },
      { src: getImagePath('INB018_Cylinder_ZigZag/INB018_Cylinder_ZigZag_4.webp') },
      { src: getImagePath('INB018_Cylinder_ZigZag/INB018_Cylinder_ZigZag_2.webp') },
    ],
    model_name: 'Cylinder ZigZag',
    model_num: "INB018",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB019_Rustic_Hanging/INB019_Rustic_Hanging_2.webp') },
      { src: getImagePath('INB019_Rustic_Hanging/INB019_Rustic_Hanging_3.webp') },
      { src: getImagePath('INB019_Rustic_Hanging/INB019_Rustic_Hanging_1.webp') },
    ],
    model_name: 'Rustic Hanging',
    model_num: "INB019",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB020_Slatted_Pendant/INB020_Slatted_Pendant_1.webp') },
      { src: getImagePath('INB020_Slatted_Pendant/INB020_Slatted_Pendant_2.webp') },
      { src: getImagePath('INB020_Slatted_Pendant/INB020_Slatted_Pendant_3.webp') },
      { src: getImagePath('INB020_Slatted_Pendant/INB020_Slatted_Pendant_4.webp') },
    ],
    model_name: 'Slatted Pendant',
    model_num: "INB020",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB021_Curve_Spiral/INB021_Curve_Spiral_1.webp') },
      { src: getImagePath('INB021_Curve_Spiral/INB021_Curve_Spiral_3.webp') },
      { src: getImagePath('INB021_Curve_Spiral/INB021_Curve_Spiral_2.webp') },
    ],
    model_name: 'Curve Spiral',
    model_num: "INB021",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB022_Plain_Cone/INB022_Plain_Cone_1.webp') },
      { src: getImagePath('INB022_Plain_Cone/INB022_Plain_Cone_2.webp') },
    ],
    model_name: 'Plain Cone',
    model_num: "INB022",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB023_Spade/INB023_Spade_2.webp') },
      { src: getImagePath('INB023_Spade/INB023_Spade_4.webp') },
      { src: getImagePath('INB023_Spade/INB023_Spade_1.webp') },
      { src: getImagePath('INB023_Spade/INB023_Spade_3.webp') },
    ],
    model_name: 'Spade',
    model_num: "INB023",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB024_Turbine/INB024_Turbine_1.webp') },
      { src: getImagePath('INB024_Turbine/INB024_Turbine_4.webp') },
      { src: getImagePath('INB024_Turbine/INB024_Turbine_2.webp') },
      { src: getImagePath('INB024_Turbine/INB024_Turbine_3.webp') },
    ],
    model_name: 'Turbine',
    model_num: "INB024",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB026_Pumpkin_Hexagon/INB026_Pumpkin_Hexagon_1.webp') },
      { src: getImagePath('INB026_Pumpkin_Hexagon/INB026_Pumpkin_Hexagon_2.webp') },
      { src: getImagePath('INB026_Pumpkin_Hexagon/INB026_Pumpkin_Hexagon_4.webp') },
    ],
    model_name: 'Pumpkin Hexagon',
    model_num: "INB026",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB027_RugbyBall/INB027_RugbyBall_2.webp') },
      { src: getImagePath('INB027_RugbyBall/INB027_RugbyBall_1.webp') },
      { src: getImagePath('INB027_RugbyBall/INB027_RugbyBall_4.webp') },
    ],
    model_name: 'Rugby Ball',
    model_num: "INB027",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "",
    images: [
      { src: getImagePath('INB029_Bell/INB029_Bell_2.webp') },
      { src: getImagePath('INB029_Bell/INB029_Bell_1.webp') },
      { src: getImagePath('INB029_Bell/INB029_Bell_4.webp') },
    ],
    model_name: 'Bell',
    model_num: "INB029",
    model_price: 0,
    discount: 0,
    description: '',
  },

  {
    title: "Personalised Gifts",
    images: [
      { src: getImagePath('ING001_KeyChain_engrav/ING001_KeyChain_engrav_1.webp') },
      { src: getImagePath('ING001_KeyChain_engrav/ING001_KeyChain_engrav_2.webp') },
      { src: getImagePath('ING001_KeyChain_engrav/ING001_KeyChain_engrav_3.webp') },
      { src: getImagePath('ING001_KeyChain_engrav/ING001_KeyChain_engrav_4.webp') },
    ],
    model_name: 'Wooden Keychain',
    model_num: "ING001",
    model_price: 100,
    discount: 0,
    description: 'Surpise your beloved ones with such personalised Gifts. Complete customization possible. Mentioned price for unit price. Size: 5cm (Height) x 4cm (Width) x 0.8cm (Depth)',
  },
];
