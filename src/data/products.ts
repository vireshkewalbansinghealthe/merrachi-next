export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  color: string;
  colorHex: string;
  sizes: string[];
  images: string[];
  description: string;
  material?: string;
  modelInfo?: string;
  completeTheLook?: string[];
  isNew?: boolean;
  isRestocked?: boolean;
  isSoldOut?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Dresses',
    slug: 'dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    description: 'Elegant dresses for every occasion'
  },
  {
    id: '2',
    name: 'Abayas',
    slug: 'abayas',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    description: 'Timeless abayas crafted with care'
  },
  {
    id: '3',
    name: 'Outerwear',
    slug: 'outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    description: 'Coats and jackets for layering season'
  },
  {
    id: '4',
    name: 'Scarves',
    slug: 'scarves',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
    description: 'Premium scarves in luxurious fabrics'
  },
  {
    id: '5',
    name: 'Tops',
    slug: 'tops',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80',
    description: 'Essential tops for everyday elegance'
  },
  {
    id: '6',
    name: 'Bottoms',
    slug: 'bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    description: 'Comfortable and stylish bottoms'
  },
];

export const products: Product[] = [
  // Dresses & Abayas
  {
    id: '1',
    name: 'Asymmetric Drape Dress',
    price: 189,
    category: 'dresses',
    color: 'Biscuit',
    colorHex: '#d4c5b0',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'
    ],
    description: 'An elegant asymmetric drape dress crafted from premium viscose. Features a sophisticated cowl neckline and flowing silhouette.',
    material: '100% Premium Viscose',
    isNew: true
  },
  {
    id: '2',
    name: 'Asymmetric Drape Dress',
    price: 189,
    category: 'dresses',
    color: 'Brown Rice',
    colorHex: '#8b7355',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80'
    ],
    description: 'An elegant asymmetric drape dress crafted from premium viscose. Features a sophisticated cowl neckline and flowing silhouette.',
    material: '100% Premium Viscose',
    isSoldOut: true
  },
  {
    id: '3',
    name: 'Structured Maxi Dress',
    price: 219,
    category: 'dresses',
    color: 'Dark Cherry',
    colorHex: '#5a2a2a',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80'
    ],
    description: 'A structured maxi dress with architectural details and a flattering fit. Perfect for special occasions.',
    material: '95% Polyester, 5% Elastane',
    isNew: true
  },
  {
    id: '4',
    name: 'Classic Abaya',
    price: 249,
    category: 'abayas',
    color: 'Charcoal',
    colorHex: '#2a2a2a',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'
    ],
    description: 'Our signature classic abaya in a timeless charcoal shade. Features delicate embroidery details and a relaxed fit.',
    material: '100% Premium Crepe',
    isRestocked: true
  },
  {
    id: '5',
    name: 'Open Front Abaya',
    price: 279,
    category: 'abayas',
    color: 'Olive',
    colorHex: '#a8a17f',
    sizes: ['S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80'
    ],
    description: 'A modern open-front abaya with contemporary styling. Features a belt tie and slightly oversized silhouette.',
    material: '100% Linen Blend'
  },
  
  // Tops
  {
    id: '6',
    name: 'High Neck Tee',
    price: 59,
    category: 'tops',
    color: 'Dark Cherry',
    colorHex: '#5a2a2a',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://bymerrachi.com/cdn/shop/files/High_Neck_Tee_Dark_Cherry_BM_F_2788.jpg?v=1760357057'
    ],
    description: 'The High Neck Tee is a refined women\'s cotton t-shirt designed with modest style in mind. Crafted from 100% cotton, it features a high neckline for structure and dropped shoulders for an easy, relaxed fit. Clean lines and a straight hem keep the silhouette minimal and versatile. Ideal for layering under blazers, knitwear, or abayas, this modest high-neck top is a wardrobe essential that balances everyday comfort with a contemporary edge.',
    material: '100% Cotton',
    modelInfo: 'This model is 176cm tall and wearing a size S - Item fits true to size',
    completeTheLook: ['9'],
    isRestocked: true
  },
  {
    id: '7',
    name: 'High Neck Tee',
    price: 59,
    category: 'tops',
    color: 'Black',
    colorHex: '#1a1a1a',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
    ],
    description: 'Our bestselling high neck tee in classic black. Crafted from premium cotton with a relaxed fit.',
    material: '100% Organic Cotton',
    isNew: true
  },
  {
    id: '8',
    name: 'Oversized Shirt',
    price: 89,
    category: 'tops',
    color: 'Cream',
    colorHex: '#f8f5f0',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80'
    ],
    description: 'A relaxed oversized shirt in soft cream. Perfect for layering or worn on its own.',
    material: '100% Cotton Poplin'
  },

  // Bottoms
  {
    id: '9',
    name: 'The Casual Pants',
    price: 69,
    category: 'bottoms',
    color: 'Dark Cherry',
    colorHex: '#5a2a2a',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://bymerrachi.com/cdn/shop/files/The_Casual_Pants_Dark_Cherry_BM_F_2812.jpg?v=1760357057'
    ],
    description: 'Comfortable casual pants with an elasticated waist and relaxed fit. Crafted from premium cotton with a touch of elastane for comfort. Designed to complement our High Neck Tee for a complete, effortless look.',
    material: '98% Cotton, 2% Elastane',
    modelInfo: 'This model is 176cm tall and wearing a size S',
    isNew: true
  },
  {
    id: '10',
    name: 'The Casual Pants',
    price: 69,
    category: 'bottoms',
    color: 'Black',
    colorHex: '#1a1a1a',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'
    ],
    description: 'Comfortable casual pants with an elasticated waist and relaxed fit. A versatile essential.',
    material: '98% Cotton, 2% Elastane',
    isNew: true
  },
  {
    id: '11',
    name: 'Wide Leg Trousers',
    price: 99,
    category: 'bottoms',
    color: 'Stone',
    colorHex: '#8a8578',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80'
    ],
    description: 'Elegant wide-leg trousers with a high waist and flowing silhouette. Dress up or down.',
    material: '100% Tencel'
  },

  // Outerwear
  {
    id: '12',
    name: 'Structured Blazer',
    price: 179,
    category: 'outerwear',
    color: 'Charcoal',
    colorHex: '#2a2a2a',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    description: 'A perfectly tailored blazer with structured shoulders and a single button closure.',
    material: '70% Wool, 30% Polyester',
    isNew: true
  },
  {
    id: '13',
    name: 'Oversized Wool Coat',
    price: 349,
    category: 'outerwear',
    color: 'Biscuit',
    colorHex: '#d4c5b0',
    sizes: ['S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'
    ],
    description: 'A luxurious oversized wool coat for the coldest days. Features deep pockets and a belt tie.',
    material: '80% Wool, 20% Cashmere'
  },
  {
    id: '14',
    name: 'Quilted Jacket',
    price: 229,
    category: 'outerwear',
    color: 'Olive',
    colorHex: '#a8a17f',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd628b8?w=800&q=80'
    ],
    description: 'A lightweight quilted jacket perfect for transitional weather. Features a hidden hood.',
    material: '100% Recycled Nylon',
    isRestocked: true
  },

  // Scarves
  {
    id: '15',
    name: 'Premium Jersey Scarf',
    price: 35,
    category: 'scarves',
    subcategory: 'Premium Jersey',
    color: 'Dusty Rose',
    colorHex: '#c9a9a6',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'
    ],
    description: 'Our signature premium jersey scarf. Soft, stretchy, and easy to style.',
    material: '95% Viscose, 5% Elastane'
  },
  {
    id: '16',
    name: 'Premium Jersey Scarf',
    price: 35,
    category: 'scarves',
    subcategory: 'Premium Jersey',
    color: 'Dark Cherry',
    colorHex: '#5a2a2a',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'
    ],
    description: 'Our signature premium jersey scarf. Soft, stretchy, and easy to style.',
    material: '95% Viscose, 5% Elastane',
    isNew: true
  },
  {
    id: '17',
    name: 'Bamboo Jersey Scarf',
    price: 39,
    category: 'scarves',
    subcategory: 'Bamboo Jersey',
    color: 'Black',
    colorHex: '#1a1a1a',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'
    ],
    description: 'Ultra-soft bamboo jersey scarf. Naturally antibacterial and breathable.',
    material: '70% Bamboo, 30% Cotton'
  },
  {
    id: '18',
    name: 'Liquid Jersey Scarf',
    price: 45,
    category: 'scarves',
    subcategory: 'Liquid Jersey',
    color: 'Champagne',
    colorHex: '#f7e7ce',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'
    ],
    description: 'Luxurious liquid jersey with a beautiful drape. Perfect for special occasions.',
    material: '100% Modal'
  },
  {
    id: '19',
    name: 'Weightless Woven Scarf',
    price: 49,
    category: 'scarves',
    subcategory: 'Weightless Woven',
    color: 'Sage',
    colorHex: '#b2ac88',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?w=800&q=80'
    ],
    description: 'A featherlight woven scarf that flows beautifully. Perfect for warm weather.',
    material: '100% Tencel'
  },

  // Accessories
  {
    id: '20',
    name: 'Acetate Framed Sunglasses',
    price: 89,
    category: 'accessories',
    color: 'Black',
    colorHex: '#1a1a1a',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80'
    ],
    description: 'Classic acetate sunglasses with UV400 protection. Timeless style.',
    material: 'Premium Acetate'
  },
  {
    id: '21',
    name: 'Acetate Framed Sunglasses',
    price: 89,
    category: 'accessories',
    color: 'Turtle',
    colorHex: '#654321',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80'
    ],
    description: 'Classic acetate sunglasses with UV400 protection. Timeless style.',
    material: 'Premium Acetate'
  },
  {
    id: '22',
    name: 'Leather Crossbody Bag',
    price: 159,
    category: 'accessories',
    color: 'Cognac',
    colorHex: '#9a4a2f',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'
    ],
    description: 'A versatile leather crossbody bag with an adjustable strap. Fits all your essentials.',
    material: '100% Genuine Leather',
    isNew: true
  },
  {
    id: '23',
    name: 'Pearl Hijab Pin Set',
    price: 19,
    category: 'accessories',
    color: 'Gold',
    colorHex: '#d4af37',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    description: 'An elegant set of pearl hijab pins. Set of 4 pins in a gift box.',
    material: 'Gold-plated brass with faux pearls'
  },
  {
    id: '24',
    name: 'Cotton Underscarf',
    price: 15,
    category: 'accessories',
    color: 'White',
    colorHex: '#ffffff',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1622760807800-66cf1466fc08?w=800&q=80'
    ],
    description: 'A comfortable cotton underscarf that keeps your scarf in place all day.',
    material: '100% Organic Cotton'
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getRestockedProducts = (): Product[] => {
  return products.filter(p => p.isRestocked);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 8);
};


