import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { User, Package, Settings, LogOut } from "lucide-react";
import { useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/store/auth";
import { mockUser } from "@/data/mock";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const links = [
  { to: "/dashboard", label: "Profile", icon: User, exact: true },
  { to: "/dashboard/orders", label: "Orders", icon: Package, exact: false },
  { to: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
];

function DashboardLayout() {
  const user = useAuth((s) => s.user);
  const setUser = useAuth((s) => s.setUser);
  const logout = useAuth((s) => s.logout);
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    if (!user) setUser(mockUser); // mock auto-login
  }, [user, setUser]);

  return (
    <SiteLayout hideFooter>
      <section className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="glass rounded-2xl p-6 h-fit">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/50">
            <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center font-display text-primary-foreground font-bold">
              {(user?.name ?? "A")[0]}
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm truncate">{user?.name ?? "Guest"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <nav className="space-y-1">
            {links.map((l) => {
              const active = l.exact ? path === l.to : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                    active ? "bg-gradient-gold-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              );
            })}
            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive transition">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </nav>
        </aside>
        <div><Outlet /></div>
      </section>
    </SiteLayout>
  );
}
