import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Gem } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeletons";
import { api } from "@/services/api";
import { categories } from "@/data/mock";
import type { Product } from "@/types";
import hero from "@/assets/hero-luxury.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [featured, setFeatured] = useState<Product[] | null>(null);

  useEffect(() => {
    api.getFeaturedProducts().then(setFeatured);
  }, []);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Spring Collection · 2026
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">
              The art of <span className="text-gradient-gold italic">timeless</span> luxury.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Hand-finished in our Paris atelier. Discover pieces designed to be cherished
              for generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold hover:opacity-95 transition"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border border-primary/40 text-foreground px-7 py-3.5 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-primary/10 transition"
              >
                Explore Stories
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Gem, title: "Crafted by Hand", text: "Master artisans, signed work" },
          { icon: Truck, title: "Complimentary Delivery", text: "Worldwide, white-glove service" },
          { icon: ShieldCheck, title: "Lifetime Care", text: "Restoration & authentication" },
          { icon: Sparkles, title: "Private Concierge", text: "24/7 personal styling" },
        ].map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-2xl p-6 hover-lift"
          >
            <v.icon className="h-6 w-6 text-primary mb-3" />
            <p className="font-display text-base mb-1">{v.title}</p>
            <p className="text-xs text-muted-foreground">{v.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Featured</p>
            <h2 className="font-display text-4xl md:text-5xl">House Favorites</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured
            ? featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
            : Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Maisons</p>
          <h2 className="font-display text-4xl md:text-5xl">Explore Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                to="/products"
                className="block group relative rounded-2xl overflow-hidden bg-gradient-gold-soft border border-border p-8 h-40 hover-lift"
              >
                <div className="relative z-10">
                  <p className="font-display text-2xl">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.count} pieces</p>
                </div>
                <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-onyx p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-radial-gold)" }} />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Private Invitation</p>
            <h2 className="font-display text-4xl md:text-6xl mb-4">
              Become a <span className="text-gradient-gold italic">Connoisseur</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join our private circle for early access, atelier visits, and bespoke commissions.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold"
            >
              Request Invitation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
