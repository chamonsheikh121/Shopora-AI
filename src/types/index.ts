export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  stock: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  address: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  productSuggestions?: Product[];
  timestamp: number;
}

export interface AutomationEvent {
  id: string;
  label: string;
  status: "running" | "success" | "failed";
  timestamp: number;
}
