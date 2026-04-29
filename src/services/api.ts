// Mock API layer. Swap these implementations for real fetch() calls later.
import { mockProducts, mockReviews, mockOrders, mockUser } from "@/data/mock";
import type { Product, Review, Order, User } from "@/types";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async getProducts(): Promise<Product[]> {
    await delay();
    return mockProducts;
  },
  async getProduct(id: string): Promise<Product | undefined> {
    await delay(300);
    return mockProducts.find((p) => p.id === id);
  },
  async getFeaturedProducts(): Promise<Product[]> {
    await delay();
    return mockProducts.slice(0, 4);
  },
  async getReviews(productId: string): Promise<Review[]> {
    await delay(300);
    return mockReviews.filter((r) => r.productId === productId);
  },
  async getOrders(): Promise<Order[]> {
    await delay();
    return mockOrders;
  },
  async login(email: string, _password: string): Promise<User> {
    await delay(700);
    return { ...mockUser, email };
  },
  async register(name: string, email: string, _password: string): Promise<User> {
    await delay(800);
    return { ...mockUser, name, email };
  },
  async processPayment(): Promise<{ success: boolean; orderId: string }> {
    await delay(1800);
    // simulate 90% success rate
    const success = Math.random() > 0.1;
    return { success, orderId: success ? `ORD-${Math.floor(10000 + Math.random() * 90000)}` : "" };
  },
};
