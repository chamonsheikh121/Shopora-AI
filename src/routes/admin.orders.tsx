import { createFileRoute } from "@tanstack/react-router";
import { mockOrders } from "@/data/mock";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const allOrders = [
  ...mockOrders,
  { id: "ORD-10431", customer: "Lila Moreau", total: 320, status: "pending", date: "2026-04-28" },
  { id: "ORD-10432", customer: "Kenji Sato", total: 1980, status: "shipped", date: "2026-04-27" },
  { id: "ORD-10433", customer: "Hugo Bauer", total: 540, status: "delivered", date: "2026-04-26" },
];

function AdminOrders() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Operations</p>
        <h1 className="font-display text-4xl">Orders</h1>
      </header>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Order</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((o: any, i) => (
              <tr key={i} className="border-t border-border/40 hover:bg-muted/20">
                <td className="p-4 font-mono text-primary text-xs">{o.id}</td>
                <td className="p-4">{o.customer ?? "Alexandra Vance"}</td>
                <td className="p-4 text-muted-foreground">{o.date}</td>
                <td className="p-4"><span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-muted">{o.status}</span></td>
                <td className="p-4 text-right text-gradient-gold font-semibold">${o.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
