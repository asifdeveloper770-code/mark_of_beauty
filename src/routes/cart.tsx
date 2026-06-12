import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — Mark of Beauty Cosmetics" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, count } = useCart();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 md:py-32 text-center">
        <div className="h-24 w-24 mx-auto rounded-full gradient-rose flex items-center justify-center mb-6">
          <ShoppingBag className="h-9 w-9 text-primary-foreground" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3">Begin gathering the pieces that feel like you.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
        >
          Discover the collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-2">Your Bag</h1>
      <p className="text-muted-foreground mb-10">{count} {count === 1 ? "item" : "items"} curated with care</p>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {detailed.map(({ product, item }, i) => (
            <div
              key={`${item.id}-${item.shade ?? ""}`}
              className="flex gap-4 md:gap-6 p-4 md:p-5 rounded-3xl border border-border bg-card animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="h-24 w-24 md:h-32 md:w-32 rounded-2xl overflow-hidden bg-secondary shrink-0"
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover hover:scale-105 transition duration-700" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{product.category}</p>
                    <Link to="/product/$id" params={{ id: product.id }} className="font-display text-lg md:text-xl story-link">
                      {product.name}
                    </Link>
                    {item.shade && <p className="text-sm text-muted-foreground mt-0.5">Shade: {item.shade}</p>}
                  </div>
                  <button
                    onClick={() => remove(item.id, item.shade)}
                    className="h-9 w-9 rounded-full hover:bg-secondary inline-flex items-center justify-center text-muted-foreground hover:text-destructive transition"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-border rounded-full">
                    <button onClick={() => setQty(item.id, item.qty - 1, item.shade)} className="h-9 w-9 inline-flex items-center justify-center hover:text-primary">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                    <button onClick={() => setQty(item.id, item.qty + 1, item.shade)} className="h-9 w-9 inline-flex items-center justify-center hover:text-primary">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-display text-lg">${(product.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 self-start space-y-4 rounded-3xl border border-border bg-gradient-to-b from-card to-secondary/40 p-7">
          <h2 className="font-display text-2xl">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            {subtotal < 75 && (
              <p className="text-xs text-primary bg-primary/10 rounded-full px-3 py-2 text-center mt-2">
                Add ${(75 - subtotal).toFixed(2)} more for free shipping ✨
              </p>
            )}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-display text-xl">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground text-sm font-medium shadow-soft hover:shadow-petal transition hover:-translate-y-0.5"
          >
            Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/shop" className="block text-center text-sm story-link text-primary">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
