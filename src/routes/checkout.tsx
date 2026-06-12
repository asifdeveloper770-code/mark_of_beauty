import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Mark of Beauty Cosmetics" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const shipping = subtotal >= 75 ? 0 : 7;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  if (count === 0 && !done) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <Link to="/shop" className="text-primary mt-4 inline-block story-link">Start shopping</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clear();
    toast.success("Order placed! Grace is on its way 🌹");
    setTimeout(() => navigate({ to: "/" }), 4500);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center animate-fade-up">
        <div className="h-24 w-24 mx-auto rounded-full gradient-rose flex items-center justify-center mb-6 animate-pulse-rose">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-5xl">Thank you, beautiful.</h1>
        <p className="font-script text-2xl text-primary mt-3">Your order is wrapped in grace.</p>
        <p className="text-muted-foreground mt-4">A confirmation will arrive in your inbox shortly.</p>
        <Link to="/shop" className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-primary-foreground text-sm font-medium">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-10 flex items-center gap-2">
        <Lock className="h-3.5 w-3.5" /> Secure & private
      </p>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-10">
          <Section title="Contact">
            <Field label="Email" type="email" required placeholder="grace@example.com" />
            <Field label="Phone (optional)" type="tel" placeholder="+1 (555) 000-0000" />
          </Section>

          <Section title="Shipping Address">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Address" required />
            <Field label="Apartment, suite (optional)" />
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="City" required />
              <Field label="State" required />
              <Field label="ZIP" required />
            </div>
          </Section>

          <Section title="Payment">
            <Field label="Card number" required placeholder="1234 5678 9012 3456" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" required placeholder="MM/YY" />
              <Field label="CVC" required placeholder="123" />
            </div>
            <Field label="Name on card" required />
          </Section>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-primary-foreground text-sm font-medium shadow-soft hover:shadow-petal transition hover:-translate-y-0.5"
          >
            <Lock className="h-4 w-4" /> Place order — ${total.toFixed(2)}
          </button>
        </div>

        <aside className="lg:col-span-2 lg:sticky lg:top-28 self-start rounded-3xl border border-border bg-gradient-to-b from-card to-secondary/40 p-7 space-y-5">
          <h2 className="font-display text-2xl">Your Order</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {detailed.map(({ product, item }) => (
              <div key={`${item.id}-${item.shade ?? ""}`} className="flex gap-3">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-secondary shrink-0">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm truncate">{product.name}</p>
                  {item.shade && <p className="text-xs text-muted-foreground">{item.shade}</p>}
                </div>
                <p className="text-sm font-medium">${(product.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <Row label="Tax" value={`$${tax.toFixed(2)}`} />
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-display text-xl">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, type = "text", required, placeholder }: { label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
