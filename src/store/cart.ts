import { create } from "zustand";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (product, qty = 1) =>
    set((s) => {
      const existing = s.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
          ),
        };
      }
      return { items: [...s.items, { product, quantity: qty }] };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
  setQty: (id, qty) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.product.id === id ? { ...i, quantity: Math.max(0, qty) } : i))
        .filter((i) => i.quantity > 0),
    })),
  clear: () => set({ items: [] }),
  subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
