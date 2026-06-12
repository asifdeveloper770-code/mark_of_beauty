import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-secondary/60 aspect-[4/5] hover-lift">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] bg-background/85 backdrop-blur px-3 py-1 rounded-full text-foreground/80">
          {product.category}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            add(product.id, product.shades?.[0]);
            toast.success(`${product.name} added to bag`);
          }}
          className="absolute bottom-4 right-4 h-11 w-11 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center shadow-soft translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
          aria-label="Quick add"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{product.tagline}</p>
        </div>
        <span className="font-display text-lg shrink-0">${product.price}</span>
      </div>
    </Link>
  );
}
