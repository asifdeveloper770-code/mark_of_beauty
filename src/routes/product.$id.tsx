import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft, Leaf, Truck, Shield } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/site/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Mark of Beauty Cosmetics` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/shop" className="text-primary mt-4 inline-block story-link">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: import("@/lib/products").Product };
  const { id } = useParams({ from: "/product/$id" });
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [shade, setShade] = useState(product.shades?.[0]);
  const related = products.filter((p) => p.id !== id).slice(0, 4);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 pt-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-10 grid lg:grid-cols-2 gap-12">
        <div className="relative animate-fade-up">
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden gradient-hero">
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.25em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
              {product.category}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-secondary cursor-pointer hover:ring-2 ring-primary transition">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-7 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div>
            <p className="font-script text-2xl text-primary">{product.tagline}</p>
            <h1 className="font-display text-4xl md:text-5xl mt-2">{product.name}</h1>
            <p className="font-display text-3xl mt-4">${product.price}</p>
          </div>

          <p className="text-foreground/80 leading-relaxed">{product.description}</p>

          {product.shades && (
            <div>
              <p className="text-xs uppercase tracking-[0.25em] mb-3">Shade — <span className="text-muted-foreground normal-case tracking-normal">{shade}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.shades.map((s) => (
                  <button
                    key={s}
                    onClick={() => setShade(s)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      shade === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 inline-flex items-center justify-center hover:text-primary">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-12 w-12 inline-flex items-center justify-center hover:text-primary">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) add(product.id, shade);
                toast.success(`${product.name} added to bag`);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground text-sm font-medium shadow-soft hover:shadow-petal transition hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-4 w-4" /> Add to bag
            </button>
            <button className="h-12 w-12 rounded-full border border-border inline-flex items-center justify-center hover:border-primary hover:text-primary transition" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { Icon: Leaf, text: "Clean formula" },
              { Icon: Truck, text: "Free over $75" },
              { Icon: Shield, text: "Cruelty-free" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-2xl bg-secondary/50">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-xs">{text}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-xs uppercase tracking-[0.25em] mb-3">Key Ingredients</h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.ingredients.map((ing) => (
                <li key={ing} className="text-sm text-foreground/80 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {ing}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-3xl md:text-4xl mb-10 text-center">
          You may also <span className="font-script text-gradient-rose">love</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
