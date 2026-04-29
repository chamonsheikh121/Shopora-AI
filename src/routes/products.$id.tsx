import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Zap, Truck, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { api } from "@/services/api";
import { useCart } from "@/store/cart";
import { useAutomation } from "@/store/automation";
import type { Product, Review } from "@/types";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Piece not found</h1>
        <Link to="/products" className="text-primary">Back to collection</Link>
      </div>
    </SiteLayout>
  ),
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const add = useCart((s) => s.add);
  const trigger = useAutomation((s) => s.trigger);

  useEffect(() => {
    api.getProduct(id).then((p) => setProduct(p ?? null));
    api.getReviews(id).then(setReviews);
  }, [id]);

  if (product === undefined) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-2xl bg-muted shimmer" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-muted shimmer rounded" />
            <div className="h-6 w-1/3 bg-muted shimmer rounded" />
            <div className="h-24 w-full bg-muted shimmer rounded" />
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (product === null) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl mb-4">Piece not found</h1>
          <Link to="/products" className="text-primary">Back to collection</Link>
        </div>
      </SiteLayout>
    );
  }

  const gallery = [product.image, product.image, product.image];

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-card shadow-luxe">
            <img src={gallery[active]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                  active === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} · {product.reviewsCount} reviews</span>
          </div>

          <p className="text-3xl font-display text-gradient-gold mb-6">${product.price.toLocaleString()}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 text-lg">−</button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 text-lg">+</button>
            </div>
            <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => { add(product, qty); trigger(`Added ${product.name}`); }}
              className="flex-1 min-w-[180px] bg-secondary hover:bg-muted border border-primary/40 text-foreground px-6 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => { add(product, qty); navigate({ to: "/checkout" }); }}
              className="flex-1 min-w-[180px] bg-gradient-gold text-primary-foreground px-6 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4" /> Buy Now
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Complimentary delivery</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Lifetime authentication</div>
          </div>
        </motion.div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="gold-divider mb-12" />
        <h2 className="font-display text-3xl mb-8">Client Voices</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet.</p>
          ) : reviews.map((r) => (
            <div key={r.id} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4">"{r.comment}"</p>
              <p className="text-xs text-muted-foreground">— {r.author} · {r.date}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
