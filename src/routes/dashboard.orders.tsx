import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { Order } from "@/types";

export const Route = createFileRoute("/dashboard/orders")({
  component: Orders,
});

const statusStyle: Record<Order["status"], string> = {
  pending: "bg-muted text-muted-foreground",
  processing: "bg-amber-500/20 text-amber-300",
  shipped: "bg-blue-500/20 text-blue-300",
  delivered: "bg-emerald-500/20 text-emerald-300",
  cancelled: "bg-red-500/20 text-red-300",
};

function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => { api.getOrders().then(setOrders); }, []);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">History</p>
        <h1 className="font-display text-4xl">Your Orders</h1>
      </header>

      {!orders ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 rounded-2xl bg-muted shimmer" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-mono text-sm text-primary">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.date} · {o.address}</p>
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${statusStyle[o.status]}`}>
                  {o.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {o.items.map((it) => (
                  <div key={it.product.id} className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
                    <img src={it.product.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                    <div>
                      <p className="text-xs">{it.product.name}</p>
                      <p className="text-[10px] text-muted-foreground">Qty {it.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gold-divider my-4" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="font-display text-xl text-gradient-gold">${o.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
