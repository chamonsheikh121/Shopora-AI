import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Tag, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping - discount;

  const apply = () => {
    if (coupon.trim().toUpperCase() === "AURE10") {
      setDiscount(Math.round(subtotal * 0.1));
      setCouponMsg("AURE10 applied — 10% off");
    } else {
      setDiscount(0);
      setCouponMsg("Coupon not recognized");
    }
  };

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl mb-4">Your bag is empty</h1>
          <Link to="/products" className="text-primary">Discover pieces</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Step 1 of 2</p>
        <h1 className="font-display text-4xl md:text-5xl mb-12">Checkout</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/payment" });
          }}
          className="grid lg:grid-cols-[1fr_400px] gap-10"
        >
          <div className="space-y-8">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-6">Contact</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" required />
                <Field label="Last name" required />
                <Field label="Email" type="email" required />
                <Field label="Phone" type="tel" />
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-6">Shipping Address</h3>
              <div className="space-y-4">
                <Field label="Street address" required />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="City" required />
                  <Field label="Postal code" required />
                  <Field label="Country" required />
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" /> Promo Code
              </h3>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Try AURE10"
                  className="flex-1 bg-input/50 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
                <button type="button" onClick={apply} className="bg-secondary border border-primary/40 text-foreground px-5 rounded-md text-sm font-medium hover:bg-muted">
                  Apply
                </button>
              </div>
              {couponMsg && <p className={`text-xs mt-2 ${discount > 0 ? "text-primary" : "text-muted-foreground"}`}>{couponMsg}</p>}
            </div>
          </div>

          <aside className="glass rounded-2xl p-6 h-fit sticky top-28">
            <h3 className="font-display text-xl mb-6">Order Summary</h3>
            <div className="space-y-3 max-h-60 overflow-auto pr-1">
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3 items-center">
                  <img src={it.product.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{it.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {it.quantity}</p>
                  </div>
                  <p className="text-sm">${(it.product.price * it.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="gold-divider my-5" />
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toLocaleString()}`} />
              <Row label="Shipping" value={shipping === 0 ? "Complimentary" : `$${shipping}`} />
              {discount > 0 && <Row label="Discount" value={`−$${discount.toLocaleString()}`} />}
              <div className="gold-divider my-3" />
              <div className="flex justify-between text-lg font-semibold"><span>Total</span><span className="text-gradient-gold">${total.toLocaleString()}</span></div>
            </div>
            <button type="submit" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold">
              Continue to Payment <ArrowRight className="h-4 w-4" />
            </button>
          </aside>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
      <input
        type={type}
        required={required}
        className="mt-1 w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>
  );
}
