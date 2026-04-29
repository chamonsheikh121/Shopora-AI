import type { Product, Review, Order, User } from "@/types";
import watch from "@/assets/product-watch.jpg";
import perfume from "@/assets/product-perfume.jpg";
import bag from "@/assets/product-bag.jpg";
import sunglasses from "@/assets/product-sunglasses.jpg";
import jewelry from "@/assets/product-jewelry.jpg";
import shoes from "@/assets/product-shoes.jpg";
import pen from "@/assets/product-pen.jpg";
import headphones from "@/assets/product-headphones.jpg";

export const categories = [
  { id: "watches", name: "Watches", count: 12 },
  { id: "fragrance", name: "Fragrance", count: 8 },
  { id: "leather", name: "Leather Goods", count: 15 },
  { id: "eyewear", name: "Eyewear", count: 6 },
  { id: "jewelry", name: "Jewelry", count: 21 },
  { id: "footwear", name: "Footwear", count: 9 },
  { id: "accessories", name: "Accessories", count: 14 },
  { id: "audio", name: "Audio", count: 5 },
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Aurum Chronograph Watch",
    price: 4850,
    category: "watches",
    image: watch,
    rating: 4.9,
    reviewsCount: 128,
    description:
      "A masterpiece of horology — Swiss movement, 18k gold-plated case, and sapphire crystal. Crafted for those who measure time in elegance.",
    badge: "Bestseller",
    stock: 12,
    sku: "WTC-001-AU",
    specifications: {
      "Movement": "Swiss Automatic ETA 2896",
      "Case Material": "18k Gold-Plated Stainless Steel",
      "Case Diameter": "42mm",
      "Water Resistance": "100m / 330ft",
      "Functions": "Chronograph, Date, GMT",
      "Warranty": "10 Years",
    },
    materials: ["18k Gold-Plated Steel", "Sapphire Crystal", "Alligator Strap"],
    careInstructions: ["Avoid water during chronograph operation", "Service every 3-5 years", "Clean with soft cloth"],
  },
  {
    id: "p2",
    name: "Noir Élixir Eau de Parfum",
    price: 320,
    category: "fragrance",
    image: perfume,
    rating: 4.8,
    reviewsCount: 96,
    description:
      "Top notes of bergamot and saffron settle into a heart of oud and amber. A signature scent for the discerning.",
    badge: "New",
    stock: 24,
    sku: "FRG-002-NE",
    specifications: {
      "Volume": "100ml",
      "Concentration": "Eau de Parfum (20%)",
      "Top Notes": "Bergamot, Saffron",
      "Heart Notes": "Oud, Amber",
      "Base Notes": "Musk, Sandalwood",
      "Longevity": "8-10 Hours",
    },
    materials: ["Bergamot Oil", "Oud", "Ambroxan", "Sandalwood"],
    careInstructions: ["Store away from direct sunlight", "Keep at room temperature", "Apply to pulse points"],
  },
  {
    id: "p3",
    name: "Onyx Leather Tote",
    price: 1980,
    category: "leather",
    image: bag,
    rating: 4.7,
    reviewsCount: 211,
    description:
      "Hand-stitched full-grain leather, finished with 24k gold-plated hardware. Spacious, structured, sublime.",
    stock: 8,
    sku: "BAG-003-OX",
    specifications: {
      "Leather": "Full-Grain Italian Leather",
      "Lining": "Silk",
      "Hardware": "24k Gold-Plated",
      "Dimensions": "35cm H × 42cm W × 14cm D",
      "Capacity": "18L",
      "Straps": "Adjustable Handles",
    },
    materials: ["Full-Grain Leather", "Silk Lining", "Gold-Plated Hardware"],
    careInstructions: ["Condition leather monthly", "Wipe with soft damp cloth", "Store in dust bag", "Avoid excess moisture"],
  },
  {
    id: "p4",
    name: "Solène Aviator Sunglasses",
    price: 540,
    category: "eyewear",
    image: sunglasses,
    rating: 4.6,
    reviewsCount: 73,
    description:
      "Italian acetate frames with polarized amber lenses. Iconic silhouette, golden details.",
    stock: 18,
    sku: "EYE-004-SL",
    specifications: {
      "Frame Material": "Italian Acetate",
      "Lens Type": "Polarized Amber",
      "UV Protection": "100% UV400",
      "Bridge Width": "16mm",
      "Lens Width": "57mm",
      "Frame Width": "138mm",
    },
    materials: ["Acetate", "Polarized Glass", "Gold-Plated Hinges"],
    careInstructions: ["Clean with microfiber cloth", "Store in protective case", "Avoid extreme heat"],
  },
  {
    id: "p5",
    name: "Reine Diamond Necklace",
    price: 8200,
    category: "jewelry",
    image: jewelry,
    rating: 5.0,
    reviewsCount: 42,
    description:
      "An heirloom-worthy necklace set in 18k gold with hand-selected diamonds. Each piece is one of one.",
    badge: "Limited",
    stock: 3,
    sku: "JWL-005-REIN",
    specifications: {
      "Metal": "18k White Gold",
      "Diamond Carat": "2.5ct (Total)",
      "Diamond Clarity": "VS1",
      "Diamond Cut": "Brilliant",
      "Chain Length": "45cm",
      "Closure": "Secure Lobster Clasp",
    },
    materials: ["18k White Gold", "Certified Diamonds", "18k Gold Chain"],
    careInstructions: ["Clean with jeweler-approved cloth", "Store separately", "Professional cleaning yearly"],
  },
  {
    id: "p6",
    name: "Aurélie Stiletto Pump",
    price: 760,
    category: "footwear",
    image: shoes,
    rating: 4.5,
    reviewsCount: 154,
    description:
      "Hand-finished gold satin with crystal embroidery. The art of walking, elevated.",
    stock: 10,
    sku: "SHO-006-AUR",
    specifications: {
      "Material": "Gold Satin",
      "Heel Height": "9.5cm",
      "Heel Type": "Stiletto",
      "Embellishment": "Hand-Sewn Crystals",
      "Lining": "Leather",
      "Sizes": "35-42",
    },
    materials: ["Silk Satin", "Swarovski Crystals", "Leather Lining"],
    careInstructions: ["Store with shoe trees", "Protect satin with cloth cover", "Professional cleaning recommended"],
  },
  {
    id: "p7",
    name: "Maître Fountain Pen",
    price: 980,
    category: "accessories",
    image: pen,
    rating: 4.9,
    reviewsCount: 65,
    description:
      "Lacquered black resin barrel with 18k gold nib. Resined in France, signed by hand.",
    stock: 14,
    sku: "PEN-007-MAI",
    specifications: {
      "Nib": "18k Solid Gold",
      "Nib Size": "Medium (0.8mm)",
      "Material": "Lacquered Resin",
      "Finish": "Hand-Polished",
      "Production": "Made in France",
      "Refill": "International Standard",
    },
    materials: ["Lacquered Black Resin", "18k Gold Nib", "Mother of Pearl Grip"],
    careInstructions: ["Flush nib weekly", "Use quality ink only", "Store cap on when not in use"],
  },
  {
    id: "p8",
    name: "Sonore Gold Headphones",
    price: 1290,
    category: "audio",
    image: headphones,
    rating: 4.7,
    reviewsCount: 189,
    description:
      "Studio-grade audio in a luxurious shell. Memory-foam ear cups and 40-hour battery.",
    badge: "Hot",
    stock: 22,
    sku: "AUD-008-SON",
    specifications: {
      "Driver Size": "40mm",
      "Frequency": "20Hz - 20kHz",
      "Impedance": "32Ω",
      "Battery Life": "40 Hours",
      "Charging Time": "2.5 Hours",
      "Connectivity": "Bluetooth 5.0 + 3.5mm",
    },
    materials: ["Aluminum & Gold Plating", "Memory Foam", "Premium Synthetic Leather"],
    careInstructions: ["Clean ear cups regularly", "Store in protective case", "Avoid extreme temperatures"],
  },
];

export const mockReviews: Review[] = [
  { id: "r1", productId: "p1", author: "Camille L.", rating: 5, comment: "Pure craftsmanship. Worth every cent. The accuracy is incredible.", date: "2026-03-12" },
  { id: "r2", productId: "p1", author: "Adrien M.", rating: 5, comment: "The gold finish is breathtaking in person. Better than photos.", date: "2026-02-28" },
  { id: "r3", productId: "p1", author: "Sofia R.", rating: 4, comment: "Stunning piece. Slightly heavier than I expected but very comfortable.", date: "2026-02-10" },
  { id: "r6", productId: "p1", author: "Jean P.", rating: 5, comment: "Received many compliments. Feels like luxury on the wrist.", date: "2026-01-15" },
  { id: "r7", productId: "p1", author: "Marie T.", rating: 5, comment: "Perfect gift. The packaging is as elegant as the watch itself.", date: "2025-12-20" },
  
  { id: "r4", productId: "p2", author: "Mira K.", rating: 5, comment: "My signature scent. Lasts all day without being overpowering.", date: "2026-04-01" },
  { id: "r8", productId: "p2", author: "Lena S.", rating: 4, comment: "Beautiful scent, long lasting. A bit pricey but worth it.", date: "2026-03-18" },
  { id: "r9", productId: "p2", author: "Viktor R.", rating: 5, comment: "Sophisticated and elegant. Gets compliments everywhere.", date: "2026-02-14" },
  
  { id: "r5", productId: "p3", author: "Élise V.", rating: 5, comment: "The leather is buttery soft. A forever bag for sure.", date: "2026-03-22" },
  { id: "r10", productId: "p3", author: "Claire D.", rating: 5, comment: "Excellent quality. Holds everything and looks elegant.", date: "2026-03-05" },
  { id: "r11", productId: "p3", author: "Margot L.", rating: 4, comment: "Beautiful tote. Slightly needs breaking in but leather improves with age.", date: "2026-02-27" },
  
  { id: "r12", productId: "p4", author: "Lucas M.", rating: 5, comment: "Perfect fit and style. The lens quality is exceptional.", date: "2026-03-30" },
  { id: "r13", productId: "p4", author: "Antoine B.", rating: 4, comment: "Very comfortable. Great UV protection. Highly recommend.", date: "2026-02-19" },
  
  { id: "r14", productId: "p5", author: "Isabelle G.", rating: 5, comment: "Absolutely stunning. Every diamond sparkles beautifully.", date: "2026-04-05" },
  { id: "r15", productId: "p5", author: "Véronique P.", rating: 5, comment: "An investment piece. Will be passed down to my daughter.", date: "2026-03-28" },
  
  { id: "r16", productId: "p6", author: "Juliette R.", rating: 5, comment: "So comfortable for heels! Walk with confidence all night.", date: "2026-04-02" },
  { id: "r17", productId: "p6", author: "Céleste M.", rating: 4, comment: "Beautiful crystals catch the light. True luxury shoes.", date: "2026-03-16" },
  
  { id: "r18", productId: "p7", author: "Henri D.", rating: 5, comment: "Writing feels like art. The nib is perfectly balanced.", date: "2026-03-25" },
  { id: "r19", productId: "p7", author: "Bastien L.", rating: 5, comment: "A true collector's item. Writes like a dream.", date: "2026-02-08" },
  
  { id: "r20", productId: "p8", author: "Guillaume F.", rating: 5, comment: "Sound quality is studio-grade. Battery lasts forever.", date: "2026-04-03" },
  { id: "r21", productId: "p8", author: "Natalie K.", rating: 5, comment: "Comfortable for hours. The gold color is stunning.", date: "2026-03-20" },
  { id: "r22", productId: "p8", author: "Pierre V.", rating: 4, comment: "Excellent audio. Love the design. Quality packaging.", date: "2026-02-25" },
];

export const mockUser: User = {
  id: "u1",
  name: "Alexandra Vance",
  email: "alex@auregold.com",
  role: "customer",
};

export const mockOrders: Order[] = [
  {
    id: "ORD-10428",
    userId: "u1",
    items: [{ product: mockProducts[0], quantity: 1 }],
    total: 4850,
    status: "delivered",
    date: "2026-04-08",
    address: "1 Rue Saint-Honoré, Paris",
  },
  {
    id: "ORD-10429",
    userId: "u1",
    items: [
      { product: mockProducts[1], quantity: 2 },
      { product: mockProducts[6], quantity: 1 },
    ],
    total: 1620,
    status: "shipped",
    date: "2026-04-19",
    address: "1 Rue Saint-Honoré, Paris",
  },
  {
    id: "ORD-10430",
    userId: "u1",
    items: [{ product: mockProducts[4], quantity: 1 }],
    total: 8200,
    status: "processing",
    date: "2026-04-26",
    address: "1 Rue Saint-Honoré, Paris",
  },
];
