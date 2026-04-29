import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, Users, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const links = [
  { to: "/admin", label: "Analytics", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package, exact: false },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag, exact: false },
  { to: "/admin/users", label: "Users", icon: Users, exact: false },
];

function AdminLayout() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <SiteLayout hideFooter>
      <section className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="glass rounded-2xl p-5 h-fit">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-5 px-3">Admin</p>
          <nav className="space-y-1">
            {links.map((l) => {
              const active = l.exact ? path === l.to : path.startsWith(l.to);
              return (
                <Link key={l.to} to={l.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${active ? "bg-gradient-gold-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div><Outlet /></div>
      </section>
    </SiteLayout>
  );
}
