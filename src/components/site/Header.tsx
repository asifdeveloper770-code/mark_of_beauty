import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Faith" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="hidden md:block bg-primary text-primary-foreground text-[11px] tracking-[0.3em] uppercase">
        <div className="overflow-hidden">
          <div className="flex gap-12 py-2 animate-marquee whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12 shrink-0">
                <span>Free shipping over $75</span>
                <span>✦</span>
                <span>Crafted with faith and grace</span>
                <span>✦</span>
                <span>Clean • Cruelty-free • Made for her</span>
                <span>✦</span>
                <span>New: Grace Eau de Parfum</span>
                <span>✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="story-link text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "story-link text-primary font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-primary transition"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary hover:text-primary transition"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground flex items-center justify-center animate-pulse-rose">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-up">
          <nav className="flex flex-col px-5 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground/80 hover:text-primary border-b border-border last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
