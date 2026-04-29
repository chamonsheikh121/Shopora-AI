import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeletons";
import { api } from "@/services/api";
import { categories } from "@/data/mock";
import type { Product } from "@/types";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  const filtered = useMemo(() => {
    if (!products) return null;
    return products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        (search === "" || p.name.toLowerCase().includes(search.toLowerCase())),
    );
  }, [products, category, maxPrice, minRating, search]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Boutique</p>
        <h1 className="font-display text-4xl md:text-6xl mb-4">The Collection</h1>
        <p className="text-muted-foreground max-w-xl">
          Every piece, hand-selected. Filter by your desire.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="space-y-8">
          <div>
            <label className="flex items-center gap-2 bg-input/50 border border-border rounded-full px-4 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collection…"
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </label>
          </div>

          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-4">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Categories
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setCategory("all")}
                className={`block w-full text-left text-sm py-1.5 transition ${
                  category === "all" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`flex w-full justify-between items-center text-sm py-1.5 transition ${
                    category === c.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-xs">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Price</p>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--gold)]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>$100</span>
              <span className="text-primary font-medium">Up to ${maxPrice.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Rating</p>
            <div className="space-y-2">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-2 text-sm py-1.5 ${
                    minRating === r ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {r === 0 ? "All" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {filtered ? `${filtered.length} pieces` : "Loading…"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered
              ? filtered.length === 0
                ? <p className="col-span-full text-center text-muted-foreground py-20">No pieces match your filters.</p>
                : filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
              : Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
