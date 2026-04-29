import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/50 bg-gradient-onyx">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-gold" />
            <span className="font-display text-lg tracking-wider text-gradient-gold">AUREGOLD</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A maison of modern luxury. Crafted in Paris, delivered worldwide.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Shop</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/products" className="hover:text-primary">New Arrivals</Link></li>
            <li><Link to="/products" className="hover:text-primary">Bestsellers</Link></li>
            <li><Link to="/products" className="hover:text-primary">Limited Edition</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Maison</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Our Story</a></li>
            <li><a href="#" className="hover:text-primary">Craftsmanship</a></li>
            <li><a href="#" className="hover:text-primary">Sustainability</a></li>
            <li><a href="#" className="hover:text-primary">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Stay in touch</h4>
          <p className="text-sm text-muted-foreground mb-4">Receive private invitations & news.</p>
          <div className="flex gap-2">
            <input
              placeholder="Email address"
              className="flex-1 bg-input/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button className="bg-gradient-gold text-primary-foreground px-4 rounded-md text-sm font-medium hover:opacity-90 transition">
              Join
            </button>
          </div>
          <div className="flex gap-3 mt-6">
            <a href="#" className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AUREGOLD Maison. All rights reserved.</p>
          <p>Crafted with care · Paris · New York · Tokyo</p>
        </div>
      </div>
    </footer>
  );
}
