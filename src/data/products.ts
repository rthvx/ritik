import { Product, Category, Coupon } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-fashion',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    itemCount: 142,
    description: 'Elevated everyday apparel and minimalist luxury streetwear.'
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    itemCount: 88,
    description: 'Next-gen audio, smart wearables, and sleek everyday tech.'
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1608248597359-25f0a2569fa1?auto=format&fit=crop&w=600&q=80',
    itemCount: 64,
    description: 'Organic botanical skincare, serums, and clean self-care.'
  },
  {
    id: 'cat-fitness',
    name: 'Fitness',
    slug: 'fitness',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    itemCount: 53,
    description: 'Performance activewear, training gear, and recovery essentials.'
  },
  {
    id: 'cat-home',
    name: 'Home Decor',
    slug: 'home-decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    itemCount: 97,
    description: 'Nordic minimalist interior accents, ceramics, and textiles.'
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    itemCount: 115,
    description: 'Timepieces, luxury eyewear, leather goods, and EDC.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Essential Hoodie',
    slug: 'essential-hoodie',
    category: 'Fashion',
    price: 2499,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 120,
    badge: 'New',
    isNew: true,
    isBestseller: true,
    discountPercent: 25,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crafted from 480GSM ultra-heavyweight combed French terry cotton. Features double-layered hood, seamless ribbed cuffs, and an oversized minimalist streetwear drop-shoulder fit designed for lifetime durability.',
    shortDescription: 'Premium heavyweight French terry hoodie with relaxed silhouette.',
    features: [
      '100% Organic Heavyweight Cotton (480 GSM)',
      'Pre-shrunk fabric to maintain perfect fit after washing',
      'Double-stitched kangaroo pocket & reinforced seams',
      'Custom dyed in neutral desert oatmeal and stone hues'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#D6C7B2' },
      { name: 'Charcoal Black', hex: '#1E1E1E' },
      { name: 'Heather Grey', hex: '#9CA3AF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    sku: 'RTH-HD-001'
  },
  {
    id: 'prod-2',
    name: 'Air Max 270',
    slug: 'air-max-270',
    category: 'Fashion',
    price: 8999,
    originalPrice: 10999,
    rating: 4.8,
    reviewCount: 98,
    badge: '-20%',
    isNew: false,
    isBestseller: true,
    discountPercent: 20,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Boasts an iconic high-volume Max Air heel unit delivering super-soft bounce and unmatched responsive cushioning. Engineered knit upper offers breathable structure with a sleek aerodynamic profile.',
    shortDescription: 'Iconic performance sneaker with high-impact air cushioning.',
    features: [
      'Large volume Max Air heel unit for 270 degrees of cushion',
      'Engineered mesh upper for targeted lightweight breathability',
      'Dual-density foam midsole absorbs shock on city pavements',
      'Durable rubber outsole with flex grooves for natural movement'
    ],
    colors: [
      { name: 'Triple White / Orange', hex: '#FF4D00' },
      { name: 'Core Black', hex: '#111111' },
      { name: 'Pure Platinum', hex: '#E5E7EB' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    sku: 'RTH-SNK-270'
  },
  {
    id: 'prod-3',
    name: 'Wireless Headphone',
    slug: 'wireless-headphone',
    category: 'Electronics',
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 156,
    badge: 'New',
    isNew: true,
    isBestseller: false,
    discountPercent: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immersive spatial audio combined with lightweight memory-foam comfort. Equipped with low-latency Bluetooth 5.3, 40-hour battery life, and crystal-clear ENC dual microphones for seamless calls.',
    shortDescription: 'High-fidelity wireless sound with ultra-low latency & 40hr battery.',
    features: [
      '40mm custom titanium dynamic drivers',
      '40 hours continuous playtime on single 45-min USB-C charge',
      'Ergonomic protein-leather cushioned earcups',
      'Seamless multi-point dual device pairing'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#18181B' },
      { name: 'Cloud White', hex: '#F4F4F5' },
      { name: 'Rose Gold', hex: '#E0A899' }
    ],
    inStock: true,
    sku: 'RTH-AUD-039'
  },
  {
    id: 'prod-4',
    name: 'Smart Watch Series 9',
    slug: 'smart-watch-series-9',
    category: 'Electronics',
    price: 14999,
    originalPrice: 18999,
    rating: 4.7,
    reviewCount: 87,
    badge: '-21%',
    isNew: false,
    isBestseller: true,
    discountPercent: 21,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Edge-to-edge Retina OLED display with Always-On technology. Precision biometric sensors monitor continuous heart rate, blood oxygen, sleep architecture, and GPS route tracking in water-resistant titanium alloy.',
    shortDescription: 'Advanced health monitoring, GPS tracking & OLED Retina display.',
    features: [
      'Always-on 2000 nits high-brightness OLED Retina panel',
      'ECG, SpO2, Sleep tracking & automated workout detection',
      '50m Water Resistance (5 ATM rated for swimming)',
      'Fast wireless magnetic charging dock included'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#09090B' },
      { name: 'Starlight Silver', hex: '#D1D5DB' },
      { name: 'Sunset Gold', hex: '#D4AF37' }
    ],
    sizes: ['41mm', '45mm'],
    inStock: true,
    sku: 'RTH-WTC-009'
  },
  {
    id: 'prod-5',
    name: 'Stainless Steel Bottle',
    slug: 'stainless-steel-bottle',
    category: 'Fitness',
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 76,
    badge: 'New',
    isNew: true,
    isBestseller: false,
    discountPercent: 24,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Double-wall vacuum insulation keeps beverages iced for 24 hours or piping hot for 12 hours. Constructed with 18/8 food-grade pro-stainless steel and an anti-slip powder matte finish.',
    shortDescription: 'Double-wall insulated 750ml thermal bottle.',
    features: [
      'TempShield double-wall vacuum insulation',
      '18/8 Pro-Grade Stainless Steel (BPA & Phthalate free)',
      'Leak-proof ergonomic sport straw cap and loop handle',
      'Condensation-free exterior powder coat finish'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#1C1917' },
      { name: 'Alpine Sage', hex: '#65A30D' },
      { name: 'Terracotta Red', hex: '#EA580C' }
    ],
    sizes: ['500ml', '750ml', '1000ml'],
    inStock: true,
    sku: 'RTH-BTL-075'
  },
  {
    id: 'prod-6',
    name: 'Aviator Sunglasses',
    slug: 'aviator-sunglasses',
    category: 'Accessories',
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 113,
    badge: '-17%',
    isNew: false,
    isBestseller: false,
    discountPercent: 17,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Modernized classic aviator silhouette handcrafted with ultra-lightweight Japanese monel alloy. Polarized TAC lenses eliminate glare and block 100% UVA/UVB rays with optical precision.',
    shortDescription: 'Polarized UV400 classic aviator shades with alloy frame.',
    features: [
      'Category 3 HD Polarized Triacetate Cellulose (TAC) lenses',
      '100% UV400 eye protection with anti-scratch coating',
      'Flexible spring hinges & hypoallergenic silicone nose pads',
      'Includes premium hard leather case & microfiber cleaning cloth'
    ],
    colors: [
      { name: 'Gunmetal / Dark Smoke', hex: '#27272A' },
      { name: 'Vintage Gold / Green G-15', hex: '#CA8A04' },
      { name: 'Silver / Mirror Blue', hex: '#0284C7' }
    ],
    inStock: true,
    sku: 'RTH-SGL-089'
  },
  {
    id: 'prod-7',
    name: 'Classic Hoodie',
    slug: 'classic-hoodie',
    category: 'Fashion',
    price: 2499,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 120,
    badge: 'Bestseller',
    isNew: false,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Premium quality hoodie perfect for everyday wear. Our signature fleece blend offers supreme warmth without bulk, brushed on the inside for cloud-like softness against the skin.',
    shortDescription: 'Premium quality hoodie perfect for everyday wear.',
    features: [
      'Brushed fleece interior with anti-pill finish',
      'Relaxed dropped shoulder contemporary streetwear silhouette',
      'Ribbed knit hem and cuffs that resist stretching',
      'Reinforced neck tape for non-irritating comfort'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#EDE8DF' },
      { name: 'Olive Drab', hex: '#4B5320' },
      { name: 'Jet Black', hex: '#18181B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    sku: 'RTH-HD-002'
  },
  {
    id: 'prod-8',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    category: 'Electronics',
    price: 24999,
    originalPrice: 29999,
    rating: 5.0,
    reviewCount: 75,
    badge: 'Bestseller',
    isNew: false,
    isBestseller: true,
    discountPercent: 17,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Industry-leading noise cancellation powered by two processors and 8 microphones. Specially engineered 30mm carbon-fiber driver unit with Hi-Res Audio Wireless support and LDAC.',
    shortDescription: 'Industry-leading noise cancellation & studio sound.',
    features: [
      'Auto NC Optimizer dynamically adjusts to your wearing conditions & environment',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours playback)',
      'Speak-to-Chat automatically pauses playback when you start speaking',
      'Ultra-comfortable lightweight design with soft fit leather'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#111111' },
      { name: 'Silver White', hex: '#E5E7EB' },
      { name: 'Smoky Navy', hex: '#1E293B' }
    ],
    inStock: true,
    sku: 'RTH-SONY-M5'
  },
  {
    id: 'prod-9',
    name: 'Botanical Radiance Serum',
    slug: 'botanical-radiance-serum',
    category: 'Beauty',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 142,
    badge: 'Trending',
    isNew: true,
    isBestseller: false,
    discountPercent: 25,
    image: 'https://images.unsplash.com/photo-1608248597359-25f0a2569fa1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-25f0a2569fa1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Infused with cold-pressed rosehip seed oil, 15% stabilised Vitamin C, and hyaluronic acid complex. Restores deep moisture, evens complexion tone, and boosts luminous natural glow.',
    shortDescription: 'Vitamin C & Hyaluronic acid brightening botanical elixir.',
    features: [
      '100% Vegan, Cruelty-Free & Dermatologist Tested',
      'Fragrance-free formula safe for sensitive skin types',
      'Amber UV glass bottle protects botanical potency',
      'Visible luminosity within 7 days of daily application'
    ],
    sizes: ['30ml', '50ml'],
    inStock: true,
    sku: 'RTH-BTY-045'
  },
  {
    id: 'prod-10',
    name: 'Nordic Ceramic Lounge Vase',
    slug: 'nordic-ceramic-lounge-vase',
    category: 'Home Decor',
    price: 2199,
    originalPrice: 2799,
    rating: 4.8,
    reviewCount: 49,
    badge: 'Popular',
    isNew: false,
    isBestseller: false,
    discountPercent: 21,
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hand-thrown stoneware ceramic vase featuring a textured sand glaze and architectural sculptural silhouette. Elevates living rooms, bookshelves, and contemporary coffee tables.',
    shortDescription: 'Handcrafted stoneware architectural decorative vase.',
    features: [
      'High-fire natural stoneware with tactile matte finish',
      'Waterproof interior glazing suitable for fresh florals',
      'Felt-padded bottom prevents furniture scratches',
      'Each piece exhibits subtle unique artisan character'
    ],
    colors: [
      { name: 'Warm Terracotta', hex: '#C2410C' },
      { name: 'Limestone White', hex: '#F5F5F4' },
      { name: 'Basalt Charcoal', hex: '#262626' }
    ],
    inStock: true,
    sku: 'RTH-HOM-068'
  },
  {
    id: 'prod-11',
    name: 'Seamless Training Ribbed Set',
    slug: 'seamless-training-ribbed-set',
    category: 'Fitness',
    price: 3499,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 93,
    badge: 'Bestseller',
    isNew: false,
    isBestseller: true,
    discountPercent: 19,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered with 4-way compression stretch microfiber that sculpts and moves with your body. Moisture-wicking technology keeps you dry during high-intensity pilates, gym, and yoga sessions.',
    shortDescription: 'High-waist sculpted activewear matching set.',
    features: [
      'Seamless micro-ribbed compression knit (88% Polyamide, 12% Elastane)',
      'Squat-proof non-sheer high-waist supportive waistband',
      'Removable padded sports bra with cross-back support',
      'Anti-chafe flatlock seams'
    ],
    colors: [
      { name: 'Graphite Black', hex: '#18181B' },
      { name: 'Canyon Clay', hex: '#9A3412' },
      { name: 'Sage Forest', hex: '#3F6212' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    sku: 'RTH-FIT-074'
  },
  {
    id: 'prod-12',
    name: 'Minimalist Leather Cardholder',
    slug: 'minimalist-leather-cardholder',
    category: 'Accessories',
    price: 1199,
    originalPrice: 1599,
    rating: 4.8,
    reviewCount: 68,
    badge: 'New',
    isNew: true,
    isBestseller: false,
    discountPercent: 25,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Precision stitched full-grain Italian vegetable-tanned leather. Holds up to 8 cards plus folded currency with an embedded RFID shielding layer to protect your personal data.',
    shortDescription: 'Full-grain vegetable-tanned leather with RFID blocker.',
    features: [
      '100% Full-grain Tuscan certified vegetable-tanned leather',
      'Built-in RFID blocking aluminum lining',
      'Slim 5mm profile fits comfortably in front pocket',
      'Develops rich, unique patina over time'
    ],
    colors: [
      { name: 'Cognac Tan', hex: '#92400E' },
      { name: 'Midnight Jet', hex: '#09090B' }
    ],
    inStock: true,
    sku: 'RTH-ACC-034'
  }
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'RTHVX10',
    discountPercent: 10,
    description: '10% off your entire order'
  },
  {
    code: 'FLASH70',
    discountPercent: 70,
    description: 'Seasonal Flash Sale 70% off selected items'
  },
  {
    code: 'SAVE500',
    discountAmount: 500,
    minOrder: 2499,
    description: '₹500 off orders over ₹2,499'
  },
  {
    code: 'FREESHIP',
    discountAmount: 0,
    description: 'Free express delivery on all orders'
  }
];
