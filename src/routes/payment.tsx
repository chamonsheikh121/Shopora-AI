import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Loader2, CheckCircle2, XCircle, Lock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/store/cart";
import { api } from "@/services/api";
import { useAutomation } from "@/store/automation";

export const Route = createFileRoute("/payment")({
  component: PaymentPage,
});

type Status = "idle" | "processing" | "success" | "failed";

function PaymentPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const trigger = useAutomation((s) => s.trigger);
  const [status, setStatus] = useState<Status>("idle");
  const [orderId, setOrderId] = useState("");

  const pay = async () => {
    setStatus("processing");
    trigger("Payment workflow triggered");
    const res = await api.processPayment();
    if (res.success) {
      setOrderId(res.orderId);
      setStatus("success");
      trigger("Order confirmation sent");
      setTimeout(() => trigger("Inventory updated · n8n"), 600);
      clear();
    } else {
      setStatus("failed");
    }
  };

  if (status === "success") {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-6 py-32 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Confirmation</p>
          <h1 className="font-display text-4xl mb-4">Thank you.</h1>
          <p className="text-muted-foreground mb-2">Your order has been placed with the maison.</p>
          <p className="font-mono text-sm text-primary mb-10">Reference: {orderId}</p>
          <div className="flex justify-center gap-3">
            <Link to="/dashboard" className="bg-gradient-gold text-primary-foreground px-6 py-3 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold">View Orders</Link>
            <Link to="/products" className="border border-primary/40 px-6 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-primary/10">Continue</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Step 2 of 2</p>
        <h1 className="font-display text-4xl md:text-5xl mb-12">Secure Payment</h1>

        <div className="glass rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-primary" /> Encrypted simulation
            </div>
            <CreditCard className="h-5 w-5 text-primary" />
          </div>

          <div className="space-y-5">
            <Field label="Cardholder name" placeholder="Alexandra Vance" />
            <Field label="Card number" placeholder="4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" placeholder="04 / 28" />
              <Field label="CVC" placeholder="123" />
            </div>
          </div>

          {status === "failed" && (
            <div className="mt-6 flex items-center gap-2 text-sm text-destructive">
              <XCircle className="h-4 w-4" /> Payment declined. Please try again.
            </div>
          )}

          <div className="gold-divider my-8" />

          <div className="flex justify-between items-end mb-6">
            <p className="text-sm text-muted-foreground">{items.length} items</p>
            <p className="font-display text-2xl text-gradient-gold">${subtotal.toLocaleString()}</p>
          </div>

          <button
            onClick={pay}
            disabled={status === "processing" || items.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold disabled:opacity-60"
          >
            {status === "processing" ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
            ) : (
              <>Pay ${subtotal.toLocaleString()}</>
            )}
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
      <input
        placeholder={placeholder}
        className="mt-1 w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
      />
    </label>
  );
}
