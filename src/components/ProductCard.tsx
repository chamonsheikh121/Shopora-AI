import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/store/cart";
import { useAutomation } from "@/store/automation";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const trigger = useAutomation((s) => s.trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-card aspect-square shadow-soft hover-lift">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold shadow-gold">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product);
                trigger(`Added ${product.name} to cart`);
              }}
              className="w-full bg-gradient-gold text-primary-foreground text-xs uppercase tracking-widest py-2.5 rounded-md font-semibold flex items-center justify-center gap-2 shadow-gold"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-4 px-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">{product.category}</p>
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-base font-semibold">${product.price.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span>{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
