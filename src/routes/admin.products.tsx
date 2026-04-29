import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { mockProducts } from "@/data/mock";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Catalog</p>
          <h1 className="font-display text-4xl">Products</h1>
        </div>
        <button className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold shadow-gold">
          <Plus className="h-4 w-4" /> New
        </button>
      </header>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-right p-4">Price</th>
              <th className="text-right p-4">Stock</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.id} className="border-t border-border/40 hover:bg-muted/20">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                  <span>{p.name}</span>
                </td>
                <td className="p-4 text-muted-foreground capitalize">{p.category}</td>
                <td className="p-4 text-right text-gradient-gold font-semibold">${p.price.toLocaleString()}</td>
                <td className="p-4 text-right">{p.stock}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary"><Edit3 className="h-3.5 w-3.5" /></button>
                  <button className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
