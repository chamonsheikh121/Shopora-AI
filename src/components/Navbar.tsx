import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Search, User as UserIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/dashboard", label: "Account" },
  { to: "/admin", label: "Admin" },
];

export function Navbar() {
  const count = useCart((s) => s.count());
  const user = useAuth((s) => s.user);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center font-display text-primary-foreground font-bold">
            A
          </div>
          <span className="font-display text-xl tracking-wider">
            <span className="text-gradient-gold">AURE</span>GOLD
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <Link
            to={user ? "/dashboard" : "/login"}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <UserIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/cart"
            className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-gold text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-gold">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
