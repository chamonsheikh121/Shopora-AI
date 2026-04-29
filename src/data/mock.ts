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
  },
];

export const mockReviews: Review[] = [
  { id: "r1", productId: "p1", author: "Camille L.", rating: 5, comment: "Pure craftsmanship. Worth every cent.", date: "2026-03-12" },
  { id: "r2", productId: "p1", author: "Adrien M.", rating: 5, comment: "The gold finish is breathtaking in person.", date: "2026-02-28" },
  { id: "r3", productId: "p1", author: "Sofia R.", rating: 4, comment: "Stunning. Slightly heavier than I expected.", date: "2026-02-10" },
  { id: "r4", productId: "p2", author: "Mira K.", rating: 5, comment: "My signature scent. Lasts all day.", date: "2026-04-01" },
  { id: "r5", productId: "p3", author: "Élise V.", rating: 5, comment: "The leather is buttery. A forever bag.", date: "2026-03-22" },
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
