import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, ArrowRight, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 25) : 0;
  const total = subtotal + shipping;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Your Selection</p>
        <h1 className="font-display text-4xl md:text-6xl mb-12">Shopping Bag</h1>

        {items.length === 0 ? (
          <div className="glass rounded-3xl p-20 text-center">
            <p className="font-display text-2xl mb-4">Your bag is empty.</p>
            <p className="text-muted-foreground mb-8">Begin curating your collection.</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold">
              Discover Pieces <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-10">
            <div className="space-y-4">
              {items.map((it, i) => (
                <motion.div
                  key={it.product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-4 flex gap-4"
                >
                  <img src={it.product.image} alt={it.product.name} className="h-28 w-28 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary">{it.product.category}</p>
                    <Link to="/products/$id" params={{ id: it.product.id }} className="font-display text-lg hover:text-primary block truncate">
                      {it.product.name}
                    </Link>
                    <p className="text-sm text-gradient-gold font-semibold mt-1">${it.product.price.toLocaleString()}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => setQty(it.product.id, it.quantity - 1)} className="h-8 w-8 flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{it.quantity}</span>
                        <button onClick={() => setQty(it.product.id, it.quantity + 1)} className="h-8 w-8 flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(it.product.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <aside className="glass rounded-2xl p-6 h-fit sticky top-28">
              <h3 className="font-display text-xl mb-6">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span></div>
                <div className="gold-divider my-4" />
                <div className="flex justify-between text-lg font-semibold"><span>Total</span><span className="text-gradient-gold">${total.toLocaleString()}</span></div>
              </div>
              <Link to="/checkout" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
