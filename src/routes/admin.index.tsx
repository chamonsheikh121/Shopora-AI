import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/")({
  component: AdminAnalytics,
});

const stats = [
  { label: "Revenue (30d)", value: "$184,520", change: "+12.4%", icon: DollarSign },
  { label: "Orders", value: "1,284", change: "+8.1%", icon: ShoppingBag },
  { label: "New Clients", value: "342", change: "+24%", icon: Users },
  { label: "Conversion", value: "4.8%", change: "+0.6%", icon: TrendingUp },
];

const chartData = [42, 55, 48, 72, 65, 88, 76, 95, 82, 110, 98, 124];
const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
const max = Math.max(...chartData);

const topProducts = [
  { name: "Aurum Chronograph", sales: 184, revenue: 892400 },
  { name: "Reine Necklace", sales: 42, revenue: 344400 },
  { name: "Onyx Tote", sales: 156, revenue: 308880 },
  { name: "Sonore Headphones", sales: 209, revenue: 269610 },
];

function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Overview</p>
        <h1 className="font-display text-4xl">Analytics</h1>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</p>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="font-display text-2xl text-gradient-gold">{s.value}</p>
            <p className="text-xs text-emerald-400 mt-1">{s.change} vs prev</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl mb-6">Revenue · 12 months</h2>
        <div className="flex items-end gap-2 h-48">
          {chartData.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(v / max) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-t-md bg-gradient-gold shadow-gold"
                style={{ minHeight: "4px" }}
              />
              <span className="text-[10px] text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl mb-6">Top performing pieces</h2>
        <div className="space-y-3">
          {topProducts.map((p) => (
            <div key={p.name} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{p.name}</span>
                  <span className="text-muted-foreground">${p.revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.sales / 220) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-gold"
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground w-16 text-right">{p.sales} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
