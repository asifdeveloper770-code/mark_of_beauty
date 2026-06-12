import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Mark of Beauty Cosmetics" },
      { name: "description", content: "Discover our full collection of faith-inspired, clean cosmetics — lips, skin, face and fragrance." },
      { property: "og:title", content: "Shop — Mark of Beauty Cosmetics" },
      { property: "og:description", content: "Discover our full collection of faith-inspired clean cosmetics." },
    ],
  }),
  component: Shop,
});

const categories = ["All", "Lips", "Skin", "Face", "Fragrance"] as const;

function Shop() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <div>
      <section className="gradient-hero">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">The Collection</p>
          <h1 className="font-display text-5xl md:text-6xl">
            Shop with <span className="font-script text-gradient-rose">grace</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every product is a small act of devotion — clean, considered, and made for her.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm transition-all border ${
                cat === c
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-background border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
